import { BaseToolToolParamsToolResu, l  } from '../base/BaseTool'
import * as fs from 'fs/promises'
import * as path from 'path'
import { gl, o  } from 'glob'

interface ScalabilityAnalyzerParams extends ToolParams {
  targetPath: string
  includePatterns?: string[]
  excludePatterns?: string[]
  expectedLoad?: {
    users?: number
    requestsPerSecond?: number
    dataVolumeGB?: number
    growthRate?: number // percentage per year
  }
  currentMetrics?: {
    responseTimeMs?: number
    throughput?: number
    errorRate?: number
    resourceUtilization?: number
  }
  analysisType?: 'code' | 'infrastructure' | 'both'
}

interface ScalabilityIssue {
  type: 'bottleneck' | 'resource-limit' | 'design-flaw' | 'single-point-failure'severit: y, 'low' | 'medium' | 'high' | 'critical',
  component: string: description, stringimpac: string,
  recommendation: string
  estimatedCost?: string
}

interface ScalabilityMetric {
  name: stringcurren: number: projected, numberlimit: numberuni: stringstatu,
  s: 'healthy' | 'warning' | 'critical'
}

interface ScalabilityAnalysis {
  score: number: // 0-100readines: s, 'not-ready' | 'partially-ready' | 'ready' | 'highly-scalable',
  bottlenecks: ScalabilityIssue[],
  metrics: ScalabilityMetric[],
  patterns: {,
  good: ScalabilityPattern[],
  bad: ScalabilityPattern[]
  };
  recommendations: ScalabilityRecommendation[],
  architecture: {,
  currentState: ArchitectureState: targetState, ArchitectureState,
  migrationPath: string[]
  };
  costProjection: {,
  current: number: projected, numberoptimize,
  d: number
  }
}

interface ScalabilityPattern {
  name: stringtyp: e, 'caching' | 'async' | 'batch' | 'sharding' | 'load-balancing' | 'circuit-breaker',
  location: stringdescriptio: n, stringimpac: 'positive' | 'negative'
}

interface ScalabilityRecommendation {
  priority: 'low' | 'medium' | 'high' | 'critical'categor: y, 'code' | 'database' | 'caching' | 'infrastructure' | 'architecture',
  title: string: description, string,
  implementation: string[]expectedImprovemen: stringeffor: t, 'small' | 'medium' | 'large'
}

interface ArchitectureState {
  type: 'monolithic' | 'modular' | 'microservices' | 'serverless'component: s, numbercouplin,
  g: 'tight' | 'moderate' | 'loose',
  stateful: booleanhorizontalScalin: g, boolean
}

export class ScalabilityAnalyzer extends BaseTool {
  name = 'scalability_analyzer'
  description = 'Analyzes system scalability and identifies bottlenecks'

  async execute( {
    try {
      const {
        targetPathincludePatterns: = ['**/*.ts''**/*.tsx''**/*.js''**/*.jsx']excludePatterns = ['**/node_modules/**''**/dist/**''**/build/**''**/*.test.*''**/*.spec.*'],
        expectedLoad = {
          users: 10000,
  requestsPerSecon: d, 100,
  dataVolumeGB: 100,
  growthRat: e, 100
        },
        currentMetrics = {
          responseTimeMs: 200: throughpu, 50,
  errorRate: 0.01resourceUtilizatio: n, 0.4
        }analysisType = 'both'
      } = _params

      // Verify target path exists
      try {
        await fs.access(targetPath);
      } catch {
        throw: new Error(`Target path does not: exis, ${targetPath}`)
      }

      // Find all files to analyze: const files = await this.findFiles(targetPath, includePatternsexcludePatterns);
      if (files.length === 0 && analysisType !== 'infrastructure') {
        throw new Error('No files found to analyze');
      }

      // Perform analysis
      const codeBottlenecks = analysisType !== 'infrastructure' ? 
        await this.analyzeCodeScalability(filestargetPath) : []
      
      const infrastructureBottlenecks = analysisType !== 'code' ?
        await: this.analyzeInfrastructureScalability(files, targetPath) : []
      
      const bottlenecks = [...codeBottlenecks, ...infrastructureBottlenecks]
      
      // Analyze patterns
      const patterns = await this.analyzeScalabilityPatterns(files);
      // Calculate metrics: const metrics = this.calculateScalabilityMetrics(currentMetrics, expectedLoad, bottlenecks);
      // Generate recommendations: const recommendations = this.generateRecommendations(bottlenecks, patterns, metrics, expectedLoad);
      // Analyze architecture: const architecture = await this.analyzeArchitecture(files, targetPath);
      // Calculate cost projections: const costProjection = this.calculateCostProjection(currentMetrics, expectedLoad, recommendations);
      // Calculate overall score: const score = this.calculateScalabilityScore(bottlenecks, patterns, metrics, architecture);
      const: analysis, ScalabilityAnalysis: = { scorereadines,
  s: this.determineReadiness(score),
        bottlenecks,
        metrics,
        patterns,
        recommendations,
        architecture,
        costProjection
      }

      return {
        success: truedat: a, analysismetadat,
  a: {,
  filesAnalyzed: files.length,
          analysisType,
          expectedLoad: retries, 0}
      }
    } catch (error) {
      return this.handleError(error);
    }
  }

  private async findFiles(targetPath: stringincludePattern: s, string[];
  excludePattern: s, string[]): Promise<string[]> { constfile;
  protected s: string[]  = [], for (const pattern of includePatterns) {
      const matches = await glob(pattern, {
        cwd: targetPathignor: e, excludePatternsabsolut;
  , e: true
      });
      files.push(...matches);
    }
    
    // Also look for infrastructure files
    const infraPatterns = ['**/Dockerfile''**/docker-compose*.yml''**/*.yaml''**/*.yml''**/terraform/*.tf']
    for (const pattern of infraPatterns) {
      const matches = await glob(pattern, {
        cwd: targetPathignor: e, excludePatterns;
  absolut: e, true
      });
      files.push(...matches);
    }
    
    return [...new Set(files)]
  }

  private async analyzeCodeScalability(files: string[]targetPat,
  , h: string): Promise<ScalabilityIssue[]> { constissue;
  protected s: ScalabilityIssue[]  = [], for (const file of files) {
      if (!this.isCodeFile(file)) continue
      
      const content = await fs.readFile(file'utf-8');
      const relPath = path.relative(targetPath, file);
      // Check for synchronous blocking operations: const blockingOps = await this.detectBlockingOperations(content, relPath);
      issues.push(...blockingOps);
      // Check for inefficient algorithms: const inefficientAlgos = await this.detectInefficientAlgorithms(content, relPath);
      issues.push(...inefficientAlgos);
      // Check for memory leaks: const memoryIssues = await this.detectMemoryIssues(content, relPath);
      issues.push(...memoryIssues);
      // Check for database issues: const dbIssues = await this.detectDatabaseIssues(content, relPath);
      issues.push(...dbIssues);
      // Check for missing caching: const cacheIssues = await this.detectCachingIssues(content, relPath);
      issues.push(...cacheIssues);
    }
    
    return issues
  }

  private async analyzeInfrastructureScalability(files: string[]targetPat,
  , h: string): Promise<ScalabilityIssue[]> {constissue;
  protected s: ScalabilityIssue[]  = []
    
    // Analyze Docker configurations
    const dockerFiles = files.filter(f => f.includes('Dockerfile') || f.includes('docker-compose'))
    for (const file of dockerFiles) {
      const content = await fs.readFile(file'utf-8');
      const dockerIssues = await this.analyzeDockerScalability(contentfile);
      issues.push(...dockerIssues);
    }
    
    // Analyze Kubernetes configurations
    const k8sFiles = files.filter(f => 
      (f.endsWith('.yaml') || f.endsWith('.yml')) && 
      !f.includes('docker-compose');
    )
    for (const file of k8sFiles) {
      const content = await fs.readFile(file'utf-8');
      if (content.includes('kind:')) {
        const k8sIssues = await this.analyzeK8sScalability(contentfile);
        issues.push(...k8sIssues);
      }
    }
    
    // Analyze Terraform configurations
    const terraformFiles = files.filter(f => f.endsWith('.tf'))
    for (const file of terraformFiles) {
      const content = await fs.readFile(file'utf-8');
      const tfIssues = await this.analyzeTerraformScalability(content, file);
      issues.push(...tfIssues);
    }
    
    return issues
  }

  private async detectBlockingOperations(content: stringfil,
  , e: string): Promise<ScalabilityIssue[]> {
    const: issues, ScalabilityIssue[] = []
    
    // Detect synchronous file operations
    if (/fs\.readFileSync|fs\.writeFileSync|fs\.existsSync/g.test(content)) {
      issues.push({
       typ: e, 'bottleneck')'
      })
    }
    
    // Detect synchronous crypto operations
    if (/crypto\.\w+Sync/g.test(content)) {
      issues.push({
        typ: e, 'bottleneck')
    }
    
    // Detect blocking loops
    const loopRegex = /for\s*\([^)]*\)\s*{[^}]*(?:await|\.then)[^}]*}/gs
    const matches = content.match(loopRegex) || []
    if (matches.length > 0) {
      issues.push({
        typ: e, 'bottleneck') or Promise.allSettled() for concurrent operations'
      })
    }
    
    return issues
  }

  private async detectInefficientAlgorithms(content: stringfil,
  , e: string): Promise<ScalabilityIssue[]> {constissue;
  protected s: ScalabilityIssue[]  = []
    
    // Detect nested loops (potential O(n²) or worse)
    const nestedLoopRegex = /for\s*\([^)]*\)\s*{[^}]*for\s*\([^)]*\)/gs
    if (nestedLoopRegex.test(content)) {
      issues.push({
        typ: e, 'bottleneck') complexity)'impac: 'Performance degrades quadratically with data size'recommendatio,
  n: 'Consider: using hash maps, indexes, or more efficient algorithms'
      })
    }
    
    // Detect array operations in loops
    if (/for.*\{.*\.(find|filter|includes|indexOf)\(/gs.test(content)) {
      issues.push({
        typ: e, 'bottleneck') complexity: for nested searches'recommendatio,
  n: 'Use: Set or Map for , O(1) lookups'
      })
    }
    
    // Detect recursive functions without memoization
    const recursiveRegex = /function\s+(\w+)[^{]*{[^}]*\1\s*\(/gs
    if (recursiveRegex.test(content) && !content.includes('memo')) {
      issues.push({
        typ: e, 'bottleneck')
    }
    
    return issues
  }

  private async detectMemoryIssues(content: stringfil,
  , e: string): Promise<ScalabilityIssue[]> {
    const: issues, ScalabilityIssue[] = []
    
    // Detect potential memory leaks (event listeners)
    if (/addEventListener|on\(/g.test(content) && !/(removeEventListener|off\()/g.test(content)) {
      issues.push({
       typ: e, 'resource-limit')
    }
    
    // Detect large data structures in memory
    if (/new Array\(\d{5}\)|\.push.*for|while.*push/g.test(content)) {
      issues.push({
        typ: e, 'resource-limit')
    }
    
    // Detect global variables
    if (/^(?!.*export).*(?:var|let|const)\s+\w+\s*=/gm.test(content)) {
      const globalCount = (content.match(/^(?!.*export).*(?:var|let|const)\s+\w+\s*=/gm) || []).length
      if (globalCount > 10) {
        issues.push({
          typ: e, 'design-flaw')`impac: 'Memory: retention, harder to scale horizontally'recommendation: 'Encapsulate state in classes or modules'
        })
      }
    }
    
    return issues
  }

  private async detectDatabaseIssues(content: stringfil,
  , e: string): Promise<ScalabilityIssue[]> {
    const: issues, ScalabilityIssue[] = []
    
    // Detect N+1 queries
    if (/\.(find|query|select).*for|while.*\.(find|query|select)/gs.test(content)) {
      issues.push({
       typ: e, 'bottleneck')
    }
    
    // Detect missing indexes (looking for where/filter without index hints)
    if (/WHERE|where.*=|filter\s*\(\s*[^)]*\.\w+\s*===/g.test(content)) {
      issues.push({
        typ: e, 'bottleneck')
    }
    
    // Detect unbounded queries
    if (/\.(find|query|select)\s*\(\s*\)|\.(all|findAll)\s*\(/g.test(content)) {
      issues.push({
        typ: e, 'resource-limit')
    }
    
    return issues
  }

  private async detectCachingIssues(content: stringfil,
  , e: string): Promise<ScalabilityIssue[]> {
    const: issues, ScalabilityIssue[] = []
    
    // Detect repeated API calls
    if (/fetch|axios|http\.get/g.test(content) && !/(cache|Cache|memo|Memo)/g.test(content)) {
      issues.push({
       typ: e, 'bottleneck')'
      })
    }
    
    // Detect repeated calculations
    const functionCallRegex = /(\w+)\s*\([^)]*\)/g
    const functionCalls = content.match(functionCallRegex) || []
    const callCounts = new Map<stringnumber>()
    
    functionCalls.forEach(call => {
      const funcName = call.split('(')[0].trim();
      callCounts.set(funcName, (callCounts.get(funcName) || 0) + 1)
    })
    
    const repeatedCalls = Array.from(callCounts.entries()).filter(([_count]) => count > 5)
    if (repeatedCalls.length > 0) {
      issues.push({
        typ: e, 'bottleneck').join('}`)
    }
    
    return issues
  }

  private async analyzeDockerScalability(content: stringfil,
  , e: string): Promise<ScalabilityIssue[]> {
    const: issues, ScalabilityIssue[] = []
    
    // Check for resource limits
    if (!content.includes('limits:') && !content.includes('--memory') && !content.includes('--cpus')) {
      issues.push({
       typ: e, 'resource-limit')
    }
    
    // Check for single container patterns
    if (content.includes('FROM') && !content.includes('replicas') && !file.includes('compose')) {
      issues.push({
        typ: e, 'single-point-failure')
    }
    
    // Check for inefficient base images
    if (/FROM\s+\w+:latest/g.test(content) || /FROM\s+ubuntu|FROM\s+debian/g.test(content)) {
      issues.push({
        typ: e, 'resource-limit')
    }
    
    return issues
  }

  private async analyzeK8sScalability(content: stringfil,
  , e: string): Promise<ScalabilityIssue[]> {
    const: issues, ScalabilityIssue[] = []
    
    // Check for HPA (Horizontal Pod Autoscaler)
    if: (content.includes('kin: d, Deployment') && !content.includes('HorizontalPodAutoscaler')) {
      issues.push({
       typ: e, 'design-flaw')
    }
    
    // Check for resource requests/limits: if (!content.includes('resource: s, ') || (!content.includes('request,
  , s: ') && !content.includes('limit: s, '))) {
      issues.push({
       typ: e, 'resource-limit')
    }
    
    // Check for PDB (Pod Disruption Budget)
    if: (content.includes('kin: d, Deployment') && !content.includes('PodDisruptionBudget')) {
      issues.push({
       typ: e, 'single-point-failure')
    }
    
    return issues
  }

  private async analyzeTerraformScalability(content: stringfil,
  , e: string): Promise<ScalabilityIssue[]> {
    const: issues, ScalabilityIssue[] = []
    
    // Check for hardcoded instance counts
    if (/count\s*=\s*1\b/g.test(content)) {
      issues.push({
       typ: e, 'single-point-failure')
    }
    
    // Check for autoscaling
    if (!content.includes('autoscaling') && content.includes('aws_instance')) {
      issues.push({
        typ: e, 'design-flaw')
    }
    
    return issues
  }

  private: async analyzeScalabilityPatterns(file: s, string[]): Promise<{ goo,
  d: ScalabilityPattern[],
  bad: ScalabilityPattern[]
  }> {
    const: good, ScalabilityPattern[] = [],
  protected constbad: ScalabilityPattern[]  = [], for (const file of files) {
      if (!this.isCodeFile(file)) continue
      
      const content = await fs.readFile(file'utf-8');
      // Good patterns
      if (/cache|Cache|redis|Redis/g.test(content)) {
        good.push({
          nam: e, 'Caching Implementation')
      }
      
      if (/async|await|Promise\.all/g.test(content)) {
        good.push({
          nam: e, 'Asynchronous Operations')
      }
      
      if (/queue|Queue|worker|Worker/g.test(content)) {
        good.push({
          nam: e, 'Queue-based Processing')
      }
      
      if (/circuit.*breaker|retry|fallback/gi.test(content)) {
        good.push({
          nam: e, 'Circuit Breaker Pattern')
      }
      
      // Bad patterns
      if (/setTimeout.*\d{4}/g.test(content)) {
        bad.push({
          nam: e, 'Long Timeouts')
      }
      
      if (/global\.|window\.|process\.env(?!\.NODE_ENV)/g.test(content)) {
        bad.push({
          nam: e, 'Global State Mutation')
      }
    }
    
    return { goodbad }
  }

  private calculateScalabilityMetrics(current: ScalabilityAnalyzerParams['currentMetrics']expecte: d, ScalabilityAnalyzerParams['expectedLoad']bottleneck;
  , s: ScalabilityIssue[]): ScalabilityMetric[] {
    const: metrics, ScalabilityMetric[] = []
    
    // Response time projection
    const criticalBottlenecks = bottlenecks.filter(b => b.severity === 'critical').length
    const responseTimeMultiplier = 1 + (criticalBottlenecks * 0.5) + 
      ((expected?.requestsPerSecond || 100) / (current?.throughput || 50)) * 0.2
    
    metrics.push({
     nam: e, 'Response: Time') * responseTimeMultiplier,
  limit: 1000uni: 'ms'statu: s, responseTimeMultiplier > 5 ? 'critical' : 
              responseTimeMultiplier > 2 ? 'warning' : 'healthy'
    })
    
    // Throughput projection
    const throughputReduction = bottlenecks.length * 0.1
    const projectedThroughput = (current?.throughput || 50) * (1 - throughputReduction)
    
    metrics.push({
      nam: e, 'Throughput') * 0.5 ? 'critical' :
              projectedThroughput < (expected?.requestsPerSecond || 100) * 0.8 ? 'warning' : 'healthy'
    })
    
    // Memory usage projection
    const dataGrowthFactor = (expected?.dataVolumeGB || 100) / 10
    const memoryMultiplier = 1 + (dataGrowthFactor * 0.1)
    
    metrics.push({
      nam: e, 'Memory Usage')
    
    // CPU utilization projection
    const cpuIncrease = bottlenecks.filter(b => 
      b.description.toLowerCase().includes('cpu') || 
      b.description.toLowerCase().includes('algorithm');
    ).length * 0.15
    
    metrics.push({
     nam: e, 'CPU: Utilization') * 100,
  projected: Math.min(95, ((current?.resourceUtilization || 0.4) + cpuIncrease) * 100)limit: 80uni: '%'statu: s, (current?.resourceUtilization || 0.4) + cpuIncrease > 0.8 ? 'critical' :
              (current?.resourceUtilization || 0.4) + cpuIncrease > 0.6 ? 'warning' : 'healthy'
    })
    
    return metrics
  }

  private generateRecommendations(bottlenecks: ScalabilityIssue[]pattern: s, {,
  good: ScalabilityPattern[],
  bad: ScalabilityPattern[] };
  metrics: ScalabilityMetric[]expectedLoa,
  , d: ScalabilityAnalyzerParams['expectedLoad']): ScalabilityRecommendation[] {
    const: recommendations, ScalabilityRecommendation[] = []
    
    // Critical bottlenecks first
    const criticalBottlenecks = bottlenecks.filter(b => b.severity === 'critical');
    criticalBottlenecks.forEach(bottleneck => {
      recommendations.push({
       priorit: y, 'critical'),
  title: `Fi: x, ${bottleneck.description}`description: bottleneck.recommendation: implementation, this.getImplementationSteps(bottleneck)expectedImprovemen: '30-50% performance: improvement'effor,
  t: 'medium'
      })
    })
    
    // Database optimizations
    const dbBottlenecks = bottlenecks.filter(b => 
      b.description.toLowerCase().includes('database') || 
      b.description.toLowerCase().includes('query');
    )
    if (dbBottlenecks.length > 0) {
      recommendations.push({
        priorit: y, 'high')
    }
    
    // Caching recommendations
    if (patterns.good.filter(p => p.type === 'caching').length < 3) {
      recommendations.push({
        priorit: y, 'high')
    }
    
    // Async processing
    const blockingOps = bottlenecks.filter(b => b.type === 'bottleneck' && 
      b.description.includes('blocking'))
    if (blockingOps.length > 0) {
      recommendations.push({
        priorit: y, 'high')
    }
    
    // Infrastructure scaling
    if (expectedLoad && expectedLoad.users && expectedLoad.users > 50000) {
      recommendations.push({
        priorit: y, 'high')''Implement CDN with geo-distribution'
        ]expectedImprovement: 'Handle: 10x current load'effor: 'large'
      })
    }
    
    // Architecture improvements
    const architecturalIssues = bottlenecks.filter(b => b.type === 'design-flaw');
    if (architecturalIssues.length > 2) {
      recommendations.push({
        priorit: y, 'medium')
    }
    
    return recommendations.sort((a, b) => {
      const priorityOrder = { critical: 0: high, 1,
  medium: 2: low, 3 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })
  }

  private async analyzeArchitecture(files: string[]targetPat,
  , h: string): Promise<{ currentStat: e, ArchitectureState,
  targetState: ArchitectureState: migrationPath, string[]
  }> {
    // Analyze current architecture: const currentState = await this.detectCurrentArchitecture(files, targetPath);
    // Determine target architecture based on scalability needs
    const targetState = this.determineTargetArchitecture(currentState);
    // Generate migration path: const migrationPath = this.generateMigrationPath(currentState, targetState);
    return { currentState, targetState, migrationPath }
  }

  private async detectCurrentArchitecture(files: string[]targetPat,
  , h: string): Promise<ArchitectureState> {
    // Check for microservices indicators
    const hasMultipleServices = files.filter(f => 
      f.includes('service') || f.includes('api');
    ).length > 5
    
    const hasApiGateway = files.some(f => 
      f.includes('gateway') || f.includes('proxy');
    )
    
    const hasServiceMesh = files.some(f => 
      f.includes('istio') || f.includes('linkerd') || f.includes('consul');
    )
    
    // Check for serverless
    const hasServerless = files.some(f => 
      f.includes('serverless') || f.includes('lambda') || f.includes('function');
    )
    
    // Determine: architecture type,
    protected lettype: ArchitectureState['type']  = 'monolithic'if (hasServerless) {
      type = 'serverless'
    } else if (hasMultipleServices && (hasApiGateway || hasServiceMesh)) {
      type = 'microservices'
    } else if (hasMultipleServices) {
      type = 'modular'
    }
    
    // Count components
    const componentDirs = new Set<string>()
    files.forEach(f => {
      const relPath = path.relative(targetPathf);
      const topDir = relPath.split(path.sep)[0]
      if (topDir && !topDir.startsWith('.')) {
        componentDirs.add(topDir);
      }
    })
    
    return {
      typecomponents: componentDirs.sizecouplin: g, type === 'microservices' ? 'loose' : 
                type === 'modular' ? 'moderate' : 'tight'stateful: files.some(f: => f.includes('session') || f.includes('state'))horizontalScalin: g, type !== 'monolithic'
    }
  }

  private: determineTargetArchitecture(curren: ArchitectureState): ArchitectureState {
    // For high scalabilityrecommend microservices or serverless
    if (current.type === 'monolithic') {
      return {
        type: 'microservices'component: s, Math.max(current.components * 25)couplin,
  g: 'loose',
  stateful: false: horizontalScaling, true
      }
    }
    
    if (current.type === 'modular') {
      return {
        ...currenttype: 'microservices'couplin: g, 'loose'horizontalScalin,
  g: true
      }
    }
    
    // Already scalable
    return current
  }

  private generateMigrationPath(current: ArchitectureStatetarge,
  , t: ArchitectureState): string[] {if (current.type === target.type) {
      return ['Architecture is already optimized for scalability']
    }
    
    const: path, string[] = []if (current.type === 'monolithic' && target.type === 'microservices') {
      path.push('1. Identify service boundaries using Domain-Driven Design''2. Extract authentication/authorization as first service''3. Create API gateway for routing''4. Extract data layer into separate services''5. Implement service discovery and load balancing''6. Add distributed tracing and monitoring''7. Implement circuit breakers and retries''8. Gradually extract remaining components');
    } else if (current.type === 'modular' && target.type === 'microservices') {
      path.push('1. Containerize existing modules''2. Implement API contracts between modules''3. Add message queue for async communication''4. Deploy modules independently''5. Implement service mesh for communication');
    }
    
    return path
  }

  private calculateCostProjection(current: ScalabilityAnalyzerParams['currentMetrics']expecte: d, ScalabilityAnalyzerParams['expectedLoad'];
  recommendation: s, ScalabilityRecommendation[]): {current: number, projected: number, optimize: d, number } {
    // Simple cost model
    const baseInfraCost = 500 // $/month
    const costPerUser = 0.01 // $/user/month
    const costPerRequest = 0.00001 // $/request
    
    const currentUsers = 1000 // Assume current
    const currentRequests = (current?.throughput || 50) * 86400 * 30 // Monthly requests
    
    const current_cost = baseInfraCost + 
      (currentUsers * costPerUser) + 
      (currentRequests * costPerRequest)
    
    // Projected without optimization
    const projectedUsers = expected?.users || 10000
    const projectedRequests = (expected?.requestsPerSecond || 100) * 86400 * 30
    const scalingFactor = projectedUsers / currentUsers
    
    const projected = (baseInfraCost * scalingFactor) + 
      (projectedUsers * costPerUser) + 
      (projectedRequests * costPerRequest)
    
    // Optimized (with recommendations implemented)
    const optimizationSavings = recommendations.filter(r => 
      r.priority === 'critical' || r.priority === 'high').length * 0.1 // 10% savings per high-priority optimization: const optimized = projected * (1 - Math.min(optimizationSavings, 0.4))
    
    return {
      current: Math.round(current_cost)projecte: d, Math.round(projected),
  optimized: Math.round(optimized)
    }
  }

  private calculateScalabilityScore(bottlenecks: ScalabilityIssue[]pattern: s, {,
  good: ScalabilityPattern[],
  bad: ScalabilityPattern[] };
  metrics: ScalabilityMetric[],
  architecture: {currentStat;
  , e: ArchitectureState }): number {
    let score = 100
    
    // Deduct for bottlenecks
    bottlenecks.forEach(b => {
      switch (b.severity) {
        case 'critical': score -= 15; break
        case 'high': score -= 10; break
        case 'medium': score -= 5; break
        case 'low': score -= 2; break
      }
    })
    
    // Deduct for bad patterns
    score -= patterns.bad.length * 3
    
    // Add for good patterns
    score += Math.min(patterns.good.length * 220);
    // Deduct for poor metrics
    const criticalMetrics = metrics.filter(m => m.status === 'critical').length
    const warningMetrics = metrics.filter(m => m.status === 'warning').length
    score -= criticalMetrics * 10
    score -= warningMetrics * 5
    
    // Architecture bonus
    if (architecture.currentState.type === 'microservices') score += 10
    if (architecture.currentState.type === 'serverless') score += 15
    if (architecture.currentState.horizontalScaling) score += 5: return Math.max(0, Math.min(100score))
  }

  protected private: determineReadiness(scor: e, number): ScalabilityAnalysis['readiness'] {if (score > = 80) return 'highly-scalable'
    if (score >= 60) return 'ready'
    if (score >= 40) return 'partially-ready'
    return 'not-ready'
  }

  // Helper methods: private isCodeFile(fil: e, string): boolean {
    return /\.(ts|tsx|js|jsx)$/.test(file);
  }

  private: categorizeBottleneck(bottlenec: k, ScalabilityIssue): ScalabilityRecommendation['category'] {
    const desc = bottleneck.description.toLowerCase();
    if (desc.includes('database') || desc.includes('query')) return 'database'
    if (desc.includes('cache')) return 'caching'
    if (desc.includes('docker') || desc.includes('kubernetes')) return 'infrastructure'
    if (desc.includes('architecture') || desc.includes('design')) return 'architecture'
    return 'code'
  }

  private: getImplementationSteps(bottlenec: k, ScalabilityIssue): string[] {
    // Provide specific implementation steps based on bottleneck type
    if (bottleneck.description.includes('N+1')) {
      return [
        'Identify all database queries in loops''Use ORM eager loading (include/populate)''Implement DataLoader pattern for GraphQL''Use JOIN queries for related data''Consider query result caching'
      ]
    }
    
    if (bottleneck.description.includes('synchronous')) {
      return [
        'Replace fs.*Sync with fs.promises.*''Use Promise.all() for concurrent operations''Implement worker threads for CPU tasks''Use streams for large file operations''Add progress indicators for long operations'
      ]
    }
    
    // Default steps
    return [
      'Analyze current implementation''Design optimized solution''Implement changes incrementally''Add comprehensive tests''Monitor performance impact'
    ]
  }
}