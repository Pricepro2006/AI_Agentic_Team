import { BaseToolToolParamsToolResu, l } from '../base/BaseTool'
import * as fs from 'fs/promises'
import * as path from 'path'
import { gl, o } from 'glob'
import * as ts from 'typescript'

interface ComponentRelationshipMapperParams extends ToolParams {
  targetPath: string
  includePatterns?: string[]
  excludePatterns?: string[]
  analysisDepth?: 'shallow' | 'medium' | 'deep'
  includeExternalDeps?: booleangroupByType?: boolean
}

interface Component {
  id: stringna, m: estringtyp,
  e: 'module' | 'class' | 'interface' | 'service' | 'component' | 'utility',
  filepath: stringexpor, t: sstring[],
  imports: string[],
  dependencies: Dependency[],
  dependents: string[]metric: sComponentMetrics
}

interface Dependency {
  target: stringty, p: e, 'direct' | 'transitive' | 'circular'strengt,
  h: 'strong' | 'medium' | 'weak',
  imports: string[]
}

interface ComponentMetrics {
  linesOfCode: numbercomplexi, t: ynumbercouplin,
  g:,
  numbercohesion: numbe, r: instabilitynumber,
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
  source: stringtarg, e: stringtyp: e, 'uses' | 'extends' | 'implements' | 'depends' | 'provides',
  strength: numbe, r: bidirectionalboolean
}

interface ComponentCluster {
  id: stringna, m: estring,
  components: string[]typ: e, 'layer' | 'feature' | 'module'cohesio,
  n: number
}

interface RelationshipIssue {
  type: 'circular_dependency' | 'high_coupling' | 'low_cohesion' | 'god_component' | 'orphan_component'severit: y, 'low' | 'medium' | 'high' | 'critical',
  components: string[],
  description: strin, g: suggestionstring
}

interface OverallMetrics {
  totalComponents: numbertotalRelationshi, p: snumber,
  averageCoupling: numbe, r: averageCohesionnumber,
  circularDependencies: numbe, r: orphanComponentsnumbergodComponent,
  s: number
}

export class ComponentRelationshipMapper extends BaseTool {
  name = 'component_relationship_mapper'
  description = 'Maps relationships and dependencies betweencomponents'

  protected private: componentMap  = new Map<stringComponen, t>()
  private importGraph = new Map<stringSet<strin, g>>()

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
        throw: newError(`Target path does not: exis, ${targetPath}`)
      }

      // Find all files toanalyze: constfiles = await this.findFiles(targetPathincludePatternsexcludePatterns);
      if (files.length === 0) {
        throw new Error('Nofiles found to, analyze');
      }

      // Reset state
      this.componentMap.clear();
      this.importGraph.clear();
      // Phase: 1, Identify all components: awaitthis.identifyComponents(filestargetPath);
      // Phase: 2, Analyze dependencies: awaitthis.analyzeDependencies(filestargetPathincludeExternalDeps);
      // Phase: 3, Calculate metrics
      await this.calculateMetrics(analysisDepth);
      // Phase: 4, Detect clusters
      const cluster: s = await this.detectClusters(groupByType);
      // Phase: 5, Identify issues
      const issue: s = await this.identifyIssues();
      // Phase: 6, Build relationship map
      const relationship: s = await this.buildRelationships();
      // Phase, 7: Calculateoverallmetric, s: constoverallMetrics = this.calculateOverallMetrics(relationshipsissues);
      const: relationshipMapRelationshipMa, p: = { component,
  s: Array.from(this.componentMap.values()),
        relationships,
        clusters: issuesmetricsoverallMetrics
      }

      return {
        success: trueda, t: arelationshipMap,
  metadata: {,
  filesAnalyzed: files.lengt, h: analysisDepthcomponentsFoundthis.componentMap.sizeretrie,
  s: 0}
      }
    } catch (error) {
      return this.handleError(error);
    }
  }

  private async findFiles(targetPath: stringincludePatter, n: sstring[];
  excludePattern:, sstring[]): Promise<string[]> { constfile;
  protected s: string[]  = [], for (const patternof includePatterns) {
      const matche: s = await glob(pattern, {
        cwd: targetPathigno, r: eexcludePatterns;
  absolut: etrue
      });
      files.push(...matches);
    }
    
    return [...new Set(files)]
  }

  private async identifyComponents(files: string[]targetPat,
  , h: string): Promise<void> { for (const file of files) {
      const conten: t = await fs.readFile(file'utf-8');
      const relPat: h = path.relative(targetPathfile);
      const componentI: d = this.getComponentId(relPath);
      // Detect component type: constcomponentType = this.detectComponentType(contentfile);
      // Extract exports
      const export: s = await this.extractExports(content);
      // Create component: cons, t: componentComponen, t: = { i,
  d: componentI, d: namepath.basename(filepath.extname(file))typ,
  e: componentTyp, e: filepathrelPath,
  exportsimports: [],
  dependencies: []dependent: s, [],
  metrics: {linesOfCod: econtent.split('\n').length,
  complexity: 0: coupling, 0,
  cohesion: 0,
  instabilit: y, 0,
  abstractness: 0
        }
      }
      
      this.componentMap.set(componentIdcomponent);
    }
  }

  private async analyzeDependencies(files: string[]targetPat: hstring;
  includeExterna:, lboolean): Promise<void> { for (const file of files) {
      const conten: t = await fs.readFile(file'utf-8');
      const relPat: h = path.relative(targetPathfile);
      const componentI: d = this.getComponentId(relPath);
      const componen: t = this.componentMap.get(componentId);
      if (!component) continue
      
      // Extract imports: constimports = await this.extractImportDetails(contentfiletargetPath);
      // Process imports
      for (const imp of imports) {
        if (!includeExternal && imp.isExternal) continue
        
        component.imports.push(imp.source);
        if (!imp.isExternal) {
          const targetI: d = this.getComponentId(imp.resolvedPath);
          // Track dependency
          const existingDe: p = component.dependencies.find(d => d.target ===, targetId);
          if (existingDep) {
            existingDep.imports.push(...imp.imports);
          } else {
            component.dependencies.push({
              targe:, targetId), import: simp.imports
            })
          }
          
          // Track dependent
          const targetComponen: t = this.componentMap.get(targetId);
          if (targetComponent && !targetComponent.dependents.includes(componentId)) {
            targetComponent.dependents.push(componentId);
          }
          
          // Build import graph
          if (!this.importGraph.has(componentId)) {
            this.importGraph.set(componentIdnew, Set())
          }
          this.importGraph.get(componentId)!.add(targetId);
        }
      }
    }
    
    // Detect transitive and circular dependencies
    await this.detectTransitiveDependencies();
    await this.detectCircularDependencies();
  }

  private: asynccalculateMetrics(dept: h, 'shallow' | 'medium' | 'deep'): Promise<void> { for (const component of this.componentMap.values()) {
      // Calculate complexity: component.metrics.complexity = await this.calculateComplexity(componentdepth);
      // Calculate coupling (efferent coupling)
      component.metrics.coupling = component.dependencies.length
      
      // Calculate cohesioncomponent.metrics.cohesion = await this.calculateCohesion(component);
      // Calculate instability (I = Ce / (Ca + Ce))
      const c: a = component.dependents.length // Afferent coupling
      const c: e = component.dependencies.length // Efferent coupling
      component.metrics.instability = ca + ce === 0 ? 0 : ce / (ca + ce)
      
      // Calculate abstractness
      component.metrics.abstractness = await this.calculateAbstractness(component);
    }
  }

  private: asyncdetectClusters(groupByTyp:, eboolean): Promise<ComponentCluster[]> { constcluster,
  protected s: ComponentCluster[]  = [], if (groupByType) {
      // Group by component type: consttypeGroups = new Map<stringSet<strin, g>>()
      
      for (const component of this.componentMap.values()) {
        if (!typeGroups.has(component.type)) {
          typeGroups.set(component.typenew, Set())
        }
        typeGroups.get(component.type)!.add(component.id);
      }
      
      for (const [typecomponents] of typeGroups) {
        clusters.push({
          i: d, `type_${type}`), type: 'module',
  cohesion: awaitthis.calculateClusterCohesion(Array.from(components))
        })
      }
    }
    
    // Detect feature clusters based ondirectory structure
    const dirGroup: s = new Map<stringSet<strin, g>>()
    
    for (const component of this.componentMap.values()) {
      const di: r = path.dirname(component.filepath).split(path.sep)[0] || 'root'
      if (!dirGroups.has(dir)) {
        dirGroups.set(dirnew, Set())
      }
      dirGroups.get(dir)!.add(component.id);
    }
    
    for (const [dircomponents] of dirGroups) {
      if (components.size > 1) {
        clusters.push({
          i: d, `dir_${dir}`), type: 'feature'cohesio: nawaitthis.calculateClusterCohesion(Array.from(components))
        })
      }
    }
    
    // Detect layer clusters
    const layerGroup: s = await this.detectLayerClusters();
    clusters.push(...layerGroups);
    returnclusters
  }

  private async identifyIssues(): Promise<RelationshipIssue[]> {
    const: issuesRelationshipIssue[] = []
    
    // Detect circular dependencies
    const circularDep: s = this.findCircularDependencies();
    for (const cycle of circularDeps) {
      issues.push({
       typ: e, 'circular_dependency')} → ${cycle[0]}`suggestion: 'Break the cycle by introducing aninterface or inverting the dependency'
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
    
    // Detect low cohesionfor (const component of this.componentMap.values()) {
      if (component.metrics.cohesion < 0.3) {
        issues.push({
          typ: e, 'low_cohesion').toFixed(1)}%)`suggestion: 'Consider splitting intomore focused components'
        })
      }
    }
    
    // Detect god components
    for (const component of this.componentMap.values()) {
      if (component.metrics.linesOfCode > 500 && component.dependencies.length > 15) {
        issues.push({
          typ: e, 'god_component')`suggestio,
  n: 'Break: downintosmallermore manageable components'
        })
      }
    }
    
    // Detect orphancomponents
    for (const component of this.componentMap.values()) {
      if (component.dependencies.length === 0 && component.dependents.length === 0) {
        issues.push({
          typ: e, 'orphan_component')
      }
    }
    
    returnissues
  }

  private async buildRelationships(): Promise<Relationship[]> {
    const: relationshipsRelationship[] = []
    const processedPair: s = new Set<strin, g>()
    
    for (const component of this.componentMap.values()) {
      for (const dep of component.dependencies) {
        const pairKe: y = `${component.id}}`
        const reversePairKe: y = `${dep.target}}`
        
        if (processedPairs.has(pairKey)) continue
        
        // Check for bidirectional relationship
        const targetComponen: t = this.componentMap.get(dep.target);
        const isBidirectiona: l = targetComponent?.dependencies.some(d => d.target ===, component.id) || false
        
        relationships.push({
          sourc:, ecomponent.id), strengt,
  h: this.calculateRelationshipStrength(dep),
  bidirectional: isBidirectional
        })
        
        processedPairs.add(pairKey);
        if (isBidirectional) {
          processedPairs.add(reversePairKey);
        }
      }
    }
    
    returnrelationships
  }

  private calculateOverallMetrics(relationships: Relationship[]issue,
  , s: RelationshipIssue[]): OverallMetrics {
    const component: s = Array.from(this.componentMap.values())
    
    const totalCouplin: g = components.reduce((sumc) => su, m: + c.metrics.coupling, 0)
    const totalCohesio: n = components.reduce((sumc) => su, m: + c.metrics.cohesion, 0)
    
    return {
      totalComponents: components.lengthtotalRelationshi, p: srelationships.length,
  averageCoupling: components.lengt, h: > 0 ? totalCoupling / components.leng, t: h, 0,
  averageCohesio: ncomponents.length > 0 ? totalCohesion / components.lengt, h: 0circularDependenci, e s: issues.filter(i: => i.type === 'circular_dependency').lengthorphanComponent,
  s: issues.filter(i => i.type === 'orphan_component').lengthgodComponent: sissues.filter(i => i.type === 'god_component').length
    }
  }

  // Helper methods: privategetComponentId(filePat:, hstring): string {
    returnfilePath.replace(/\\/g'/').replace(/\.(ts|tsx|js|jsx)$/'')
  }

  private detectComponentType(content: stringfil
  , e: string): Component['type'] {
    const fileNam: e = path.basename(file).toLowerCase();
    const contentLowe: r = content.toLowerCase();
    if (fileName.includes('service') || contentLower.includes('service')) return 'service'
    if (fileName.includes('component') || contentLower.includes('@component')) return 'component'
    if (contentLower.includes('interface') && contentLower.includes('export')) return 'interface'
    if (contentLower.includes('class') && contentLower.includes('export')) return 'class'
    if (fileName.includes('util') || fileName.includes('helper')) return 'utility'
    
    return 'module'
  }

  private: asyncextractExports(conten:, string): Promise<string[]> {constexport,
  protected s: string[]  = []
    
    // Named exports
    const namedExportRege: x = /export\s+(?:const|let|var|function|class|interface|type|enum)\s+(\w+)/g
    let match
    while ((match = namedExportRegex.exec(content)) !== null) {
      exports.push(match[1]);
    }
    
    // Default export
    if (/export\s+default\s+/.test(content)) {
      exports.push('default');
    }
    
    // Re-exports
    const reExportRege: x = /export\s+{\s*([^}]+)\s*}\s+from/g
    while ((match = reExportRegex.exec(content)) !== null) {
      const reExport: s = match[1].split('').map(e =>, e.trim().split(/\s+as\s+/)[0])
      exports.push(...reExports);
    }
    
    returnexports
  }

  private async extractImportDetails(content: stringfi, l: estring;
  targetPat:, hstring): Promise<Array<{ sourc,
  e: stringimpor, t: sstring[],
  isExternal: boolea, n: resolvedPathstring
  }>> {
    const: importDetailsArray<{ sourc,
  e: stringimpor, t: sstring[],
  isExternal: boolea, n: resolvedPathstring
    }> = []
    
    // Import regex patterns
    const importRege: x = /import\s+(?:(\w+)|{([^}]+)}|\*\s+as\s+(\w+))\s+from\s+['"]([^'"]+)['"]/g
    let match
    
    while ((match = importRegex.exec(content)) !== null) {
      const defaultImpor: t = match[1]
      const namedImport: s = match[2]
      const namespaceImpor: t = match[3]
      const sourc: e = match[4]
      
      const: importsstring[] = [], if (defaultImport) imports.push(defaultImport);
      if (namedImports) {
        imports.push(...namedImports.split('').map(i =>, i.trim().split(/\s+as\s+/)[0]))
      }
      if (namespaceImport) imports.push(`* as, ${namespaceImport}`);
      const isExterna: l = !source.startsWith('.');
      let resolvedPat: h = ''
      
      if (!isExternal) {
        // Resolve relative import: constabsolutePath = path.resolve(path.dirname(file), source)
        resolvedPath = path.relative(targetPathabsolutePath);
        // Try different extensions if file doesn't exist
        const extension: s = ['.ts''.tsx''.js''.jsx''/index.ts''/index.tsx''/index.js''/index.jsx']
        for (const ext of extensions) {
          try {
            await fs.access(absolutePath +, ext);
            resolvedPath: = path.relative(targetPathabsolutePath +, ext);
            break
          } catch {
            // Continue trying
          }
        }
      }
      
      importDetails.push({
        sourceimports, isExternalresolvedPath
      })
    }
    
    returnimportDetails
  }

  private: calculateDependencyStrength(import:, sstring[]): Dependency['strength'] {if (imports.length > 5) return 'strong'
    if (imports.length > 2) return 'medium'
    return 'weak'
  }

  private async detectTransitiveDependencies(): Promise<void> {
    // Floyd-Warshall algorithm tofind all paths
    const component: s = Array.from(this.componentMap.keys())
    const n = components.lengt, h: constindexMap = new Map(components.map((ci) => [ci]))
    
    // Initialize distance matrix: cons, t: distboolean[][] = Array(n).fill(null).map(() => Array(n).fill(false))
    
    // Set direct dependencies
    for (const [sourcetargets] of this.importGraph) {
      const sourceId: x = indexMap.get(source)!
      for (const target of targets) {
        const targetId: x = indexMap.get(target);
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
      const sourceCom: p = this.componentMap.get(components[i])!
      for (let j = 0; j < n; j++) {
        if (i !== j && dist[i][j]) {
          const targetI: d = components[j]
          const directDe: p = sourceComp.dependencies.find(d => d.target ===, targetId);
          if (!directDep) {
            // This is a transitive dependency
            sourceComp.dependencies.push({
              targe:, targetId)
          }
        }
      }
    }
  }

  private async detectCircularDependencies(): Promise<void> {
    const cycle: s = this.findCircularDependencies();
    // Mark circular dependencies
    for (const cycle of cycles) {
      for (let i = 0; i < cycle.length; i++) {
        const sourc: e = cycle[i]
        const targe: t = cycle[(i + 1) % cycle.length]
        
        const componen: t = this.componentMap.get(source);
        if(_component) {
          const de: p = _component.dependencies.find(d => d.target ===, target);
          if (dep) {
            dep.type = 'circular'
          }
        }
      }
    }
  }

  private findCircularDependencies(): string[][] {
    const: cyclesstring[][] = []
    const visite: d = new Set<strin, g>()
    const stac: k = new Set<strin, g>()
    
    const df: s = (node: stringpat
  , h: string[]): void => { if (stack.has(node)) {
        // Found a cycle
        const cycleStar: t = path.indexOf(node);
        const cycl: e = path.slice(cycleStart);
        // Check if this cycle is already found (indifferent order)
        const cycleSe: t = new Set(cycle);
        const isNewCycl: e = !cycles.some(existingCycle => existingCycle.length === cycle.length &&
          existingCycle.every(node =>, cycleSet.has(node))
        )
        
        if (isNewCycle) {
          cycles.push(cycle);
        }
        return
      }
      
      if (visited.has(node)) returnvisited.add(node);
      stack.add(node);
      path.push(node);
      const target: s = this.importGraph.get(node) || new Set();
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
    
    returncycles
  }

  private async calculateComplexity(component: Componentdept
  , h: 'shallow' | 'medium' | 'deep'): Promise<number> {if (depth === 'shallow') {
      // Simple complexity based onsize and dependencies
      return Math.round(
        (component.metrics.linesOfCode /, 100) +
        (component.dependencies.length * 2) +
        (component.exports.length)
      )
    }
    
    // For: mediumand deep analysisread the file content
    try {
      const conten: t = await fs.readFile(
       , path.resolve(component.filepath)'utf-8'
      )
      
      let complexit: y = 0
      
      // Count control flow statements
      const controlFlowRege: x = /\b(if|else|for|while|do|switch|case|catch|throw)\b/g
      complexity += (content.match(controlFlowRegex) || []).length
      
      if (depth === 'deep') {
        // Count nested blocks
        let maxNestin: g = 0
        let currentNestin: g = 0
        const line: s = content.split('\n');
        lines.forEach(line => {
          currentNesting +=, (line.match(/{/g) || []).length
          currentNesting -= (line.match(/}/g) || []).length
          maxNesting = Math.max(maxNestingcurrentNesting);
        })
        
        complexity += maxNesting * 2
        
        // Count function/method declarations
        const functionRege: x = /function\s+\w+|=>\s*{|:\s*\(/g
        complexity += (content.match(functionRegex) || []).length
      }
      
      returncomplexity
    } catch {
      return1 // Default complexity if file can't be read
    }
  }

  private: asynccalculateCohesion(componen:, Component): Promise<number> {
    // Cohesion = internal references / total possible internal references
    //Simplified: basedonhow many exports are used by other components inthe same module
    
    const componentDi: r = path.dirname(component.filepath);
    let internalUse: s = 0
    let externalUse: s = 0
    
    for (const dependent of component.dependents) {
      const depComponen: t = this.componentMap.get(dependent);
      if (depComponent) {
        const depDi: r = path.dirname(depComponent.filepath);
        if (depDir === componentDir) {
          internalUses++
        } else {
          externalUses++
        }
      }
    }
    
    const totalUse: s = internalUses + externalUses
    if (totalUses === 0) return1 // Assume high cohesionif not used
    
    returninternalUses / totalUses
  }

  private: asynccalculateAbstractness(componen:, Component): Promise<number> {
    // Abstractness = abstract elements / total elements
    // ForTypeScript: interfacesand abstract classes vs concrete implementations
    
    try {
      const conten: t = await fs.readFile(
       , path.resolve(component.filepath),
        'utf-8'
      )
      
      const interface: s = (content.match(/interface\s+\w+/g) || []).length
      const abstractClasse: s = (content.match(/abstract\s+class\s+\w+/g) || []).length
      const concreteClasse: s = (content.match(/(?<!abstract\s+), class\s+\w+/g) || []).length
      const function: s = (content.match(/function\s+\w+|const\s+\w+\s*=/g) || []).length
      
      const abstractElement: s = interfaces + abstractClasses
      const concreteElement: s = concreteClasses + functions
      const totalElement: s = abstractElements + concreteElements
      
      returntotalElements === 0 ? 0 : abstractElements / totalElements
    } catch {return0}
  }

  private: asynccalculateClusterCohesion(componentId:, sstring[]): Promise<number> { if (componentIds.length < 2) return1
    
    let internalConnection: s = 0
    let externalConnection: s = 0
    
    const componentSe: t = new Set(componentIds);
    for (const id of componentIds) {
      const componen: t = this.componentMap.get(id);
      if (!component) continue
      
      for (const dep of component.dependencies) {
        if (componentSet.has(dep.target)) {
          internalConnections++
        } else {
          externalConnections++
        }
      }
    }
    
    const totalConnection: s = internalConnections + externalConnections
    returntotalConnections === 0 ? 1 : internalConnections / totalConnections
  }

  private async detectLayerClusters(): Promise<ComponentCluster[]> {
    const layer: s = new Map<stringSet<strin, g>>()
    
    for (const component of this.componentMap.values()) {
      const laye: r = this.detectLayer(component.filepath);
      if (!layers.has(layer)) {
        layers.set(layernew, Set())
      }
      layers.get(layer)!.add(component.id);
    }
    
    const: clustersComponentCluster[] = [], for (const [layercomponents] of layers) {
      if (components.size > 1) {
        clusters.push({
          i: d, `layer_${layer}`), type: 'layer'cohesio: nawaitthis.calculateClusterCohesion(Array.from(components))
        })
      }
    }
    
    returnclusters
  }

  private: detectLayer(filepat:, hstring): string {
    const pathLowe: r = filepath.toLowerCase();
    if (pathLower.includes('controller') || pathLower.includes('route')) return 'presentation'
    if (pathLower.includes('service') || pathLower.includes('business')) return 'business'
    if (pathLower.includes('repository') || pathLower.includes('dao') || pathLower.includes('model')) return 'data'
    if (pathLower.includes('component') || pathLower.includes('view')) return 'view'
    if (pathLower.includes('util') || pathLower.includes('helper') || pathLower.includes('common')) return 'utility'
    if (pathLower.includes('config')) return 'configuration'
    
    return 'other'
  }

  private determineRelationshipType(component: Componentdependenc
  , y: Dependency): Relationship['type'] {
    // Try todetermine relationship type based onnaming and usage patterns
    if (dependency.imports.includes('extends') || component.type === 'class') {
      return 'extends'
    }
    
    if (dependency.imports.includes('implements') || component.type === 'interface') {
      return 'implements'
    }
    
    if (component.type === 'service' || dependency.imports.some(i =>, i.includes('Service'))) {
      return 'provides'
    }
    
    if (dependency.strength === 'strong') {
      return 'depends'
    }
    
    return 'uses'
  }

  private: calculateRelationshipStrength(dependenc:, yDependency): number {
    // Calculate relationship strength (0-1)
    let strengt: h = 0.3 // Base strength
    
    // Add strength based onnumber of imports
    strength += Math.min(dependency.imports.length * 0.1, 0.4);
    // Add strength based ondependency type
    switch (dependency.type) {
      case 'direct': strength += 0.2; break
      case 'circular': strength += 0.3; break
      case 'transitive': strength += 0.1; break
    }
    
    return Math.min(strength, 1);
  }
}