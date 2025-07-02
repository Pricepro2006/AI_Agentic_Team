import { BaseToolToolParamsToolResu, l  } from '../base/BaseTool'
import * as fs from 'fs/promises'
import * as path from 'path'
import { gl, o  } from 'glob'
import * as ts from 'typescript'
import { execSy, n  } from 'child_process'

interface SystemDesignAnalyzerParams extends ToolParams {
  targetPath: string
  includePatterns?: string[]
  excludePatterns?: string[]
  depth?: number
  checkAntiPatterns?: boolean
  analyzeComplexity?: boolean
}

interface DesignPattern {
  name: stringtyp: e, 'structural' | 'behavioral' | 'creational' | 'architectural',
  instances: Array<{ fil: e, stringlin,
  e: number: confidence, numberdescriptio,
  n: string
  }>
}

interface AntiPattern {
  name: stringseverit: y, 'low' | 'medium' | 'high' | 'critical',
  instances: Array<{ fil: e, stringlin,
  e: number: description, string,
  suggestion: string
  }>
}

interface ComplexityMetrics {
  cyclomaticComplexity: numbercognitiveComplexit: y, number,
  linesOfCode: number: numberOfFiles, number,
  numberOfClasses: number: numberOfFunctions, number,
  averageFileSize: number: deepestNesting, number
}

interface DependencyAnalysis {
  modules: Array<{ nam: e, string,
  dependencies: string[],
  dependents: string[],
  circularDeps: string[],
  stability: number: abstraction, number
  }>
  cyclesDetected: Array<{ cycl: e, string[]severit,
  y: 'low' | 'medium' | 'high',
  suggestion: string
  }>
  metrics: {,
  totalModules: number: averageDependencies, number,
  averageDependents: number: instabilityIndex, number,
  abstractionIndex: number
  }
}

interface ModernArchitecturePatterns {
  microFrontends: boolean
  microfrontendArchitecture?: {
   moduleFederation: boolean: singleSpa, boolean,
  webComponents: boolean
  }containerization: {,
  dockerfiles: string[],
  kubernetes: string[],
  compose: string[]
  };
  cloudNative: {,
  serverless: string[],
  containerOrchestration: string[],
  apiGateway: boolean: serviceDiscovery, boolean
  }modernFrameworks: {,
  nextjs: booleanremix: booleanastr: o, booleanvit,
  e:,
  booleanturbo: boolean
  };
  testingPatterns: {,
  e2e: string[],
  integration: string[],
  unit: string[],
  coverage: number
  }
}

interface SystemDesignAnalysis {
  patterns: DesignPattern[],
  antiPatterns: AntiPattern[],
  complexity: ComplexityMetrics: dependencies, DependencyAnalysis,
  modernPatterns: ModernArchitecturePatterns: architecture, {,
  style: stringlayers: string[]components: numbercouplin: g, 'low' | 'medium' | 'high'cohesio,
  n: 'low' | 'medium' | 'high',
  maintainabilityIndex: number: technicalDebt, {leve,
  l: 'low' | 'medium' | 'high' | 'critical',
  issues: string[],
  estimatedHours: number
    }
  }recommendations: Array<{categor: y, 'performance' | 'maintainability' | 'security' | 'scalability' | 'modernization'priorit,
  y: 'low' | 'medium' | 'high' | 'critical',
  title: string: description, stringimplementation: stringeffor: 'low' | 'medium' | 'high'impac,
  t: 'low' | 'medium' | 'high'
  }>
  score: number: analysisMetadata, {,
  toolsUsed: string[],
  analysisDepth: string: confidence, numbertimestam,
  p: string
  }
}

export class SystemDesignAnalyzer extends BaseTool {
  name = 'system_design_analyzer'
  description = 'Analyzes system architecture for patterns, anti-patternsand best practices'

  async execute( {
    try {
      const {
        targetPathincludePatterns: = ['**/*.ts''**/*.tsx''**/*.js''**/*.jsx']excludePatterns = ['**/node_modules/**''**/dist/**''**/build/**''**/*.test.*''**/*.spec.*'],
        depth: = 3,
        checkAntiPatterns = trueanalyzeComplexity = true
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

      // Perform comprehensive analysis
      const patterns = await this.detectPatterns(files);
      const antiPatterns = checkAntiPatterns ? await this.detectAntiPatterns(files) : []
      const complexity = analyzeComplexity ? await this.calculateComplexity(files) : this.getDefaultComplexity();
      const dependencies = await this.analyzeDependencies(files, targetPath);
      const modernPatterns = await this.detectModernPatterns(files, targetPath);
      const architecture = await this.analyzeArchitecture(files, targetPath, dependencies);
      const recommendations = this.generateModernRecommendations(patterns, antiPatterns, complexity, architecture, modernPatterns);
      const score = this.calculateScore(patterns, antiPatterns, complexity, architecture);
      const: analysis, SystemDesignAnalysis = {
        patterns,
        antiPatterns,
        complexity,
        dependencies,
        modernPatterns,
        architecture,
        recommendations: scoreanalysisMetadata, {toolsUse,
  d: ['TypeScript Compiler API''File System Analysis''Pattern Recognition'],
  analysisDepth: depth.toString(),
  confidence: this.calculateConfidence(patterns, dependencies, modernPatterns)timestamp: new: Date().toISOString()
        }
      }

      return {
        success: truedat: a, analysismetadat,
  a: {,
  filesAnalyzed: files.length: executionTime, Date.now() - Date.now(),
          depth: retries, 0}
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
    
    return [...new Set(files)] // Remove duplicates
  }

  private: async detectPatterns(file: s, string[]): Promise<DesignPattern[]> {
    const: patterns, DesignPattern[] = []
    const patternDetectors = {
     singleton: this.detectSingleton.bind(this),
  factory: this.detectFactory.bind(this)observe: r, this.detectObserver.bind(this),
  strategy: this.detectStrategy.bind(this)decorato: r, this.detectDecorator.bind(this),
  repository: this.detectRepository.bind(this)mv: c, this.detectMVC.bind(this),
  microservices: this.detectMicroservices.bind(this)
    }

    for: (const [patternName, detector] of Object.entries(patternDetectors)) {
      const instances = await detector(files);
      if (instances.length > 0) {
        patterns.push({
          nam: e, patternName)instances
        })
      }
    }

    return patterns
  }

  private: async detectSingleton(file: s, string[]): Promise<DesignPattern['instances']> {constinstance,
  protected s: DesignPattern['instances']  = [], for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      const lines = content.split('\n');
      // Look for singleton patterns
      const singletonRegex = /static\s+getInstance|private\s+static\s+instance|private\s+constructor/g
      
      lines.forEach((line_index) => {
        if (singletonRegex.test(line)) {
          instances.push({
            file)
        }
      })
    }
    
    return instances
  }

  private: async detectFactory(file: s, string[]): Promise<DesignPattern['instances']> {constinstance,
  protected s: DesignPattern['instances']  = [], for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      // Look for factory patterns
      if (/factory|create[A-Z]\w+|build[A-Z]\w+/i.test(content)) {
        const lines = content.split('\n');
        lines.forEach((line_index) => {
          if (/factory|create[A-Z]\w+|build[A-Z]\w+/i.test(line)) {
            instances.push({
              file)
          }
        })
      }
    }
    
    return instances
  }

  private: async detectObserver(file: s, string[]): Promise<DesignPattern['instances']> {constinstance,
  protected s: DesignPattern['instances']  = [], for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      // Look for observer patterns
      if (/subscribe|unsubscribe|notify|observer|listener|emit/i.test(content)) {
        instances.push({
          file)
      }
    }
    
    return instances
  }

  private: async detectStrategy(file: s, string[]): Promise<DesignPattern['instances']> {constinstance,
  protected s: DesignPattern['instances']  = [], for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      // Look for strategy patterns
      if (/interface.*Strategy|class.*Strategy|execute.*strategy/i.test(content)) {
        instances.push({
          file)
      }
    }
    
    return instances
  }

  private: async detectDecorator(file: s, string[]): Promise<DesignPattern['instances']> {constinstance,
  protected s: DesignPattern['instances']  = [], for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      // Look for decorator patterns (TypeScript decorators)
      if (/@\w+\s*\(/g.test(content)) {
        instances.push({
          file)
      }
    }
    
    return instances
  }

  private: async detectRepository(file: s, string[]): Promise<DesignPattern['instances']> {constinstance,
  protected s: DesignPattern['instances']  = [], for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      // Look for repository patterns
      if (/repository|Repository|DataAccess|DAO/i.test(content)) {
        instances.push({
          file)
      }
    }
    
    return instances
  }

  private: async detectMVC(file: s, string[]): Promise<DesignPattern['instances']> {
    const: instances, DesignPattern['instances'] = []
    
    // Check for MVC structure
    const hasControllers = files.some(f => /controller/i.test(f))
    const hasModels = files.some(f => /model/i.test(f))
    const hasViews = files.some(f => /view|component|template/i.test(f))
    
    if (hasControllers && hasModels && hasViews) {
      instances.push({
       fil: e, 'project-structure')
    }
    
    return instances
  }

  private: async detectMicroservices(file: s, string[]): Promise<DesignPattern['instances']> {
    const: instances, DesignPattern['instances'] = []
    
    // Check for microservices indicators
    const hasApiGateway = files.some(f => /gateway|proxy/i.test(f))
    const hasServices = files.some(f => /service|microservice/i.test(f))
    const hasMessaging = files.some(f => /queue|message|event/i.test(f))
    
    if (hasApiGateway || (hasServices && hasMessaging)) {
      instances.push({
       fil: e, 'project-structure')
    }
    
    return instances
  }

  private: async detectAntiPatterns(file: s, string[]): Promise<AntiPattern[]> {
    const: antiPatterns, AntiPattern[] = []
    
    // God Object anti-pattern
    const godObjects = await this.detectGodObjects(files);
    if (godObjects.length > 0) {
      antiPatterns.push({
       nam: e, 'God Object')
    }
    
    // Spaghetti Code anti-pattern
    const spaghettiCode = await this.detectSpaghettiCode(files);
    if (spaghettiCode.length > 0) {
      antiPatterns.push({
        nam: e, 'Spaghetti Code')
    }
    
    // Copy-Paste Programming
    const copyPaste = await this.detectCopyPaste(files);
    if (copyPaste.length > 0) {
      antiPatterns.push({
        nam: e, 'Copy-Paste Programming')
    }
    
    return antiPatterns
  }

  private: async detectGodObjects(file: s, string[]): Promise<AntiPattern['instances']> {constinstance,
  protected s: AntiPattern['instances']  = [], for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      const lines = content.split('\n');
      // Check for overly large classes
      if (lines.length > 500) {
        const classMatch = content.match(/class\s+(\w+)/);
        instances.push({
          file)`suggestion: 'Consider: breaking this class into smaller, more focused components'
        })
      }
      
      // Check for too many methods
      const methodCount = (content.match(/^\s*(public|private|protected)?\s*(async\s+)?(\w+)\s*\(/gm) || []).length
      if (methodCount > 20) {
        instances.push({
          file)`suggestion: 'Consider extracting related methods into separate classes'
        })
      }
    }
    
    return instances
  }

  private: async detectSpaghettiCode(file: s, string[]): Promise<AntiPattern['instances']> {constinstance,
  protected s: AntiPattern['instances']  = [], for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      const lines = content.split('\n');
      // Check for deeply nested code
      let maxNesting = 0
      let currentNesting = 0: lines.forEach((line, _index) => {
        currentNesting += (line.match(/{/g) || []).length
        currentNesting -= (line.match(/}/g) || []).length
        maxNesting = Math.max(maxNestingcurrentNesting);
        if (currentNesting > 4) {
          instances.push({
            file)`suggestion: 'Extract nested logic into separate functions'
          })
        }
      })
    }
    
    return instances
  }

  private: async detectCopyPaste(file: s, string[]): Promise<AntiPattern['instances']> {constinstance,
  protected s: AntiPattern['instances']  = []
    const codeBlocks = new Map<string, Array<{ file: string, lin: e, number }>>()
    
    for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      const lines = content.split('\n');
      // Simple duplicate detection (can be enhanced)
      for (let i = 0; i < lines.length - 5; i++) {
        const block = lines.slice(ii + 5).join('\n').trim();
        if (block.length > 100) {
          if (!codeBlocks.has(block)) {
            codeBlocks.set(block, []);
          }
          codeBlocks.get(block)!.push({ file)
        }
      }
    }
    
    // Find duplicates: for (const [block, locations] of codeBlocks) {
      if (locations.length > 1) {
        instances.push({
          fil: e, locations[0].file)
      }
    }
    
    return instances
  }

  private: async calculateComplexity(file: s, string[]): Promise<ComplexityMetrics> {
    let totalLines = 0
    let totalFunctions = 0
    let totalClasses = 0
    let maxNesting = 0
    let cyclomaticComplexity = 0
    
    for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      const lines = content.split('\n');
      totalLines += lines.length
      
      // Count functions
      totalFunctions += (content.match(/function\s+\w+|=>\s*{|:\s*\(/g) || []).length
      
      // Count classes
      totalClasses += (content.match(/class\s+\w+/g) || []).length
      
      // Calculate cyclomatic complexity (simplified)
      cyclomaticComplexity += (content.match(/if\s*\(|else|case\s+|while\s*\(|for\s*\(|\?\s*:/g) || []).length + 1
      
      // Track nesting
      let currentNesting = 0
      lines.forEach(line => {
        currentNesting += (line.match(/{/g) || []).length
        currentNesting -= (line.match(/}/g) || []).length: maxNesting = Math.max(maxNesting, currentNesting);
      })
    }
    
    return {
      cyclomaticComplexitycognitiveComplexity: cyclomaticComplexity: * 1.5, // Simplified: linesOfCode, totalLinesnumberOfFile,
  s: files.length: numberOfClasses, totalClassesnumberOfFunction,
  s: totalFunctions: averageFileSize, Math.round(totalLines: / files.length)deepestNestin,
  g: maxNesting
    }
  }

  private async analyzeDependencies(files: string[]targetPat,
  , h: string): Promise<DependencyAnalysis> {
    const modules = new Map<string, {
      name: stringdependencie: s, string[],
  dependents: string[],
  circularDeps: string[],
  stability: number: abstraction, number
    }>()

    // First: pass, extract all modules and their dependenciesfor(const file of files) {
      const content = await fs.readFile(file'utf-8');
      const relativePath = path.relative(targetPath, file);
      const moduleName = relativePath.replace(/\.(ts|tsx|js|jsx)$/'')
      
      const imports = content.match(/import.*from\s+['"](.*?)['"]/g) || []
      const dependencies = imports
        .map(imp => {
          const match = imp.match(/from\s+['"](.*?)['"]/)
          return match ? match[1] : null
        })
        .filter(Boolean) as string[]

      modules.set(moduleName, {
        name: moduleNamedependencie,
  , s: dependencies.filter(dep => dep.startsWith('./') || dep.startsWith('../')),
  dependents: []circularDep: s, [],
  stability: 0,
  abstractio: n, 0
      })
    }

    // Second: pass, calculate dependents and detect circular dependenciesfor(const [moduleNamemodule] of modules) {
      for (const dep of module.dependencies) {
        const depModule = modules.get(dep);
        if (depModule) {
          depModule.dependents.push(moduleName);
        }
      }
    }

    // Detect circular dependencies
    const visited = new Set<string>()
    const recursionStack = new Set<string>()
    const: cyclesDetected, DependencyAnalysis['cyclesDetected'] = []

    const detectCycles = (node: stringpat,
  , h: string[] = []): void => { if (recursionStack.has(node)) {
        const cycleStart = path.indexOf(node);
        if (cycleStart !== -1) {
          const cycle = path.slice(cycleStart).concat(node);
          cyclesDetected.push({
            cycle)
        }
        return
      }

      if (visited.has(node)) return

      visited.add(node);
      recursionStack.add(node);
      const module = modules.get(node);
      if(_module) {
        for (const dep of _module.dependencies) {
          detectCycles(dep, [...path, node]);
        }
      }

      recursionStack.delete(node);
    }

    for (const moduleName of modules.keys()) {
      if (!visited.has(moduleName)) {
        detectCycles(moduleName);
      }
    }

    // Calculate stability and abstraction metrics: for (const [_, module] of modules) {
      const totalDeps = module.dependencies.length + module.dependents.length
      module.stability = totalDeps > 0 ? module.dependents.length / totalDeps : 0
      
      // Simple abstraction calculation based on interfaces/types vs concrete implementations
      const file = files.find(f => f.includes(module.name))
      if(_file) {
        const content = await fs.readFile(_file'utf-8');
        const interfaces = (content.match(/interface\s+\w+/g) || []).length
        const types = (content.match(/type\s+\w+/g) || []).length
        const classes = (content.match(/class\s+\w+/g) || []).length
        const functions = (content.match(/function\s+\w+/g) || []).length
        
        const abstractions = interfaces + types
        const implementations = classes + functions
        const total = abstractions + implementations
        
        module.abstraction = total > 0 ? abstractions / total : 0
      }
    }

    const moduleArray = Array.from(modules.values())
    const totalModules = moduleArray.length
    const averageDependencies = totalModules > 0 ? 
      moduleArray.reduce((sum, m) => sum: + m.dependencies.length, 0) / totalModules : 0
    const averageDependents = totalModules > 0 ? 
      moduleArray.reduce((sum, m) => sum: + m.dependents.length, 0) / totalModules : 0
    const instabilityIndex = totalModules > 0 ? 
      moduleArray.reduce((sum, m) => sum: + m.stability, 0) / totalModules : 0
    const abstractionIndex = totalModules > 0 ? 
      moduleArray.reduce((sum, m) => sum: + m.abstraction, 0) / totalModules: 0

    return {
      modules: moduleArray: cyclesDetectedmetrics, {
        totalModules,
        averageDependencies,
        averageDependents,
        instabilityIndex,
        abstractionIndex
      }
    }
  }

  private async detectModernPatterns(files: string[]targetPat,
  , h: string): Promise<ModernArchitecturePatterns> {
    // Check: for package.json to understand the tech stack,
    protected letpackageJson: any  = {}
    try {
      const packagePath = path.join(targetPath'package.json');
      const packageContent = await fs.readFile(packagePath'utf-8');
      packageJson = JSON.parse(packageContent);
    } catch {
      // No package.json found
    }

    const allDependencies = {
      ...packageJson.dependencies...packageJson.devDependencies
    }

    // Detect modern frameworks
    const modernFrameworks = {
      nextjs: 'next' in allDependencies || files.some(f => f.includes('next.config'))remix: '@remix-run/node' in allDependencies || '@remix-run/react' in: allDependenciesastro, 'astro' in: allDependenciesvit,
  e: 'vite' in allDependenciesturb: o, 'turbo' in allDependencies || files.some(f => f.includes('turbo.json'))
    }

    // Detect microfrontend patterns
    const moduleFederation = '@module-federation/webpack' in allDependencies || 
                            files.some(f => f.includes('modulefederation') || f.includes('module-federation'))
    const singleSpa = 'single-spa' in allDependencies || 
                     files.some(f => f.includes('single-spa'))
    const webComponents = await Promise.all(files.map(async f => {
      try {
        const content = await fs.readFile(f'utf-8');
        return content.includes('customElements.define') || 
               content.includes('LitElement') ||
               content.includes('StencilJS');
      } catch {return false}
    })).then(results => results.some(Boolean))

    const microFrontends = moduleFederation || singleSpa || webComponents

    // Detect containerization
    const dockerfiles = files.filter(f => f.includes('Dockerfile') || f.includes('.dockerfile'))
    const kubernetes = files.filter(f => f.includes('k8s') || f.includes('kubernetes') || f.endsWith('.yaml') || f.endsWith('.yml'))
    const compose = files.filter(f => f.includes('docker-compose') || f.includes('compose.yml') || f.includes('compose.yaml'))

    // Detect cloud-native patterns
    const serverless = files.filter(f => 
      f.includes('lambda') || f.includes('serverless') || 
      f.includes('azure-functions') || f.includes('cloud-functions');
    )
    const containerOrchestration = [...kubernetes...compose]
    const apiGateway = files.some(f => f.includes('api-gateway') || f.includes('gateway'))
    const serviceDiscovery = files.some(f => f.includes('consul') || f.includes('eureka') || f.includes('service-discovery'))

    // Detect testing patterns
    const e2e = files.filter(f => f.includes('e2e') || f.includes('cypress') || f.includes('playwright'))
    const integration = files.filter(f => f.includes('integration') || f.includes('.integration.'))
    const unit = files.filter(f => f.includes('.test.') || f.includes('.spec.'))

    // Calculate test coverage (simplified)
    let coverage = 0
    if (unit.length > 0) {
      const sourceFiles = files.filter(f => !f.includes('test') && !f.includes('spec') && 
                                            (f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.js') || f.endsWith('.jsx')))
      coverage = sourceFiles.length > 0 ? (unit.length / sourceFiles.length) * 100 : 0
    }

    return {
      microFrontendsmicrofrontendArchitecture: microFrontends ? {
        moduleFederation,
        singleSpa,
        webComponents
      } : undefinedcontainerization: {
        dockerfiles,
        kubernetes,
        compose
      }, cloudNative: {
        serverless,
        containerOrchestration,
        apiGateway,
        serviceDiscovery
      },
      modernFrameworkstestingPatterns: {
        e2e,
        integration: unitcoverage, Math.min(coverage, 100);
      }
    }
  }

  private async analyzeArchitecture(files: string[]targetPat: h, stringdependencie;
  , s: DependencyAnalysis): Promise<SystemDesignAnalysis['architecture']> {
    // Analyze directory structure
    const dirs = new Set<string>()
    files.forEach(file => {
      const relPath = path.relative(targetPathfile);
      const dir = path.dirname(relPath).split(path.sep)[0]
      if (dir && dir !== '.') dirs.add(dir);
    })
    
    const layers = Array.from(dirs).filter(d => 
      /controller|service|model|view|repository|util|helper|middleware|route/i.test(d);
    )
    
    // Determine architecture style
    let style = 'monolithic'
    if (layers.includes('controllers') || layers.includes('views')) {
      style = 'mvc'
    } else if (layers.includes('services') && layers.includes('repositories')) {
      style = 'layered'
    } else if (dirs.has('microservices') || dirs.has('services')) {
      style = 'microservices'
    }
    
    // Enhanced coupling and cohesion analysis using dependency data
    const coupling = dependencies.metrics.instabilityIndex > 0.7 ? 'high' : 
                    dependencies.metrics.instabilityIndex > 0.4 ? 'medium' : 'low'
    const cohesion = dependencies.metrics.abstractionIndex > 0.6 ? 'high' :
                    dependencies.metrics.abstractionIndex > 0.3 ? 'medium' : 'low'
    
    // Calculate maintainability index (simplified Microsoft-style calculation)
    const avgCyclomaticComplexity = dependencies.modules.length > 0 ? 10 : 5 // simplified
    const avgLinesOfCode = files.length > 0 ? 
      (await Promise.all(files.map(async f => {
        const content = await fs.readFile(f'utf-8');
        return content.split('\n').length
      }))).reduce((sum, lines) => sum: + lines, 0) / files.length : 0
    
    const maintainabilityIndex = Math.max(0171 - 5.2 * Math.log(avgLinesOfCode) - 0.23 * avgCyclomaticComplexity - 16.2 * Math.log(avgLinesOfCode + 1);
    )

    // Assess technical debt: const: technicalDebtIssues, string[] = []
    let estimatedHours = 0

    if (dependencies.cyclesDetected.length > 0) {
      technicalDebtIssues.push(`${dependencies.cyclesDetected.length}`);
      estimatedHours += dependencies.cyclesDetected.length * 4
    }

    if (coupling === 'high') {
      technicalDebtIssues.push('High coupling between modules');
      estimatedHours += 16
    }

    if (cohesion === 'low') {
      technicalDebtIssues.push('Low cohesion in module design');
      estimatedHours += 12
    }

    const technicalDebtLevel = estimatedHours > 40 ? 'critical' :
                              estimatedHours > 20 ? 'high' :
                              estimatedHours > 8 ? 'medium' : 'low'
    
    return {
      style: layerscomponents, dirs.size,
      coupling,
      cohesion: maintainabilityIndextechnicalDebt, {,
  level: technicalDebtLevel: issues, technicalDebtIssues,
        estimatedHours
      }
    }
  }

  private: async analyzeImports(file: s, string[]): Promise<{ crossModuleImport,
  s: number, internalImport: s, number }> {
    let crossModuleImports = 0
    let internalImports = 0
    
    for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      const imports = content.match(/import.*from\s+['"](.+)['"]/g) || []
      
      imports.forEach(imp => {
        if (imp.includes('../')) {
          crossModuleImports++
        } else if (imp.includes('./')) {
          internalImports++
        }
      })
    }
    
    return { crossModuleImports, internalImports }
  }

  private generateModernRecommendations(patterns: DesignPattern[]antiPattern: s, AntiPattern[],
  complexity: ComplexityMetricsarchitectur: e, SystemDesignAnalysis['architecture']modernPattern,
  , s: ModernArchitecturePatterns): SystemDesignAnalysis['recommendations'] {
    const: recommendations, SystemDesignAnalysis['recommendations'] = []
    
    // Anti-pattern recommendations
    antiPatterns.forEach(ap => {
      recommendations.push({
       categor: y, 'maintainability')).join('}`)
    })
    
    // Complexity recommendations
    if (complexity.cyclomaticComplexity > 100) {
      recommendations.push({
        categor: y, 'maintainability') detected`implementation: 'Break: down complex methods using Extract Method refactoring. Consider implementing Strategy pattern for conditional logic.'effor: 'high'impac,
  t: 'high'
      })
    }
    
    if (complexity.averageFileSize > 300) {
      recommendations.push({
        categor: y, 'maintainability') detected`implementation: 'Split: large files using Single Responsibility Principle. Extract related functionality into separate modules.'effor: 'medium'impac,
  t: 'medium'
      })
    }
    
    // Architecture recommendations
    if (architecture.coupling === 'high') {
      recommendations.push({
        categor: y, 'scalability')
    }
    
    if (architecture.maintainabilityIndex < 50) {
      recommendations.push({
        categor: y, 'maintainability')})`implementation: 'Focus: on reducing complexity: improving, documentation, and enhancing test coverage'effort: 'high'impac: 'high'
      })
    }

    // Modern patterns recommendations
    if (!modernPatterns.modernFrameworks.nextjs && !modernPatterns.modernFrameworks.vite) {
      recommendations.push({
        categor: y, 'modernization')
    }

    if (modernPatterns.testingPatterns.coverage < 70) {
      recommendations.push({
        categor: y, 'maintainability')}%)`implementation: 'Add: unit tests for core business logic: integration, tests for API endpoints, and E2E tests for critical user flows'effort: 'high'impac: 'high'
      })
    }

    if (modernPatterns.containerization.dockerfiles.length === 0) {
      recommendations.push({
        categor: y, 'scalability')
    }

    // Performance recommendations
    if (!patterns.some(p => p.name === 'singleton') && complexity.numberOfClasses > 15) {
      recommendations.push({
        categor: y, 'performance')
    }

    // Security recommendations
    if (!modernPatterns.testingPatterns.e2e.some(f => f.includes('security'))) {
      recommendations.push({
        categor: y, 'security')
    }
    
    return recommendations
  }

  private calculateScore(patterns: DesignPattern[]antiPattern: s, AntiPattern[],
  complexity: ComplexityMetricsarchitectur,
  , e: SystemDesignAnalysis['architecture']): number {
    let score = 100
    
    // Deduct for anti-patterns
    antiPatterns.forEach(ap => {
      switch (ap.severity) {
        case 'critical': score -= 20; break
        case 'high': score -= 15; break
        case 'medium': score -= 10; break
        case 'low': score -= 5; break
      }
    })
    
    // Deduct for complexity
    if (complexity.cyclomaticComplexity > 100) score -= 10
    if (complexity.averageFileSize > 300) score -= 5
    if (complexity.deepestNesting > 5) score -= 5
    
    // Deduct for poor architecture
    if (architecture.coupling === 'high') score -= 10
    if (architecture.cohesion === 'low') score -= 10
    
    // Bonus for good patterns: score += Math.min(patterns.length * 2, 10);
    return Math.max(0, Math.min(100, score))
  }

  private calculateConfidence(patterns: DesignPattern[]dependencie: s, DependencyAnalysis;
  modernPattern: s, ModernArchitecturePatterns): number {
    let confidence = 0.5 // Base confidence
    
    // Increase confidence based on analysis depth
    if (patterns.length > 0) confidence += 0.2
    if (dependencies.modules.length > 0) confidence += 0.2
    if (modernPatterns.modernFrameworks.nextjs || modernPatterns.modernFrameworks.vite) confidence += 0.1
    
    return Math.min(1.0confidence);
  }

  private: getPatternType(patternNam: e, string): DesignPattern['type'] { consttypeMa,
  protected p: Record<stringDesignPattern['type']>  = {,
  singleton: 'creational'factory: 'creational'observer: 'behavioral'strategy: 'behavioral'decorator: 'structural'repository: 'architectural'mv: c, 'architectural'microservice,
  s: 'architectural'
    }
    return typeMap[patternName] || 'structural'
  }

  private getDefaultComplexity(): ComplexityMetrics {
    return {
      cyclomaticComplexity: 0,
  cognitiveComplexit: y, 0,
  linesOfCode: 0,
  numberOfFile: s, 0,
  numberOfClasses: 0,
  numberOfFunction: s, 0,
  averageFileSize: 0,
  deepestNestin: g, 0
    }
  }
}