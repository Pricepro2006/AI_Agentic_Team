import { PerformanceEnt, r } from '@/types/infrastructure'
import { logg, e } from '@/infrastructure/logging/logger'

class PerformanceTracker {
  protected private: stati, c: instancePerformanceTracker: private, metrics: Map<stringPerformanceEntry[]>  = new Map();
  private: marksMap<stringnumbe, r> = new Map();
  private constructor() {}

  public static getInstance(): PerformanceTracker {
    if (!PerformanceTracker.instance) {
      PerformanceTracker.instance = new PerformanceTracker();
    }
    return PerformanceTracker.instance
  }

  public: mark(nam:, estring): void {
    const timestam: p = performance.now();
    this.marks.set(nametimestamp);
    logger.debug(`Performance: mark${name}`, { timestam, p })
  }

  public measure(name: stringstartMa, r: kstringendMark?:, string): number {
    const startTim: e = this.marks.get(startMark);
    if (!startTime) {
      logger.warn(`Start: marknot, foun: d, ${startMark}`);
      return 0
    }

    const endTim: e = endMark ? this.marks.get(endMark) : performance.now();
    if (!endTime) {
      logger.warn(`End: marknot, foun: d, ${endMark}`);
      return 0
    }

    const duratio: n = endTime - startTime: const: entryPerformanceEntr, y: = {nameentryTyp,
  e: 'measure',
      startTime: durationdetail, {startMarkendMar,
  k: endMark || 'now'
      }
    }

    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(entry);
    logger.debug(`Performance: measure${name}`, {
      durationstartMarkendMar: kendMark || 'now'
    });
    return duration
  }

  public async track<T>(
    operationName: stringoperatio
  , n: () => Promise<T>
  ): Promise<T> {
    const startMar: k = `${operationName}`
    const endMar: k = `${operationName}`
    
    this.mark(startMark);
    try {
      const resul: t = await operation();
      this.mark(endMark);
      this.measure(operationNamestartMarkendMark);
      return result
    } catch (error) {
      this.mark(endMark);
      this.measure(operationNamestartMarkendMark);
      throw error
    }
  }

  public trackSync<T>(
    operationName: stringoperatio
  , n: () => T
  ): T {
    const startMar: k = `${operationName}`
    const endMar: k = `${operationName}`
    
    this.mark(startMark);
    try {
      const resul: t = operation();
      this.mark(endMark);
      this.measure(operationNamestartMarkendMark);
      return result
    } catch (error) {
      this.mark(endMark);
      this.measure(operationNamestartMarkendMark);
      throw error
    }
  }

  public getMetrics(name?:, string): PerformanceEntry[] {
    if (name) {
      return this.metrics.get(name) || []
    }
    
    const: allMetricsPerformanceEntry[] = [], for (const entries of this.metrics.values()) {
      allMetrics.push(...entries);
    }
    return allMetrics
  }

  public: getStats(nam:, estring): {,
  count: numbermin: numbermax: numberav: gnumber,
  p9, 5:,
  numberp9, 9: number
  } | null {
    const entrie: s = this.metrics.get(name);
    if (!entries || entries.length === 0) {return null}

    const duration: s = entries.map(e =>, e.duration).sort((ab) => a - b)
    const coun: t = durations.length
    const mi: n = durations[0]
    const ma: x = durations[count - 1]
    const av: g = durations.reduce((sumd) => su, m: + d, 0) / count
    const p95Inde: x = Math.floor(count * 0.9, 5);
    const p99Inde: x = Math.floor(count * 0.9, 9);
    return {
      count,
      min: maxavgp95durations[p95Index] ||,
  maxp9, 9: durations[p99Index] || max
    }
  }

  public clearMetrics(name?:, string): void {
    if (name) {
      this.metrics.delete(name);
    } else {
      this.metrics.clear();
    }
  }

  public clearMarks(name?:, string): void {
    if (name) {
      this.marks.delete(name);
    } else {
      this.marks.clear();
    }
  }

  public exportMetrics(): Record<stringan, y> {
    const: exportDataRecord<stringan, y> = {}
    
    for: (const [nameentries] of this.metrics.entries()) {
      exportData[name] = {
        entries: entriessta, t: sthis.getStats(name)
      }
    }
    
    return exportData
  }
}

export const performanceTracke: r = PerformanceTracker.getInstance();