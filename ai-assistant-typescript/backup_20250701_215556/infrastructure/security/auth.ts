import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { AuthConfig, AuthToken, User } from '../../types/infrastructure'

interface TokenPayload {
  userId: string
  email: string
  roles: string[]
  sessionId: string
}

class AuthManager {
  private static instance: AuthManager
  private config: AuthConfig
  private publicKey?: string
  private privateKey?: string
  private bcryptRounds = parseInt(process.env.BCRYPT_ROUNDS || '10')

  private constructor() {
    this.config = this.loadConfig()
    this.loadKeys()
  }

  public static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager()
    }
    return AuthManager.instance
  }

  private loadConfig(): AuthConfig {
    return {
      jwtSecret: process.env.JWT_SECRET || 'default-secret-change-this',
      jwtExpiry: process.env.JWT_EXPIRES_IN || '24h',
      refreshExpiry: process.env.REFRESH_EXPIRES_IN || '7d',
      sessionTimeout: parseInt(process.env.SESSION_TIMEOUT || '86400000') // 24 hours in ms
    }
  }
  
  private loadKeys(): void {
    // In production, these should be loaded from secure storage
    this.publicKey = process.env.JWT_PUBLIC_KEY
    this.privateKey = process.env.JWT_PRIVATE_KEY
  }

  public async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.bcryptRounds)
  }

  public async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }

  public generateToken(user: User): AuthToken {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      roles: [user.role],
      sessionId: this.generateSessionId()
    }

    const accessToken = jwt.sign(payload, this.privateKey || this.config.jwtSecret, {
      expiresIn: this.config.jwtExpiry,
      algorithm: this.privateKey ? 'RS256' : 'HS256'
    })
    
    const refreshToken = jwt.sign(
      { userId: user.id, sessionId: payload.sessionId },
      this.config.jwtSecret,
      { expiresIn: this.config.refreshExpiry }
    )
    
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24) // 24 hours

    return {
      token: accessToken,
      refreshToken,
      expiresAt: expiresAt.toISOString()
    }
  }

  public async verifyToken(token: string): Promise<TokenPayload | null> {
    try {
      const decoded = jwt.verify(token, this.publicKey || this.config.jwtSecret, {
        algorithms: this.publicKey ? ['RS256'] : ['HS256']
      }) as TokenPayload

      // Check if session is still valid
      const isValid = await this.isSessionValid(decoded.sessionId)
      if (!isValid) {
        console.warn('Invalid session', { sessionId: decoded.sessionId })
        return null
      }

      return decoded
    } catch (error) {
      console.debug('Token verification failed', error)
      return null
    }
  }

  public async refreshToken(refreshToken: string): Promise<AuthToken | null> {
    try {
      const decoded = jwt.verify(refreshToken, this.config.jwtSecret) as {
        userId: string
        sessionId: string
      }

      // Verify session
      const isValid = await this.isSessionValid(decoded.sessionId)
      if (!isValid) return null

      // Get user (this would typically fetch from database)
      const user = await this.getUserById(decoded.userId)
      if (!user) return null

      // Invalidate old session
      await this.invalidateSession(decoded.sessionId)
      // Generate new tokens
      return this.generateToken(user)
    } catch (error) {
      console.error('Refresh token failed', error)
      return null
    }
  }

  public async createSession(userId: string, metadata?: Record<string, any>): Promise<string> {
    const sessionId = this.generateSessionId()
    const session = {
      userId,
      createdAt: Date.now(),
      lastAccess: Date.now(),
      metadata
    }

    // Note: This would use Redis or another cache in production
    // For now, we'll simulate it with in-memory storage
    await this.setSessionData(`session:${sessionId}`, session, this.config.sessionTimeout / 1000)
    return sessionId
  }

  public async getSession(sessionId: string): Promise<any | null> {
    const session = await this.getSessionData(`session:${sessionId}`)
    if (session) {
      // Update last access
      session.lastAccess = Date.now()
      await this.setSessionData(`session:${sessionId}`, session, this.config.sessionTimeout / 1000)
    }
    return session
  }

  public async invalidateSession(sessionId: string): Promise<void> {
    await this.deleteSessionData(`session:${sessionId}`)
  }

  private async isSessionValid(sessionId: string): Promise<boolean> {
    const session = await this.getSession(sessionId)
    return session !== null
  }

  private generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substring(2)}`
  }

  // Mock function - replace with actual database lookup
  private async getUserById(userId: string): Promise<User | null> {
    // This should be replaced with actual database lookup
    return {
      id: userId,
      email: 'user@example.com',
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }

  // Temporary in-memory session storage (replace with Redis in production)
  private sessionStore = new Map<string, { data: any; expiry: number }>()

  private async setSessionData(key: string, value: any, ttlSeconds: number): Promise<void> {
    this.sessionStore.set(key, {
      data: value,
      expiry: Date.now() + (ttlSeconds * 1000)
    })
  }

  private async getSessionData(key: string): Promise<any | null> {
    const item = this.sessionStore.get(key)
    if (!item) return null
    
    if (Date.now() > item.expiry) {
      this.sessionStore.delete(key)
      return null
    }
    
    return item.data
  }

  private async deleteSessionData(key: string): Promise<void> {
    this.sessionStore.delete(key)
  }

  // Express middleware
  public authenticate(requiredRoles?: string[]) {
    return async (req: any, res: any, next: any) => {
      try {
        const token = this.extractToken(req)
        if (!token) {
          return res.status(401).json({
            error: 'Unauthorized'
          })
        }

        const payload = await this.verifyToken(token)
        if (!payload) {
          return res.status(401).json({
            error: 'Unauthorized'
          })
        }

        // Check required roles
        if (requiredRoles && requiredRoles.length > 0) {
          const hasRole = requiredRoles.some(role => 
            payload.roles.includes(role)
          )
          if (!hasRole) {
            return res.status(403).json({
              error: 'Forbidden'
            })
          }
        }

        // Attach user to request
        req.user = {
          id: payload.userId,
          email: payload.email,
          roles: payload.roles,
          sessionId: payload.sessionId
        }

        next()
      } catch (error) {
        console.error('Authentication error', error)
        res.status(500).json({
          error: 'Internal Server Error'
        })
      }
    }
  }

  private extractToken(req: any): string | null {
    // Check Authorization header
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7)
    }

    // Check query parameter
    if (req.query.token) {
      return req.query.token
    }

    // Check cookie
    if (req.cookies?.token) {
      return req.cookies.token
    }

    return null
  }

  public async validateApiKey(apiKey: string): Promise<boolean> {
    // Simple API key validation - in production, check against database
    const validApiKeys = process.env.VALID_API_KEYS?.split(',') || []
    return validApiKeys.includes(apiKey)
  }

  public apiKeyAuth() {
    return async (req: any, res: any, next: any) => {
      const apiKey = req.headers['x-api-key'] || req.query.api_key

      if (!apiKey) {
        return res.status(401).json({
          error: 'Unauthorized'
        })
      }

      const isValid = await this.validateApiKey(apiKey)
      if (!isValid) {
        return res.status(401).json({
          error: 'Unauthorized'
        })
      }

      next()
    }
  }
}

export const auth = AuthManager.getInstance()

// Convenience functions
export function hashPassword(password: string): Promise<string> {
  return auth.hashPassword(password)
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return auth.verifyPassword(password, hash)
}

export function generateToken(user: User): AuthToken {
  return auth.generateToken(user)
}

export function verifyToken(token: string): Promise<TokenPayload | null> {
  return auth.verifyToken(token)
}

export function authMiddleware(requiredRoles?: string[]) {
  return auth.authenticate(requiredRoles)
}

export function apiKeyMiddleware() {
  return auth.apiKeyAuth()
}