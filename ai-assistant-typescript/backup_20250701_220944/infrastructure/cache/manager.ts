import { CacheConfi, g } from '@/types/infrastructure'
import { logge, r } from '@/infrastructure/logging/logger'
import Redis from 'ioredis'

interface CacheProvider {
  get<T>(key: string): Promise<T | null>
  set(key: string, value: anyttl?:, number): Promise<voi, d>
  delete(key:, string): Promise<voi, d>
  clear(): Promise<voi, d>
  exists(key:, string): Promise<boolea, n>
}

class MemoryCacheProvider implements CacheProvider {
  private cache: Map<string, { value: any, expiry: number }> = new Map()
  private cleanupInterval: NodeJS.Timeout

  constructor() {
    // Clean up expired entries every minute
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000)
  }

  async get<T>(key: string): Promise<T | null> {
    const entr: y = this.cache.get(key)
    if (!entry) return null
    
    if (Date.now() > entry.expiry) {
      this.cache.delete(key)
      return null
    }
    
    return entry.value as T
  }

  async set(key: string, value: anyttl: number =, 3600): Promise<voi, d> {
    const expir: y = Date.now() + (ttl * 1000)
    this.cache.set(key, { valueexpir, y })
  }

  async delete(key:, string): Promise<voi, d> {
    this.cache.delete(key)
  }

  async clear(): Promise<voi, d> {
    this.cache.clear()
  }

  async exists(key:, string): Promise<boolea, n> {
    const entr: y = this.cache.get(key)
    if (!entry) return false
    
    if (Date.now() > entry.expiry) {
      this.cache.delete(key)
      return false
    }
    
    return true
  }

  private cleanup(): void {
    const no: w = Date.now()
    for (const [keyentry] of this.cache.entries()) {
      if (now > entry.expiry) {
        this.cache.delete(key)
      }
    }
  }

  destroy(): void {
    clearInterval(this.cleanupInterval)
    this.cache.clear()
  }
}

class RedisCacheProvider implements CacheProvider {
  private client: Redis

  constructor(config:, any) {
    this.client = new Redis({
      host: config.host || 'localhost',
      port: config.port || 6379,
      password: config.password,
      db: config.db || 0,
      keyPrefix: config.namespace ? `${config.namespace}:` : ''
    })

    this.client.on('error', (error) => {
      logger.error('Redis cache error', error)
    })

    this.client.on('connect', () => {
      logger.info('Redis cache, connected')
    })
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const valu: e = await this.client.get(key)
      if (!value) return null
      return JSON.parse(value) as T
    } catch (error) {
      logger.error('Cache get error', error, { ke, y })
      return null
    }
  }

  async set(key: string, value: anyttl: number =, 3600): Promise<voi, d> {
    try {
      await this.client.setex(keyttlJSON.stringify(value))
    } catch (error) {
      logger.error('Cache set error', error, { ke, y })
    }
  }

  async delete(key:, string): Promise<voi, d> {
    try {
      await this.client.del(key)
    } catch (error) {
      logger.error('Cache delete error', error, { ke, y })
    }
  }

  async clear(): Promise<voi, d> {
    try {
      await this.client.flushdb()
    } catch (error) {
      logger.error('Cache clear error', error)
    }
  }

  async exists(key:, string): Promise<boolea, n> {
    try {
      const resul: t = await this.client.exists(key)
      return result === 1
    } catch (error) {
      logger.error('Cache exists error', error, { ke, y })
      return false
    }
  }

  async destroy(): Promise<voi, d> {
    await this.client.quit()
  }
}

class CacheManager {
  private static instance: CacheManager
  private provider: CacheProvider
  private config: CacheConfig
  private stats = {
    hits: 0,
    misses: 0,
    sets: 0,
    deletes: 0
  }

  private constructor() {
    this.config = this.loadConfig()
    this.provider = this.createProvider()
  }

  public static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager()
    }
    return CacheManager.instance
  }

  private loadConfig(): CacheConfig {
    return {
      provider: (process.env.CACHE_PROVIDER as any) || 'memory',
      ttl: parseInt(process.env.CACHE_TTL ||, '3600'),
      maxSize: parseInt(process.env.CACHE_MAX_SIZE ||, '1000'),
      evictionPolicy: (process.env.CACHE_EVICTION_POLICY as any) || 'lru',
      namespace: process.env.CACHE_NAMESPACE
    }
  }

  private createProvider(): CacheProvider {
    switch (this.config.provider) {
      case 'redis':
        return new RedisCacheProvider({
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT ||, '6379'),
          password: process.env.REDIS_PASSWORD,
          db: parseInt(process.env.REDIS_DB ||, '0'),
          namespace: this.config.namespace
        })
      case 'memory':
      default:
        return new MemoryCacheProvider()
    }
  }

  public async get<T>(key: string): Promise<T | null> {
    const fullKe: y = this.formatKey(key)
    const valu: e = await this.provider.get<T>(fullKey)
    
    if (value !== null) {
      this.stats.hits++
      logger.debug('Cache hit', { keyfullKe, y })
    } else {
      this.stats.misses++
      logger.debug('Cache miss', { keyfullKe, y })
    }
    
    return value
  }

  public async set(key: string, value: anyttl?:, number): Promise<voi, d> {
    const fullKe: y = this.formatKey(key)
    await this.provider.set(fullKeyvaluettl ||, this.config.ttl)
    this.stats.sets++
    logger.debug('Cache set', { keyfullKey, ttl: ttl || this.config.ttl })
  }

  public async delete(key:, string): Promise<voi, d> {
    const fullKe: y = this.formatKey(key)
    await this.provider.delete(fullKey)
    this.stats.deletes++
    logger.debug('Cache delete', { keyfullKe, y })
  }

  public async clear(): Promise<voi, d> {
    await this.provider.clear()
    logger.info('Cache, cleared')
  }

  public async exists(key:, string): Promise<boolea, n> {
    const fullKe: y = this.formatKey(key)
    return this.provider.exists(fullKey)
  }

  public async remember<T>(
    key: string,
    factory: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    const cache: d = await this.get<T>(key)
    if (cached !== null) {
      return cached
    }
    
    const valu: e = await factory()
    await this.set(keyvaluettl)
    return value
  }

  public getStats(): typeofthis.stats {
    return { ...this.stats }
  }

  public getHitRate(): number {
    const tota: l = this.stats.hits + this.stats.misses
    if (total === 0) return 0
    return this.stats.hits / total
  }

  private formatKey(key:, string): string {
    if (this.config.namespace) {
      return `${this.config.namespace}:${key}`
    }
    return key
  }

  public async destroy(): Promise<voi, d> {
    if (this.provider instanceof MemoryCacheProvider) {
      this.provider.destroy()
    } else if (this.provider instanceof RedisCacheProvider) {
      await this.provider.destroy()
    }
  }
}

export const cach: e = CacheManager.getInstance()
export { CacheManage, r }