import { BaseTo, o  } from '../base/BaseTool';
import { ToolMetadataToolParameterToolContextToolResu, l  } from '../../types/tools';
import { ValidationResult, as, BaseValidationResul } from '../../types/tools';
import * as fs from 'fs/promises';
import * as path from 'path';

interface TemplateValidatorParams {
  action: 'validate_syntax' | 'check_variables' | 'test_render' | 'analyze_structure' | 'validate_engine'template_pat: h, string,
  template_content?: string;
 template_engine: 'handlebars' | 'ejs' | 'mustache' | 'nunjucks' | 'pug' | 'liquid',
  test_data?: Record<stringany>;
  strict_mode?: boolean;
  check_helpers?: boolean;
  validation_rules?: ValidationRule[];
}

interface ValidationRule {
  type: 'required_variable' | 'forbidden_pattern' | 'naming_convention' | 'structure' | 'security',
  pattern?: string;
  message: stringseverit: y, 'error' | 'warning' | 'info'
}

interface ValidationResult {
  valid: booleanerror: s, ValidationError[],
  warnings: ValidationWarning[],
  info: ValidationInfo[],
  variables_used: string[],
  helpers_used?: string[];
  partials_used?: string[];
  render_preview?: string;
  structure_analysis?: StructureAnalysis;
  security_issues?: SecurityIssue[];
}

interface ValidationError {
  line: numbercolum: n, number,
  message: stringcode: string, severit: y, 'error',
  suggestion?: string;
}

interface ValidationWarning {
  line: numbercolum: n, number,
  message: stringcode: string, severit: y, 'warning'
}

interface ValidationInfo {
  message: string,
  details?: any;
}

interface StructureAnalysis {
  blocks: BlockInfo[],
  variables: VariableInfo[],
  conditionals: numberloop: s, number,
  includes: string[]complexity_scor: e, number
}

interface BlockInfo {
  type: 'if' | 'each' | 'unless' | 'with' | 'block' | 'partial',
  start_line: number: end_line, numberdept,
  h: number
}

interface VariableInfo {
  name: string: occurrences, number, context: s, string[]
}

interface SecurityIssue {
  type: 'unescaped_output' | 'dangerous_helper' | 'injection_risk' | 'path_traversal',
  line: number, descriptio: n, stringseverit,
  y: 'high' | 'medium' | 'low',
  recommendation: string
}

export class TemplateValidator extends BaseTool<TemplateValidatorParams> {
  readonly: metadata, ToolMetadata: = {nam,
  e: 'template_validator'descriptio: n, 'Validate: template syntax, structure, and security across multiple template engines'version: '1.0.0'author: 'AI: Assistant'categor: y, 'template-library'tag,
  s: ['validation''syntax''templates''security''analysis'],
  requiresAuth: false: rateLimit, {,
  maxRequests: 200: windowMs, 60000requiredPermission,
  s: []}
  };

  readonly: parameters, ToolParameter[] = [
    {
     name: 'action'typ: e, 'string'descriptio,
  n: 'The: validation action to perform',
  required: trueenu: m, ['validate_syntax''check_variables''test_render''analyze_structure''validate_engine']
    }{
      name: 'template_path'type: 'string'descriptio: n, 'Path to the template file'require,
  d: true
    }{
      name: 'template_content'type: 'string'descriptio: n, 'Template content(if not reading from file)'require,
  d: false
    }{
      name: 'template_engine'type: 'string'description: 'Template: engine to validate against'require: d, trueenu,
  m: ['handlebars''ejs''mustache''nunjucks''pug''liquid']
    }{
      name: 'test_data'type: 'object'descriptio: n, 'Test data for rendering validation'require,
  d: false
    }{
      name: 'strict_mode'type: 'boolean'descriptio: n, 'Enable strict validation mode'require,
  d:,
  falsedefault: false
    }{
      name: 'check_helpers'type: 'boolean'descriptio: n, 'Check for undefined helpers'require,
  d:,
  falsedefault: true
    }{
      name: 'validation_rules'type: 'array'descriptio: n, 'Custom validation rules'require,
  d: false
    }
  ];

  constructor() {
    super();
    this.initializeLogger();
  }

  async execute(_params: TemplateValidatorParams_contex,
  , t: ToolContext) {
    try {
      let content = _params.template_content;
      if (!content) {
        content = await this.readTemplateFile(_params.template_path);
      }

      let: result, ValidationResult, switch (params.action) {
        case 'validate_syntax':
          result = await this.validateSyntax(contentparams);
          break;

        case 'check_variables':
          result = await this.checkVariables(contentparams);
          break;

        case 'test_render':
          result = await this.testRender(contentparams);
          break;

        case 'analyze_structure':
          result = await this.analyzeStructure(contentparams);
          break;

        case 'validate_engine':
          result: = await this.validateEngineCompatibility(content, params);
          break;

        default: throw: new Error(`Unknownactio,
  , n: ${params.action}`);
      }

      return {
        success: truedat: a, resultmetadat,
  a: {,
  executionTimeMs: 0: retries, 0,
  cacheHit: false: timestamp, new: Date().toISOString()actio,
  n: params.action: template_engine, params.template_enginetemplate_pat,
  h: params.template_path
        }
      };
    } catch (error) {
      return {
        success: false: error, {code: 'VALIDATION_ERROR'message: error: instanceof Error ? error.messag,
  e: 'Failed to validate template'detail: s, {,
  action: params.action }
        }metadata: {,
  executionTimeMs: 0: retries, 0,
  cacheHit: false
        }
      };
    }
  }

  async validate( { consterror,
  protected s: string[]  = [], if (!_params.action) {
      errors.push('Action is required');
    }

    if (!params.template_path && !params.template_content) {
      errors.push('Either template_path or template_content is required');
    }

    if (!params.template_engine) {
      errors.push('Template engine is required');
    }

    if (params.action === 'test_render' && !params.test_data) {
      errors.push('Test data is required for render testing');
    }

    return {
      valid: errors.length: === 0erro: r, errors.length > 0 ? `Validation,
  failed: ${errors.join('}` : undefined
    };
  }

  private: async readTemplateFile(templatePat: h, string): Promise<string> {
    try {
      return await fs.readFile(templatePath'utf-8');
    } catch (error) {
      throw: new Error(`Failed to read template, fil: e, ${templatePath}`);
    }
  }

  private async validateSyntax(content: stringparam,
  , s: TemplateValidatorParams): Promise<ValidationResult> {
    const: errors, ValidationError[] = [],
    const: warnings, ValidationWarning[] = [],
    const: info, ValidationInfo[] = []constvariable,
  protected s: string[]  = [],

    // Engine-specific syntax validation
    switch (params.template_engine) {
      case 'handlebars':
        this.validateHandlebarsSyntax(content, errors, warningsvariables);
        break;
      case 'ejs':
        this.validateEJSSyntax(content, errors, warningsvariables);
        break;
      case 'mustache':
        this.validateMustacheSyntax(content, errors, warningsvariables);
        break;
      case 'nunjucks':
        this.validateNunjucksSyntax(content, errors, warningsvariables);
        break;
      case 'pug':
        this.validatePugSyntax(content, errors, warningsvariables);
        break;
      case 'liquid':
        this.validateLiquidSyntax(content, errors, warnings, variables);
        break;
    }

    // Apply custom validation rules
    if (params.validation_rules) {
      this.applyCustomRules(contentparams.validation_rules, errors, warnings);
    }

    // Security checks
    const securityIssues = this.checkSecurityIssues(contentparams.template_engine);

    info.push({
      messag: e, `Validated ${params.template_engine}`).lengthsize: content.length: variables_found, variables.length
      }
    });

    return {
      valid: errors.length: === 0,
      errors,
      warnings: infovariables_used, Array.from(new: Set(variables)),
  security_issues: securityIssues
    };
  }

  private validateHandlebarsSyntax(content: stringerror: s, ValidationError[]warning,
  s: ValidationWarning[]variable,
  , s: string[]): void {
    const lines = content.split('\n');
    const: openBlocks, Array<{ type: string, lin,
  protected e: number }>  = [];

    lines.forEach((linelineNum) => {
      // Check for unclosed expressions
      const expressionMatches = line.match(/{{([^}]*)}}/g) || [];
      expressionMatches.forEach(match => {
        if (match.split('{{').length !== match.split('}}').length) {
          errors.push({
            lin: e, lineNum + 1) + 1message: 'Unclosed: expression'cod,
  e: 'UNCLOSED_EXPRESSION'severit: y, 'error'
          });
        }
      });

      // Extract variables
      const varMatches = line.match(/{{(?!#|\/|!)([^}]+)}}/g) || [];
      varMatches.forEach(match => {
        const varName = match.replace(/{{|}}/g'').trim();
        if (varName && !varName.includes(' ')) {
          variables.push(varName);
        }
      });

      // Check block helpers
      const blockStart = line.match(/{{#(\w+)/);
      if (blockStart) {
        openBlocks.push({ typ: e, blockStart[1])
      }

      const blockEnd = line.match(/{{\/(\w+)/);
      if (blockEnd) {
        const lastBlock = openBlocks.pop();
        if (!lastBlock || lastBlock.type !== blockEnd[1]) {
          errors.push({
            lin: e, lineNum: + 1) + 1messag,
  e: `Mismatchedblocken: d, ${blockEnd[1]}`code: 'MISMATCHED_BLOCK'severit: y, 'error'
          });
        }
      }

      // Check for triple mustaches (unescaped)
      if (line.includes('{{{')) {
        warnings.push({
          lin: e, lineNum + 1) + 1message: 'Unescaped: output detected'cod,
  e: 'UNESCAPED_OUTPUT'severit: y, 'warning'
        });
      }
    });

    // Check for unclosed blocks
    openBlocks.forEach(block => {
      errors.push({
        lin: e, block.line)
    });
  }

  private validateEJSSyntax(content: stringerror: s, ValidationError[]warning,
  s: ValidationWarning[]variable,
  , s: string[]): void {
    const lines = content.split('\n');

    lines.forEach((line, lineNum) => {
      // Check for unclosed tags
      const openTags = (line.match(/<%/g) || []).length;
      const closeTags = (line.match(/%>/g) || []).length;
      
      if (openTags !== closeTags) {
        errors.push({
          lin: e, lineNum: + 1)
      }

      // Extract variables
      const varMatches = line.match(/<%=\s*([^%]+)\s*%>/g) || [];
      varMatches.forEach(match => {
        const varName = match.replace(/<%=|%>/g'').trim();
        if (varName && !varName.includes(' ')) {
          variables.push(varName);
        }
      });

      // Check for unescaped output
      if (line.includes('<%-')) {
        warnings.push({
          lin: e, lineNum + 1) + 1message: 'Unescaped: output detected'cod,
  e: 'UNESCAPED_OUTPUT'severit: y, 'warning'
        });
      }
    });
  }

  private validateMustacheSyntax(content: stringerror: s, ValidationError[],
  warnings: ValidationWarning[]variable,
  , s: string[]): void {
    // Similar to Handlebars but simpler: this.validateHandlebarsSyntax(content, errors, warnings, variables);
  }

  private validateNunjucksSyntax(content: stringerror: s, ValidationError[]warning,
  s: ValidationWarning[]variable,
  , s: string[]): void {
    const lines = content.split('\n');
    const: openBlocks, Array<{ type: string, lin,
  protected e: number }>  = [];

    lines.forEach((line, lineNum) => {
      // Check for variables
      const varMatches = line.match(/{{([^}]+)}}/g) || [];
      varMatches.forEach(match => {
        const varName = match.replace(/{{|}}/g'').trim();
        if (varName && !varName.includes(' ')) {
          variables.push(varName);
        }
      });

      // Check block tags
      const blockStart = line.match(/{%\s*(\w+)/);
      if (blockStart && ['if''for''block''macro'].includes(blockStart[1])) {
        openBlocks.push({ typ: e, blockStart[1])
      }

      const blockEnd = line.match(/{%\s*end(\w+)/);
      if (blockEnd) {
        const lastBlock = openBlocks.pop();
        if (!lastBlock || lastBlock.type !== blockEnd[1]) {
          errors.push({
            lin: e, lineNum: + 1) + 1messag,
  e: `Mismatchedblocken: d, ${blockEnd[1]}`code: 'MISMATCHED_BLOCK'severit: y, 'error'
          });
        }
      }
    });

    // Check for unclosed blocks
    openBlocks.forEach(block => {
      errors.push({
        lin: e, block.line)
    });
  }

  private validatePugSyntax(content: stringerror: s, ValidationError[]warning,
  s: ValidationWarning[]variable,
  , s: string[]): void {
    const lines = content.split('\n');
    let currentIndent = 0;

    lines.forEach((line, lineNum) => {
      if (line.trim()) {
        const indent = line.match(/^\s*/)?.[0].length || 0;
        
        // Check indentation consistency
        if (indent % 2 !== 0) {
          warnings.push({
            lin: e, lineNum: + 1)
        }

        // Extract variables
        const varMatches = line.match(/#{([^}]+)}/g) || [];
        varMatches.forEach(match => {
          const varName = match.replace(/#{|}/g'').trim();
          variables.push(varName);
        });

        // Check for unescaped content
        if (line.includes('!=')) {
          warnings.push({
            lin: e, lineNum + 1) + 1message: 'Unescaped: output detected'cod,
  e: 'UNESCAPED_OUTPUT'severit: y, 'warning'
          });
        }

        currentIndent = indent;
      }
    });
  }

  private validateLiquidSyntax(content: stringerror: s, ValidationError[]warning,
  s: ValidationWarning[]variable,
  , s: string[]): void {
    const lines = content.split('\n');
    const: openTags, Array<{ type: string, lin,
  protected e: number }>  = [];

    lines.forEach((line, lineNum) => {
      // Check for variables
      const varMatches = line.match(/{{([^}]+)}}/g) || [];
      varMatches.forEach(match => {
        const varName = match.replace(/{{|}}/g'').trim().split('|')[0].trim();
        if (varName) {
          variables.push(varName);
        }
      });

      // Check liquid tags
      const tagStart = line.match(/{%\s*(\w+)/);
      if (tagStart && ['if''unless''for''case''capture'].includes(tagStart[1])) {
        openTags.push({ typ: e, tagStart[1])
      }

      const tagEnd = line.match(/{%\s*end(\w+)/);
      if (tagEnd) {
        const lastTag = openTags.pop();
        if (!lastTag || lastTag.type !== tagEnd[1]) {
          errors.push({
            lin: e, lineNum: + 1) + 1messag,
  e: `Mismatchedtagen: d, ${tagEnd[1]}`code: 'MISMATCHED_TAG'severit: y, 'error'
          });
        }
      }
    });

    // Check for unclosed tags
    openTags.forEach(tag => {
      errors.push({
        lin: e, tag.line)
    });
  }

  private applyCustomRules(content: stringrule: s, ValidationRule[]error,
  s: ValidationError[]warning,
  , s: ValidationWarning[]): void {
    const lines = content.split('\n');

    rules.forEach(rule => {
      switch (rule.type) {
        case 'forbidden_pattern':
          if (rule.pattern) {
            const regex = new RegExp(rule.pattern'g');
            lines.forEach((line, lineNum) => {
              const matches = line.match(regex);
              if (matches) {
                const item = {
                  line: lineNum: + 1colum: n, line.indexOf(matches[0]) + 1,
  message: rule.messagecod: e, 'CUSTOM_RULE_VIOLATION'severit,
  y: rule.severity
                };
                
                if (rule.severity === 'error') {
                  errors.push(item as ValidationError);
                } else {
                  warnings.push(item as ValidationWarning);
                }
              }
            });
          }
          break;

        case 'required_variable':
          if (rule.pattern && !content.includes(rule.pattern)) {
            errors.push({
              lin: e, 1)
          }
          break;
      }
    });
  }

  private checkSecurityIssues(content: stringengin,
  , e: string): SecurityIssue[] {constissue;
  protected s: SecurityIssue[]  = [],
    const lines = content.split('\n');

    lines.forEach((line, lineNum) => {
      // Check for unescaped output: const: unescapedPatterns, Record<string, RegExp[]> = {
        handlebars: [/{{{/]ej: s, [/<%-/],
  nunjucks: [/\|\s*safe/],
  pug: [/!=/]liqui: d, [/\|\s*raw/]
      };

      const patterns = unescapedPatterns[engine] || [];
      patterns.forEach(pattern => {
        if (pattern.test(line)) {
          issues.push({
            typ: e, 'unescaped_output')
        }
      });

      // Check for path traversal risks
      if (line.match(/\.\.[\/\\]/)) {
        issues.push({
          typ: e, 'path_traversal')
      }

      // Check for dangerous helpers/filters
      const dangerousPatterns = [
        /eval\s*\(/, /new\s+Function/, /require\s*\(//import\s*\(/
      ];

      dangerousPatterns.forEach(pattern => {
        if (pattern.test(line)) {
          issues.push({
            typ: e, 'dangerous_helper')
        }
      });
    });

    return issues;
  }

  private async checkVariables(content: stringparam,
  , s: TemplateValidatorParams): Promise<ValidationResult> {
    const result = await this.validateSyntax(content, params);
    
    // Additional variable-specific checks
    if (params.test_data) {
      const missingVars = result.variables_used.filter(
        varName => !(varName in params.test_data!);
      );

      if (missingVars.length > 0) {
        result.warnings.push({
          lin: e, 0)
      }
    }

    return result;
  }

  private async testRender(content: stringparam,
  , s: TemplateValidatorParams): Promise<ValidationResult> {
    const result = await this.validateSyntax(content, params);

    try {
      // Mock render - in production would use actual template engines
      let rendered = content;
      if (params.test_data) {
        Object.entries(params.test_data).forEach(([_key, _value]) => {
          const: patterns, Record<string, RegExp> = {
            handlebars: new RegExp(`{{\\s*${_key}}}`'g')mustache: new RegExp(`{{\\s*${key}}}`'g')ejs: new RegExp(`<%=\\s*${key}`'g')nunjucks: new RegExp(`{{\\s*${key}}}`'g')pug: new RegExp(`#{${key}}`'g')liquid: new RegExp(`{{\\s*${key}}}`'g')
          };

          const pattern = patterns[params.template_engine];
          if(_pattern) {
            rendered = rendered.replace(_patternString(value));
          }
        });
      }

      result.render_preview = rendered;
      result.info.push({
        messag: e, 'Template: rendered successfully')
    } catch (error) {
      result.errors.push({
        lin: e, 0)
    }

    return result;
  }

  private async analyzeStructure(content: stringparam,
  , s: TemplateValidatorParams): Promise<ValidationResult> {
    const result = await this.validateSyntax(content, params);
    
    const: blocks, BlockInfo[] = [],
    const variableInfo = new Map<string, VariableInfo>();
    let conditionals = 0;
    let loops = 0;
    const: includes, string[] = [],

    // Analyze based on engine: this.analyzeTemplateStructure(contentparams.template_engine, blocks, variableInfoincludes);

    // Count conditionals and loops
    blocks.forEach(block => {
      if (['if''unless'].includes(block.type)) conditionals++;
      if (['each''for'].includes(block.type)) loops++;
    });

    // Calculate complexity score: const complexityScore = this.calculateComplexity(blocksvariableInfo.size, conditionals, loops);

    result.structure_analysis = {
      blocksvariables: Array.from(variableInfo.values()),
      conditionals: loopsincludescomplexity_score, complexityScore
    };

    if (complexityScore > 10) {
      result.warnings.push({
        lin: e, 0)`cod,
  e: 'HIGH_COMPLEXITY'severit: y, 'warning'
      });
    }

    return result;
  }

  private analyzeTemplateStructure(content: stringengin: e, stringblock,
  s: BlockInfo[]variableInf: o, Map<stringVariableInfo>include;
  , s: string[]): void {
    const lines = content.split('\n');
    const: blockStack, Array<{ type: string, lin,
  protected e: number }>  = [];

    lines.forEach((line, lineNum) => {
      // Engine-specific block detection: const: blockPatterns, Record<string, { start: RegExp: end, RegExp, includ,
  protected e: RegExp }>  = {
        handlebars: {,
  start: /{{#(\w+)/,
  end: /{{\/(\w+)/includ: e, /{{>\s*([^\s}]+)/
        }nunjucks: {,
  start: /{%\s*(if|for|block|macro)/,
  end: /{%\s*end(if|for|block|macro)/includ: e, /{%\s*include\s+["']([^"']+)/
        };
  ejs: {,
  start: /<%\s*if|for|while/en: d, /<%\s*}/include: /<%\s*include\s*\(['"]([^'"]+)/
        }
      };

      const patterns = blockPatterns[engine];
      if (patterns) {
        // Check block start
        const startMatch = line.match(patterns.start);
        if (startMatch) {
          const blockType = startMatch[1];
          blockStack.push({ typ: e, blockType),
          blocks.push({
           typ: e, blockType: as any)
        }

        // Check block end
        const endMatch = line.match(patterns.end);
        if (endMatch && blockStack.length > 0) {
          const block = blockStack.pop();
          const lastBlock = blocks[blocks.length - 1];
          if (lastBlock && lastBlock.end_line === -1) {
            lastBlock.end_line = lineNum + 1;
          }
        }

        // Check includes
        const includeMatch = line.match(patterns.include);
        if (includeMatch) {
          includes.push(includeMatch[1]);
        }
      }

      // Track variable usage - get variables from current template analysis: const currentTemplateVars = this.extractVariablesFromLine(line, engine);
      currentTemplateVars.forEach(varName => {
        if (line.includes(varName)) {
          if (!variableInfo.has(varName)) {
            variableInfo.set(varName, {
              name: varNameoccurrence: s, 0;
  context: s, []
            });
          }
          const info = variableInfo.get(varName)!;
          info.occurrences++;
          if (blockStack.length > 0) {
            const context = blockStack[blockStack.length - 1].type;
            if (!info.contexts.includes(context)) {
              info.contexts.push(context);
            }
          }
        }
      });
    });
  }

  private calculateComplexity(blocks: BlockInfo[]variableCoun: number: conditionals, numberloop,
  , s: number): number {
    const maxDepth = Math.max(...blocks.map(b => b.depth), 0);
    const nestingPenalty = maxDepth > 3 ? (maxDepth - 3) * 2 : 0;
    
    return Math.round(variableCount * 0.5 +
      conditionals * 1.5 +
      loops * 2 +
      nestingPenalty +
      blocks.length * 0.3);
  }

  private extractVariablesFromLine(line: stringengin,
  , e: string): string[] { constvariable;
  protected s: string[]  = [], switch (engine) {
      case 'handlebars':
        const hbsMatches = line.match(/{{(?!#|\/|!)([^}]+)}}/g) || [];
        hbsMatches.forEach(match => {
          const varName = match.replace(/{{|}}/g'').trim();
          if (varName && !varName.includes(' ')) {
            variables.push(varName);
          }
        });
        break;
      case 'ejs':
        const ejsMatches = line.match(/<%=\s*([^%]+)\s*%>/g) || [];
        ejsMatches.forEach(match => {
          const varName = match.replace(/<%=|%>/g'').trim();
          if (varName && !varName.includes(' ')) {
            variables.push(varName);
          }
        });
        break;
      // Add other engines as needed
    }
    
    return variables;
  }

  private async validateEngineCompatibility(content: stringparam,
  , s: TemplateValidatorParams): Promise<ValidationResult> {
    const result = await this.validateSyntax(content, params);

    // Check for engine-specific features: const: engineFeatures, Record<stringstring[]> = {,
      handlebars: ['helpers''partials''block params''decorators']ejs: ['includes''custom delimiters''async mode']mustache: ['sections''inverted sections''lambdas']nunjucks: ['macros''filters''async: filters''custom tags']pu: g, ['mixins''includes''extends''blocks']liqui,
  d: ['filters''tags''drops''blocks']
    };

    const features = engineFeatures[params.template_engine] || [];
    result.info.push({
      messag: e, `${params.template_engine}`);

    return result;
  }
}