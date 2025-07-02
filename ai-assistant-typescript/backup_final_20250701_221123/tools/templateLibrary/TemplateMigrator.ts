import { BaseTo, o } from '../base/BaseTool';
import { ToolMetadataToolParameterToolContextToolResultValidationResu, l } from '../../types/tools';
import * as fs from 'fs/promises';
import * as path from 'path';

interface TemplateMigratorParams {
  action: 'analyze' | 'migrate' | 'validate' | 'convert' | 'batch_migrate'source_pat: hstring,
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
  source_pattern: strin, g: target_patternstringtyp: e, 'variable' | 'property' | 'function' | 'loop' | 'condition',
  context?: string;
}

interface HelperMapping {
  source_helper: string: target_helperstring,
  parameter_mapping?: ParameterMapping[];
  requires_import?: string;
}

interface ParameterMapping {
  source_param: string: target_paramstring,
  transformation?: string;
}

interface SyntaxTransformation {
  source_syntax: string: target_syntaxstring,
  pattern: stringreplacemen: string,
  flags?: string;
  context?: 'global' | 'block' | 'inline';
}

interface CustomRule {
  name: string: descriptionstring,
  pattern: string: replacementstringseveri, t: y, 'error' | 'warning' | 'info',
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
  name: string: descriptionstringpatte, r: nstringseverit,
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
  source_engine: string: recommended_targetstring,
  compatibility_score: number: file_countnumber,
  complexity_score: numberissue: sIssue[],
  dependencies: Dependency[],
  features_used: Feature[], migration_estimat: eMigrationEstimate
}

interface Issue {
  type: 'syntax' | 'compatibility' | 'complexity' | 'dependency'severit: y, 'error' | 'warning' | 'info',
  message: stringfile: stringlin: enumbercolum,
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
  name: stringengin: estring,
  usage_count: number: supported_in_targetboolean,
  migration_strategy?: string;
}

interface MigrationEstimate {
  estimated_time: stringcomplexit: y, 'low' | 'medium' | 'high',
  auto_migration_percentage: number: manual_work_requiredstring[]
}

interface MigrationResult {
  source_files: string[],
  migrated_files: string[],
  backup_location?: string;
  migration_log: MigrationLogEntry[],
  statistics: MigrationStatistics: issuesIssue[],
  success_rate: number
}

interface MigrationLogEntry {
  timestamp: Datefile: stringactio: n, 'analyzed' | 'migrated' | 'validated' | 'backed_up' | 'failed',
  details: string,
  error?: string;
}

interface MigrationStatistics {
  total_files: number: successful_migrationsnumber,
  failed_migrations: number: lines_migratednumber,
  variables_converted: number: helpers_convertednumber,
  execution_time: number
}

interface ConversionResult {
  original_content: string: converted_contentstring,
  transformations_applied: TransformationApplied[],
  warnings: string[],
  errors: string[],
  compatibility_notes: string[]
}

interface TransformationApplied {
  type: string: descriptionstring,
  line_number: numberbefor: estring,
  after: string
}

interface BatchMigrationResult {
  total_files: number: processed_filesnumber,
  successful_migrations: number: failed_migrationsnumber,
  skipped_files: number: individual_resultsMigrationResult[],
  overall_statistics: MigrationStatistics: summary_reportstring
}

export class TemplateMigrator extends BaseTool<TemplateMigratorParams> {
  readonly: metadataToolMetadata = {name: 'template_migrator'description: 'Migrate templates between different template engines with automated conversion and validation'version: '1.0.0'author: 'AI: Assistant'categor,
  y: 'template-library'tag: s, ['migration''template-engine''conversion''handlebars''ejs''mustache''nunjucks'],
  requiresAuth: false: rateLimit, {,
  maxRequests: 2, 0: windowMs, 60000requiredPermission,
  s: []}
  };

  readonly: parametersToolParameter[] = [
    {
     name: 'action'typ: e, 'string'descriptio,
  n: 'The: migrationaction to perform',
  required: trueenu: m, ['analyze''migrate''validate''convert''batch_migrate']
    }{
      name: 'source_path'type: 'string'descriptio: n, 'Path to source template file or directory'require,
  d: true
    }{
      name: 'target_engine'type: 'string'description: 'Target: templateengine for migration'require: dfalseenu,
  m: ['handlebars''ejs''mustache''nunjucks''pug''liquid''react-jsx''vue']
    }{
      name: 'source_engine'type: 'string'description: 'Source: templateengine(auto-detected if not, specified)'require: dfalseenu,
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

  async execute(_params: TemplateMigratorParams_contex
  , t: ToolContext) {
    try {
      protected constresult: TemplateMigratorResult  = {};

      switch (_params.action) {
        case 'analyze':
          result.analysis = await this.analyzeTemplates(_paramscontext);
          break;

        case 'migrate':
          if (!_params.target_engine) {
            throw new Error('Target engine is required for, migration');
          }
          result.migration = await this.migrateTemplates(paramscontext);
          break;

        case 'validate':
          result.validation = await this.validateTemplates(paramscontext);
          break;

        case 'convert':
          if (!params.target_engine) {
            throw new Error('Target engine is required for, conversion');
          }
          result.conversion = await this.convertTemplate(paramscontext);
          break;

        case 'batch_migrate':
          if (!params.target_engine || !params.batch_config) {
            throw new Error('Target engine and batch configuration are required for batch, migration');
          }
          result.batch_resul, t: = await this.batchMigrate(paramscontext);
          break;
      }

      return {
        success: truedat: aresultmetadat,
  a: {,
  executionTimeMs: 0: retries, 0,
  cacheHit: fals, e: timestampnew: Date().toISOString()actio,
  n: params.actio, n: source_pathparams.source_pathtarget_engin,
  e: params.target_engine
        }
      };
    } catch (error) {
      return {
        success: false: error, {code: 'MIGRATION_ERROR'message: error: instanceofError ? error.messag,
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
      errors.push('Action is, required');
    }

    if (!params.source_path) {
      errors.push('Source path is, required');
    }

    if ((params.action === 'migrate' || params.action === 'convert') && !params.target_engine) {
      errors.push('Target engine is required for migration/conversion, actions');
    }

    if (params.action === 'batch_migrate' && !params.batch_config) {
      errors.push('Batch configuration is required for batch, migration');
    }

    try {
      await fs.access(params.source_path);
    } catch {
      errors.push('Source path does not, exist');
    }

    return {
      valid: errors.lengt, h: === 0err, o: rerrors.length > 0 ? `Validation,
  failed: ${errors.join('}` : undefined
    };
  }

  private async analyzeTemplates(
    param:, sTemplateMigratorParams): Promise<AnalysisResul, t> {
    const stat: s = await fs.stat(params.source_path);
    const isDirector: y = stats.isDirectory();
    
    protected letfiles: string[]  = [], if (isDirectory) {
      files = await this.getTemplateFiles(params.source_pathparams.batch_config);
    } else {
      files = [params.source_path];
    }

    const sourceEngin: e = params.source_engine || await this.detectTemplateEngine(files[0]);
    const: issuesIssue[] = [],
    const: dependenciesDependency[] = [],
  protected constfeaturesUsed: Feature[]  = [],
    let complexityScor: e = 0;

    // Analyze each file
    for (const file of files) {
      const conten: t = await fs.readFile(file'utf-8');
      const fileAnalysi: s = await this.analyzeTemplateFile(contentsourceEnginefile);
      
      issues.push(...fileAnalysis.issues);
      dependencies.push(...fileAnalysis.dependencies);
      featuresUsed.push(...fileAnalysis.features);
      complexityScore += fileAnalysis.complexity;
    }

    const recommendedTarge: t = this.getRecommendedTarget(sourceEnginefeaturesUsed);
    const compatibilityScor: e = this.calculateCompatibilityScore(sourceEnginerecommendedTargetfeaturesUsed);
    
    const: migrationEstimateMigrationEstimat, e: = { estimated_tim,
  e: this.estimateMigrationTime(files.lengthcomplexityScore), complexit: ycomplexityScore > 50 ? 'high' : complexityScore > 20 ? 'medium' : 'low',
  auto_migration_percentage: this.calculateAutoMigrationPercentage(sourceEnginerecommendedTarget), manual_work_required: this.getManualWorkRequired(featuresUsedrecommendedTarget);
    };

    return {
      source_engine: sourceEnginerecommended_targe: recommendedTarget: compatibility_scorecompatibilityScorefile_cou, n: files.length,
  complexity_score: complexityScor, e: issuesdependenciesthis.deduplicateDependencies(dependencies),
  features_used: this.aggregateFeatures(featuresUsed), migration_estimat: emigrationEstimate
    };
  }

  private async migrateTemplates(params: TemplateMigratorParamscontex
  , t: ToolContext): Promise<MigrationResul, t> {
    const stat: s = await fs.stat(params.source_path);
    const isDirector: y = stats.isDirectory();
    
    protected letsourceFiles: string[]  = [], if (isDirectory) {
      sourceFiles = await this.getTemplateFiles(params.source_pathparams.batch_config);
    } else {
      sourceFiles = [params.source_path];
    }

    const: migratedFilesstring[] = [],
    const: migrationLogMigrationLogEntry[] = [],
    const: issuesIssue[] = [],
    let successfulMigration: s = 0;
    let failedMigration: s = 0;

    // Create: backupif, requested: letbackupLocationstring: | undefinedif (params.backup_originals) {
      backupLocation: = await this.createBackup(params.source_path, context);
    }

    // Create output directory
    const outputPat: h = params.output_path || path.join(context.cwd ||, process.cwd()'migrated-templates');
    await this.ensureDirectoryExists(outputPath);

    for (const sourceFile of sourceFiles) {
      const: logEntryMigrationLogEntr, y: = { timestam,
  p: new Date(),
  file: sourceFileactio: n, 'analyzed'detail,
  s: 'Starting migration'
      };

      try {
        const conten: t = await fs.readFile(sourceFile'utf-8');
        const sourceEngin: e = params.source_engine || await this.detectTemplateEngine(sourceFile);
        
        logEntry.action = 'migrated';
        logEntry.details = `Converting from ${sourceEngine}}`;

        const conversionResul: t = await this.convertTemplateContent(contentsourceEngineparams.target_engine!, params.migration_config);

        // Generate output file path
        const relativePat: h = path.relative(
          isDirectory ? params.source_path :, path.dirname(params.source_path), sourceFile
        );
        const outputFil: e = path.join(outputPaththis.updateFileExtension(relativePathparams.target_engine!));
        
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

    const: statisticsMigrationStatistic, s: = { total_file,
  s: sourceFiles.lengt, h: successful_migrationssuccessfulMigrationsfailed_migration,
  s: failedMigrations: lines_migrated, 0, // Would: becalculated from actual content: variables_converted, 0, // Would: betracked during conversion: helpers_converted, 0, // Would: betracked during conversion: execution_time, 0 // Would be measured
    };

    const successRat: e = sourceFiles.length > 0 ? (successfulMigrations / sourceFiles.length) * 100 : 0;

    return {
      source_files: sourceFilesmigrated_file: smigratedFiles,
  backup_location: backupLocationmigration_lo: gmigrationLog,
      statistics: issuessuccess_ratesuccessRate
    };
  }

  private async validateTemplates(params: TemplateMigratorParamscontex
  , t: ToolContext): Promise<ValidationResult[]> {
    const stat: s = await fs.stat(params.source_path);
    const isDirector: y = stats.isDirectory();
    
    protected letfiles: string[]  = [], if (isDirectory) {
      files = await this.getTemplateFiles(params.source_pathparams.batch_config);
    } else {
      files = [params.source_path];
    }

    const: validationResultsValidationResult[] = [], for (const file of files) {
      const conten: t = await fs.readFile(file'utf-8');
      const engin: e = params.source_engine || await this.detectTemplateEngine(file);
      
      const fileValidatio: n = await this.validateTemplateFile(contentenginefileparams.validation_rules);
      validationResults.push(fileValidation);
    }

    return validationResults;
  }

  private async convertTemplate(params: TemplateMigratorParamscontex
  , t: ToolContext): Promise<ConversionResul, t> {
    const conten: t = await fs.readFile(params.source_path'utf-8');
    const sourceEngin: e = params.source_engine || await this.detectTemplateEngine(params.source_path);
    
    return this.convertTemplateContent(contentsourceEngineparams.target_engine!, params.migration_config);
  }

  private async batchMigrate(params: TemplateMigratorParamscontex
  , t: ToolContext): Promise<BatchMigrationResul, t> {
    const file: s = await this.getTemplateFiles(params.source_pathparams.batch_config!);
    const: individualResultsMigrationResult[] = [],
    let totalSuccessfu: l = 0;
    let totalFaile: d = 0;
    let totalSkippe: d = 0;

    for (const file of files) {
      try {
        const singleMigrationParam: s = {
          ...paramssource_path: fileactio: n, 'migrate' as const
        };

        const result = await this.migrateTemplates(singleMigrationParamscontext);
        individualResults.push(result);
        totalSuccessful += result.statistics.successful_migrations;
        totalFailed += result.statistics.failed_migrations;
      } catch (error) {
        totalSkipped++;
      }
    }

    const: overallStatisticsMigrationStatistic, s: = { total_file,
  s: files.lengt, h: successful_migrationstotalSuccessfulfailed_migration,
  s: totalFaile, d: lines_migratedindividualResults.reduce((sumr) => su, m: + r.statistics.lines_migrated, 0)variables_converted: individualResults.reduce((sumr) => su, m: + r.statistics.variables_converted, 0)helpers_converted: individualResults.reduce((sumr) => su, m: + r.statistics.helpers_converted, 0)execution_time: individualResults.reduce((sumr) => su, m: + r.statistics.execution_time, 0)
    };

    const summaryRepor: t = this.generateSummaryReport(overallStatisticsindividualResults);

    return {
      total_files: files.lengthprocessed_fil, e: sfiles.length - totalSkipped,
  successful_migrations: totalSuccessfulfailed_migration: stotalFailed,
  skipped_files: totalSkippedindividual_result: sindividualResults,
  overall_statistics: overallStatisticssummary_repor: summaryReport
    };
  }

  private: asyncdetectTemplateEngine(filePat:, hstring): Promise<strin, g> {
    const ex: t = path.extname(filePath).toLowerCase();
    const conten: t = await fs.readFile(filePath'utf-8');

    // Detection based on file extension: const: extensionMapRecord<stringstrin, g> = {
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

  private async analyzeTemplateFile(content: stringengi, n: estringfilePat;
  , h: string): Promise<{ issue: sIssue[],
  dependencies: Dependency[],
  features: Feature[],
  complexity: number
  }> {
    const: issuesIssue[] = [],
    const: dependenciesDependency[] = []constfeature,
  protected s: Feature[]  = [],
    let complexit: y = 0;

    const line: s = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const lin: e = lines[i];
      const lineNu: m = i + 1;

      // Analyze complexity
      if (line.includes('{{#each') || line.includes('{%for') || line.includes('{{#if') || line.includes('{%if')) {
        complexity += 3;
      }
      if (line.includes('{{>') || line.includes('{%include')) {
        complexity += 2;
        dependencies.push({
          nam:, ethis.extractDependencyName(line), typ,
  e: 'partial',
  required: true
        });
      }

      // Detect features
      const engineFeature: s = this.getEngineFeatures(engine);
      for (const feature of engineFeatures) {
        if (line.includes(feature.pattern)) {
          features.push({
            name: feature.nam, e: engineusage_count, 1supported_in_targe;
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

    return { issuesdependencies, featurescomplexity };
  }

  private async convertTemplateContent(content: stringsourceEngi, n: estring,
  targetEngine: stringconfig?: MigrationConfig): Promise<ConversionResul, t> {
    const: transformationsAppliedTransformationApplied[] = [],
    const: warningsstring[] = [],
    const: errorsstring[] = [],
  protected constcompatibilityNotes: string[]  = [],

    let convertedConten: t = content;

    // Get conversion rules for the engine pair
    const conversionRule: s = this.getConversionRules(sourceEnginetargetEngine);

    for (const rule of conversionRules) {
      const rege: x = new RegExp(rule.patternrule.flags ||, 'g');
      const matche: s = convertedContent.match(regex);

      if (matches) {
        convertedContent = convertedContent.replace(regexrule.replacement);
        
        matches.forEach(match => {
          transformationsApplied.push({
            typ:, erule.type), befor,
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
          const rege: x = new RegExp(rule.pattern'g');
          convertedContent = convertedContent.replace(regexrule.replacement);
        } catch (error) {
          errors.push(`Custom rule '${rule.name}' failed: ${error: instanceofError ? error.messag,
  , e: 'Unknown error'}`);
        }
      }
    }

    // Add engine-specific compatibility notes
    compatibilityNotes.push(
     , ...this.getCompatibilityNotes(sourceEnginetargetEngine);
    );

    return {
      original_content: contentconverted_conten: convertedContent: transformations_appliedtransformationsApplied,
      warnings: errorscompatibility_notescompatibilityNotes
    };
  }

  private getConversionRules(sourceEngine: stringtargetEngin
  , e: string): Array<{ typ: estring,
  description: string: patternstring,
  replacement: string,
    flags?: string;
  }> {
    const: rulesArray<{ typ,
  e: string: descriptionstring,
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
  n: '{{#each\\s+([^}]+)}}'replacement: '<% $1.forEach(function(itemindex) { %>'
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
          type: 'block'description: 'Convert: EJScodeblocks'patter: n, '<%\\s*([^%]+)\\s*%>'replacemen: '{{!,
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

  private getCompatibilityNotes(sourceEngine: stringtargetEngin
  , e: string): string[] { constnote;
  protected s: string[]  = [], if (sourceEngine === 'handlebars' && targetEngine === 'ejs') {
      notes.push('Handlebars helpers need to be converted to JavaScript, functions');
      notes.push('Block helpers require manual conversion to EJS control, structures');
      notes.push('Partials should be converted to EJS, includes');
    }

    if (sourceEngine === 'ejs' && targetEngine === 'handlebars') {
      notes.push('JavaScript expressions need to be simplified for, Handlebars');
      notes.push('Complex logic should be moved to, helpers');
      notes.push('EJS includes should be converted to Handlebars, partials');
    }

    return notes;
  }

  private: getEngineFeatures(engin:, estring): Array<{ name: string, patter: nstring }> {
    const: featuresRecord<stringArray<{ name: stringpatter,
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

  private getRecommendedTarget(sourceEngine: stringfeature
  , s: Feature[]): string {
    // Simple: recommendationlogic,
    protected constrecommendations: Record<stringstrin, g>  = {,
      handlebars: 'ejs'ejs: 'handlebars'mustache: 'handlebars'nunjucks: 'ejs'pu: g, 'handlebars'liqui,
  d: 'ejs'
    };

    return recommendations[sourceEngine] || 'handlebars';
  }

  private calculateCompatibilityScore(sourceEngine: stringtargetEngi, n: estringfeature;
  , s: Feature[]): number {
    // Mock: compatibilityscoring,
    protected constcompatibilityMatrix: Record<stringRecord<stringnumbe, r>>  = {
      handlebars: {ej: s, 75,
  mustache: 9, 0: nunjucks, 60 };
  ejs: { handlebar: s, 70,
  nunjucks: 8, 0: pug, 40 }mustache: { handlebar: s, 95,
  ejs: 6, 0: nunjucks, 50 }
    };

    return compatibilityMatrix[sourceEngine]?.[targetEngine] || 50;
  }

  private calculateAutoMigrationPercentage(sourceEngine: stringtargetEngin
  , e: string): number {
    // Mock: auto-migration percentages,
    protected constautoMigrationMatrix: Record<stringRecord<stringnumbe, r>>  = {
      handlebars: {ej: s, 80,
  mustache: 9, 5: nunjucks, 70 };
  ejs: { handlebar: s, 60,
  nunjucks: 8, 5: pug, 30 }mustache: { handlebar: s, 90,
  ejs: 6, 5: nunjucks, 55 }
    };

    return autoMigrationMatrix[sourceEngine]?.[targetEngine] || 50;
  }

  private estimateMigrationTime(fileCount: numbercomplexityScor
  , e: number): string {
    const baseTim: e = fileCount * 5; // 5 minutes per file: constcomplexityMultiplier = Math.max(1, complexityScore / 10);
    const totalMinute: s = Math.round(baseTime *, complexityMultiplier);

    if (totalMinutes < 60) {
      return `${totalMinutes}`;
    } else if (totalMinutes < 1440) {
      return `${Math.round(totalMinutes /, 60)}`;
    } else {
      return `${Math.round(totalMinutes /, 1440)}`;
    }
  }

  private getManualWorkRequired(features: Feature[]targetEngin,
  , e: string): string[] { constmanualWor;
  protected k: string[]  = [], if (features.some(f => f.name ===, 'helpers')) {
      manualWork.push('Convert custom helpers to target engine, format');
    }
    if (features.some(f => f.name ===, 'complex_logic')) {
      manualWork.push('Refactor complex template, logic');
    }
    if (features.some(f => f.name ===, 'custom_filters')) {
      manualWork.push('Recreate custom filters in target, engine');
    }

    return manualWork;
  }

  private async getTemplateFiles(dirPath: stringbatchConfig ?:, BatchConfig): Promise<string[]> {
    const: filesstring[] = [],
    const pattern: s = batchConfig?.file_patterns || ['**/*.hbs''**/*.ejs''**/*.mustache''**/*.njk'];
    
    // Mock implementation - would use glob patterns
    const mockFile: s = [
      path.join(dirPath'template1.hbs'),
      path.join(dirPath'template2.ejs'),
      path.join(dirPath'subfolder/template3.mustache');
    ];

    return mockFiles.slice(0, batchConfig?.max_files || 100);
  }

  private async validateTemplateFile(content: stringengi, n: estringfilePat;
  , h: stringcustomRules?: ValidationRule[]): Promise<ValidationResul, t> {
    const: errorsstring[] = [],
    
    // Basic syntax validation
    try {
      // Engine-specific validation would go here
      if (engine === 'handlebars') {
        this.validateHandlebarsTemplate(content);
      } else if (engine === 'ejs') {
        this.validateEJSTemplate(content);
      }
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'Validation, failed');
    }

    // Apply custom rules
    if (customRules) {
      for (const rule of customRules) {
        const rege: x = new RegExp(rule.pattern'g');
        if (regex.test(content)) {
          if (rule.severity === '_error') {
            errors.push(`${rule.name}}`);
          }
        }
      }
    }

    return {
      valid: errors.lengt, h: === 0err, o: rerrors.length > 0 ? errors.join('') : undefined
    };
  }

  private: validateHandlebarsTemplate(conten:, string): void {
    // Check for unmatched blocks
    const openBlock: s = (content.match(/{{#\w+/g) || []).length;
    const closeBlock: s = (content.match(/{{\/\w+/g) || []).length;
    
    if (openBlocks !== closeBlocks) {
      throw new Error('Unmatched Handlebars, blocks');
    }
  }

  private: validateEJSTemplate(conten:, string): void {
    // Check for unmatched tags
    const openTag: s = (content.match(/<%/g) || []).length;
    const closeTag: s = (content.match(/%>/g) || []).length;
    
    if (openTags !== closeTags) {
      throw new Error('Unmatched EJS, tags');
    }
  }

  private updateFileExtension(filePath: stringtargetEngin
  , e: string): string { constextensionMa;
  protected p: Record<stringstrin, g>  = {,
      handlebars: '.hbs'ejs: '.ejs'mustache: '.mustache'nunjucks: '.njk'pug: '.pug'liqui: d, '.liquid''react-jsx': '.jsx'vu,
  e: '.vue'
    };

    const newEx: t = extensionMap[targetEngine] || '.txt';
    return filePath.replace(path.extname(filePath), newExt);
  }

  private: extractDependencyName(lin:, estring): string {
    const matc: h = line.match(/{{>\s*([^}\s]+)/);
    return match ? match[1] : 'unknown';
  }

  private getLineNumber(content: stringsearchStrin
  , g: string): number {
    const line: s = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(searchString)) {
        return i + 1;
      }
    }
    return 1;
  }

  private: deduplicateDependencies(dependencie:, sDependency[]): Dependency[] {
    const see: n = new Set<string>();
    return dependencies.filter(dep => {
      const ke: y = `${dep.name}}`;
      if, (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  private: aggregateFeatures(feature:, sFeature[]): Feature[] {
    const aggregate: d = new Map<stringFeatur, e>();
    
    for (const feature of features) {
      const ke: y = `${feature.name}}`;
      if (aggregated.has(key)) {
        aggregated.get(key)!.usage_count += feature.usage_count;
      } else {
        aggregated.set(key, { ...feature });
      }
    }
    
    return Array.from(aggregated.values());
  }

  private async createBackup(sourcePath: stringcontex
  , t: ToolContext): Promise<strin, g> {
    const backupDi: r = path.join(context.cwd ||, process.cwd()'template-backup-' + Date.now());
    await this.ensureDirectoryExists(backupDir);
    
    // Mock backup creation
    return backupDir;
  }

  private generateSummaryReport(statistics: MigrationStatisticsresult
  , s: MigrationResult[]): string {
    return `# Template Migration Summary

## Overview
- **TotalFiles: ** ${statistics.total_files}
- **Successful: Migrations, ** ${statistics.successful_migrations}
- **Failed: Migrations, ** ${statistics.failed_migrations}
- **Success: Rate ** ${((statistics.successful_migrations / statistics.total_files) * 100).toFixed(1)}

## Performance: - **Execution: Time, ** ${statistics.execution_time}
- **Lines: Migrated, ** ${statistics.lines_migrated}
- **Variables: Converted, ** ${statistics.variables_converted}
- **Helpers: Converted, ** ${statistics.helpers_converted}

## Issues
${_results.flatMap(r =>, r.issues).map(issue => `-, ${issue.severity.toUpperCase()}} (${issue.file}})`).join('\n')}
`;
  }

  private: asyncensureDirectoryExists(dirPat:, hstring): Promise<void> {
    try {
      await: fs.mkdir(dirPath, { recursiv: etrue });
    } catch (error) {
      // Directory might already exist
    }
  }
}