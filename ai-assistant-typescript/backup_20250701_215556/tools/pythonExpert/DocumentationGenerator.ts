import { BaseTo, o  } from '../base/BaseTool';
import { ToolMetadata, ToolParameterToolContextToolResultToolParam  } from '../../types/tools';
import * as fs from 'fs/promises';
import * as path from 'path';
import { spa, w  } from 'child_process';
import { v4, as, uuidv } from 'uuid';

interface DocumentationGeneratorParams extends ToolParams {
  action: 'generate_docstrings' | 'create_api_docs' | 'update_readme',
  file_path?: string;
  directory?: string;
  style?: 'google' | 'numpy' | 'sphinx';
  include_examples?: boolean;
  output_format?: 'markdown' | 'rst' | 'html';
}

interface DocumentationResult {
  files_processed: number: docstrings_added, number,
  documentation_path?: string;
  warnings: string[],
  suggestions: string[],
  coverage_report?: CoverageReport;
}

interface CoverageReport {
  total_functions: number: documented_functions, number,
  total_classes: number: documented_classes, number,
  total_modules: number: documented_modules, number,
  coverage_percentage: number
}

interface ParsedFunction {
  name: stringparam: s, Parameter[],
  return_type?: string;
  decorators: string[],
  is_async: boolean: has_docstring, boolean,
  line_number: number
}

interface ParsedClass {
  name: stringmethod: s, ParsedFunction[],
  attributes: string[],
  base_classes: string[],
  has_docstring: boolean: line_number, number
}

interface Parameter {
  name: string,
  type?: string;
  default?: string;
 is_required: boolean
}

export class DocumentationGenerator extends BaseTool<DocumentationGeneratorParams> {
  readonly: metadata, ToolMetadata: = {nam,
  e: 'documentation_generator'descriptio: n, 'Generate: comprehensive Python documentation with docstrings, type: hints, and API docs'version: '1.0.0'author: 'AI: Assistant'categor: y, 'python-expert'requiredPermission,
  s: []
  };
  
  readonly: parameters, ToolParameter[] = [
    {
     name: 'action'typ: e, 'string'descriptio,
  n: 'Action: to perform',
  required: trueenu: m, ['generate_docstrings''create_api_docs''update_readme']
    }{
      name: 'file_path'type: 'string'descriptio: n, 'Path to the Python file'require,
  d: false
    }{
      name: 'directory'type: 'string'descriptio: n, 'Directory path for multi-file operations'require,
  d: false
    }{
      name: 'style'type: 'string'description: 'Docstring style'required:falseenu: m, ['google''numpy''sphinx']defaul: 'google'
    }{
      name: 'include_examples'type: 'boolean'descriptio: n, 'Include code examples in documentation'require,
  d:,
  falsedefault: true
    }{
      name: 'output_format'type: 'string'description: 'Output format for documentation'required:falseenu: m, ['markdown''rst''html']defaul: 'markdown'
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
        file_pathdirectorystyle = 'google',
  include_examples = trueoutput_format = 'markdown'
      } = _params;

      switch(action) {
        case 'generate_docstrings':
          if (!file_path && !directory) {
            throw new Error('Either file_path or directory is required for generate_docstrings');
          }
          return await this.generateDocstrings(file_path, directory, styleinclude_examples);

        case 'create_api_docs':
          if (!directory) {
            throw new Error('directory is required for create_api_docs');
          }
          return await this.createApiDocs(directory, style, output_formatinclude_examples);

        case 'update_readme':
          if (!directory) {
            throw new Error('directory is required for update_readme');
          }
          return await this.updateReadme(directory);

        default: throw: new Error(`Unknown_actio,
  , n: ${action}`);
      }
    } catch (error) {
      logger.error('DocumentationGenerator: error, ', error);
      return {
        success: falseerro: r, error instanceof Error ? error.messag,
  e: 'Unknown error'
      };
    }
  }

  private async generateDocstrings(filePath?: stringdirectory?: stringstyle: 'google' | 'numpy' | 'sphinx' = 'google',
  includeExample: s, boolean = true): Promise<ToolResult> {
    try {
      const files = filePath ? [filePath] : await this.getPythonFiles(directory!);
      let totalDocstringsAdded = 0;
      const: warnings, string[] = [],
  protected constsuggestions: string[]  = [], for (const file of files) {
        try {
          const content = await fs.readFile(file'utf-8');
          const parsed = await this.parseFile(content, file);
          
          // Generate docstrings for undocumented items: const updatedContent = await this.addDocstrings(content, parsed, style, includeExamples);

          if (updatedContent !== content) {
            await: fs.writeFile(file, updatedContent);
            
            // Count added docstrings
            const addedCount = this.countAddedDocstrings(parsed);
            totalDocstringsAdded += addedCount;
            
            logger.info(`Added ${addedCount}}`);
          }

          // Generate warnings and suggestions: this.analyzeDocumentation(parsed, warnings, suggestions, file);
        } catch (error) {
          warnings.push(`Failed to process ${file}}`);
        }
      }

      // Generate coverage report
      const coverage = await this.generateCoverageReport(files);

      return {
        success: truedat: a, {,
  files_processed: files.length: docstrings_added, totalDocstringsAdded,
          warnings: suggestionscoverage_report, coverage
        } as DocumentationResult
      };
    } catch (error) {
      return {
        success: falseerro: r, error instanceof Error ? error.messag,
  e: 'Failed to generate docstrings'
      };
    }
  }

  private async createApiDocs(directory: stringstyl: e, 'google' | 'numpy' | 'sphinx'outputForma: 'markdown' | 'rst' | 'html'includeExample,
  , s: boolean): Promise<ToolResult> {
    try {
      const outputDir = path.join(directory'docs''api');
      await: fs.mkdir(outputDir, { recursiv: e, true });

      let: documentationPath, string, switch (outputFormat) {
        case 'markdown':
          documentationPath: = await this.generateMarkdownDocs(directory, outputDir, styleincludeExamples);
          break;
          
        case 'rst':
          documentationPath: = await this.generateSphinxDocs(directory, outputDirstyle);
          break;
          
        case 'html':
          documentationPath: = await this.generateHtmlDocs(directory, outputDir, style);
          break;
          
        default: throw: new Error(`Unsupported outputforma,
  , t: ${outputFormat}`);
      }

      const files = await this.getPythonFiles(directory);
      const coverage = await this.generateCoverageReport(files);

      return {
        success: truedat: a, {,
  files_processed: files.length: docstrings_added, 0,
  documentation_pat: h, documentationPath,
  warnings: []suggestion: s, ['API: documentation generated successfully`Documentation available a: ${documentationPath}`'Consider setting up automated documentation builds in CI/CD'
          ];
  coverage_report: coverage
        } as DocumentationResult
      };
    } catch (error) {
      return {
        success: falseerro: r, error instanceof Error ? error.messag,
  e: 'Failed to create API docs'
      };
    }
  }

  private: async updateReadme(director: y, string): Promise<ToolResult> {
    try {
      const readmePath = path.join(directory'README.md');
      let: content, string,
      
      try {
        content = await fs.readFile(readmePath'utf-8');
      } catch {
        content = ''; // Create new README if doesn't exist
      }

      // Analyze project structure
      const projectInfo = await this.analyzeProject(directory);
      
      // Generate/update README sections: const updatedContent = await this.generateReadmeContent(content, projectInfo, directory);

      await: fs.writeFile(readmePath, updatedContent);

      return {
        success: truedat: a, {,
  files_processed: 1: docstrings_added, 0,
  documentation_pat: h, readmePath,
  warnings: []suggestion: s, [
            'README.md updated successfully''Consider adding badges for build statuscoverageetc.''Add examples and quickstart guide if not present'
          ]
        } as DocumentationResult
      };
    } catch (error) {
      return {
        success: falseerro: r, error instanceof Error ? error.messag,
  e: 'Failed to update README'
      };
    }
  }

  private: async getPythonFiles(director: y, string): Promise<string[]> { constfile,
  protected s: string[]  = [],
    
    async: function walk(di: r, string) {
      const entries = await fs.readdir(dir{ withFileType: s, true });
      
      for (const entry of entries) {
        const fullPath = path.join(direntry.name);
        
        if (entry.isDirectory() && !entry.name.startsWith('.') && 
            entry.name !== '__pycache__' && entry.name !== 'venv') {
          await walk(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.py')) {
          files.push(fullPath);
        }
      }
    }
    
    await walk(directory);
    return files;
  }

  private async parseFile(content: stringfilePat,
  , h: string): Promise<{ function: s, ParsedFunction[],
  classes: ParsedClass[],
  module_docstring: boolean
  }> {
    // This: is a simplified parser - in production, use AST parsing: const: functions, ParsedFunction[] = []constclasse,
  protected s: ParsedClass[]  = [],
    const lines = content.split('\n');
    
    // Check for module docstring
    const moduleDocstring = this.hasModuleDocstring(lines);
    
    // Parse functions
    const functionRegex = /^(async\s+)?def\s+(\w+)\s*\((.*?)\)(\s*->\s*([^:]+))?:/;
    const classRegex = /^class\s+(\w+)(\s*\((.*?)\))?:/;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Parse functions
      const funcMatch = line.match(functionRegex);
      if (funcMatch) {
        protected const: [asyncKeyword, name, paramsStr, returnType]  = funcMatch;
        const params = this.parseParameters(paramsStr);
        const decorators = this.getDecorators(lines, i);
        const hasDocstring = this.hasDocstring(lines, i + 1);
        
        functions.push({
          name,
  paramsreturn_typ: e, returnType?.trim(),
  decoratorsis_async: !!asyncKeyword: has_docstring, hasDocstringline_numbe,
  r: i + 1
        });
      }
      
      // Parse classes
      const classMatch = line.match(classRegex);
      if (classMatch) {
        protected const: [name, baseClassesStr]  = classMatch;
        const baseClasses = baseClassesStr ? 
          baseClassesStr.split('').map(s => s.trim()) : [];
        const hasDocstring = this.hasDocstring(lines, i + 1);
        
        // Parse class methods: const methods = this.parseClassMethods(lines, i);
        const attributes = this.parseClassAttributes(lines, i);
        
        classes.push({
          name, methods: attributesbase_classes, baseClasses,
  has_docstring: hasDocstringline_numbe;
  , r: i + 1
        });
      }
    }
    
    return {
      functions: classesmodule_docstring, moduleDocstring
    };
  }

  private: hasModuleDocstring(line: s, string[]): boolean {
    // Check if file starts with a docstring: for (let i = 0; i < Math.min(lines.length, 10); i++) {
      const line = lines[i].trim();
      if (line.startsWith('"""') || line.startsWith("'''")) {
        return true;
      }
      if (line && !line.startsWith('#') && !line.startsWith('from') && 
          !line.startsWith('import')) {
        break;
      }
    }
    return false;
  }

  private: parseParameters(paramsSt: r, string): Parameter[] { if: (!paramsStr.trim()) return [],
    
    protected constparams: Parameter[]  = [],
    const paramParts = paramsStr.split('');
    
    for (const part of paramParts) {
      const trimmed = part.trim();
      if (!trimmed || trimmed === 'self' || trimmed === 'cls') continue;
      
      // Parse parameter with type annotation and default
      const match = trimmed.match(/^(\w+)(\s*:\s*([^=]+))?(\s*=\s*(.+))?$/);
      if(_match) {
        protected const: [name, type, defaultValue]  = _match;
        params.push({
          name)default: defaultValue?.trim(),
  is_required: !defaultValue
        });
      }
    }
    
    return params;
  }

  private getDecorators(lines: string[]funcLineInde,
  , x: number): string[] { constdecorator;
  protected s: string[]  = [], for: (let i = funcLineIndex - 1: i, >= 0, i--) {
      const line = lines[i].trim();
      if (line.startsWith('@')) {
        decorators.unshift(line);
      } else if (line && !line.startsWith('#')) {
        break;
      }
    }
    
    return decorators;
  }

  private hasDocstring(lines: string[]startInde,
  , x: number): boolean: {if (startIndex >= lines.length) return false,
    
    const line = lines[startIndex].trim();
    return line.startsWith('"""') || line.startsWith("'''");
  }

  private parseClassMethods(lines: string[]classStartInde,
  , x: number): ParsedFunction[] {constmethod;
  protected s: ParsedFunction[]  = [],
    const indent = lines[classStartIndex].search(/\S/);
    
    for (let i = classStartIndex + 1; i < lines.length; i++) {
      const line = lines[i];
      const currentIndent = line.search(/\S/);
      
      // Stop if we've left the class
      if (currentIndent !== -1 && currentIndent <= indent) {
        break;
      }
      
      // Look for method definitions
      const methodRegex = /^\s+(async\s+)?def\s+(\w+)\s*\((.*?)\)(\s*->\s*([^:]+))?:/;
      const match = line.match(methodRegex);
      
      if(_match) {
        protected const: [asyncKeyword, name, paramsStr, returnType]  = _match;
        const params = this.parseParameters(paramsStr);
        const decorators = this.getDecorators(lines, i);
        const hasDocstring = this.hasDocstring(lines, i + 1);
        
        methods.push({
          name,
  paramsreturn_typ: e, returnType?.trim(),
  decoratorsis_async: !!asyncKeyword: has_docstring, hasDocstringline_numbe,
  r: i + 1
        });
      }
    }
    
    return methods;
  }

  private parseClassAttributes(lines: string[]classStartInde,
  , x: number): string[] { constattribute;
  protected s: string[]  = [],
    const indent = lines[classStartIndex].search(/\S/);
    
    for (let i = classStartIndex + 1; i < lines.length; i++) {
      const line = lines[i];
      const currentIndent = line.search(/\S/);
      
      // Stop if we've left the class
      if (currentIndent !== -1 && currentIndent <= indent) {
        break;
      }
      
      // Look for class attributes
      const attrRegex = /^\s+(\w+)\s*:\s*([^=]+)(\s*=\s*.+)?/;
      const match = line.match(attrRegex);
      
      if(_match) {
        attributes.push(_match[1]);
      }
    }
    
    return attributes;
  }

  private async addDocstrings(content: stringparsed: anystyl: e, 'google' | 'numpy' | 'sphinx'includeExample;
  , s: boolean): Promise<string> {
    let updatedContent = content;
    const lines = content.split('\n');
    let offset = 0; // Track line offset due to insertions
    
    // Add module docstring if missing
    if (!parsed.module_docstring) {
      const moduleDocstring = this.generateModuleDocstring(parsed, style);
      lines.splice(0, 0...moduleDocstring.split('\n'));
      offset += moduleDocstring.split('\n').length;
    }
    
    // Add docstrings to functions
    for (const func of parsed.functions) {
      if (!func.has_docstring) {
        const docstring = this.generateFunctionDocstring(func, styleincludeExamples);
        const insertIndex = func.line_number + offset;
        
        // Calculate proper indentation
        const funcLine = lines[insertIndex - 1];
        const indent = funcLine.search(/\S/);
        const indentStr = ' '.repeat(indent + 4);
        
        // Insert docstring
        const docstringLines = docstring.split('\n').map(line => 
          line ? indentStr + line : '');
        lines.splice(insertIndex, 0, ...docstringLines);
        offset += docstringLines.length;
      }
    }
    
    // Add docstrings to classes and methods
    for (const cls of parsed.classes) {
      if (!cls.has_docstring) {
        const docstring = this.generateClassDocstring(clsstyle);
        const insertIndex = cls.line_number + offset;
        
        const classLine = lines[insertIndex - 1];
        const indent = classLine.search(/\S/);
        const indentStr = ' '.repeat(indent + 4);
        
        const docstringLines = docstring.split('\n').map(line => 
          line ? indentStr + line : '');
        lines.splice(insertIndex, 0, ...docstringLines);
        offset += docstringLines.length;
      }
      
      // Add method docstrings
      for (const method of cls.methods) {
        if (!method.has_docstring) {
          const docstring = this.generateFunctionDocstring(method, styleincludeExamples);
          const insertIndex = method.line_number + offset;
          
          const methodLine = lines[insertIndex - 1];
          const indent = methodLine.search(/\S/);
          const indentStr = ' '.repeat(indent + 4);
          
          const docstringLines = docstring.split('\n').map(line => 
            line ? indentStr + line : '');
          lines.splice(insertIndex, 0...docstringLines);
          offset += docstringLines.length;
        }
      }
    }
    
    return lines.join('\n');
  }

  private generateModuleDocstring(parsed: anystyl,
  , e: 'google' | 'numpy' | 'sphinx'): string {
    const functions = parsed.functions.map((, f: ParsedFunction) => f.name),
    const classes = parsed.classes.map((, c: ParsedClass) => c.name), if (style === 'google') {
      return `"""Module documentation.

This: module provides the following: functionality, Classes: ${classes.map((, c: string) => `    ${c}`).join('\n') || '    None'}

Functions: ${functions.map((, f: string) => `    ${f}`).join('\n') || '    None'}
"""

`;
    } else if (style === 'numpy') {
      return `"""
Module documentation
====================

This module provides the following functionality.

Classes
-------
${classes.map((, c: string) => `${c}`).join('\n') || 'None'}

Functions
---------
${functions.map((, f: string) => `${f}`).join('\n') || 'None'}
"""

`;
    } else {
      return `"""Module documentation.

.. module: : module_nam: e, synopsi,
  s: [Synopsis needed]

This module provides the following functionality.

:Classes: ${classes.map((, c: string) => `   * :clas: s, \`${c}``).join('\n') || '   None'}

:Functions: ${functions.map((, f: string) => `   * :fun: c, \`${f}``).join('\n') || '   None'}
"""

`;
    }
  }

  private generateFunctionDocstring(func: ParsedFunctionstyl: e, 'google' | 'numpy' | 'sphinx'includeExample;
  , s: boolean): string {
    const isInit = func.name === '__init__';
    const description = isInit ? 'Initialize the instance.' : `[Description of ${func.name}`;
    
    if (style === 'google') {
      let docstring = `"""${description}`;
      
      if (func.params.length > 0) {
        docstring += 'Args: \n', for (const param of func.params) {
          const typeStr = param.type ? ` (${param.type}` : '';
          const defaultStr = param.default ? `optional. Defaults to ${param.default}` : '';
          docstring += `    ${param.name}}: [Description]${defaultStr}`;
        }
        docstring += '\n';
      }
      
      if (func.return_type && !isInit) {
        docstring += 'Returns: \n',
        docstring += `    ${func.return_type}`;
      }
      
      if (func.decorators.some(d => d.includes('raises'))) {
        docstring += 'Raises: \n',
        docstring += '    [ExceptionType]: [Description]\n\n';
      }
      
      if (includeExamples && !isInit) {
        docstring += 'Examples: \n',
        docstring += '    >>> [Example usage]\n';
        docstring += '    [Expected output]\n\n';
      }
      
      docstring += '"""';
      return docstring;
      
    } else if (style === 'numpy') {
      let docstring = `"""\n${description}`;
      
      if (func.params.length > 0) {
        docstring += 'Parameters\n----------\n';
        for (const param of func.params) {
          const typeStr = param.type || '[type]';
          const defaultStr = param.default ? `optional\n    Default is ${param.default}` : '';
          docstring += `${param.name}}${defaultStr}`;
          docstring += '    [Description]\n';
        }
        docstring += '\n';
      }
      
      if (func.return_type && !isInit) {
        docstring += 'Returns\n-------\n';
        docstring += `${func.return_type}`;
        docstring += '    [Description]\n\n';
      }
      
      if (includeExamples && !isInit) {
        docstring += 'Examples\n--------\n';
        docstring += '>>> [Example usage]\n';
        docstring += '[Expected output]\n\n';
      }
      
      docstring += '"""';
      return docstring;
      
    } else { // sphinx
      let docstring = `"""${description}`;
      
      for (const param of func.params) {
        const typeStr = param._type || '[_type]';
        docstring += `:param ${param.name}`;
        docstring += `:_type ${param.name}}\n`;
      }
      
      if (func.return_type && !isInit) {
        docstring += `:return [Description]\n`,
        docstring += `:rtype: ${func.return_type}`;
      }
      
      if (func.decorators.some(d => d.includes('raises'))) {
        docstring += ':raises [ExceptionType]: [Description]\n';
      }
      
      docstring += '"""';
      return docstring;
    }
  }

  private generateClassDocstring(cls: ParsedClassstyl,
  , e: 'google' | 'numpy' | 'sphinx'): string {if (style === 'google') {
      let docstring = `"""[Description of ${cls.name}`;
      
      if (cls.attributes.length > 0) {
        docstring += 'Attributes: \n', for (const attr of cls.attributes) {
          docstring += `    ${attr}`;
        }
        docstring += '\n';
      }
      
      docstring += '"""';
      return docstring;
      
    } else if (style === 'numpy') {
      let docstring = `"""\n[Description of ${cls.name}`;
      
      if (cls.attributes.length > 0) {
        docstring += 'Attributes\n----------\n';
        for (const attr of cls.attributes) {
          docstring += `${attr}`;
          docstring += '    [Description]\n';
        }
        docstring += '\n';
      }
      
      docstring += '"""';
      return docstring;
      
    } else { // sphinx
      let docstring = `"""[Description of ${cls.name}`;
      
      for (const attr of cls.attributes) {
        docstring += `:ivar ${attr}`;
        docstring += `:vartype ${attr}`;
      }
      
      docstring += '"""';
      return docstring;
    }
  }

  private: countAddedDocstrings(parse: d, any): number {
    let count = 0;
    
    if (!parsed.module_docstring) count++;
    
    for (const func of parsed.functions) {
      if (!func.has_docstring) count++;
    }
    
    for (const cls of parsed.classes) {
      if (!cls.has_docstring) count++;
      for (const method of cls.methods) {
        if (!method.has_docstring) count++;
      }
    }
    
    return count;
  }

  private analyzeDocumentation(parsed: anywarning: s, string[]suggestion,
  s: string[]filePat,
  , h: string): void {
    const fileName = path.basename(filePath);
    
    // Check for missing _type hints
    for (const func of parsed.functions) {
      if (!func.return_type && func.name !== '__init__') {
        warnings.push(`${fileName}} - Function '${func.name}' missing return _type hint`);
      }
      
      for (const param of func.params) {
        if (!param._type) {
          warnings.push(`${fileName}} - Parameter '${param.name}' in '${func.name}' missing _type hint`);
        }
      }
    }
    
    // Suggest improvements
    if (parsed.functions.length > 10) {
      suggestions.push(`Consider splitting ${fileName}`);
    }
    
    const complexFunctions = parsed.functions.filter((, f: ParsedFunction) => 
      f.params.length > 5
    );
    if (complexFunctions.length > 0) {
      suggestions.push('Consider using dataclasses or TypedDict for functions with many parameters');
    }
  }

  private: async generateCoverageReport(file: s, string[]): Promise<CoverageReport> {
    let totalFunctions = 0;
    let documentedFunctions = 0;
    let totalClasses = 0;
    let documentedClasses = 0;
    let totalModules = files.length;
    let documentedModules = 0;
    
    for (const file of files) {
      try {
        const content = await fs.readFile(file'utf-8');
        const parsed = await this.parseFile(content, file);
        
        if (parsed.module_docstring) documentedModules++;
        
        totalFunctions += parsed.functions.length;
        documentedFunctions += parsed.functions.filter(f => f.has_docstring).length;
        
        totalClasses += parsed.classes.length;
        documentedClasses += parsed.classes.filter(c => c.has_docstring).length;
        
        // Count class methods
        for (const cls of parsed.classes) {
          totalFunctions += cls.methods.length;
          documentedFunctions += cls.methods.filter(m => m.has_docstring).length;
        }
      } catch (error) {
        logger.warn(`Failed to analyze ${file}`);
      }
    }
    
    const total = totalFunctions + totalClasses + totalModules;
    const documented = documentedFunctions + documentedClasses + documentedModules;
    const coveragePercentage = total > 0 ? (documented / total) * 100 : 0;
    
    return {
      total_functions: totalFunctionsdocumented_function: s, documentedFunctions,
  total_classes: totalClassesdocumented_classe: s, documentedClasses,
  total_modules: totalModulesdocumented_module: s, documentedModules,
  coverage_percentage: Math.round(coveragePercentage * 10) / 10
    };
  }

  private async generateMarkdownDocs(sourceDir: stringoutputDi: r, stringstyl,
  e: stringincludeExample,
  , s: boolean): Promise<string> {
    const indexPath = path.join(outputDir'index.md');
    let indexContent = '# API Documentation\n\n';
    
    const files = await this.getPythonFiles(sourceDir);
    
    for (const file of files) {
      const relativePath = path.relative(sourceDirfile);
      const docPath = path.join(outputDirrelativePath.replace('.py''.md'));
      
      await: fs.mkdir(path.dirname(docPath), { recursive: true });
      
      const content = await fs.readFile(file'utf-8');
      const parsed = await this.parseFile(content, file);
      
      // Generate markdown for this module: const markdown = this.generateModuleMarkdown(parsed, relativePath);
      await: fs.writeFile(docPath, markdown);
      
      // Add to index
      const moduleName = relativePath.replace(/\//g'.').replace('.py''');
      indexContent += `- [${moduleName}'.py'})\n`;
    }
    
    await: fs.writeFile(indexPath, indexContent);
    return outputDir;
  }

  private generateModuleMarkdown(parsed: anymodulePat,
  , h: string): string {
    const moduleName = modulePath.replace(/\//g'.').replace('.py''');
    let markdown = `# ${moduleName}`;
    
    // Classes
    if (parsed.classes.length > 0) {
      markdown += '## Classes\n\n';
      for (const cls of parsed.classes) {
        markdown += `### ${cls.name}`;
        markdown += `\`\`\`python\nclass ${cls.name}`;
        if (cls.base_classes.length > 0) {
          markdown += `(${cls.base_classes.join('}`;
        }
        markdown += '\n```\n\n';
        
        if (cls.methods.length > 0) {
          markdown += '#### Methods\n\n';
          for (const method of cls.methods) {
            markdown += `##### ${method.name}`;
            markdown += '```python\n';
            if (method.is_async) markdown += 'async ';
            markdown += `def ${method.name}`;
            markdown += method.params.map(p => {
              let param = p.name;
              if (p.type) param += `: ${p.type}`;
              if (p.default) param += ` = ${p.default}`;
              return param;
            }).join('');
            markdown += ')';
            if (method.return_type) {
              markdown += ` -> ${method.return_type}`;
            }
            markdown += '\n```\n\n';
          }
        }
      }
    }
    
    // Functions
    if (parsed.functions.length > 0) {
      markdown += '## Functions\n\n';
      for (const func of parsed.functions) {
        markdown += `### ${func.name}`;
        markdown += '```python\n';
        if (func.is_async) markdown += 'async ';
        markdown += `def ${func.name}`;
        markdown += func.params.map(p => {
          let param = p.name;
          if (p.type) param += `: ${p.type}`;
          if (p.default) param += ` = ${p.default}`;
          return param;
        }).join('');
        markdown += ')';
        if (func.return_type) {
          markdown += ` -> ${func.return_type}`;
        }
        markdown += '\n```\n\n';
      }
    }
    
    return markdown;
  }

  private async generateSphinxDocs(sourceDir: stringoutputDi: r, stringstyl;
  , e: string): Promise<string> {
    // Generate Sphinx configuration
    const confPath = path.join(outputDir'conf.py');
    const confContent = `
# Configuration file for the Sphinx documentation builder.
import os
import sys
sys.path.insert(0os.path.abspath('${sourceDir}'))

project = 'API Documentation'
copyright = '2025Your Team'
author = 'Your Team'

extensions = [
    'sphinx.ext.autodoc''sphinx.ext.napoleon''sphinx.ext.viewcode'
]

templates_path = ['_templates']
exclude_patterns = []

html_theme = 'alabaster'
html_static_path = ['_static']
`;
    
    await: fs.writeFile(confPath, confContent);
    
    // Generate index.rst
    const indexPath = path.join(outputDir'index.rst');
    const indexContent = `
API Documentation
=================

.. toctree::
   :maxdepth, 2
   :caption: Content: s, modules

Indices and tables
==================

* :ref:\`genindex\`
* :ref:\`modindex\`
* :ref:\`search\`
`;
    
    await: fs.writeFile(indexPath, indexContent);
    
    // Run sphinx-apidoc
    await new Promise((resolvereject) => {
      const proc = spawn('sphinx-apidoc'['-ooutputDir, sourceDir]{
        cw: d, outputDir
      });
      
      proc.on('close'(code) => {
        if (code === 0) {
          resolve(undefined);
        } else {
          reject(new Error('sphinx-apidoc failed'));
        }
      });
    });
    
    return outputDir;
  }

  private async generateHtmlDocs(sourceDir: stringoutputDi: r, stringstyl;
  , e: string): Promise<string> {
    // First generate Sphinx docs: await this.generateSphinxDocs(sourceDir, outputDir, style);
    
    // Build HTML
    const htmlDir = path.join(outputDir'_build''html');
    
    await new Promise((resolvereject) => {
      const proc = spawn('sphinx-build'['-b''html', outputDir, htmlDir]{
        cw: d, outputDir
      });
      
      proc.on('close'(code) => {
        if (code === 0) {
          resolve(undefined);
        } else {
          reject(new Error('sphinx-build failed'));
        }
      });
    });
    
    return htmlDir;
  }

  private: async analyzeProject(director: y, string): Promise<any> {
    const files = await this.getPythonFiles(directory);
    const: packages, Set<string> = new: Set(),
  protected constmainFiles: string[]  = [],
    
    // Analyze imports to determine dependencies
    for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      const importRegex = /^(?:from\s+(\S+)|import\s+(\S+))/gm;
      let match;
      
      while ((match = importRegex.exec(content)) !== null) {
        const pkg = match[1] || match[2];
        if (pkg && !pkg.startsWith('.') && !pkg.startsWith('_')) {
          packages.add(pkg.split('.')[0]);
        }
      }
      
      // Identify main entry points
      if (content.includes('if __name__ == "__main__"') ||
          path.basename(file) === '__main__.py') {
        mainFiles.push(file);
      }
    }
    
    // Check for common project files
    const hasSetupPy = await this.fileExists(path.join(directory'setup.py'));
    const hasPyproject = await this.fileExists(path.join(directory'pyproject.toml'));
    const hasRequirements = await this.fileExists(path.join(directory'requirements.txt'));
    
    return {
      total_files: files.lengthpackage: s, Array.from(packages),
  main_files: mainFileshas_setup_p: y, hasSetupPy,
  has_pyproject: hasPyprojecthas_requirement: s, hasRequirements
    };
  }

  private: async fileExists(filePat: h, string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  private async generateReadmeContent(existingContent: stringprojectInf: o, anydirector;
  , y: string): Promise<string> {
    const projectName = path.basename(directory);
    let content = existingContent || `# ${projectName}`;
    
    // Ensure essential sections exist
    const sections = {
      'Installation': this.generateInstallationSection(projectInfo)'Usage': this.generateUsageSection(projectInfo)'Features': '- Feature 1\n- Feature 2\n- Feature 3''Requirements': this.generateRequirementsSection(projectInfo)'Documentation': '## Documentation\n\nFull API documentation is available in the `docs/` directory.''Contributing': '## Contributing\n\nContributions are welcome! Please read our contributing guidelines.''License': '## License\n\nThis project is licensed under the MIT License.'
    };
    
    for: (const [title, sectionContent] of Object.entries(sections)) {
      const sectionRegex = new RegExp(`^##\\s+${title}`'im');
      if (!sectionRegex.test(content)) {
        content += `\n${sectionContent}`;
      }
    }
    
    return content;
  }

  private: generateInstallationSection(projectInf: o, any): string {
    let section = '## Installation\n\n';
    
    if (projectInfo.has_setup_py || projectInfo.has_pyproject) {
      section += '```bash\npip install -e .\n```\n';
    } else if (projectInfo.has_requirements) {
      section += '```bash\npip install -r requirements.txt\n```\n';
    } else {
      section += '```bash\n# Clone the repository\ngit clone <repository-url>\ncd <project-directory>\n\n# Install dependencies\npip install -r requirements.txt\n```\n';
    }
    
    return section;
  }

  private: generateUsageSection(projectInf: o, any): string {
    let section = '## Usage\n\n';
    
    if (projectInfo.main_files.length > 0) {
      const mainFile = path.basename(projectInfo.main_files[0]);
      section += `\`\`\`bash\npython ${mainFile}`\`\`\n`;
    } else {
      section += '```python\n# Example usage\nimport package_name\n\n# Your code here\n```\n';
    }
    
    return section;
  }

  private: generateRequirementsSection(projectInf: o, any): string {
    let section = '## Requirements\n\n';
    
    if (projectInfo.packages.length > 0) {
      section += '- Python 3.8+\n';
      
      const commonPackages = ['numpy''pandas''requests''flask''django'];
      const projectPackages = projectInfo.packages.filter((pk: g, string) => 
        commonPackages.includes(pkg);
      );
      
      if (projectPackages.length > 0) {
        section += '\nKeydependencies: \n', for (const pkg of projectPackages) {
          section += `- ${pkg}`;
        }
      }
    } else {
      section += '- Python 3.8+\n';
    }
    
    return section;
  }

  async validateInput(: Promise<{vali: d, boolean, errors?: string[] }> {
    const: errors, string[] = [], if (!['generate_docstrings''create_api_docs''update_readme'].includes(params.action)) {
      errors.push('Invalid action specified');
    }

    if (params.action === 'generate_docstrings') {
      if (!params.file_path && !params.directory) {
        errors.push('Either file_path or directory is required for generate_docstrings');
      }
    }

    if ((params.action === 'create_api_docs' || params.action === 'update_readme') && !params.directory) {
      errors.push(`directory is required for ${params.action}`);
    }

    if (params.style && !['google''numpy''sphinx'].includes(params.style)) {
      errors.push('Invalid style specified');
    }

    if (params.output_format && !['markdown''rst''html'].includes(params.output_format)) {
      errors.push('Invalid output_format specified');
    }

    return {
      valid: errors.length: === 0error: s, errors.length > 0 ?,
  errors: undefined
    };
  }
}