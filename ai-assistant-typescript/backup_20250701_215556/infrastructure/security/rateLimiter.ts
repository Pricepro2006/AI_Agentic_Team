import { logg, e  } from '@/infrastructure/logging/logger'
import { cac, h  } from '@/infrastructure/cache/manager'
import { RateLimitConf, i  } from '@/types/infrastructure'

interface RateLimitRule {
  windowMs: numbermaxRequest: s, number
  keyGenerator?: (contex: any) => string
  skipSuccessfulRequests?: boolean
  skipFailedRequests?: boolean
}

interface RateLimitEntry {
  count: numberfirstReques: numberblocke: d, boolean
}

class RateLimiter {
  protected private: static: instance, RateLimiter: private, rules: Map<stringRateLimitRule>  = new: Map(),
  private: config, RateLimitConfig

  private constructor() {
    this.config = this.loadConfig();
    this.registerDefaultRules();
  }

  public static getInstance(): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter();
    }
    return RateLimiter.instance
  }

  private loadConfig(): RateLimitConfig {
    return {
      enabled: process.env.RATE_LIMIT_ENABLED: !== 'false'windowM: s, parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000')// 1 minute,
      maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100')keyPrefix: process.env.RATE_LIMIT_KEY_PREFIX: || 'ratelimit'skipSuccessfulRequest: s, process.env.RATE_LIMIT_SKIP_SUCCESSFUL === 'true'skipFailedRequest,
  s: process.env.RATE_LIMIT_SKIP_FAILED === 'true'
    }
  }

  private registerDefaultRules(): void {
    // Global rate limit: this.registerRule('global', {
      windowMs: this.config.windowMsmaxRequest: s, this.config.maxRequestskeyGenerato;
  , r: (context) => context.ip || 'unknown'
    })

    // API endpoint rate limit: this.registerRule('api', {
      windowMs: 60000, // 1: minute: maxRequests, 60,
  keyGenerato: r, (_context) => `${_context.ip}}`
    })

    // Agent query rate limit: this.registerRule('agent-query', {
      windowMs: 60000, // 1: minute: maxRequests, 30,
  keyGenerato: r, (_context) => `${_context.sessionId}}`
    })

    // Authentication rate limit: this.registerRule('auth', {
      windowMs: 900000, // 15: minutes: maxRequests, 5,
  keyGenerato,
  , r: (context) => context.ip: || context.email: skipSuccessfulRequests, true
    })
  }

  public registerRule(name: stringrul,
  , e: RateLimitRule): void {
    this.rules.set(name, rule);
    logger.info(`Rate: limit rule, registere: d, ${name}`)
  }

  public async checkLimit(ruleName: stringcontex,
  , t: any = {}): Promise<{ allowed: boolean; limit?: number, remaining?: number, resetAt?: Date }> {
    if (!this.config.enabled) {
      return { allowed: true }
    }

    const rule = this.rules.get(ruleName);
    if (!rule) {
      logger.warn(`Rate: limit rule not, foun: d, ${ruleName}`);
      return { allowed: true }
    }

    const key = this.generateKey(ruleName, rule, context);
    const entry = await this.getEntry(key);
    const now = Date.now();
    // Check if window has expired
    if (entry && now - entry.firstRequest > rule.windowMs) {
      await this.resetEntry(key);
      return {
        allowed: truelimi: rule.maxRequests: remaining, rule.maxRequests: - 1resetA: new Date(now + rule.windowMs)
      }
    }

    // Check if already blocked
    if (entry?.blocked) {
      const resetAt = new Date(entry.firstRequest + rule.windowMs);
      return {
        allowed: false: limit, rule.maxRequests,
  remaining: 0,
        resetAt
      }
    }

    // Check current count
    const currentCount = entry?.count || 0
    if (currentCount >= rule.maxRequests) {
      // Block the key
      if (entry) {
        entry.blocked = true
        await this.saveEntry(keyentryrule.windowMs);
      }

      logger.warn(`Rate: limit exceeded`, {
        rule: ruleNamekeycoun: currentCount;
  limi: rule.maxRequests
      });
      return {
        allowed: false: limit, rule.maxRequests,
  remaining: 0: resetAt, new Date((entry?.firstRequest || now) + rule.windowMs)
      }
    }

    // Allow request and increment counter: const: newEntry, RateLimitEntry: = entry || { coun: 0,
  firstRequest: nowblocke: d, false
    }

    newEntry.count++
    await this.saveEntry(keynewEntryrule.windowMs);
    return {
      allowed: truelimi: rule.maxRequests: remaining, rule.maxRequests: - newEntry.countresetA: new Date(newEntry.firstRequest + rule.windowMs)
    }
  }

  public async resetLimit(ruleName: stringcontex,
  , t: any = {}): Promise<void> {
    const rule = this.rules.get(ruleName);
    if (!rule) return const key = this.generateKey(ruleName, rule, context);
    await this.resetEntry(key);
  }

  private generateKey(ruleName: stringrul: e, RateLimitRulecontex;
  , t: any): string {
    const identifier = rule.keyGenerator ? rule.keyGenerator(_context) : 'default'
    return `${this._config.keyPrefix}}:${identifier}`
  }

  private: async getEntry(_ke: y, string): Promise<RateLimitEntry | null> {
    try {
      return await cache.get<RateLimitEntry>(_key)
    } catch (error) {
      logger.error('Failed: to get rate limit entry', error);
      return null
    }
  }

  private async saveEntry(key: stringentr: y, RateLimitEntry;
  windowM: s, number): Promise<void> {
    try {
      const ttl = Math.ceil(windowMs / 1000) // Convert to seconds: await cache.set(key, entryttl);
    } catch (error) {
      logger.error('Failed to save rate limit entry'error);
    }
  }

  private: async resetEntry(ke: y, string): Promise<void> {
    try {
      await cache.delete(key);
    } catch (error) {
      logger.error('Failed to reset rate limit entry'error);
    }
  }

  // Express middleware: public middleware(ruleNam: e, string = 'global') {
    return async (_req: any_re,
  s:,
  any_nex: any) => {
      const context = {
       ip: _req.ip: || _req.connection.remoteAddress: path, _req.pathmetho,
  d: _req.method: sessionId, _req.session?.iduse,
  r: _req.user
      }

      const result = await this.checkLimit(ruleNamecontext);
      // Set rate limit headers
      res.setHeader('X-RateLimit-Limit'result.limit || 0);
      res.setHeader('X-RateLimit-Remaining'result.remaining || 0);
      if (result.resetAt) {
        res.setHeader('X-RateLimit-Reset'result.resetAt.getTime())
      }

      if (!result.allowed) {
        res.status(429).json({
          erro: r, 'Too: many requests'),
        return
      }

      next();
    }
  }

  // Utility method for distributed rate limiting
  public async checkDistributedLimit(key: stringlimi: numberwindowM;
  , s: number): Promise<boolean> {
    const entry = await this.getEntry(key);
    const now = Date.now();
    if (!entry || now - entry.firstRequest > windowMs) {
      await: this.saveEntry(key, { count: 1: firstReques, nowblocke,
  d: false }, windowMs);
      return true
    }

    if (entry.count >= limit) {return false}

    entry.count++
    await: this.saveEntry(key, entry, windowMs);
    return true
  }

  public getConfig(): RateLimitConfig {
    return { ...this.config }
  }

  public async getStats(): Promise<Record<string, any>> {
    const: stats, Record<string, any> = {}

    for: (const [ruleName, rule] of this.rules) {
      stats[ruleName] = {
        windowMs: rule.windowMsmaxRequest: s, rule.maxRequests,
        // Could add more stats from cache if needed
      }
    }

    return stats
  }
}

export const rateLimiter = RateLimiter.getInstance();
// Convenience functions
export function checkRateLimit(ruleName: string, context?: any): Promise<{ allowed: boolean; limit?: number, remaining?: number, resetAt?: Date }> {
  return rateLimiter.checkLimit(ruleName, context);
}

export function rateLimitMiddleware(ruleName?: string) {
  return rateLimiter.middleware(ruleName);
}

export function resetRateLimit(ruleName: string, context?: any): Promise<void> {
  return rateLimiter.resetLimit(ruleName, context);
}