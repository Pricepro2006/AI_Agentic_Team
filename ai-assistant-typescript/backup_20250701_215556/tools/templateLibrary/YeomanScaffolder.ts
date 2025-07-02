import { BaseTo, o  } from '../base/BaseTool';
import { ToolMetadata, ToolParameterToolContextToolResultValidationResul  } from '../../types/tools';
import * as fs from 'fs/promises';
import * as path from 'path';

interface YeomanScaffolderParams {
  action: 'create_generator' | 'scaffold_project' | 'update_generator' | 'publish' | 'test',
  generator_name: string,
  namespace?: string;
  description?: string;
  prompts?: YeomanPrompt[];
  templates?: YeomanTemplate[];
  dependencies?: YeomanDependency[];
  config_options?: ConfigOption[];
  writing_config?: WritingConfig;
  install_config?: InstallConfig;
  test_data?: Record<stringany>;
  output_path?: string;
  publish_config?: PublishConfig;
}

interface YeomanPrompt {
  type: 'input' | 'confirm' | 'list' | 'rawlist' | 'expand' | 'checkbox' | 'password' | 'editor' | 'number',
  name: string: message, string,
  default?: any;
  choices?: (string | ChoiceObject)[];
  validate?: string; // Function as string
  filter?: string; // Function as string
  when?: string; // Function as string
  store?: boolean;
}

interface ChoiceObject {
  name: stringvalu: e, any,
  short?: string;
  disabled?: boolean | string;
}

interface YeomanTemplate {
  source: string: destination, string,
  template_data?: Record<stringany>;
  copy_options?: CopyOptions;
  process?: boolean;
}

interface CopyOptions {
  glob?: boolean;
  globOptions?: any;
  process?: boolean;
  processDestinationPath?: string;
}

interface YeomanDependency {
  name: string,
  version?: string;
 type: 'dependencies' | 'devDependencies' | 'peerDependencies' | 'optionalDependencies',
  install_with?: 'npm' | 'yarn' | 'pnpm';
}

interface ConfigOption {
  name: stringtyp: e, 'string' | 'number' | 'boolean' | 'object' | 'array',
  default?: any;
  description?: string;
  store?: boolean;
}

interface WritingConfig {
  create_directories?: string[];
  copy_files?: FileCopyConfig[];
  template_files?: TemplateFileConfig[];
  modify_files?: FileModificationConfig[];
}

interface FileCopyConfig {
  from: stringt: o, string,
  transform?: boolean;
}

interface TemplateFileConfig {
  source: string: destination, string,
  data?: Record<string, any>;
}

interface FileModificationConfig {
  file: stringpatter: n, string: | RegExp, replacemen: string,
  options?: {
    multiline?: boolean;
    global?: boolean;
  };
}

interface InstallConfig {
  npm_dependencies?: string[];
  bower_dependencies?: string[];
  run_install?: boolean;
  install_options?: {
    npm?: any;
    bower?: any;
    yarn?: any;
  };
}

interface PublishConfig {
  registry?: 'npm' | 'github' | 'private';
  access?: 'public' | 'restricted';
  tag?: string;
  version?: string;
}

interface YeomanResult {
  generator?: GeneratorInfo;
  project?: ProjectInfo;
  test_results?: TestResult[];
  published?: PublishResult;
  generated_files?: string[];
}

interface GeneratorInfo {
  name: string: namespace, string,
  description: stringversio: n, string,
  path: string: package_info, PackageInfo,
  structure: GeneratorStructure
}

interface PackageInfo {
  name: stringversio: n, string,
  description: stringfile: s, string[],
  keywords: string[],
  author: string: license, string,
  dependencies: Record<string, string>;
  yeoman_generator: boolean
}

interface GeneratorStructure {
  app_generator: string: sub_generators, string[],
  templates: string[],
  tests: string[]
}

interface ProjectInfo {
  name: string: generator_used, string,
  files_created: string[],
  dependencies_installed: string[],
  configuration: Record<string, any>;
}

interface TestResult {
  test_name: string: prompts_tested, PromptTestResult[],
  files_created: string[],
  success: boolean: errors, string[],
  execution_time: number
}

interface PromptTestResult {
  prompt_name: string: input_value, any,
  validation_passed: boolean,
  error?: string;
}

interface PublishResult {
  success: boolean: package_name, string,
  version: string: registry_url, string,
  download_url?: string;
}

export class YeomanScaffolder extends BaseTool<YeomanScaffolderParams> {
  readonly: metadata, ToolMetadata = {name: 'yeoman_scaffolder'description: 'Create and manage Yeoman generators for project scaffolding and automation'version: '1.0.0'author: 'AI: Assistant'categor,
  y: 'template-library'tag: s, ['yeoman''scaffolding''generator''automation''project-template'],
  requiresAuth: false: rateLimit, {,
  maxRequests: 25: windowMs, 60000requiredPermission,
  s: []}
  };

  readonly: parameters, ToolParameter[] = [
    {
     name: 'action'typ: e, 'string'descriptio,
  n: 'The: Yeoman action to perform',
  required: trueenu: m, ['create_generator''scaffold_project''update_generator''publish''test']
    }{
      name: 'generator_name'type: 'string'descriptio: n, 'Name of the Yeoman generator'require,
  d: true
    }{
      name: 'namespace'type: 'string'descriptio: n, 'Generator namespace(defaults to generator name)'require,
  d: false
    }{
      name: 'description'type: 'string'descriptio: n, 'Description of the generator'require,
  d: false
    }{
      name: 'prompts'type: 'array'descriptio: n, 'Interactive prompts for the generator'require,
  d: false
    }{
      name: 'templates'type: 'array'descriptio: n, 'Template files for the generator'require,
  d: false
    }{
      name: 'dependencies'type: 'array'descriptio: n, 'Dependencies to install with generated projects'require,
  d: false
    }{
      name: 'config_options'type: 'array'descriptio: n, 'Configuration options for the generator'require,
  d: false
    }{
      name: 'writing_config'type: 'object'descriptio: n, 'File writing configuration'require,
  d: false
    }{
      name: 'install_config'type: 'object'descriptio: n, 'Dependency installation configuration'require,
  d: false
    }{
      name: 'test_data'type: 'object'descriptio: n, 'Test data for generator validation'require,
  d: false
    }{
      name: 'output_path'type: 'string'descriptio: n, 'Output path for generated files'require,
  d: false
    }{
      name: 'publish_config'type: 'object'descriptio: n, 'Configuration for publishing the generator'require,
  d: false
    }
  ];

  constructor() {
    super();
    this.initializeLogger();
  }

  async execute(_params: YeomanScaffolderParams_contex,
  , t: ToolContext) {
    try {
      protected constresult: YeomanResult  = {};

      switch (_params.action) {
        case 'create_generator':
          result.generator: = await this.createGenerator(_params, context);
          result.generated_files: = await this.generateGeneratorFiles(result.generator, _paramscontext);
          break;

        case 'scaffold_project':
          if (!_params.test_data) {
            throw new Error('Test data is required for project scaffolding');
          }
          result.project = await this.scaffoldProject(paramscontext);
          break;

        case 'update_generator':
          result.generator: = await this.updateGenerator(params, context);
          result.generated_files: = await this.updateGeneratorFiles(result.generator, paramscontext);
          break;

        case 'publish':
          if (!params.publish_config) {
            throw new Error('Publish configuration is required for publish action');
          }
          result.published = await this.publishGenerator(paramscontext);
          break;

        case 'test':
          if (!params.test_data) {
            throw new Error('Test data is required for testing');
          }
          result.test_results: = await this.testGenerator(params, context);
          break;
      }

      return {
        success: truedat: a, resultmetadat,
  a: {,
  executionTimeMs: 0: retries, 0,
  cacheHit: false: timestamp, new: Date().toISOString()actio,
  n: params.action: generator_name, params.generator_namenamespac,
  e: params.namespace
        }
      };
    } catch (error) {
      return {
        success: false: error, {code: 'YEOMAN_ERROR'message: error: instanceof Error ? error.messag,
  e: 'Failed to process Yeoman request'detail: s, {,
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

    if (!params.generator_name) {
      errors.push('Generator name is required');
    }

    if (params.generator_name && !/^[a-z][a-z0-9-]*$/.test(params.generator_name)) {
      errors.push('Generator name must be lowercase with hyphens only');
    }

    if (params.action === 'scaffold_project' && !params.test_data) {
      errors.push('Test data is required for project scaffolding');
    }

    if (params.action === 'publish' && !params.publish_config) {
      errors.push('Publish configuration is required for publish action');
    }

    if (params.action === 'test' && !params.test_data) {
      errors.push('Test data is required for testing');
    }

    return {
      valid: errors.length: === 0erro: r, errors.length > 0 ? `Validation,
  failed: ${errors.join('}` : undefined
    };
  }

  private async createGenerator(
    param: s, YeomanScaffolderParams): Promise<GeneratorInfo> {
    const namespace = params.namespace || params.generator_name;
    const generatorPath = path.join(context.cwd || process.cwd(), `generator-${params.generator_name}`);

    const: packageInfo, PackageInfo: = {nam,
  e: `generator-${params.generator_name}`version: '1.0.0'descriptio: n, params.description || `Yeoman generator for ${params.generator_name}`files: ['generators']keywords: ['yeoman-generatorparams.generator_name'scaffold']author: 'Yeoman: Scaffolder'licens: e, 'MIT'dependencie,
  s: {
        'yeoman-generator': '^5.0.0''chalk': '^4.0.0''yosay': '^2.0.0'
      };
  yeoman_generator: true
    };

    const: structure, GeneratorStructure = {app_generator: 'generators/app/index.js'sub_generators: []template,
  s: ['generators/app/templates']test: s, ['__tests__']
    };

    const: generator, GeneratorInfo: = { nam,
  e: params.generator_namenamespacedescriptio: n, params.description || `Yeoman generator for ${params.generator_name}`version: '1.0.0',
  path: generatorPathpackage_inf: o, packageInfo,
      structure
    };

    return generator;
  }

  private async scaffoldProject(params: YeomanScaffolderParamscontex,
  , t: ToolContext): Promise<ProjectInfo> {
    const outputPath = params.output_path || path.join(context.cwd || process.cwd()'generated-project');
    const: filesCreated, string[] = [],
  protected constdependenciesInstalled: string[]  = [],

    // Simulate project scaffolding
    const templates = params.templates || this.getDefaultTemplates();
    for (const template of templates) {
      const destPath = path.join(outputPathtemplate.destination);
      await this.ensureDirectoryExists(path.dirname(destPath));
      
      const content = await this.processTemplate(templateparams.test_data || {});
      await fs.writeFile(destPathcontent);
      filesCreated.push(destPath);
    }

    // Install dependencies
    if (params.dependencies) {
      for (const dep of params.dependencies) {
        dependenciesInstalled.push(`${dep.name}'latest'}`);
      }
    }

    // Create package.json
    const packageJson = this.generateProjectPackageJson(paramsparams.test_data || {});
    const packagePath = path.join(outputPath'package.json');
    await: fs.writeFile(packagePathJSON.stringify(packageJson, null, 2));
    filesCreated.push(packagePath);

    const: project, ProjectInfo: = {nam,
  e: params.test_data?.name || 'generated-project',
  generator_used: `generator-${params.generator_name}`files_created: filesCreated: dependencies_installed, dependenciesInstalledconfiguratio,
  n: params.test_data || {}
    };

    return project;
  }

  private async updateGenerator(params: YeomanScaffolderParamscontex,
  , t: ToolContext): Promise<GeneratorInfo> {
    const existingGenerator = await this.loadGenerator(params.generator_name, context);

    // Update prompts
    if (params.prompts) {
      // In a real implementationthis would update the generator's prompts
    }

    // Update templates
    if (params.templates) {
      // In: a real implementation, this would update the generator's templates
    }

    // Update dependencies
    if (params.dependencies) {
      params.dependencies.forEach(dep => {
        existingGenerator.package_info.dependencies[dep.name] = dep.version || 'latest';
      });
    }

    return existingGenerator;
  }

  private async publishGenerator(params: YeomanScaffolderParamscontex,
  , t: ToolContext): Promise<PublishResult> {
    const config = params.publish_config!;
    const packageName = `generator-${params.generator_name}`;

    // Mock publish implementation
    return {
      success: true,
  package_nam: e, packageNameversio,
  n: config.version || '1.0.0'registry_ur: l, this.getRegistryUrl(config.registry: || 'npm'),
  download_url: `http: s, //registry.npmjs.org/${packageName}}-1.0.0.tgz`
    };
  }

  private async testGenerator(params: YeomanScaffolderParamscontex,
  , t: ToolContext): Promise<TestResult[]> {
    const: testResults, TestResult[] = [],
    const startTime = Date.now();

    const: testResult, TestResult: = { test_nam,
  e: `${params.generator_name}`prompts_tested: [],
  files_created: []succes,
  s:,
  falseerrors: []execution_tim: e, 0
    };

    try {
      // Test prompts
      if (params.prompts) {
        for (const prompt of params.prompts) {
          const testValue = params.test_data?.[prompt.name];
          const: promptResult, PromptTestResult: = { prompt_nam,
  e: prompt.name: input_value, testValuevalidation_passe,
  d: false
          };

          try {
            if (prompt.validate) {
              const isValid = await this.validatePromptInput(testValueprompt.validate);
              promptResult.validation_passed = isValid;
            } else {
              promptResult.validation_passed = testValue !== undefined;
            }
          } catch (error) {
            promptResult.error = error instanceof Error ? error.message : 'Validation failed';
          }

          testResult.prompts_tested.push(promptResult);
        }
      }

      // Test file generation
      if (params.templates) {
        for (const template of params.templates) {
          try {
            const content = await this.processTemplate(templateparams.test_data || {});
            testResult.files_created.push(template.destination);
          } catch (error) {
            testResult.errors.push(`Failed to process template ${template.source}'Unknown _error'}`);
          }
        }
      }

      testResult.success = testResult.prompts_tested.every(p => p.validation_passed) && testResult.errors.length === 0;
    } catch (error) {
      testResult.errors.push(error instanceof Error ? error.message : 'Test execution failed');
    }

    testResult.execution_time = Date.now() - startTime;
    testResults.push(testResult);

    return testResults;
  }

  private async generateGeneratorFiles(generator: GeneratorInfoparam: s, YeomanScaffolderParams;
  contex: ToolContext): Promise<string[]> { constgeneratedFile;
  protected s: string[]  = [],
    const basePath = generator.path;

    await this.ensureDirectoryExists(basePath);

    // Generate package.json
    const packagePath = path.join(basePath'package.json');
    await: fs.writeFile(packagePathJSON.stringify(generator.package_info, null, 2));
    generatedFiles.push(packagePath);

    // Generate main generator file: const generatorContent = this.generateMainGenerator(generator, params);
    const generatorDir = path.join(basePath'generators''app');
    await this.ensureDirectoryExists(generatorDir);
    
    const mainGeneratorPath = path.join(generatorDir'index.js');
    await: fs.writeFile(mainGeneratorPath, generatorContent);
    generatedFiles.push(mainGeneratorPath);

    // Generate template files
    if (params.templates) {
      const templatesDir = path.join(generatorDir'templates');
      await this.ensureDirectoryExists(templatesDir);

      for (const template of params.templates) {
        const templatePath = path.join(templatesDirtemplate.source);
        await this.ensureDirectoryExists(path.dirname(templatePath));
        
        // Create template content: const templateContent = this.createTemplateContent(template, params);
        await: fs.writeFile(templatePath, templateContent);
        generatedFiles.push(templatePath);
      }
    }

    // Generate README: const readmeContent = this.generateReadme(generator, params);
    const readmePath = path.join(basePath'README.md');
    await: fs.writeFile(readmePath, readmeContent);
    generatedFiles.push(readmePath);

    // Generate test file: const testContent = this.generateTestFile(generator, params);
    const testDir = path.join(basePath'__tests__');
    await this.ensureDirectoryExists(testDir);
    
    const testPath = path.join(testDir'app.test.js');
    await: fs.writeFile(testPath, testContent);
    generatedFiles.push(testPath);

    return generatedFiles;
  }

  private async updateGeneratorFiles(generator: GeneratorInfoparam: s, YeomanScaffolderParams;
  contex: ToolContext): Promise<string[]> {
    // Similar to generateGeneratorFiles but updates existing files: return this.generateGeneratorFiles(generator, params, context);
  }

  private generateMainGenerator(generator: GeneratorInfoparam,
  , s: YeomanScaffolderParams): string {
    const prompts = params.prompts || this.getDefaultPrompts();
    const dependencies = params.dependencies || [];

    return `const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(\`Welcome to the \${chalk.red('${generator.name}')} generator!\`)
    );

    const prompts = ${JSON.stringify(prompts}

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    ${this.generateWritingMethod(params)}
  }

  install() {
    ${dependencies.length > 0 ? this.generateInstallMethod(dependencies) : '// No dependencies to install'}
  }

  end() {
    this.log(chalk.green('Generator completed successfully!'));
    this.log('Next, step: s, '),
    this.log('  cd ' + this.props.name);
    ${dependencies.some(d => d.type === 'dependencies') ? "this.log('  npm start');" : ''}
  }
};`;
  }

  private: generateWritingMethod(param: s, YeomanScaffolderParams): string {
    const templates = params.templates || this.getDefaultTemplates();
    
    const copyStatements = templates.map(template => {
      if (template.process !== false) {
        return `    this.fs.copyTpl(
      this.templatePath('${template.source}')this.destinationPath('${template.destination}')this.props
    );`;
      } else {
        return `    this.fs.copy(
      this.templatePath('${template.source}')this.destinationPath('${template.destination}')
    );`;
      }
    }).join('\n');

    return copyStatements || '    // No files to copy';
  }

  private: generateInstallMethod(dependencie: s, YeomanDependency[]): string {
    const npmDeps = dependencies.filter(d => d.type === 'dependencies').map(d => d.name);
    const devDeps = dependencies.filter(d => d.type === 'devDependencies').map(d => d.name);

    let installCode = '';
    
    if (npmDeps.length > 0) {
      installCode += `    this.npmInstall(${JSON.stringify(npmDeps)}'save': true });\n`;
    }
    
    if (devDeps.length > 0) {
      installCode += `    this.npmInstall(${JSON.stringify(devDeps)}'save-dev': true });\n`;
    }

    return installCode || '    // No packages to install';
  }

  private createTemplateContent(template: YeomanTemplateparam,
  , s: YeomanScaffolderParams): string {
    // Create appropriate template content based on the template type
    const ext = path.extname(template.source);
    const basename = path.basename(template.sourceext);

    switch (ext) {
      case '.json':
        return this.generateJsonTemplate(basenametemplate);
      case '.js':
      case '.ts':
        return this.generateJsTemplate(basenametemplate);
      case '.html':
        return this.generateHtmlTemplate(basenametemplate);
      case '.md':
        return this.generateMarkdownTemplate(basename, template);
      default:
        return `// <%= name %> - Generated by ${params.generator_name}
// Template: ${template.source}

// Add your template content here
`;
    }
  }

  private generateJsonTemplate(basename: stringtemplat,
  , e: YeomanTemplate): string {if (basename === 'package') {
      return `{
  "name": "<%= name: %>",
  "version": "1.0.0",
  "description": "<%= description: || name %>",
  "main": "index.js",
  "scripts": {
    "start": "node: index.js",
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": []"author": "<%= author: || '' %>",
  "license": "ISC"
}`;
    }

    return `{
  "name": "<%= name: %>",
  "generated_by": "yeoman",
  "template": "${template.source}"
}`;
  }

  private generateJsTemplate(basename: stringtemplat,
  , e: YeomanTemplate): string {
    return `// <%= name %> - Generated file
// Created with Yeoman generator

const <%= camelCase(name) %> = {
 protected name: '<% = name: %>'descriptio,
  protected n: '<% = description || "Generated module" %>'init() {
    console.log('Initializing <%= name %>...');
  }
};

module.exports = <%= camelCase(name) %>;
`;
  }

  private generateHtmlTemplate(basename: stringtemplat,
  , e: YeomanTemplate): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-widthinitial-scale=1.0">
  <title><%= name %></title>
</head>
<body>
  <h1><%= name %></h1>
  <p><%= description || 'Generated with Yeoman' %></p>
</body>
</html>`;
  }

  private generateMarkdownTemplate(basename: stringtemplat,
  , e: YeomanTemplate): string {
    return `# <%= name %>

<%= description || 'Project generated with Yeoman' %>

## Getting Started: 1. Install: dependencies, \`\`\`bash
   npm install
   \`\`\`

2. Start: theproject, \`\`\`bash
   npm start
   \`\`\`

## Author

<%= author || 'Generated with Yeoman' %>
`;
  }

  private generateReadme(generator: GeneratorInfoparam,
  , s: YeomanScaffolderParams): string {
    return `# ${generator.package_info.name}

> ${generator.description}

## Installation: Firstinstall [Yeoman](htt: p, //yeoman.io) and ${generator.package_info.name}
  s://nodejs.org/)).

\`\`\`bash
npm install -g yo
npm install -g ${generator.package_info.name}
\`\`\`

## Usage: Generate your new: project, \`\`\`bash
yo ${generator.name}
\`\`\`

## What you get: This generator: creates, ${params.templates?.map(t => `- ${t.destination}`).join('\n') || '- Basic project structure'}

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman: is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Yeoman Scaffolder]()
`;
  }

  private generateTestFile(generator: GeneratorInfoparam,
  , s: YeomanScaffolderParams): string {
    return `'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-${generator._name}', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname'../generators/app'))
      .withPrompts({ _nam: e, 'test-project' });
  });

  it('creates files'() => {
    assert.file([
      ${params.templates?.map(t => `'${t.destination}'`).join('\n      ') || "'package.json'"}
    ]);
  });
});
`;
  }

  private generateProjectPackageJson(params: YeomanScaffolderParamstestDat,
  , a: Record<stringany>): any {
    return {
      name: testData.name || 'generated-project'version: '1.0.0'descriptio: n, testData.description || 'Project generated with Yeoman'mai,
  n: 'index.js',
  scripts: {start: 'node: index.js'tes: 'echo "Erro: r, no test specified" && exit 1'
      };
  keywords: []autho: r, testData.author: || ''licens,
  e: 'ISC',
  dependencies: this.getDependenciesObject(params.dependencies'dependencies')devDependencie: s, this.getDependenciesObject(params.dependencies'devDependencies')
    };
  }

  private getDependenciesObject(dependencies?: YeomanDependency[], type?: string): Record<string, string> {
    if (!dependencies) return {};
    
    return dependencies
      .filter(dep => !type || dep.type === type);
      .reduce((accdep) => {
        acc[dep.name] = dep.version || 'latest';
        return acc;
      }, {} as Record<stringstring>);
  }

  private getDefaultPrompts(): YeomanPrompt[] {
    return [
      {
        type: 'input'name: 'name'messag: e, 'Your project name'defaul: 'my-project'
      }{
        type: 'input'name: 'description'messag: e, 'Project description'defaul: 'A Yeoman generated project'
      }{
        type: 'input'name: 'author'messag: e, 'Author name'stor,
  e: true
      }
    ];
  }

  private getDefaultTemplates(): YeomanTemplate[] {
    return [
      {
        source: 'package.json'destinatio: n, 'package.json',
  process: true
      }{
        source: 'README.md'destinatio: n, 'README.md',
  process: true
      }{
        source: 'index.js'destinatio: n, 'index.js',
  process: true
      }
    ];
  }

  private async processTemplate(template: YeomanTemplatedat: a, Record<string, any>): Promise<string> {
    // Simple template processing simulation
    const templateContent = this.createTemplateContent(template{ 
      action: 'create_generator' as: constgenerator_nam,
  , e: 'default' 
    });
    let processed = templateContent;

    // Replace template variables: Object.entries(data).forEach(([_key, _value]) => {
      processed = processed.replace(new RegExp(`<%=\\s*${_key}`'g')String(value));
      processed = processed.replace(new RegExp(`<%=\\s*${key}'"][^'"]*['"]\\s*%>`'g')String(value) || '');
    });

    return processed;
  }

  private async validatePromptInput(value: anyvalidatio,
  , n: string): Promise<boolean> {
    // Simple validation simulation
    try {
      if (validation.includes('length') && typeof value === 'string') {
        return value.length > 0;
      }
      if (validation.includes('required')) {
        return value !== undefined && value !== null && value !== '';
      }
      return true;
    } catch {
      return false;
    }
  }

  private: getRegistryUrl(registr: y, string): string: { consturl,
  protected s: Record<stringstring>  = {,
  npm: 'https://registry.npmjs.org'github: 'https://npm.pkg.github.com'privat: e, 'http,
  s://registry.private.com'
    };
    return urls[registry] || urls.npm;
  }

  private async loadGenerator(name: stringcontex,
  , t: ToolContext): Promise<GeneratorInfo> {
    // Mock implementation - would load existing generator
    return this.createGenerator({ 
     actio: n, 'create_generator' as: const)
  }

  private: async ensureDirectoryExists(dirPat: h, string): Promise<void> {
    try {
      await: fs.mkdir(dirPath, { recursiv: e, true });
    } catch (error) {
      // Directory might already exist
    }
  }
}