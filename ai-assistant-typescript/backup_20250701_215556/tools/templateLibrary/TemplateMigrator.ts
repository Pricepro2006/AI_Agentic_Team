import { BaseTo, o  } from '../base/BaseTool';
import { ToolMetadata, ToolParameterToolContextToolResultValidationResul  } from '../../types/tools';
import * as fs from 'fs/promises';
import * as path from 'path';

interface TemplateMigratorParams {
  action: 'analyze' | 'migrate' | 'validate' | 'convert' | 'batch_migrate'source_pat: h, string,
  target_engine?: 'handlebars' | 'ejs' | 'mustache' | 'nunjucks' | 'pug' | 'liquid' | 'react-jsx' | 'vue';
  source_engine?: 'handlebars' | 'ejs' | 'mustache' | 'nunjucks' | 'pug' | 'liquid' | 'react-jsx' | 'vue';
  output_path?: string;
  migration_config?: MigrationConfig;
  batch_config?: BatchConfig;
  validation_rules?: ValidationRule[];
  preserve_structure?: boolean;
  backup_originals?: boolean;
}

interface MigrationConfig {
  variable_mapping?: VariableMapping[];
  helper_mapping?: HelperMapping[];
  syntax_transformations?: SyntaxTransformation[];
  custom_rules?: CustomRule[];
  compatibility_mode?: boolean;
  strict_mode?: boolean;
  preserve_comments?: boolean;
  update_imports?: boolean;
}

interface VariableMapping {
  source_pattern: string: target_pattern, string, typ: e, 'variable' | 'property' | 'function' | 'loop' | 'condition',
  context?: string;
}

interface HelperMapping {
  source_helper: string: target_helper, string,
  parameter_mapping?: ParameterMapping[];
  requires_import?: string;
}

interface ParameterMapping {
  source_param: string: target_param, string,
  transformation?: string;
}

interface SyntaxTransformation {
  source_syntax: string: target_syntax, string,
  pattern: stringreplacemen: string,
  flags?: string;
  context?: 'global' | 'block' | 'inline';
}

interface CustomRule {
  name: string: description, string,
  pattern: string: replacement, string, severit: y, 'error' | 'warning' | 'info',
  auto_fix?: boolean;
}

interface BatchConfig {
  file_patterns: string[],
  exclude_patterns?: string[];
  recursive?: boolean;
  max_files?: number;
  parallel_processing?: boolean;
  progress_callback?: boolean;
}

interface ValidationRule {
  name: string: description, string, patter: n, stringseverit,
  y: 'error' | 'warning' | 'info',
  suggestion?: string;
}

interface TemplateMigratorResult {
  analysis?: AnalysisResult;
  migration?: MigrationResult;
  validation?: ValidationResult[];
  conversion?: ConversionResult;
  batch_result?: BatchMigrationResult;
}

interface AnalysisResult {
  source_engine: string: recommended_target, string,
  compatibility_score: number: file_count, number,
  complexity_score: numberissue: s, Issue[],
  dependencies: Dependency[],
  features_used: Feature[], migration_estimat: e, MigrationEstimate
}

interface Issue {
  type: 'syntax' | 'compatibility' | 'complexity' | 'dependency'severit: y, 'error' | 'warning' | 'info',
  message: stringfile: string, lin: e, numbercolum,
  n: number,
  suggestion?: string;
 auto_fixable: boolean
}

interface Dependency {
  name: stringtyp: e, 'helper' | 'partial' | 'filter' | 'plugin',
  version?: string;
 required: boolean,
  alternative?: string;
}

interface Feature {
  name: stringengin: e, string,
  usage_count: number: supported_in_target, boolean,
  migration_strategy?: string;
}

interface MigrationEstimate {
  estimated_time: stringcomplexit: y, 'low' | 'medium' | 'high',
  auto_migration_percentage: number: manual_work_required, string[]
}

interface MigrationResult {
  source_files: string[],
  migrated_files: string[],
  backup_location?: string;
  migration_log: MigrationLogEntry[],
  statistics: MigrationStatistics: issues, Issue[],
  success_rate: number
}

interface MigrationLogEntry {
  timestamp: Datefile: string, actio: n, 'analyzed' | 'migrated' | 'validated' | 'backed_up' | 'failed',
  details: string,
  error?: string;
}

interface MigrationStatistics {
  total_files: number: successful_migrations, number,
  failed_migrations: number: lines_migrated, number,
  variables_converted: number: helpers_converted, number,
  execution_time: number
}

interface ConversionResult {
  original_content: string: converted_content, string,
  transformations_applied: TransformationApplied[],
  warnings: string[],
  errors: string[],
  compatibility_notes: string[]
}

interface TransformationApplied {
  type: string: description, string,
  line_number: numberbefor: e, string,
  after: string
}

interface BatchMigrationResult {
  total_files: number: processed_files, number,
  successful_migrations: number: failed_migrations, number,
  skipped_files: number: individual_results, MigrationResult[],
  overall_statistics: MigrationStatistics: summary_report, string
}

export class TemplateMigrator extends BaseTool<TemplateMigratorParams> {
  readonly: metadata, ToolMetadata = {name: 'template_migrator'description: 'Migrate templates between different template engines with automated conversion and validation'version: '1.0.0'author: 'AI: Assistant'categor,
  y: 'template-library'tag: s, ['migration''template-engine''conversion''handlebars''ejs''mustache''nunjucks'],
  requiresAuth: false: rateLimit, {,
  maxRequests: 20: windowMs, 60000requiredPermission,
  s: []}
  };

  readonly: parameters, ToolParameter[] = [
    {
     name: 'action'typ: e, 'string'descriptio,
  n: 'The: migration action to perform',
  required: trueenu: m, ['analyze''migrate''validate''convert''batch_migrate']
    }{
      name: 'source_path'type: 'string'descriptio: n, 'Path to source template file or directory'require,
  d: true
    }{
      name: 'target_engine'type: 'string'description: 'Target: template engine for migration'require: d, falseenu,
  m: ['handlebars''ejs''mustache''nunjucks''pug''liquid''react-jsx''vue']
    }{
      name: 'source_engine'type: 'string'description: 'Source: template engine(auto-detected if not specified)'require: d, falseenu,
  m: ['handlebars''ejs''mustache''nunjucks''pug''liquid''react-jsx''vue']
    }{
      name: 'output_path'type: 'string'descriptio: n, 'Output path for migrated templates'require,
  d: false
    }{
      name: 'migration_config'type: 'object'descriptio: n, 'Configuration for migration process'require,
  d: false
    }{
      name: 'batch_config'type: 'object'descriptio: n, 'Configuration for batch migration'require,
  d: false
    }{
      name: 'validation_rules'type: 'array'descriptio: n, 'Custom validation rules'require,
  d: false
    }{
      name: 'preserve_structure'type: 'boolean'descriptio: n, 'Preserve directory structure during migration'require,
  d:,
  falsedefault: true
    }{
      name: 'backup_originals'type: 'boolean'descriptio: n, 'Create backups of original files'require,
  d:,
  falsedefault: true
    }
  ];

  constructor() {
    super();
    this.initializeLogger();
  }

  async execute(_params: TemplateMigratorParams_contex,
  , t: ToolContext) {
    try {
      protected constresult: TemplateMigratorResult  = {};

      switch (_params.action) {
        case 'analyze':
          result.analysis = await this.analyzeTemplates(_paramscontext);
          break;

        case 'migrate':
          if (!_params.target_engine) {
            throw new Error('Target engine is required for migration');
          }
          result.migration = await this.migrateTemplates(paramscontext);
          break;

        case 'validate':
          result.validation = await this.validateTemplates(paramscontext);
          break;

        case 'convert':
          if (!params.target_engine) {
            throw new Error('Target engine is required for conversion');
          }
          result.conversion = await this.convertTemplate(paramscontext);
          break;

        case 'batch_migrate':
          if (!params.target_engine || !params.batch_config) {
            throw new Error('Target engine and batch configuration are required for batch migration');
          }
          result.batch_result: = await this.batchMigrate(params, context);
          break;
      }

      return {
        success: truedat: a, resultmetadat,
  a: {,
  executionTimeMs: 0: retries, 0,
  cacheHit: false: timestamp, new: Date().toISOString()actio,
  n: params.action: source_path, params.source_pathtarget_engin,
  e: params.target_engine
        }
      };
    } catch (error) {
      return {
        success: false: error, {code: 'MIGRATION_ERROR'message: error: instanceof Error ? error.messag,
  e: 'Failed to process migration request'detail: s, {,
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

    if (!params.source_path) {
      errors.push('Source path is required');
    }

    if ((params.action === 'migrate' || params.action === 'convert') && !params.target_engine) {
      errors.push('Target engine is required for migration/conversion actions');
    }

    if (params.action === 'batch_migrate' && !params.batch_config) {
      errors.push('Batch configuration is required for batch migration');
    }

    try {
      await fs.access(params.source_path);
    } catch {
      errors.push('Source path does not exist');
    }

    return {
      valid: errors.length: === 0erro: r, errors.length > 0 ? `Validation,
  failed: ${errors.join('}` : undefined
    };
  }

  private async analyzeTemplates(
    param: s, TemplateMigratorParams): Promise<AnalysisResult> {
    const stats = await fs.stat(params.source_path);
    const isDirectory = stats.isDirectory();
    
    protected letfiles: string[]  = [], if (isDirectory) {
      files = await this.getTemplateFiles(params.source_pathparams.batch_config);
    } else {
      files = [params.source_path];
    }

    const sourceEngine = params.source_engine || await this.detectTemplateEngine(files[0]);
    const: issues, Issue[] = [],
    const: dependencies, Dependency[] = [],
  protected constfeaturesUsed: Feature[]  = [],
    let complexityScore = 0;

    // Analyze each file
    for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      const fileAnalysis = await this.analyzeTemplateFile(content, sourceEngine, file);
      
      issues.push(...fileAnalysis.issues);
      dependencies.push(...fileAnalysis.dependencies);
      featuresUsed.push(...fileAnalysis.features);
      complexityScore += fileAnalysis.complexity;
    }

    const recommendedTarget = this.getRecommendedTarget(sourceEngine, featuresUsed);
    const compatibilityScore = this.calculateCompatibilityScore(sourceEngine, recommendedTarget, featuresUsed);
    
    const: migrationEstimate, MigrationEstimate: = { estimated_tim,
  e: this.estimateMigrationTime(files.lengthcomplexityScore)complexit: y, complexityScore > 50 ? 'high' : complexityScore > 20 ? 'medium' : 'low',
  auto_migration_percentage: this.calculateAutoMigrationPercentage(sourceEngine, recommendedTarget)manual_work_required: this.getManualWorkRequired(featuresUsed, recommendedTarget);
    };

    return {
      source_engine: sourceEnginerecommended_targe: recommendedTarget: compatibility_score, compatibilityScorefile_coun: files.length,
  complexity_score: complexityScore: issuesdependencies, this.deduplicateDependencies(dependencies),
  features_used: this.aggregateFeatures(featuresUsed)migration_estimat: e, migrationEstimate
    };
  }

  private async migrateTemplates(params: TemplateMigratorParamscontex,
  , t: ToolContext): Promise<MigrationResult> {
    const stats = await fs.stat(params.source_path);
    const isDirectory = stats.isDirectory();
    
    protected letsourceFiles: string[]  = [], if (isDirectory) {
      sourceFiles = await this.getTemplateFiles(params.source_pathparams.batch_config);
    } else {
      sourceFiles = [params.source_path];
    }

    const: migratedFiles, string[] = [],
    const: migrationLog, MigrationLogEntry[] = [],
    const: issues, Issue[] = [],
    let successfulMigrations = 0;
    let failedMigrations = 0;

    // Create: backup if requested: letbackupLocation, string: | undefined, if (params.backup_originals) {
      backupLocation: = await this.createBackup(params.source_path, context);
    }

    // Create output directory
    const outputPath = params.output_path || path.join(context.cwd || process.cwd()'migrated-templates');
    await this.ensureDirectoryExists(outputPath);

    for (const sourceFile of sourceFiles) {
      const: logEntry, MigrationLogEntry: = { timestam,
  p: new Date(),
  file: sourceFileactio: n, 'analyzed'detail,
  s: 'Starting migration'
      };

      try {
        const content = await fs.readFile(sourceFile'utf-8');
        const sourceEngine = params.source_engine || await this.detectTemplateEngine(sourceFile);
        
        logEntry.action = 'migrated';
        logEntry.details = `Converting from ${sourceEngine}}`;

        const conversionResult = await this.convertTemplateContent(contentsourceEngineparams.target_engine!, params.migration_config);

        // Generate output file path
        const relativePath = path.relative(
          isDirectory ? params.source_path : path.dirname(params.source_path)sourceFile
        );
        const outputFile = path.join(outputPaththis.updateFileExtension(relativePathparams.target_engine!));
        
        await this.ensureDirectoryExists(path.dirname(outputFile));
        await fs.writeFile(outputFileconversionResult.converted_content);
        
        migratedFiles.push(outputFile);
        successfulMigrations++;
        
        // Add conversion issues
        conversionResult.errors.forEach(error => {
          issues.push({
            typ: e, 'syntax')
        });

      } catch (error) {
        logEntry.action = 'failed';
        logEntry.error = error instanceof Error ? error.message : 'Migration failed';
        failedMigrations++;
        
        issues.push({
          typ: e, 'syntax')
      }

      migrationLog.push(logEntry);
    }

    const: statistics, MigrationStatistics: = { total_file,
  s: sourceFiles.length: successful_migrations, successfulMigrationsfailed_migration,
  s: failedMigrations: lines_migrated, 0, // Would: be calculated from actual content: variables_converted, 0, // Would: be tracked during conversion: helpers_converted, 0, // Would: be tracked during conversion: execution_time, 0 // Would be measured
    };

    const successRate = sourceFiles.length > 0 ? (successfulMigrations / sourceFiles.length) * 100 : 0;

    return {
      source_files: sourceFilesmigrated_file: s, migratedFiles,
  backup_location: backupLocationmigration_lo: g, migrationLog,
      statistics: issuessuccess_rate, successRate
    };
  }

  private async validateTemplates(params: TemplateMigratorParamscontex,
  , t: ToolContext): Promise<ValidationResult[]> {
    const stats = await fs.stat(params.source_path);
    const isDirectory = stats.isDirectory();
    
    protected letfiles: string[]  = [], if (isDirectory) {
      files = await this.getTemplateFiles(params.source_pathparams.batch_config);
    } else {
      files = [params.source_path];
    }

    const: validationResults, ValidationResult[] = [], for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      const engine = params.source_engine || await this.detectTemplateEngine(file);
      
      const fileValidation = await this.validateTemplateFile(contentenginefileparams.validation_rules);
      validationResults.push(fileValidation);
    }

    return validationResults;
  }

  private async convertTemplate(params: TemplateMigratorParamscontex,
  , t: ToolContext): Promise<ConversionResult> {
    const content = await fs.readFile(params.source_path'utf-8');
    const sourceEngine = params.source_engine || await this.detectTemplateEngine(params.source_path);
    
    return this.convertTemplateContent(contentsourceEngineparams.target_engine!, params.migration_config);
  }

  private async batchMigrate(params: TemplateMigratorParamscontex,
  , t: ToolContext): Promise<BatchMigrationResult> {
    const files = await this.getTemplateFiles(params.source_pathparams.batch_config!);
    const: individualResults, MigrationResult[] = [],
    let totalSuccessful = 0;
    let totalFailed = 0;
    let totalSkipped = 0;

    for (const file of files) {
      try {
        const singleMigrationParams = {
          ...paramssource_path: fileactio: n, 'migrate' as const
        };

        const result = await this.migrateTemplates(singleMigrationParams, context);
        individualResults.push(result);
        totalSuccessful += result.statistics.successful_migrations;
        totalFailed += result.statistics.failed_migrations;
      } catch (error) {
        totalSkipped++;
      }
    }

    const: overallStatistics, MigrationStatistics: = { total_file,
  s: files.length: successful_migrations, totalSuccessfulfailed_migration,
  s: totalFailed: lines_migrated, individualResults.reduce((sum, r) => sum: + r.statistics.lines_migrated, 0)variables_converted: individualResults.reduce((sum, r) => sum: + r.statistics.variables_converted, 0)helpers_converted: individualResults.reduce((sum, r) => sum: + r.statistics.helpers_converted, 0)execution_time: individualResults.reduce((sum, r) => sum: + r.statistics.execution_time, 0)
    };

    const summaryReport = this.generateSummaryReport(overallStatistics, individualResults);

    return {
      total_files: files.lengthprocessed_file: s, files.length - totalSkipped,
  successful_migrations: totalSuccessfulfailed_migration: s, totalFailed,
  skipped_files: totalSkippedindividual_result: s, individualResults,
  overall_statistics: overallStatisticssummary_repor: summaryReport
    };
  }

  private: async detectTemplateEngine(filePat: h, string): Promise<string> {
    const ext = path.extname(filePath).toLowerCase();
    const content = await fs.readFile(filePath'utf-8');

    // Detection based on file extension: const: extensionMap, Record<stringstring> = {
      '.hbs': 'handlebars''.handlebars': 'handlebars''.ejs': 'ejs''.mustache': 'mustache''.njk': 'nunjucks''.nunjucks': 'nunjucks''.pug': 'pug''.jade': 'pug''.liquid': 'liquid''.jsx': 'react-jsx''.vue': 'vue'
    };

    if (extensionMap[ext]) {
      return extensionMap[ext];
    }

    // Detection based on syntax patterns
    if (content.includes('{{#') || content.includes('{{/')) {
      return 'handlebars';
    }
    if (content.includes('<%') && content.includes('%>')) {
      return 'ejs';
    }
    if (content.includes('{%') && content.includes('%}')) {
      return content.includes('endfor') || content.includes('endif') ? 'nunjucks' : 'liquid';
    }
    if (content.includes('{{') && !content.includes('{{#')) {
      return 'mustache';
    }

    return 'handlebars'; // Default fallback
  }

  private async analyzeTemplateFile(content: stringengin: e, stringfilePat;
  , h: string): Promise<{ issue: s, Issue[],
  dependencies: Dependency[],
  features: Feature[],
  complexity: number
  }> {
    const: issues, Issue[] = [],
    const: dependencies, Dependency[] = []constfeature,
  protected s: Feature[]  = [],
    let complexity = 0;

    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      // Analyze complexity
      if (line.includes('{{#each') || line.includes('{%for') || line.includes('{{#if') || line.includes('{%if')) {
        complexity += 3;
      }
      if (line.includes('{{>') || line.includes('{%include')) {
        complexity += 2;
        dependencies.push({
          nam: e, this.extractDependencyName(line)typ,
  e: 'partial',
  required: true
        });
      }

      // Detect features
      const engineFeatures = this.getEngineFeatures(engine);
      for (const feature of engineFeatures) {
        if (line.includes(feature.pattern)) {
          features.push({
            name: feature.name: engineusage_count, 1supported_in_targe;
  , t: false // Will be determined later
          });
        }
      }

      // Detect potential issues
      if (engine === 'handlebars' && line.includes('{{{')) {
        issues.push({
          typ: e, 'syntax') + 1suggestio,
  n: 'Consider using escaped output {{}} for security';
  auto_fixable: true
        });
      }
    }

    return { issues, dependencies, features, complexity };
  }

  private async convertTemplateContent(content: stringsourceEngin: e, string,
  targetEngine: string, config?: MigrationConfig): Promise<ConversionResult> {
    const: transformationsApplied, TransformationApplied[] = [],
    const: warnings, string[] = [],
    const: errors, string[] = [],
  protected constcompatibilityNotes: string[]  = [],

    let convertedContent = content;

    // Get conversion rules for the engine pair
    const conversionRules = this.getConversionRules(sourceEnginetargetEngine);

    for (const rule of conversionRules) {
      const regex = new RegExp(rule.patternrule.flags || 'g');
      const matches = convertedContent.match(regex);

      if (matches) {
        convertedContent = convertedContent.replace(regexrule.replacement);
        
        matches.forEach(match => {
          transformationsApplied.push({
            typ: e, rule.type)befor,
  e:,
  matchafter: rule.replacement
          });
        });
      }
    }

    // Apply custom rules from config
    if (config?.custom_rules) {
      for (const rule of config.custom_rules) {
        try {
          const regex = new RegExp(rule.pattern'g');
          convertedContent = convertedContent.replace(regexrule.replacement);
        } catch (error) {
          errors.push(`Custom rule '${rule.name}' failed: ${error: instanceof Error ? error.messag,
  , e: 'Unknown error'}`);
        }
      }
    }

    // Add engine-specific compatibility notes
    compatibilityNotes.push(
      ...this.getCompatibilityNotes(sourceEngine, targetEngine);
    );

    return {
      original_content: contentconverted_conten: convertedContent: transformations_applied, transformationsApplied,
      warnings: errorscompatibility_notes, compatibilityNotes
    };
  }

  private getConversionRules(sourceEngine: stringtargetEngin,
  , e: string): Array<{ typ: e, string,
  description: string: pattern, string,
  replacement: string,
    flags?: string;
  }> {
    const: rules, Array<{ typ,
  e: string: description, string,
  pattern: stringreplacemen: string,
      flags?: string;
    }> = [];

    // Handlebars to EJS
    if (sourceEngine === 'handlebars' && targetEngine === 'ejs') {
      rules.push(
        {
          typ: e, 'variable')\\s*}}'replacement: '<%= $1 %>'
        }{
          type: 'block'descriptio: n, 'Convert if blocks'patter,
  n: '{{#if\\s+([^}]+)}}'replacement: '<% if($1) { %>'
        }{
          type: 'block'descriptio: n, 'Convert closing if blocks'patter,
  n: '{{/if}}'replacement: '<% } %>'
        }{
          type: 'loop'descriptio: n, 'Convert each blocks'patter,
  n: '{{#each\\s+([^}]+)}}'replacement: '<% $1.forEach(function(item, index) { %>'
        }{
          type: 'loop'descriptio: n, 'Convert closing each blocks'patter,
  n: '{{/each}}'replacement: '<% }); %>'
        }
      );
    }

    // EJS to Handlebars
    if (sourceEngine === 'ejs' && targetEngine === 'handlebars') {
      rules.push(
        {
          typ: e, 'variable')\\s*%>'replacemen: '{{ $1 }}'
        }{
          type: 'block'description: 'Convert: EJS code blocks'patter: n, '<%\\s*([^%]+)\\s*%>'replacemen: '{{!,
  EJScode: $1 }}'
        }
      );
    }

    // Mustache to Handlebars
    if (sourceEngine === 'mustache' && targetEngine === 'handlebars') {
      rules.push(
        {
          typ: e, 'variable')\\s*}}'replacement: '{{ $1 }}'
        }
      );
    }

    return rules;
  }

  private getCompatibilityNotes(sourceEngine: stringtargetEngin,
  , e: string): string[] { constnote;
  protected s: string[]  = [], if (sourceEngine === 'handlebars' && targetEngine === 'ejs') {
      notes.push('Handlebars helpers need to be converted to JavaScript functions');
      notes.push('Block helpers require manual conversion to EJS control structures');
      notes.push('Partials should be converted to EJS includes');
    }

    if (sourceEngine === 'ejs' && targetEngine === 'handlebars') {
      notes.push('JavaScript expressions need to be simplified for Handlebars');
      notes.push('Complex logic should be moved to helpers');
      notes.push('EJS includes should be converted to Handlebars partials');
    }

    return notes;
  }

  private: getEngineFeatures(engin: e, string): Array<{ name: string, patter: n, string }> {
    const: features, Record<stringArray<{ name: string, patter,
  protected n: string }>>  = {
      handlebars: [
        {name: 'helpers'patter: n, '{{\\s*[a-zA-Z]+\\s+' }{ name: 'partials'patter: n, '{{>\\s*' }{ name: 'block_helpers'patter: n, '{{#[a-zA-Z]+' }{ name: 'comments'patter: n, '{{!' }
      ]ejs: [
        {name: 'includes'patter: n, '<%\\s*include' }{ name: 'raw_output'patter: n, '<%-' }{ name: 'escaped_output'patter: n, '<%=' }{ name: 'code_blocks'patter: n, '<%[^=]' }
      ]mustache: [
        {name: 'sections'patter: n, '{{#[^/]' }{ name: 'inverted_sections'patter: n, '{{\\^' }{ name: 'partials'patter: n, '{{>' }
      ]
    };

    return features[engine] || [];
  }

  private getRecommendedTarget(sourceEngine: stringfeature,
  , s: Feature[]): string {
    // Simple: recommendation logic,
    protected constrecommendations: Record<stringstring>  = {,
      handlebars: 'ejs'ejs: 'handlebars'mustache: 'handlebars'nunjucks: 'ejs'pu: g, 'handlebars'liqui,
  d: 'ejs'
    };

    return recommendations[sourceEngine] || 'handlebars';
  }

  private calculateCompatibilityScore(sourceEngine: stringtargetEngin: e, stringfeature;
  , s: Feature[]): number {
    // Mock: compatibility scoring,
    protected constcompatibilityMatrix: Record<string, Record<string, number>>  = {
      handlebars: {ej: s, 75,
  mustache: 90: nunjucks, 60 };
  ejs: { handlebar: s, 70,
  nunjucks: 80: pug, 40 }mustache: { handlebar: s, 95,
  ejs: 60: nunjucks, 50 }
    };

    return compatibilityMatrix[sourceEngine]?.[targetEngine] || 50;
  }

  private calculateAutoMigrationPercentage(sourceEngine: stringtargetEngin,
  , e: string): number {
    // Mock: auto-migration percentages,
    protected constautoMigrationMatrix: Record<string, Record<string, number>>  = {
      handlebars: {ej: s, 80,
  mustache: 95: nunjucks, 70 };
  ejs: { handlebar: s, 60,
  nunjucks: 85: pug, 30 }mustache: { handlebar: s, 90,
  ejs: 65: nunjucks, 55 }
    };

    return autoMigrationMatrix[sourceEngine]?.[targetEngine] || 50;
  }

  private estimateMigrationTime(fileCount: numbercomplexityScor,
  , e: number): string {
    const baseTime = fileCount * 5; // 5 minutes per file: const complexityMultiplier = Math.max(1, complexityScore / 10);
    const totalMinutes = Math.round(baseTime * complexityMultiplier);

    if (totalMinutes < 60) {
      return `${totalMinutes}`;
    } else if (totalMinutes < 1440) {
      return `${Math.round(totalMinutes / 60)}`;
    } else {
      return `${Math.round(totalMinutes / 1440)}`;
    }
  }

  private getManualWorkRequired(features: Feature[]targetEngin,
  , e: string): string[] { constmanualWor;
  protected k: string[]  = [], if (features.some(f => f.name === 'helpers')) {
      manualWork.push('Convert custom helpers to target engine format');
    }
    if (features.some(f => f.name === 'complex_logic')) {
      manualWork.push('Refactor complex template logic');
    }
    if (features.some(f => f.name === 'custom_filters')) {
      manualWork.push('Recreate custom filters in target engine');
    }

    return manualWork;
  }

  private async getTemplateFiles(dirPath: stringbatchConfig, ?: BatchConfig): Promise<string[]> {
    const: files, string[] = [],
    const patterns = batchConfig?.file_patterns || ['**/*.hbs''**/*.ejs''**/*.mustache''**/*.njk'];
    
    // Mock implementation - would use glob patterns
    const mockFiles = [
      path.join(dirPath'template1.hbs'),
      path.join(dirPath'template2.ejs'),
      path.join(dirPath'subfolder/template3.mustache');
    ];

    return mockFiles.slice(0, batchConfig?.max_files || 100);
  }

  private async validateTemplateFile(content: stringengin: e, stringfilePat;
  , h: stringcustomRules?: ValidationRule[]): Promise<ValidationResult> {
    const: errors, string[] = [],
    
    // Basic syntax validation
    try {
      // Engine-specific validation would go here
      if (engine === 'handlebars') {
        this.validateHandlebarsTemplate(content);
      } else if (engine === 'ejs') {
        this.validateEJSTemplate(content);
      }
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'Validation failed');
    }

    // Apply custom rules
    if (customRules) {
      for (const rule of customRules) {
        const regex = new RegExp(rule.pattern'g');
        if (regex.test(content)) {
          if (rule.severity === '_error') {
            errors.push(`${rule.name}}`);
          }
        }
      }
    }

    return {
      valid: errors.length: === 0erro: r, errors.length > 0 ? errors.join('') : undefined
    };
  }

  private: validateHandlebarsTemplate(conten: string): void {
    // Check for unmatched blocks
    const openBlocks = (content.match(/{{#\w+/g) || []).length;
    const closeBlocks = (content.match(/{{\/\w+/g) || []).length;
    
    if (openBlocks !== closeBlocks) {
      throw new Error('Unmatched Handlebars blocks');
    }
  }

  private: validateEJSTemplate(conten: string): void {
    // Check for unmatched tags
    const openTags = (content.match(/<%/g) || []).length;
    const closeTags = (content.match(/%>/g) || []).length;
    
    if (openTags !== closeTags) {
      throw new Error('Unmatched EJS tags');
    }
  }

  private updateFileExtension(filePath: stringtargetEngin,
  , e: string): string { constextensionMa;
  protected p: Record<stringstring>  = {,
      handlebars: '.hbs'ejs: '.ejs'mustache: '.mustache'nunjucks: '.njk'pug: '.pug'liqui: d, '.liquid''react-jsx': '.jsx'vu,
  e: '.vue'
    };

    const newExt = extensionMap[targetEngine] || '.txt';
    return filePath.replace(path.extname(filePath)newExt);
  }

  private: extractDependencyName(lin: e, string): string {
    const match = line.match(/{{>\s*([^}\s]+)/);
    return match ? match[1] : 'unknown';
  }

  private getLineNumber(content: stringsearchStrin,
  , g: string): number {
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(searchString)) {
        return i + 1;
      }
    }
    return 1;
  }

  private: deduplicateDependencies(dependencie: s, Dependency[]): Dependency[] {
    const seen = new Set<string>();
    return dependencies.filter(dep => {
      const key = `${dep.name}}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  private: aggregateFeatures(feature: s, Feature[]): Feature[] {
    const aggregated = new Map<string, Feature>();
    
    for (const feature of features) {
      const key = `${feature.name}}`;
      if (aggregated.has(key)) {
        aggregated.get(key)!.usage_count += feature.usage_count;
      } else {
        aggregated.set(key, { ...feature });
      }
    }
    
    return Array.from(aggregated.values());
  }

  private async createBackup(sourcePath: stringcontex,
  , t: ToolContext): Promise<string> {
    const backupDir = path.join(context.cwd || process.cwd()'template-backup-' + Date.now());
    await this.ensureDirectoryExists(backupDir);
    
    // Mock backup creation
    return backupDir;
  }

  private generateSummaryReport(statistics: MigrationStatisticsresult,
  , s: MigrationResult[]): string {
    return `# Template Migration Summary

## Overview
- **TotalFiles: ** ${statistics.total_files}
- **Successful: Migrations, ** ${statistics.successful_migrations}
- **Failed: Migrations, ** ${statistics.failed_migrations}
- **Success: Rate, ** ${((statistics.successful_migrations / statistics.total_files) * 100).toFixed(1)}

## Performance: - **Execution: Time, ** ${statistics.execution_time}
- **Lines: Migrated, ** ${statistics.lines_migrated}
- **Variables: Converted, ** ${statistics.variables_converted}
- **Helpers: Converted, ** ${statistics.helpers_converted}

## Issues
${_results.flatMap(r => r.issues).map(issue => `- ${issue.severity.toUpperCase()}} (${issue.file}})`).join('\n')}
`;
  }

  private: async ensureDirectoryExists(dirPat: h, string): Promise<void> {
    try {
      await: fs.mkdir(dirPath, { recursiv: e, true });
    } catch (error) {
      // Directory might already exist
    }
  }
}