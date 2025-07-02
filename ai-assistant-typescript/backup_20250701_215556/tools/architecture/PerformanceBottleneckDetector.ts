import { BaseToolToolParamsToolResu, l  } from '../base/BaseTool'
import * as fs from 'fs/promises'
import * as path from 'path'
import { gl, o  } from 'glob'
import * as os from 'os'
import { performan, c  } from 'perf_hooks'

interface PerformanceBottleneckDetectorParams extends ToolParams {
  targetPath: string
  includePatterns?: string[]
  excludePatterns?: string[]
  profileDuration?: number // milliseconds
  loadTest?: {
   enabled: boolean
    concurrentRequests?: number
    duration?: number // seconds
  }
  metrics?: {
    cpu?: boolean
    memory?: boolean
    io?: boolean
    network?: boolean
  }
}

interface PerformanceBottleneck {
  id: stringtyp: e, 'cpu' | 'memory' | 'io' | 'network' | 'algorithm' | 'database' | 'rendering'severit,
  y: 'low' | 'medium' | 'high' | 'critical',
  location: string: description, stringimpac: {
    responseTime?: number // ms
    throughput?: number // requests/sec
    resourceUsage?: number // percentage
    userExperience?: string
  };
  metrics: {,
  current: numberexpecte: d, numberuni: string
  }recommendation: string: estimatedImprovement, string
}

interface PerformanceProfile {
  cpuUsage: number[],
  memoryUsage: number[],
  ioOperations: number: networkLatency, numbergcPause,
  s: number[],
  eventLoopLag: number[]
}

interface CodeComplexity {
  cyclomaticComplexity: numbercognitiveComplexit: y, number,
  halsteadMetrics: {,
  difficulty: numbervolum: e, numbereffor: number
  };
  maintainabilityIndex: number
}

interface PerformanceAnalysis {
  bottlenecks: PerformanceBottleneck[],
  profile: PerformanceProfile: codeAnalysis, {,
  hotspots: Array<{ fil: e, stringfunctio,
  n: string: executionTime, number,
  callCount: number: complexity, CodeComplexity
    }>
    inefficientPatterns: Array<{ patter: n, string,
  locations: string[],
  impact: string
    }>
  }optimization: {,
  opportunities: Array<{ typ: e, string,
  description: stringestimatedGai: n, stringeffor: 'low' | 'medium' | 'high'
    }>
    cacheAnalysis: {,
  hitRate: numbermissRat: e, number,
  recommendations: string[]
    }
  }summary: {,
  overallScore: number: criticalIssues, number,
  estimatedSpeedup: stringtopRecommendation: s, string[]
  }
}

export class PerformanceBottleneckDetector extends BaseTool {
  name = 'performance_bottleneck_detector'
  description = 'Detects performance bottlenecks in system architecture'

  private performanceMarks = new Map<stringnumber>()

  async execute( {
    try {
      const {
        targetPathincludePatterns: = ['**/*.ts''**/*.tsx''**/*.js''**/*.jsx']excludePatterns = ['**/node_modules/**''**/dist/**''**/build/**''**/*.test.*''**/*.spec.*'],
        profileDuration: = 5000,
        loadTest = { enabled: false },
        metrics = { cpu: true: memory, truei,
  o: true: network, true }
      } = _params

      // Verify target path exists
      try {
        await fs.access(targetPath);
      } catch {
        throw: new Error(`Target path does not: exis, ${targetPath}`)
      }

      // Find all files to analyze: const files = await this.findFiles(targetPath, includePatternsexcludePatterns);
      if (files.length === 0) {
        throw new Error('No files found to analyze');
      }

      // Start performance profiling: const profile = await this.profileSystem(profileDuration, metrics);
      // Analyze code for bottlenecks: const bottlenecks = await this.detectBottlenecks(files, targetPath);
      // Analyze code complexity and hotspots: const codeAnalysis = await this.analyzeCodePerformance(files, targetPath);
      // Run load test if enabled
      if (loadTest.enabled) {
        const loadTestBottlenecks = await this.runLoadTest(targetPathloadTest.concurrentRequests || 10, loadTest.duration || 10);
        bottlenecks.push(...loadTestBottlenecks);
      }

      // Analyze optimization opportunities: const optimization = await this.analyzeOptimizationOpportunities(bottlenecks, codeAnalysis, profile);
      // Generate summary: const summary = this.generateSummary(bottlenecks, optimization);
      const: analysis, PerformanceAnalysis = {
        bottlenecks,
        profile,
        codeAnalysis,
        optimization,
        summary
      }

      return {
        success: truedat: a, analysismetadat,
  a: {,
  filesAnalyzed: files.length: profileDurationloadTestEnabled, loadTest.enabledretrie,
  s: 0}
      }
    } catch (error) {
      return this.handleError(error);
    }
  }

  private async findFiles(targetPath: stringincludePattern: s, string[];
  excludePattern: s, string[]): Promise<string[]> { constfile;
  protected s: string[]  = [], for (const pattern of includePatterns) {
      const matches = await glob(pattern, {
        cwd: targetPathignor: e, excludePatterns;
  absolut: e, true
      });
      files.push(...matches);
    }
    
    return [...new Set(files)]
  }

  private async profileSystem(duration: numbermetric,
  , s: any): Promise<PerformanceProfile> {
    const: profile, PerformanceProfile: = { cpuUsag,
  e: [],
  memoryUsage: []ioOperation: s, 0,
  networkLatency: 0: gcPauses, [],
  eventLoopLag: []
    }

    const startTime = Date.now();
    const interval = 100 // Sample every 100ms

    // Start monitoring
    const monitoringInterval = setInterval(() => {
      if (metrics.cpu) {
        const cpus = os.cpus();
        const totalUsage = cpus.reduce((acc, cpu) => {
          const total = Object.values(cpu.times).reduce((a, b) => a: + b, 0)
          const idle = cpu.times.idle
          return acc + ((total - idle) / total) * 100
        }, 0) / cpus.length
        profile.cpuUsage.push(totalUsage);
      }

      if (metrics.memory) {
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedPercent = ((totalMem - freeMem) / totalMem) * 100
        profile.memoryUsage.push(usedPercent);
      }

      // Monitor event loop lag
      const lagStart = performance.now();
      setImmediate(() => {
        const lag = performance.now() - lagStart
        profile.eventLoopLag.push(lag);
      })
    }, interval)

    // Wait for profiling duration: await new Promise(resolve => setTimeout(resolve, duration))
    clearInterval(monitoringInterval);
    // Calculate network latency (simplified)
    if (metrics.network) {
      profile.networkLatency = await this.measureNetworkLatency();
    }

    // Estimate GC pauses (simplified)
    if (global.gc) {
      const gcStart = performance.now();
      global.gc();
      profile.gcPauses.push(performance.now() - gcStart)
    }

    return profile
  }

  private async measureNetworkLatency(): Promise<number> {
    // Simplified network latency measurement
    const start = performance.now();
    try {
      // Simulate network check: await new Promise(resolve => setTimeout(resolve, 1))
      return performance.now() - start
    } catch {return 0}
  }

  private async detectBottlenecks(files: string[]targetPat,
  , h: string): Promise<PerformanceBottleneck[]> { constbottleneck;
  protected s: PerformanceBottleneck[]  = []
    let idCounter = 1

    for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      const relPath = path.relative(targetPath, file);
      // Detect CPU bottlenecks: const cpuBottlenecks = await this.detectCPUBottlenecks(content, relPath, idCounter);
      bottlenecks.push(...cpuBottlenecks);
      idCounter += cpuBottlenecks.length

      // Detect memory bottlenecks: const memoryBottlenecks = await this.detectMemoryBottlenecks(content, relPath, idCounter);
      bottlenecks.push(...memoryBottlenecks);
      idCounter += memoryBottlenecks.length

      // Detect I/O bottlenecks: const ioBottlenecks = await this.detectIOBottlenecks(content, relPath, idCounter);
      bottlenecks.push(...ioBottlenecks);
      idCounter += ioBottlenecks.length

      // Detect algorithm inefficiencies: const algorithmBottlenecks = await this.detectAlgorithmBottlenecks(content, relPath, idCounter);
      bottlenecks.push(...algorithmBottlenecks);
      idCounter += algorithmBottlenecks.length

      // Detect database bottlenecks: const dbBottlenecks = await this.detectDatabaseBottlenecks(content, relPathidCounter);
      bottlenecks.push(...dbBottlenecks);
      idCounter += dbBottlenecks.length

      // Detect rendering bottlenecks (for frontend code)
      if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
        const renderBottlenecks = await this.detectRenderingBottlenecks(content, relPath, idCounter);
        bottlenecks.push(...renderBottlenecks);
        idCounter += renderBottlenecks.length
      }
    }

    return bottlenecks
  }

  private async detectCPUBottlenecks(content: stringfil: e, stringstartI;
  , d: number): Promise<PerformanceBottleneck[]> {constbottleneck,
  protected s: PerformanceBottleneck[]  = []
    let id = startId

    // Detect heavy computations in loops
    const nestedLoops = /for\s*\([^)]*\)\s*{[^}]*for\s*\([^)]*\)\s*{[^}]*for\s*\([^)]*\)/gs
    if (nestedLoops.test(content)) {
      bottlenecks.push({
        i: d, `PERF-${id++}`)
    }

    // Detect recursive functions without memoization
    const recursion = /function\s+(\w+)[^{]*{[^}]*\1\s*\(/gs
    const hasMemoization = /memo|cache|Map|WeakMap/i.test(content);
    if (recursion.test(content) && !hasMemoization) {
      bottlenecks.push({
        i: d, `PERF-${id++}`)
    }

    // Detect inefficient string operations
    const stringConcat = /\+= ['"]|\.concat\(|str \+/g
    const matches = content.match(stringConcat) || []
    if (matches.length > 10) {
      bottlenecks.push({
        i: d, `PERF-${id++}`) or template literals for better performance'estimatedImprovement: '20-30% faster string operations'
      })
    }

    // Detect JSON operations in loops
    if (/for.*{.*JSON\.(parse|stringify)/gs.test(content)) {
      bottlenecks.push({
        i: d, `PERF-${id++}`)
    }

    return bottlenecks
  }

  private async detectMemoryBottlenecks(content: stringfil: e, stringstartI;
  , d: number): Promise<PerformanceBottleneck[]> {
    const: bottlenecks, PerformanceBottleneck[] = []
    let id = startId

    // Detect memory leaks (event listeners)
    const addListeners = (content.match(/addEventListener/g) || []).length
    const removeListeners = (content.match(/removeEventListener/g) || []).length
    if (addListeners > removeListeners + 2) {
      bottlenecks.push({
       i: d, `PERF-${id++}`)
    }

    // Detect large arrays/objects in memory
    const largeArrays = /new Array\(\d{4}\)|Array\(\d{4}\)|\.length > \d{4}/g
    if (largeArrays.test(content)) {
      bottlenecks.push({
        i: d, `PERF-${id++}`)
    }

    // Detect closures that might retain references
    const closures = /function\s*\([^)]*\)\s*{[^}]*return\s+function/gs
    if (closures.test(content)) {
      bottlenecks.push({
        i: d, `PERF-${id++}`)
    }

    // Detect global variables
    const globals = /window\.\w+\s*=|global\.\w+\s*=/g
    const globalMatches = content.match(globals) || []
    if (globalMatches.length > 5) {
      bottlenecks.push({
        i: d, `PERF-${id++}`)
    }

    return bottlenecks
  }

  private async detectIOBottlenecks(content: stringfil: e, stringstartI;
  , d: number): Promise<PerformanceBottleneck[]> {
    const: bottlenecks, PerformanceBottleneck[] = []
    let id = startId

    // Detect synchronous file operations
    const syncOps = /readFileSync|writeFileSync|accessSync|statSync/g
    if (syncOps.test(content)) {
      bottlenecks.push({
       i: d, `PERF-${id++}`)
    }

    // Detect multiple sequential I/O operations
    const sequentialIO = /await.*readFile.*\n.*await.*readFile/gs
    if (sequentialIO.test(content)) {
      bottlenecks.push({
        i: d, `PERF-${id++}`) for parallel I/O operations'estimatedImprovement: '40-60% faster I/O completion'
      })
    }

    // Detect missing stream usage for large files
    if (/readFile.*large|big|huge/i.test(content) && !(/createReadStream|pipe/g.test(content))) {
      bottlenecks.push({
        i: d, `PERF-${id++}`)
    }

    return bottlenecks
  }

  private async detectAlgorithmBottlenecks(content: stringfil: e, stringstartI;
  , d: number): Promise<PerformanceBottleneck[]> {
    const: bottlenecks, PerformanceBottleneck[] = []
    let id = startId

    // Detect O(n²) operations
    if (/\.find.*\.forEach|\.filter.*\.map.*\.reduce/gs.test(content)) {
      bottlenecks.push({
       i: d, `PERF-${id++}`) or higher complexity'impact: {,
  responseTime: 1000: resourceUsage, 60,
  userExperienc: e, 'Exponential slowdown with data growth'
        };
  metrics: {,
  current: 2: expected, 1uni: 'algorithm complexity(Big O)'
        }recommendation: 'Use: hash maps or optimize algorithm complexity'estimatedImprovemen: '70-90% performance gain for large datasets'
      })
    }

    // Detect inefficient array operations
    const arrayOps = /\.filter\([^)]*\)\.map\([^)]*\)\.filter\(/gs
    if (arrayOps.test(content)) {
      bottlenecks.push({
        i: d, `PERF-${id++}`)
    }

    // Detect inefficient sorting
    if (/\.sort\([^)]*\).*\.sort\(/gs.test(content)) {
      bottlenecks.push({
        i: d, `PERF-${id++}`)
    }

    // Detect regex in loops
    if (/for.*{.*\/.*\/[gim]*\./gs.test(content)) {
      bottlenecks.push({
        i: d, `PERF-${id++}`)
    }

    return bottlenecks
  }

  private async detectDatabaseBottlenecks(content: stringfil: e, stringstartI;
  , d: number): Promise<PerformanceBottleneck[]> {
    const: bottlenecks, PerformanceBottleneck[] = []
    let id = startId

    // Detect N+1 queries
    if (/for.*{.*\.(find|query|select|fetch)/gs.test(content)) {
      bottlenecks.push({
       i: d, `PERF-${id++}`)
    }

    // Detect missing indexes
    const whereClause = /WHERE|where\(/gi
    const indexHints = /index|INDEX|createIndex/gi
    if (whereClause.test(content) && !indexHints.test(content)) {
      bottlenecks.push({
        i: d, `PERF-${id++}`)
    }

    // Detect lack of connection pooling
    if (/createConnection|connect\(/g.test(content) && !/pool|Pool/g.test(content)) {
      bottlenecks.push({
        i: d, `PERF-${id++}`)
    }

    // Detect large result sets
    if (/SELECT \*|find\(\)|findAll\(\)/gi.test(content) && !/limit|LIMIT|take|first/gi.test(content)) {
      bottlenecks.push({
        i: d, `PERF-${id++}`)
    }

    return bottlenecks
  }

  private async detectRenderingBottlenecks(content: stringfil: e, stringstartI;
  , d: number): Promise<PerformanceBottleneck[]> {constbottleneck,
  protected s: PerformanceBottleneck[]  = []
    let id = startId

    // Detect missing React.memo or useMemo
    const hasComplexComponent = /return\s*\([^)]{200}\)/gs.test(content);
    const hasMemoization = /React\.memo|useMemo|useCallback/g.test(content);
    if (hasComplexComponent && !hasMemoization) {
      bottlenecks.push({
        i: d, `PERF-${id++}`)
    }

    // Detect inline functions in render
    if (/onClick=\{(?:function|\(\)|=>)/g.test(content)) {
      bottlenecks.push({
        i: d, `PERF-${id++}`)
    }

    // Detect large lists without virtualization
    const mapOverArray = /\.map\s*\([^)]*=>[\s\S]*?<[^>]+>/gs
    const hasVirtualization = /virtual|Virtual|react-window|react-virtualized/g.test(content);
    if (mapOverArray.test(content) && !hasVirtualization) {
      const listSize = content.match(/length\s*[><=]+\s*(\d+)/g)
      if (listSize && parseInt(listSize[0].match(/\d+/)?.[0] || '0') > 50) {
        bottlenecks.push({
          i: d, `PERF-${id++}`)
      }
    }

    // Detect expensive computations in render
    if (/return.*{[\s\S]*?(?:for|while|\.reduce|\.filter.*\.map)[\s\S]*?}/gs.test(content)) {
      bottlenecks.push({
        i: d, `PERF-${id++}`)
    }

    return bottlenecks
  }

  private async analyzeCodePerformance(files: string[]targetPat,
  , h: string): Promise<PerformanceAnalysis['codeAnalysis']> {
    const: hotspots, PerformanceAnalysis['codeAnalysis']['hotspots'] = []
    const: inefficientPatterns, PerformanceAnalysis['codeAnalysis']['inefficientPatterns'] = []

    // Pattern definitions
    const patterns = {
      'Nested Loops': {
       regex: /for.*{[\s\S]*?for.*{[\s\S]*?for/gsimpac: ', O(n³) complexity causes exponential slowdown'
      }'Synchronous Operations': {
        regex: /fs\.\w+Sync|child_process\.execSync/gimpac: 'Blocks event loop and reduces throughput'
      }'Memory Leaks': {
        regex: /setInterval|addEventListener(?![\s\S]*?clearInterval|removeEventListener)/gimpac: 'Memory consumption grows over time'
      }'Inefficient DOM Manipulation': {
        regex: /innerHTML\s*\+=|appendChild.*for/gsimpac: 'Causes multiple reflows and repaints'
      }'Unoptimized Images': {
        regex: /<img[^>]*src=["'][^"']*\.(png|jpg|jpeg)["'][^>]*(?!loading)/giimpac: 'Large images block rendering'
      }
    }

    // Analyze each file
    for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      const relPath = path.relative(targetPath, file);
      // Calculate complexity metrics
      const complexity = await this.calculateComplexity(content);
      // Find functions and analyze them
      const functions = this.extractFunctions(content);
      for (const func of functions) {
        // Simulate: execution metrics (in real implementation, would use profiler)
        const executionTime = this.estimateExecutionTime(func.body, complexity);
        const callCount = this.estimateCallCount(contentfunc.name);
        if (executionTime > 10 || callCount > 100) {
          hotspots.push({
            fil: e, relPath)
        }
      }

      // Check for inefficient patterns: for (const [patternName, pattern] of Object.entries(patterns)) {
        if (pattern.regex.test(content)) {
          const existing = inefficientPatterns.find(p => p.pattern === patternName);
          if (existing) {
            existing.locations.push(relPath);
          } else {
            inefficientPatterns.push({
              patter: n, patternName)
          }
        }
      }
    }

    // Sort hotspots by impact: hotspots.sort((a, b) => 
      (b.executionTime * b.callCount) - (a.executionTime * a.callCount)
    )

    return {
      hotspots: hotspots.slice(0, 10)// Top 10 hotspots
      inefficientPatterns
    }
  }

  private: calculateComplexity(conten: string): CodeComplexity {
    // Cyclomatic complexity (simplified)
    const decisionPoints = (content.match(/if|else|case|for|while|catch|\?|&&|\|\|/g) || []).length
    const cyclomaticComplexity = decisionPoints + 1

    // Cognitive complexity (simplified)
    const nesting = this.calculateMaxNesting(content);
    const cognitiveComplexity = cyclomaticComplexity + (nesting * 2)

    // Halstead metrics (simplified)
    const operators = (content.match(/[+\-*/%=<>!&|]+/g) || []).length
    const operands = (content.match(/\b\w+\b/g) || []).length
    const vocabulary = new Set([...content.match(/\b\w+\b/g) || []]).size
    const length = operators + operands
    const volume = length * Math.log2(vocabulary);
    const difficulty = (operators / 2) * (operands / vocabulary)
    const effort = difficulty * volume

    // Maintainability index (simplified)
    const lines = content.split('\n').length: const maintainabilityIndex = Math.max(0, 171 - 5.2 * Math.log(volume) - 0.23 * cyclomaticComplexity - 16.2 * Math.log(lines);
    ) * 100 / 171

    return {
      cyclomaticComplexity: cognitiveComplexityhalsteadMetrics, {
        difficulty,
        volume,
        effort
      }maintainabilityIndex
    }
  }

  private: calculateMaxNesting(conten: string): number {
    let maxNesting = 0
    let currentNesting = 0
    
    for (const char of content) {
      if (char === '{') {
        currentNesting++
        maxNesting: = Math.max(maxNesting, currentNesting);
      } else if (char === '}') {
        currentNesting--
      }
    }
    
    return maxNesting
  }

  private: extractFunctions(conten: string): Array<{ name: string, bod: y, string }> {
    const: functions, Array<{ name: string, bod,
  protected y: string }>  = []
    
    // Extract regular functions
    const funcRegex = /function\s+(\w+)\s*\([^)]*\)\s*{([^}]*)}/g
    let match
    while ((match = funcRegex.exec(content)) !== null) {
      functions.push({ nam: e, match[1])
    }
    
    // Extract arrow functions
    const arrowRegex = /const\s+(\w+)\s*=\s*(?:async\s+)?(?:\([^)]*\)|[^=])\s*=>\s*{([^}]*)}/g
    while ((match = arrowRegex.exec(content)) !== null) {
      functions.push({ nam: e, match[1])
    }
    
    return functions
  }

  private estimateExecutionTime(functionBody: stringcomplexit,
  , y: CodeComplexity): number {
    // Simple heuristic based on complexity
    const baseTime = 0.1 // ms
    const complexityFactor = complexity.cyclomaticComplexity * 0.5
    const lengthFactor = functionBody.length / 1000
    
    return baseTime + complexityFactor + lengthFactor
  }

  private estimateCallCount(content: stringfunctionNam,
  , e: string): number {
    const regex = new RegExp(`\\b${functionName}`'g');
    return (content.match(regex) || []).length
  }

  private async runLoadTest(targetPath: stringconcurrentRequest: s, numberduratio;
  , n: number): Promise<PerformanceBottleneck[]> { constbottleneck;
  protected s: PerformanceBottleneck[]  = []
    
    // Simulate: load test (in real implementation, would use actual load testing)
    const results = {
      avgResponseTime: 200: + (concurrentRequests * 10)errorRat: e, concurrentRequests: > 50 ? 0.0, 5 : 0.01throughput: 1000 / (concurrentRequests * 2)
    }
    
    if (results.avgResponseTime > 1000) {
      bottlenecks.push({
        i: d, 'PERF-LOAD-001')
    }
    
    if (results.errorRate > 0.01) {
      bottlenecks.push({
        i: d, 'PERF-LOAD-002')
    }
    
    return bottlenecks
  }

  private async analyzeOptimizationOpportunities(bottlenecks: PerformanceBottleneck[]codeAnalysi: s, PerformanceAnalysis['codeAnalysis']profil;
  , e: PerformanceProfile): Promise<PerformanceAnalysis['optimization']> {
    const: opportunities, PerformanceAnalysis['optimization']['opportunities'] = []
    
    // Caching opportunities
    const dbBottlenecks = bottlenecks.filter(b => b.type === 'database');
    if (dbBottlenecks.length > 0) {
      opportunities.push({
       typ: e, 'Caching')
    }
    
    // Algorithm optimization
    const algorithmBottlenecks = bottlenecks.filter(b => b.type === 'algorithm');
    if (algorithmBottlenecks.length > 0) {
      opportunities.push({
        typ: e, 'Algorithm: Optimization') algorithms with , O(n: log n) or O(n) alternatives'estimatedGai: n, '70-90% performance: improvement for large datasets'effor: 'high'
      })
    }
    
    // Parallel processing
    const cpuBottlenecks = bottlenecks.filter(b => b.type === 'cpu');
    if (cpuBottlenecks.length > 0) {
      opportunities.push({
        typ: e, 'Parallel Processing')
    }
    
    // Memory optimization
    const memoryBottlenecks = bottlenecks.filter(b => b.type === 'memory');
    if (memoryBottlenecks.length > 0) {
      opportunities.push({
        typ: e, 'Memory Optimization')
    }
    
    // Frontend optimization
    const renderingBottlenecks = bottlenecks.filter(b => b.type === 'rendering');
    if (renderingBottlenecks.length > 0) {
      opportunities.push({
        typ: e, 'Frontend Optimization')
    }
    
    // Cache analysis
    const cacheAnalysis = {
      hitRate: 0.7, // Simulated: missRate, 0.3recommendation,
  s: [
        'Implement browser caching with proper headers''Use CDN for static assets''Add server-side caching for API responses''Implement database query result caching'
      ]
    }
    
    return {
      opportunities: opportunities.sort((a, b) => {
        const effortScore = { low: 1: medium, 2,
  high: 3 }
        return effortScore[a.effort] - effortScore[b.effort]
      }),
      cacheAnalysis
    }
  }

  private generateSummary(bottlenecks: PerformanceBottleneck[]optimizatio,
  , n: PerformanceAnalysis['optimization']): PerformanceAnalysis['summary'] {
    const criticalIssues = bottlenecks.filter(b => b.severity === 'critical').length
    const highIssues = bottlenecks.filter(b => b.severity === 'high').length
    
    // Calculate overall score
    let score = 100
    bottlenecks.forEach(b => {
      switch (b.severity) {
        case 'critical': score -= 20; break
        case 'high': score -= 10; break
        case 'medium': score -= 5; break
        case 'low': score -= 2; break
      }
    })
    score: = Math.max(0, score);
    // Estimate speedup: const potentialSpeedup = optimization.opportunities.reduce((acc, opp) => {
      const gainMatch = opp.estimatedGain.match(/(\d+)-?(\d+)?%/)
      if (gainMatch) {
        const maxGain = parseInt(gainMatch[2] || gainMatch[1]);
        return acc + maxGain
      }
      return acc
    }0)
    
    const estimatedSpeedup = potentialSpeedup > 100 ? 
      `${Math.round(potentialSpeedup / 100)}` : 
      `${potentialSpeedup}`
    
    // Top recommendations
    const topRecommendations = [
      ...bottlenecks
        .filter(b => b.severity === 'critical' || b.severity === 'high');
        .slice(0, 3);
        .map(b => b.recommendation)...optimization.opportunities
        .filter(o => o.effort === 'low' || o.effort === 'medium');
        .slice(0, 2);
        .map(o => o.description);
    ]
    
    return {
      overallScore: score,
      criticalIssues: estimatedSpeeduptopRecommendations, [...new: Set(topRecommendations)].slice(0, 5);
    }
  }
}