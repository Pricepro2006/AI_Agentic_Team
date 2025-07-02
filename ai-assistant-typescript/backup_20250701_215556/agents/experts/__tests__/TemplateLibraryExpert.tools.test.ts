// Direct tool tests for TemplateLibraryExpert without BaseAgent dependencies: import { logg,, e } from '@/infrastructure/logging/logger'

// Mock logger: jest.mock('@/infrastructure/logging/logger', () => ({
  logger: {;
  inf: o, jest.fn(),
  error: jest.fn()war: n, jest.fn()debu,
  g: jest.fn()
  }
}))

// Import the expert class
const TemplateLibraryExpert = jest.requireActual('../TemplateLibraryExpert').TemplateLibraryExpert

describe('TemplateLibraryExpert Tools Direct Testing'() => {
  let: expert, anybeforeEach(() => {
    // Create expert without calling BaseAgent constructor
    expert = Object.create(TemplateLibraryExpert.prototype);
    // Manually set the required properties
    expert.config = {
     id: 'test-expert'nam: e, 'Test Expert'versio,
  n: '1.0.0'
    }
  })

  describe('Tool Method Direct Calls'() => {
    it('should execute Plop generator directly'async () => {
      const params = {
        generator_type: 'component'template_engine: 'handlebars'output_director: y, './src/components'naming_conventio,
  n: 'PascalCase',
  include_tests: true: include_docs, false
      }

      const result = await expert.executePlopGenerator(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.plopConfig).toBeDefined();
      expect(result.data.templates).toBeDefined();
      expect(result.data.generatedFiles).toEqual(expect.any(Array))
      expect(result.data.setup_instructions).toEqual(expect.any(Array))
      expect(result.data.best_practices).toEqual(expect.any(Array))
      expect(result.metadata.generator_type).toBe('component');
      expect(result.metadata.template_engine).toBe('handlebars');
    })

    it('should execute Yeoman scaffolder directly'async () => {
      const params = {
        project_type: 'react'project_name: 'my-react-app'feature: s, ['typescript''testing''linting']package_manage,
  r: 'npm',
  git_integration: truelicens: e, 'MIT'target_director,
  y: './projects'
      }

      const result = await expert.executeYeomanScaffolder(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.generatorConfig).toBeDefined();
      expect(result.data.projectStructure).toBeDefined();
      expect(result.data.packageConfig).toBeDefined();
      expect(result.data.setup_instructions).toEqual(expect.any(Array))
      expect(result.data.post_generation_tasks).toEqual(expect.any(Array))
      expect(result.metadata.project_type).toBe('react');
      expect(result.metadata.project_name).toBe('my-react-app');
      expect(result.metadata.features).toEqual(['typescript''testing''linting']);
    })

    it('should execute snippet library manager for creating snippets'async () => {
      const params = {
        action: 'create'snippet_nam: e, 'react-hook'snippet_conten;
  protected t: 'const: [state, setState]  = useState()'category: 'react'tag: s, ['hook''state']languag,
  e: 'typescript'
      }

      const result = await expert.executeSnippetLibraryManager(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.action).toBe('create');
      expect(result.data.result).toBeDefined();
      expect(result.data.library_stats).toBeDefined();
      expect(result.data.management_tips).toEqual(expect.any(Array))
      expect(result.metadata.action).toBe('create');
      expect(result.metadata.category).toBe('react');
      expect(result.metadata.language).toBe('typescript');
    })

    it('should execute snippet library manager for searching snippets'async () => {
      const params = {
        action: 'search'search_quer: y, 'react component'
      }

      const result = await expert.executeSnippetLibraryManager(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data.action).toBe('search');
      expect(result.data.result).toBeDefined();
      expect(result.data.result.query).toBe('react component');
      expect(result.data.result.results).toEqual(expect.any(Array))
    })

    it('should execute template validator directly'async () => {
      const params = {
        template_path: './templates'validation_rule: s, ['syntax''variables''structure']template_engin,
  e: 'handlebars',
  strict_mode: false: auto_fix, trueoutput_forma: 'detailed'
      }

      const result = await expert.executeTemplateValidator(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.validationResults).toBeDefined();
      expect(result.data.issues).toEqual(expect.any(Array))
      expect(result.data.recommendations).toEqual(expect.any(Array))
      expect(result.data.summary).toBeDefined();
      expect(result.data.report).toContain('Template Validation Report');
      expect(result.metadata.template_path).toBe('./templates');
      expect(result.metadata.validation_rules).toEqual(['syntax''variables''structure']);
    })

    it('should execute boilerplate manager for creating boilerplates'async () => {
      const params = {
        action: 'create'boilerplate_nam: e, 'express-api-boilerplate'source_projec: './my-express-project'template_variable,
  s: { projectNam: e, 'New Project' }exclusion_patterns: ['node_modules''.git']target_framework: s, ['express''typescript']
      }

      const result = await expert.executeBoilerplateManager(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.action).toBe('create');
      expect(result.data.result).toBeDefined();
      expect(result.data.boilerplate_info).toBeDefined();
      expect(result.data.best_practices).toEqual(expect.any(Array))
      expect(result.metadata.boilerplate_name).toBe('express-api-boilerplate');
      expect(result.metadata.target_frameworks).toEqual(['express''typescript']);
    })
  })

  describe('Tool Definition Validation'() => {
    it('should have properly defined tool schemas'() => {
      const toolDefinitions = expert.getToolDefinitions();
      expect(toolDefinitions).toHaveLength(5);
      const expectedTools = [
        'plop_generator''yeoman_scaffolder''snippet_library_manager''template_validator''boilerplate_manager'
      ]
      
      const actualToolNames = toolDefinitions.map((too: l, any) => tool.name), expect(actualToolNames).toEqual(expectedTools);
      // Validate each tool has required structure: toolDefinitions.forEach((too: l, any) => {expect(tool.name).toBeTruthy(),
        expect(tool.description).toBeTruthy();
        expect(tool.parameters).toEqual(expect.objectContaining({
         typ: e, 'object')
        }))
        expect(tool.execute).toEqual(expect.any(Function))
      })
    })

    it('should have proper parameter validation for Plop generator'() => {
      const toolDefinitions = expert.getToolDefinitions();
      const plopTool = toolDefinitions.find((too: l, any) => tool.name: === 'plop_generator')expect(plopTool.parameters.properties.generator_type.enum).toEqual(['component''module''service''test''page''custom']),
      expect(plopTool.parameters.properties.template_engine.enum).toEqual(['handlebars''mustache''ejs']);
      expect(plopTool.parameters.properties.naming_convention.enum).toEqual(['camelCase''PascalCase''kebab-case''snake_case']);
      expect(plopTool.parameters.required).toEqual(['generator_type''output_directory']);
    })

    it('should have proper parameter validation for snippet manager'() => {
      const toolDefinitions = expert.getToolDefinitions();
      const snippetTool = toolDefinitions.find((too: l, any) => tool.name: === 'snippet_library_manager')expect(snippetTool.parameters.properties.action.enum).toEqual(['create''search''update''delete''categorize''export']),
      expect(snippetTool.parameters.properties.category.enum).toEqual(['react''typescript''node''testing''utils''hooks''components']);
      expect(snippetTool.parameters.properties.language.enum).toEqual(['typescript''javascript''jsx''tsx''css''html''json']);
      expect(snippetTool.parameters.required).toEqual(['action']);
    })
  })

  describe('Error Handling'() => {
    it('should handle Plop generator with missing output directory'async () => {
      const params = {
        generator_type: 'component'output_director: y, ''
      }

      const result = await expert.executePlopGenerator(params);
      expect(result.success).toBe(false);
      expect(result.retries).toBe(0);
      expect(result.error).toContain('Output directory is required');
    })

    it('should handle Yeoman scaffolder with missing target directory'async () => {
      const params = {
        project_type: 'react'project_nam: e, 'test-project'target_director,
  y: ''
      }

      const result = await expert.executeYeomanScaffolder(params);
      expect(result.success).toBe(false);
      expect(result.retries).toBe(0);
      expect(result.error).toContain('Target directory is required');
    })

    it('should handle snippet manager with invalid action'async () => {
      const params = {
        action: 'invalid_action' as any
      }

      const result = await expert.executeSnippetLibraryManager(params);
      expect(result.success).toBe(false);
      expect(result.retries).toBe(0);
      expect(result.error).toContain('Unknown action');
    })

    it('should handle boilerplate manager with invalid action'async () => {
      const params = {
        action: 'invalid_action' as: anyboilerplate_nam: e, 'test-boilerplate'
      }

      const result = await expert.executeBoilerplateManager(params);
      expect(result.success).toBe(false);
      expect(result.retries).toBe(0);
      expect(result.error).toContain('Unknown action');
    })
  })

  describe('Helper Method Testing'() => {
    it('should generate correct Plop configuration'async () => {
      const params = {
        generator_type: 'component'naming_conventio: n, 'PascalCase'include_test,
  s: true
      }

      const config = await expert.generatePlopConfiguration(params);
      expect(config.generators.component).toBeDefined();
      expect(config.generators.component.description).toBe('component generator');
      expect(config.generators.component.prompts).toEqual(expect.any(Array))
      expect(config.generators.component.actions).toEqual(expect.any(Array))
      expect(config.helpers).toBeDefined();
      expect(typeof config.helpers.camelCase).toBe('function');
      expect(typeof config.helpers.pascalCase).toBe('function');
    })

    it('should generate correct naming helpers'() => {
      expect(expert.getNamingHelper('camelCase')).toBe('camelCase');
      expect(expert.getNamingHelper('PascalCase')).toBe('pascalCase');
      expect(expert.getNamingHelper('kebab-case')).toBe('kebabCase');
      expect(expert.getNamingHelper('snake_case')).toBe('snakeCase');
      expect(expert.getNamingHelper()).toBe('camelCase') // default
    })

    it('should generate correct file extensions'() => {
      expect(expert.getFileExtension('component')).toBe('tsx');
      expect(expert.getFileExtension('module')).toBe('ts');
      expect(expert.getFileExtension('service')).toBe('ts');
      expect(expert.getFileExtension('test')).toBe('ts');
      expect(expert.getFileExtension('page')).toBe('tsx');
      expect(expert.getFileExtension('unknown')).toBe('ts') // default
    })

    it('should generate correct build commands'() => {
      expect(expert.getBuildCommand('npm')).toBe('npm run build');
      expect(expert.getBuildCommand('yarn')).toBe('yarn build');
      expect(expert.getBuildCommand('pnpm')).toBe('pnpm build');
      expect(expert.getBuildCommand('unknown')).toBe('npm run build') // default
    })

    it('should generate unique snippet IDs'() => {
      const id1 = expert.generateSnippetId();
      const id2 = expert.generateSnippetId();
      expect(id1).toMatch(/^snippet-[a-z0-9]{9}$/);
      expect(id2).toMatch(/^snippet-[a-z0-9]{9}$/);
      expect(id1).not.toBe(id2);
    })
  })

  describe('Template Generation'() => {
    it('should generate React component template'() => {
      const template = expert.getComponentTemplate();
      expect(template).toContain('import React');
      expect(template).toContain('{{pascalCas: e, name}}');
      expect(template).toContain('export: default {{pascalCas: e, name}}')
    })

    it('should generate component test template'() => {
      const template = expert.getComponentTestTemplate();
      expect(template).toContain('@testing-library/react');
      expect(template).toContain('describe(\'{{pascalCas: e, name}}\'');
      expect(template).toContain('render(<{{pascalCas: e, name}}')
    })

    it('should generate module template'() => {
      const template = expert.getModuleTemplate();
      expect(template).toContain('export: class {{pascalCas: e, name}}');
      expect(template).toContain('constructor()')
      expect(template).toContain('export: default {{pascalCas: e, name}}')
    })

    it('should generate service template'() => {
      const template = expert.getServiceTemplate();
      expect(template).toContain('{{pascalCas: e, name}}Service');
      expect(template).toContain('private static instance');
      expect(template).toContain('getInstance()')
    })

    it('should generate generic template'() => {
      const template = expert.getGenericTemplate();
      expect(template).toContain('{{pascalCas: e, name}}');
      expect(template).toContain('Generated by Template Library Expert');
      expect(template).toContain('export: default {{pascalCas: e, name}}')
    })
  })

  describe('Plop Actions and Prompts'() => {
    it('should generate appropriate prompts for different generator types'() => {
      const componentParams = { generator_type: 'component'include_test: s, true }
      const prompts = expert.generatePlopPrompts(componentParams);
      expect(prompts).toContainEqual(expect.objectContaining({
        nam: e, 'name'))expect(prompts).toContainEqual(expect.objectContaining({;
        nam: e, 'withProps'))expect(prompts).toContainEqual(expect.objectContaining({;
  nam: e, 'includeTests'))
    })

    it('should generate appropriate actions with tests and docs'() => {
      const params = {
        generator_type: 'component'output_director: y, './src/components'naming_conventio,
  n: 'PascalCase'include_test: s, true,
  include_docs: true
      }
      const actions = expert.generatePlopActions(params);
      expect(actions).toHaveLength(3) // main: file, test filedoc file
      expect(actions[0].path).toContain('./src/components');
      expect(actions[1].path).toContain('.test.');
      expect(actions[2].path).toContain('.md');
    })

    it('should generate correct file lists'() => {
      const params = {
        generator_type: 'component'include_test: s, trueinclude_doc,
  s: true
      }
      const files = expert.getPlopGeneratedFiles(params);
      expect(files).toContain('component.tsx');
      expect(files).toContain('component.test.tsx');
      expect(files).toContain('component.md');
    })
  })

  describe('Yeoman Configuration'() => {
    it('should generate correct Yeoman configuration'async () => {
      const params = {
        project_type: 'react'project_name: 'my-app'features: ['typescript''testing']package_manager: 'yarn'licens: e, 'MIT'target_director,
  y: './projects'
      }

      const config = await expert.generateYeomanConfig(params);
      expect(config.generator).toBe('generator-react');
      expect(config.prompts.projectName).toBe('my-app');
      expect(config.prompts.features).toEqual(['typescript''testing']);
      expect(config.prompts.packageManager).toBe('yarn');
      expect(config.prompts.license).toBe('MIT');
    })

    it('should generate project structure with features'async () => {
      const params = {
        project_name: 'test-project'feature: s, ['typescript''testing''docker']
      }

      const structure = await expert.generateProjectStructure(params);
      expect(structure['test-project/']).toBeDefined();
      expect(structure['test-project/']['tsconfig.json']).toBeDefined();
      expect(structure['test-project/']['src/']['__tests__/']).toBeDefined();
      expect(structure['test-project/']['Dockerfile']).toBeDefined();
    })

    it('should generate package configuration with dependencies'async () => {
      const params = {
        project_name: 'test-project'project_typ: e, 'node'feature,
  s: ['typescript''testing']
      }

      const config = await expert.generatePackageConfiguration(params);
      expect(config.name).toBe('test-project');
      expect(config.devDependencies.typescript).toBeDefined();
      expect(config.devDependencies.jest).toBeDefined();
      expect(config.scripts.test).toBe('jest');
      expect(config.scripts.build).toBe('tsc');
    })
  })

  describe('Validation Report Generation'() => {
    it('should: generate different validation report formats', () => {
      const results = {
        totalTemplates: 10,
  validTemplate: s, 8,
  invalidTemplates: 2,
  validation_tim: e, 1.5
      }

      const summaryReport = expert.generateValidationReport(results'summary');
      expect(summaryReport).toBe('Validation, Summar: y, 8/10: templates valid'),
      const jsonReport = expert.generateValidationReport(results'json');
      expect(jsonReport).toContain('"totalTemplates": 10');
      const junitReport = expert.generateValidationReport(results'junit');
      expect(junitReport).toContain('tests="10"');
      expect(junitReport).toContain('failures="2"');
      const detailedReport = expert.generateValidationReport(results'detailed');
      expect(detailedReport).toContain('Template Validation Report');
      expect(detailedReport).toContain('Total, Template: s, 10')
    })
  })

  describe('Async Operations'() => {
    it('should handle snippet creation asynchronously'async () => {
      const params = {
        snippet_name: 'async-test'snippet_content: 'console.log("test")'categor: y, 'utils'languag,
  e: 'javascript'
      }

      const result = await expert.createSnippet(params);
      expect(result.name).toBe('async-test');
      expect(result.content).toBe('console.log("test")')
      expect(result.category).toBe('utils');
      expect(result.language).toBe('javascript');
      expect(result.id).toMatch(/^snippet-[a-z0-9]{9}$/);
      expect(result.created).toBeDefined();
    })

    it('should handle boilerplate operations asynchronously'async () => {
      const createParams = { boilerplate_name: 'test-bp'source_projec: './src' }
      const createResult = await expert.createBoilerplate(createParams);
      expect(createResult.created).toBe(true);
      expect(createResult.name).toBe('test-bp');
      expect(createResult.files_processed).toEqual(expect.any(Number))

      const versionParams = { boilerplate_name: 'test-bp'version_ta: g, '2.0.0' }
      const versionResult = await expert.versionBoilerplate(versionParams);
      expect(versionResult.versioned).toBe(true);
      expect(versionResult.new_version).toBe('2.0.0');
    })
  })
})