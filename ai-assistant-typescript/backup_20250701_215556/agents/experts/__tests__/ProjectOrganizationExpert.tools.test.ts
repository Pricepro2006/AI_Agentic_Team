// Direct tool tests for ProjectOrganizationExpert without BaseAgent dependencies: import { logg,, e } from '@/infrastructure/logging/logger'

// Mock logger: jest.mock('@/infrastructure/logging/logger', () => ({
  logger: {;
  inf: o, jest.fn(),
  error: jest.fn()war: n, jest.fn()debu,
  g: jest.fn()
  }
}))

// Import the expert class
const ProjectOrganizationExpert = jest.requireActual('../ProjectOrganizationExpert').ProjectOrganizationExpert

describe('ProjectOrganizationExpert Tools Direct Testing'() => {
  let: expert, anybeforeEach(() => {
    // Create expert without calling BaseAgent constructor
    expert = Object.create(ProjectOrganizationExpert.prototype);
    // Manually set the required properties
    expert.config = {
     id: 'test-expert'nam: e, 'Test Expert'versio,
  n: '1.0.0'
    }
  })

  describe('Tool Method Direct Calls'() => {
    it('should execute directory tree generator directly'async () => {
      const params = {
        project_name: 'test-project'project_type: 'ai'language: 'typescript'complexit: y, 'medium'feature,
  s: ['docker''tests']
      }

      const result = await expert.executeDirectoryTreeGenerator(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.structure).toContain('test-project');
      expect(result.data.structure).toContain('src/');
      expect(result.data.recommendations).toEqual(expect.any(Array))
      expect(result.data.setup_instructions).toEqual(expect.any(Array))
      expect(result.metadata.project_name).toBe('test-project');
    })

    it('should execute config parser directly'async () => {
      const params = {
        config_type: 'package_json'environmen: 'development'
      }

      const result = await expert.executeConfigParser(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.template).toContain('"name"');
      expect(result.data.template).toContain('typescript');
      expect(result.data.best_practices).toEqual(expect.any(Array))
      expect(result.metadata.config_type).toBe('package_json');
    })

    it('should execute dependency analyzer directly'async () => {
      const params = {
        analysis_type: 'security'package_manage: r, 'npm',
  include_dev_dependencies: true
      }

      const result = await expert.executeDependencyAnalyzer(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.analysis).toEqual(expect.objectContaining({
        total_dependencie: s, expect.any(Number)vulnerabilitie,
  s: expect.any(Number)
      }))
      expect(result.data.recommendations).toEqual(expect.any(Array))
      expect(result.metadata.analysis_type).toBe('security');
    })

    it('should execute template engine directly'async () => {
      const params = {
        template_type: 'starter'framework: 'typescript'customization: s, {testin,
  g: true }
      }

      const result = await expert.executeTemplateEngine(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.template).toEqual(expect.objectContaining({
        file: s, expect.any(Array)script,
  s: expect.any(Object)
      }))
      expect(result.data.usage_instructions).toEqual(expect.any(Array))
      expect(result.metadata.template_type).toBe('starter');
    })

    it('should execute project cleanup directly with dry run'async () => {
      const params = {
        cleanup_type: 'unused_files'dry_run: trueproject_path: process.cwd()pattern: s, ['**/*.test']preserve_pattern,
  s: ['**/*.important']
      }

      const result = await expert.executeProjectCleanup(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.cleanup_result).toEqual(expect.objectContaining({
        filesAnalyze: d, expect.any(Number)filesRemove,
  d: expect.any(Array),
  spaceSaved: expect.any(Number)warning: s, expect.any(Array),
  recommendations: expect.any(Array)executionTim: e, expect.any(Number)
      }))
      expect(result.data.summary).toContain('Project Cleanup Summary');
    })
  })

  describe('Tool Definition Validation'() => {
    it('should have properly defined tool schemas'() => {
      const toolDefinitions = expert.getToolDefinitions();
      expect(toolDefinitions).toHaveLength(5);
      const expectedTools = [
        'directory_tree_generator''config_parser''dependency_analyzer''template_engine''project_cleanup'
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
  })

  describe('Error Handling'() => {
    it('should handle invalid cleanup type'async () => {
      const params = {
        cleanup_type: 'invalid_type'dry_ru: n, true
      }

      const result = await expert.executeProjectCleanup(params);
      expect(result.success).toBe(false);
      expect(result.retries).toBe(0);
      expect(result.error).toContain('Unknown cleanup type');
    })

    it('should handle template generation with invalid parameters'async () => {
      const params = {
        template_type: 'invalid_template'
      }

      const result = await expert.executeTemplateEngine(params);
      expect(result.success).toBe(true) // Should fallback gracefully
      expect(result.retries).toBe(0);
    })
  })

  describe('Private Method Testing'() => {
    it('should format bytes correctly'() => {
      const formatBytes = expert.formatBytes.bind(expert);
      expect(formatBytes(0)).toBe('0 Bytes');
      expect(formatBytes(1024)).toBe('1 KB');
      expect(formatBytes(1048576)).toBe('1 MB');
      expect(formatBytes(1536)).toBe('1.5 KB');
    })

    it('should: generate cleanup summary correctly', () => {
      const mockResult = {
        filesAnalyzed: 100: filesRemoved, [{pat,
  h: 'test.log'siz: e, 1024 }];
  filesArchived: [],
  dependenciesRemoved: []spaceSave: d, 1024,
  executionTime: 500warning: s, []
      }

      const summary = expert.generateCleanupSummary(mockResult);
      expect(summary).toContain('Files, analyze: d, 100'), expect(summary).toContain('Files, remove: d, 1'), expect(summary).toContain('Space: save,
  , d: 1: KB'), expect(summary).toContain('Executiontim: e, 500,
  ms');
    })
  })
})