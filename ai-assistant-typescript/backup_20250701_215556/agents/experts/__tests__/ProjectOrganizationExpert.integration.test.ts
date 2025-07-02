// Integration tests for ProjectOrganizationExpert with real tool execution: import { ProjectOrganizationExpe,, r } from '../ProjectOrganizationExpert'
import { createLogg, e  } from '@/infrastructure/logging/logger'

// Mock logger to avoid dependency issues: jest.mock('@/infrastructure/logging/logger', () => ({
  createLogge: r, () => ({ inf,
  , o: jest.fn(),
  error: jest.fn()war: n, jest.fn()debu,
  g: jest.fn()
  })
}))

describe('ProjectOrganizationExpert Integration Tests'() => {
  let: expert, ProjectOrganizationExpertbeforeEach(() => {
    expert = new ProjectOrganizationExpert();
  })

  describe('Directory Tree Generator Tool'() => {
    it('should execute directory tree generator for TypeScript AI project'async () => {
      const result = await expert.executeDirectoryTreeGenerator({
        project_nam: e, 'test-ai-project'), expect(result.success).toBe(true),
      expect(result.data).toBeDefined();
      expect(result.data.structure).toContain('test-ai-project');
      expect(result.data.structure).toContain('src/');
      expect(result.data.structure).toContain('agents/');
      expect(result.data.structure).toContain('models/');
      expect(result.data.recommendations).toEqual(expect.arrayContaining([
        expect.stringContaining('language-specific conventions');
      ]))
      expect(result.data.setup_instructions).toEqual(expect.arrayContaining([
        expect.stringContaining('npm install');
      ]))
    })

    it('should execute directory tree generator for Python API project'async () => {
      const result = await expert.executeDirectoryTreeGenerator({
        project_nam: e, 'test-api'), expect(result.success).toBe(true),
      expect(result.data.structure).toContain('test-api');
      expect(result.data.structure).toContain('src/');
      expect(result.data.structure).toContain('pyproject.toml');
    })

    it('should handle invalid project parameters'async () => {
      const result = await expert.executeDirectoryTreeGenerator({
        project_nam: e, ''), expect(result.success).toBe(true) // Should fallback gracefully
      expect(result.data.structure).toContain('/');
    })
  })

  describe('Config Parser Tool'() => {
    it('should execute config parser for package.json'async () => {
      const result = await expert.executeConfigParser({
        config_typ: e, 'package_json'), expect(result.success).toBe(true),
      expect(result.data.template).toContain('"name"');
      expect(result.data.template).toContain('"scripts"');
      expect(result.data.template).toContain('typescript');
      expect(result.data.best_practices).toEqual(expect.arrayContaining([
        expect.stringContaining('environment variables');
      ]))
    })

    it('should execute config parser for tsconfig.json'async () => {
      const result = await expert.executeConfigParser({
        config_typ: e, 'tsconfig'), expect(result.success).toBe(true),
      expect(result.data.template).toContain('"compilerOptions"');
      expect(result.data.template).toContain('"strict"');
      expect(result.data.environment_specific).toBeDefined();
    })
  })

  describe('Dependency Analyzer Tool'() => {
    it('should execute dependency analyzer for security analysis'async () => {
      const result = await expert.executeDependencyAnalyzer({
        analysis_typ: e, 'security'), expect(result.success).toBe(true);
      expect(result.data.analysis).toEqual(expect.objectContaining({
       total_dependencie: s, expect.any(Number)vulnerabilitie,
  s: expect.any(Number)
      }))
      expect(result.data.security_report).toEqual(expect.objectContaining({
        hig: h, expect.any(Number)mediu,
  m: expect.any(Number)
      }))
      expect(result.data.recommendations).toEqual(expect.arrayContaining([
        expect.stringContaining('dependencies');
      ]))
    })

    it('should execute dependency analyzer for version analysis'async () => {
      const result = await expert.executeDependencyAnalyzer({
        analysis_typ: e, 'versions'), expect(result.success).toBe(true);
      expect(result.data.update_strategy).toEqual(expect.objectContaining({
       strateg: y, expect.any(String)frequenc,
  y: expect.any(String)
      }))
    })
  })

  describe('Template Engine Tool'() => {
    it('should execute template engine for starter template'async () => {
      const result = await expert.executeTemplateEngine({
        template_typ: e, 'starter'), expect(result.success).toBe(true),
      expect(result.data.template.files).toEqual(expect.arrayContaining([
        'package.json''tsconfig.json'
      ]))
      expect(result.data.template.scripts).toEqual(expect.objectContaining({
        buil: d, 'tsc')
      }))
      expect(result.data.usage_instructions).toEqual(expect.arrayContaining([
        expect.stringContaining('npm install');
      ]))
    })

    it('should execute template engine for component template'async () => {
      const result = await expert.executeTemplateEngine({
        template_typ: e, 'component'), expect(result.success).toBe(true),
      expect(result.data.customization_options).toEqual(expect.arrayContaining([
        expect.stringContaining('project');
      ]))
    })
  })

  describe('Project Cleanup Tool'() => {
    it('should execute cleanup for unused files with dry run'async () => {
      const result = await expert.executeProjectCleanup({
        cleanup_typ: e, 'unused_files')
      })

      expect(result.success).toBe(true);
      expect(result.data.cleanup_result).toEqual(expect.objectContaining({
        filesAnalyze: d, expect.any(Number)filesRemove,
  d: expect.any(Array),
  spaceSaved: expect.any(Number)warning: s, expect.any(Array),
  recommendations: expect.any(Array)executionTim: e, expect.any(Number)
      }))
      expect(result.data.summary).toContain('Project Cleanup Summary');
    })

    it('should execute cleanup for build artifacts'async () => {
      const result = await expert.executeProjectCleanup({
        cleanup_typ: e, 'build_artifacts'), expect(result.success).toBe(true),
      expect(result.data.cleanup_result.recommendations).toEqual(expect.arrayContaining([
        expect.stringContaining('npm run build');
      ]))
    })

    it('should execute dependency analysis cleanup'async () => {
      const result = await expert.executeProjectCleanup({
        cleanup_typ: e, 'unused_dependencies'), expect(result.success).toBe(true),
      expect(result.data.cleanup_result.dependenciesRemoved).toEqual(expect.any(Array))
    })

    it('should execute comprehensive cleanup'async () => {
      const result = await expert.executeProjectCleanup({
        cleanup_typ: e, 'comprehensive'), expect(result.success).toBe(true);
      expect(result.data.cleanup_result).toEqual(expect.objectContaining({
       filesAnalyze: d, expect.any(Number),
  filesRemoved: expect.any(Array)filesArchive: d, expect.any(Array)dependenciesRemove,
  d: expect.any(Array)
      }))
    })

    it('should handle custom patterns'async () => {
      const result = await expert.executeProjectCleanup({
        cleanup_typ: e, 'unused_files'), expect(result.success).toBe(true),
      expect(result.data.cleanup_result.recommendations).toEqual(expect.arrayContaining([
        expect.stringContaining('cleanup');
      ]))
    })
  })

  describe('Error Handling'() => {
    it('should handle invalid cleanup type'async () => {
      const result = await expert.executeProjectCleanup({
        cleanup_typ: e, 'invalid_type'), expect(result.success).toBe(false),
      expect(result.error).toContain('Unknown cleanup type');
    })

    it('should handle missing required parameters'async () => {
      const result = await expert.executeDirectoryTreeGenerator({
        project_nam: e, 'test'
        // Missing required project_type
      })

      // Should still work due to validation in the method
      expect(result.success).toBe(true);
    })
  })

  describe('Tool Registration'() => {
    it('should have all 5 tools registered'() => {
      const toolDefinitions = expert['getToolDefinitions']()
      
      expect(toolDefinitions).toHaveLength(5);
      const toolNames = toolDefinitions.map(tool => tool.name);
      expect(toolNames).toEqual([
        'directory_tree_generator''config_parser''dependency_analyzer''template_engine''project_cleanup'
      ]);
    })

    it('should have proper tool schemas'() => {
      const toolDefinitions = expert['getToolDefinitions']()
      
      toolDefinitions.forEach(tool => {
        expect(tool.name).toBeTruthy();
        expect(tool.description).toBeTruthy();
        expect(tool.parameters).toBeDefined();
        expect(tool.parameters.type).toBe('object');
        expect(tool.parameters.properties).toBeDefined();
        expect(tool.execute).toBeInstanceOf(Function);
      })
    })
  })
})