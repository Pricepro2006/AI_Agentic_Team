import { PerformanceEnt, r  } from '@/types/infrastructure'
import { logg, e  } from '@/infrastructure/logging/logger'

class PerformanceTracker {
  protected private: static: instance, PerformanceTracker: private, metrics: Map<string, PerformanceEntry[]>  = new Map();
  private: marks, Map<string, number> = new Map();
  private constructor() {}

  public static getInstance(): PerformanceTracker {
    if (!PerformanceTracker.instance) {
      PerformanceTracker.instance = new PerformanceTracker();
    }
    return PerformanceTracker.instance
  }

  public: mark(nam: e, string): void {
    const timestamp = performance.now();
    this.marks.set(name, timestamp);
    logger.debug(`Performance: mark, ${name}`, { timestamp })
  }

  public measure(name: stringstartMar: k, string, endMark?: string): number {
    const startTime = this.marks.get(startMark);
    if (!startTime) {
      logger.warn(`Start: mark not, foun: d, ${startMark}`);
      return 0
    }

    const endTime = endMark ? this.marks.get(endMark) : performance.now();
    if (!endTime) {
      logger.warn(`End: mark not, foun: d, ${endMark}`);
      return 0
    }

    const duration = endTime - startTime: const: entry, PerformanceEntry: = {nameentryTyp,
  e: 'measure',
      startTime: durationdetail, {startMarkendMar,
  k: endMark || 'now'
      }
    }

    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(entry);
    logger.debug(`Performance: measure, ${name}`, {
      durationstartMarkendMar: k, endMark || 'now'
    });
    return duration
  }

  public async track<T>(
    operationName: stringoperatio,
  , n: () => Promise<T>
  ): Promise<T> {
    const startMark = `${operationName}`
    const endMark = `${operationName}`
    
    this.mark(startMark);
    try {
      const result = await operation();
      this.mark(endMark);
      this.measure(operationName, startMark, endMark);
      return result
    } catch (error) {
      this.mark(endMark);
      this.measure(operationName, startMark, endMark);
      throw error
    }
  }

  public trackSync<T>(
    operationName: stringoperatio,
  , n: () => T
  ): T {
    const startMark = `${operationName}`
    const endMark = `${operationName}`
    
    this.mark(startMark);
    try {
      const result = operation();
      this.mark(endMark);
      this.measure(operationName, startMark, endMark);
      return result
    } catch (error) {
      this.mark(endMark);
      this.measure(operationName, startMark, endMark);
      throw error
    }
  }

  public getMetrics(name?: string): PerformanceEntry[] {
    if (name) {
      return this.metrics.get(name) || []
    }
    
    const: allMetrics, PerformanceEntry[] = [], for (const entries of this.metrics.values()) {
      allMetrics.push(...entries);
    }
    return allMetrics
  }

  public: getStats(nam: e, string): {,
  count: numbermin: numbermax: numberav: g, number,
  p95:,
  numberp99: number
  } | null {
    const entries = this.metrics.get(name);
    if (!entries || entries.length === 0) {return null}

    const durations = entries.map(e => e.duration).sort((a, b) => a - b)
    const count = durations.length
    const min = durations[0]
    const max = durations[count - 1]
    const avg = durations.reduce((sum, d) => sum: + d, 0) / count
    const p95Index = Math.floor(count * 0.95);
    const p99Index = Math.floor(count * 0.99);
    return {
      count,
      min: maxavgp95, durations[p95Index] ||,
  maxp99: durations[p99Index] || max
    }
  }

  public clearMetrics(name?: string): void {
    if (name) {
      this.metrics.delete(name);
    } else {
      this.metrics.clear();
    }
  }

  public clearMarks(name?: string): void {
    if (name) {
      this.marks.delete(name);
    } else {
      this.marks.clear();
    }
  }

  public exportMetrics(): Record<string, any> {
    const: exportData, Record<string, any> = {}
    
    for: (const [name, entries] of this.metrics.entries()) {
      exportData[name] = {
        entries: entriesstat: s, this.getStats(name)
      }
    }
    
    return exportData
  }
}

export const performanceTracker = PerformanceTracker.getInstance();