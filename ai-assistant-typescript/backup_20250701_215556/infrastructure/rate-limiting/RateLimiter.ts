/**
 * Rate Limiter
 * 
 * Simple rate limiting implementation using token bucket algorithm
 */

interface RateLimitBucket {
  tokens: number
  lastRefill: number
  requests: number[]
}

export class RateLimiter {
  private buckets: Map<string, RateLimitBucket> = new Map()

  /**
   * Check if a request is allowed under the rate limit
   * @param key Unique identifier for the rate limit bucket
   * @param limit Maximum number of requests allowed
   * @param windowMs Time window in milliseconds
   * @returns true if request is allowed, false if rate limited
   */
  async checkLimit(key: string, limit: number, windowMs: number): Promise<boolean> {
    const now = Date.now()
    const bucket = this.buckets.get(key) || {
      tokens: limit,
      lastRefill: now,
      requests: []
    }

    // Remove old requests outside the window
    bucket.requests = bucket.requests.filter(timestamp => now - timestamp < windowMs)

    // Check if we've exceeded the limit
    if (bucket.requests.length >= limit) {
      return false
    }

    // Add this request
    bucket.requests.push(now)
    this.buckets.set(key, bucket)

    // Clean up old buckets periodically
    if (this.buckets.size > 1000) {
      this.cleanupOldBuckets(windowMs * 2)
    }

    return true
  }

  /**
   * Get the current usage for a key
   */
  getUsage(key: string, windowMs: number): { used: number; limit: number; reset: number } {
    const now = Date.now()
    const bucket = this.buckets.get(key)
    
    if (!bucket) {
      return { used: 0, limit: 0, reset: now + windowMs }
    }

    // Count requests in current window
    const validRequests = bucket.requests.filter(timestamp => now - timestamp < windowMs)
    const oldestRequest = Math.min(...validRequests)
    const reset = oldestRequest + windowMs

    return {
      used: validRequests.length,
      limit: bucket.tokens,
      reset
    }
  }

  /**
   * Reset rate limit for a specific key
   */
  reset(key: string): void {
    this.buckets.delete(key)
  }

  /**
   * Clear all rate limit buckets
   */
  clearAll(): void {
    this.buckets.clear()
  }

  /**
   * Clean up old buckets that haven't been used recently
   */
  private cleanupOldBuckets(maxAge: number): void {
    const now = Date.now()
    const keysToDelete: string[] = []

    for (const [key, bucket] of this.buckets.entries()) {
      const lastRequest = Math.max(...bucket.requests, 0)
      if (now - lastRequest > maxAge) {
        keysToDelete.push(key)
      }
    }

    keysToDelete.forEach(key => this.buckets.delete(key))
  }
}