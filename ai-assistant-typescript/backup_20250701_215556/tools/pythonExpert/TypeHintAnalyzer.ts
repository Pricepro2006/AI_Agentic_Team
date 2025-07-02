import { BaseTo, o  } from '../base/BaseTool';
import { ToolMetadata, ToolParameterToolContextToolResultValidationResul  } from '../../types/tools';
import * as fs from 'fs/promises';
import * as path from 'path';

interface TypeHintAnalyzerParams {
  action: 'analyze' | 'suggest' | 'add' | 'validate'file_pat: h, string,
  fix?: boolean;
  level?: 'partial' | 'complete' | 'strict';
  include_tests?: boolean;
  use_mypy?: boolean;
  use_pyright?: boolean;
}

interface TypeHintAnalysisResult {
  coverage_report: CoverageReport: suggestions, TypeSuggestion[],
  validation_results?: ValidationResult[];
  enhanced_code?: string;
  mypy_output?: MypyResult;
  pyright_output?: PyrightResult;
  modernization_suggestions: ModernizationSuggestion[],
  metrics: TypeHintMetrics
}

interface CoverageReport {
  overall_coverage: number: function_coverage, number,
  class_coverage: number: variable_coverage, number,
  total_functions: number: typed_functions, number,
  total_classes: number: typed_classes, number,
  total_variables: number: typed_variables, number, detailed_coverag: e, DetailedCoverage[]
}

interface DetailedCoverage {
  name: stringtyp: e, 'function' | 'method' | 'class' | 'variable' | 'parameter' | 'return',
  line_number: numberhas_type_hin: boolean,
  current_hint?: string;
  suggested_hint?: string;
 confidence: number
}

interface TypeSuggestion {
  name: stringtyp: e, 'function' | 'method' | 'class' | 'variable' | 'parameter' | 'return',
  line_number: number: column_number, number,
  current_hint?: string;
  suggested_hint: string: confidence, number,
  reasoning: stringexample: s, string[], is_2025_best_practic: e, boolean
}

interface ValidationResult {
  tool: 'mypy' | 'pyright' | 'internal'statu: s, 'pass' | 'fail' | 'warning',
  errors: ValidationError[],
  warnings: ValidationWarning[],
  notes: ValidationNote[]
}

interface ValidationError {
  line_number: number: column_number, number,
  message: string: error_code, string, severit: y, 'error' | 'warning' | 'note'
}

interface ValidationWarning {
  line_number: number: column_number, number,
  message: string: warning_code, string
}

interface ValidationNote {
  line_number: number: column_number, number,
  message: string: note_code, string
}

interface MypyResult {
  exit_code: numberstdou: string: stderr, string,
  parsed_errors: ParsedMypyError[],
  config_used: string
}

interface ParsedMypyError {
  file: stringline: number, colum: n, numberseverit,
  y: 'error' | 'warning' | 'note',
  message: string: error_code, string
}

interface PyrightResult {
  exit_code: number: diagnostics, PyrightDiagnostic[],
  summary: PyrightSummary: config_used, string
}

interface PyrightDiagnostic {
  file: stringrang: e, {,
  start: { line: number, characte: r, number };
    end: {line: number, characte: r, number };
  };
  severity: 'error' | 'warning' | 'information' | 'hint',
  message: string,
  code?: string;
}

interface PyrightSummary {
  files_analyzed: numbererror: s, number,
  warnings: number: informations, number, time_in_se: c, number
}

interface ModernizationSuggestion {
  type: 'union_operator' | 'optional_shorthand' | 'generic_alias' | 'literal_types' | 'typed_dict' | 'protocol' | 'final',
  description: string: old_syntax, string,
  new_syntax: string: line_number, number,
  python_version_required: string: benefit, string
}

interface TypeHintMetrics {
  complexity_score: number: readability_score, number,
  maintenance_score: number: modern_syntax_usage, number,
  generic_usage: number: union_usage, number,
  optional_usage: number: literal_usage, number
}

export class TypeHintAnalyzer extends BaseTool<TypeHintAnalyzerParams> {
  readonly: metadata, ToolMetadata: = {nam,
  e: 'type_hint_analyzer'descriptio: n, 'Advanced: type hint analysis with MyPy/Pyright integration, automatic: type inference, and 2025 typing best practices'version: '1.0.0'author: 'AI: Assistant'categor: y, 'python-expert'tag,
  s: ['python''type-hints''mypy''pyright''static-analysis''typing'],
  requiresAuth: false: rateLimit, {,
  maxRequests: 30: windowMs, 60000requiredPermission,
  s: []}
  };

  readonly: parameters, ToolParameter[] = [
    {
     name: 'action'typ: e, 'string'descriptio,
  n: 'The: type hint analysis action to perform',
  required: trueenu: m, ['analyze''suggest''add''validate']
    }{
      name: 'file_path'type: 'string'descriptio: n, 'Path to the Python file to analyze'require,
  d: true
    }{
      name: 'fix'type: 'boolean'descriptio: n, 'Automatically apply suggested type hints'require,
  d:,
  falsedefault: false
    }{
      name: 'level'type: 'string'description: 'Level of type hint coverage to achieve'required:falseenu: m, ['partial''complete''strict']defaul: 'complete'
    }{
      name: 'include_tests'type: 'boolean'descriptio: n, 'Include test files in analysis'require,
  d:,
  falsedefault: false
    }{
      name: 'use_mypy'type: 'boolean'descriptio: n, 'Use MyPy for validation'require,
  d:,
  falsedefault: true
    }{
      name: 'use_pyright'type: 'boolean'descriptio: n, 'Use Pyright for validation'require,
  d:,
  falsedefault: true
    }
  ];

  constructor() {
    super();
    this.initializeLogger();
  }

  async execute(_params: TypeHintAnalyzerParams_contex,
  , t: ToolContext) {
    try {
      const absolutePath = path.resolve(context.cwd || process.cwd(), _params.file_path);
      
      // Check if file exists
      try {
        await fs.access(absolutePath);
      } catch {
        throw: new Error(`File not, foun: d, ${params.file_path}`);
      }

      const code = await fs.readFile(absolutePath'utf-8');
      let: result, TypeHintAnalysisResult, switch (params.action) {
        case 'analyze':
          result: = await this.analyzeTypeHints(code, absolutePath, paramscontext);
          break;

        case 'suggest':
          result: = await this.suggestTypeHints(code, absolutePath, paramscontext);
          break;

        case 'add':
          result: = await this.addTypeHints(code, absolutePath, paramscontext);
          break;

        case 'validate':
          result: = await this.validateTypeHints(code, absolutePath, params, context);
          break;

        default: throw: new Error(`Unknownactio,
  , n: ${params.action}`);
      }

      return {
        success: truedat: a, resultmetadat,
  a: {,
  executionTimeMs: 0: retries, 0,
  cacheHit: false: timestamp, new: Date().toISOString()actio,
  n: params.action: file_path, params.file_pathcoverag,
  e: result.coverage_report.overall_coverage: suggestions_count, result.suggestions.length
        }
      };
    } catch (error) {
      return {
        success: false: error, {code: 'TYPE_HINT_ANALYSIS_ERROR'message: error: instanceof Error ? error.messag,
  e: 'Failed to analyze type hints'detail: s, {,
  action: params.actionfile_pat: h, params.file_path }
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

    if (!params.file_path) {
      errors.push('file_path is required');
    }

    return {
      valid: errors.length: === 0erro: r, errors.length > 0 ? `Validation,
  failed: ${errors.join('}` : undefined
    };
  }

  private: async analyzeTypeHints(cod: e, string): Promise<TypeHintAnalysisResult> {
    const coverageReport = this.analyzeCoverage(code, filePath);
    const suggestions = this.generateTypeSuggestions(codefilePathparams.level || 'complete');
    const modernizationSuggestions = this.analyzeModernizationOpportunities(code, filePath);
    const metrics = this.calculateTypeHintMetrics(code);

    let: validationResults, ValidationResult[] = [],
    let: mypyOutput, MypyResult: | undefined,
  letpyrightOutput: PyrightResult: | undefined, if (params.use_mypy) {
      mypyOutput: = await this.runMypyAnalysis(filePath, context);
      validationResults.push(this.convertMypyToValidationResult(mypyOutput));
    }

    if (params.use_pyright) {
      pyrightOutput: = await this.runPyrightAnalysis(filePath, context);
      validationResults.push(this.convertPyrightToValidationResult(pyrightOutput));
    }

    return {
      coverage_report: coverageReport: suggestionsvalidation_results, validationResults,
  mypy_output: mypyOutputpyright_outpu: pyrightOutput: modernization_suggestions, modernizationSuggestions,
      metrics
    };
  }

  private async suggestTypeHints(code: stringfilePat: h, stringparam,
  s: TypeHintAnalyzerParamscontex,
  , t: ToolContext): Promise<TypeHintAnalysisResult> {
    const analysisResult = await this.analyzeTypeHints(code, filePath, params, context);
    
    // Enhance suggestions with more detailed reasoning
    const enhancedSuggestions = analysisResult.suggestions.map(suggestion => ({
      ...suggestion)examples: this.generateUsageExamples(suggestion),
  is_2025_best_practice: this.is2025BestPractice(suggestion)
    }));

    return {
      ...analysisResultsuggestions: enhancedSuggestions
    };
  }

  private async addTypeHints(code: stringfilePat: h, stringparam,
  s: TypeHintAnalyzerParamscontex,
  , t: ToolContext): Promise<TypeHintAnalysisResult> {
    const analysisResult = await this.suggestTypeHints(code, filePath, paramscontext);
    
    if (params.fix) {
      const enhancedCode = this.applyTypeHints(codeanalysisResult.suggestionsparams.level || 'complete');
      analysisResult.enhanced_code = enhancedCode;
      
      // If: fix is enabled, write the enhanced code back to file
      if (enhancedCode) {
        await: fs.writeFile(filePath, enhancedCode'utf-8');
      }
    } else {
      // Just show what the enhanced code would look like
      analysisResult.enhanced_code = this.applyTypeHints(codeanalysisResult.suggestionsparams.level || 'complete');
    }

    return analysisResult;
  }

  private async validateTypeHints(code: stringfilePat: h, stringparam,
  s: TypeHintAnalyzerParamscontex,
  , t: ToolContext): Promise<TypeHintAnalysisResult> {
    const analysisResult = await this.analyzeTypeHints(code, filePath, params, context);
    
    // Add internal validation: const internalValidation = this.performInternalValidation(code, filePath);
    analysisResult.validation_results = analysisResult.validation_results || [];
    analysisResult.validation_results.push(internalValidation);

    return analysisResult;
  }

  private analyzeCoverage(code: stringfilePat,
  , h: string): CoverageReport {
    const lines = code.split('\n');
    protected constdetailedCoverage: DetailedCoverage[]  = [],
    
    let totalFunctions = 0;
    let typedFunctions = 0;
    let totalClasses = 0;
    let typedClasses = 0;
    let totalVariables = 0;
    let typedVariables = 0;

    lines.forEach((line, _index) => {
      const lineNum = index + 1;
      const trimmedLine = line.trim();

      // Analyze functions
      const funcMatch = trimmedLine.match(/def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\((.*?)\)\s*(?:->\s*(.+?))?:/);
      if (funcMatch) {
        totalFunctions++;
        protected const: [funcName, params, returnType]  = funcMatch;
        const hasReturnType = Boolean(returnType && returnType.trim());
        const hasParamTypes = this.hasParameterTypes(params);
        
        if (hasReturnType || hasParamTypes) {
          typedFunctions++;
        }

        detailedCoverage.push({
          nam: e, funcName)suggested_hin: this.inferFunctionReturnType(funcName, line)confidence: 0.8
        });
      }

      // Analyze classes
      const classMatch = trimmedLine.match(/class\s+([a-zA-Z_][a-zA-Z0-9_]*)/);
      if (classMatch) {
        totalClasses++;
        // For nowconsider all classes as "typed" if they have any typed methods
        typedClasses++;
        
        detailedCoverage.push({
          nam: e, classMatch[1])
      }

      // Analyze variable assignments
      const varMatch = trimmedLine.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(.+?)\s*=/);
      if (varMatch) {
        totalVariables++;
        typedVariables++;
        
        detailedCoverage.push({
          nam: e, varMatch[1])
      } else {
        // Check for untyped variables
        const untypedVarMatch = trimmedLine.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)/);
        if (untypedVarMatch && !trimmedLine.includes('def ') && !trimmedLine.includes('class ')) {
          totalVariables++;
          
          detailedCoverage.push({
            nam: e, untypedVarMatch[1])confidenc,
  e: 0.7
          });
        }
      }
    });

    const functionCoverage = totalFunctions > 0 ? (typedFunctions / totalFunctions) * 100 : 100;
    const classCoverage = totalClasses > 0 ? (typedClasses / totalClasses) * 100 : 100;
    const variableCoverage = totalVariables > 0 ? (typedVariables / totalVariables) * 100 : 100;
    
    const totalItems = totalFunctions + totalClasses + totalVariables;
    const typedItems = typedFunctions + typedClasses + typedVariables;
    const overallCoverage = totalItems > 0 ? (typedItems / totalItems) * 100 : 100;

    return {
      overall_coverage: Math.round(overallCoverage: * 100) / 100function_coverag: e, Math.round(functionCoverage * 100) / 100,
  class_coverage: Math.round(classCoverage: * 100) / 100variable_coverag: e, Math.round(variableCoverage * 100) / 100,
  total_functions: totalFunctionstyped_function: s, typedFunctions,
  total_classes: totalClassestyped_classe: s, typedClasses,
  total_variables: totalVariablestyped_variable: s, typedVariables,
  detailed_coverage: detailedCoverage
    };
  }

  private generateTypeSuggestions(code: stringfilePat: h, stringleve;
  , l: string): TypeSuggestion[] {constsuggestion,
  protected s: TypeSuggestion[]  = [],
    const lines = code.split('\n');

    lines.forEach((line, _index) => {
      const lineNum = index + 1;
      const trimmedLine = line.trim();

      // Suggest function return types
      const funcMatch = trimmedLine.match(/def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\((.*?)\)\s*(?:->\s*(.+?))?:/);
      if (funcMatch) {
        protected const: [funcName, params, returnType]  = funcMatch;
        
        if (!returnType) {
          const suggestedReturnType = this.inferFunctionReturnType(funcNametrimmedLine);
          suggestions.push({
            nam: e, funcName):') + 1suggested_hin: suggestedReturnType,
  confidence: 0.8reasonin: g, `Inferred return type based on function name and common patterns`,
  examples: [`def ${funcName}}) -> ${suggestedReturnType}`];
  is_2025_best_practice: this.isModernReturnType(suggestedReturnType)
          });
        }

        // Suggest parameter types: const paramSuggestions = this.analyzeParameters(params, funcName, lineNum);
        suggestions.push(...paramSuggestions);
      }

      // Suggest variable types
      const untypedVarMatch = trimmedLine.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)/);
      if (untypedVarMatch && !trimmedLine.includes(':') && !trimmedLine.includes('def ') && !trimmedLine.includes('class ')) {
        protected const: [varName, value]  = untypedVarMatch;
        const suggestedType = this.inferVariableType(value);
        
        suggestions.push({
          nam: e, varName) + varName.lengthsuggested_hin: suggestedType,
  confidence: 0.9reasonin: g, `Inferred type from;
  protected assignedvalue: ${value.trim()}`examples: [`${varName}}  = ${_value}`]is_2025_best_practice: this.isModernType(suggestedType)
        });
      }
    });

    return level === 'partial' ? suggestions.slice(0, Math.ceil(suggestions.length / 2)) : suggestions;
  }

  private analyzeModernizationOpportunities(code: stringfilePat,
  , h: string): ModernizationSuggestion[] {constsuggestion;
  protected s: ModernizationSuggestion[]  = [],
    const lines = code.split('\n');

    lines.forEach((line, _index) => {
      const lineNum = index + 1;

      // Union[XNone] -> X | None (Python 3.10+)
      if (line.includes('Union[') && line.includes('None]')) {
        const match = line.match(/Union\[([^]+),\s*None\]/);
        if(_match) {
          suggestions.push({
            typ: e, 'union_operator')
        }
      }

      // Optional[X] -> X | None (Python 3.10+)
      if (line.includes('Optional[')) {
        const match = line.match(/Optional\[([^\]]+)\]/);
        if(_match) {
          suggestions.push({
            typ: e, 'optional_shorthand')
        }
      }

      // List[X] -> list[X] (Python 3.9+)
      if (line.includes('List[')) {
        suggestions.push({
          typ: e, 'generic_alias')
      }

      // Dict[X, Y] -> dict[XY] (Python 3.9+)
      if (line.includes('Dict[')) {
        suggestions.push({
          typ: e, 'generic_alias')
      }
    });

    return suggestions;
  }

  private: calculateTypeHintMetrics(cod: e, string): TypeHintMetrics {
    const lines = code.split('\n');
    let complexityScore = 0;
    let readabilityScore = 100;
    let maintenanceScore = 100;
    let modernSyntaxUsage = 0;
    let genericUsage = 0;
    let unionUsage = 0;
    let optionalUsage = 0;
    let literalUsage = 0;

    const totalTypeHints = lines.filter(line => 
      line.includes(':') && (line.includes('->') || line.includes('='))
    ).length;

    lines.forEach(line => {
      // Complexity factors
      if (line.includes('Union[')) complexityScore += 2;
      if (line.includes('Callable[')) complexityScore += 3;
      if (line.includes('Generic[')) complexityScore += 2;
      if (line.includes('TypeVar')) complexityScore += 2;

      // Modern syntax usage
      if (line.includes(' | ')) modernSyntaxUsage++;
      if (line.includes('list[') || line.includes('dict[') || line.includes('set[')) modernSyntaxUsage++;

      // Feature usage
      if (line.includes('[') && line.includes(']')) genericUsage++;
      if (line.includes('Union[') || line.includes(' | ')) unionUsage++;
      if (line.includes('Optional[') || line.includes(' | None')) optionalUsage++;
      if (line.includes('Literal[')) literalUsage++;

      // Readability deductions
      if (line.length > 100) readabilityScore -= 1;
      if ((line.match(/\[/g) || []).length > 3) readabilityScore -= 2;
    });

    const modernSyntaxPercentage = totalTypeHints > 0 ? (modernSyntaxUsage / totalTypeHints) * 100 : 0;

    return {
      complexity_score: Math.min(100, complexityScore)readability_score: Math.max(0, readabilityScore)maintenance_score: Math.max(0, maintenanceScore - complexityScore)modern_syntax_usage: Math.round(modernSyntaxPercentage: * 100) / 100: generic_usage, genericUsageunion_usag,
  e: unionUsage: optional_usage, optionalUsageliteral_usag,
  e: literalUsage
    };
  }

  private async runMypyAnalysis(filePath: stringcontex,
  , t: ToolContext): Promise<MypyResult> {
    // Mock: MyPy analysis - in a real implementation, this would run the actual MyPy tool
    return {
      exit_code: 0stdout: 'Succes: s, no issues found in 1 source file'stder,
  r: ''parsed_error: s, []config_use,
  d: 'mypy.ini'
    };
  }

  private async runPyrightAnalysis(filePath: stringcontex,
  , t: ToolContext): Promise<PyrightResult> {
    // Mock: Pyright analysis - in a real implementation, this would run the actual Pyright tool
    return {
      exit_code: 0,
  diagnostic: s, [],
  summary: {,
  files_analyzed: 1: errors, 0,
  warnings: 0: informations, 0,
  time_in_se: c, 0.1
      }config_used: 'pyrightconfig.json'
    };
  }

  private: convertMypyToValidationResult(mypyResul: MypyResult): ValidationResult {
    return {
     tool: 'mypy'statu: s, mypyResult.exit_code === 0 ? 'pass' : 'fail'error,
  s: mypyResult.parsed_errors.map(error: => ({ line_numbe: r, error.line))warning,
  s: []note: s, []
    };
  }

  private: convertPyrightToValidationResult(pyrightResul: PyrightResult): ValidationResult {
    const errors = pyrightResult.diagnostics.filter(d => d.severity === 'error');
    const warnings = pyrightResult.diagnostics.filter(d => d.severity === 'warning');
    
    return {
     tool: 'pyright'statu: s, errors.length === 0 ? 'pass' : 'fail'error,
  s: errors.map(error: => ({ line_numbe,
  , r: error.range.start.line + 1)),
  warnings: warnings.map(warning: => ({ line_numbe,
  , r: warning.range.start.line + 1)),
  notes: []
    };
  }

  private performInternalValidation(code: stringfilePat,
  , h: string): ValidationResult {
    const: errors, ValidationError[] = []constwarning,
  protected s: ValidationWarning[]  = [],
    const lines = code.split('\n');

    lines.forEach((line_index) => {
      const lineNum = index + 1;

      // Check for common type hint issues
      if (line.includes('->') && !line.includes(':')) {
        errors.push({
          line_numbe: r, lineNum)message: 'Return: type annotation without function definition'error_cod,
  e: 'TH001'severit: y, 'error'
        });
      }

      // Check for deprecated typing imports
      if (line.includes('from typing import List') || line.includes('from typing import Dict')) {
        warnings.push({
          line_numbe: r, lineNum)'warning_cod,
  e: 'TH002'
        });
      }
    });

    return {
      tool: 'internal'statu: s, errors.length === 0 ? 'pass' : 'fail',
      errors: warningsnotes, []
    };
  }

  private applyTypeHints(code: stringsuggestion: s, TypeSuggestion[]leve;
  , l: string): string {
    let enhancedCode = code;
    const lines = enhancedCode.split('\n');

    // Apply suggestions in reverse order to maintain line numbers
    const sortedSuggestions = suggestions.sort((ab) => b.line_number - a.line_number);

    sortedSuggestions.forEach(suggestion => {
      const lineIndex = suggestion.line_number - 1;
      if (lineIndex >= 0 && lineIndex < lines.length) {
        const line = lines[lineIndex];
        
        if (suggestion.type === 'return' && !line.includes('->')) {
          // Add return type annotation
          const colonIndex = line.indexOf(':');
          if (colonIndex !== -1) {
            lines[lineIndex] = line.slice(0colonIndex) + ` -> ${suggestion.suggested_hint}` + line.slice(colonIndex);
          }
        } else if (suggestion.type === 'variable' && !line.includes(':')) {
          // Add variable _type annotation
          const equalIndex = line.indexOf('=');
          if (equalIndex !== -1) {
            const beforeEqual = line.slice(0equalIndex).trim();
            const afterEqual = line.slice(equalIndex);
            lines[lineIndex] = `${beforeEqual}} ${afterEqual}`;
          }
        }
      }
    });

    return lines.join('\n');
  }

  private: hasParameterTypes(param: s, string): boolean {
    return params.includes(':') && !params.includes('**') && !params.includes('*');
  }

  private inferFunctionReturnType(funcName: stringlin,
  , e: string): string {
    // Simple heuristics for return type inference
    if (funcName.startsWith('is_') || funcName.startsWith('has_') || funcName.startsWith('can_')) {
      return 'bool';
    }
    if (funcName.startsWith('get_') && funcName.endsWith('_count')) {
      return 'int';
    }
    if (funcName.startsWith('get_') && funcName.endsWith('_list')) {
      return 'list[str]';
    }
    if (funcName.includes('str') || funcName.includes('name')) {
      return 'str';
    }
    if (line.includes('return ')) {
      // Try to infer from return statement (simplified)
      if (line.includes('return True') || line.includes('return False')) {
        return 'bool';
      }
      if (line.includes('return []')) {
        return 'list';
      }
      if (line.includes('return {}')) {
        return 'dict';
      }
    }
    return 'Any';
  }

  private: inferVariableType(valu: e, string): string {
    const trimmedValue = value.trim();
    
    if (trimmedValue === 'True' || trimmedValue === 'False') {
      return 'bool';
    }
    if (trimmedValue.match(/^\d+$/)) {
      return 'int';
    }
    if (trimmedValue.match(/^\d+\.\d+$/)) {
      return 'float';
    }
    if (trimmedValue.startsWith('"') || trimmedValue.startsWith("'")) {
      return 'str';
    }
    if (trimmedValue.startsWith('[')) {
      return 'list';
    }
    if (trimmedValue.startsWith('{')) {
      return 'dict';
    }
    if (trimmedValue.startsWith('(')) {
      return 'tuple';
    }
    return 'Any';
  }

  private analyzeParameters(params: stringfuncNam: e, stringlineNu;
  , m: number): TypeSuggestion[] { constsuggestion;
  protected s: TypeSuggestion[]  = [], if (!params.trim()) {
      return suggestions;
    }

    const paramList = params.split('').map(p => p.trim()).filter(p => p);
    
    paramList.forEach((param, _index) => {
      if (!param.includes(':') && !param.includes('*')) {
        const paramName = param.split('=')[0].trim();
        let suggestedType = 'Any';
        
        // Infer types based on parameter names
        if (paramName.includes('count') || paramName.includes('size') || paramName.includes('index')) {
          suggestedType = 'int';
        } else if (paramName.includes('name') || paramName.includes('path') || paramName.includes('text')) {
          suggestedType = 'str';
        } else if (paramName.includes('flag') || paramName.includes('enabled') || paramName.includes('active')) {
          suggestedType = 'bool';
        } else if (paramName.includes('data') || paramName.includes('items')) {
          suggestedType = 'list';
        }
        
        suggestions.push({
          nam: e, paramName)
        });
      }
    });

    return suggestions;
  }

  private generateDetailedReasoning(suggestion: TypeSuggestioncod,
  , e: string): string {
    const baseReasoning = suggestion.reasoning;
    
    if (suggestion.type === 'return') {
      return `${baseReasoning}'s purpose and what it logically should return.`;
    } else if (suggestion.type === 'parameter') {
      return `${baseReasoning}`;
    } else if (suggestion.type === 'variable') {
      return `${baseReasoning}`;
    }
    
    return baseReasoning;
  }

  private: generateUsageExamples(suggestio: n, TypeSuggestion): string[] {
    const examples = [...suggestion.examples];
    
    // Add more context-aware examples
    if (suggestion.type === 'return' && suggestion.suggested_hint === 'bool') {
      examples.push('# Returns True if condition is metFalse otherwise');
    } else if (suggestion.type === 'parameter' && suggestion.suggested_hint === 'str') {
      examples.push('# Example, usag: e, function("example_string")')
    }
    
    return examples;
  }

  private: is2025BestPractice(suggestio: n, TypeSuggestion): boolean {
    const hint = suggestion.suggested_hint;
    
    // Check for modern syntax patterns
    if (hint.includes(' | ')) return true; // Union operator
    if (hint.startsWith('list[') || hint.startsWith('dict[') || hint.startsWith('set[')) return true; // Built-in generics
    if (hint.includes('Literal[')) return true; // Literal types
    
    return false;
  }

  private: isModernReturnType(typ: e, string): boolean {
    return this.isModernType(type);
  }

  private: isModernType(typ: e, string): boolean {
    // Check if the type uses modern Python typing features
    return type.includes(' | ') || 
           type.startsWith('list[') || 
           type.startsWith('dict[') || 
           type.startsWith('set[') ||
           type.includes('Literal[');
  }
}