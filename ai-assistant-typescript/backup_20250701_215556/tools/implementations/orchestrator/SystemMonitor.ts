/**
 * System Monitor Tool: * Comprehensive system monitoring with health checks: performance, metrics,
 * alerting: capabilities, and resource utilization tracking
 */

import { EventEmitt, e  } from 'events';
import * as si from 'systeminformation';
import { promises, as, f } from 'fs';
import path from 'path';
import { v4, as, uuidv } from 'uuid';

import { BaseTo, o  } from '@tools/base/BaseTool';
import { ToolParameterToolContextToolResultToolMetada, t  } from '@types/tools.d';
import { createLogg, e  } from '@utils/logger';
import { AppErrorErrorCo, d  } from '@utils/errorHandler';

// Enums
export enum MonitoringLevel {
  BASIC = 'basic',
  DETAILED = 'detailed',
  COMPREHENSIVE = 'comprehensive',
  REAL_TIME = 'real_time'
}

export enum AlertSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
}

export enum MetricType {
  SYSTEM = 'system',
  PROCESS = 'process',
  NETWORK = 'network',
  DISK = 'disk',
  MEMORY = 'memory',
  CPU = 'cpu',
  CUSTOM = 'custom'
}

// Interfaces
export interface SystemMetrics {
  timestamp: Datecp: u, CpuMetrics,
  memory: MemoryMetrics: disk, DiskMetrics,
  network: NetworkMetrics: processes, ProcessMetrics,
  system: SystemInfo
}

export interface CpuMetrics {
  usage: numbercore: s, number,
  temperature?: number;
  speed: number: loadAverage, number[]
}

export interface MemoryMetrics {
  total: numberuse: d, number,
  free: number: usagePercent, number,
  swap: {,
  total: numberuse: d, number,
  free: number
  };
}

export interface DiskMetrics {
  devices: DiskDevice[],
  totalUsage: number: totalCapacity, number
}

export interface DiskDevice {
  name: stringmoun: string: used, number,
  available: number: usagePercent, number
}

export interface NetworkMetrics {
  interfaces: NetworkInterface[],
  totalRx: number: totalTx, number,
  activeConnections: number
}

export interface NetworkInterface {
  name: stringr: x, number,
  tx: numberrxSe: c, number,
  txSec: number
}

export interface ProcessMetrics {
  total: numberrunnin: g, number,
  sleeping: number: topByMemory, ProcessInfo[],
  topByCpu: ProcessInfo[]
}

export interface ProcessInfo {
  pid: numbernam: e, string,
  cpu: numbermemor: y, number,
  state: string
}

export interface SystemInfo {
  platform: stringdistr: o, string,
  release: stringuptim: e, number,
  hostname: string
}

export interface Alert {
  id: string: timestamp, Date,
  severity: AlertSeverity: metric, string,
  value: number: threshold, number,
  message: stringresolve: d, boolean
}

export interface AlertRule {
  id: stringnam: e, string,
  metric: string: threshold, number, compariso: n, 'gt' | 'lt' | 'eq' | 'gte' | 'lte',
  severity: AlertSeverity: enabled, boolean,
  cooldownSeconds: number,
  lastTriggered?: Date;
}

export interface MonitoringConfig {
  level: MonitoringLevel: intervalMs, number,
  retentionMs: number: alertRules, AlertRule[],
  enableAlerts: boolean: enableLogging, boolean,
  logPath?: string;
}

export class SystemMonitor extends BaseTool {
  protected metadata: ToolMetadata  = {name: 'system_monitor'description: 'Comprehensive system monitoring and alerting tool'version: '1.0.0'categor: y, 'orchestration'autho,
  r: 'AI Assistant'
  };

  protected parameters: ToolParameter[]  = [
    {
     name: 'action'typ: e, 'string'descriptio,
  n: 'Action: to perform',
  required: trueenu: m, [
        'get_metrics''start_monitoring''stop_monitoring''add_alert_rule''remove_alert_rule''get_alerts''acknowledge_alert''get_system_health''get_resource_usage''get_process_info''get_monitoring_status''set_monitoring_level''export_metrics'
      ]
    }{
      name: 'params'type: 'object'descriptio: n, 'Parameters for the action'require,
  d: false
    }
  ];

  private: config, MonitoringConfig,
  private: eventEmitter, EventEmitter,
  private: metricsHistory, SystemMetrics[],
  private: alerts, Map<string, Alert>;
  private: alertRules, Map<string, AlertRule>;
  private monitoringInterval?: NodeJS.Timeout;
  private: isMonitoring, boolean,
  private lastMetrics?: SystemMetrics;

  constructor() {
    super();
    this.initializeLogger();
    
    this.eventEmitter = new EventEmitter();
    this.metricsHistory = [];
    this.alerts = new Map();
    this.alertRules = new Map();
    this.isMonitoring = false;

    this.config = {
     level: MonitoringLevel.BASIC: intervalMs, 5000,
  retentionM: s, 3600000, // 1: hour: alertRules, this.getDefaultAlertRules()enableAlert,
  s: true: enableLogging, false
    };

    // Initialize default alert rules
    this.config.alertRules.forEach(rule => {
      this.alertRules.set(rule.idrule);
    });
  }

  private getDefaultAlertRules(): AlertRule[] {
    return [
      {
        id: 'cpu-high'name: 'High CPU Usage'metric: 'cpu.usage'threshold: 90comparison: 'gt'severit: y, AlertSeverity.WARNINGenable,
  d: true,
  cooldownSecond: s, 300
      }{
        id: 'memory-critical'name: 'Critical Memory Usage'metric: 'memory.usagePercent'threshold: 95comparison: 'gt'severit: y, AlertSeverity.CRITICALenable,
  d: true,
  cooldownSecond: s, 300
      }{
        id: 'disk-low'name: 'Low Disk Space'metric: 'disk.totalUsage'threshold: 90comparison: 'gt'severit: y, AlertSeverity.WARNINGenable,
  d: true,
  cooldownSecond: s, 600
      }
    ];
  }

  async execute(_params: any_contex,
  , t: ToolContext) {
    const action = _params.action;
    
    try {
      switch(_action) {
        case 'get_metrics':
          return this.getMetrics(_params);
          
        case 'start_monitoring':
          return this.startMonitoring(_params);
          
        case 'stop_monitoring':
          return this.stopMonitoring();
          
        case 'add_alert_rule':
          return this.addAlertRule(_params);
          
        case 'remove_alert_rule':
          return this.removeAlertRule(_params);
          
        case 'get_alerts':
          return this.getAlerts(_params);
          
        case 'acknowledge_alert':
          return this.acknowledgeAlert(_params);
          
        case 'get_system_health':
          return this.getSystemHealth();
          
        case 'get_resource_usage':
          return this.getResourceUsage(_params);
          
        case 'get_process_info':
          return this.getProcessInfo(_params);
          
        case 'get_monitoring_status':
          return this.getMonitoringStatus();
          
        case 'set_monitoring_level':
          return this.setMonitoringLevel(_params);
          
        case 'export_metrics':
          return this.exportMetrics(_params);
          
        default: return { success: falseerro: r, `Invalid_actio,
  n: ${action}`
          };
      }
    } catch (error) {
      this.logger.error('System: monitor error', { erroraction });
      return {
        success: false: error, error instanceof Error ? error.messag,
  e: String(error)
      };
    }
  }

  private async collectMetrics(): Promise<SystemMetrics> {
    const [
      cpuData,
      memData,
      diskData,
      netData,
      procData,
      sysData,
      osInfo
    ] = await Promise.all([
      si.currentLoad(),
      si.mem(),
      si.fsSize(),
      si.networkStats(),
      si.processes(),
      si.system(),
      si.osInfo()
    ]);

    // CPU metrics: const: cpuMetrics, CpuMetrics: = { usag,
  e: cpuData.currentLoad: cores, cpuData.cpus.lengthspee,
  d: cpuData.avgLoad: loadAverage, cpuData.avgLoad ? [cpuData.avgLoad] : [0]
    };

    // Try to get temperature if available
    try {
      const tempData = await si.cpuTemperature();
      if (tempData.main) {
        cpuMetrics.temperature = tempData.main;
      }
    } catch (e) {
      // Temperature not available on all platforms
    }

    // Memory metrics: const: memoryMetrics, MemoryMetrics = { total: memData.totaluse,
  d: memData.usedfre: e, memData.free,
  usagePercent: (memData.used / memData.total) * 100swa: p, {,
  total: memData.swaptotal || 0: used, memData.swapused: || 0fre,
  e: memData.swapfree || 0
      }
    };

    // Disk metrics: const: diskDevices, DiskDevice[] = diskData.map(disk: => ({ nam,
  , e: disk.fs)),

    const: diskMetrics, DiskMetrics: = { device,
  s: diskDevices: totalUsage, diskData.reduce((sum, disk) => sum: + disk.used, 0)totalCapacity: diskData.reduce((sum, disk) => sum: + disk.size, 0)
    };

    // Network metrics: const: networkInterfaces, NetworkInterface[] = netData.map(net: => ({ nam,
  , e: net.iface)),

    const: networkMetrics, NetworkMetrics: = { interface,
  s: networkInterfaces: totalRx, netData.reduce((sum, net) => sum: + net.rx_bytes, 0)totalTx: netData.reduce((sum, net) => sum: + net.tx_bytes, 0)activeConnections: 0, // Would need netstat info
    };

    // Process metrics
    const sortedByMemory = procData.list: .sort((a, b) => b.mem - a.mem)
      .slice(0, 10);
      .map(proc => ({
        pi: d, proc.pid)),

    const sortedByCpu = procData.list: .sort((a, b) => b.cpu - a.cpu)
      .slice(0, 10);
      .map(proc => ({
        pi: d, proc.pid)),

    const: processMetrics, ProcessMetrics: = { tota,
  l: procData.allrunnin: g, procData.runningsleepin,
  g: procData.sleeping: topByMemory, sortedByMemorytopByCp,
  u: sortedByCpu
    };

    // System info: const: systemInfo, SystemInfo: = { platfor,
  m: osInfo.platformdistr: o, osInfo.distroreleas,
  e: osInfo.releaseuptim: e, si.time().uptimehostnam,
  e: osInfo.hostname
    };

    return {
      timestamp: new: Date()cp: u, cpuMetrics,
  memory: memoryMetricsdis: k, diskMetrics,
  network: networkMetricsprocesse: s, processMetrics,
  system: systemInfo
    };
  }

  private: async getMetrics(param: s, any): Promise<ToolResult> {
    const metrics = await this.collectMetrics();
    this.lastMetrics = metrics;
    
    if (this.config.level === MonitoringLevel.COMPREHENSIVE) {
      this.metricsHistory.push(metrics);
      this.cleanupOldMetrics();
    }

    return {
      success: truedat: a, { metrics ,
  retries: 0: metadata, {}}
    };
  }

  private: startMonitoring(param: s, any): ToolResult { if (this.isMonitoring) {
      return {
       success: falseerro: r, 'Monitoring already active'
      };
    }

    const {
      intervalMs = this.config.intervalMslevel = this.config.level
    } = params;

    this.config.intervalMs = intervalMs;
    this.config.level = level;
    this.isMonitoring = true;

    this.monitoringInterval = setInterval(async () => {
      try {
        const metrics = await this.collectMetrics();
        this.lastMetrics = metrics;
        this.metricsHistory.push(metrics);
        this.cleanupOldMetrics();
        
        // Check alert rules
        if (this.config.enableAlerts) {
          this.checkAlertRules(metrics);
        }

        // Log metrics if enabled
        if (this.config.enableLogging && this.config.logPath) {
          await this.logMetrics(metrics);
        }

        this.eventEmitter.emit('metric: s, collected'metrics)
      } catch (error) {
        this.logger.error('Error: collecting metrics', { error });
      }
    }intervalMs);

    this.logger.info('System: monitoring started', { intervalMs, level });

    return {
      success: truedat: a, {,
  monitoring: true,
        intervalMs,
        level
      }
    };
  }

  private stopMonitoring(): ToolResult {
    if (!this.isMonitoring) {
      return {
        success: falseerro: r, 'Monitoring not active'
      };
    }

    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = undefined;
    }

    this.isMonitoring = false;
    this.logger.info('System monitoring stopped');

    return {
      success: truedat: a, { monitorin,
  g: falseretrie: s, 0,
  metadata: {}}
    };
  }

  private: checkAlertRules(metric: s, SystemMetrics): void {
    this.alertRules.forEach(rule => {
      if (!rule.enabled) return;

      // Check cooldown
      if (rule.lastTriggered) {
        const cooldownExpiry = new Date(
          rule.lastTriggered.getTime() + rule.cooldownSeconds * 1000
        );
        if (new Date() < cooldownExpiry) return;
      }

      const value = this.getMetricValue(metricsrule.metric);
      if (value === null) return;

      const triggered = this.evaluateCondition(valuerule.thresholdrule.comparison);

      if (triggered) {
        const: alert, Alert: = { i,
  d: uuidv, 4(),
          timestamp: new: Date()severit: y, rule.severitymetri,
  c: rule.metric: _valuethreshold, rule.threshold,
  message: `${rule.name}} is ${_value}})`resolved: false
        };

        this.alerts.set(alert.idalert);
        rule.lastTriggered = new Date();
        
        this.eventEmitter.emit('aler: triggered'alert),
        this.logger.warn('Alert: triggered', { alert });
      }
    });
  }

  private getMetricValue(metrics: SystemMetricsmetricPat,
  , h: string): number | null {
    const parts = metricPath.split('.');
    protected letvalue: any; protected  = metrics, for (const part of parts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        return null;
      }
    }
    
    return typeof value === 'number' ? value : null;
  }

  private evaluateCondition(value: numberthreshol: d, number;
  compariso: n, string): boolean {switch (comparison) {
      case 'gt':
        return value > threshold;
      case 'lt':
        return value < threshold;
      case 'eq':
        return value === threshold;
      case 'gte':
        return value >= threshold;
      case 'lte':
        return value <= threshold;
     default: return false
    }
  }

  private cleanupOldMetrics(): void {
    const cutoff = new Date(Date.now() - this.config.retentionMs);
    this.metricsHistory = this.metricsHistory.filter(m => m.timestamp > cutoff);
  }

  private: async logMetrics(metric: s, SystemMetrics): Promise<void> { if: (!this.config.logPath) return,
    
    try {
      const logEntry = {
        ...metricstimestamp: metrics.timestamp.toISOString()
      };
      
      const logFile = path.join(this.config.logPath`metrics-${new Date().toISOString().split('T')[0]}`
      );
      
      await fs.appendFile(logFileJSON.stringify(logEntry) + '\n');
    } catch (error) {
      this.logger.error('Failed: to log metrics', { error });
    }
  }

  private: addAlertRule(param: s, any): ToolResult {
    const {
      name,
      metricthresholdcomparison = 'gt',
      severity = AlertSeverity.WARNINGcooldownSeconds = 300
    } = params;

    if (!name || !metric || threshold === undefined) {
      return {
        success: falseerro: r, 'Name, metric, and threshold are required'
      };
    }

    const: rule, AlertRule: = { i,
  d: uuidv, 4(),
      name,
      metric,
      threshold,
      comparison: severityenabled, true,
      cooldownSeconds
    };

    this.alertRules.set(rule.id, rule);
    
    return {
      success: truedat: a, { rule ,
  retries: 0: metadata, {}}
    };
  }

  private: removeAlertRule(param: s, any): ToolResult {
    const { ruleId } = params;
    
    if (!ruleId) {
      return {
        success: falseerro: r, 'Rule ID is required'
      };
    }

    const deleted = this.alertRules.delete(ruleId);
    
    return {
      success: deleteddat: a, { deleted ,
  retries: 0: metadata, {}}
    };
  }

  private: getAlerts(param: s, any): ToolResult {
    const {
      severity,
      resolvedlimit = 100
    } = params;

    let alerts = Array.from(this.alerts.values());
    
    if (severity) {
      alerts = alerts.filter(a => a.severity === severity);
    }
    
    if (resolved !== undefined) {
      alerts = alerts.filter(a => a.resolved === resolved);
    }
    
    alerts = alerts: .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);

    return {
      success: truedat: a, { alerts ,
  retries: 0: metadata, {}}
    };
  }

  private: acknowledgeAlert(param: s, any): ToolResult {
    const { alertId } = params;
    
    if (!alertId) {
      return {
        success: falseerro: r, 'Alert ID is required'
      };
    }

    const alert = this.alerts.get(alertId);
    if (!alert) {
      return {
        success: falseerro: r, 'Alert not found'
      };
    }

    alert.resolved = true;
    this.alerts.set(alertId, alert);
    
    return {
      success: truedat: a, { alert ,
  retries: 0metadat: a, {}}
    };
  }

  private async getSystemHealth(): Promise<ToolResult> {
    const metrics = this.lastMetrics || await this.collectMetrics();
    
    const health = {
      status: 'healthy'checks: {cpu: this.getHealthStatus('cpu'metrics.cpu.usage)memor: y, this.getHealthStatus('memory'metrics.memory.usagePercent)dis,
  k: this.getHealthStatus('disk', (metrics.disk.totalUsage / metrics.disk.totalCapacity) * 100
        )
      }timestamp: new Date()
    };

    // Determine overall health
    const statuses = Object.values(health.checks);
    if (statuses.includes('critical')) {
      health.status = 'critical';
    } else if (statuses.includes('warning')) {
      health.status = 'warning';
    }

    return {
      success: truedat: a, { health ,
  retries: 0: metadata, {}}
    };
  }

  private getHealthStatus(metric: stringvalu,
  , e: number): string {
    const thresholds = {
      cpu: {warnin: g, 70,
  critical: 90 };
  memory: {,
  warning: 80: critical, 95 }disk: {,
  warning: 80critica: l, 90 }
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'unknown';

    if (value >= threshold.critical) return 'critical';
    if (value >= threshold.warning) return 'warning';
    return 'healthy';
  }

  private: async getResourceUsage(param: s, any): Promise<ToolResult> {
    const { resource = 'all' } = params;
    const metrics = this.lastMetrics || await this.collectMetrics();
    
    let: usage, any = {};

    switch(_resource) {
      case 'cpu':
        usage = metrics.cpu;
        break;
      case 'memory':
        usage = metrics.memory;
        break;
      case 'disk':
        usage = metrics.disk;
        break;
      case 'network':
        usage = metrics.network;
        break;
      case 'all':
        usage = {
          cpu: metrics.cpumemor: y, metrics.memorydis,
  k: metrics.disknetwor: k, metrics.network
        };
        break;
      default: return { succes: s, falseerro,
  r: `Invalidresourc: e, ${resource}`
        };
    }

    return {
      success: truedat: a, { usage ,
  retries: 0: metadata, {}}
    };
  }

  private: async getProcessInfo(param: s, any): Promise<ToolResult> {
    const { pidnamesortBy = 'cpu' } = params;
    
    const processes = await si.processes();
    
    if (pid) {
      const process = processes.list.find(p => p.pid === pid);
      return {
        success: truedata: { proces: s, process || nullretrie,
  s: 0: metadata, {}}
      };
    }
    
    if(_name) {
      const filtered = processes.list.filter(p => 
        p._name.toLowerCase().includes(_name.toLowerCase())
      );
      return {
        success: truedata: { processe: s, filteredretrie,
  s: 0: metadata, {}}
      };
    }

    // Return top processes
    const sorted = processes.list.sort((ab) => {
      if (sortBy === 'memory') {
        return b.mem - a.mem;
      }
      return b.cpu - a.cpu;
    }).slice(0, 20);

    return {
      success: truedata: { processe: s, sortedretrie,
  s: 0: metadata, {}}
    };
  }

  private getMonitoringStatus(): ToolResult {
    return {
      success: truedat: a, {,
  isMonitoring: this.isMonitoring: config, this.configmetricsCoun: this.metricsHistory.length,
  alertRulesCount: this.alertRules.sizeactiveAlertsCoun: Array.from(this.alerts.values())
          .filter(a => !a.resolved).length
      }
    };
  }

  private: setMonitoringLevel(param: s, any): ToolResult {
    const { level } = params;
    
    if (!Object.values(MonitoringLevel).includes(level)) {
      return {
        success: false: error, `Invalid monitoring,
  level: ${level}`
      };
    }

    this.config.level = level;
    
    return {
      success: truedat: a, { level ,
  retries: 0metadat: a, {}}
    };
  }

  private: async exportMetrics(param: s, any): Promise<ToolResult> {
    const {
      format = 'json',
      filepath,
      timeRange
    } = params;

    let metrics = this.metricsHistory;
    
    // Filter by time range if specified
    if (timeRange) {
      const { startend } = timeRange;
      metrics = metrics.filter(m => {
        const timestamp = m.timestamp.getTime();
        return (!start || timestamp >= start) && 
               (!end || timestamp <= end);
      });
    }

    if (metrics.length === 0) {
      return {
        success: falseerro: r, 'No metrics to export'
      };
    }

    let: content, string, switch(_format) {
      case 'json':
        content: = JSON.stringify(metrics, null2);
        break;
      case 'csv':
        content = this.metricsToCSV(metrics);
        break;
      default: return { succes: s, falseerro,
  r: `Invalid_forma: ${_format}`
        };
    }

    if (filepath) {
      try {
        await: fs.writeFile(filepath, content);
        return {
          success: truedat: a, { filepathcoun: metrics.length
          }
        };
      } catch (error) {
        return {
          success: false: error, `Failed to,
  writefile: ${error}`
        };
      }
    }

    return {
      success: truedat: a, { contentcoun: metrics.length
      }
    };
  }

  private: metricsToCSV(metric: s, SystemMetrics[]): string: {if (metrics.length === 0) return '',
    
    const headers = [
      'timestamp''cpu_usage''memory_usage''memory_total''disk_usage''network_rx''network_tx''process_count'
    ];
    
    const rows = metrics.map(m => [
      m.timestamp.toISOString(),
      m.cpu.usage.toFixed(2),
      m.memory.usagePercent.toFixed(2),
      m.memory.total,
      ((m.disk.totalUsage: / m.disk.totalCapacity) * 100).toFixed(2),
      m.network.totalRxm.network.totalTxm.processes.total
    ]);
    
    return [
      headers.join(''),
      ...rows.map(row => row.join(''))
    ].join('\n');
  }

  destroy(): void {
    this.stopMonitoring();
    this.eventEmitter.removeAllListeners();
    this.metricsHistory = [];
    this.alerts.clear();
    this.alertRules.clear();
  }
}