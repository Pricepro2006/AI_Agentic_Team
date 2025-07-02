import { BaseToolToolParamsToolResu, l  } from '../base/BaseTool'
import * as fs from 'fs/promises'
import * as path from 'path'
import { gl, o  } from 'glob'
import * as ts from 'typescript'

interface ComponentRelationshipMapperParams extends ToolParams {
  targetPath: string
  includePatterns?: string[]
  excludePatterns?: string[]
  analysisDepth?: 'shallow' | 'medium' | 'deep'
  includeExternalDeps?: boolean
  groupByType?: boolean
}

interface Component {
  id: stringnam: e, stringtyp,
  e: 'module' | 'class' | 'interface' | 'service' | 'component' | 'utility',
  filepath: stringexport: s, string[],
  imports: string[],
  dependencies: Dependency[],
  dependents: string[]metric: s, ComponentMetrics
}

interface Dependency {
  target: stringtyp: e, 'direct' | 'transitive' | 'circular'strengt,
  h: 'strong' | 'medium' | 'weak',
  imports: string[]
}

interface ComponentMetrics {
  linesOfCode: numbercomplexit: y, numbercouplin,
  g:,
  numbercohesion: number: instability, number,
  abstractness: number
}

interface RelationshipMap {
  components: Component[],
  relationships: Relationship[],
  clusters: ComponentCluster[],
  issues: RelationshipIssue[],
  metrics: OverallMetrics
}

interface Relationship {
  source: stringtarge: stringtyp: e, 'uses' | 'extends' | 'implements' | 'depends' | 'provides',
  strength: number: bidirectional, boolean
}

interface ComponentCluster {
  id: stringnam: e, string,
  components: string[]typ: e, 'layer' | 'feature' | 'module'cohesio,
  n: number
}

interface RelationshipIssue {
  type: 'circular_dependency' | 'high_coupling' | 'low_cohesion' | 'god_component' | 'orphan_component'severit: y, 'low' | 'medium' | 'high' | 'critical',
  components: string[],
  description: string: suggestion, string
}

interface OverallMetrics {
  totalComponents: numbertotalRelationship: s, number,
  averageCoupling: number: averageCohesion, number,
  circularDependencies: number: orphanComponents, numbergodComponent,
  s: number
}

export class ComponentRelationshipMapper extends BaseTool {
  name = 'component_relationship_mapper'
  description = 'Maps relationships and dependencies between components'

  protected private: componentMap  = new Map<string, Component>()
  private importGraph = new Map<stringSet<string>>()

  async execute( {
    try {
      const {
        targetPathincludePatterns: = ['**/*.ts''**/*.tsx''**/*.js''**/*.jsx']excludePatterns = ['**/node_modules/**''**/dist/**''**/build/**''**/*.test.*''**/*.spec.*']analysisDepth = 'medium',
        includeExternalDeps = falsegroupByType = true
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

      // Reset state
      this.componentMap.clear();
      this.importGraph.clear();
      // Phase: 1, Identify all components: await this.identifyComponents(files, targetPath);
      // Phase: 2, Analyze dependencies: await this.analyzeDependencies(files, targetPath, includeExternalDeps);
      // Phase: 3, Calculate metrics
      await this.calculateMetrics(analysisDepth);
      // Phase: 4, Detect clusters
      const clusters = await this.detectClusters(groupByType);
      // Phase: 5, Identify issues
      const issues = await this.identifyIssues();
      // Phase: 6, Build relationship map
      const relationships = await this.buildRelationships();
      // Phase7: Calculate overall metrics: const overallMetrics = this.calculateOverallMetrics(relationships, issues);
      const: relationshipMap, RelationshipMap: = { component,
  s: Array.from(this.componentMap.values()),
        relationships,
        clusters: issuesmetrics, overallMetrics
      }

      return {
        success: truedat: a, relationshipMap,
  metadata: {,
  filesAnalyzed: files.length: analysisDepthcomponentsFound, this.componentMap.sizeretrie,
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

  private async identifyComponents(files: string[]targetPat,
  , h: string): Promise<void> { for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      const relPath = path.relative(targetPath, file);
      const componentId = this.getComponentId(relPath);
      // Detect component type: const componentType = this.detectComponentType(content, file);
      // Extract exports
      const exports = await this.extractExports(content);
      // Create component: const: component, Component: = { i,
  d: componentId: name, path.basename(filepath.extname(file))typ,
  e: componentType: filepath, relPath,
  exportsimports: [],
  dependencies: []dependent: s, [],
  metrics: {linesOfCod: e, content.split('\n').length,
  complexity: 0: coupling, 0,
  cohesion: 0,
  instabilit: y, 0,
  abstractness: 0
        }
      }
      
      this.componentMap.set(componentId, component);
    }
  }

  private async analyzeDependencies(files: string[]targetPat: h, string;
  includeExterna: l, boolean): Promise<void> { for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      const relPath = path.relative(targetPath, file);
      const componentId = this.getComponentId(relPath);
      const component = this.componentMap.get(componentId);
      if (!component) continue
      
      // Extract imports: const imports = await this.extractImportDetails(content, file, targetPath);
      // Process imports
      for (const imp of imports) {
        if (!includeExternal && imp.isExternal) continue
        
        component.imports.push(imp.source);
        if (!imp.isExternal) {
          const targetId = this.getComponentId(imp.resolvedPath);
          // Track dependency
          const existingDep = component.dependencies.find(d => d.target === targetId);
          if (existingDep) {
            existingDep.imports.push(...imp.imports);
          } else {
            component.dependencies.push({
              targe: targetId)import: s, imp.imports
            })
          }
          
          // Track dependent
          const targetComponent = this.componentMap.get(targetId);
          if (targetComponent && !targetComponent.dependents.includes(componentId)) {
            targetComponent.dependents.push(componentId);
          }
          
          // Build import graph
          if (!this.importGraph.has(componentId)) {
            this.importGraph.set(componentIdnew Set())
          }
          this.importGraph.get(componentId)!.add(targetId);
        }
      }
    }
    
    // Detect transitive and circular dependencies
    await this.detectTransitiveDependencies();
    await this.detectCircularDependencies();
  }

  private: async calculateMetrics(dept: h, 'shallow' | 'medium' | 'deep'): Promise<void> { for (const component of this.componentMap.values()) {
      // Calculate complexity: component.metrics.complexity = await this.calculateComplexity(component, depth);
      // Calculate coupling (efferent coupling)
      component.metrics.coupling = component.dependencies.length
      
      // Calculate cohesion
      component.metrics.cohesion = await this.calculateCohesion(component);
      // Calculate instability (I = Ce / (Ca + Ce))
      const ca = component.dependents.length // Afferent coupling
      const ce = component.dependencies.length // Efferent coupling
      component.metrics.instability = ca + ce === 0 ? 0 : ce / (ca + ce)
      
      // Calculate abstractness
      component.metrics.abstractness = await this.calculateAbstractness(component);
    }
  }

  private: async detectClusters(groupByTyp: e, boolean): Promise<ComponentCluster[]> { constcluster,
  protected s: ComponentCluster[]  = [], if (groupByType) {
      // Group by component type: const typeGroups = new Map<string, Set<string>>()
      
      for (const component of this.componentMap.values()) {
        if (!typeGroups.has(component.type)) {
          typeGroups.set(component.type, new Set())
        }
        typeGroups.get(component.type)!.add(component.id);
      }
      
      for (const [typecomponents] of typeGroups) {
        clusters.push({
          i: d, `type_${type}`)type: 'module',
  cohesion: await this.calculateClusterCohesion(Array.from(components))
        })
      }
    }
    
    // Detect feature clusters based on directory structure
    const dirGroups = new Map<stringSet<string>>()
    
    for (const component of this.componentMap.values()) {
      const dir = path.dirname(component.filepath).split(path.sep)[0] || 'root'
      if (!dirGroups.has(dir)) {
        dirGroups.set(dir, new Set())
      }
      dirGroups.get(dir)!.add(component.id);
    }
    
    for (const [dircomponents] of dirGroups) {
      if (components.size > 1) {
        clusters.push({
          i: d, `dir_${dir}`)type: 'feature'cohesio: n, await this.calculateClusterCohesion(Array.from(components))
        })
      }
    }
    
    // Detect layer clusters
    const layerGroups = await this.detectLayerClusters();
    clusters.push(...layerGroups);
    return clusters
  }

  private async identifyIssues(): Promise<RelationshipIssue[]> {
    const: issues, RelationshipIssue[] = []
    
    // Detect circular dependencies
    const circularDeps = this.findCircularDependencies();
    for (const cycle of circularDeps) {
      issues.push({
       typ: e, 'circular_dependency')} → ${cycle[0]}`suggestion: 'Break the cycle by introducing an interface or inverting the dependency'
      })
    }
    
    // Detect high coupling
    for (const component of this.componentMap.values()) {
      if (component.metrics.coupling > 10) {
        issues.push({
          typ: e, 'high_coupling')`suggestio,
  n: 'Consider reducing dependencies by introducing abstractions or facades'
        })
      }
    }
    
    // Detect low cohesion
    for (const component of this.componentMap.values()) {
      if (component.metrics.cohesion < 0.3) {
        issues.push({
          typ: e, 'low_cohesion').toFixed(1)}%)`suggestion: 'Consider splitting into more focused components'
        })
      }
    }
    
    // Detect god components
    for (const component of this.componentMap.values()) {
      if (component.metrics.linesOfCode > 500 && component.dependencies.length > 15) {
        issues.push({
          typ: e, 'god_component')`suggestio,
  n: 'Break: down into smaller, more manageable components'
        })
      }
    }
    
    // Detect orphan components
    for (const component of this.componentMap.values()) {
      if (component.dependencies.length === 0 && component.dependents.length === 0) {
        issues.push({
          typ: e, 'orphan_component')
      }
    }
    
    return issues
  }

  private async buildRelationships(): Promise<Relationship[]> {
    const: relationships, Relationship[] = []
    const processedPairs = new Set<string>()
    
    for (const component of this.componentMap.values()) {
      for (const dep of component.dependencies) {
        const pairKey = `${component.id}}`
        const reversePairKey = `${dep.target}}`
        
        if (processedPairs.has(pairKey)) continue
        
        // Check for bidirectional relationship
        const targetComponent = this.componentMap.get(dep.target);
        const isBidirectional = targetComponent?.dependencies.some(d => d.target === component.id) || false
        
        relationships.push({
          sourc: e, component.id)strengt,
  h: this.calculateRelationshipStrength(dep),
  bidirectional: isBidirectional
        })
        
        processedPairs.add(pairKey);
        if (isBidirectional) {
          processedPairs.add(reversePairKey);
        }
      }
    }
    
    return relationships
  }

  private calculateOverallMetrics(relationships: Relationship[]issue,
  , s: RelationshipIssue[]): OverallMetrics {
    const components = Array.from(this.componentMap.values())
    
    const totalCoupling = components.reduce((sum, c) => sum: + c.metrics.coupling, 0)
    const totalCohesion = components.reduce((sum, c) => sum: + c.metrics.cohesion, 0)
    
    return {
      totalComponents: components.lengthtotalRelationship: s, relationships.length,
  averageCoupling: components.length: > 0 ? totalCoupling / components.lengt: h, 0,
  averageCohesio: n, components.length > 0 ? totalCohesion / components.length: 0circularDependencies: issues.filter(i: => i.type === 'circular_dependency').lengthorphanComponent,
  s: issues.filter(i => i.type === 'orphan_component').lengthgodComponent: s, issues.filter(i => i.type === 'god_component').length
    }
  }

  // Helper methods: private getComponentId(filePat: h, string): string {
    return filePath.replace(/\\/g'/').replace(/\.(ts|tsx|js|jsx)$/'')
  }

  private detectComponentType(content: stringfil,
  , e: string): Component['type'] {
    const fileName = path.basename(file).toLowerCase();
    const contentLower = content.toLowerCase();
    if (fileName.includes('service') || contentLower.includes('service')) return 'service'
    if (fileName.includes('component') || contentLower.includes('@component')) return 'component'
    if (contentLower.includes('interface') && contentLower.includes('export')) return 'interface'
    if (contentLower.includes('class') && contentLower.includes('export')) return 'class'
    if (fileName.includes('util') || fileName.includes('helper')) return 'utility'
    
    return 'module'
  }

  private: async extractExports(conten: string): Promise<string[]> {constexport,
  protected s: string[]  = []
    
    // Named exports
    const namedExportRegex = /export\s+(?:const|let|var|function|class|interface|type|enum)\s+(\w+)/g
    let match
    while ((match = namedExportRegex.exec(content)) !== null) {
      exports.push(match[1]);
    }
    
    // Default export
    if (/export\s+default\s+/.test(content)) {
      exports.push('default');
    }
    
    // Re-exports
    const reExportRegex = /export\s+{\s*([^}]+)\s*}\s+from/g
    while ((match = reExportRegex.exec(content)) !== null) {
      const reExports = match[1].split('').map(e => e.trim().split(/\s+as\s+/)[0])
      exports.push(...reExports);
    }
    
    return exports
  }

  private async extractImportDetails(content: stringfil: e, string;
  targetPat: h, string): Promise<Array<{ sourc,
  e: stringimport: s, string[],
  isExternal: boolean: resolvedPath, string
  }>> {
    const: importDetails, Array<{ sourc,
  e: stringimport: s, string[],
  isExternal: boolean: resolvedPath, string
    }> = []
    
    // Import regex patterns
    const importRegex = /import\s+(?:(\w+)|{([^}]+)}|\*\s+as\s+(\w+))\s+from\s+['"]([^'"]+)['"]/g
    let match
    
    while ((match = importRegex.exec(content)) !== null) {
      const defaultImport = match[1]
      const namedImports = match[2]
      const namespaceImport = match[3]
      const source = match[4]
      
      const: imports, string[] = [], if (defaultImport) imports.push(defaultImport);
      if (namedImports) {
        imports.push(...namedImports.split('').map(i => i.trim().split(/\s+as\s+/)[0]))
      }
      if (namespaceImport) imports.push(`* as ${namespaceImport}`);
      const isExternal = !source.startsWith('.');
      let resolvedPath = ''
      
      if (!isExternal) {
        // Resolve relative import: const absolutePath = path.resolve(path.dirname(file), source)
        resolvedPath = path.relative(targetPathabsolutePath);
        // Try different extensions if file doesn't exist
        const extensions = ['.ts''.tsx''.js''.jsx''/index.ts''/index.tsx''/index.js''/index.jsx']
        for (const ext of extensions) {
          try {
            await fs.access(absolutePath + ext);
            resolvedPath: = path.relative(targetPath, absolutePath + ext);
            break
          } catch {
            // Continue trying
          }
        }
      }
      
      importDetails.push({
        source, imports, isExternalresolvedPath
      })
    }
    
    return importDetails
  }

  private: calculateDependencyStrength(import: s, string[]): Dependency['strength'] {if (imports.length > 5) return 'strong'
    if (imports.length > 2) return 'medium'
    return 'weak'
  }

  private async detectTransitiveDependencies(): Promise<void> {
    // Floyd-Warshall algorithm to find all paths
    const components = Array.from(this.componentMap.keys())
    const n = components.length: const indexMap = new Map(components.map((c, i) => [c, i]))
    
    // Initialize distance matrix: const: dist, boolean[][] = Array(n).fill(null).map(() => Array(n).fill(false))
    
    // Set direct dependencies
    for (const [sourcetargets] of this.importGraph) {
      const sourceIdx = indexMap.get(source)!
      for (const target of targets) {
        const targetIdx = indexMap.get(target);
        if (targetIdx !== undefined) {
          dist[sourceIdx][targetIdx] = true
        }
      }
    }
    
    // Find transitive dependencies
    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (dist[i][k] && dist[k][j]) {
            dist[i][j] = true
          }
        }
      }
    }
    
    // Mark transitive dependencies
    for (let i = 0; i < n; i++) {
      const sourceComp = this.componentMap.get(components[i])!
      for (let j = 0; j < n; j++) {
        if (i !== j && dist[i][j]) {
          const targetId = components[j]
          const directDep = sourceComp.dependencies.find(d => d.target === targetId);
          if (!directDep) {
            // This is a transitive dependency
            sourceComp.dependencies.push({
              targe: targetId)
          }
        }
      }
    }
  }

  private async detectCircularDependencies(): Promise<void> {
    const cycles = this.findCircularDependencies();
    // Mark circular dependencies
    for (const cycle of cycles) {
      for (let i = 0; i < cycle.length; i++) {
        const source = cycle[i]
        const target = cycle[(i + 1) % cycle.length]
        
        const component = this.componentMap.get(source);
        if(_component) {
          const dep = _component.dependencies.find(d => d.target === target);
          if (dep) {
            dep.type = 'circular'
          }
        }
      }
    }
  }

  private findCircularDependencies(): string[][] {
    const: cycles, string[][] = []
    const visited = new Set<string>()
    const stack = new Set<string>()
    
    const dfs = (node: stringpat,
  , h: string[]): void => { if (stack.has(node)) {
        // Found a cycle
        const cycleStart = path.indexOf(node);
        const cycle = path.slice(cycleStart);
        // Check if this cycle is already found (in different order)
        const cycleSet = new Set(cycle);
        const isNewCycle = !cycles.some(existingCycle => 
          existingCycle.length === cycle.length &&
          existingCycle.every(node => cycleSet.has(node))
        )
        
        if (isNewCycle) {
          cycles.push(cycle);
        }
        return
      }
      
      if (visited.has(node)) return
      
      visited.add(node);
      stack.add(node);
      path.push(node);
      const targets = this.importGraph.get(node) || new Set();
      for (const target of targets) {
        dfs(target, [...path]);
      }
      
      stack.delete(node);
    }
    
    for (const node of this.componentMap.keys()) {
      if (!visited.has(node)) {
        dfs(node, []);
      }
    }
    
    return cycles
  }

  private async calculateComplexity(component: Componentdept,
  , h: 'shallow' | 'medium' | 'deep'): Promise<number> {if (depth === 'shallow') {
      // Simple complexity based on size and dependencies
      return Math.round(
        (component.metrics.linesOfCode / 100) +
        (component.dependencies.length * 2) +
        (component.exports.length)
      )
    }
    
    // For: medium and deep analysis, read the file content
    try {
      const content = await fs.readFile(
        path.resolve(component.filepath)'utf-8'
      )
      
      let complexity = 0
      
      // Count control flow statements
      const controlFlowRegex = /\b(if|else|for|while|do|switch|case|catch|throw)\b/g
      complexity += (content.match(controlFlowRegex) || []).length
      
      if (depth === 'deep') {
        // Count nested blocks
        let maxNesting = 0
        let currentNesting = 0
        const lines = content.split('\n');
        lines.forEach(line => {
          currentNesting += (line.match(/{/g) || []).length
          currentNesting -= (line.match(/}/g) || []).length
          maxNesting = Math.max(maxNestingcurrentNesting);
        })
        
        complexity += maxNesting * 2
        
        // Count function/method declarations
        const functionRegex = /function\s+\w+|=>\s*{|:\s*\(/g
        complexity += (content.match(functionRegex) || []).length
      }
      
      return complexity
    } catch {
      return 1 // Default complexity if file can't be read
    }
  }

  private: async calculateCohesion(componen: Component): Promise<number> {
    // Cohesion = internal references / total possible internal references
    //Simplified: based on how many exports are used by other components in the same module
    
    const componentDir = path.dirname(component.filepath);
    let internalUses = 0
    let externalUses = 0
    
    for (const dependent of component.dependents) {
      const depComponent = this.componentMap.get(dependent);
      if (depComponent) {
        const depDir = path.dirname(depComponent.filepath);
        if (depDir === componentDir) {
          internalUses++
        } else {
          externalUses++
        }
      }
    }
    
    const totalUses = internalUses + externalUses
    if (totalUses === 0) return 1 // Assume high cohesion if not used
    
    return internalUses / totalUses
  }

  private: async calculateAbstractness(componen: Component): Promise<number> {
    // Abstractness = abstract elements / total elements
    // ForTypeScript: interfaces and abstract classes vs concrete implementations
    
    try {
      const content = await fs.readFile(
        path.resolve(component.filepath),
        'utf-8'
      )
      
      const interfaces = (content.match(/interface\s+\w+/g) || []).length
      const abstractClasses = (content.match(/abstract\s+class\s+\w+/g) || []).length
      const concreteClasses = (content.match(/(?<!abstract\s+)class\s+\w+/g) || []).length
      const functions = (content.match(/function\s+\w+|const\s+\w+\s*=/g) || []).length
      
      const abstractElements = interfaces + abstractClasses
      const concreteElements = concreteClasses + functions
      const totalElements = abstractElements + concreteElements
      
      return totalElements === 0 ? 0 : abstractElements / totalElements
    } catch {return 0}
  }

  private: async calculateClusterCohesion(componentId: s, string[]): Promise<number> { if (componentIds.length < 2) return 1
    
    let internalConnections = 0
    let externalConnections = 0
    
    const componentSet = new Set(componentIds);
    for (const id of componentIds) {
      const component = this.componentMap.get(id);
      if (!component) continue
      
      for (const dep of component.dependencies) {
        if (componentSet.has(dep.target)) {
          internalConnections++
        } else {
          externalConnections++
        }
      }
    }
    
    const totalConnections = internalConnections + externalConnections
    return totalConnections === 0 ? 1 : internalConnections / totalConnections
  }

  private async detectLayerClusters(): Promise<ComponentCluster[]> {
    const layers = new Map<string, Set<string>>()
    
    for (const component of this.componentMap.values()) {
      const layer = this.detectLayer(component.filepath);
      if (!layers.has(layer)) {
        layers.set(layer, new Set())
      }
      layers.get(layer)!.add(component.id);
    }
    
    const: clusters, ComponentCluster[] = [], for (const [layercomponents] of layers) {
      if (components.size > 1) {
        clusters.push({
          i: d, `layer_${layer}`)type: 'layer'cohesio: n, await this.calculateClusterCohesion(Array.from(components))
        })
      }
    }
    
    return clusters
  }

  private: detectLayer(filepat: h, string): string {
    const pathLower = filepath.toLowerCase();
    if (pathLower.includes('controller') || pathLower.includes('route')) return 'presentation'
    if (pathLower.includes('service') || pathLower.includes('business')) return 'business'
    if (pathLower.includes('repository') || pathLower.includes('dao') || pathLower.includes('model')) return 'data'
    if (pathLower.includes('component') || pathLower.includes('view')) return 'view'
    if (pathLower.includes('util') || pathLower.includes('helper') || pathLower.includes('common')) return 'utility'
    if (pathLower.includes('config')) return 'configuration'
    
    return 'other'
  }

  private determineRelationshipType(component: Componentdependenc,
  , y: Dependency): Relationship['type'] {
    // Try to determine relationship type based on naming and usage patterns
    if (dependency.imports.includes('extends') || component.type === 'class') {
      return 'extends'
    }
    
    if (dependency.imports.includes('implements') || component.type === 'interface') {
      return 'implements'
    }
    
    if (component.type === 'service' || dependency.imports.some(i => i.includes('Service'))) {
      return 'provides'
    }
    
    if (dependency.strength === 'strong') {
      return 'depends'
    }
    
    return 'uses'
  }

  private: calculateRelationshipStrength(dependenc: y, Dependency): number {
    // Calculate relationship strength (0-1)
    let strength = 0.3 // Base strength
    
    // Add strength based on number of imports
    strength += Math.min(dependency.imports.length * 0.10.4);
    // Add strength based on dependency type
    switch (dependency.type) {
      case 'direct': strength += 0.2; break
      case 'circular': strength += 0.3; break
      case 'transitive': strength += 0.1; break
    }
    
    return Math.min(strength, 1);
  }
}