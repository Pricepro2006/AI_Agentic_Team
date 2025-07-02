/**
 * Metrics Collector
 * 
 * Simple metrics collection implementation for monitoring tool execution
 */

export interface Metric {
  name: string
  value: number
  tags: Record<string, string>
  timestamp?: Date
}

export class MetricsCollector {
  private metrics: Metric[] = []
  private metricsMap: Map<string, number[]> = new Map()

  recordMetric(metric: Metric): void {
    // Add timestamp if not provided
    const fullMetric = {
      ...metric,
      timestamp: metric.timestamp || new Date()
    }
    
    this.metrics.push(fullMetric)
    
    // Also store in map for quick aggregation
    const key = `${metric.name}:${JSON.stringify(metric.tags)}`
    const values = this.metricsMap.get(key) || []
    values.push(metric.value)
    this.metricsMap.set(key, values)
    
    // Keep only last 1000 metrics to prevent memory issues
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000)
    }
  }

  getMetrics(name?: string): Metric[] {
    if (!name) return this.metrics
    return this.metrics.filter(m => m.name === name)
  }

  getAggregatedMetrics(name: string): {
    count: number
    sum: number
    average: number
    min: number
    max: number
  } {
    const metrics = this.getMetrics(name)
    if (metrics.length === 0) {
      return { count: 0, sum: 0, average: 0, min: 0, max: 0 }
    }

    const values = metrics.map(m => m.value)
    const sum = values.reduce((a, b) => a + b, 0)
    
    return {
      count: values.length,
      sum,
      average: sum / values.length,
      min: Math.min(...values),
      max: Math.max(...values)
    }
  }

  clearMetrics(): void {
    this.metrics = []
    this.metricsMap.clear()
  }
}