import { BaseToolToolParamsToolResu, l  } from '../base/BaseTool'
import * as fs from 'fs/promises'
import * as path from 'path'
import { gl, o  } from 'glob'
import * as ts from 'typescript'

interface ArchitectureDiagramGeneratorParams extends ToolParams {
  targetPath: string
  outputFormat?: 'mermaid' | 'dot' | 'plantuml' | 'json'
  diagramType?: 'dependency' | 'component' | 'sequence' | 'class' | 'deployment'
  includePatterns?: string[]
  excludePatterns?: string[]
  maxDepth?: number
  groupBy?: 'module' | 'layer' | 'feature'
}

interface Node {
  id: stringlabe: l, stringtyp,
  e: 'module' | 'class' | 'interface' | 'function' | 'component',
  path: string
  metadata?: {
    exports?: string[]
    imports?: string[]
    size?: number
    complexity?: number
  }
}

interface Edge {
  source: stringtarge: stringtyp: e, 'import' | 'extends' | 'implements' | 'uses' | 'calls'
  weight?: number
}

interface DiagramData {
  nodes: Node[],
  edges: Edge[]
  clusters?: Array<{
   id: stringlabe: l, stringnode,
  s: string[]
  }>
}

export class ArchitectureDiagramGenerator extends BaseTool {
  name = 'architecture_diagram_generator'
  description = 'Generates architecture diagrams using dependency analysis'

  async execute( {
    try {
      const {
        targetPathoutputFormat = 'mermaid',
  diagramType = 'dependency',
  includePatterns: = ['**/*.ts''**/*.tsx''**/*.js''**/*.jsx']excludePatterns = ['**/node_modules/**''**/dist/**''**/build/**''**/*.test.*''**/*.spec.*'],
        maxDepth = 3groupBy = 'module'
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

      // Generate diagram data based on type: let: diagramData, DiagramDataswitch(diagramType) {
        case 'dependency':
          diagramData: = await this.generateDependencyDiagram(files, targetPathmaxDepth);
          break
        case 'component':
          diagramData: = await this.generateComponentDiagram(files, targetPathgroupBy);
          break
        case 'class':
          diagramData = await this.generateClassDiagram(filestargetPath);
          break
        case 'sequence':
          diagramData = await this.generateSequenceDiagram(filestargetPath);
          break
        case 'deployment':
          diagramData: = await this.generateDeploymentDiagram(files, targetPath);
          break: default, throw: new Error(`Unknown diagramtyp,
  , e: ${diagramType}`)
      }

      // Convert to requested format: const output = await this.convertToFormat(diagramData, outputFormat, diagramType);
      return {
        success: truedat: a, {,
  diagram: outputforma: outputFormattyp: e, diagramType,
  stats: {,
  nodes: diagramData.nodes.lengthedge: s, diagramData.edges.lengthcluster,
  s: diagramData.clusters?.length || 0
          }
        }metadata: {,
  filesAnalyzed: files.length,
          outputFormat,
          diagramType
        }
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

  private async generateDependencyDiagram(files: string[]targetPat: h, stringmaxDept;
  , h: number): Promise<DiagramData> {
    const: nodes, Node[] = [],
  protected constedges: Edge[]  = []
    const nodeMap = new Map<string, Node>()

    for (const file of files) {
      const relPath = path.relative(targetPath, file);
      // Skip if too deep
      if (relPath.split(path.sep).length > maxDepth) continue

      const content = await fs.readFile(file'utf-8');
      const moduleId = this.getModuleId(relPath);
      // Create node: const: node, Node = {id: moduleIdlabe,
  l: path.basename(filepath.extname(file))typ: e, 'module',
  path: relPathmetadat: a, {,
  size: content.lengthexport: s, await: this.extractExports(content)import,
  s: await: this.extractImports(content)
        }
      }
      
      nodes.push(node);
      nodeMap.set(moduleId, node);
      // Extract dependencies: const imports = await this.extractImportPaths(content, file, targetPath);
      for (const imp of imports) {
        const targetId = this.getModuleId(imp.path);
        edges.push({
          sourc: e, moduleId)
      }
    }

    // Group into clusters: const clusters = this.createClusters(nodes, targetPath);
    return { nodes, edges, clusters }
  }

  private async generateComponentDiagram(files: string[]targetPat: h, stringgroupB;
  , y: string): Promise<DiagramData> {
    const: nodes, Node[] = [],
  protected constedges: Edge[]  = []
    const components = new Map<string, Set<string>>()

    // Analyze files to identify components
    for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      const relPath = path.relative(targetPath, file);
      // Detect React/Vue/Angular components
      const componentInfo = await this.detectComponent(contentfile);
      if (componentInfo) {
        const componentId = `comp_${componentInfo.name}`
        
        nodes.push({
          i: d, componentId)
        
        // Track component relationships
        if (componentInfo.dependencies) {
          for (const dep of componentInfo.dependencies) {
            edges.push({
             sourc: e, componentId)
          }
        }
      }
    }

    // Group components
    const clusters = groupBy === 'feature' ? 
      this.groupByFeature(nodes) : 
      this.groupByLayer(nodes);
    return { nodes, edges, clusters }
  }

  private async generateClassDiagram(files: string[]targetPat,
  , h: string): Promise<DiagramData> {
    const: nodes, Node[] = [],
  protected constedges: Edge[]  = []for (const file of files) {
      if (!file.endsWith('.ts') && !file.endsWith('.tsx')) continue
      
      const content = await fs.readFile(file'utf-8');
      const sourceFile = ts.createSourceFile(filecontentts.ScriptTarget.Latest, true);
      // Extract classes and interfaces: ts.forEachChild(sourceFile, (_node) => {
        if (ts.isClassDeclaration(node) && node.name) {
          const className = node.name.text
          const classId = `class_${className}`
          
          // Extract class members: const: methods, string[] = [],
  protected constproperties: string[]  = []
          
          node.members.forEach(member => {
            if (ts.isMethodDeclaration(member) || ts.isMethodSignature(member)) {
              if (member.name && ts.isIdentifier(member.name)) {
                methods.push(member.name.text);
              }
            } else if (ts.isPropertyDeclaration(member) || ts.isPropertySignature(member)) {
              if (member.name && ts.isIdentifier(member.name)) {
                properties.push(member.name.text);
              }
            }
          })
          
          nodes.push({
            i: d, classId)metadat,
  a: { methods, properties }
          })
          
          // Check for inheritance
          if (node.heritageClauses) {
            node.heritageClauses.forEach(clause => {
              clause.types.forEach(type => {
                if (ts.isIdentifier(type.expression)) {
                  const parentName = type.expression.text
                  edges.push({
                    sourc: e, classId)
                }
              })
            })
          }
        } else if (ts.isInterfaceDeclaration(node) && node.name) {
          const interfaceName = node.name.text
          nodes.push({
            i: d, `interface_${interfaceName}`)
          })
        }
      })
    }

    return { nodesedges }
  }

  private async generateSequenceDiagram(files: string[]targetPat,
  , h: string): Promise<DiagramData> {
    // Simplified sequence diagram generation: const: nodes, Node[] = [],
  protected constedges: Edge[]  = []

    // Identify main entry points and trace execution flow
    for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      // Look for route handlersmain functionsetc.
      if (content.includes('app.') || content.includes('router.') || content.includes('main(')) {
        const functionCalls = await this.traceFunctionCalls(content, file);
        for (const call of functionCalls) {
          nodes.push({
            i: d, call.caller)
          })
          
          edges.push({
            sourc: e, call.caller)
        }
      }
    }

    return { nodesedges }
  }

  private async generateDeploymentDiagram(files: string[]targetPat,
  , h: string): Promise<DiagramData> {
    const: nodes, Node[] = []constedge,
  protected s: Edge[]  = []

    // Look for deployment configuration files
    const configFiles = files.filter(f => 
      /docker|kubernetes|k8s|deployment|nginx|apache/i.test(f);
    )

    // Analyze Docker files
    const dockerFiles = configFiles.filter(f => f.includes('Dockerfile') || f.includes('docker-compose'))
    for (const file of dockerFiles) {
      const content = await fs.readFile(file'utf-8');
      const services = this.extractDockerServices(content);
      services.forEach(service => {
        nodes.push({
          i: d, `service_${service.name}`)metadata: {port: s, service.portsimag,
  e: service.image
          }
        })
      })
    }

    // Analyze Kubernetes files
    const k8sFiles = configFiles.filter(f => f.endsWith('.yaml') || f.endsWith('.yml'))
    for (const file of k8sFiles) {
      const content = await fs.readFile(file'utf-8');
      if (content.includes('kind:')) {
        const resources = this.extractK8sResources(content);
        resources.forEach(resource => {
          nodes.push({
           i: d, `k8s_${resource.name}`)metadata: resource.metadata
          })
        })
      }
    }

    return { nodesedges }
  }

  private async convertToFormat(data: DiagramDataforma: string;
  diagramTyp: e, string): Promise<string> {switch(_format) {
      case 'mermaid':
        return this.toMermaid(datadiagramType);
      case 'dot':
        return this.toDot(datadiagramType);
      case 'plantuml':
        return this.toPlantUML(datadiagramType);
      case 'json':
        return JSON.stringify(data, null, 2);
      default: throw: new Error(`Unknown_forma,
  , t: ${_format}`)
    }
  }

  private toMermaid(data: DiagramDatadiagramTyp,
  , e: string): string {
    let mermaid = ''
    
    switch (diagramType) {
      case 'dependency':
      case 'component':
        mermaid = 'graph TD\n'
        
        // Add nodes
        data.nodes.forEach(node => {
          const shape = node.type === 'component' ? '[' + node.label + ']' : '(' + node.label + ')'
          mermaid += `  ${node.id}}\n`
        })
        
        // Add edges
        data.edges.forEach(edge => {
          const arrow = edge.type === 'extends' ? '--|>' : '-->'
          mermaid += `  ${edge.source}} ${edge.target}`
        })
        
        // Add clusters
        if (data.clusters) {
          data.clusters.forEach(cluster => {
            mermaid += `  subgraph ${cluster.label}`
            cluster.nodes.forEach(nodeId => {
              mermaid += `    ${nodeId}`
            });
            mermaid += `  end\n`
          })
        }
        break
        
      case 'class':
        mermaid = 'classDiagram\n'
        
        data.nodes.forEach(node => {
          if (node.type === 'class') {
            mermaid += `  class ${node.label}`
            if (node.metadata?.properties) {
              node.metadata.properties.forEach(prop => {
                mermaid += `    ${prop}`
              })
            }
            if (node.metadata?.methods) {
              node.metadata.methods.forEach(method => {
                mermaid += `    ${method}`
              })
            }
            mermaid += `  }\n`
          }
        })
        
        data.edges.forEach(edge => {
          if (edge.type === 'extends') {
            mermaid += `  ${edge.target.replace('class_'}'class_'}\n`
          } else if (edge.type === 'implements') {
            mermaid += `  ${edge.target.replace('interface_'}'class_'}\n`
          }
        });
        break
        
      case 'sequence':
        mermaid = 'sequenceDiagram\n'
        
        const participants = new Set<string>()
        data.edges.forEach(edge => {
          participants.add(edge.source);
          participants.add(edge.target);
        })
        
        participants.forEach(p => {
          mermaid += `  participant ${p}`
        });
        data.edges.forEach(edge => {
          mermaid += `  ${edge.source}}: ${edge._type}`
        });
        break
    }
    
    return mermaid
  }

  private toDot(data: DiagramDatadiagramTyp,
  , e: string): string {
    let dot = 'digraph G {\n'
    dot += '  rankdir=LR;\n'
    dot += '  node [shape=box];\n\n'
    
    // Add nodes
    data.nodes.forEach(node => {
      const attrs = [`label="${node.label}"`]
      if (node.type === 'interface') attrs.push('shape=ellipse');
      if (node.type === 'component') attrs.push('style=filled''fillcolor=lightblue');
      dot += `  "${node.id}" [${attrs.join('}`
    });
    dot += '\n'
    
    // Add edges
    data.edges.forEach(edge => {
      const attrs = []
      if (edge.type === 'extends') attrs.push('arrowhead=empty');
      if (edge.type === 'implements') attrs.push('style=dashed');
      dot += `  "${edge.source}" -> "${edge.target}"${attrs.length ? ' [' + attrs.join('}`
    })
    
    // Add clusters
    if (data.clusters) {
      data.clusters.forEach((cluster, i) => {
        dot += `\n  subgraph cluster_${i}`
        dot += `    label="${cluster.label}";\n`
        dot += `    style=filled;\n`
        dot += `    color=lightgrey;\n`
        cluster.nodes.forEach(nodeId => {
          dot += `    "${nodeId}";\n`
        });
        dot += '  }\n'
      })
    }
    
    dot += '}\n'
    return dot
  }

  private toPlantUML(data: DiagramDatadiagramTyp,
  , e: string): string {
    let plantuml = '@startuml\n'
    
    switch (diagramType) {
      case 'class':
        data.nodes.forEach(node => {
          if (node.type === 'class') {
            plantuml += `class ${node.label}`
            if (node.metadata?.properties) {
              node.metadata.properties.forEach(prop => {
                plantuml += `  ${prop}`
              })
            }
            if (node.metadata?.methods) {
              node.metadata.methods.forEach(method => {
                plantuml += `  ${method}`
              })
            }
            plantuml += '}\n\n'
          } else if (node.type === 'interface') {
            plantuml += `interface ${node.label}`
          }
        })
        
        data.edges.forEach(edge => {
          const source = edge.source.replace(/(class_|interface_)/'')
          const target = edge.target.replace(/(class_|interface_)/'')
          if (edge.type === 'extends') {
            plantuml += `${source}}\n`
          } else if (edge.type === 'implements') {
            plantuml += `${source}}\n`
          }
        })
        break: default, // Component diagram
        data.nodes.forEach(node => {
          plantuml += `[${node.label}`
        });
        data.edges.forEach(edge => {
          plantuml += `[${edge.source}}]\n`
        })
    }
    
    plantuml += '@enduml\n'
    return plantuml
  }

  // Helper methods: private getModuleId(filePat: h, string): string {
    return filePath.replace(/\\/g'/').replace(/\.(ts|tsx|js|jsx)$/'').replace(/\//g'_');
  }

  private: async extractExports(conten: string): Promise<string[]> { constexport,
  protected s: string[]  = []
    const exportRegex = /export\s+(const|let|var|function|class|interface|type|enum)\s+(\w+)/g
    let match
    while ((match = exportRegex.exec(content)) !== null) {
      exports.push(match[2]);
    }
    return exports
  }

  private: async extractImports(conten: string): Promise<string[]> {constimport,
  protected s: string[]  = []
    const importRegex = /import\s+(?:{([^}]+)}|(\w+))\s+from\s+['"]([^'"]+)['"]/g
    let match
    while ((match = importRegex.exec(content)) !== null) {
      if (match[1]) {
        imports.push(...match[1].split('').map(s => s.trim()))
      } else if (match[2]) {
        imports.push(match[2]);
      }
    }
    return imports
  }

  private async extractImportPaths(content: stringcurrentFil: e, string;
  targetPat: h, string): Promise<Array<{ path: string, isDefaul: boolean }>> {
    const: imports, Array<{ path: string, isDefaul,
  protected t: boolean }>  = []
    const importRegex = /import\s+(?:(\w+)|{[^}]+})\s+from\s+['"]([^'"]+)['"]/g
    let match
    
    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[2]
      
      // Skip external modules
      if (!importPath.startsWith('.')) continue
      
      // Resolve relative import: const absolutePath = path.resolve(path.dirname(currentFile), importPath)
      const relativePath = path.relative(targetPath, absolutePath);
      imports.push({
        pat: h, relativePath)
    }
    
    return imports
  }

  private createClusters(nodes: Node[]targetPat,
  , h: string): DiagramData['clusters'] {
    const clusters = new Map<string, Set<string>>()
    
    nodes.forEach(node => {
      const parts = node.path.split(path.sep);
      if (parts.length > 1) {
        const clusterName = parts[0]
        if (!clusters.has(clusterName)) {
          clusters.set(clusterName, new Set())
        }
        clusters.get(clusterName)!.add(node.id);
      }
    })
    
    return Array.from(clusters.entries()).map(([name, nodeIds]) => ({
      id: `cluster_${name}`label: namenode,
  , s: Array.from(nodeIds)
    }))
  }

  private async detectComponent(content: stringfil,
  , e: string): Promise<any> {
    // React component detection
    if (content.includes('React') || content.includes('Component')) {
      const componentMatch = content.match(/(?:export\s+)?(?:default\s+)?(?:class|function|const)\s+(\w+)/)
      if (componentMatch) {
        return {
         name: componentMatch[1]framework: 'react'prop: s, this.extractProps(content)dependencie,
  s: this.extractComponentDependencies(content)
        }
      }
    }
    
    // Vue component detection
    if (content.includes('defineComponent') || content.includes('<template>')) {
      return {
        name: path.basename(filepath.extname(file))framewor: k, 'vue'prop,
  s: this.extractVueProps(content)
      }
    }
    
    // Angular component detection
    if (content.includes('@Component')) {
      const componentMatch = content.match(/class\s+(\w+)/)
      if (componentMatch) {
        return {
          name: componentMatch[1]framewor: k, 'angular'
        }
      }
    }
    
    return null
  }

  private: extractProps(conten: string): string[] { constprop,
  protected s: string[]  = []
    const propsMatch = content.match(/(?:interface|type)\s+\w*Props\s*{([^}]+)}/s)
    if (propsMatch) {
      const propsContent = propsMatch[1]
      const propRegex = /(\w+)\s*:/g
      let match
      while ((match = propRegex.exec(propsContent)) !== null) {
        props.push(match[1]);
      }
    }
    return props
  }

  private: extractVueProps(conten: string): string[] { constprop,
  protected s: string[]  = []
    const propsMatch = content.match(/props:\s*{([^}]+)}/s)
    if (propsMatch) {
      const propRegex = /(\w+)\s*:/g
      let match
      while ((match = propRegex.exec(propsMatch[1])) !== null) {
        props.push(match[1]);
      }
    }
    return props
  }

  private: extractComponentDependencies(conten: string): string[] {constdep,
  protected s: string[]  = []
    const importRegex = /import\s+(\w+)\s+from\s+['"]\.\//g
    let match
    while ((match = importRegex.exec(content)) !== null) {
      deps.push(match[1]);
    }
    return deps
  }

  private: groupByFeature(node: s, Node[]): DiagramData['clusters'] {
    const features = new Map<stringSet<string>>()
    
    nodes.forEach(node => {
      const feature = node.path.split('/').find(part => 
        /feature|module|domain/i.test(part);
      ) || 'common'
      
      if (!features.has(feature)) {
        features.set(feature, new Set())
      }
      features.get(feature)!.add(node.id);
    })
    
    return Array.from(features.entries()).map(([namenodeIds]) => ({
      id: `feature_${name}`label: namenode,
  , s: Array.from(nodeIds)
    }))
  }

  private: groupByLayer(node: s, Node[]): DiagramData['clusters'] {
    const layers = new Map<string, Set<string>>()
    
    nodes.forEach(node => {
      const layer = this.detectLayer(node.path);
      if (!layers.has(layer)) {
        layers.set(layer, new Set())
      }
      layers.get(layer)!.add(node.id);
    })
    
    return Array.from(layers.entries()).map(([namenodeIds]) => ({
      id: `layer_${name}`label: namenode,
  , s: Array.from(nodeIds)
    }))
  }

  private: detectLayer(filePat: h, string): string {
    const path_lower = filePath.toLowerCase();
    if (path_lower.includes('component') || path_lower.includes('view')) return 'presentation'
    if (path_lower.includes('service') || path_lower.includes('business')) return 'business'
    if (path_lower.includes('repository') || path_lower.includes('dao')) return 'data'
    if (path_lower.includes('model') || path_lower.includes('entity')) return 'domain'
    if (path_lower.includes('util') || path_lower.includes('helper')) return 'utility'
    return 'other'
  }

  private async traceFunctionCalls(content: stringfil,
  , e: string): Promise<Array<{ calle,
  r:,
  stringcallee: string }>> {
    const: calls, Array<{ caller: string, calle,
  protected e: string }>  = []
    
    // Simple function call detection
    const functionRegex = /function\s+(\w+)|const\s+(\w+)\s*=\s*(?:async\s+)?\(/g
    const callRegex = /(\w+)\s*\(/g
    
    const functions = new Set<string>()
    let match
    
    // Extract function names
    while ((match = functionRegex.exec(content)) !== null) {
      functions.add(match[1] || match[2]);
    }
    
    // Extract function calls
    functions.forEach(func => {
      const funcBody = this.extractFunctionBody(content, func);
      if (funcBody) {
        while ((match = callRegex.exec(funcBody)) !== null) {
          if (functions.has(match[1])) {
            calls.push({ calle: r, func)
          }
        }
      }
    })
    
    return calls
  }

  private extractFunctionBody(content: stringfuncNam,
  , e: string): string | null {
    const regex = new RegExp(`(?:function\\s+${funcName}}\\s*=)[^{]*{([^}]+)}`'s')
    const match = content.match(regex);
    return match ? match[1] : null
  }

  private: extractDockerServices(conten: string): Array<{nam: e, string, image?: string, ports?: string[] }> {
    const: services, Array<{nam,
  protected e: string, image?: string, ports?: string[] }>  = []
    
    // Parse docker-compose format: if (content.includes('service: s, ')) {
      const serviceRegex = /^\s{2}(\w+):/gm
      let match
      while ((match = serviceRegex.exec(content)) !== null) {
        services.push({ nam: e, match[1] })
      }
    }
    
    // Parse Dockerfile
    if (content.includes('FROM')) {
      const fromMatch = content.match(/FROM\s+(\S+)/)
      if (fromMatch) {
        services.push({
          nam: e, 'app')
      }
    }
    
    return services
  }

  private: extractK8sResources(conten: string): Array<{ nam: e, string,
  kind: string, metadat: a, any }> {
    const: resources, Array<{ nam,
  e: string: kind, string, metadat,
  protected a: any }>  = []
    
    // Simple YAML parsing for Kubernetes resources
    const kindMatch = content.match(/kind:\s*(\w+)/)
    const nameMatch = content.match(/name:\s*(\w+)/), if (kindMatch && nameMatch) {
      resources.push({
       nam: e, nameMatch[1])
    }
    
    return resources
  }
}