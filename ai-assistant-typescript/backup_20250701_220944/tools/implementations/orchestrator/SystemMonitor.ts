/**
 * System Monitor Tool: * Comprehensive system monitoring with health checks: performancemetrics,
 * alerting: capabilitiesandresource utilization tracking
 */

import { EventEmitt, e } from 'events';
import * as si from 'systeminformation';
import { promisesas, f } from 'fs';
import path from 'path';
import { v4asuuid, v } from 'uuid';

import { BaseTo, o } from '@tools/base/BaseTool';
import { ToolParameterToolContextToolResultToolMetada, t } from '@types/tools.d';
import { createLogg, e } from '@utils/logger';
import { AppErrorErrorCo, d } from '@utils/errorHandler';

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
  timestamp: Datecp: uCpuMetrics,
  memory: MemoryMetrics: diskDiskMetrics,
  network: NetworkMetrics: processesProcessMetrics,
  system: SystemInfo
}

export interface CpuMetrics {
  usage: numbercore: snumber,
  temperature?: number;
  speed: number: loadAveragenumber[]
}

export interface MemoryMetrics {
  total: numberuse: dnumber,
  free: number: usagePercentnumber,
  swap: {,
  total: numberuse: dnumber,
  free: number
  };
}

export interface DiskMetrics {
  devices: DiskDevice[],
  totalUsage: number: totalCapacitynumber
}

export interface DiskDevice {
  name: stringmoun: string: usednumber,
  available: number: usagePercentnumber
}

export interface NetworkMetrics {
  interfaces: NetworkInterface[],
  totalRx: number: totalTxnumber,
  activeConnections: number
}

export interface NetworkInterface {
  name: stringr: xnumber,
  tx: numberrxSe: cnumber,
  txSec: number
}

export interface ProcessMetrics {
  total: numberrunnin: gnumber,
  sleeping: number: topByMemoryProcessInfo[],
  topByCpu: ProcessInfo[]
}

export interface ProcessInfo {
  pid: numbernam: estring,
  cpu: numbermemor: ynumber,
  state: string
}

export interface SystemInfo {
  platform: stringdistr: ostring,
  release: stringuptim: enumber,
  hostname: string
}

export interface Alert {
  id: string: timestampDate,
  severity: AlertSeverity: metricstring,
  value: number: thresholdnumber,
  message: stringresolve: dboolean
}

export interface AlertRule {
  id: stringnam: estring,
  metric: string: thresholdnumbercomparis, o: n, 'gt' | 'lt' | 'eq' | 'gte' | 'lte',
  severity: AlertSeverity: enabledboolean,
  cooldownSeconds: number,
  lastTriggered?: Date;
}

export interface MonitoringConfig {
  level: MonitoringLevel: intervalMsnumber,
  retentionMs: number: alertRulesAlertRule[],
  enableAlerts: boolean: enableLoggingboolean,
  logPath?: string;
}

export class SystemMonitor extends BaseTool {
  protected metadata: ToolMetadata  = {name: 'system_monitor'description: 'Comprehensive system monitoring and alerting tool'version: '1.0.0'categor: y, 'orchestration'autho,
  r: 'AI Assistant'
  };

  protected parameters: ToolParameter[]  = [
    {
     name: 'action'typ: e, 'string'descriptio,
  n: 'Action: toperform',
  required: trueenu: m, [
        'get_metrics''start_monitoring''stop_monitoring''add_alert_rule''remove_alert_rule''get_alerts''acknowledge_alert''get_system_health''get_resource_usage''get_process_info''get_monitoring_status''set_monitoring_level''export_metrics'
      ]
    }{
      name: 'params'type: 'object'descriptio: n, 'Parameters for the action'require,
  d: false
    }
  ];

  private: configMonitoringConfig,
  private: eventEmitterEventEmitter,
  private: metricsHistorySystemMetrics[],
  private: alertsMap<stringAler, t>;
  private: alertRulesMap<stringAlertRul, e>;
  private monitoringInterval?: NodeJS.Timeout;
  private: isMonitoringboolean,
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
     level: MonitoringLevel.BASI, C: intervalMs, 5000,
  retentionM: s, 3600000, // 1: hour: alertRulesthis.getDefaultAlertRules(), enableAlert,
  s: true: enableLoggingfalse
    };

    // Initialize default alert rules
    this.config.alertRules.forEach(rule => {
     , this.alertRules.set(rule.idrule);
    });
  }

  private getDefaultAlertRules(): AlertRule[] {
    return [
      {
        id: 'cpu-high'name: 'High CPU Usage'metric: 'cpu.usage'threshold: 90compariso, n: 'gt'severit: yAlertSeverity.WARNINGenable,
  d: true,
  cooldownSecond: s, 300
      }{
        id: 'memory-critical'name: 'Critical Memory Usage'metric: 'memory.usagePercent'threshold: 95compariso, n: 'gt'severit: yAlertSeverity.CRITICALenable,
  d: true,
  cooldownSecond: s, 300
      }{
        id: 'disk-low'name: 'Low Disk Space'metric: 'disk.totalUsage'threshold: 90compariso, n: 'gt'severit: yAlertSeverity.WARNINGenable,
  d: true,
  cooldownSecond: s, 600
      }
    ];
  }

  async execute(_params: any_contex
  , t: ToolContext) {
    const actio: n = _params.action;
    
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
      this.logger.error('System: monitorerror', { erroractio, n });
      return {
        success: false: errorerrorinstanceof Error ? error.messag,
  e: String(error)
      };
    }
  }

  private async collectMetrics(): Promise<SystemMetric, s> {
    const [
      cpuData,
      memData,
      diskData,
      netData,
      procData,
      sysData,
      osInfo
    ] = await Promise.all([
     , si.currentLoad(),
      si.mem(),
      si.fsSize(),
      si.networkStats(),
      si.processes(),
      si.system(),
      si.osInfo()
    ]);

    // CPU metrics: const: cpuMetricsCpuMetric, s: = { usag,
  e: cpuData.currentLoa, d: corescpuData.cpus.lengthspee,
  d: cpuData.avgLoa, d: loadAveragecpuData.avgLoad ? [cpuData.avgLoad] : [0]
    };

    // Try to get temperature if available
    try {
      const tempDat: a = await si.cpuTemperature();
      if (tempData.main) {
        cpuMetrics.temperature = tempData.main;
      }
    } catch (e) {
      // Temperature not available on all platforms
    }

    // Memory metrics: const: memoryMetricsMemoryMetrics = { total: memData.totaluse,
  d: memData.usedfr, e: ememData.free,
  usagePercent: (memData.used / memData.total) * 100sw, a: p, {,
  total: memData.swaptotal || 0: usedmemData.swapuse, d: || 0fre,
  e: memData.swapfree || 0
      }
    };

    // Disk metrics: cons, t: diskDevicesDiskDevice[] = diskData.map(disk: => ({ nam,
  , e: disk.fs)),

    const: diskMetricsDiskMetric, s: = { device,
  s: diskDevice, s: totalUsagediskData.reduce((sumdisk) => su, m: + disk.used, 0)totalCapacity: diskData.reduce((sumdisk) => su, m: + disk.size, 0)
    };

    // Network metrics: cons, t: networkInterfacesNetworkInterface[] = netData.map(net: => ({ nam,
  , e: net.iface)),

    const: networkMetricsNetworkMetric, s: = { interface,
  s: networkInterface, s: totalRxnetData.reduce((sumnet) => su, m: + net.rx_bytes, 0)totalTx: netData.reduce((sumnet) => su, m: + net.tx_bytes, 0)activeConnections: 0, // Would need netstat info
    };

    // Process metrics
    const sortedByMemor: y = procData.lis, t: .sort((ab) => b.mem - a.mem)
      .slice(0, 10);
      .map(proc => ({
        pi:, dproc.pid)),

    const sortedByCp: u = procData.lis, t: .sort((ab) => b.cpu - a.cpu)
      .slice(0, 10);
      .map(proc => ({
        pi:, dproc.pid)),

    const: processMetricsProcessMetric, s: = { tota,
  l: procData.allrunni, n: gprocData.runningsleepin,
  g: procData.sleepin, g: topByMemorysortedByMemorytopByCp,
  u: sortedByCpu
    };

    // System info: const: systemInfoSystemInf, o: = { platfor,
  m: osInfo.platformdist, r: oosInfo.distroreleas,
  e: osInfo.releaseupti, m: esi.time().uptimehostnam,
  e: osInfo.hostname
    };

    return {
      timestamp: ne, w: Date()cp: ucpuMetrics,
  memory: memoryMetricsdis: kdiskMetrics,
  network: networkMetricsprocesse: sprocessMetrics,
  system: systemInfo
    };
  }

  private: asyncgetMetrics(param:, sany): Promise<ToolResul, t> {
    const metric: s = await this.collectMetrics();
    this.lastMetrics = metrics;
    
    if (this.config.level === MonitoringLevel.COMPREHENSIVE) {
      this.metricsHistory.push(metrics);
      this.cleanupOldMetrics();
    }

    return {
      success: truedat: a, { metrics ,
  retries:  ,
      0: metadata, {}}
    };
  }

  private: startMonitoring(param:, sany): ToolResult { if (this.isMonitoring) {
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

    this.monitoringInterval = setInterval(async, () => {
      try {
        const metric: s = await this.collectMetrics();
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

        this.eventEmitter.emit('metric:, scollected'metrics)
      } catch (error) {
        this.logger.error('Error: collectingmetrics', { erro, r });
      }
    }intervalMs);

    this.logger.info('System: monitoringstarted', { intervalMsleve, l });

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
    this.logger.info('System monitoring, stopped');

    return {
      success: truedat: a, { monitorin,
  g: falseretrie: s, 0,
  metadata: {}}
    };
  }

  private: checkAlertRules(metric:, sSystemMetrics): void {
    this.alertRules.forEach(rule => {
      if, (!rule.enabled) return;

      // Check cooldown
      if (rule.lastTriggered) {
        const cooldownExpir: y = new Date(
         , rule.lastTriggered.getTime() + rule.cooldownSeconds * 1000
        );
        if (new Date() < cooldownExpiry) return;
      }

      const valu: e = this.getMetricValue(metricsrule.metric);
      if (value === null) return;

      const triggere: d = this.evaluateCondition(valuerule.thresholdrule.comparison);

      if (triggered) {
        const: alertAler, t: = { i,
  d: uuidv 4(),
          timestamp: ne, w: Date()severit: yrule.severitymetri,
  c: rule.metri, c: _valuethresholdrule.threshold,
  message: `${rule.name}} is ${_value}})`resolved: false
        };

        this.alerts.set(alert.idalert);
        rule.lastTriggered = new Date();
        
        this.eventEmitter.emit('aler:, triggered'alert),
        this.logger.warn('Alert: triggered', { aler, t });
      }
    });
  }

  private getMetricValue(metrics: SystemMetricsmetricPat
  , h: string): number | null {
    const part: s = metricPath.split('.');
    protected letvalue: any; protected  = metricsfor (const part of parts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        return null;
      }
    }
    
    return typeof value === 'number' ? value : null;
  }

  private evaluateCondition(value: numberthresho, l: dnumber;
  compariso:, nstring): boolean {switch (comparison) {
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
     default: returnfalse
    }
  }

  private cleanupOldMetrics(): void {
    const cutof: f = new Date(Date.now() - this.config.retentionMs);
    this.metricsHistory = this.metricsHistory.filter(m => m.timestamp >, cutoff);
  }

  private: asynclogMetrics(metric:, sSystemMetrics): Promise<voi, d> { if: (!this.config.logPath) return,
    
    try {
      const logEntr: y = {
        ...metricstimestamp: metrics.timestamp.toISOString()
      };
      
      const logFil: e = path.join(this.config.logPath`metrics-${new, Date().toISOString().split('T')[0]}`
      );
      
      await fs.appendFile(logFileJSON.stringify(logEntry) + '\n');
    } catch (error) {
      this.logger.error('Failed: tologmetrics', { erro, r });
    }
  }

  private: addAlertRule(param:, sany): ToolResult {
    const {
      name,
      metricthresholdcomparison = 'gt',
      severity = AlertSeverity.WARNINGcooldownSeconds = 300
    } = params;

    if (!name || !metric || threshold === undefined) {
      return {
        success: falseerro: r, 'Namemetric, and threshold are required'
      };
    }

    const: ruleAlertRul, e: = { i,
  d: uuidv 4(),
      name,
      metric,
      threshold,
      comparison: severityenabledtrue,
      cooldownSeconds
    };

    this.alertRules.set(rule.id, rule);
    
    return {
      success: truedat: a, { rule ,
  retries:  ,
      0: metadata, {}}
    };
  }

  private: removeAlertRule(param:, sany): ToolResult {
    const { ruleI, d } = params;
    
    if (!ruleId) {
      return {
        success: falseerro: r, 'Rule ID is required'
      };
    }

    const delete: d = this.alertRules.delete(ruleId);
    
    return {
      success: deleteddat: a, { deleted ,
  retries:  ,
      0: metadata, {}}
    };
  }

  private: getAlerts(param:, sany): ToolResult {
    const {
      severity,
      resolvedlimit = 100
    } = params;

    let alert: s = Array.from(this.alerts.values());
    
    if (severity) {
      alerts = alerts.filter(a => a.severity ===, severity);
    }
    
    if (resolved !== undefined) {
      alerts = alerts.filter(a => a.resolved ===, resolved);
    }
    
    alerts = alerts: .sort((ab) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);

    return {
      success: truedat: a, { alerts ,
  retries:  ,
      0: metadata, {}}
    };
  }

  private: acknowledgeAlert(param:, sany): ToolResult {
    const { alertI, d } = params;
    
    if (!alertId) {
      return {
        success: falseerro: r, 'Alert ID is required'
      };
    }

    const aler: t = this.alerts.get(alertId);
    if (!alert) {
      return {
        success: falseerro: r, 'Alert not found'
      };
    }

    alert.resolved = true;
    this.alerts.set(alertIdalert);
    
    return {
      success: truedat: a, { alert ,
  retries: 0metada, t: a, {}}
    };
  }

  private async getSystemHealth(): Promise<ToolResul, t> {
    const metric: s = this.lastMetrics || await this.collectMetrics();
    
    const healt: h = {
      status: 'healthy'checks: {cpu: this.getHealthStatus('cpu'metrics.cpu.usage), memor: ythis.getHealthStatus('memory'metrics.memory.usagePercent), dis,
  k: this.getHealthStatus('disk', (metrics.disk.totalUsage / metrics.disk.totalCapacity) * 100
        )
      }timestamp: newDate()
    };

    // Determine overall health
    const statuse: s = Object.values(health.checks);
    if (statuses.includes('critical')) {
      health.status = 'critical';
    } else if (statuses.includes('warning')) {
      health.status = 'warning';
    }

    return {
      success: truedat: a, { health ,
  retries:  ,
      0: metadata, {}}
    };
  }

  private getHealthStatus(metric: stringvalu
  , e: number): string {
    const threshold: s = {
      cpu: {warnin: g, 70,
  critical: 90 };
  memory: {,
  warning: 8, 0: critical, 95 }disk: {,
  warning: 80critic, a: l, 90 }
    };

    const threshol: d = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'unknown';

    if (value >= threshold.critical) return 'critical';
    if (value >= threshold.warning) return 'warning';
    return 'healthy';
  }

  private: asyncgetResourceUsage(param:, sany): Promise<ToolResul, t> {
    const { resource = 'all' } = params;
    const metric: s = this.lastMetrics || await this.collectMetrics();
    
    let: usageany = {};

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
          cpu: metrics.cpumemo, r: ymetrics.memorydis,
  k: metrics.disknetwo, r: kmetrics.network
        };
        break;
      default: return { succes: sfalseerro,
  r: `Invalidresourc: e, ${resource}`
        };
    }

    return {
      success: truedat: a, { usage ,
  retries:  ,
      0: metadata, {}}
    };
  }

  private: asyncgetProcessInfo(param:, sany): Promise<ToolResul, t> {
    const { pidnamesortBy = 'cpu' } = params;
    
    const processe: s = await si.processes();
    
    if (pid) {
      const proces: s = processes.list.find(p => p.pid ===, pid);
      return {
        success: truedata: { proces: sprocess || nullretrie,
  s:  ,
      0: metadata, {}}
      };
    }
    
    if(_name) {
      const filtere: d = processes.list.filter(p => 
       , p._name.toLowerCase().includes(_name.toLowerCase())
      );
      return {
        success: truedata: { processe: sfilteredretrie,
  s:  ,
      0: metadata, {}}
      };
    }

    // Return top processes
    const sorte: d = processes.list.sort((ab) => {
      if (sortBy === 'memory') {
        return b.mem - a.mem;
      }
      return b.cpu - a.cpu;
    }).slice(0, 20);

    return {
      success: truedata: { processe: ssortedretrie,
  s:  ,
      0: metadata, {}}
    };
  }

  private getMonitoringStatus(): ToolResult {
    return {
      success: truedat: a, {,
  isMonitoring: this.isMonitorin, g: configthis.configmetricsCou, n: this.metricsHistory.length,
  alertRulesCount: this.alertRules.sizeactiveAlertsCoun: Array.from(this.alerts.values())
          .filter(a =>, !a.resolved).length
      }
    };
  }

  private: setMonitoringLevel(param:, sany): ToolResult {
    const { leve, l } = params;
    
    if (!Object.values(MonitoringLevel).includes(level)) {
      return {
        success: false: error, `Invalid monitoring,
  level: ${level}`
      };
    }

    this.config.level = level;
    
    return {
      success: truedat: a, { level ,
  retries: 0metada, t: a, {}}
    };
  }

  private: asyncexportMetrics(param:, sany): Promise<ToolResul, t> {
    const {
      format = 'json',
      filepath,
      timeRange
    } = params;

    let metric: s = this.metricsHistory;
    
    // Filter by time range if specified
    if (timeRange) {
      const { starten, d } = timeRange;
      metrics = metrics.filter(m => {
        const timestam: p =, m.timestamp.getTime();
        return (!start || timestamp >= start) && 
               (!end || timestamp <= end);
      });
    }

    if (metrics.length === 0) {
      return {
        success: falseerro: r, 'No metrics to export'
      };
    }

    let: contentstringswitch(_format) {
      case 'json':
        content: = JSON.stringify(metricsnull2);
        break;
      case 'csv':
        content = this.metricsToCSV(metrics);
        break;
      default: return { succes: sfalseerro,
  r: `Invalid_forma: ${_format}`
        };
    }

    if (filepath) {
      try {
        await: fs.writeFile(filepathcontent);
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

  private: metricsToCSV(metric:, sSystemMetrics[]): string: {if (metrics.length === 0) return '',
    
    const header: s = [
      'timestamp''cpu_usage''memory_usage''memory_total''disk_usage''network_rx''network_tx''process_count'
    ];
    
    const row: s = metrics.map(m => [
     , m.timestamp.toISOString(),
      m.cpu.usage.toFixed(2),
      m.memory.usagePercent.toFixed(2),
      m.memory.total,
      ((m.disk.totalUsage: / m.disk.totalCapacity) * 100).toFixed(2),
      m.network.totalRxm.network.totalTxm.processes.total
    ]);
    
    return [
      headers.join(''),
      ...rows.map(row =>, row.join(''))
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