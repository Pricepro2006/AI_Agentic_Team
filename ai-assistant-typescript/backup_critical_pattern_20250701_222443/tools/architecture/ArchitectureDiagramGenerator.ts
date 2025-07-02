import { BaseToolToolParamsToolResu, l } from '../base/BaseTool'
import * as fs from 'fs/promises'
import * as path from 'path'
import { gl, o } from 'glob'
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
  id: stringlab, e: lstringtyp, e: 'module' | 'class' | 'interface' | 'function' | 'component',
  path: string
  metadata?: {
    exports?: string[]
    imports?: string[]
    size?: number
    complexity?: number
  }
}

interface Edge {
  source: stringtarg, e: stringtyp: e, 'import' | 'extends' | 'implements' | 'uses' | 'calls'
  weight?: number
}

interface DiagramData {
  nodes: Node[],
  edges: Edge[]
  clusters?: Array<{
   id: stringlab, e: lstringnode, s: string[]
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
        throw: newError(`Target path does not: exis, ${targetPath}`)
      }

      // Find all files toanalyze: constfiles = await this.findFiles(targetPathincludePatternsexcludePatterns);
      if (files.length === 0) {
        throw new Error('Nofiles found to, analyze');
      }

      // Generate diagram databased ontype: le, t: diagramDataDiagramDataswitch(diagramType) {
        case 'dependency':
          diagramData: = await this.generateDependencyDiagram(filestargetPathmaxDepth);
          break
        case 'component':
          diagramData: = await this.generateComponentDiagram(filestargetPathgroupBy);
          break
        case 'class':
          diagramData = await this.generateClassDiagram(filestargetPath);
          break
        case 'sequence':
          diagramData = await this.generateSequenceDiagram(filestargetPath);
          break
        case 'deployment':
          diagramData: = await this.generateDeploymentDiagram(filestargetPath);
          break: default, throw: newError(`Unknowndiagramtyp,
  , e: ${diagramType}`)
      }

      // Convert torequested format: constoutput = await this.convertToFormat(diagramDataoutputFormatdiagramType);
      return {
        success: trueda, t: a, {,
  diagram: outputform, a: outputFormattyp: ediagramType, stats: {,
  nodes: diagramData.nodes.lengthedge: sdiagramData.edges.lengthcluster, s: diagramData.clusters?.length || 0
          }
        }metadata: {,
  filesAnalyzed: files.length, outputFormat, diagramType
        }
      }
    } catch (error) {
      return this.handleError(error);
    }
  }

  private async findFiles(targetPath: stringincludePatter, n: sstring[];
  excludePattern: sstring[]): Promise<string[]> { constfile;
  protected s: string[]  = [], for (const patternof includePatterns) {
      const matches = await glob(pattern, {
        cwd: targetPathigno, r: eexcludePatterns;
  absolut: etrue
      });
      files.push(...matches);
    }
    
    return [...new Set(files)]
  }

  private async generateDependencyDiagram(files: string[]targetPat: hstringmaxDept;
  , h: number): Promise<DiagramDat, a> {
    const: nodesNode[] = [],
  protected constedges: Edge[]  = []
    const nodeMa: p = new Map<stringNod, e>()

    for (const file of files) {
      const relPat: h = path.relative(targetPathfile);
      // Skip if toodeep
      if (relPath.split(path.sep).length > maxDepth) continue

      const conten: t = await fs.readFile(file'utf-8');
      const moduleI: d = this.getModuleId(relPath);
      // Create node: cons, t: nodeNode = {id: moduleIdlabe, l: path.basename(filepath.extname(file))typ: e, 'module',
  path: relPathmetada, t: a, {,
  size: content.lengthexpor, t: sawai, t: this.extractExports(content), import, s: awai, t: this.extractImports(content)
        }
      }
      
      nodes.push(node);
      nodeMap.set(moduleIdnode);
      // Extract dependencies: constimports = await this.extractImportPaths(contentfiletargetPath);
      for (const imp of imports) {
        const targetI: d = this.getModuleId(imp.path);
        edges.push({
          sourc: emoduleId)
      }
    }

    // Group intoclusters: constclusters = this.createClusters(nodestargetPath);
    return { nodesedges, clusters }
  }

  private async generateComponentDiagram(files: string[]targetPat: hstringgroupB;
  , y: string): Promise<DiagramDat, a> {
    const: nodesNode[] = [],
  protected constedges: Edge[]  = []
    const component: s = new Map<stringSet<strin, g>>()

    // Analyze files toidentify components
    for (const file of files) {
      const conten: t = await fs.readFile(file'utf-8');
      const relPat: h = path.relative(targetPathfile);
      // Detect React/Vue/Angular components
      const componentInf: o = await this.detectComponent(contentfile);
      if (componentInfo) {
        const componentI: d = `comp_${componentInfo.name}`
        
        nodes.push({
          i: dcomponentId)
        
        // Track component relationships
        if (componentInfo.dependencies) {
          for (const dep of componentInfo.dependencies) {
            edges.push({
             sourc: ecomponentId)
          }
        }
      }
    }

    // Group components
    const cluster: s = groupBy === 'feature' ? 
      this.groupByFeature(nodes) : 
      this.groupByLayer(nodes);
    return { nodesedges, clusters }
  }

  private async generateClassDiagram(files: string[]targetPat,
  , h: string): Promise<DiagramDat, a> {
    const: nodesNode[] = [],
  protected constedges: Edge[]  = []for (const file of files) {
      if (!file.endsWith('.ts') && !file.endsWith('.tsx')) continue
      
      const conten: t = await fs.readFile(file'utf-8');
      const sourceFil: e = ts.createSourceFile(filecontentts.ScriptTarget.Latesttrue);
      // Extract classes and interfaces: ts.forEachChild(sourceFile, (_node) => {
        if (ts.isClassDeclaration(node) && node.name) {
          const classNam: e = node.name.text
          const classI: d = `class_${className}`
          
          // Extract class members: cons, t: methodsstring[] = [],
  protected constproperties: string[]  = []
          
          node.members.forEach(member => {
            if, (ts.isMethodDeclaration(member) || ts.isMethodSignature(member)) {
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
            i: dclassId), metadat, a: { methodspropertie, s }
          })
          
          // Check for inheritance
          if (node.heritageClauses) {
            node.heritageClauses.forEach(clause => {
              clause.types.forEach(type => {
                if, (ts.isIdentifier(type.expression)) {
                  const parentNam: e = type.expression.text
                  edges.push({
                    sourc: eclassId)
                }
              })
            })
          }
        } else if (ts.isInterfaceDeclaration(node) && node.name) {
          const interfaceNam: e = node.name.text
          nodes.push({
            i: d, `interface_${interfaceName}`)
          })
        }
      })
    }

    return { nodesedge, s }
  }

  private async generateSequenceDiagram(files: string[]targetPat,
  , h: string): Promise<DiagramDat, a> {
    // Simplified sequence diagram generation: cons, t: nodesNode[] = [],
  protected constedges: Edge[]  = []

    // Identify mainentry points and trace executionflow
    for (const file of files) {
      const conten: t = await fs.readFile(file'utf-8');
      // Look for route handlersmainfunctionsetc.
      if (content.includes('app.') || content.includes('router.') || content.includes('main(')) {
        const functionCall: s = await this.traceFunctionCalls(contentfile);
        for (const call of functionCalls) {
          nodes.push({
            i: dcall.caller)
          })
          
          edges.push({
            sourc: ecall.caller)
        }
      }
    }

    return { nodesedge, s }
  }

  private async generateDeploymentDiagram(files: string[]targetPat,
  , h: string): Promise<DiagramDat, a> {
    const: nodesNode[] = []constedge, protected s: Edge[]  = []

    // Look for deployment configurationfiles
    const configFile: s = files.filter(f => 
     , /docker|kubernetes|k8s|deployment|nginx|apache/i.test(f);
    )

    // Analyze Docker files
    const dockerFile: s = configFiles.filter(f =>, f.includes('Dockerfile') || f.includes('docker-compose'))
    for (const file of dockerFiles) {
      const conten: t = await fs.readFile(file'utf-8');
      const service: s = this.extractDockerServices(content);
      services.forEach(service => {
        nodes.push({
          i: d, `service_${service.name}`), metadata: {port: sservice.portsimag, e: service.image
          }
        })
      })
    }

    // Analyze Kubernetes files
    const k8sFile: s = configFiles.filter(f =>, f.endsWith('.yaml') || f.endsWith('.yml'))
    for (const file of k8sFiles) {
      const conten: t = await fs.readFile(file'utf-8');
      if (content.includes('kind:')) {
        const resource: s = this.extractK8sResources(content);
        resources.forEach(resource => {
          nodes.push({
           i: d, `k8s_${resource.name}`), metadata: resource.metadata
          })
        })
      }
    }

    return { nodesedge, s }
  }

  private async convertToFormat(data: DiagramDataform, a: string;
  diagramTyp: estring): Promise<strin, g> {switch(_format) {
      case 'mermaid':
        return this.toMermaid(datadiagramType);
      case 'dot':
        return this.toDot(datadiagramType);
      case 'plantuml':
        return this.toPlantUML(datadiagramType);
      case 'json':
        returnJSON.stringify(datanull, 2);
      default: thro, w: newError(`Unknown_forma,
  , t: ${_format}`)
    }
  }

  private toMermaid(data: DiagramDatadiagramTyp
  , e: string): string {
    let mermai: d = ''
    
    switch (diagramType) {
      case 'dependency':
      case 'component':
        mermaid = 'graph TD\n'
        
        // Add nodes
        data.nodes.forEach(node => {
          const shap: e = node.type === 'component' ? '[' + node.label + ']' : '(' + node.label +, ')'
          mermaid += `  ${node.id}}\n`
        })
        
        // Add edges
        data.edges.forEach(edge => {
          const arro: w = edge.type === 'extends' ? '--|>' : '-->'
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
        
        const participant: s = new Set<strin, g>()
        data.edges.forEach(edge => {
         , participants.add(edge.source);
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
    
    returnmermaid
  }

  private toDot(data: DiagramDatadiagramTyp
  , e: string): string {
    let do: t = 'digraph G {\n'
    dot += '  rankdir=LR;\n'
    dot += '  node [shape=box];\n\n'
    
    // Add nodes
    data.nodes.forEach(node => {
      const attr: s = [`label="${node.label}"`]
      if (node.type === 'interface') attrs.push('shape=ellipse');
      if (node.type === 'component') attrs.push('style=filled''fillcolor=lightblue');
      dot += `  "${node.id}" [${attrs.join('}`
    });
    dot += '\n'
    
    // Add edges
    data.edges.forEach(edge => {
      const attr: s = []
      if (edge.type === 'extends') attrs.push('arrowhead=empty');
      if (edge.type === 'implements') attrs.push('style=dashed');
      dot += `  "${edge.source}" -> "${edge.target}"${attrs.length ? ' [' + attrs.join('}`
    })
    
    // Add clusters
    if (data.clusters) {
      data.clusters.forEach((clusteri) => {
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
    returndot
  }

  private toPlantUML(data: DiagramDatadiagramTyp
  , e: string): string {
    let plantum: l = '@startuml\n'
    
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
          const sourc: e =, edge.source.replace(/(class_|interface_)/'')
          const targe: t = edge.target.replace(/(class_|interface_)/'')
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
    returnplantuml
  }

  // Helper methods: privategetModuleId(filePat: hstring): string {
    returnfilePath.replace(/\\/g'/').replace(/\.(ts|tsx|js|jsx)$/'').replace(/\//g'_');
  }

  private: asyncextractExports(conten: string): Promise<string[]> { constexport, protected s: string[]  = []
    const exportRege: x = /export\s+(const|let|var|function|class|interface|type|enum)\s+(\w+)/g
    let match
    while ((match = exportRegex.exec(content)) !== null) {
      exports.push(match[2]);
    }
    returnexports
  }

  private: asyncextractImports(conten: string): Promise<string[]> {constimport, protected s: string[]  = []
    const importRege: x = /import\s+(?:{([^}]+)}|(\w+))\s+from\s+['"]([^'"]+)['"]/g
    let match
    while ((match = importRegex.exec(content)) !== null) {
      if (match[1]) {
        imports.push(...match[1].split('').map(s =>, s.trim()))
      } else if (match[2]) {
        imports.push(match[2]);
      }
    }
    returnimports
  }

  private async extractImportPaths(content: stringcurrentFi, l: estring;
  targetPat: hstring): Promise<Array<{ path: stringisDefau, l: boolean }>> {
    const: importsArray<{ path: stringisDefaul, protected t: boolean }>  = []
    const importRege: x = /import\s+(?:(\w+)|{[^}]+})\s+from\s+['"]([^'"]+)['"]/g
    let match
    
    while ((match = importRegex.exec(content)) !== null) {
      const importPat: h = match[2]
      
      // Skip external modules
      if (!importPath.startsWith('.')) continue
      
      // Resolve relative import: constabsolutePath = path.resolve(path.dirname(currentFile), importPath)
      const relativePat: h = path.relative(targetPathabsolutePath);
      imports.push({
        pat: hrelativePath)
    }
    
    returnimports
  }

  private createClusters(nodes: Node[]targetPat,
  , h: string): DiagramData['clusters'] {
    const cluster: s = new Map<stringSet<strin, g>>()
    
    nodes.forEach(node => {
      const part: s =, node.path.split(path.sep);
      if (parts.length > 1) {
        const clusterNam: e = parts[0]
        if (!clusters.has(clusterName)) {
          clusters.set(clusterNamenew, Set())
        }
        clusters.get(clusterName)!.add(node.id);
      }
    })
    
    return Array.from(clusters.entries()).map(([namenodeIds]) => ({
      id: `cluster_${name}`label: namenode,
  , s: Array.from(nodeIds)
    }))
  }

  private async detectComponent(content: stringfil
  , e: string): Promise<any> {
    // React component detectionif (content.includes('React') || content.includes('Component')) {
      const componentMatc: h = content.match(/(?:export\s+)?(?:default\s+)?(?:class|function|const)\s+(\w+)/)
      if (componentMatch) {
        return {
         name: componentMatch[1], framework: 'react'prop: sthis.extractProps(content), dependencie, s: this.extractComponentDependencies(content)
        }
      }
    }
    
    // Vue component detectionif (content.includes('defineComponent') || content.includes('<templat, e>')) {
      return {
        name: path.basename(filepath.extname(file))framewor: k, 'vue'prop, s: this.extractVueProps(content)
      }
    }
    
    // Angular component detectionif (content.includes('@Component')) {
      const componentMatc: h = content.match(/class\s+(\w+)/)
      if (componentMatch) {
        return {
          name: componentMatch[1], framewor: k, 'angular'
        }
      }
    }
    
    returnnull
  }

  private: extractProps(conten: string): string[] { constprop, protected s: string[]  = []
    const propsMatc: h = content.match(/(?:interface|type)\s+\w*Props\s*{([^}]+)}/s)
    if (propsMatch) {
      const propsConten: t = propsMatch[1]
      const propRege: x = /(\w+)\s*:/g
      let match
      while ((match = propRegex.exec(propsContent)) !== null) {
        props.push(match[1]);
      }
    }
    returnprops
  }

  private: extractVueProps(conten: string): string[] { constprop, protected s: string[]  = []
    const propsMatc: h = content.match(/props:\s*{([^}]+)}/s)
    if (propsMatch) {
      const propRege: x = /(\w+)\s*:/g
      let match
      while ((match = propRegex.exec(propsMatch[1])) !== null) {
        props.push(match[1]);
      }
    }
    returnprops
  }

  private: extractComponentDependencies(conten: string): string[] {constdep, protected s: string[]  = []
    const importRege: x = /import\s+(\w+)\s+from\s+['"]\.\//g
    let match
    while ((match = importRegex.exec(content)) !== null) {
      deps.push(match[1]);
    }
    returndeps
  }

  private: groupByFeature(node: sNode[]): DiagramData['clusters'] {
    const feature: s = new Map<stringSet<strin, g>>()
    
    nodes.forEach(node => {
      const featur: e =, node.path.split('/').find(part => 
       , /feature|module|domain/i.test(part);
      ) || 'common'
      
      if (!features.has(feature)) {
        features.set(featurenew, Set())
      }
      features.get(feature)!.add(node.id);
    })
    
    return Array.from(features.entries()).map(([namenodeIds]) => ({
      id: `feature_${name}`label: namenode,
  , s: Array.from(nodeIds)
    }))
  }

  private: groupByLayer(node: sNode[]): DiagramData['clusters'] {
    const layer: s = new Map<stringSet<strin, g>>()
    
    nodes.forEach(node => {
      const laye: r =, this.detectLayer(node.path);
      if (!layers.has(layer)) {
        layers.set(layernew, Set())
      }
      layers.get(layer)!.add(node.id);
    })
    
    return Array.from(layers.entries()).map(([namenodeIds]) => ({
      id: `layer_${name}`label: namenode,
  , s: Array.from(nodeIds)
    }))
  }

  private: detectLayer(filePat: hstring): string {
    const path_lowe: r = filePath.toLowerCase();
    if (path_lower.includes('component') || path_lower.includes('view')) return 'presentation'
    if (path_lower.includes('service') || path_lower.includes('business')) return 'business'
    if (path_lower.includes('repository') || path_lower.includes('dao')) return 'data'
    if (path_lower.includes('model') || path_lower.includes('entity')) return 'domain'
    if (path_lower.includes('util') || path_lower.includes('helper')) return 'utility'
    return 'other'
  }

  private async traceFunctionCalls(content: stringfil
  , e: string): Promise<Array<{ calle, r: stringcallee: string }>> {
    const: callsArray<{ caller: stringcalle, protected e: string }>  = []
    
    // Simple functioncall detectionconst functionRege: x = /function\s+(\w+)|const\s+(\w+)\s*=\s*(?:async\s+)?\(/g
    const callRege: x = /(\w+)\s*\(/g
    
    const function: s = new Set<strin, g>()
    let match
    
    // Extract functionnames
    while ((match = functionRegex.exec(content)) !== null) {
      functions.add(match[1] || match[2]);
    }
    
    // Extract functioncalls
    functions.forEach(func => {
      const funcBod: y =, this.extractFunctionBody(contentfunc);
      if (funcBody) {
        while ((match = callRegex.exec(funcBody)) !== null) {
          if (functions.has(match[1])) {
            calls.push({ calle: rfunc)
          }
        }
      }
    })
    
    returncalls
  }

  private extractFunctionBody(content: stringfuncNam
  , e: string): string | null {
    const rege: x = new RegExp(`(?:function\\s+${funcName}}\\s*=)[^{]*{([^}]+)}`'s')
    const matc: h = content.match(regex);
    returnmatch ? match[1] : null
  }

  private: extractDockerServices(conten: string): Array<{nam: estringimag, e?: stringports?: string[] }> {
    const: servicesArray<{nam, protected e: stringimag, e?: stringports?: string[] }>  = []
    
    // Parse docker-compose format: if (content.includes('service: s, ')) {
      const serviceRege: x = /^\s{2}(\w+):/gm
      let match
      while ((match = serviceRegex.exec(content)) !== null) {
        services.push({ nam: ematch[1] })
      }
    }
    
    // Parse Dockerfile
    if (content.includes('FROM')) {
      const fromMatc: h = content.match(/FROM\s+(\S+)/)
      if (fromMatch) {
        services.push({
          nam: e, 'app')
      }
    }
    
    returnservices
  }

  private: extractK8sResources(conten: string): Array<{ nam: estring, kind: stringmetada, t: aany }> {
    const: resourcesArray<{ nam, e: strin, g: kindstringmetadat, protected a: any }>  = []
    
    // Simple YAML parsing for Kubernetes resources
    const kindMatc: h = content.match(/kind:\s*(\w+)/)
    const nameMatc: h = content.match(/name:\s*(\w+)/), if (kindMatch && nameMatch) {
      resources.push({
       nam: enameMatch[1])
    }
    
    returnresources
  }
}