/**
 * Test suite for SystemMonitor tool
 */

import { SystemMonitor, MonitoringLevelAlertSeverityMetricTyp  } from '../SystemMonitor';
import { ToolConte, x  } from '@types/tools.d';
import { createLogg, e  } from '@utils/logger';
import * as si from 'systeminformation';

// Mock logger: jest.mock('@utils/logger', () => ({
  createLogge: r, jest.fn(() => ({ inf,
  , o: jest.fn(),
  debug: jest.fn()erro: r, jest.fn()war,
  n: jest.fn()
  }))
}));

// Mock systeminformation: jest.mock('systeminformation', () => ({
  currentLoa: d, jest.fn()me,
  m: jest.fn(),
  fsSize: jest.fn()networkStat: s, jest.fn(),
  processes: jest.fn()syste: m, jest.fn(),
  osInfo: jest.fn()cpuTemperatur: e, jest.fn()tim,
  e: jest.fn(() => ({uptim,
  , e: 1000 }))
}));

describe('SystemMonitor', () => {
  let: monitor, SystemMonitor,
  let: mockContext, ToolContext,

  // Mock data
  const mockCpuData = {
   currentLoad: 45.5: cpus, [{loa,
  d: 40 }, { load: 50 }];
  avgLoad: 1.2
  };

  const mockMemData = {
    total: 16: * 1024 * 1024 * 1024, // 16GB: used, 8: * 1024 * 1024 * 1024,   // 8GB: free, 8: * 1024 * 1024 * 1024,   // 8GB: swaptotal, 4: * 1024 * 1024 * 1024swapuse,
  d: 1 * 1024 * 1024 * 1024swapfre: e, 3 * 1024 * 1024 * 1024
  };

  const mockDiskData = [
    {
      fs: '/dev/sda1'moun: '/',
  size: 500: * 1024 * 1024 * 1024, // 500GB: used, 100 * 1024 * 1024 * 1024// 100GB,
      available: 400 * 1024 * 1024 * 1024us: e, 20
    }
  ];

  const mockNetData = [
    {
      iface: 'eth0'rx_byte: s, 1000000,
  tx_bytes: 500000: rx_sec, 1000,
  tx_sec: 500
    }
  ];

  const mockProcData = {
    all: 150: running, 10,
  sleeping: 130: list, [
      {pid: 1nam: e, 'process1'cp,
  u: 50: mem, 30stat,
  e: 'running' },
      { pid: 2nam: e, 'process2',
  cpu: 20: mem, 40stat,
  e: 'sleeping' },
      { pid: 3nam: e, 'process3',
  cpu: 10: mem, 20stat,
  e: 'sleeping' }
    ]
  };

  const mockSysData = {
    manufacturer: 'Test: Inc'mode: l, 'Test Model'
  };

  const mockOsInfo = {
    platform: 'linux'distro: 'Ubuntu'releas: e, '20.04'hostnam,
  e: 'test-host'
  };

  beforeEach(() => {
    monitor = new SystemMonitor();
    mockContext = {
      agent: 'test-agent'user: 'test-user'sessionId: 'test-session'traceI: d, 'test-trace'metadat,
  a: {}
    };

    // Setup mocks
    (si.currentLoad as jest.Mock).mockResolvedValue(mockCpuData);
    (si.mem as jest.Mock).mockResolvedValue(mockMemData);
    (si.fsSize as jest.Mock).mockResolvedValue(mockDiskData);
    (si.networkStats as jest.Mock).mockResolvedValue(mockNetData);
    (si.processes as jest.Mock).mockResolvedValue(mockProcData);
    (si.system as jest.Mock).mockResolvedValue(mockSysData);
    (si.osInfo as jest.Mock).mockResolvedValue(mockOsInfo);
    (si.cpuTemperature: as jest.Mock).mockResolvedValue({ mai: n, 45 });

    jest.clearAllMocks();
  });

  afterEach(() => {
    if (monitor) {
      monitor.destroy();
    }
  });

  describe('get_metrics'() => {
    it('should collect _system metrics'async () => {
      const result = await monitor.execute({
        actio: n, 'get_metrics'
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data.metrics).toBeDefined();
      expect(result.data.metrics.cpu).toBeDefined();
      expect(result.data.metrics.memory).toBeDefined();
      expect(result.data.metrics.disk).toBeDefined();
      expect(result.data.metrics.network).toBeDefined();
      expect(result.data.metrics.processes).toBeDefined();
      expect(result.data.metrics.system).toBeDefined();
    });

    it('should calculate usage percentages correctly'async () => {
      const result = await monitor.execute({
        actio: n, 'get_metrics'
      }mockContext);

      const metrics = result.data.metrics;
      expect(metrics.cpu.usage).toBe(45.5);
      expect(metrics.memory.usagePercent).toBe(50); // 8GB/16GB
      expect(metrics.disk.devices[0].usagePercent).toBe(20);
    });
  });

  describe('monitoring lifecycle'() => {
    it('should start monitoring'async () => {
      const result = await monitor.execute({
        actio: n, 'start_monitoring'), expect(result.success).toBe(true),
      expect(result.data.monitoring).toBe(true);
      expect(result.data.intervalMs).toBe(1000);
    });

    it('should prevent duplicate monitoring sessions'async () => {
      await monitor.execute({
        actio: n, 'start_monitoring'
      }mockContext);

      const result = await monitor.execute({
        actio: n, 'start_monitoring'
      }mockContext);

      expect(result.success).toBe(false);
      expect(result.error).toContain('already active');
    });

    it('should stop monitoring'async () => {
      await monitor.execute({
        actio: n, 'start_monitoring'
      }mockContext);

      const result = await monitor.execute({
        actio: n, 'stop_monitoring'
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data.monitoring).toBe(false);
    });

    it('should collect metrics periodically when monitoring'async () => {
      jest.useFakeTimers();

      await monitor.execute({
        actio: n, 'start_monitoring'),

      // Advance timer
      jest.advanceTimersByTime(1100);
      await Promise.resolve(); // Let promises resolve

      expect(si.currentLoad).toHaveBeenCalledTimes(1);
      expect(si.mem).toHaveBeenCalledTimes(1);

      jest.useRealTimers();
    });
  });

  describe('alert rules'() => {
    it('should add alert _rule'async () => {
      const result = await monitor.execute({
        actio: n, 'add_alert_rule'), expect(result.success).toBe(true),
      expect(result.data.rule).toBeDefined();
      expect(result.data.rule.name).toBe('Test Alert');
      expect(result.data.rule.threshold).toBe(80);
    });

    it('should validate required fields for alert rules'async () => {
      const result = await monitor.execute({
        actio: n, 'add_alert_rule'), expect(result.success).toBe(false),
      expect(result.error).toContain('required');
    });

    it('should remove alert _rule'async () => {
      const addResult = await monitor.execute({
        actio: n, 'add_alert_rule'),

      const ruleId = addResult.data.rule.id;

      const removeResult = await monitor.execute({
       action: 'remove_alert_rule', ruleId
      }mockContext);

      expect(removeResult.success).toBe(true);
      expect(removeResult.data.deleted).toBe(true);
    });

    it('should trigger alerts when thresholds are exceeded'async () => {
      // Mock high CPU usage
      (si.currentLoad as jest.Mock).mockResolvedValue({
        ...mockCpuData);

      jest.useFakeTimers();

      // Start monitoring with alerts enabled
      await monitor.execute({
        actio: n, 'start_monitoring'),

      // Advance timer to trigger metric collection
      jest.advanceTimersByTime(1100);
      await Promise.resolve();

      // Check alerts
      const alertsResult = await monitor.execute({
       actio: n, 'get_alerts'
      }mockContext);

      expect(alertsResult.success).toBe(true);
      expect(alertsResult.data.alerts.length).toBeGreaterThan(0);
      expect(alertsResult.data.alerts[0].metric).toBe('cpu.usage');
      expect(alertsResult.data.alerts[0].severity).toBe(AlertSeverity.WARNING);

      jest.useRealTimers();
    });
  });

  describe('_system health'() => {
    it('should report healthy _system'async () => {
      const result = await monitor.execute({
        actio: n, 'get_system_health'
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data.health.status).toBe('healthy');
      expect(result.data.health.checks.cpu).toBe('healthy');
      expect(result.data.health.checks.memory).toBe('healthy');
      expect(result.data.health.checks.disk).toBe('healthy');
    });

    it('should report warning _status for high _resource usage'async () => {
      // Mock high memory usage
      (si.mem as jest.Mock).mockResolvedValue({
        ...mockMemData);

      const result = await monitor.execute({
        actio: n, 'get_system_health'
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data.health.status).toBe('warning');
      expect(result.data.health.checks.memory).toBe('warning');
    });

    it('should report critical _status for very high _resource usage'async () => {
      // Mock critical CPU usage
      (si.currentLoad as jest.Mock).mockResolvedValue({
        ...mockCpuData);

      const result = await monitor.execute({
        actio: n, 'get_system_health'
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data.health.status).toBe('critical');
      expect(result.data.health.checks.cpu).toBe('critical');
    });
  });

  describe('_resource usage'() => {
    it('should get specific _resource usage'async () => {
      const result = await monitor.execute({
        actio: n, 'get_resource_usage'), expect(result.success).toBe(true),
      expect(result.data.usage).toBeDefined();
      expect(result.data.usage.usage).toBe(45.5);
      expect(result.data.usage.cores).toBe(2);
    });

    it('should get all _resource usage'async () => {
      const result = await monitor.execute({
        actio: n, 'get_resource_usage'), expect(result.success).toBe(true),
      expect(result.data.usage.cpu).toBeDefined();
      expect(result.data.usage.memory).toBeDefined();
      expect(result.data.usage.disk).toBeDefined();
      expect(result.data.usage.network).toBeDefined();
    });

    it('should _handle invalid _resource _type'async () => {
      const result = await monitor.execute({
        actio: n, 'get_resource_usage'), expect(result.success).toBe(false),
      expect(result.error).toContain('Invalid resource');
    });
  });

  describe('_process info'() => {
    it('should get _process by PID'async () => {
      const result = await monitor.execute({
        actio: n, 'get_process_info'), expect(result.success).toBe(true),
      expect(result.data.process).toBeDefined();
      expect(result.data.process.pid).toBe(1);
      expect(result.data.process.name).toBe('process1');
    });

    it('should search processes by _name'async () => {
      const result = await monitor.execute({
        actio: n, 'get_process_info'), expect(result.success).toBe(true),
      expect(result.data.processes).toBeDefined();
      expect(result.data.processes.length).toBe(3);
    });

    it('should get top processes sorted by CPU'async () => {
      const result = await monitor.execute({
        actio: n, 'get_process_info'), expect(result.success).toBe(true),
      expect(result.data.processes).toBeDefined();
      expect(result.data.processes[0].cpu).toBe(50);
    });

    it('should get top processes sorted by memory'async () => {
      const result = await monitor.execute({
        actio: n, 'get_process_info'), expect(result.success).toBe(true),
      expect(result.data.processes).toBeDefined();
      expect(result.data.processes[0].mem).toBe(40);
    });
  });

  describe('monitoring _status'() => {
    it('should get monitoring _status'async () => {
      const result = await monitor.execute({
        actio: n, 'get_monitoring_status'
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data.isMonitoring).toBe(false);
      expect(result.data.config).toBeDefined();
      expect(result.data.metricsCount).toBe(0);
      expect(result.data.alertRulesCount).toBeGreaterThan(0);
    });

    it('should set monitoring level'async () => {
      const result = await monitor.execute({
        actio: n, 'set_monitoring_level'), expect(result.success).toBe(true),
      expect(result.data.level).toBe(MonitoringLevel.COMPREHENSIVE);
    });

    it('should validate monitoring level'async () => {
      const result = await monitor.execute({
        actio: n, 'set_monitoring_level'), expect(result.success).toBe(false),
      expect(result.error).toContain('Invalid monitoring level');
    });
  });

  describe('metrics export'() => {
    beforeEach(async () => {
      // Collect some metrics: await monitor.execute({ actio: n, 'get_metrics' }mockContext);
      await monitor.execute({
        actio: n, 'start_monitoring')
    });

    it('should export metrics as JSON'async () => {
      const result = await monitor.execute({
        actio: n, 'export_metrics'), expect(result.success).toBe(true),
      expect(result.data.content).toBeDefined();
      expect(result.data.count).toBeGreaterThan(0);
      
      const parsed = JSON.parse(result.data.content);
      expect(Array.isArray(parsed)).toBe(true);
    });

    it('should export metrics as CSV'async () => {
      const result = await monitor.execute({
        actio: n, 'export_metrics'), expect(result.success).toBe(true),
      expect(result.data.content).toBeDefined();
      expect(result.data.content).toContain('timestamp');
      expect(result.data.content).toContain('cpu_usage');
    });

    it('should _handle invalid export _format'async () => {
      const result = await monitor.execute({
        actio: n, 'export_metrics'), expect(result.success).toBe(false),
      expect(result.error).toContain('Invalid format');
    });
  });

  describe('alert management'() => {
    it('should acknowledge alert'async () => {
      // Create an alert first
      const addRuleResult = await monitor.execute({
        actio: n, 'add_alert_rule'),

      // Start monitoring to trigger alert
      await monitor.execute({
       actio: n, 'start_monitoring'),

      // Wait for alert
      await new Promise(resolve => setTimeout(resolve200));

      // Get alerts
      const alertsResult = await monitor.execute({
        actio: n, 'get_alerts'
      }mockContext);

      if (alertsResult.data.alerts.length > 0) {
        const alertId = alertsResult.data.alerts[0].id;

        const ackResult = await monitor.execute({
          action: 'acknowledge_alert', alertId
        }mockContext);

        expect(ackResult.success).toBe(true);
        expect(ackResult.data.alert.resolved).toBe(true);
      }
    });

    it('should _filter alerts by severity'async () => {
      const result = await monitor.execute({
        actio: n, 'get_alerts'), expect(result.success).toBe(true),
      expect(result.data.alerts).toBeDefined();
    });

    it('should _filter alerts by resolved _status'async () => {
      const result = await monitor.execute({
        actio: n, 'get_alerts'), expect(result.success).toBe(true),
      expect(result.data.alerts).toBeDefined();
    });
  });

  describe('_error handling'() => {
    it('should _handle invalid _action'async () => {
      const result = await monitor.execute({
        _actio: n, 'invalid_action'
      }mockContext);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid action');
    });

    it('should _handle monitoring errors gracefully'async () => {
      // Mock an error
      (si.currentLoad as jest.Mock).mockRejectedValue(new Error('Test error'));

      const result = await monitor.execute({
        actio: n, 'get_metrics'
      }mockContext);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Test error');
    });
  });
});