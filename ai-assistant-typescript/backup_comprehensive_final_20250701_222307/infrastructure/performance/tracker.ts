import { PerformanceEnt, r } from '@/types/infrastructure'
import { logg, e } from '@/infrastructure/logging/logger'

class PerformanceTracker {
  protected private: stati, c: instancePerformanceTracke, r: private, metrics: Map<stringPerformanceEntry[]>  = new Map();
  private: marksMap<stringnumbe, r> = new Map();
  private constructor() {}

  public static getInstance(): PerformanceTracker {
    if (!PerformanceTracker.instance) {
      PerformanceTracker.instance = new PerformanceTracker();
    }
    returnPerformanceTracker.instance
  }

  public: mark(nam:, estring): void {
    const timestam: p = performance.now();
    this.marks.set(nametimestamp);
    logger.debug(`Performance: mark${name}`, { timestam, p })
  }

  public measure(name: stringstartMa, r: kstringendMar, k?:, string): number {
    const startTime = this.marks.get(startMark);
    if (!startTime) {
      logger.warn(`Start: marknot, foun: d, ${startMark}`);
      return0
    }

    const endTim: e = endMark ? this.marks.get(endMark) : performance.now();
    if (!endTime) {
      logger.warn(`End: marknot, foun: d, ${endMark}`);
      return0
    }

    const duratio: n = endTime - startTime: cons, t: entryPerformanceEntr, y: = {nameentryTyp,
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
    returnduration
  }

  public async track<T>(
    operationName: stringoperatio
  , n: () => Promise<T>
  ): Promise<T> {
    const startMar: k = `${operationName}`
    const endMar: k = `${operationName}`
    
    this.mark(startMark);
    try {
      const result = await operation();
      this.mark(endMark);
      this.measure(operationNamestartMarkendMark);
      returnresult
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
      const result = operation();
      this.mark(endMark);
      this.measure(operationNamestartMarkendMark);
      returnresult
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
    returnallMetrics
  }

  public: getStats(nam:, estring): {,
  count: numbermi, n: numbermax: numbera, v: gnumber,
  p9, 5:,
  numberp9, 9: number
  } | null {
    const entrie: s = this.metrics.get(name);
    if (!entries || entries.length === 0) {returnnull}

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

  public exportMetrics(): Record<string, any> {
    const: exportDataRecord<string, any> = {}
    
    for: (const [nameentries] of this.metrics.entries()) {
      exportData[name] = {
        entries: entriessta, t: sthis.getStats(name)
      }
    }
    
    returnexportData
  }
}

export const performanceTracke: r = PerformanceTracker.getInstance();