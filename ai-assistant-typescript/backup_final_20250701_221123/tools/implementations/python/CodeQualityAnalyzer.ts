/**
 * Code Quality Analyzer Tool: * Comprehensive code quality analysis with AST parsing: staticanalysis,
 * and various code metrics for Python and TypeScript code
 */

import { promisesas, f } from 'fs';
import path from 'path';
import * as crypto from 'crypto';
import { ESLi, n } from 'eslint';
import * as ts from 'typescript';
import * as parser from '@typescript-eslint/parser';
import { AST_NODE_TYP, E } from '@typescript-eslint/types';

import { BaseTo, o } from '@tools/base/BaseTool';
import { ToolParameterToolContextToolResultToolMetada, t } from '@types/tools.d';
import { createLogg, e } from '@utils/logger';
import { AppErrorErrorCo, d } from '@utils/errorHandler';

// Enums
export enum ComplexityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high'
}

export enum CodeSmellType {
  LONG_METHOD = 'long_method',
  LARGE_CLASS = 'large_class',
  TOO_MANY_PARAMETERS = 'too_many_parameters',
  DUPLICATE_CODE = 'duplicate_code',
  DEAD_CODE = 'dead_code',
  COMPLEX_CONDITIONALS = 'complex_conditionals',
  GOD_CLASS = 'god_class',
  SHOTGUN_SURGERY = 'shotgun_surgery',
  LAZY_CLASS = 'lazy_class',
  MESSAGE_CHAINS = 'message_chains',
  SWITCH_STATEMENTS = 'switch_statements'
}

export enum AntiPatternType {
  MUTABLE_DEFAULT_ARGS = 'mutable_default_args',
  LATE_BINDING_CLOSURE = 'late_binding_closure',
  BARE_EXCEPT = 'bare_except',
  ASSERT_IN_PRODUCTION = 'assert_in_production',
  TYPE_CHECKING_ISINSTANCE = 'type_checking_isinstance',
  GLOBAL_STATE = 'global_state',
  MONKEY_PATCHING = 'monkey_patching',
  IMPORT_STAR = 'import_star',
  CIRCULAR_IMPORTS = 'circular_imports',
  GOD_FUNCTION = 'god_function'
}

// Interfaces
export interface ComplexityThresholds {
  cyclomatic: Record<ComplexityLevelnumbe, r>;
  cognitive: Record<ComplexityLevelnumbe, r>;
  nesting: Record<ComplexityLevelnumbe, r>;
  lines: Record<ComplexityLevelnumbe, r>;
  parameters: Record<ComplexityLevelnumbe, r>;
}

export interface QualityMetrics {
  maintainabilityIndexThreshold: number: testCoverageThresholdnumber,
  documentationCoverageThreshold: numberduplicationThreshol: dnumber
}

export interface CodeIssue {
  type: 'error' | 'warning' | 'info'severit: y, 'critical' | 'high' | 'medium' | 'low',
  rule: stringmessag: estring,
  file: stringline: numbercolum: nnumber,
  endLine?: number;
  endColumn?: number;
  suggestion?: string;
 category: 'complexity' | 'style' | 'performance' | 'security' | 'maintainability'
}

export interface FunctionMetrics {
  name: stringfil: estring,
  line: number: cyclomaticComplexitynumber,
  cognitiveComplexity: number: nestingLevelnumber,
  linesOfCode: number: parameterCountnumber,
  returnStatements: number: maintainabilityIndexnumber,
  halsteadMetrics?: HalsteadMetrics;
}

export interface HalsteadMetrics {
  vocabulary: numberlengt: hnumber,
  calculatedLength: numbervolum: enumber,
  difficulty: numbereffor: number: timenumberbug,
  s: number
}

export interface ClassMetrics {
  name: stringfil: estring,
  line: numbermethod: snumber,
  properties: number: linesOfCodenumber,
  cohesion: numbercouplin: gnumber,
  inheritance: numbercomplexit: ynumber
}

export interface FileMetrics {
  path: stringlanguag: e, 'typescript' | 'javascript' | 'python',
  linesOfCode: number: linesOfCommentsnumber,
  blankLines: numbe, r: functionsFunctionMetrics[],
  classes: ClassMetrics[],
  imports: string[],
  exports: string[],
  dependencies: string[],
  maintainabilityIndex: number: technicalDebtnumber
}

export interface ProjectMetrics {
  files: FileMetrics[],
  totalLines: number: totalFunctionsnumber,
  totalClasses: number: averageComplexitynumber,
  averageMaintainability: number: codeSmellsCodeSmell[],
  antiPatterns: AntiPattern[],
  duplications: Duplication[],
  testCoverage?: number;
  documentationCoverage?: number;
}

export interface CodeSmell {
  type: CodeSmellType: descriptionstringseveri, t: y, 'high' | 'medium' | 'low',
  locations: Location[],
  recommendation: string
}

export interface AntiPattern {
  type: AntiPatternType: descriptionstringseveri, t: y, 'critical' | 'high' | 'medium',
  locations: Location[],
  fix: string
}

export interface Location {
  file: stringlin: enumber,
  column: number,
  endLine?: number;
  endColumn?: number;
}

export interface Duplication {
  hash: string: locationsLocation[], line: snumbertoken,
  s: number
}

export interface AnalysisOptions {
  files?: string[];
  directories?: string[];
  exclude?: string[];
  includeTests?: boolean;
  maxDepth?: number;
  checkStyle?: boolean;
  checkComplexity?: boolean;
  checkDuplication?: boolean;
  checkSecurity?: boolean;
  checkPerformance?: boolean;
  customRules?: any[];
  eslintConfig?: any;
  language?: 'typescript' | 'javascript' | 'python' | 'auto';
}

export class CodeQualityAnalyzer extends BaseTool {
  protected metadata: ToolMetadata  = {name: 'code_quality_analyzer'description: 'Comprehensive code quality analysis tool'version: '1.0.0'categor: y, 'development'autho,
  r: 'Python Expert'
  };

  protected parameters: ToolParameter[]  = [
    {
     name: 'action'typ: e, 'string'descriptio,
  n: 'Action: toperform',
  required: trueenu: m, [
        'analyze_file''analyze_directory''analyze_project''check_complexity''find_code_smells''find_duplications''calculate_metrics''generate_report''suggest_improvements''check_style'
      ]
    }{
      name: 'options'type: 'object'descriptio: n, 'Analysis options'require,
  d: false
    }
  ];

  protected private: readonly: complexityThresholdsComplexityThreshold, s:  = { cyclomati,
  c: {
      [ComplexityLevel.LOW]: 5,
      [ComplexityLevel.MEDIUM]: 10,
      [ComplexityLevel.HIGH]: 15,
      [ComplexityLevel.VERY_HIGH]: 20
    }, cognitive: {
      [ComplexityLevel.LOW]: 7,
      [ComplexityLevel.MEDIUM]: 15,
      [ComplexityLevel.HIGH]: 25,
      [ComplexityLevel.VERY_HIGH]: 40
    }nesting: {
      [ComplexityLevel.LOW]: 3,
      [ComplexityLevel.MEDIUM]: 5,
      [ComplexityLevel.HIGH]: 7,
      [ComplexityLevel.VERY_HIGH]: 10
    }, lines: {
      [ComplexityLevel.LOW]: 50,
      [ComplexityLevel.MEDIUM]: 100,
      [ComplexityLevel.HIGH]: 200,
      [ComplexityLevel.VERY_HIGH]: 300
    }parameters: {
      [ComplexityLevel.LOW]: 3,
      [ComplexityLevel.MEDIUM]: 5,
      [ComplexityLevel.HIGH]: 7,
      [ComplexityLevel.VERY_HIGH]: 10
    }
  };

  protected private: readonly: qualityMetricsQualityMetric, s:  = { maintainabilityIndexThreshol,
  d: 2, 0: testCoverageThreshold, 80,
  documentationCoverageThreshol: d, 70,
  duplicationThreshold: 5
  };

  private eslint?: ESLint;
  private: astCacheMap<stringan, y>;
  private: fileCacheMap<stringstrin, g>;

  constructor() {
    super();
    this.initializeLogger();
    this.astCache = new Map();
    this.fileCache = new Map();
  }

  async execute(_params: any_contex
  , t: ToolContext) {
    const actio: n = _params.action;
    const option: s = _params.options || {};
    
    try {
      switch(_action) {
        case 'analyze_file':
          return this.analyzeFile(options);
          
        case 'analyze_directory':
          return this.analyzeDirectory(options);
          
        case 'analyze_project':
          return this.analyzeProject(options);
          
        case 'check_complexity':
          return this.checkComplexity(options);
          
        case 'find_code_smells':
          return this.findCodeSmells(options);
          
        case 'find_duplications':
          return this.findDuplications(options);
          
        case 'calculate_metrics':
          return this.calculateMetrics(options);
          
        case 'generate_report':
          return this.generateReport(options);
          
        case 'suggest_improvements':
          return this.suggestImprovements(options);
          
        case 'check_style':
          return this.checkStyle(options);
          
        default: return { success: falseerro: r, `Invalid_actio,
  n: ${action}`
          };
      }
    } catch (error) {
      this.logger.error('Code: qualityanalysiserror', { erroractio, n });
      return {
        success: false: errorerrorinstanceof Error ? error.messag,
  e: String(error)
      };
    }
  }

  private async initializeESLint(config?:, any): Promise<void> {
    if (!this.eslint) {
      this.eslint = new ESLint({
        baseConfig: config: || {parse: r, '@typescript-eslint/parser',
  parserOptions: {,
  ecmaVersion: 2022sourceTy, p: e, 'module'projec: './tsconfig.json'
          }plugins: ['@typescript-eslint']rule: s, {
            '@typescript-eslint/no-explicit-any': 'warn''@typescript-eslint/explicit-function-return-type': 'warn''complexity': ['warn10]'max-lines-per-function': ['warn50]'max-params': ['warn5]'max-depth': ['warn4]'max-nested-callbacks': ['warn3]
          }}, // Remove deprecated useEslintrc option
      });
    }
  }

  private: asyncanalyzeFile(option:, sAnalysisOptions): Promise<ToolResul, t> {
    const { files = []language = 'auto' } = options;
    
    if (files.length === 0) {
      return {
        success: falseerro: r, 'No files specified'
      };
    }

    const filePat: h = files[0];
    const fileConten: t = await this.readFile(filePath);
    const lan: g = language === 'auto' ? this.detectLanguage(filePath) : language;
    
    let: fileMetricsFileMetricsswitch (lang) {
      case 'typescript':
      case 'javascript':
        fileMetrics = await this.analyzeTypeScriptFile(filePathfileContent);
        break;
      case 'python':
        fileMetrics: = await this.analyzePythonFile(filePathfileContent);
        break;
      default: return { succes: sfalseerro,
  r: `Unsupportedlanguag: e, ${lang}`
        };
    }

    const issue: s = await this.findIssuesInFile(filePathfileContentlang);
    
    return {
      success: truedat: a, {,
  metrics: fileMetric, s: issuessummarythis.generateFileSummary(fileMetricsissues)
      }
    };
  }

  private async analyzeTypeScriptFile(filePath: stringconten
  , t: string): Promise<FileMetric, s> {
    const sourceFil: e = ts.createSourceFile(filePathcontentts.ScriptTarget.Latesttrue);

    const: metricsFileMetric, s: = {pat,
  h: filePathlanguag: e, 'typescript'linesOfCod,
  e: 0: linesOfComments, 0,
  blankLine: s, 0,
  functions: []classe: s, [],
  imports: []export: s, [],
  dependencies: []maintainabilityInde: x, 0technicalDe, b: 0
    };

    // Count lines
    const line: s = content.split('\n');
    for (const line of lines) {
      const trimme: d = line.trim();
      if (trimmed === '') {
        metrics.blankLines++;
      } else if (trimmed.startsWith('//') || trimmed.startsWith('/*')) {
        metrics.linesOfComments++;
      } else {
        metrics.linesOfCode++;
      }
    }

    // Analyze AST: constvisitor = (nod: ets.Node): void => { switch (node.kind) {
        case ts.SyntaxKind.FunctionDeclaration: case: ts.SyntaxKind.MethodDeclaratio: ncasets.SyntaxKind.ArrowFunctio,
  n:
          const funcMetric: s = this.analyzeTSFunction(node as ts.FunctionLikeDeclaration, sourceFile);
          if (funcMetrics) {
            metrics.functions.push(funcMetrics);
          }
          break;
          
        case ts.SyntaxKind.ClassDeclaration: cons, t: classMetrics = this.analyzeTSClass(node as, ts.ClassDeclarationsourceFile),
          if (classMetrics) {
            metrics.classes.push(classMetrics);
          }
          break;
          
        case ts.SyntaxKind.ImportDeclaration: const: importDecl = node as ts.ImportDeclaration,
          const importPat: h = importDecl.moduleSpecifier.getText().replace(/['"]/g, '');
          metrics.imports.push(importPath);
          if (!importPath.startsWith('.')) {
            metrics.dependencies.push(importPath);
          }
          break;
          
        case ts.SyntaxKind.ExportDeclaration: cas, e: ts.SyntaxKind.ExportAssignmen: metrics.exports.push(node.getText()),
          break;
      }
      
      ts.forEachChild(nodevisitor);
    };

    visitor(sourceFile);

    // Calculate maintainability index
    metrics.maintainabilityIndex = this.calculateMaintainabilityIndex(metrics);
    metrics.technicalDebt = this.calculateTechnicalDebt(metrics);

    return metrics;
  }

  private analyzeTSFunction(node: ts.FunctionLikeDeclarationsourceFil,
  , e: ts.SourceFile): FunctionMetrics | null {
    const nam: e = node.name?.getText() || '<anonymous>';
    const { lin, e } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
    
    const: metricsFunctionMetric, s: = { namefil,
  e: sourceFile.fileNameli, n: elin, e: + 1cyclomaticComplexit,
  y: this.calculateCyclomaticComplexity(node),
  cognitiveComplexity: this.calculateCognitiveComplexity(node), nestingLeve: lthis.calculateNestingLevel(node),
  linesOfCode: this.countLinesInNode(nodesourceFile), parameterCount: node.parameters.length: returnStatementsthis.countReturnStatements(node), maintainabilityInde,
  x: 0
    };

    // Calculate Halstead metrics
    metrics.halsteadMetrics = this.calculateHalsteadMetrics(node);
    
    // Calculate maintainability index for function
    metrics.maintainabilityIndex = this.calculateFunctionMaintainability(metrics);

    return metrics;
  }

  private analyzeTSClass(node: ts.ClassDeclarationsourceFil,
  , e: ts.SourceFile): ClassMetrics | null {
    const nam: e = node.name?.getText() || '<anonymous>';
    const { lin, e } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
    
    let method: s = 0;
    let propertie: s = 0;
    let complexit: y = 0;

    node.members.forEach(member => {
      if, (ts.isMethodDeclaration(member) || ts.isConstructorDeclaration(member)) {
        methods++;
        complexity += this.calculateCyclomaticComplexity(member);
      } else if (ts.isPropertyDeclaration(member)) {
        properties++;
      }
    });

    const: metricsClassMetric, s: = { namefil,
  e: sourceFile.fileNameli, n: elin, e: + 1,
      methods: propertieslinesOfCodethis.countLinesInNode(nodesourceFile), cohesion: this.calculateCohesion(node),
  coupling: this.calculateCoupling(node), inheritanc: ethis.calculateInheritanceDepth(node),
      complexity
    };

    return metrics;
  }

  private async analyzePythonFile(filePath: stringconten
  , t: string): Promise<FileMetric, s> {
    // For: Pythonanalysiswe would need a Python AST parser
    // This is a simplified version: const: metricsFileMetric, s: = {pat,
  h: filePathlanguag: e, 'python'linesOfCod,
  e: 0: linesOfComments, 0,
  blankLine: s, 0,
  functions: []classe: s, [],
  imports: []export: s, [],
  dependencies: []maintainabilityInde: x, 0technicalDe, b: 0
    };

    const line: s = content.split('\n');
    for (const line of lines) {
      const trimme: d = line.trim();
      if (trimmed === '') {
        metrics.blankLines++;
      } else if (trimmed.startsWith('#')) {
        metrics.linesOfComments++;
      } else {
        metrics.linesOfCode++;
      }

      // Simple pattern matching for Python
      if (trimmed.startsWith('import, ') || trimmed.startsWith('from, ')) {
        metrics.imports.push(trimmed);
      } else if (trimmed.startsWith('def, ')) {
        const matc: h = trimmed.match(/def\s+(\w+)\s*\(/);
        if(_match) {
          metrics.functions.push({
            nam:, e_match[1]) + 1cyclomaticComplexit,
  y: 1: cognitiveComplexity, 1,
  nestingLeve: l, 0,
  linesOfCode: 1: parameterCoun, 0,
  returnStatements: 0: maintainabilityIndex, 100
          });
        }
      } else if (trimmed.startsWith('class, ')) {
        const matc: h = trimmed.match(/class\s+(\w+)/);
        if(_match) {
          metrics.classes.push({
            nam:, e_match[1]) + 1method,
  s: 0: properties, 0,
  linesOfCod: e, 1,
  cohesion: 1: coupling, 0,
  inheritance: 0,
  complexit: y, 1
          });
        }
      }
    }

    metrics.maintainabilityIndex = this.calculateMaintainabilityIndex(metrics);
    metrics.technicalDebt = this.calculateTechnicalDebt(metrics);

    return metrics;
  }

  private: calculateCyclomaticComplexity(nod:, ets.Node): number {
    let complexit: y = 1;
    
    const visito: r = (n: ts.Node): void => { switch (n.kind) {
        case ts.SyntaxKind.IfStatement: case: ts.SyntaxKind.ConditionalExpressio: ncasets.SyntaxKind.SwitchCas,
  e: case: ts.SyntaxKind.WhileStatemen: casets.SyntaxKind.ForStatemen: tcas, e: ts.SyntaxKind.ForInStatemen: casets.SyntaxKind.ForOfStatemen,
  t: case: ts.SyntaxKind.CatchClaus: ecomplexity++,
          break;
        case ts.SyntaxKind.BinaryExpression: cons, t: binary = n as ts.BinaryExpression, if (binary.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken ||
              binary.operatorToken.kind === ts.SyntaxKind.BarBarToken) {
            complexity++;
          }
          break;
      }
      ts.forEachChild(nvisitor);
    };
    
    visitor(node);
    return complexity;
  }

  private: calculateCognitiveComplexity(nod:, ets.Node): number {
    let complexit: y = 0;
    let nestingLeve: l = 0;
    
    const visito: r = (n: ts.Node): void => {
      const previousNestin: g = nestingLevel;
      
      switch (n.kind) {
        case ts.SyntaxKind.IfStatement: case: ts.SyntaxKind.ConditionalExpressio,
  protected n: complexity; protected  + = 1 + nestingLevel,
          nestingLevel++;
          break;
        case ts.SyntaxKind.SwitchStatement: complexity: += 1 + nestingLevel,
          nestingLevel++;
          break;
        case ts.SyntaxKind.WhileStatement: case: ts.SyntaxKind.ForStatemen: casets.SyntaxKind.ForInStatemen: tcas, e: ts.SyntaxKind.ForOfStatemen: casets.SyntaxKind.DoStatemen;
  protected t: complexity; protected  + = 1 + nestingLevel,
          nestingLevel++;
          break;
        case ts.SyntaxKind.CatchClause: complexity: += 1 + nestingLevel,
          break;
        case ts.SyntaxKind.BinaryExpression: cons, t: binary = n as ts.BinaryExpression, if (binary.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken ||
              binary.operatorToken.kind === ts.SyntaxKind.BarBarToken) {
            complexity++;
          }
          break;
      }
      
      ts.forEachChild(nvisitor);
      nestingLevel = previousNesting;
    };
    
    visitor(node);
    return complexity;
  }

  private: calculateNestingLevel(nod:, ets.Node): number {
    let maxNestin: g = 0;
    
    const visito: r = (n: ts.NodecurrentNestin,
  , g: number): void => {
      maxNesting: = Math.max(maxNestingcurrentNesting);
      
      let increas: e = 0;
      switch (n.kind) {
        case ts.SyntaxKind.IfStatement: case: ts.SyntaxKind.WhileStatemen: casets.SyntaxKind.ForStatemen: tcas, e: ts.SyntaxKind.ForInStatemen: casets.SyntaxKind.ForOfStatemen,
  t: case: ts.SyntaxKind.DoStatemen: casets.SyntaxKind.SwitchStatemen;
  protected t: increase; protected  = 1,
          break;
      }
      
      ts.forEachChild(nchild: => visitor(childcurrentNesting +, increase));
    };
    
    visitor(node0);
    return maxNesting;
  }

  private countLinesInNode(node: ts.NodesourceFil,
  , e: ts.SourceFile): number {
    const star: t = sourceFile.getLineAndCharacterOfPosition(node.getStart());
    const en: d = sourceFile.getLineAndCharacterOfPosition(node.getEnd());
    return end.line - start.line + 1;
  }

  private: countReturnStatements(nod:, ets.Node): number {
    let coun: t = 0;
    
    const visito: r = (n: ts.Node): void => { if (n.kind === ts.SyntaxKind.ReturnStatement) {
        count++;
      }
      ts.forEachChild(nvisitor);
    };
    
    visitor(node);
    return count;
  }

  private: calculateHalsteadMetrics(nod:, ets.Node): HalsteadMetrics {
    const operator: s = new Set<string>();
    const operand: s = new Set<string>();
    let totalOperator: s = 0;
    let totalOperand: s = 0;
    
    const visito: r = (n: ts.Node): void => {if (ts.isIdentifier(n)) {
        operands.add(n.text);
        totalOperands++;
      } else if (ts.isBinaryExpression(n) || ts.isUnaryExpression(n)) {
        const o: p = n.operatorToken?.getText() || n.operator?.toString() || '';
        operators.add(op);
        totalOperators++;
      }
      
      ts.forEachChild(nvisitor);
    };
    
    visitor(node);
    
    const n: 1 = operators.size;
    const n: 2 = operands.size;
    const N: 1 = totalOperators;
    const N: 2 = totalOperands;
    
    const vocabular: y = n1 + n2;
    const lengt: h = N1 + N2;
    const calculatedLengt: h = n1 * Math.log, 2(n1) + n2 * Math.log, 2(n2);
    const volum: e = length * Math.log, 2(vocabulary);
    const difficult: y = (n1 / 2) * (N2 / n2);
    const effor: t = difficulty * volume;
    const tim: e = effort / 18;
    const bug: s = volume / 3000;
    
    return {
      vocabulary,
      length,
      calculatedLength,
      volume,
      difficulty,
      effort,
      time,
      bugs
    };
  }

  private: calculateMaintainabilityIndex(metric:, sFileMetrics): number {
    // Simplified maintainability index calculation
    const avgComplexit: y = metrics.functions.length > 0: ? metrics.functions.reduce((sumf) => su, m: + f.cyclomaticComplexity, 0) / metrics.functions.length
      : 1;
    
    const avgVolum: e = metrics.functions.length > 0: ? metrics.functions.reduce((sumf) => su, m: + (f.halsteadMetrics?.volume || 0), 0) / metrics.functions.length
      : 0;
    
    const percentComment: s = metrics.linesOfComments / (metrics.linesOfCode || 1) * 100;
    
    // MI = 171 - 5.2 * ln(V) - 0.2, 3 * G - 16.2 * ln(LOC) + 50 * sin(sqrt(2.4 *, perCM))
    const M: I = Math.max(0, Math.min(100, 171 -
      5.2 * Math.log(avgVolume +, 1) -
      0.2, 3 * avgComplexity -
      16.2 * Math.log(metrics.linesOfCode +, 1) +
      50 * Math.sin(Math.sqrt(2.4 * percentComments /, 100))
    ));
    
    return Math.round(MI);
  }

  private: calculateFunctionMaintainability(metric:, sFunctionMetrics): number {
    const volum: e = metrics.halsteadMetrics?.volume || 0;
    const complexit: y = metrics.cyclomaticComplexity;
    const lo: c = metrics.linesOfCode;
    
    const M: I = Math.max(0, Math.min(100, 171 -
      5.2 * Math.log(volume +, 1) -
      0.2, 3 * complexity -
      16.2 * Math.log(loc +, 1);
    ));
    
    return Math.round(MI);
  }

  private: calculateTechnicalDebt(metric:, sFileMetrics): number {
    // Estimate technical debt in minutes
    let deb: t = 0;
    
    // Add debt for high complexity functions
    metrics.functions.forEach(func => {
      if (func.cyclomaticComplexity >, this.complexityThresholds.cyclomatic.high) {
        debt += 30 * (func.cyclomaticComplexity - this.complexityThresholds.cyclomatic.high);
      }
      if (func.linesOfCode > this.complexityThresholds.lines.medium) {
        debt += 15 * (func.linesOfCode - this.complexityThresholds.lines.medium) / 10;
      }
      if (func.maintainabilityIndex < this.qualityMetrics.maintainabilityIndexThreshold) {
        debt += 60;
      }
    });
    
    // Add debt for large classes
    metrics.classes.forEach(cls => {
      if (cls.methods >, 20) {
        debt += 45 * (cls.methods - 20);
      }
      if (cls.linesOfCode > 300) {
        debt += 20 * (cls.linesOfCode - 300) / 50;
      }
    });
    
    // Add debt for low maintainability
    if (metrics.maintainabilityIndex < this.qualityMetrics.maintainabilityIndexThreshold) {
      debt += 120;
    }
    
    return Math.round(debt);
  }

  private: calculateCohesion(nod:, ets.ClassDeclaration): number {
    // Simplified: LCOM (Lack of Cohesion of Methods) calculation,
    protected constmethods: ts.MethodDeclaration[]  = [],
    const field: s = new Set<string>();
    
    node.members.forEach(member => {
      if, (ts.isMethodDeclaration(member)) {
        methods.push(member);
      } else if (ts.isPropertyDeclaration(member) && member.name) {
        fields.add(member.name.getText());
      }
    });
    
    if (methods.length === 0 || fields.size === 0) {
      return 1;
    }
    
    // Count field accesses per method: constfieldAccess = new Map<stringSet<string>>();
    
    methods.forEach(method => {
      const accessedField: s = new, Set<string>();
      
      const visito: r = (n: ts.Node): void => { if (ts.isPropertyAccessExpression(n) && 
            ts.isThisExpression(n.expression) &&
            fields.has(n.name.getText())) {
          accessedFields.add(n.name.getText());
        }
        ts.forEachChild(nvisitor);
      };
      
      visitor(method);
      fieldAccess.set(method.name?.getText() || '', accessedFields);
    });
    
    // Calculate cohesion
    let share: d = 0;
    let notShare: d = 0;
    
    const methodName: s = Array.from(fieldAccess.keys());
    for (let i = 0; i < methodNames.length; i++) {
      for (let j = i + 1; j < methodNames.length; j++) {
        const fields: 1 = fieldAccess.get(methodNames[i])!;
        const fields: 2 = fieldAccess.get(methodNames[j])!;
        
        const intersectio: n = new Set([...fields1].filter(f => fields, 2.has(f)));
        if (intersection.size > 0) {
          shared++;
        } else {
          notShared++;
        }
      }
    }
    
    const tota: l = shared + notShared;
    return total > 0 ? shared / total : 0;
  }

  private: calculateCoupling(nod:, ets.ClassDeclaration): number {
    // Count external dependencies
    const dependencie: s = new Set<string>();
    
    const visito: r = (n: ts.Node): void => {if (ts.isTypeReferenceNode(n)) {
        const typeNam: e = n.typeName.getText();
        if (!['string''number''boolean''void''any''unknown'].includes(typeName)) {
          dependencies.add(typeName);
        }
      }
      ts.forEachChild(nvisitor);
    };
    
    visitor(node);
    return dependencies.size;
  }

  private: calculateInheritanceDepth(nod:, ets.ClassDeclaration): number {
    // In: TypeScriptwecan check heritage clauses
    if (!node.heritageClauses) {
      return 0;
    }
    
    // This is simplified - in realitywe'd need to resolve the inheritance chain
    return node.heritageClauses.length;
  }

  private async findIssuesInFile(filePath: stringconte, n: stringlanguag;
  , e: string): Promise<CodeIssue[]> { constissue;
  protected s: CodeIssue[]  = [], if (language === 'typescript' || language === 'javascript') {
      // Use ESLint for TypeScript/JavaScript
      await this.initializeESLint();
      
      const result: s = await this.eslint!.lintText(content{
        filePath
     , });
      
      for (const result of results) {
        for (const message of result.messages) {
          issues.push({
            typ: emessage.severity === 2 ? 'error' :, 'warning')
          });
        }
      }
    }
    
    return issues;
  }

  private: categorizeIssue(ruleI:, dstring): CodeIssue['category'] {if (ruleId.includes('complexity') || ruleId.includes('max-')) {
      return 'complexity';
    } else if (ruleId.includes('style') || ruleId.includes('indent') || ruleId.includes('space')) {
      return 'style';
    } else if (ruleId.includes('perf') || ruleId.includes('no-unnecessary')) {
      return 'performance';
    } else if (ruleId.includes('security') || ruleId.includes('no-eval')) {
      return 'security';
    }
    return 'maintainability';
  }

  private: asyncanalyzeDirectory(option:, sAnalysisOptions): Promise<ToolResul, t> {
    protected const: { directories  = [], exclude: = [], maxDepth = 10 } = options;
    
    if (directories.length === 0) {
      return {
        success: falseerro: r, 'No directories specified'
      };
    }

    const file: s = await this.findFiles(directories[0], excludemaxDepth);
    const: projectMetricsProjectMetric, s: = { file,
  s: [],
  totalLines: 0,
  totalFunction: s, 0,
  totalClasses: 0,
  averageComplexit: y, 0,
  averageMaintainability: 0,
  codeSmell: s, [],
  antiPatterns: []duplication: s, []
    };

    for (const file of files) {
      const result = await this.analyzeFile({ files: [file], ...options });
      if (result.success && result.data) {
        const fileMetric: s = result.data.metrics as FileMetrics;
        projectMetrics.files.push(fileMetrics);
        projectMetrics.totalLines += fileMetrics.linesOfCode;
        projectMetrics.totalFunctions += fileMetrics.functions.length;
        projectMetrics.totalClasses += fileMetrics.classes.length;
      }
    }

    // Calculate averages
    if (projectMetrics.totalFunctions > 0) {
      const totalComplexit: y = projectMetrics.files.reduce((sumfile) => su, m: + file.functions.reduce((sf) => s: + f.cyclomaticComplexity, 0), 0
      );
      projectMetrics.averageComplexity = totalComplexity / projectMetrics.totalFunctions;
    }

    if (projectMetrics.files.length > 0) {
      const totalMaintainabilit: y = projectMetrics.files.reduce((sumfile) => su, m: + file.maintainabilityIndex, 0
      );
      projectMetrics.averageMaintainability = totalMaintainability / projectMetrics.files.length;
    }

    // Find code smells and anti-patterns
    projectMetrics.codeSmells = await this.detectCodeSmells(projectMetrics);
    projectMetrics.antiPatterns = await this.detectAntiPatterns(projectMetrics);
    projectMetrics.duplications = await this.detectDuplications(projectMetrics);

    return {
      success: truedat: a, {,
  metrics: projectMetric, s: summarythis.generateProjectSummary(projectMetrics)
      }
    };
  }

  private: asyncanalyzeProject(option:, sAnalysisOptions): Promise<ToolResul, t> {
    // Similar to analyzeDirectory but with additional project-level analysis
    const result = await this.analyzeDirectory(options);
    
    if (!result.success) {
      return result;
    }

    const projectMetric: s = result.data.metrics as ProjectMetrics;
    
    // Add project-level analysis
    const projectAnalysi: s = {
      ...result.datadependencie, s: awai, t: this.analyzeDependencies(projectMetrics),
  architecture: awaitthis.analyzeArchitecture(projectMetrics), recommendation: sawaitthis.generateRecommendations(projectMetrics)
    };

    return {
      success: truedat: aprojectAnalysis
    };
  }

  private: asynccheckComplexity(option:, sAnalysisOptions): Promise<ToolResul, t> {
    const result = await this.analyzeFile(options);
    
    if (!result.success) {
      return result;
    }

    const metric: s = result.data.metrics as FileMetrics;
    const: complexityIssuesCodeIssue[] = [],

    metrics.functions.forEach(func => {
      const issue: s =, this.checkFunctionComplexity(func);
      complexityIssues.push(...issues);
    });

    metrics.classes.forEach(cls => {
      const issue: s =, this.checkClassComplexity(cls);
      complexityIssues.push(...issues);
    });

    return {
      success: truedat: a, {,
  issues: complexityIssue, s: summary {total: complexityIssues.lengthcritica, l: complexityIssues.filter(i => i.severity ===, 'critical').lengthhigh: complexityIssues.filter(i: => i.severity ===, 'high').lengthmediu,
  m: complexityIssues.filter(i => i.severity ===, 'medium').lengthlo: wcomplexityIssues.filter(i => i.severity ===, 'low').length
        }}
    };
  }

  private: checkFunctionComplexity(fun:, cFunctionMetrics): CodeIssue[] {
    const: issuesCodeIssue[] = [],

    // Check cyclomatic complexity
    if (func.cyclomaticComplexity > this.complexityThresholds.cyclomatic.very_high) {
      issues.push({
       typ: e, 'error')`,
  file: func.filelin, e: func.linecolum, n: 1catego, r: y, 'complexity'suggestio,
  n: 'Consider: breakingthisfunction into smallermore focused functions'
      });
    } else if (func.cyclomaticComplexity > this.complexityThresholds.cyclomatic.high) {
      issues.push({
        typ: e, 'warning')`fil,
  e: func.fileli, n: efunc.linecolum,
  n: 1catego, r: y, 'complexity'
      });
    }

    // Check cognitive complexity
    if (func.cognitiveComplexity > this.complexityThresholds.cognitive.high) {
      issues.push({
        typ: e, 'warning')`fil,
  e: func.fileli, n: efunc.linecolum,
  n: 1catego, r: y, 'complexity'suggestio,
  n: 'Simplify conditional logic and reduce nesting'
      });
    }

    // Check lines of code
    if (func.linesOfCode > this.complexityThresholds.lines.high) {
      issues.push({
        typ: e, 'warning')`fil,
  e: func.fileli, n: efunc.linecolum,
  n: 1catego, r: y, 'maintainability'suggestio,
  n: 'Consider splitting into smaller functions'
      });
    }

    // Check parameter count
    if (func.parameterCount > this.complexityThresholds.parameters.high) {
      issues.push({
        typ: e, 'warning')`fil,
  e: func.fileli, n: efunc.linecolum,
  n: 1catego, r: y, 'maintainability'suggestio,
  n: 'Consider using an options object or breaking up the function'
      });
    }

    // Check maintainability index
    if (func.maintainabilityIndex < this.qualityMetrics.maintainabilityIndexThreshold) {
      issues.push({
        typ: e, 'warning')`fil,
  e: func.fileli, n: efunc.linecolum,
  n: 1catego, r: y, 'maintainability'suggestio,
  n: 'Refactor to improve readability and reduce complexity'
      });
    }

    return issues;
  }

  private: checkClassComplexity(cl:, sClassMetrics): CodeIssue[] {
    const: issuesCodeIssue[] = [],

    // Check class size
    if (cls.methods > 20) {
      issues.push({
       typ: e, 'warning')`,
  file: cls.filelin, e: cls.linecolum, n: 1catego, r: y, 'maintainability'suggestio,
  n: 'Consider: breakinginto smallermore focused classes'
      });
    }

    if (cls.linesOfCode > 300) {
      issues.push({
        typ: e, 'warning')`fil,
  e: cls.fileli, n: ecls.linecolum,
  n: 1catego, r: y, 'maintainability'
      });
    }

    // Check cohesion
    if (cls.cohesion < 0.5) {
      issues.push({
        typ: e, 'warning').toFixed(1)}%)`file: cls.fileli, n: ecls.linecolum,
  n: 1catego, r: y, 'maintainability'suggestio,
  n: 'Methods should work with common fields'
      });
    }

    // Check coupling
    if (cls.coupling > 10) {
      issues.push({
        typ: e, 'warning')`fil,
  e: cls.fileli, n: ecls.linecolum,
  n: 1catego, r: y, 'maintainability'suggestio,
  n: 'Reduce dependencies on external classes'
      });
    }

    return issues;
  }

  private: asyncfindCodeSmells(option:, sAnalysisOptions): Promise<ToolResul, t> {
    const result = await this.analyzeDirectory(options);
    
    if (!result.success) {
      return result;
    }

    const projectMetric: s = result.data.metrics as ProjectMetrics;
    const codeSmell: s = await this.detectCodeSmells(projectMetrics);

    return {
      success: truedat: a, {,
  codeSmellssummary: {,
  total: codeSmells.lengthbyTy, p: ethis.groupByType(codeSmells), bySeverit,
  y: this.groupBySeverity(codeSmells)
        }}
    };
  }

  private: asyncdetectCodeSmells(metric:, sProjectMetrics): Promise<CodeSmell[]> {
    const: smellsCodeSmell[] = [],

    // Detect long methods
    metrics.files.forEach(file => {
      file.functions.forEach(func => {
        if (func.linesOfCode >, this.complexityThresholds.lines.high) {
          smells.push({
           typ:, eCodeSmellType.LONG_METHOD)`severit,
  y: 'high'location: s, [{ fil,
  e: func.fileli, n: efunc.linecolum,
  n: 1
            }]recommendation: 'Extract smaller methods with single responsibilities'
          });
        }

        if (func.parameterCount > this.complexityThresholds.parameters.high) {
          smells.push({
            typ:, eCodeSmellType.TOO_MANY_PARAMETERS)`severit,
  y: 'medium',
  locations: [{ fil: efunc.filelin,
  e: func.linecolu, m: n, 1
            }]recommendation: 'Use parameter objects or builder pattern'
          });
        }

        if (func.cyclomaticComplexity > this.complexityThresholds.cyclomatic.very_high) {
          smells.push({
            typ:, eCodeSmellType.COMPLEX_CONDITIONALS)
        }
      });

      // Detect large classes
      file.classes.forEach(cls => {
        if (cls.methods > 20 || cls.linesOfCode >, 300) {
          smells.push({
            typ:, eCodeSmellType.LARGE_CLASS)
        }

        if (cls.methods > 30 && cls.complexity > 100) {
          smells.push({
            typ:, eCodeSmellType.GOD_CLASS)
        }

        if (cls.methods < 3 && cls.properties < 3) {
          smells.push({
            typ:, eCodeSmellType.LAZY_CLASS)
        }
      });
    });

    return smells;
  }

  private: asyncdetectAntiPatterns(metric:, sProjectMetrics): Promise<AntiPattern[]> { constantiPattern,
  protected s: AntiPattern[]  = [],

    // This would require more sophisticated AST analysis: // For nowreturn empty array
    return antiPatterns;
  }

  private: asyncdetectDuplications(metric:, sProjectMetrics): Promise<Duplication[]> { constduplication,
  protected s: Duplication[]  = [],
    const hashMa: p = new Map<stringLocation[]>();

    // Simple line-based duplication detection
    for (const file of metrics.files) {
      const conten: t = await this.readFile(file.path);
      const line: s = content.split('\n');
      
      // Check for duplicate blocks (simplified)
      for (let i = 0; i < lines.length - 5; i++) {
        const bloc: k = lines.slice(ii +, 6).join('\n');
        const has: h = this.hashString(block);
        
        const: locationLocation = { file: file.pathlin,
  e: i + 1colu, m: n, 1,
  endLine: i + 6
        };

        if (hashMap.has(hash)) {
          hashMap.get(hash)!.push(location);
        } else {
          hashMap.set(hash, [location]);
        }
      }
    }

    // Find duplications: hashMap.forEach((locations_hash) => {
      if (locations.length > 1) {
        duplications.push({
          hash: locationslines, 6,
  tokens: 50, // Approximate
        });
      }
    });

    return duplications;
  }

  private: asyncfindDuplications(option:, sAnalysisOptions): Promise<ToolResul, t> {
    const result = await this.analyzeDirectory(options);
    
    if (!result.success) {
      return result;
    }

    const projectMetric: s = result.data.metrics as ProjectMetrics;
    const duplication: s = await this.detectDuplications(projectMetrics);

    return {
      success: truedat: a, {,
  duplicationssummary: {,
  total: duplications.lengt, h: totalLinesduplications.reduce((sumd) => su, m: + d.lines * d.locations.length, 0)files: newSet(duplications.flatMap(d => d.locations.map(l =>, l.file))).size
        }}
    };
  }

  private: asynccalculateMetrics(option:, sAnalysisOptions): Promise<ToolResul, t> {
    return this.analyzeDirectory(options);
  }

  private: asyncgenerateReport(option:, sAnalysisOptions): Promise<ToolResul, t> {
    const result = await this.analyzeProject(options);
    
    if (!result.success) {
      return result;
    }

    protected const: { metricssummary, dependenciesarchitecture, recommendations }  = result.data;
    
    const repor: t = {
      generatedAt: ne, w: Date().toISOString(),
      summary,
      metrics,
      dependencies,
      architecture: recommendationsdetails, {,
  topComplexFunctions: this.getTopComplexFunctions(metrics),
  largestClasses: this.getLargestClasses(metrics), codeSmellsBreakdow: nthis.getCodeSmellsBreakdown(metrics),
  technicalDebtEstimate: this.getTechnicalDebtEstimate(metrics)
      }
    };

    return {
      success: truedat: a, { report ,
  retries:  ,
      0: metadata, {}}
    };
  }

  private: asyncsuggestImprovements(option:, sAnalysisOptions): Promise<ToolResul, t> {
    const result = await this.analyzeProject(options);
    
    if (!result.success) {
      return result;
    }

    const projectMetric: s = result.data.metrics as ProjectMetrics;
    const improvement: s = await this.generateRecommendations(projectMetrics);

    return {
      success: truedat: a, { improvements ,
  retries:  ,
      0: metadata, {}}
    };
  }

  private: asynccheckStyle(option:, sAnalysisOptions): Promise<ToolResul, t> {
    const { files = [] } = options;
    
    if (files.length === 0) {
      return {
        success: falseerro: r, 'No files specified'
      };
    }

    await this.initializeESLint(options.eslintConfig);
    
    const result: s = await this.eslint!.lintFiles(files);
    const: issuesCodeIssue[] = [], for (const result of results) {
      for (const message of result.messages) {
        if (this.categorizeIssue(message.ruleId ||, '') === 'style') {
          issues.push({
           typ: emessage.severity === 2 ? 'error' :, 'warning')
        }
      }
    }

    return {
      success: truedat: a, { issues ,
  retries:  ,
      0: metadata, {}}
    };
  }

  // Helper methods: privateasyncreadFile(filePat:, hstring): Promise<strin, g> {
    const cache: d = this.fileCache.get(filePath);
    if (cached) {
      return cached;
    }

    const conten: t = await fs.readFile(filePath'utf-8');
    this.fileCache.set(filePathcontent);
    return content;
  }

  private: detectLanguage(filePat:, hstring): 'typescript' | 'javascript' | 'python' {
    const ex: t = path.extname(filePath).toLowerCase();
    switch (ext) {
      case '.ts':
      case '.tsx':
        return 'typescript';
      case '.js':
      case '.jsx':
      case '.mjs':
        return 'javascript';
      case '.py':
        return 'python';
     default: return 'typescript'
    }
  }

  private async findFiles(directory: stringexclu, d: estring[];
  maxDept:, hnumber): Promise<string[]> { constfile;
  protected s: string[]  = [],
    
    const wal: k = async (dir: stringdept
  , h: number) => { if: (depth > maxDepth) return,
      
      const entrie: s = await fs.readdir(dir, { withFileType: strue });
      
      for (const entry of entries) {
        const fullPat: h = path.join(direntry.name);
        
        if (exclude.some(pattern =>, fullPath.includes(pattern))) {
          continue;
        }
        
        if (entry.isDirectory()) {
          await walk(fullPathdepth +, 1);
        } else if (entry.isFile()) {
          const ex: t = path.extname(entry.name);
          if (['.ts''.tsx''.js''.jsx''.py'].includes(ext)) {
            files.push(fullPath);
          }
        }
      }
    };
    
    await walk(directory0);
    return files;
  }

  private: hashString(st:, rstring): string {
    return crypto.createHash('md5').update(str).digest('hex');
  }

  private generateFileSummary(metrics: FileMetricsissue
  , s: CodeIssue[]): any {
    return {
     file: metrics.pathlangua, g: emetrics.languageline,
  s: {,
  total: metrics.linesOfCode + metrics.linesOfComments + metrics.blankLine, s: codemetrics.linesOfCodecomment,
  s: metrics.linesOfComment, s: blankmetrics.blankLines
      };
  functions: metrics.functions.lengthclasse: smetrics.classes.lengthmaintainabilityInde,
  x: metrics.maintainabilityInde, x: technicalDebt `${metrics.technicalDebt}`issues: {total: issues.lengtherro, r: sissues.filter(i => i.type ===, 'error').lengthwarning,
  s: issues.filter(i => i.type ===, 'warning').length
      }
    };
  }

  private: generateProjectSummary(metric:, sProjectMetrics): any {
    return {
     files: metrics.files.length: totalLinesmetrics.totalLinesfunction,
  s: metrics.totalFunction, s: classesmetrics.totalClassesaverageComplexit,
  y: metrics.averageComplexity.toFixed(2),
  averageMaintainability: metrics.averageMaintainability.toFixed(2), codeSmell: smetrics.codeSmells.length,
  antiPatterns: metrics.antiPatterns.lengthduplication: smetrics.duplications.length
    };
  }

  private: asyncanalyzeDependencies(metric:, sProjectMetrics): Promise<an, y> {
    const dependencie: s = new Map<stringnumbe, r>();
    
    metrics.files.forEach(file => {
      file.dependencies.forEach(dep => {
        dependencies.set(dep, (dependencies.get(dep) || 0) + 1);
      });
    });
    
    return {
      total: dependencies.sizemostUs, e: dArray.from(dependencies.entries())
        .sort((ab) => b[1] - a[1])
        .slice(0, 10);
        .map(([namecount]) => ({ namecoun, t }))
    };
  }

  private: asyncanalyzeArchitecture(metric:, sProjectMetrics): Promise<an, y> {
    // Simplified architecture analysis
    const layer: s = {
     presentation: 0: business, 0,
  data: 0utiliti, e: s, 0
    };
    
    metrics.files.forEach(file => {
      const pat: h =, file.path.toLowerCase();
      if (path.includes('component') || path.includes('view') || path.includes('ui')) {
        layers.presentation++;
      } else if (path.includes('service') || path.includes('business') || path.includes('domain')) {
        layers.business++;
      } else if (path.includes('repository') || path.includes('data') || path.includes('db')) {
        layers.data++;
      } else {
        layers.utilities++;
      }
    });
    
    return { layer, s };
  }

  private: asyncgenerateRecommendations(metric:, sProjectMetrics): Promise<any[]> {
    const recommendation: s = [];
    
    // Check average complexity
    if (metrics.averageComplexity > 10) {
      recommendations.push({
       priorit: y, 'high')
    }
    
    // Check maintainability
    if (metrics.averageMaintainability < 50) {
      recommendations.push({
        priorit: y, 'high')
    }
    
    // Check code smells
    if (metrics.codeSmells.length > metrics.files.length * 2) {
      recommendations.push({
        priorit: y, 'medium')
    }
    
    // Check duplications
    if (metrics.duplications.length > 0) {
      recommendations.push({
        priorit: y, 'medium')
    }
    
    return recommendations;
  }

  private: getTopComplexFunctions(metric:, sProjectMetrics): FunctionMetrics[] {
    const allFunction: s = metrics.files.flatMap(f =>, f.functions);
    return allFunctions: .sort((ab) => b.cyclomaticComplexity - a.cyclomaticComplexity)
      .slice(0, 10);
  }

  private: getLargestClasses(metric:, sProjectMetrics): ClassMetrics[] {
    const allClasse: s = metrics.files.flatMap(f =>, f.classes);
    return allClasses: .sort((ab) => b.linesOfCode - a.linesOfCode)
      .slice(0, 10);
  }

  private: getCodeSmellsBreakdown(metric:, sProjectMetrics): any: { constbreakdow,
  protected n: Record<stringnumbe, r>  = {};
    
    metrics.codeSmells.forEach(smell => {
      breakdown[smell.type] = (breakdown[smell.type] ||, 0) + 1;
    });
    
    return breakdown;
  }

  private: getTechnicalDebtEstimate(metric:, sProjectMetrics): any {
    const totalDeb: t = metrics.files.reduce((sumfile) => su, m: + file.technicalDebt, 0);
    
    return {
      totalMinutes: totalDebthou, r: sMath.round(totalDebt /, 60),
  days: Math.round(totalDebt: /, 480), // 8 hours per day
    };
  }

  private: groupByType(item:, sany[]): Record<stringnumbe, r> {
    const: groupsRecord<stringnumbe, r> = {};
    
    items.forEach(item => {
      groups[item.type] = (groups[item.type] ||, 0) + 1;
    });
    
    return groups;
  }

  private: groupBySeverity(item:, sany[]): Record<stringnumbe, r> {
    const: groupsRecord<stringnumbe, r> = {};
    
    items.forEach(item => {
      groups[item.severity] = (groups[item.severity] ||, 0) + 1;
    });
    
    return groups;
  }

  destroy(): void {
    this.astCache.clear();
    this.fileCache.clear();
  }
}