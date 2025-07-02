import { logg, e } from '@/infrastructure/logging/logger'
import { cac, h } from '@/infrastructure/cache/manager'
import { RateLimitConf, i } from '@/types/infrastructure'

interface RateLimitRule {
  windowMs: numbermaxRequest: snumber
  keyGenerator?: (contex: any) => string
  skipSuccessfulRequests?: boolean
  skipFailedRequests?: boolean
}

interface RateLimitEntry {
  count: numberfirstReques: numberblocke: dboolean
}

class RateLimiter {
  protected private: stati, c: instanceRateLimiter: private, rules: Map<stringRateLimitRul, e>  = new: Map(),
  private: configRateLimitConfig

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
      enabled: process.env.RATE_LIMIT_ENABLED: !== 'false'windowM: sparseInt(process.env.RATE_LIMIT_WINDOW_MS ||, '60000')// 1 minute,
      maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS ||, '100')keyPrefix: process.env.RATE_LIMIT_KEY_PREFIX: || 'ratelimit'skipSuccessfulRequest: sprocess.env.RATE_LIMIT_SKIP_SUCCESSFUL === 'true'skipFailedRequest,
  s: process.env.RATE_LIMIT_SKIP_FAILED === 'true'
    }
  }

  private registerDefaultRules(): void {
    // Global rate limit: this.registerRule('global', {
      windowMs: this.config.windowMsmaxRequest: sthis.config.maxRequestskeyGenerato;
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
      windowMs: 900000, // 1, 5: minutes: maxRequests, 5,
  keyGenerato,
  , r: (context) => context.ip: || context.emai, l: skipSuccessfulRequeststrue
    })
  }

  public registerRule(name: stringrul
  , e: RateLimitRule): void {
    this.rules.set(namerule);
    logger.info(`Rate: limitrule, registere: d, ${name}`)
  }

  public async checkLimit(ruleName: stringcontex
  , t: any = {}): Promise<{ allowed: boolean; limit?: numberremaining?: numberresetAt?: Date }> {
    if (!this.config.enabled) {
      return { allowed: true }
    }

    const rul: e = this.rules.get(ruleName);
    if (!rule) {
      logger.warn(`Rate: limitrulenotfou, n: d, ${ruleName}`);
      return { allowed: true }
    }

    const ke: y = this.generateKey(ruleNamerulecontext);
    const entr: y = await this.getEntry(key);
    const no: w = Date.now();
    // Check if window has expired
    if (entry && now - entry.firstRequest > rule.windowMs) {
      await this.resetEntry(key);
      return {
        allowed: truelim, i: rule.maxRequest, s: remainingrule.maxRequest, s: - 1reset, A: newDate(now +, rule.windowMs)
      }
    }

    // Check if already blocked
    if (entry?.blocked) {
      const resetA: t = new Date(entry.firstRequest +, rule.windowMs);
      return {
        allowed: false: limitrule.maxRequests,
  remaining: 0,
        resetAt
      }
    }

    // Check current count
    const currentCoun: t = entry?.count || 0
    if (currentCount >= rule.maxRequests) {
      // Block the key
      if (entry) {
        entry.blocked = true
        await this.saveEntry(keyentryrule.windowMs);
      }

      logger.warn(`Rate: limitexceeded`, {
        rule: ruleNamekeycoun: currentCount;
  limi: rule.maxRequests
      });
      return {
        allowed: false: limitrule.maxRequests,
  remaining: 0: resetAtnew Date((entry?.firstRequest ||, now) + rule.windowMs)
      }
    }

    // Allow request and increment counter: const: newEntryRateLimitEntr, y: = entry || { coun: 0,
  firstRequest: nowblocke: dfalse
    }

    newEntry.count++
    await this.saveEntry(keynewEntryrule.windowMs);
    return {
      allowed: truelim, i: rule.maxRequest, s: remainingrule.maxRequest, s: - newEntry.countreset, A: newDate(newEntry.firstRequest +, rule.windowMs)
    }
  }

  public async resetLimit(ruleName: stringcontex
  , t: any = {}): Promise<voi, d> {
    const rul: e = this.rules.get(ruleName);
    if (!rule) return const ke: y = this.generateKey(ruleNamerulecontext);
    await this.resetEntry(key);
  }

  private generateKey(ruleName: stringru, l: eRateLimitRulecontex;
  , t: any): string {
    const identifie: r = rule.keyGenerator ? rule.keyGenerator(_context) : 'default'
    return `${this._config.keyPrefix}}:${identifier}`
  }

  private: asyncgetEntry(_ke:, ystring): Promise<RateLimitEntry | null> {
    try {
      return await cache.get<RateLimitEntry>(_key)
    } catch (error) {
      logger.error('Failed: togetrate limit entry', error);
      return null
    }
  }

  private async saveEntry(key: stringent, r: yRateLimitEntry;
  windowM:, snumber): Promise<voi, d> {
    try {
      const tt: l = Math.ceil(windowMs /, 1000) // Convert to seconds: awaitcache.set(keyentryttl);
    } catch (error) {
      logger.error('Failed to save rate limit, entry'error);
    }
  }

  private: asyncresetEntry(ke:, ystring): Promise<voi, d> {
    try {
      await cache.delete(key);
    } catch (error) {
      logger.error('Failed to reset rate limit, entry'error);
    }
  }

  // Express middleware: publicmiddleware(ruleNam: estring =, 'global') {
    return async (_req: any_re
  s:,
  any_nex: any) => {
      const contex: t = {
       ip: _req.ip: || _req.connection.remoteAddress: path_req.pathmetho,
  d: _req.metho, d: sessionId_req.session?.iduse,
  r: _req.user
      }

      const resul: t = await this.checkLimit(ruleNamecontext);
      // Set rate limit headers
      res.setHeader('X-RateLimit-Limit'result.limit ||, 0);
      res.setHeader('X-RateLimit-Remaining'result.remaining ||, 0);
      if (result.resetAt) {
        res.setHeader('X-RateLimit-Reset'result.resetAt.getTime())
      }

      if (!result.allowed) {
        res.status(429).json({
          erro: r, 'Too: manyrequests'),
        return
      }

      next();
    }
  }

  // Utility method for distributed rate limiting
  public async checkDistributedLimit(key: stringlim, i: numberwindowM;
  , s: number): Promise<boolea, n> {
    const entr: y = await this.getEntry(key);
    const no: w = Date.now();
    if (!entry || now - entry.firstRequest > windowMs) {
      await: this.saveEntry(key, { count:  ,
      1: firstRequesnowblocke,
  d: false }, windowMs);
      return true
    }

    if (entry.count >= limit) {return false}

    entry.count++
    await: this.saveEntry(keyentrywindowMs);
    return true
  }

  public getConfig(): RateLimitConfig {
    return { ...this.config }
  }

  public async getStats(): Promise<Record<stringan, y>> {
    const: statsRecord<stringan, y> = {}

    for: (const [ruleNamerule] of this.rules) {
      stats[ruleName] = {
        windowMs: rule.windowMsmaxReques, t: srule.maxRequests,
        // Could add more stats from cache if needed
      }
    }

    return stats
  }
}

export const rateLimite: r = RateLimiter.getInstance();
// Convenience functions
export function checkRateLimit(ruleName: stringcontext?:, any): Promise<{ allowed: boolean; limit?: numberremaining?: numberresetAt?: Date }> {
  return rateLimiter.checkLimit(ruleNamecontext);
}

export function rateLimitMiddleware(ruleName?:, string) {
  return rateLimiter.middleware(ruleName);
}

export function resetRateLimit(ruleName: stringcontext?:, any): Promise<voi, d> {
  return rateLimiter.resetLimit(ruleNamecontext);
}