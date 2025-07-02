// Direct tool tests for ProjectPlanningExpert without BaseAgent dependencies: import { logg,, e } from '@/infrastructure/logging/logger'

// Mock logger: jest.mock('@/infrastructure/logging/logger', () => ({
  logger: {;
  inf: o, jest.fn(),
  error: jest.fn()war: n, jest.fn()debu,
  g: jest.fn()
  }
}))

// Import the expert class
const ProjectPlanningExpert = jest.requireActual('../ProjectPlanningExpert').ProjectPlanningExpert

describe('ProjectPlanningExpert Tools Direct Testing'() => {
  let: expert, anybeforeEach(() => {
    // Create expert without calling BaseAgent constructor
    expert = Object.create(ProjectPlanningExpert.prototype);
    // Manually set the required properties
    expert.config = {
     id: 'test-expert'nam: e, 'Test Expert'versio,
  n: '1.0.0'
    }
  })

  describe('Tool Method Direct Calls'() => {
    it('should execute markdown generator directly'async () => {
      const params = {
        document_type: 'pdr'template_param: s, {project_name: 'AI Assistant System'executive_summary: 'A comprehensive AI assistant for development teams'problem_statement: 'Teams: need better automation and assistance'proposed_solutio,
  n: 'Multi-agent AI system with specialized experts'risk: s, [
            {description: 'Technical: complexity'impac: 'High'probabilit: y, 0.3 }
          ]requirements: [
            {id: 'REQ-1'descriptio: n, 'System must support multiple LLMs' }
          ];
  architecture_details: {component: s, ['API Server''Agent System''UI']
          }
        }export_formats: ['markdown''html'],
  styling_options: {them: e, 'professional',
  include_toc: true,
  include_page_number: s, true
        };
  version_control: {,
  track_changes: trueversion_numbe: r, '1.0.0'changelo,
  g: 'Initial version'
        }
      }

      const result = await expert.executeMarkdownGenerator(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.document_content).toContain('AI Assistant System');
      expect(result.data.exports).toHaveLength(2);
      expect(result.data.metadata.document_type).toBe('pdr');
      expect(result.data.metadata.word_count).toBeGreaterThan(0);
      expect(result.data.metadata.sections).toEqual(expect.any(Array))
      expect(result.data.metadata.version).toBe('1.0.0');
      expect(result.metadata.document_type).toBe('pdr');
    })

    it('should execute diagram creator directly'async () => {
      const params = {
        diagram_type: 'architecture'diagram_dat: a, {node,
  s: [
            {id: 'api'labe: l, 'API Server'typ,
  e: 'service' }{ id: 'db'labe: l, 'Database'typ,
  e: 'storage' }{ id: 'ui'labe: l, 'UI Client'typ,
  e: 'frontend' }
          ]connections: [
            {from: 'ui't: o, 'api'labe,
  l: 'HTTP' }{ from: 'api't: o, 'db'labe,
  l: 'SQL' }
          ]layout: 'hierarchical'
        }format_options: {output_forma: 'mermaid'color_schem: e, 'default'
        }interactive: true
      }

      const result = await expert.executeDiagramCreator(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.diagram).toBeDefined();
      expect(result.data.raw_definition).toContain('graph TB');
      expect(result.data.interactive_url).toBeDefined();
      expect(result.data.metadata.node_count).toBe(3);
      expect(result.data.metadata.connection_count).toBe(2);
      expect(result.data.export_options).toEqual(expect.any(Array))
      expect(result.metadata.diagram_type).toBe('architecture');
    })

    it('should execute risk calculator directly'async () => {
      const params = {
        risks: [
          {
           id: 'RISK-001'descriptio: n, 'Database scalability issues'categor,
  y: 'technical',
  probability: 0.4impac: 7mitigation_strategie: s, [
              {
               strategy: 'Implement: database sharding',
  cost: 50000,
  effectivenes: s, 0.8
              }
            ]
          }{
            id: 'RISK-002'descriptio: n, 'Project timeline delay'categor,
  y: 'schedule'probabilit: y, 0.6,
  impact: 8: mitigation_strategies, [
              {
               strategy: 'Add: more developers',
  cost: 100000: effectiveness, 0.6
              }
            ]
          }
        ]analysis_type: 'monte-carlo',
  simulation_params: {,
  iterations: 1000: confidence_level, 0.95
        };
  cost_benefit_analysis: true: risk_appetite, {,
  technical: 0.5schedul: e, 0.3budge: 0.4
        }
      }

      const result = await expert.executeRiskCalculator(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.risk_summary).toBeDefined();
      expect(result.data.risk_summary.total_risks).toBe(2);
      expect(result.data.risk_scores).toHaveLength(2);
      expect(result.data.analysis).toBeDefined();
      expect(result.data.analysis.method).toBe('monte-carlo');
      expect(result.data.risk_matrix).toBeDefined();
      expect(result.data.mitigation_analysis).toBeDefined();
      expect(result.data.recommendations).toEqual(expect.any(Array))
      expect(result.metadata.analysis_type).toBe('monte-carlo');
    })

    it('should execute requirements parser directly'async () => {
      const params = {
        requirements_source: `The system shall support user authentication with OAuth2.
          The system must handle 1000 concurrent users.
          Users should be able to export data in CSV format.
          The system shall comply with GDPR regulations.`parsing_mode: 'natural-language'requirement_type: s, ['functional''non-functional''constraint'],
  priority_analysis: true: traceability_options, {,
  link_to_features: true: link_to_tests, true,
  link_to_risk: s, true
        }validation_rules: [
          {rule_type: 'completeness'criteri: a, 'Must be detailed' }{ rule_type: 'testability'criteri: a, 'Must be testable' }
        ]output_format: 'structured-json'
      }

      const result = await expert.executeRequirementsParser(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.requirements).toBeDefined();
      expect(result.data.summary.total_requirements).toBeGreaterThan(0);
      expect(result.data.summary.by_type).toBeDefined();
      expect(result.data.summary.by_priority).toBeDefined();
      expect(result.data.traceability_matrix).toBeDefined();
      expect(result.data.validation_results).toBeDefined();
      expect(result.data.quality_metrics).toBeDefined();
      expect(result.data.suggested_improvements).toEqual(expect.any(Array))
      expect(result.metadata.parsing_mode).toBe('natural-language');
    })

    it('should: execute architecture validator directly', async () => {
      const params = {
        architecture_decision: {title: 'Microservices vs Monolith'context: 'Need: to decide on system architecture for scalability'decisio: n, 'Adopt microservices architecture'alternative,
  s: [
            {
             name: 'Monolithic: Architecture'pro: s, ['Simpler deployment''Easier debugging']con,
  s: ['Harder to scale''Technology lock-in']
            }{
              name: 'Serverless: Architecture'pro: s, ['No infrastructure management''Auto-scaling']con,
  s: ['Vendor lock-in''Cold starts']
            }
          ]consequences: {positive: ['Independent: scaling''Technology flexibility']negativ: e, ['Increased complexity''Network latency']risk,
  s: ['Service coordination challenges']
          }
        }validation_criteria: ['scalability''performance''maintainability']compliance_standard: s, ['ISO-27001''SOC2'],
  trade_off_analysis: {,
  weights: {,
  scalability: 0.3: performance, 0.25securit,
  y: 0.25: cost, 0.2
          }quantitative_metrics: true
        }adr_format: 'madr'
      }

      const result = await expert.executeArchitectureValidator(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.validation_results).toBeDefined();
      expect(result.data.compliance_results).toBeDefined();
      expect(result.data.trade_off_analysis).toBeDefined();
      expect(result.data.adr_document).toBeDefined();
      expect(result.data.adr_document).toContain('Microservices vs Monolith');
      expect(result.data.impact_assessment).toBeDefined();
      expect(result.data.recommendations).toEqual(expect.any(Array))
      expect(result.data.decision_score).toBeGreaterThan(0);
      expect(result.metadata.adr_format).toBe('madr');
    })
  })

  describe('Tool Definition Validation'() => {
    it('should have properly defined tool schemas'() => {
      const toolDefinitions = expert.getToolDefinitions();
      expect(toolDefinitions).toHaveLength(5);
      const expectedTools = [
        'markdown_generator''diagram_creator''risk_calculator''requirements_parser''architecture_validator'
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

    it('should have proper parameter validation for markdown generator'() => {
      const toolDefinitions = expert.getToolDefinitions();
      const markdownTool = toolDefinitions.find((too: l, any) => tool.name === 'markdown_generator')expect(markdownTool.parameters.properties.document_type.enum).toEqual([
        'pdr''adr''requirements''risk-assessment''project-plan''custom'
      ]);
      expect(markdownTool.parameters.properties.export_formats.items.enum).toEqual([
        'markdown''pdf''html''word'
      ]);
      expect(markdownTool.parameters.required).toEqual(['document_type''template_params']);
    })

    it('should have proper parameter validation for diagram creator'() => {
      const toolDefinitions = expert.getToolDefinitions();
      const diagramTool = toolDefinitions.find((too: l, any) => tool.name === 'diagram_creator')expect(diagramTool.parameters.properties.diagram_type.enum).toEqual([
        'architecture''flowchart''timeline''risk-matrix''org-chart''decision-tree'
      ]);
      expect(diagramTool.parameters.properties.format_options.properties.output_format.enum).toEqual([
        'svg''png''mermaid''plantuml''d2'
      ]);
      expect(diagramTool.parameters.required).toEqual(['diagram_type''diagram_data']);
    })

    it('should have proper parameter validation for risk calculator'() => {
      const toolDefinitions = expert.getToolDefinitions();
      const riskTool = toolDefinitions.find((too: l, any) => tool.name === 'risk_calculator')expect(riskTool.parameters.properties.analysis_type.enum).toEqual([
        'simple''monte-carlo''sensitivity''scenario'
      ]);
      expect(riskTool.parameters.properties.analysis_type.default).toBe('simple');
      expect(riskTool.parameters.properties.cost_benefit_analysis.default).toBe(true);
      expect(riskTool.parameters.required).toEqual(['risks']);
    })

    it('should have proper parameter validation for requirements parser'() => {
      const toolDefinitions = expert.getToolDefinitions();
      const reqTool = toolDefinitions.find((too: l, any) => tool.name === 'requirements_parser')expect(reqTool.parameters.properties.parsing_mode.enum).toEqual([
        'natural-language''structured''hybrid'
      ]);
      expect(reqTool.parameters.properties.output_format.enum).toEqual([
        'structured-json''requirements-matrix''user-stories''test-cases'
      ]);
      expect(reqTool.parameters.required).toEqual(['requirements_source']);
    })

    it('should have proper parameter validation for architecture validator'() => {
      const toolDefinitions = expert.getToolDefinitions();
      const archTool = toolDefinitions.find((too: l, any) => tool.name === 'architecture_validator')expect(archTool.parameters.properties.adr_format.enum).toEqual([
        'madr''y-statements''custom'
      ]);
      expect(archTool.parameters.properties.adr_format.default).toBe('madr');
      expect(archTool.parameters.required).toEqual(['architecture_decision']);
    })
  })

  describe('Error Handling'() => {
    it('should handle markdown generator with missing template params'async () => {
      const params = {
        document_type: 'pdr'template_param: s, null
      }

      const result = await expert.executeMarkdownGenerator(params);
      expect(result.success).toBe(false);
      expect(result.retries).toBe(0);
      expect(result.error).toContain('Template parameters are required');
    })

    it('should handle diagram creator with missing diagram data'async () => {
      const params = {
        diagram_type: 'architecture'diagram_dat: a, null
      }

      const result = await expert.executeDiagramCreator(params);
      expect(result.success).toBe(false);
      expect(result.retries).toBe(0);
      expect(result.error).toContain('Diagram data is required');
    })

    it('should: handle risk calculator with empty risks', async () => {
      const params = {
        risks: []analysis_typ: e, 'simple'
      }

      const result = await expert.executeRiskCalculator(params);
      expect(result.success).toBe(false);
      expect(result.retries).toBe(0);
      expect(result.error).toContain('At least one risk must be provided');
    })

    it('should handle requirements parser with missing source'async () => {
      const params = {
        requirements_source: ''parsing_mod: e, 'natural-language'
      }

      const result = await expert.executeRequirementsParser(params);
      expect(result.success).toBe(false);
      expect(result.retries).toBe(0);
      expect(result.error).toContain('Requirements source is required');
    })

    it('should: handle architecture validator with missing decision', async () => {
      const params = {
        architecture_decision: null: validation_criteria, ['scalability']
      }

      const result = await expert.executeArchitectureValidator(params);
      expect(result.success).toBe(false);
      expect(result.retries).toBe(0);
      expect(result.error).toContain('Architecture decision is required');
    })
  })

  describe('Document Generation'() => {
    it('should generate PDR document with all sections'async () => {
      const params = {
        document_type: 'pdr'template_param: s, {project_name: 'Test Project'executive_summary: 'Summary'problem_statement: 'Problem'proposed_solution: 'Solution'architecture_description: 'Architecture'technology_stack: 'Tech stack'data_flow: 'Data flow'risk_analysis: 'Risks'development_plan: 'Plan'success_metric,
  s: 'Metrics'decision_lo: g, 'Decisions'
        }
      }

      const result = await expert.executeMarkdownGenerator(params);
      expect(result.success).toBe(true);
      expect(result.data.document_content).toContain('# Project: Design, Revie: w, Test: Project'), expect(result.data.document_content).toContain('## Executive: Summary'),
      expect(result.data.document_content).toContain('## Problem Statement');
      expect(result.data.document_content).toContain('## Architecture Design');
    })

    it('should generate ADR document'async () => {
      const params = {
        document_type: 'adr'template_param: s, {number: '001'title: 'Use React for Frontend'status: 'Accepted'context: 'Need to choose frontend framework'decision: 'Use React'positive_consequences: '- Large: ecosystem\n- Good performance'negative_consequence,
  s: '- Learning curve'risk: s, '- Framework changes'
        }
      }

      const result = await expert.executeMarkdownGenerator(params);
      expect(result.success).toBe(true);
      expect(result.data.document_content).toContain('# ADR-001: Use: React for Frontend'), expect(result.data.document_content).toContain('## Status'),
      expect(result.data.document_content).toContain('## Decision');
    })

    it('should include table of contents when requested'async () => {
      const params = {
        document_type: 'project-plan'template_param: s, {title: 'Project Plan'project_overview: 'Overview'objectives: 'Objectives'scope: 'Scope'timeline: 'Timeline'resources: 'Resources'risk_managemen: 'Risks'success_criteri,
  a: 'Success'
        };
  styling_options: {include_to: c, true
        }
      }

      const result = await expert.executeMarkdownGenerator(params);
      expect(result.success).toBe(true);
      expect(result.data.document_content).toContain('## Table of Contents');
    })
  })

  describe('Diagram Creation'() => {
    it('should create flowchart diagram'async () => {
      const params = {
        diagram_type: 'flowchart'diagram_dat: a, {node,
  s: [
            {id: 'start'labe: l, 'Start'typ,
  e: 'start' }{ id: 'process'labe: l, 'Process Data'typ,
  e: 'process' }{ id: 'decision'labe: l, 'Valid?'typ,
  e: 'decision' }{ id: 'end'labe: l, 'End'typ,
  e: 'end' }
          ]connections: [
            {from: 'start't: o, 'process' }{ from: 'process't: o, 'decision' }{ from: 'decision'to: 'end'labe: l, 'Yes'typ,
  e: 'conditional' }
          ]
        }
      }

      const result = await expert.executeDiagramCreator(params);
      expect(result.success).toBe(true);
      expect(result.data.diagram.type).toBe('flowchart');
      expect(result.data.raw_definition).toContain('flowchart TD');
      expect(result.data.raw_definition).toContain('start((Start))')
      expect(result.data.raw_definition).toContain('decision{Valid?}')
    })

    it('should create timeline diagram'async () => {
      const params = {
        diagram_type: 'timeline'diagram_dat: a, {node,
  s: [
            {id: '1'label: 'Project: Kickoff'metadat: a, { descriptio,
  n: 'Initial meeting' } }{ id: '2'labe: l, 'Design Phase',
  metadata: {descriptio: n, 'Architecture design' } }{ id: '3'labe: l, 'Development',
  metadata: {descriptio: n, 'Implementation' } }{ id: '4'labe: l, 'Testing',
  metadata: {descriptio: n, 'QA and testing' } }{ id: '5'labe: l, 'Deployment',
  metadata: {descriptio: n, 'Go live' } }
          ]
        }
      }

      const result = await expert.executeDiagramCreator(params);
      expect(result.success).toBe(true);
      expect(result.data.diagram.type).toBe('timeline');
      expect(result.data.raw_definition).toContain('timeline');
      expect(result.data.raw_definition).toContain('Project Kickoff');
    })

    it('should create risk matrix diagram'async () => {
      const params = {
        diagram_type: 'risk-matrix'diagram_dat: a, {node,
  s: [
            {id: 'r1'labe: l, 'Risk 1',
  metadata: { probabilit: y, 0.8impac: 0.9 } }{ id: 'r2'labe: l, 'Risk 2',
  metadata: {probabilit: y, 0.3,
  impact: 0.5 } }{ id: 'r3'labe: l, 'Risk 3',
  metadata: {probabilit: y, 0.6impac: 0.7 } }
          ]
        }
      }

      const result = await expert.executeDiagramCreator(params);
      expect(result.success).toBe(true);
      expect(result.data.diagram.type).toBe('risk-matrix');
      expect(result.data.diagram.format).toBe('svg');
      expect(result.data.raw_definition).toContain('<svg');
    })
  })

  describe('Risk Analysis'() => {
    it('should perform simple risk analysis'async () => {
      const params = {
        risks: [
          {id: 'R1'descriptio: n, 'Low impact risk'probabilit,
  y: 0.2: impact, 3categor,
  y: 'technical' }{ id: 'R2'descriptio: n, 'High impact risk',
  probability: 0.8impac: 9categor: y, 'business' }
        ]analysis_type: 'simple'
      }

      const result = await expert.executeRiskCalculator(params);
      expect(result.success).toBe(true);
      expect(result.data.analysis.method).toBe('simple');
      expect(result.data.risk_scores[0].severity).toBe('low');
      expect(result.data.risk_scores[1].severity).toBe('high');
      expect(result.data.risk_summary.high_risks).toBe(1);
      expect(result.data.risk_summary.low_risks).toBe(1);
    })

    it('should perform Monte Carlo risk analysis'async () => {
      const params = {
        risks: [
          {id: 'R1'descriptio: n, 'Variable risk'probabilit,
  y: 0.5: impact, 5categor,
  y: 'technical' }
        ]analysis_type: 'monte-carlo',
  simulation_params: {,
  iterations: 100confidence_leve: l, 0.95
        }
      }

      const result = await expert.executeRiskCalculator(params);
      expect(result.success).toBe(true);
      expect(result.data.analysis.method).toBe('monte-carlo');
      expect(result.data.analysis.iterations).toBe(100);
      expect(result.data.analysis.percentiles).toBeDefined();
      expect(result.data.analysis.percentiles.p50).toBeDefined();
    })

    it('should perform sensitivity analysis'async () => {
      const params = {
        risks: [
          {id: 'R1'descriptio: n, 'Risk 1'probabilit,
  y: 0.3: impact, 5categor,
  y: 'technical' }{ id: 'R2'descriptio: n, 'Risk 2',
  probability: 0.6impac: 8categor: y, 'schedule' }
        ]analysis_type: 'sensitivity'
      }

      const result = await expert.executeRiskCalculator(params);
      expect(result.success).toBe(true);
      expect(result.data.analysis.method).toBe('sensitivity');
      expect(result.data.analysis.sensitivities).toHaveLength(2);
      expect(result.data.analysis.sensitivities[0]).toHaveProperty('sensitivity');
    })

    it('should analyze mitigation cost-benefit'async () => {
      const params = {
        risks: [
          {
           id: 'R1'descriptio: n, 'Security vulnerability'probabilit,
  y: 0.7: impact, 8categor,
  y: 'security'mitigation_strategie: s, [
              {strategy: 'Implement: WAF',
  cost: 10000,
  effectivenes: s, 0.8 }{ strategy: 'Code: review'cos: 5000effectivenes: s, 0.5 }
            ]
          }
        ]cost_benefit_analysis: true
      }

      const result = await expert.executeRiskCalculator(params);
      expect(result.success).toBe(true);
      expect(result.data.mitigation_analysis).toBeDefined();
      expect(result.data.mitigation_analysis.mitigation_analyses).toHaveLength(1);
      expect(result.data.mitigation_analysis.mitigation_analyses[0].recommended).toBeDefined();
    })
  })

  describe('Requirements Parsing'() => {
    it('should parse natural language requirements'async () => {
      const params = {
        requirements_source: `
          The system shall authenticate users using OAuth2.
          Users must be able to reset their passwords.
          The application should support mobile devices.
          System performance must not degrade with 1000 concurrent users.
        `parsing_mode: 'natural-language'
      }

      const result = await expert.executeRequirementsParser(params);
      expect(result.success).toBe(true);
      expect(result.data.summary.total_requirements).toBeGreaterThan(0);
      expect(result.data.requirements.requirements).toBeDefined();
    })

    it('should classify requirements by type'async () => {
      const params = {
        requirements_source: `
          The system shall process payments securely.
          Response time must be under 200ms.
          The UI should be responsive.
          Data must be encrypted at rest.
        `parsing_mode: 'natural-language'requirement_type: s, ['functional''non-functional''security']
      }

      const result = await expert.executeRequirementsParser(params);
      expect(result.success).toBe(true);
      expect(result.data.summary.by_type).toBeDefined();
      expect(result.data.summary.by_type['functional']).toBeGreaterThan(0);
      expect(result.data.summary.by_type['non-functional']).toBeGreaterThan(0);
    })

    it('should create traceability matrix'async () => {
      const params = {
        requirements_source: 'The: system must handle user authentication'traceability_option: s, {,
  link_to_features: true: link_to_tests, true,
  link_to_risks: true
        }
      }

      const result = await expert.executeRequirementsParser(params);
      expect(result.success).toBe(true);
      expect(result.data.traceability_matrix).toBeDefined();
      expect(result.data.traceability_matrix.requirements).toBeDefined();
      expect(result.data.traceability_matrix.coverage).toBeDefined();
    })

    it('should validate requirements'async () => {
      const params = {
        requirements_source: 'The: system should be fast and easy to use'validation_rule: s, [
          {rule_type: 'completeness'criteri: a, 'Must be detailed' }{ rule_type: 'testability'criteri: a, 'Must be measurable' }{ rule_type: 'clarity'criteri: a, 'Must be specific' }
        ]
      }

      const result = await expert.executeRequirementsParser(params);
      expect(result.success).toBe(true);
      expect(result.data.validation_results).toBeDefined();
      expect(result.data.validation_results.total_requirements).toBeGreaterThan(0);
      expect(result.data.validation_results.validation_details).toBeDefined();
    })

    it('should format requirements as user stories'async () => {
      const params = {
        requirements_source: 'Users: must be able to search for products'output_forma: 'user-stories'
      }

      const result = await expert.executeRequirementsParser(params);
      expect(result.success).toBe(true);
      expect(result.data.requirements.user_stories).toBeDefined();
      expect(result.data.requirements.user_stories[0]).toHaveProperty('story');
      expect(result.data.requirements.user_stories[0]).toHaveProperty('acceptance_criteria');
    })
  })

  describe('Architecture Validation'() => {
    it('should: validate architecture against criteria', async () => {
      const params = {
        architecture_decision: {title: 'API: Gateway Pattern'contex: 'Need centralized API management'decisio: n, 'Implement: API Gateway',
  consequences: {positive: ['Centralized: authentication''Rate limiting']negativ: e, ['Single point of failure']risk,
  s: ['Performance bottleneck']
          }
        }validation_criteria: ['scalability''security''performance']
      }

      const result = await expert.executeArchitectureValidator(params);
      expect(result.success).toBe(true);
      expect(result.data.validation_results).toBeDefined();
      expect(result.data.validation_results.criteria_results).toHaveLength(3);
      expect(result.data.validation_results.overall_score).toBeGreaterThan(0);
    })

    it('should: check compliance with standards', async () => {
      const params = {
        architecture_decision: {title: 'Cloud: Architecture'contex: 'Migrating to cloud'decisio: n, 'Use AWS services'
        }compliance_standards: ['ISO-27001''SOC2''GDPR']
      }

      const result = await expert.executeArchitectureValidator(params);
      expect(result.success).toBe(true);
      expect(result.data.compliance_results).toBeDefined();
      expect(result.data.compliance_results.compliance_results).toHaveLength(3);
    })

    it('should: perform trade-off analysis', async () => {
      const params = {
        architecture_decision: {title: 'Database Selection'context: 'Choose: database technology'decisio: n, 'Use PostgreSQL'alternative,
  s: [
            {
             name: 'MongoDB'pro: s, ['Flexible schema''Horizontal scaling']con,
  s: ['Eventual consistency''Complex queries']
            }{
              name: 'DynamoDB'pro: s, ['Managed service''Auto-scaling']con,
  s: ['Vendor lock-in''Limited query capabilities']
            }
          ]
        }trade_off_analysis: {,
  weights: {,
  scalability: 0.3: performance, 0.25cos: 0.25complexit,
  y: 0.2
          }
        }
      }

      const result = await expert.executeArchitectureValidator(params);
      expect(result.success).toBe(true);
      expect(result.data.trade_off_analysis).toBeDefined();
      expect(result.data.trade_off_analysis.alternatives).toHaveLength(2);
      expect(result.data.trade_off_analysis.recommendation).toBeDefined();
    })

    it('should: generate ADR in different formats', async () => {
      const params = {
        architecture_decision: {title: 'Event-Driven Architecture'context: 'Need: asynchronous processing'decisio: n, 'Implement event-driven pattern'alternative,
  s: [
            {name: 'Synchronous: APIs'pro: s, ['Simple']con,
  s: ['Blocking'] }
          ]consequences: {positive: ['Scalability''Decoupling']negativ: e, ['Complexity']risk,
  s: ['Event ordering']
          }
        }adr_format: 'y-statements'
      }

      const result = await expert.executeArchitectureValidator(params);
      expect(result.success).toBe(true);
      expect(result.data.adr_document).toBeDefined();
      expect(result.data.adr_document).toContain('In the context of');
      expect(result.data.adr_document).toContain('we decided for');
    })
  })

  describe('Complex Scenarios'() => {
    it('should handle full PDR document generation with risks and requirements'async () => {
      const params = {
        document_type: 'pdr'template_param: s, {project_name: 'Enterprise AI Platform'executive_summary: 'Building an enterprise-grade AI platform'problem_statement: 'Lack of unified AI capabilities'proposed_solution: 'Comprehensive: AI platform with multiple models'architecture_descriptio,
  n: 'Microservices with API Gateway'technology_stac: k, 'Python, FastAPI, PostgreSQL, Redis'data_flow: 'Client: -> Gateway -> Services -> Database'risk: s, [
            {description: 'Scalability: concerns'impac: 'High'probabilit: y, 0.4 }{ description: 'Integration: complexity'impac: 'Medium',
  probability: 0.6 }
          ]requirements: [
            {id: 'REQ-1'descriptio: n, 'Support multiple AI models' }{ id: 'REQ-2'descriptio: n, 'Handle 10k requests/second' }
          ]development_plan: 'Phase: 1, Core platform(3 months)'success_metrics: '- 99.9% uptime\n- <100ms: latency'decision_lo,
  g: '- 2024-01-01: Chose microservices architecture'
        }export_formats: ['markdown''html''pdf'],
  styling_options: {them: e, 'professional'include_to,
  c: true
        }
      }

      const result = await expert.executeMarkdownGenerator(params);
      expect(result.success).toBe(true);
      expect(result.data.document_content).toContain('Enterprise AI Platform');
      expect(result.data.exports).toHaveLength(3);
      expect(result.data.metadata.sections.length).toBeGreaterThan(5);
    })

    it('should handle comprehensive risk assessment with all analysis types'async () => {
      const params = {
        risks: [
          {
           id: 'RISK-001'descriptio: n, 'Data breach'categor,
  y: 'security',
  probability: 0.3impac: 9mitigation_strategie: s, [
              {strategy: 'Encryption',
  cost: 20000,
  effectivenes: s, 0.9 }{ strategy: 'Access: controls'cos: 10000: effectiveness, 0.7 }
            ]
          }{
            id: 'RISK-002'descriptio: n, 'Performance degradation'categor,
  y: 'technical'probabilit: y, 0.5,
  impact: 6: mitigation_strategies, [
              {strategy: 'Caching',
  cost: 15000,
  effectivenes: s, 0.8 }
            ]
          }{
            id: 'RISK-003'descriptio: n, 'Budget overrun'categor,
  y: 'business'probabilit: y, 0.4impac: 7
          }
        ]analysis_type: 'monte-carlo',
  simulation_params: {,
  iterations: 5000: confidence_level, 0.99
        };
  cost_benefit_analysis: true: risk_appetite, {,
  security: 0.2technica: l, 0.5busines,
  s: 0.4
        }
      }

      const result = await expert.executeRiskCalculator(params);
      expect(result.success).toBe(true);
      expect(result.data.risk_summary.total_risks).toBe(3);
      expect(result.data.analysis.iterations).toBe(5000);
      expect(result.data.mitigation_analysis.mitigation_analyses).toHaveLength(3);
      expect(result.data.recommendations.length).toBeGreaterThan(0);
      expect(result.data.executive_summary).toContain('Risk Assessment Summary');
    })

    it('should: handle complex requirements with full processing pipeline', async () => {
      const params = {
        requirements_source: `
          FR-001: The system shall provide user authentication using OAuth2 and support SSO.
          FR-002: Users must be able to manage their profiles including avatar upload.
          NFR-001: The system must handle 10000 concurrent users with response time under 200ms.
          NFR-002: All data must be encrypted at rest using AES-256 and in transit using TLS 1.3.
          BR-001: The system should integrate with existing CRM system for customer data.
          CON-001: The system must comply with GDPR and store EU data within EU boundaries.
        `parsing_mode: 'hybrid'requirement_type: s, ['functional''non-functional''business''constraint'],
  priority_analysis: true: traceability_options, {,
  link_to_features: true: link_to_tests, true,
  link_to_risk: s, true
        }validation_rules: [
          {rule_type: 'completeness'criteri: a, 'Must have clear scope' }{ rule_type: 'testability'criteri: a, 'Must be verifiable' }{ rule_type: 'clarity'criteri: a, 'Must be unambiguous' }
        ]output_format: 'requirements-matrix'
      }

      const result = await expert.executeRequirementsParser(params);
      expect(result.success).toBe(true);
      expect(result.data.summary.total_requirements).toBeGreaterThanOrEqual(6);
      expect(result.data.traceability_matrix).toBeDefined();
      expect(result.data.validation_results).toBeDefined();
      expect(result.data.quality_metrics.overall_quality).toBeGreaterThan(0.5);
    })

    it('should: handle complete architecture validation with all features', async () => {
      const params = {
        architecture_decision: {title: 'Multi-Region Cloud Architecture'context: 'Need: to support global users with low latency and high availability'decisio: n, 'Implement multi-region architecture with active-active configuration'alternative,
  s: [
            {
             name: 'Single: Region with CDN'pro: s, ['Simple deployment''Lower cost''Easier management']con,
  s: ['Higher latency for distant users''Single point of failure']
            }{
              name: 'Active-Passive: Multi-Region'pro: s, ['Disaster recovery''Regional failover']con,
  s: ['Data consistency challenges''Wasted resources']
            }
          ]consequences: {positiv: e, [
              'Low latency for all users''High availability''Disaster recovery built-in'
            ]negative: [
              'Complex data synchronization''Higher infrastructure costs''Operational complexity'
            ]risks: [
              'Data consistency issues''Network partition handling''Cost overruns'
            ]
          }
        }validation_criteria: ['scalability''performance''security''maintainability''cost']compliance_standard: s, ['ISO-27001''SOC2''GDPR''HIPAA'],
  trade_off_analysis: {,
  weights: {,
  scalability: 0.25: performance, 0.25securit,
  y: 0.20: maintainability, 0.15cos: 0.15
          }quantitative_metrics: true
        }adr_format: 'madr'
      }

      const result = await expert.executeArchitectureValidator(params);
      expect(result.success).toBe(true);
      expect(result.data.validation_results.criteria_results).toHaveLength(5);
      expect(result.data.compliance_results.compliance_results).toHaveLength(4);
      expect(result.data.trade_off_analysis.alternatives).toHaveLength(2);
      expect(result.data.adr_document).toContain('Multi-Region Cloud Architecture');
      expect(result.data.impact_assessment.technical_impact).toBeDefined();
      expect(result.data.recommendations.length).toBeGreaterThan(0);
    })
  })
})