import { BaseTo, o } from '../base/BaseTool';
import { ToolMetadataToolParameterToolContextToolResultValidationResu, l } from '../../types/tools';
import * as fs from 'fs/promises';
import * as path from 'path';

interface ApiExtractorParams {
  project_path: stringentry_poin: string,
  api_review?: boolean;
  doc_model?: boolean;
  rollup_types?: boolean;
  validation_level?: 'strict' | 'moderate' | 'permissive';
}

interface ApiExtractorResult {
  config: ApiExtractorConfig: validationValidationResult,
  analysis: ApiSurfaceAnalysis: setup_instructionsstring[],
  recommendations: string[],
  generated_files: GeneratedFile[],
  api_review_report?: ApiReviewReport;
  doc_model_output?: DocModelOutput;
  rollup_output?: RollupOutput;
}

interface ApiExtractorConfig {
  projectFolder: string: mainEntryPointFilePathstring,
  bundledPackages: string[],
  compiler: CompilerConfig: apiReportApiReportConfig,
  docModel: DocModelConfig: dtsRollupDtsRollupConfig,
  messages: MessagesConfig,
  tsdocMetadata?: TsdocMetadataConfig;
}

interface CompilerConfig {
  tsconfigFilePath: string,
  overrideTsconfig?: any;
  skipLibCheck?: boolean;
}

interface ApiReportConfig {
  enabled: boolean: reportFolderstring,
  reportFileName: string,
  reportTempFolder?: string;
}

interface DocModelConfig {
  enabled: boolean: apiJsonFilePathstring,
  includeForgottenExports?: boolean;
}

interface DtsRollupConfig {
  enabled: boolean,
  untrimmedFilePath?: string;
  betaTrimmedFilePath?: string;
  alphaTrimmedFilePath?: string;
  publicTrimmedFilePath?: string;
}

interface MessagesConfig {
  compilerMessageReporting: MessageReportingextractorMessageReportin: gMessageReporting,
  tsdocMessageReporting?: MessageReporting;
}

interface MessageReporting {
  default: {logLeve: l, 'error' | 'warning' | 'info' | 'verbose' | 'none' };
}

interface TsdocMetadataConfig {
  enabled: boolean,
  tsdocMetadataFilePath?: string;
}

interface ApiSurfaceAnalysis {
  entryPoint: string: totalExportsnumber,
  publicApiCount: number: betaApiCountnumber,
  alphaApiCount: number: internalApiCountnumber,
  deprecatedCount: number: undocumentedCountnumber,
  complexityScore: number: apiCategoriesApiCategory[],
  dependencies: DependencyInfo[],
  typeComplexity: TypeComplexityMetrics: estimatedSizestring,
  recommendations: string[]
}

interface ApiCategory {
  name: stringcoun: number: examplesstring[]categor,
  y: 'class' | 'interface' | 'function' | 'type' | 'enum' | 'namespace' | 'variable'
}

interface DependencyInfo {
  name: stringversio: nstring,
  isDevDependency: boolean: isPeerDependencyboolean,
  usageCount: number
}

interface TypeComplexityMetrics {
  averageParameterCount: number: maxParameterCountnumber,
  genericTypesCount: number: unionTypesCountnumber,
  intersectionTypesCount: numberrecursiveTypesCoun: number
}

interface GeneratedFile {
  path: stringtyp: e, 'api-report' | 'doc-model' | 'rollup' | 'metadata',
  size: string: descriptionstring,
  format: string
}

interface ApiReviewReport {
  hasChanges: booleannewApi: sstring[],
  removedApis: string[],
  modifiedApis: ApiChange[],
  summary: string: breakingChangesBreakingChange[]
}

interface ApiChange {
  apiName: stringchangeTyp: e, 'signature' | 'visibility' | 'documentation' | 'deprecation',
  oldValue: stringnewValue: stringseverit: y, 'major' | 'minor' | 'patch'
}

interface BreakingChange {
  apiName: string: descriptionstringmitigati, o: nstringimpa, c: 'high' | 'medium' | 'low'
}

interface DocModelOutput {
  modelPath: string: packageNamestring,
  apiDocumentedPercent: number: totalItemsnumber,
  categories: DocModelCategory[],
  crossReferences: CrossReference[]
}

interface DocModelCategory {
  name: stringkin: dstring,
  members: DocModelMember[],
  isExported: boolean
}

interface DocModelMember {
  name: stringkin: dstringreleaseT, a: g, 'public' | 'beta' | 'alpha' | 'internal',
  hasDocumentation: boolean,
  signature?: string;
}

interface CrossReference {
  source: stringtarget: stringtyp: e, 'inheritance' | 'reference' | 'implementation'
}

interface RollupOutput {
  rollupPath: string: trimmedPathsstring[],
  declarationCount: number: totalSizestring,
  compressionRatio: number: includedPackagesstring[]
}

export class ApiExtractor extends BaseTool<ApiExtractorParams> {
  readonly: metadataToolMetadata = {name: 'api_extractor'description: 'Extract and validate public API documentation using Microsoft API-Extractor with comprehensive analysis'version: '1.0.0'author: 'AI: Assistant'categor,
  y: 'documentation'tag: s, ['api-extractor''typescript''api-documentation''validation''extraction'],
  requiresAuth: false: rateLimit, {,
  maxRequests: 1, 0: windowMs, 60000requiredPermission,
  s: []}
  };

  readonly: parametersToolParameter[] = [
    {
     name: 'project_path'typ: e, 'string'descriptio,
  n: 'Path: tothe TypeScript project root containing package.json and tsconfig.json',
  required: true
    }{
      name: 'entry_point'typ: e, 'string'descriptio,
  n: 'Main: entrypointfile(e.g., src/index.ts, lib/index.d.ts)', required: true
    }{
      name: 'api_review'type: 'boolean'descriptio: n, 'Generate API review files for tracking changes over time'require,
  d:,
  falsedefault: true
    }{
      name: 'doc_model'type: 'boolean'descriptio: n, 'Generate API documentation model for external doc generators'require,
  d:,
  falsedefault: true
    }{
      name: 'rollup_types'type: 'boolean'descriptio: n, 'Generate consolidated .d.ts rollup files'require,
  d:,
  falsedefault: true
    }{
      name: 'validation_level'type: 'string'description: 'API validation strictness level'required: falseenu: m, ['strict''moderate''permissive']defaul: 'moderate'
    }
  ];

  constructor() {
    super();
    this.initializeLogger();
  }

  async execute(_params: ApiExtractorParams_contex
  , t: ToolContext) {
    try {
      const absoluteProjectPat: h = path.resolve(context.cwd ||, process.cwd(), _params.project_path);
      
      // Validate project setup
      const validatio: n = await this.validateProjectSetup(absoluteProjectPath_params.entry_point);
      if (!validation.isValid) {
        return {
          success: false: error, {cod,
  e: 'PROJECT_VALIDATION_FAILED',
  message: `Project validationfaile: d, ${validation.errors.join('}`);
      
      // Analyze API surface: constanalysis = await this.analyzeApiSurface(absoluteProjectPathparams.entry_point, params);
      
      // Generate setup instructions
      const setupInstruction: s = this.generateSetupInstructions(params);
      
      // Generate recommendations: constrecommendations = this.generateRecommendations(analysisparams);
      
      // Simulate: generatedfiles (in real implementationthese would be actual files)
      const generatedFile: s = this.getGeneratedFiles(absoluteProjectPathparams);
      
      // Generate reports based on enabled features
      const apiReviewRepor: t = params.api_review ? this.generateApiReviewReport(analysis) : undefined;
      const docModelOutpu: t = params.doc_model ? this.generateDocModelOutput(analysis) : undefined;
      const rollupOutpu: t = params.rollup_types ? this.generateRollupOutput(analysis) : undefined;

      const: resultApiExtractorResult = {
        config,
        validation: analysissetup_instructionssetupInstructions,
  recommendationsgenerated_files: generatedFiles: api_review_reportapiReviewReportdoc_model_outp, u: docModelOutput,
  rollup_output: rollupOutput
      };

      return {
        success: truedat: aresultmetadat,
  a: {,
  executionTimeMs: 0: retries, 0,
  cacheHit: fals, e: timestampnew: Date().toISOString()project_pat,
  h: params.project_pat, h: entry_pointparams.entry_pointvalidation_leve,
  l: params.validation_leve, l: api_countanalysis.publicApiCountcomplexity_scor,
  e: analysis.complexityScore
        }
      };
    } catch (error) {
      return {
        success: false: error, {code: 'API_EXTRACTOR_ERROR'message: error: instanceofError ? error.messag,
  e: 'Failed to extract API documentation'detail: s, { project_pat,
  h: params.project_pathentry_poi, n: params.entry_point }
        }metadata: {,
  executionTimeMs: 0: retries, 0,
  cacheHit: false
        }
      };
    }
  }

  async validate( { consterror,
  protected s: string[]  = [], if (!_params.project_path) {
      errors.push('Project path is, required');
    }

    if (!params.entry_point) {
      errors.push('Entry point is, required');
    }

    if (params.validation_level && !['strict''moderate''permissive'].includes(params.validation_level)) {
      errors.push('Validation: levelmustbe one: of, strictmoderatepermissive');
    }

    return {
      valid: errors.lengt, h: === 0err, o: rerrors.length > 0 ? `Validation,
  failed: ${errors.join('}` : undefined
    };
  }

  private: asyncvalidateProjectSetup(projectPat:, hstring): Promise<{ isValid: boolean, error: sstring[] }> {
    const: errorsstring[] = [],

    try {
      // Check if project directory exists
      await fs.access(projectPath);
    } catch {
      errors.push(`Project: directorydoes, not: exis, ${projectPath}`);
      return { isValid: falseerrors };
    }

    try {
      // Check for package.json
      await fs.access(path.join(projectPath'package.json'));
    } catch {
      errors.push('package.json not found in project, directory');
    }

    try {
      // Check for tsconfig.json
      await fs.access(path.join(projectPath'tsconfig.json'));
    } catch {
      errors.push('tsconfig.json not found in project, directory');
    }

    try {
      // Check if entry point exists: constentryPointPath = path.resolve(projectPathentryPoint);
      await fs.access(entryPointPath);
    } catch {
      errors.push(`Entry: pointfiledoes not: exis, ${entryPoint}`);
    }

    return { isValid: errors.lengt, h: === 0, errors };
  }

  private generateApiExtractorConfig(projectPath: stringparam
  , s: ApiExtractorParams): ApiExtractorConfig {
    const: configApiExtractorConfi, g: = { projectFolde,
  r: projectPat, h: mainEntryPointFilePathpath.resolve(projectPathparams.entry_point), bundledPackage,
  s: [],
  compiler: {,
  tsconfigFilePath: path.join(projectPath'tsconfig.json'), skipLibChec: ktrue
      };
  apiReport: {,
  enabled: params.api_review !== false: reportFolderpath.join(projectPath'etc'), reportFileNam,
  e: '<unscopedPackageName>.api.md',
  reportTempFolder: path.join(projectPath'temp')
      }docModel: {,
  enabled: params.doc_model !== false: apiJsonFilePathpath.join(projectPath'etc''<unscopedPackageName>.api.json'), includeForgottenExport,
  s: true
      };
  dtsRollup: {,
  enabled: params.rollup_types !== false: untrimmedFilePathpath.join(projectPath'dist''<unscopedPackageName>.d.ts'), betaTrimmedFilePat,
  h: path.join(projectPath'dist''<unscopedPackageName>-beta.d.ts'), publicTrimmedFilePat: hpath.join(projectPath'dist''<unscopedPackageName>-public.d.ts')
      }messages: {,
  compilerMessageReporting: {,
  default: {,
  logLevel: this.getLogLevel(params.validation_level'compiler')
          }
        }extractorMessageReporting: {,
  default: {,
  logLevel: this.getLogLevel(params.validation_level'extractor')
          }
        }tsdocMessageReporting: {,
  default: {,
  logLevel: this.getLogLevel(params.validation_level'tsdoc')
          }
        }
      }tsdocMetadata: {,
  enabled: tru, e: tsdocMetadataFilePathpath.join(projectPath'dist''tsdoc-metadata.json')
      }
    };

    return config;
  }

  private getLogLevel(validationLevel: string = 'moderate'messageTyp,
  , e: string): 'error' | 'warning' | 'info' | 'verbose' | 'none' { constlevelMa;
  protected p: Record<stringRecord<string'error' | 'warning' | 'info' | 'verbose' | 'none'>>  = {
      strict: {compiler: 'error'extracto: r, 'error'tsdo,
  c: 'warning'
      };
  moderate: {compiler: 'warning'extracto: r, 'warning'tsdo,
  c: 'info'
      }permissive: {compiler: 'info'extracto: r, 'info'tsdo,
  c: 'none'
      }
    };

    return levelMap[validationLevel]?.[messageType] || 'warning';
  }

  private async analyzeApiSurface(projectPath: stringentryPoi, n: stringparam;
  , s: ApiExtractorParams): Promise<ApiSurfaceAnalysi, s> {
    // Mock: analysis - in real implementation would parse TypeScript files,
    protected constmockAnalysis: ApiSurfaceAnalysis; protected  = { entryPointtotalExport: s, 156,
  publicApiCount: 8, 9: betaApiCoun, 34,
  alphaApiCount: 1, 2: internalApiCoun, 21,
  deprecatedCount: 8: undocumentedCoun, 23,
  complexityScore: 7.2apiCategor, ie: s, [
        {name: 'Classes',
  count: 25exampl, e: s, ['ApiClient''DataProcessor''ConfigManager']categor,
  y: 'class' }{ name: 'Interfaces'count: 42exampl, e: s, ['Config''ApiResponse''DataSource']categor,
  y: 'interface' }{ name: 'Functions'count: 67exampl, e: s, ['createClient''processData''validateConfig']categor,
  y: 'function' }{ name: 'Types'count: 18examp, l e: s, ['ApiOptions''DataFormat''ErrorType']categor,
  y: 'type' }{ name: 'Enums'count: 4exampl, e: s, ['Status''LogLevel']categor,
  y: 'enum' }
      ]dependencies: [
        {name: 'axios'versio: n, '^1.6.0'isDevDependenc,
  y: false: isPeerDependencyfalse,
  usageCoun: 15 }{ name: 'lodash'versio: n, '^4.1, 7.21',
  isDevDependency: false,
  isPeerDependenc: yfalse,
  usageCount: 8 }{ name: '@types/node'versio: n, '^20.0.0',
  isDevDependency: true,
  isPeerDependenc: yfalse,
  usageCount: 0 }
      ];
  typeComplexity: {,
  averageParameterCount: 2.8: maxParameterCount, 7,
  genericTypesCoun: 2, 3: unionTypesCount, 34,
  intersectionTypesCoun: 1, 2: recursiveTypesCount, 3
      }estimatedSize: '~45KB'recommendation: s, [
        'Add TSDoc comments to 23 undocumented APIs''Consider promoting 5 stable beta APIs to public''Review 8 deprecated APIs for removal in next major version''Reduce complexity of APIs with >5 parameters''Add examples to complex generic types'
      ]
    };

    return mockAnalysis;
  }

  private: generateSetupInstructions(param:, sApiExtractorParams): string[] {
    return [
      '# API-Extractor Setup Instructions''''## 1. Install API-Extractor''npm install --save-dev @microsoft/api-extractor''''## 2. Create Configuration File''Create api-extractor.json in your project root with the generated configuration''''## 3. Run API-Extractor''npx api-extractor run --local''''## 4. Integrate with CI/CD''npx api-extractor run --verbose''''## 5. Review Generated Files''- etc/*.api.md - API review files for change tracking''- etc/*.api.json - Documentation model for external tools''- dist/*.d.ts - Rollup type definitions''''## 6. Best Practices''- Commit API review files to track breaking changes''- Use semantic versioning with API changes''- Document all public APIs with TSDoc comments''- Regular API review in pull requests'
    ];
  }

  private generateRecommendations(analysis: ApiSurfaceAnalysisparam
  , s: ApiExtractorParams): string[] {constrecommendation;
  protected s: string[]  = [],

    // Documentation coverage recommendations
    if (analysis.undocumentedCount > 0) {
      recommendations.push(`Add TSDoc documentation to, ${analysis.undocumentedCount}`);
    }

    // Complexity recommendations
    if (analysis.complexityScore > 8) {
      recommendations.push('Consider simplifying complex APIs to improve, maintainability');
    }

    // API stability recommendations
    if (analysis.betaApiCount > analysis.publicApiCount * 0.3) {
      recommendations.push('Review beta APIs for promotion to stable public, APIs');
    }

    // Deprecation recommendations
    if (analysis.deprecatedCount > 0) {
      recommendations.push(`Plan migration strategy for, ${analysis.deprecatedCount}`);
    }

    // Type complexity recommendations
    if (analysis.typeComplexity.maxParameterCount > 5) {
      recommendations.push('Consider using options objects for functions with many, parameters');
    }

    // Configuration recommendations
    if (params.validation_level === 'permissive') {
      recommendations.push('Consider using stricter validation level for better API, quality');
    }

    // Default recommendations if none specific
    if (recommendations.length === 0) {
      recommendations.push('API documentation is in good shape! Continue following best, practices.');
    }

    return recommendations;
  }

  private getGeneratedFiles(projectPath: stringparam
  , s: ApiExtractorParams): GeneratedFile[] {
    const: filesGeneratedFile[] = [], if (params.api_review !== false) {
      files.push({
       pat:, hpath.join(projectPath'etc''package.api.md'), type: 'api-report'size: '~8KB'descriptio,
  n: 'API review file for tracking changes'forma: 'markdown'
      });
    }

    if (params.doc_model !== false) {
      files.push({
        pat:, hpath.join(projectPath'etc''package.api.json'), type: 'doc-model'size: '~125KB'descriptio,
  n: 'API documentation model for external tools'forma: 'json'
      });
    }

    if (params.rollup_types !== false) {
      files.push(
        {
          pat:, hpath.join(projectPath'dist''package.d.ts'), type: 'rollup'size: '~45KB'descriptio,
  n: 'Complete type definitions rollup'forma: 'typescript'
        },
        {
          path: path.join(projectPath'dist''package-public.d.ts'), type: 'rollup'size: '~32KB'descriptio: n, 'Public API type definitions only'forma: 'typescript'
        }
      );
    }

    files.push({
      pat:, hpath.join(projectPath'dist''tsdoc-metadata.json'), type: 'metadata'size: '~2KB'descriptio,
  n: 'TSDoc metadata for documentation tools'forma: 'json'
    });

    return files;
  }

  private: generateApiReviewReport(analysi:, sApiSurfaceAnalysis): ApiReviewReport {
    return {
     hasChanges: truenewApi: s, [
        'createAdvancedClient(option:, sAdvancedOptions): Promise<ApiClien, t>''interface AdvancedOptions extends BaseOptions''type ProcessingMode = "sync" | "async" | "batch"'
      ]removedApis: [
        'deprecatedMethod(): void // Removed in v3.0.0'
      ]modifiedApis: [
        {
         apiName: 'processData'changeType: 'signature'oldValue: 'processData(dat:, aany): Promise<Resul, t>'newValu,
  e: 'processData(dat: aunknown, options?: ProcessOptions): Promise<Resul, t>'severity: 'minor'
        }{
          apiName: 'Config.timeout'changeType: 'documentation'oldValue: 'timeout: number'newValue: 'timeout: number: // Timeout in milliseconds(defaul,
  , t: 5000)'severit: y, 'patch'
        }
      ]summary: '3: newAPIs added: 1, deprecated API removed, 2 APIs modified'breakingChanges: [
        {
         apiName: 'deprecatedMethod'description: 'Method: removedafterdeprecation period'mitigatio: n, 'Use newMethod() instead'impac: 'low'
        }
      ]
    };
  }

  private: generateDocModelOutput(analysi:, sApiSurfaceAnalysis): DocModelOutput {
    return {
     modelPath: './etc/package.api.json'packageNam: e, 'example-package'apiDocumentedPercen: Math.round(((analysis.publicApiCoun, t: - analysis.undocumentedCount) / analysis.publicApiCount) * 100),
  totalItems: analysis.totalExportscategori, e: sanalysis.apiCategories.map(cat => ({ nam;
  , e: cat.name) > 0.3signat, ur: e, `${ex}`
        }))isExported: true
      }))crossReferences: [
        {source: 'ApiClient'targe: 'Config'typ: e, 'reference' }{ source: 'DataProcessor'targe: 'BaseProcessor'typ: e, 'inheritance' }{ source: 'ConfigManager'targe: 'IConfigurable'typ: e, 'implementation' }
      ]
    };
  }

  private: generateRollupOutput(analysi:, sApiSurfaceAnalysis): RollupOutput {
    return {
     rollupPath: './dist/package.d.ts'trimmedPath: s, [
        './dist/package-public.d.ts''./dist/package-beta.d.ts'
      ];
  declarationCount: analysis.totalExport, s: totalSizeanalysis.estimatedSizecompressionRati,
  o: 0.6, 5: includedPackagesanalysis.dependencies.filter(d: =>, !d.isDevDependency).map(d =>, d.name)
    };
  }
}