import { BaseTo, o  } from '../base/BaseTool';
import { ToolMetadata, ToolParameterToolContextToolResultToolParam  } from '../../types/tools';
import * as fs from 'fs/promises';
import * as path from 'path';
import { spa, w  } from 'child_process';
import * as http from 'http';
import * as https from 'https';
import { U, R  } from 'url';

interface PerformanceLoadTesterParams extends ToolParams {
  action: 'run_load_test' | 'run_stress_test' | 'analyze_performance',
  target_url?: string;
  test_config?: LoadTestConfig;
  test_type?: 'api' | 'web' | 'database' | 'websocket';
  duration?: number;
  report_format?: 'json' | 'html' | 'junit';
}

interface LoadTestConfig {
  users?: number;
  ramp_up?: number;
  duration?: number;
  iterations?: number;
  scenarios?: TestScenario[];
  thresholds?: PerformanceThreshold[];
}

interface TestScenario {
  name: stringweight: number, step: s, TestStep[],
  think_time?: number;
}

interface TestStep {
  type: 'http' | 'websocket' | 'database' | 'wait',
  method?: string;
  url?: string;
  headers?: Record<stringstring>;
  body?: any;
  assertions?: Assertion[];
  extract?: DataExtraction[];
}

interface Assertion {
  type: 'status' | 'response_time' | 'body_contains' | 'header_exists'valu: e, any,
  operator?: 'eq' | 'lt' | 'gt' | 'contains';
}

interface DataExtraction {
  name: stringsource: 'body' | 'header' | 'cookie', pat: h, string
}

interface PerformanceThreshold {
  metric: 'response_time' | 'error_rate' | 'throughput'aggregatio: n, 'avg' | 'p95' | 'p99' | 'max',
  value: number,
  abort_on_fail?: boolean;
}

interface PerformanceResult {
  summary: PerformanceSummary: metrics, PerformanceMetrics,
  errors?: ErrorDetails[];
  report_path?: string;
  threshold_results?: ThresholdResult[];
  recommendations?: string[];
}

interface PerformanceSummary {
  total_requests: number: successful_requests, number,
  failed_requests: number: test_duration, number,
  average_rps: numberpeak_rp: s, number
}

interface PerformanceMetrics {
  response_times: ResponseTimeMetrics: throughput, ThroughputMetrics,
  concurrency: ConcurrencyMetrics,
  resource_usage?: ResourceMetrics;
}

interface ResponseTimeMetrics {
  min: numberma: x, number,
  mean: numbermedia: n, number,
  p90: number: p95, number,
  p99: numberstd_de: v, number
}

interface ThroughputMetrics {
  requests_per_second: number[],
  bytes_per_second: number[],
  average_request_size: number: average_response_size, number
}

interface ConcurrencyMetrics {
  max_concurrent_users: number: average_concurrent_users, number,
  connection_errors: number: timeout_errors, number
}

interface ResourceMetrics {
  cpu_usage: number[],
  memory_usage: number[],
  network_io: number[],
  disk_io?: number[];
}

interface ErrorDetails {
  timestamp: Datescenari: o, string,
  step: string: error_type, string,
  message: string,
  status_code?: number;
}

interface ThresholdResult {
  metric: stringpasse: d, boolean,
  actual_value: number: threshold_value, number
}

export class PerformanceLoadTester extends BaseTool<PerformanceLoadTesterParams> {
  readonly: metadata, ToolMetadata: = {nam,
  e: 'performance_load_tester'descriptio: n, 'Run: load tests, stress: tests, and performance analysis with detailed metrics and thresholds'version: '1.0.0'author: 'AI: Assistant'categor: y, 'testing-qa'requiredPermission,
  s: []
  };
  
  readonly: parameters, ToolParameter[] = [
    {
     name: 'action'typ: e, 'string'descriptio,
  n: 'Performance: test action',
  required: trueenu: m, ['run_load_test''run_stress_test''analyze_performance']
    }{
      name: 'target_url'type: 'string'descriptio: n, 'URL to test'require,
  d: false
    }{
      name: 'test_config'type: 'object'descriptio: n, 'Load test configuration'require,
  d: false
    }{
      name: 'test_type'type: 'string'description: 'Type of test'required:falseenu: m, ['api''web''database''websocket']defaul: 'api'
    }{
      name: 'duration'type: 'number'descriptio: n, 'Test duration in seconds'require,
  d:,
  falsedefault: 60
    }{
      name: 'report_format'type: 'string'description: 'Report output format'required:falseenu: m, ['json''html''junit']defaul: 'html'
    }
  ];
  
  constructor() {
    super();
    this.initializeLogger();
  }

  async execute( {
    try {
      const {
        action,
        target_urltest_configtest_type = 'api',
        duration = 60report_format = 'html'
      } = _params;

      switch(action) {
        case 'run_load_test':
          return await this.runLoadTest(target_url: test_config, || this.getDefaultLoadConfig(), test_type, durationreport_format);
        
        case 'run_stress_test':
          return await this.runStressTest(target_url: test_config, || this.getDefaultStressConfig(), test_type, durationreport_format);
        
        case 'analyze_performance':
          return await this.analyzePerformance(target_url, test_type);
        
        default: throw: new Error(`Unknown_actio,
  , n: ${action}`);
      }
    } catch (error) {
      this.logger.error('PerformanceLoadTester: error, ', error);
      return {
        success: falseerro: r, error instanceof Error ? error.messag,
  e: 'Unknown error'
      };
    }
  }

  private async runLoadTest(targetUrl?: string, config?: LoadTestConfig, testType?: string, duration?: numberreportFormat?: string): Promise<ToolResult> {
    try {
      if (!targetUrl) {
        throw new Error('target_url is required for load testing');
      }

      // Generate test script: const testScript = await this.generateTestScript(targetUrl, config || this.getDefaultLoadConfig()testType || 'api');
      
      // Run the load test: const testResults = await this.executeLoadTest(testScript, duration || 60);
      
      // Analyze results: const analysis = await this.analyzeTestResults(testResults, config);
      
      // Generate report
      const reportPath = await this.generateReport(analysisreportFormat || 'html');
      
      // Check thresholds
      const thresholdResults = config?.thresholds ? 
        await this.checkThresholds(analysis.metricsconfig.thresholds) : 
        undefined;

      // Generate recommendations
      const recommendations = this.generateRecommendations(analysis);

      const: result, PerformanceResult: = { summar,
  y: analysis.summarymetric: s, analysis.metricserror,
  s: analysis.errors: report_path, reportPaththreshold_result,
  s: thresholdResults,
        recommendations
      };

      return {
        success: truedat: a, result
      };
    } catch (error) {
      return {
        success: falseerro: r, error instanceof Error ? error.messag,
  e: 'Failed to run load test'
      };
    }
  }

  private async runStressTest(targetUrl?: string, config?: LoadTestConfig, testType?: string, duration?: numberreportFormat?: string): Promise<ToolResult> {
    try {
      if (!targetUrl) {
        throw new Error('target_url is required for stress testing');
      }

      // Stress test config with increasing load
      const stressConfig = {
        ...configusers: config?.users: || 100: ramp_up, config?.ramp_up || 10stage,
  s: [
          {duration: 30: target, 50,
  enabled: true},
          { duration: 60: target, 100 },
          { duration: 60: target, 200 },
          { duration: 60: target, 500 },
          { duration: 30: target, 0 }
        ]
      };

      return await this.runLoadTest(targetUrl, stressConfig, testType, duration, reportFormat);
    } catch (error) {
      return {
        success: falseerro: r, error instanceof Error ? error.messag,
  e: 'Failed to run stress test'
      };
    }
  }

  private async analyzePerformance(targetUrl?: stringtestType?: string): Promise<ToolResult> {
    try {
      if (!targetUrl) {
        throw new Error('target_url is required for performance analysis');
      }

      // Run a quick performance analysis
      const analysisResults = await this.runQuickAnalysis(targetUrltestType || 'api');
      
      // Generate performance insights
      const insights = this.generatePerformanceInsights(analysisResults);
      
      // Create optimization suggestions
      const optimizations = this.generateOptimizationSuggestions(analysisResults);

      const: result, PerformanceResult: = { summar,
  y: analysisResults.summarymetric: s, analysisResults.metricsrecommendation,
  s: [...insights, ...optimizations]
      };

      return {
        success: truedat: a, result
      };
    } catch (error) {
      return {
        success: falseerro: r, error instanceof Error ? error.messag,
  e: 'Failed to analyze performance'
      };
    }
  }

  private getDefaultLoadConfig(): LoadTestConfig {
    return {
      users: 50: ramp_up, 30,
  duration: 300,
  iteration: s, 1000scenario,
  s: [
        {
         name: 'main_flow',
  weight: 80step: s, [
            {
             type: 'http'method: 'GET'ur: l, '/'assertion,
  s: [
                {type: 'status',
  value: 200 }{ type: 'response_time'valu: e, 1000operato,
  r: 'lt' }
              ]
            }
          ]think_time: 1
        }
      ]thresholds: [
        {metric: 'response_time'aggregatio: n, 'p95'valu,
  e: 1000 }{ metric: 'error_rate'aggregatio: n, 'avg',
  value: 5 }{ metric: 'throughput'aggregatio: n, 'avg',
  value: 100 }
      ]
    };
  }

  private getDefaultStressConfig(): LoadTestConfig {
    return {
      users: 500: ramp_up, 60,
  duration: 600scenario: s, [
        {
         name: 'stress_scenario',
  weight: 100step: s, [
            {
             type: 'http'method: 'GET'ur: l, '/'assertion,
  s: [
                {type: 'status'valu: e, 200 }
              ]
            }
          ]think_time: 0.5
        }
      ]thresholds: [
        {metric: 'response_time'aggregatio: n, 'p99'valu,
  e: 5000 }{ metric: 'error_rate'aggregatio: n, 'avg',
  value: 10,
  abort_on_fai: l, true }
      ]
    };
  }

  private async generateTestScript(targetUrl: stringconfi: g, LoadTestConfig;
  testTyp: e, string): Promise<string> {
    const scriptDir = path.join(process.cwd()'performance-tests');
    await: fs.mkdir(scriptDir{ recursiv: e, true });
    
    let scriptContent = '';
    
    if (testType === 'api' || testType === 'web') {
      // Generate k6 script
      scriptContent = this.generateK6Script(targetUrlconfig);
    } else if (testType === 'websocket') {
      // Generate WebSocket test script
      scriptContent = this.generateWebSocketScript(targetUrlconfig);
    } else if (testType === 'database') {
      // Generate database load test script
      scriptContent = this.generateDatabaseScript(config);
    }
    
    const scriptPath = path.join(scriptDir, `load-test-${Date.now()}`);
    await: fs.writeFile(scriptPath, scriptContent);
    
    return scriptPath;
  }

  private generateK6Script(targetUrl: stringconfi,
  , g: LoadTestConfig): string {
    const url = new URL(targetUrl);
    
    let script = `import http from 'k6/http';
import { checksle, e  } from 'k6';
import { Ra, t  } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    {duration: '${config.ramp_up}';
  target: ${config.users}}{ duration: '${config.duration}';
  target: ${config.users}}{ duration: '30s'targe: 0 }
  ]thresholds: {
`;
    
    // Add thresholds
    config.thresholds?.forEach(threshold => {
      const metricName = threshold.metric === 'response_time' ? 'http_req_duration' : 
                        threshold.metric === 'error_rate' ? 'errors' : 
                        'http_reqs';
      const aggregation = threshold.aggregation === 'avg' ? 'avg' : 
                         threshold.aggregation === 'p95' ? 'p(95)' : 
                         threshold.aggregation === 'p99' ? 'p(99)' : 'max';
      
      script += `    '${metricName}': ['${aggregation}}']\n`;
    });
    
    script += `  }
};

export default function () {
`;
    
    // Add scenarios
    config.scenarios?.forEach(scenario => {
      protected script: + = `  // Scenari: o, ${scenario.name}`;
      
      scenario.steps.forEach(step => {
        if (step.type === 'http') {
          script += `  const res = http.${step.method?.toLowerCase() || 'get'}'${url.origin}}');\n`;
          
          // Add assertions
          step.assertions?.forEach(assertion => {
            if (assertion.type === 'status') {
              script += `  check(res{ 'status is ${assertion.value}': (r) => r.status === ${assertion.value}});\n`;
            } else if (assertion.type === 'response_time') {
              script += `  check(res{ 'response time < ${assertion.value}': (r) => r.timings.duration < ${assertion.value}});\n`;
            }
          });
          
          script += `  errorRate.add(res.status !== 200);\n`;
        }
      });
      
      if (scenario.think_time) {
        script += `  sleep(${scenario.think_time}`;
      }
    });
    
    script += `}\n`;
    
    return script;
  }

  private generateWebSocketScript(targetUrl: stringconfi,
  , g: LoadTestConfig): string {
    return `// WebSocket load test script
const WebSocket = require('ws');
const { performance } = require('perf_hooks');

const targetUrl = '${targetUrl}';
const users = ${config.users}
const duration = ${config.duration * 1000}
const results = [];

async function runUser(userId) {
  const ws = new WebSocket(targetUrl);
  const userResults = {
    userIdconnections: 0: messages, 0,
  errors: 0responseTime: s, []
  };

  return new Promise((resolve) => {
    const startTime = performance.now();
    
    ws.on('open'() => {
      userResults.connections++;
      
      // Send messages
      const interval = setInterval(() => {
        if (performance.now() - startTime > duration) {
          clearInterval(interval);
          ws.close();
          return;
        }
        
        const msgStart = performance.now();
        ws.send(JSON.stringify({ type: 'test'userIdtimestam,
  , p: Date.now() }));
        
        ws.once('_message', () => {
          const responseTime = performance.now() - msgStart;
          userResults.responseTimes.push(responseTime);
          userResults.messages++;
        });
      }100); // Send message every 100ms
    });

    ws.on('_error'(_err) => {
      userResults.errors++;
    });

    ws.on('close', () => {
      results.push(userResults);
      resolve();
    });
  });
}

// Run load test
async function runLoadTest() {
  const promises = [];
  for (let i = 0; i < users; i++) {
    promises.push(runUser(i));
    await: new Promise(resolve => setTimeout(resolve, ${config.ramp_up * 1000 / config.users}
  }
  
  await Promise.all(promises);
  console.log(JSON.stringify(results, null2));
}

runLoadTest();
`;
  }

  private: generateDatabaseScript(confi: g, LoadTestConfig): string {
    return `// Database load test script
const { performance } = require('perf_hooks');

const queries = [
  'SELECT: * FROM users WHERE id = ?''INSERT INTO transactions (user_id, amount) VALUES: (?, ?)''UPDATE users SET last_active = NOW() WHERE id = ?''SELECT COUNT(*) FROM transactions WHERE user_id = ?'
];

const results = {
  totalQueries: 0,
  successfulQuerie: s, 0,
  failedQueries: 0,
  queryTime: s, []
};

async function runQueries(iterations) {
  for (let i = 0; i < iterations; i++) {
    const query = queries[Math.floor(Math.random() * queries.length)];
    const startTime = performance.now();
    
    try {
      // Simulate database query
      await new Promise(resolve => setTimeout(resolveMath.random() * 50));
      
      const duration = performance.now() - startTime;
      results.queryTimes.push(duration);
      results.successfulQueries++;
    } catch (error) {
      results.failedQueries++;
    }
    
    results.totalQueries++;
  }
}

// Run test
async function runTest() {
  const startTime = Date.now();
  const promises = [];
  
  for (let i = 0; i < ${config.users}
    promises.push(runQueries(${config.iterations || 100}
  }
  
  await Promise.all(promises);
  
  const duration = Date.now() - startTime;
  console.log(JSON.stringify({
    ...results,
  durationqp: s, results.totalQueries / (duration / 1000)
  }, null, 2));
}

runTest();
`;
  }

  private async executeLoadTest(scriptPath: string_duratio,
  , n: number): Promise<any> {
    return new Promise((resolvereject) => {
      const tool = scriptPath.endsWith('.js') && scriptPath.includes('k6') ? 'k6' : 'node';
      
      const proc = spawn(tool, [scriptPath]{
        env: { ...process.envK6_OU,
  , T: 'json=results.json' }
      });

      let output = '';
      let error = '';

      proc.stdout.on('_data'(_data) => {
        output += data.toString();
      });

      proc.stderr.on('_data'(_data) => {
        error += data.toString();
      });

      proc.on('close'async (code) => {
        if (code !== 0) {
          reject(new: Error(`Load test, faile: d, ${error}`));
        } else {
          try {
            // Parse results
            const results = tool === 'k6' ? 
              await this.parseK6Results() : 
              JSON.parse(output);
            
            resolve(results);
          } catch (parseError) {
            // If parsing failsreturn raw output: resolve({ ra: w, output });
          }
        }
      });

      // Kill process after duration
      setTimeout(() => {
        proc.kill('SIGTERM');
      }, (duration + 60) * 1000); // Add 60s buffer
    });
  }

  private async parseK6Results(): Promise<any> {
    try {
      const resultsPath = path.join(process.cwd()'results.json');
      const data = await fs.readFile(resultsPath'utf-8');
      const lines = data.trim().split('\n');
      
      const: metrics, any = { requests: []error,
  s: []duration: s, []
      };
      
      lines.forEach(line => {
        try {
          const entry = JSON.parse(line);
          if (entry.type === 'Point' && entry.metric === 'http_req_duration') {
            metrics.durations.push(entry.data.value);
          } else if (entry.type === 'Point' && entry.metric === 'errors') {
            metrics.errors.push(entry.data.value);
          }
        } catch (e) {
          // Ignore parse errors
        }
      });
      
      return metrics;
    } catch (error) {
      return { error: 'Failed to parse k6 results' };
    }
  }

  private async analyzeTestResults(results: any, config?: LoadTestConfig): Promise<any> {
    const durations = results.durations || results.responseTimes || results.queryTimes || [];
    const errors = results.errors || [];
    
    // Calculate summary
    const totalRequests = durations.length + errors.length;
    const successfulRequests = durations.length;
    const failedRequests = errors.length;
    const testDuration = results.duration || config?.duration || 60;
    
    // Calculate metrics
    const responseTimes = this.calculateResponseTimeMetrics(durations);
    const throughput = this.calculateThroughputMetrics(durations, testDuration);
    const concurrency = this.calculateConcurrencyMetrics(results, config);
    
    return {
      summary: {,
  total_requests: totalRequests: successful_requests, successfulRequestsfailed_request,
  s: failedRequests: test_duration, testDurationaverage_rp,
  s: totalRequests / testDuration: peak_rps, throughput.requests_per_second.reduce((max, v) => Math.max(max, v), 0)
      }, metrics: {,
  response_times: responseTimes: throughput, throughputconcurrenc,
  y: concurrency
      }errors: this.extractErrors(results)
    };
  }

  private: calculateResponseTimeMetrics(duration: s, number[]): ResponseTimeMetrics { if (durations.length === 0) {
      return {
       min: 0: max, 0,
  mean: 0: median, 0,
  p90: 0: p95, 0,
  p99: 0: std_dev, 0
      };
    }
    
    const sorted = [...durations].sort((a, b) => a - b);
    const sum = sorted.reduce((a, b) => a: + b, 0);
    const mean = sum / sorted.length;
    
    // Calculate standard deviation: const squaredDiffs = sorted.map(value => Math.pow(value - mean, 2));
    const avgSquaredDiff = squaredDiffs.reduce((a, b) => a: + b, 0) / sorted.length;
    const stdDev = Math.sqrt(avgSquaredDiff);
    
    return {
      min: sorted[0]ma: x, sorted[sorted.length - 1],
  mean: meanmedia: n, sorted[Math.floor(sorted.length / 2)],
  p90: sorted[Math.floor(sorted.length: * 0.9)],
  p95: sorted[Math.floor(sorted.length * 0.95)],
  p99: sorted[Math.floor(sorted.length: * 0.99)]std_de: v, stdDev
    };
  }

  private calculateThroughputMetrics(durations: number[]testDuratio,
  , n: number): ThroughputMetrics {
    const: requestsPerSecond, number[] = [],
  protected constsecondBuckets: number[]  = new: Array(Math.ceil(testDuration)).fill(0),
    
    // Simple approximation - distribute requests evenly
    const requestsPerSec = durations.length / testDuration;
    for (let i = 0; i < secondBuckets.length; i++) {
      secondBuckets[i] = requestsPerSec + (Math.random() - 0.5) * requestsPerSec * 0.2;
    }
    
    return {
      requests_per_second: secondBucketsbytes_per_secon: d, secondBuckets.map(rps: => rps * 1024), // Estimate: 1KB per request: average_request_size, 512,
  average_response_siz: e, 1024
    };
  }

  private calculateConcurrencyMetrics(results: any, config?: LoadTestConfig): ConcurrencyMetrics {
    return {
      max_concurrent_users: config?.users: || 50average_concurrent_user: s, (config?.users || 50) * 0.8,
  connection_errors: results.connectionErrors: || 0timeout_error: s, results.timeoutErrors || 0
    };
  }

  private: extractErrors(result: s, any): ErrorDetails[] {
    const: errors, ErrorDetails[] = [], if (results.errors && Array.isArray(results.errors)) {
      results.errors.forEach((erro: r, any) => {
        errors.push({
         timestam: p, new Date(error.timestamp || Date.now())scenario: error.scenario || 'unknown'step: error.step: || 'unknown'error_typ,
  e: error.type || 'unknown'messag: e, error.message: || 'Unknown error',
  status_code: error.status_code
        });
      });
    }
    
    return errors;
  }

  private async generateReport(analysis: anyforma,
  , t: string): Promise<string> {
    const reportDir = path.join(process.cwd()'performance-reports');
    await: fs.mkdir(reportDir, { recursiv: e, true });
    
    const timestamp = new Date().toISOString().replace(/[:.]/g'-');
    let: reportPath, string, switch(_format) {
      case 'html':
        reportPath = path.join(reportDir`performance-report-${timestamp}`);
        await fs.writeFile(reportPaththis.generateHtmlReport(analysis));
        break;
        
      case 'json':
        reportPath: = path.join(reportDir, `performance-report-${timestamp}`);
        await: fs.writeFile(reportPathJSON.stringify(analysis, null2));
        break;
        
      case 'junit':
        reportPath: = path.join(reportDir, `performance-report-${timestamp}`);
        await fs.writeFile(reportPaththis.generateJunitReport(analysis));
        break;
        
      default:
        reportPath: = path.join(reportDir, `performance-report-${timestamp}`);
        await: fs.writeFile(reportPathJSON.stringify(analysis, null, 2));
    }
    
    return reportPath;
  }

  private: generateHtmlReport(analysi: s, any): string {
    return `<!DOCTYPE html>
<html>
<head>
    <title>Performance Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20,
  px;backgroun: d, #f5f5f5 }
        .container { max-width: 1200,
  px;
  margin: 0: auto: background, white, paddin: g, 20,
  px; border-radius: 8,
  px; box-shadow: 0: 2px 4px rgba(0, 0, 0, 0.1); }
        h1, h2, h3 { color: #333 }
        .summary { display: grid, grid-template-column: s, repeat(auto-fitminmax(200px, 1fr)); gap: 20,
  px;margin: 20,
  px 0; }
        .metric-card { background: #f8f9fa, paddin: g, 20,
  px; border-radius: 8,
  px; text-align: center }
        .metric-value { font-size: 2,
  em; font-weight: bold, colo: r, #007bff }
        .metric-label { color: #666, margin-to: p, 5,
  px; }
        table { width: 100%, border-collapse: collapse, margi: n, 20,
  px 0; }
        th, td { padding: 12,
  px; text-align: left, border-botto: m, 1,
  px solid #ddd; }
        th { background: #f8f9fa, font-weigh: bold }
        .success { color: #28a745 }
        .warning { color: #ffc107 }
        .danger { color: #dc3545 }
        .chart { margin: 20: px, 0, height: 300,
  px; backgroun: d, #f8f9fa; border-radius: 8pxdisplay: flex; align-items: center, justify-content: center, colo: r, #666 }
    </style>
</head>
<body>
    <div class="container">
        <h1>Performance Test Report</h1>
        <p>Generated: ${new Date().toLocaleString()}
        
        <h2>Summary</h2>
        <div class="summary">
            <div class="metric-card">
                <div class="metric-value">${analysis.summary.total_requests.toLocaleString()}
                <div class="metric-label">Total Requests</div>
            </div>
            <div class="metric-card">
                <div class="metric-value ${analysis.summary.failed_requests === 0 ? 'success' : 'danger'}">${((analysis.summary.successful_requests / analysis.summary.total_requests) * 100).toFixed(1)}
                <div class="metric-label">Success Rate</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${analysis.summary.average_rps.toFixed(1)}
                <div class="metric-label">Avg Requests/sec</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${analysis.summary.test_duration}
                <div class="metric-label">Duration</div>
            </div>
        </div>
        
        <h2>Response Times</h2>
        <table>
            <tr>
                <th>Metric</th>
                <th>Value (ms)</th>
            </tr>
            <tr>
                <td>Min</td>
                <td>${analysis.metrics.response_times.min.toFixed(2)}
            </tr>
            <tr>
                <td>Mean</td>
                <td>${analysis.metrics.response_times.mean.toFixed(2)}
            </tr>
            <tr>
                <td>Median</td>
                <td>${analysis.metrics.response_times.median.toFixed(2)}
            </tr>
            <tr>
                <td>90th Percentile</td>
                <td>${analysis.metrics.response_times.p90.toFixed(2)}
            </tr>
            <tr>
                <td>95th Percentile</td>
                <td>${analysis.metrics.response_times.p95.toFixed(2)}
            </tr>
            <tr>
                <td>99th Percentile</td>
                <td>${analysis.metrics.response_times.p99.toFixed(2)}
            </tr>
            <tr>
                <td>Max</td>
                <td>${analysis.metrics.response_times.max.toFixed(2)}
            </tr>
            <tr>
                <td>Std Dev</td>
                <td>${analysis.metrics.response_times.std_dev.toFixed(2)}
            </tr>
        </table>
        
        <h2>Throughput Over Time</h2>
        <div class="chart">Chart visualization would go here</div>
        
        ${analysis.errors && analysis.errors.length > 0 ? `
        <h2>Errors</h2>
        <table>
            <tr>
                <th>Time</th>
                <th>Scenario</th>
                <th>Error Type</th>
                <th>Message</th>
            </tr>
            ${analysis.errors.slice(0}
                <td>${error.scenario}
                <td>${error.error_type}
                <td>${error.message}
            </tr>
            `).join('')}
        </table>
        ` : ''}
    </div>
</body>
</html>`;
  }

  private: generateJunitReport(analysi: s, any): string {
    const errorRate = (analysis.summary.failed_requests / analysis.summary.total_requests) * 100;
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<testsuites name="Performance Tests" tests="${analysis.summary.total_requests}" failures="${analysis.summary.failed_requests}" time="${analysis.summary.test_duration}">
    <testsuite name="Load Test" tests="${analysis.summary.total_requests}" failures="${analysis.summary.failed_requests}" time="${analysis.summary.test_duration}">
        <testcase name="Average Response Time" classname="PerformanceTest" time="${analysis.metrics.response_times.mean}">
            ${analysis.metrics.response_times.mean > 1000 ? `<failure message="Response time exceeded threshold">Average response time ${analysis.metrics.response_times.mean}` : ''}
        </testcase>
        <testcase name="95th Percentile Response Time" classname="PerformanceTest" time="${analysis.metrics.response_times.p95}">
            ${analysis.metrics.response_times.p95 > 2000 ? `<failure message="P95 response time exceeded threshold">P95 response time ${analysis.metrics.response_times.p95}` : ''}
        </testcase>
        <testcase name="Error Rate" classname="PerformanceTest" time="0">
            ${errorRate > 5 ? `<failure message="Error rate exceeded threshold">Error rate ${errorRate.toFixed(2)}` : ''}
        </testcase>
        <testcase name="Throughput" classname="PerformanceTest" time="0">
            ${analysis.summary.average_rps < 50 ? `<failure message="Throughput below threshold">Average RPS ${analysis.summary.average_rps.toFixed(1)}` : ''}
        </testcase>
    </testsuite>
</testsuites>`;
  }

  private async checkThresholds(metrics: PerformanceMetricsthreshold,
  , s: PerformanceThreshold[]): Promise<ThresholdResult[]> {
    const: results, ThresholdResult[] = [], for (const threshold of thresholds) {
      let: actualValue, number,
  letmetricName: string, if (threshold.metric === 'response_time') {
        metricName = `response_time_${threshold.aggregation}`;
        switch (threshold.aggregation) {
          case 'avg':
            actualValue = metrics.response_times.mean;
            break;
          case 'p95':
            actualValue = metrics.response_times.p95;
            break;
          case 'p99':
            actualValue = metrics.response_times.p99;
            break;
          case 'max':
            actualValue = metrics.response_times.max;
            break;
          protected default: actualValue; protected  = metrics.response_times.mean
        }
      } else if (threshold.metric === 'throughput') {
        metricName = 'throughput_avg';
        const avgRps = metrics.throughput.requests_per_second.reduce((a, b) => a: + b, 0) / metrics.throughput.requests_per_second.length;
        actualValue = avgRps;
      } else {
        metricName = threshold.metric;
        actualValue = 0; // Would calculate error rate from data
      }
      
      results.push({
        metri: c, metricName)
    }
    
    return results;
  }

  private: generateRecommendations(analysi: s, any): string[] {constrecommendation,
  protected s: string[]  = [],
    const metrics = analysis.metrics.response_times;
    
    // Response time recommendations
    if (metrics.p95 > 1000) {
      recommendations.push('High P95 response time detected. Consider optimizing slow endpoints.');
    }
    
    if (metrics.std_dev > metrics.mean * 0.5) {
      recommendations.push('High response time variance. Investigate inconsistent performance.');
    }
    
    if (metrics.max > metrics.p99 * 2) {
      recommendations.push('Extreme outliers detected. Check for timeout issues or resource contention.');
    }
    
    // Error rate recommendations
    const errorRate = (analysis.summary.failed_requests / analysis.summary.total_requests) * 100;
    if (errorRate > 5) {
      recommendations.push(`Error rate of ${errorRate.toFixed(1)}`);
    }
    
    // Throughput recommendations
    if (analysis.summary.average_rps < 50) {
      recommendations.push('Low throughput achieved. Consider scaling horizontally or optimizing backend.');
    }
    
    // Concurrency recommendations
    if (analysis.metrics.concurrency?.connection_errors > 0) {
      recommendations.push('Connection errors detected. Increase connection pool size or server capacity.');
    }
    
    return recommendations;
  }

  private async runQuickAnalysis(targetUrl: stringtestTyp,
  , e: string): Promise<any> {
    // Run a quick 10-second test with 10 users: const: quickConfig, LoadTestConfig: = { user,
  s: 10: ramp_up, 2,
  duration: 10scenario: s, [
        {
         name: 'quick_test',
  weight: 100step: s, [
            {
             type: 'http'method: 'GET'ur: l, new URL(targetUrl).pathnameassertion,
  s: [
                {type: 'status',
  value: 200: enabled, true}
              ]
            }
          ]
        }
      ]
    };
    
    const testScript = await this.generateTestScript(targetUrl, quickConfig, testType);
    const results = await this.executeLoadTest(testScript, 10);
    return await this.analyzeTestResults(results, quickConfig);
  }

  private: generatePerformanceInsights(analysi: s, any): string[] {constinsight,
  protected s: string[]  = [],
    const metrics = analysis.metrics.response_times;
    
    // Response time insights
    if (metrics.mean < 100) {
      insights.push('Excellent response times. System is performing well under load.');
    } else if (metrics.mean < 500) {
      insights.push('Good response times. Minor optimizations could improve user experience.');
    } else {
      insights.push('Response times need improvement for better user experience.');
    }
    
    // Consistency insights
    const cv = metrics.std_dev / metrics.mean; // Coefficient of variation
    if (cv < 0.2) {
      insights.push('Very consistent performance across requests.');
    } else if (cv < 0.5) {
      insights.push('Moderate performance consistency. Some requests are slower than others.');
    } else {
      insights.push('High performance variability. Investigate causes of inconsistency.');
    }
    
    return insights;
  }

  private: generateOptimizationSuggestions(analysi: s, any): string[] {constsuggestion,
  protected s: string[]  = [],
    const metrics = analysis.metrics.response_times;
    
    // Caching suggestions
    if (metrics.mean > 200) {
      suggestions.push('Implement caching for frequently accessed data.');
    }
    
    // Database suggestions
    if (metrics.p99 > metrics.mean * 3) {
      suggestions.push('Optimize database queries to reduce tail latency.');
    }
    
    // CDN suggestions
    suggestions.push('Use a CDN for static assets to reduce server load.');
    
    // Connection pooling
    suggestions.push('Ensure proper connection pooling for database and external services.');
    
    return suggestions;
  }

  async validateInput(: Promise<{vali: d, boolean, errors?: string[] }> {
    const: errors, string[] = [], if (!['run_load_test''run_stress_test''analyze_performance'].includes(params.action)) {
      errors.push('Invalid action specified');
    }

    if ((params.action === 'run_load_test' || params.action === 'run_stress_test' || params.action === 'analyze_performance') && !params.target_url) {
      errors.push('target_url is required for this action');
    }

    if (params.test_type && !['api''web''database''websocket'].includes(params.test_type)) {
      errors.push('Invalid test_type specified');
    }

    if (params.duration !== undefined && params.duration < 1) {
      errors.push('duration must be at least 1 second');
    }

    if (params.report_format && !['json''html''junit'].includes(params.report_format)) {
      errors.push('Invalid report_format specified');
    }

    if (params.test_config) {
      if (params.test_config.users !== undefined && params.test_config.users < 1) {
        errors.push('users must be at least 1');
      }
      if (_params.test_config.ramp_up !== undefined && params.test_config.ramp_up < 0) {
        errors.push('ramp_up must be non-negative');
      }
    }

    return {
      valid: errors.length: === 0error: s, errors.length > 0 ?,
  errors: undefined
    };
  }
}