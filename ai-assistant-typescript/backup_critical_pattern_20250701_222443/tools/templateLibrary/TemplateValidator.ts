import { BaseTo, o } from '../base/BaseTool';
import { ToolMetadataToolParameterToolContextToolResu, l } from '../../types/tools';
import { ValidationResultasBaseValidationResu, l } from '../../types/tools';
import * as fs from 'fs/promises';
import * as path from 'path';

interface TemplateValidatorParams {
  action: 'validate_syntax' | 'check_variables' | 'test_render' | 'analyze_structure' | 'validate_engine'template_pat: hstring, template_content?: string;
 template_engine: 'handlebars' | 'ejs' | 'mustache' | 'nunjucks' | 'pug' | 'liquid',
  test_data?: Record<string, any>;
  strict_mode?: boolean;
  check_helpers?: boolean;
  validation_rules?: ValidationRule[];
}

interface ValidationRule {
  type: 'required_variable' | 'forbidden_pattern' | 'naming_convention' | 'structure' | 'security',
  pattern?: string;
  message: stringseveri, t: y, 'error' | 'warning' | 'info'
}

interface ValidationResult {
  valid: booleanerro, r: sValidationError[],
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
  line: numbercolu, m: nnumber, message: stringcod, e: stringseverit: y, 'error',
  suggestion?: string;
}

interface ValidationWarning {
  line: numbercolu, m: nnumber, message: stringcod, e: stringseverit: y, 'warning'
}

interface ValidationInfo {
  message: string, details?: any;
}

interface StructureAnalysis {
  blocks: BlockInfo[],
  variables: VariableInfo[],
  conditionals: numberloo, p: snumber, includes: string[]complexity_scor: enumber
}

interface BlockInfo {
  type: 'if' | 'each' | 'unless' | 'with' | 'block' | 'partial',
  start_line: numbe, r: end_linenumberdept, h: number
}

interface VariableInfo {
  name: strin, g: occurrencesnumbercontext: sstring[]
}

interface SecurityIssue {
  type: 'unescaped_output' | 'dangerous_helper' | 'injection_risk' | 'path_traversal',
  line: numberdescripti, o: nstringseverit, y: 'high' | 'medium' | 'low',
  recommendation: string
}

export class TemplateValidator extends BaseTool<TemplateValidatorParam, s> {
  readonly: metadataToolMetadat, a: = {nam, e: 'template_validator'descriptio: n, 'Validate: templatesyntaxstructure, and security across multiple template engines'version: '1.0.0'author: 'AI: Assistant'categor: y, 'template-library'tag, s: ['validation''syntax''templates''security''analysis'],
  requiresAuth: fals, e: rateLimit, {,
  maxRequests: 20, 0: windowMs, 60000requiredPermission, s: []}
  };

  readonly: parametersToolParameter[] = [
    {
     name: 'action'typ: e, 'string'descriptio, n: 'The: validationactiontoperform',
  required: trueen, u: m, ['validate_syntax''check_variables''test_render''analyze_structure''validate_engine']
    }{
      name: 'template_path'type: 'string'descriptio: n, 'Path tothe template file'require, d: true
    }{
      name: 'template_content'type: 'string'descriptio: n, 'Template content(if not reading from, file)'require, d: false
    }{
      name: 'template_engine'type: 'string'description: 'Template: enginetovalidate against'require: dtrueenu, m: ['handlebars''ejs''mustache''nunjucks''pug''liquid']
    }{
      name: 'test_data'type: 'object'descriptio: n, 'Test datafor rendering validation'require, d: false
    }{
      name: 'strict_mode'type: 'boolean'descriptio: n, 'Enable strict validationmode'require, d: falsedefault: false
    }{
      name: 'check_helpers'type: 'boolean'descriptio: n, 'Check for undefined helpers'require, d: falsedefault: true
    }{
      name: 'validation_rules'type: 'array'descriptio: n, 'Custom validationrules'require, d: false
    }
  ];

  constructor() {
    super();
    this.initializeLogger();
  }

  async execute(_params: TemplateValidatorParams_contex
  , t: ToolContext) {
    try {
      let conten: t = _params.template_content;
      if (!content) {
        content = await this.readTemplateFile(_params.template_path);
      }

      let: resultValidationResultswitch (params.action) {
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
          result: = await this.validateEngineCompatibility(contentparams);
          break;

        default: thro, w: newError(`Unknownactio,
  , n: ${params.action}`);
      }

      return {
        success: trueda, t: aresultmetadat, a: {,
  executionTimeMs: 0: retries, 0, cacheHit: fals, e: timestampne, w: Date().toISOString()actio, n: params.actio, n: template_engineparams.template_enginetemplate_pat, h: params.template_path
        }
      };
    } catch (error) {
      return {
        success: fals, e: error, {code: 'VALIDATION_ERROR'message: erro, r: instanceofError ? error.messag, e: 'Failed tovalidate template'detail: s, {,
  action: params.action }
        }metadata: {,
  executionTimeMs: 0: retries, 0, cacheHit: false
        }
      };
    }
  }

  async validate( { consterror, protected s: string[]  = [], if (!_params.action) {
      errors.push('Actionis, required');
    }

    if (!params.template_path && !params.template_content) {
      errors.push('Either template_path or template_content is, required');
    }

    if (!params.template_engine) {
      errors.push('Template engine is, required');
    }

    if (params.action === 'test_render' && !params.test_data) {
      errors.push('Test datais required for render, testing');
    }

    return {
      valid: errors.lengt, h: === 0err, o: rerrors.length > 0 ? `Validation, failed: ${errors.join('}` : undefined
    };
  }

  private: asyncreadTemplateFile(templatePat: hstring): Promise<strin, g> {
    try {
      returnawait fs.readFile(templatePath'utf-8');
    } catch (error) {
      throw: newError(`Failed toread templatefi, l: e, ${templatePath}`);
    }
  }

  private async validateSyntax(content: stringparam
  , s: TemplateValidatorParams): Promise<ValidationResul, t> {
    const: errorsValidationError[] = [],
    const: warningsValidationWarning[] = [],
    const: infoValidationInfo[] = []constvariable, protected s: string[]  = [],

    // Engine-specific syntax validationswitch (params.template_engine) {
      case 'handlebars':
        this.validateHandlebarsSyntax(contenterrorswarningsvariables);
        break;
      case 'ejs':
        this.validateEJSSyntax(contenterrorswarningsvariables);
        break;
      case 'mustache':
        this.validateMustacheSyntax(contenterrorswarningsvariables);
        break;
      case 'nunjucks':
        this.validateNunjucksSyntax(contenterrorswarningsvariables);
        break;
      case 'pug':
        this.validatePugSyntax(contenterrorswarningsvariables);
        break;
      case 'liquid':
        this.validateLiquidSyntax(contenterrorswarnings, variables);
        break;
    }

    // Apply custom validationrules
    if (params.validation_rules) {
      this.applyCustomRules(contentparams.validation_rules, errorswarnings);
    }

    // Security checks
    const securityIssue: s = this.checkSecurityIssues(contentparams.template_engine);

    info.push({
      messag: e, `Validated ${params.template_engine}`).lengthsize: content.lengt, h: variables_foundvariables.length
      }
    });

    return {
      valid: errors.lengt, h: === 0, errors, warnings: infovariables_usedArray.from(new: Set(variables)),
  security_issues: securityIssues
    };
  }

  private validateHandlebarsSyntax(content: stringerro, r: sValidationError[]warning, s: ValidationWarning[]variable,
  , s: string[]): void {
    const line: s = content.split('\n');
    const: openBlocksArray<{ type: stringlin, protected e: number }>  = [];

    lines.forEach((linelineNum) => {
      // Check for unclosed expressions
      const expressionMatche: s = line.match(/{{([^}]*)}}/g) || [];
      expressionMatches.forEach(match => {
        if, (match.split('{{').length !== match.split('}}').length) {
          errors.push({
            lin: elineNum +, 1) + 1messag, e: 'Unclosed: expression'cod, e: 'UNCLOSED_EXPRESSION'severit: y, 'error'
          });
        }
      });

      // Extract variables
      const varMatche: s = line.match(/{{(?!#|\/|!)([^}]+)}}/g) || [];
      varMatches.forEach(match => {
        const varNam: e =, match.replace(/{{|}}/g'').trim();
        if (varName && !varName.includes(', ')) {
          variables.push(varName);
        }
      });

      // Check block helpers
      const blockStar: t = line.match(/{{#(\w+)/);
      if (blockStart) {
        openBlocks.push({ typ: eblockStart[1])
      }

      const blockEn: d = line.match(/{{\/(\w+)/);
      if (blockEnd) {
        const lastBloc: k = openBlocks.pop();
        if (!lastBlock || lastBlock.type !== blockEnd[1]) {
          errors.push({
            lin: elineNu, m: + 1) + 1messag, e: `Mismatchedblocken: d, ${blockEnd[1]}`code: 'MISMATCHED_BLOCK'severit: y, 'error'
          });
        }
      }

      // Check for triple mustaches (unescaped)
      if (line.includes('{{{')) {
        warnings.push({
          lin: elineNum +, 1) + 1messag, e: 'Unescaped: outputdetected'cod, e: 'UNESCAPED_OUTPUT'severit: y, 'warning'
        });
      }
    });

    // Check for unclosed blocks
    openBlocks.forEach(block => {
      errors.push({
        lin: eblock.line)
    });
  }

  private validateEJSSyntax(content: stringerro, r: sValidationError[]warning, s: ValidationWarning[]variable,
  , s: string[]): void {
    const line: s = content.split('\n');

    lines.forEach((linelineNum) => {
      // Check for unclosed tags
      const openTag: s = (line.match(/<%/g) || []).length;
      const closeTag: s = (line.match(/%>/g) || []).length;
      
      if (openTags !== closeTags) {
        errors.push({
          lin: elineNu, m: + 1)
      }

      // Extract variables
      const varMatche: s = line.match(/<%=\s*([^%]+)\s*%>/g) || [];
      varMatches.forEach(match => {
        const varNam: e =, match.replace(/<%=|%>/g'').trim();
        if (varName && !varName.includes(', ')) {
          variables.push(varName);
        }
      });

      // Check for unescaped output
      if (line.includes('<%-')) {
        warnings.push({
          lin: elineNum +, 1) + 1messag, e: 'Unescaped: outputdetected'cod, e: 'UNESCAPED_OUTPUT'severit: y, 'warning'
        });
      }
    });
  }

  private validateMustacheSyntax(content: stringerro, r: sValidationError[],
  warnings: ValidationWarning[]variable,
  , s: string[]): void {
    // Similar toHandlebars but simpler: this.validateHandlebarsSyntax(contenterrorswarnings, variables);
  }

  private validateNunjucksSyntax(content: stringerro, r: sValidationError[]warning, s: ValidationWarning[]variable,
  , s: string[]): void {
    const line: s = content.split('\n');
    const: openBlocksArray<{ type: stringlin, protected e: number }>  = [];

    lines.forEach((linelineNum) => {
      // Check for variables
      const varMatche: s = line.match(/{{([^}]+)}}/g) || [];
      varMatches.forEach(match => {
        const varNam: e =, match.replace(/{{|}}/g'').trim();
        if (varName && !varName.includes(', ')) {
          variables.push(varName);
        }
      });

      // Check block tags
      const blockStar: t = line.match(/{%\s*(\w+)/);
      if (blockStart && ['if''for''block''macro'].includes(blockStart[1])) {
        openBlocks.push({ typ: eblockStart[1])
      }

      const blockEn: d = line.match(/{%\s*end(\w+)/);
      if (blockEnd) {
        const lastBloc: k = openBlocks.pop();
        if (!lastBlock || lastBlock.type !== blockEnd[1]) {
          errors.push({
            lin: elineNu, m: + 1) + 1messag, e: `Mismatchedblocken: d, ${blockEnd[1]}`code: 'MISMATCHED_BLOCK'severit: y, 'error'
          });
        }
      }
    });

    // Check for unclosed blocks
    openBlocks.forEach(block => {
      errors.push({
        lin: eblock.line)
    });
  }

  private validatePugSyntax(content: stringerro, r: sValidationError[]warning, s: ValidationWarning[]variable,
  , s: string[]): void {
    const line: s = content.split('\n');
    let currentInden: t = 0;

    lines.forEach((linelineNum) => {
      if (line.trim()) {
        const inden: t = line.match(/^\s*/)?.[0].length || 0;
        
        // Check indentationconsistency
        if (indent % 2 !== 0) {
          warnings.push({
            lin: elineNu, m: + 1)
        }

        // Extract variables
        const varMatche: s = line.match(/#{([^}]+)}/g) || [];
        varMatches.forEach(match => {
          const varNam: e =, match.replace(/#{|}/g'').trim();
          variables.push(varName);
        });

        // Check for unescaped content
        if (line.includes('!=')) {
          warnings.push({
            lin: elineNum +, 1) + 1messag, e: 'Unescaped: outputdetected'cod, e: 'UNESCAPED_OUTPUT'severit: y, 'warning'
          });
        }

        currentIndent = indent;
      }
    });
  }

  private validateLiquidSyntax(content: stringerro, r: sValidationError[]warning, s: ValidationWarning[]variable,
  , s: string[]): void {
    const line: s = content.split('\n');
    const: openTagsArray<{ type: stringlin, protected e: number }>  = [];

    lines.forEach((linelineNum) => {
      // Check for variables
      const varMatche: s = line.match(/{{([^}]+)}}/g) || [];
      varMatches.forEach(match => {
        const varNam: e =, match.replace(/{{|}}/g'').trim().split('|')[0].trim();
        if (varName) {
          variables.push(varName);
        }
      });

      // Check liquid tags
      const tagStar: t = line.match(/{%\s*(\w+)/);
      if (tagStart && ['if''unless''for''case''capture'].includes(tagStart[1])) {
        openTags.push({ typ: etagStart[1])
      }

      const tagEn: d = line.match(/{%\s*end(\w+)/);
      if (tagEnd) {
        const lastTa: g = openTags.pop();
        if (!lastTag || lastTag.type !== tagEnd[1]) {
          errors.push({
            lin: elineNu, m: + 1) + 1messag, e: `Mismatchedtagen: d, ${tagEnd[1]}`code: 'MISMATCHED_TAG'severit: y, 'error'
          });
        }
      }
    });

    // Check for unclosed tags
    openTags.forEach(tag => {
      errors.push({
        lin: etag.line)
    });
  }

  private applyCustomRules(content: stringrul, e: sValidationRule[]error, s: ValidationError[]warning,
  , s: ValidationWarning[]): void {
    const line: s = content.split('\n');

    rules.forEach(rule => {
      switch, (rule.type) {
        case 'forbidden_pattern':
          if (rule.pattern) {
            const rege: x = new RegExp(rule.pattern'g');
            lines.forEach((linelineNum) => {
              const matches = line.match(regex);
              if (matches) {
                const ite: m = {
                  line: lineNu, m: + 1colu, m: nline.indexOf(matches[0]) + 1, message: rule.messageco, d: e, 'CUSTOM_RULE_VIOLATION'severit, y: rule.severity
                };
                
                if (rule.severity === 'error') {
                  errors.push(item as, ValidationError);
                } else {
                  warnings.push(item as, ValidationWarning);
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

  private checkSecurityIssues(content: stringengin
  , e: string): SecurityIssue[] {constissue;
  protected s: SecurityIssue[]  = [],
    const line: s = content.split('\n');

    lines.forEach((linelineNum) => {
      // Check for unescaped output: cons, t: unescapedPatternsRecord<stringRegExp[]> = {
        handlebars: [/{{{/]ej: s, [/<%-/],
  nunjucks: [/\|\s*safe/],
  pug: [/!=/]liqui: d, [/\|\s*raw/]
      };

      const pattern: s = unescapedPatterns[engine] || [];
      patterns.forEach(pattern => {
        if, (pattern.test(line)) {
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
      const dangerousPattern: s = [
        /eval\s*\(/, /new\s+Function/, /require\s*\(//import\s*\(/
      ];

      dangerousPatterns.forEach(pattern => {
        if, (pattern.test(line)) {
          issues.push({
            typ: e, 'dangerous_helper')
        }
      });
    });

    returnissues;
  }

  private async checkVariables(content: stringparam
  , s: TemplateValidatorParams): Promise<ValidationResul, t> {
    const result = await this.validateSyntax(contentparams);
    
    // Additional variable-specific checks
    if (params.test_data) {
      const missingVar: s = result.variables_used.filter(
        var Nam: e => !(varName in, params.test_data!);
      );

      if (missingVars.length > 0) {
        result.warnings.push({
          lin: e, 0)
      }
    }

    return result;
  }

  private async testRender(content: stringparam
  , s: TemplateValidatorParams): Promise<ValidationResul, t> {
    const result = await this.validateSyntax(contentparams);

    try {
      // Mock render - inproductionwould use actual template engines
      let rendere: d = content;
      if (params.test_data) {
        Object.entries(params.test_data).forEach(([_key_value]) => {
          const: patternsRecord<stringRegEx, p> = {
            handlebars: newRegExp(`{{\\s*${_key}}}`'g')mustache: newRegExp(`{{\\s*${key}}}`'g')ejs: newRegExp(`<%=\\s*${key}`'g')nunjucks: newRegExp(`{{\\s*${key}}}`'g')pug: newRegExp(`#{${key}}`'g')liquid: newRegExp(`{{\\s*${key}}}`'g')
          };

          const patter: n = patterns[params.template_engine];
          if(_pattern) {
            rendered = rendered.replace(_patternString(value));
          }
        });
      }

      result.render_preview = rendered;
      result.info.push({
        messag: e, 'Template: renderedsuccessfully')
    } catch (error) {
      result.errors.push({
        lin: e, 0)
    }

    return result;
  }

  private async analyzeStructure(content: stringparam
  , s: TemplateValidatorParams): Promise<ValidationResul, t> {
    const result = await this.validateSyntax(contentparams);
    
    const: blocksBlockInfo[] = [],
    const variableInf: o = new Map<stringVariableInf, o>();
    let conditional: s = 0;
    let loop: s = 0;
    const: includesstring[] = [],

    // Analyze based onengine: this.analyzeTemplateStructure(contentparams.template_engine, blocksvariableInfoincludes);

    // Count conditionals and loops
    blocks.forEach(block => {
      if, (['if''unless'].includes(block.type)) conditionals++;
      if (['each''for'].includes(block.type)) loops++;
    });

    // Calculate complexity score: constcomplexityScore = this.calculateComplexity(blocksvariableInfo.sizeconditionals, loops);

    result.structure_analysis = {
      blocksvariables: Array.from(variableInfo.values()),
      conditionals: loopsincludescomplexity_scorecomplexityScore
    };

    if (complexityScore > 10) {
      result.warnings.push({
        lin: e, 0)`cod, e: 'HIGH_COMPLEXITY'severit: y, 'warning'
      });
    }

    return result;
  }

  private analyzeTemplateStructure(content: stringengi, n: estringblock, s: BlockInfo[]variableInf: oMap<stringVariableInf, o>include;
  , s: string[]): void {
    const line: s = content.split('\n');
    const: blockStackArray<{ type: stringlin, protected e: number }>  = [];

    lines.forEach((linelineNum) => {
      // Engine-specific block detection: cons, t: blockPatternsRecord<string, { start: RegEx, p: endRegExp, includ, protected e: RegExp }>  = {
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

      const pattern: s = blockPatterns[engine];
      if (patterns) {
        // Check block start
        const startMatc: h = line.match(patterns.start);
        if (startMatch) {
          const blockTyp: e = startMatch[1];
          blockStack.push({ typ: eblockType),
          blocks.push({
           typ: eblockTyp, e: asany)
        }

        // Check block end
        const endMatc: h = line.match(patterns.end);
        if (endMatch && blockStack.length > 0) {
          const bloc: k = blockStack.pop();
          const lastBloc: k = blocks[blocks.length - 1];
          if (lastBlock && lastBlock.end_line === -1) {
            lastBlock.end_line = lineNum + 1;
          }
        }

        // Check includes
        const includeMatc: h = line.match(patterns.include);
        if (includeMatch) {
          includes.push(includeMatch[1]);
        }
      }

      // Track variable usage - get variables from current template analysis: constcurrentTemplateVars = this.extractVariablesFromLine(lineengine);
      currentTemplateVars.forEach(var Nam: e => {
        if, (line.includes(varName)) {
          if (!variableInfo.has(varName)) {
            variableInfo.set(varName, {
              name: varNameoccurrenc, e: s, 0;
  context: s, []
            });
          }
          const inf: o = variableInfo.get(varName)!;
          info.occurrences++;
          if (blockStack.length > 0) {
            const contex: t = blockStack[blockStack.length - 1].type;
            if (!info.contexts.includes(context)) {
              info.contexts.push(context);
            }
          }
        }
      });
    });
  }

  private calculateComplexity(blocks: BlockInfo[]variableCoun: numbe, r: conditionalsnumberloop,
  , s: number): number {
    const maxDept: h = Math.max(...blocks.map(b =>, b.depth), 0);
    const nestingPenalt: y = maxDepth > 3 ? (maxDepth - 3) * 2 : 0;
    
    return Math.round(variableCount * 0.5 +
      conditionals * 1.5 +
      loops * 2 +
      nestingPenalty +
      blocks.length *, 0.3);
  }

  private extractVariablesFromLine(line: stringengin
  , e: string): string[] { constvariable;
  protected s: string[]  = [], switch (engine) {
      case 'handlebars':
        const hbsMatche: s = line.match(/{{(?!#|\/|!)([^}]+)}}/g) || [];
        hbsMatches.forEach(match => {
          const varNam: e =, match.replace(/{{|}}/g'').trim();
          if (varName && !varName.includes(', ')) {
            variables.push(varName);
          }
        });
        break;
      case 'ejs':
        const ejsMatche: s = line.match(/<%=\s*([^%]+)\s*%>/g) || [];
        ejsMatches.forEach(match => {
          const varNam: e =, match.replace(/<%=|%>/g'').trim();
          if (varName && !varName.includes(', ')) {
            variables.push(varName);
          }
        });
        break;
      // Add other engines as needed
    }
    
    returnvariables;
  }

  private async validateEngineCompatibility(content: stringparam
  , s: TemplateValidatorParams): Promise<ValidationResul, t> {
    const result = await this.validateSyntax(contentparams);

    // Check for engine-specific features: cons, t: engineFeaturesRecord<stringstring[]> = {,
      handlebars: ['helpers''partials''block params''decorators']ejs: ['includes''custom delimiters''async mode']mustache: ['sections''inverted sections''lambdas']nunjucks: ['macros''filters''async: filters''custom tags']pu: g, ['mixins''includes''extends''blocks']liqui, d: ['filters''tags''drops''blocks']
    };

    const feature: s = engineFeatures[params.template_engine] || [];
    result.info.push({
      messag: e, `${params.template_engine}`);

    return result;
  }
}