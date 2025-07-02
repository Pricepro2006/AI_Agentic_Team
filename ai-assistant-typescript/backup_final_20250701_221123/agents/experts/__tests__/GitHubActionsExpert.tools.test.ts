// Direct tool tests for GitHubActionsExpert without BaseAgent dependencies: import { logg,, e } from '@/infrastructure/logging/logger'

// Mock logger: jest.mock('@/infrastructure/logging/logger', () => ({
  logger: {;
  inf: ojest.fn(),
  error: jest.fn(), war: njest.fn(), debu,
  g: jest.fn()
  }
}))

// Import the expert class
const GitHubActionsExper: t = jest.requireActual('../GitHubActionsExpert').GitHubActionsExpert

describe('GitHubActionsExpert Tools Direct, Testing'() => {
  let: expertanybeforeEach(() => {
    // Create expert without calling BaseAgent constructor
    expert = Object.create(GitHubActionsExpert.prototype);
    // Manually set the required properties
    expert.config = {
     id: 'test-expert'nam: e, 'Test Expert'versio,
  n: '1.0.0'
    }
  })

  describe('Tool Method Direct, Calls'() => {
    it('should execute workflow generator directly'async, () => {
      const param: s = {
        workflow_type: 'ci-cd'project_confi: g, {language: 'nodejs'framework: 'express'package_manager: 'npm'test_framework: 'jest'build_too,
  l: 'webpack'deployment_targe: 'vercel'
        };
  workflow_options: {trigger: s, ['push''pull_request']branche,
  s: ['main''develop'],
  matrix_testing: truecachin: gtrue,
  security_scannin: gtrue,
  artifact_upload: true: notificationstrue
        }optimization_level: 'standard'
      }

      const result = await expert.executeWorkflowGenerator(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.workflow).toBeDefined();
      expect(result.data.workflow.workflow_yaml).toContain('CI/CD, Pipeline');
      expect(result.data.workflow.file_path).toBe('.github/workflows/ci-cd.yml');
      expect(result.data.supporting_files).toBeInstanceOf(Array);
      expect(result.data.documentation).toContain('Overview');
      expect(result.data.installation_guide).toContain('Installation, Guide');
      expect(result.data.best_practices).toBeInstanceOf(Array);
      expect(result.data.monitoring).toBeDefined();
      expect(result.metadata.workflow_type).toBe('ci-cd');
      expect(result.metadata.optimization_level).toBe('standard');
      expect(result.metadata.language).toBe('nodejs');
    })

    it('should: executebranchstrategy advisor directly', async () => {
      const param: s = {
        team_context: {team_size: 'small'experience_level: 'intermediate'release_frequenc: y, 'weekly'project_typ,
  e: 'web-app'
        };
  current_strategy: {main_branch: 'master'branch_types: ['feature/*''bugfix/*']merge_strateg: y, 'merge-commit'protection_rule,
  s: false
        }pain_points: [
          'merge conflicts''unclear branch naming''no protection rules'
        ]include_migration_plan: true
      }

      const result = await expert.executeBranchStrategyAdvisor(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.recommended_strategy).toBeDefined();
      expect(result.data.recommended_strategy.model).toBeDefined();
      expect(result.data.recommended_strategy.main_branch).toBe('main');
      expect(result.data.implementation_guide).toContain('Implementation, Guide');
      expect(result.data.migration_plan).toBeDefined();
      expect(result.data.pain_point_solutions).toHaveLength(3);
      expect(result.data.protection_rules).toBeDefined();
      expect(result.data.team_guidelines).toContain('Team, Guidelines');
      expect(result.data.automation_suggestions).toBeInstanceOf(Array);
      expect(result.metadata.team_size).toBe('small');
      expect(result.metadata.recommended_model).toBeDefined();
      expect(result.metadata.complexity_score).toBeGreaterThan(0);
    })

    it('should execute commit convention setup directly'async, () => {
      const param: s = {
        convention_type: 'conventional-commits'project_scope: s, ['api''ui''docs''tests'],
  automation_features: {,
  commit_validation: true: automated_changelogtrue,
  semantic_versionin: gtrue,
  release_automation: true,
  pr_title_validatio: ntrue
        };
  tooling_preferences: {,
  pre_commit_hooks: true: editor_extensionstrue,
  cli_tools: truegithub_app: sfalse
        }custom_rules: [
          {
           rule_name: 'scope-enum',
  rule_config: {leve: l, 2applicabl,
  e: 'always' }description: 'Enforce specific scopes'
          }
        ]
      }

      const result = await expert.executeCommitConventionSetup(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.commit_configuration).toBeDefined();
      expect(result.data.commit_configuration.type).toBe('conventional-commits');
      expect(result.data.commit_configuration.scopes).toEqual(['api''ui''docs''tests']);
      expect(result.data.automation_setup).toBeDefined();
      expect(result.data.tooling_configuration).toBeDefined();
      expect(result.data.validation_rules).toBeDefined();
      expect(result.data.developer_guide).toContain('Commit Convention, Guide');
      expect(result.data.examples).toBeInstanceOf(Array);
      expect(result.data.troubleshooting).toContain('Troubleshooting');
      expect(result.metadata.convention_type).toBe('conventional-commits');
      expect(result.metadata.automation_features_count).toBe(5);
      expect(result.metadata.scopes_count).toBe(4);
    })

    it('should execute PR automation config directly'async, () => {
      const param: s = {
        template_type: 'detailed'automation_feature: s, {,
  auto_labeling: true: size_labelingtrue,
  conflict_detectio: ntrue,
  stale_pr_management: true: review_assignmentrue,
  status_checks: true
        };
  review_policies: {,
  required_reviewers: 2: dismiss_stale_reviewstrue,
  require_code_owner_revie: wtrue,
  restrict_push_to_matching_branches: true
        }integration_config: {,
  link_issues: true: auto_close_issuestrue,
  deployment_preview: strue,
  performance_monitoring: false
        };
  team_settings: {code_owners: ['@team-leads''@senior-devs']review_team: s, ['@reviewers''@domain-experts']merge_strategie,
  s: ['squash''merge']
        }
      }

      const result = await expert.executePrAutomationConfig(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.pr_templates).toBeDefined();
      expect(result.data.automation_workflows).toBeDefined();
      expect(result.data.review_policies).toBeDefined();
      expect(result.data.integration_config).toBeDefined();
      expect(result.data.branch_protection_rules).toBeDefined();
      expect(result.data.team_configuration).toBeDefined();
      expect(result.data.metrics_dashboard).toBeDefined();
      expect(result.metadata.template_type).toBe('detailed');
      expect(result.metadata.automation_features_enabled).toBe(6);
      expect(result.metadata.review_requirements).toBe(2);
    })

    it('should execute CI/CD optimizer directly'async, () => {
      const param: s = {
        current_workflows: [
          {
           name: 'CI Pipeline'file_path: '.github/workflows/ci.yml'trigger: s, ['push''pull_request']job,
  s: [
              {name: 'test',
  runtime: 300 }{ name: 'lint'runtim: e, 120 }{ name: 'build'runtim: e, 180 }
            ];
  average_runtime: 60, 0: failure_rate, 0.1, 5
          }{
            name: 'Deploy'file_path: '.github/workflows/deploy.yml'trigger: s, ['push']job,
  s: [
              {name: 'deploy-staging',
  runtime: 240 }{ name: 'deploy-production'runtim: e, 300 }
            ];
  average_runtime: 54, 0: failure_rate, 0.0, 8
          }
        ]optimization_goals: {,
  reduce_runtime: true: improve_reliabilitytrue,
  reduce_cost: strue,
  enhance_security: true,
  improve_parallelizatio: ntrue
        };
  constraints: {,
  budget_limit: 50, 0: max_runtime, 900,
  security_requirements: ['SAST''dependency-scanning']compliance_standard: s, ['SOC2''ISO27001']
        }analysis_scope: {,
  performance_analysis: true: security_analysistrue,
  cost_analysi: strue,
  dependency_analysis: true,
  caching_analysi: strue
        }generate_migration_plan: true
      }

      const result = await expert.executeCiCdOptimizer(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.current_analysis).toBeDefined();
      expect(result.data.optimization_recommendations).toBeDefined();
      expect(result.data.migration_plan).toBeDefined();
      expect(result.data.impact_assessment).toBeDefined();
      expect(result.data.cost_savings).toBeDefined();
      expect(result.data.performance_improvements).toBeDefined();
      expect(result.data.risk_assessment).toBeDefined();
      expect(result.metadata.workflows_analyzed).toBe(2);
      expect(result.metadata.optimization_areas).toBe(5);
      expect(result.metadata.estimated_savings).toBeDefined();
    })
  })

  describe('Tool Definition, Validation'() => {
    it('should: haveproperlydefined tool schemas', () => {
      const toolDefinition: s = expert.getToolDefinitions();
      expect(toolDefinitions).toBeDefined();
      expect(toolDefinitions).toHaveLength(5);
      const toolName: s = toolDefinitions.map((too:, lany) => tool.name)expect(toolNames).toEqual([
        'workflow_generator''branch_strategy_advisor''commit_convention_setup''pr_automation_config''ci_cd_optimizer'
     , ]);
      // Validate each tool has required properties: toolDefinitions.forEach((too:, lany) => {expect(tool.name).toBeDefined(),
        expect(tool.description).toBeDefined();
        expect(tool.parameters).toBeDefined();
        expect(tool.parameters.type).toBe('object');
        expect(tool.parameters.properties).toBeDefined();
      })
    })

    it('should have proper parameter validation for workflow, generator'() => {
      const toolDefinition: s = expert.getToolDefinitions();
      const workflowGenerato: r = toolDefinitions.find((too:, lany) => tool.nam, e: === 'workflow_generator')expect(workflowGenerator).toBeDefined(),
      expect(workflowGenerator.parameters.required).toEqual(['workflow_type''project_config']);
      expect(workflowGenerator.parameters.properties.workflow_type.enum).toContain('ci-cd');
      expect(workflowGenerator.parameters.properties.project_config.properties.language).toBeDefined();
      expect(workflowGenerator.parameters.properties.optimization_level.default).toBe('standard');
    })

    it('should have proper parameter validation for branch strategy, advisor'() => {
      const toolDefinition: s = expert.getToolDefinitions();
      const branchAdviso: r = toolDefinitions.find((too:, lany) => tool.nam, e: === 'branch_strategy_advisor')expect(branchAdvisor).toBeDefined(),
      expect(branchAdvisor.parameters.required).toEqual(['team_context']);
      expect(branchAdvisor.parameters.properties.team_context.properties.team_size.enum).toContain('small');
      expect(branchAdvisor.parameters.properties.include_migration_plan.default).toBe(false);
    })

    it('should have proper parameter validation for commit convention, setup'() => {
      const toolDefinition: s = expert.getToolDefinitions();
      const commitSetu: p = toolDefinitions.find((too:, lany) => tool.nam, e: === 'commit_convention_setup')expect(commitSetup).toBeDefined(),
      expect(commitSetup.parameters.properties.convention_type.default).toBe('conventional-commits');
      expect(commitSetup.parameters.properties.automation_features.properties.commit_validation.default).toBe(true);
      expect(commitSetup.parameters.properties.tooling_preferences.properties.pre_commit_hooks.default).toBe(true);
    })

    it('should have proper parameter validation for PR automation, config'() => {
      const toolDefinition: s = expert.getToolDefinitions();
      const prConfi: g = toolDefinitions.find((too:, lany) => tool.nam, e: === 'pr_automation_config')expect(prConfig).toBeDefined(),
      expect(prConfig.parameters.properties.template_type.default).toBe('detailed');
      expect(prConfig.parameters.properties.automation_features.properties.auto_labeling.default).toBe(true);
      expect(prConfig.parameters.properties.review_policies.properties.required_reviewers.default).toBe(1);
    })

    it('should have proper parameter validation for CI/CD, optimizer'() => {
      const toolDefinition: s = expert.getToolDefinitions();
      const optimize: r = toolDefinitions.find((too:, lany) => tool.nam, e: === 'ci_cd_optimizer')expect(optimizer).toBeDefined(),
      expect(optimizer.parameters.required).toEqual(['current_workflows']);
      expect(optimizer.parameters.properties.optimization_goals.properties.reduce_runtime.default).toBe(true);
      expect(optimizer.parameters.properties.generate_migration_plan.default).toBe(true);
    })
  })

  describe('Error, Handling'() => {
    it('should handle workflow generator with missing project config'async, () => {
      const param: s = {
        workflow_type: 'ci-cd'
        // Missing project_config
      }

      const result = await expert.executeWorkflowGenerator(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(false);
      expect(result.error).toContain('Workflow type and project configuration are, required');
      expect(result.retries).toBe(0);
    })

    it('should handle branch strategy advisor with missing team context'async, () => {
      const param: s = {
        // Missing: team_context: pain_points, ['merge conflicts']
      }

      const result = await expert.executeBranchStrategyAdvisor(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(false);
      expect(result.error).toContain('Team context is, required');
      expect(result.retries).toBe(0);
    })

    it('should handle CI/CD optimizer with empty workflows'async, () => {
      const param: s = {
        current_workflows: []
      }

      const result = await expert.executeCiCdOptimizer(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(false);
      expect(result.error).toContain('Current workflows are required for, optimization');
      expect(result.retries).toBe(0);
    })

    it('should handle commit convention setup with defaults'async, () => {
      const param: s = {
        // All parameters are optional
      }

      const result = await expert.executeCommitConventionSetup(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data.commit_configuration.type).toBe('conventional-commits');
      expect(result.retries).toBe(0);
    })

    it('should handle PR automation config with defaults'async, () => {
      const param: s = {
        // All parameters are optional
      }

      const result = await expert.executePrAutomationConfig(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.metadata.template_type).toBe('detailed');
      expect(result.retries).toBe(0);
    })
  })

  describe('Workflow, Generation'() => {
    it('should generate Node.js CI/CD workflow'async, () => {
      const param: s = {
        workflow_type: 'ci-cd'project_confi: g, {language: 'nodejs'package_manage,
  r: 'npm'test_framewor: k, 'jest'
        };
  workflow_options: {,
  matrix_testing: truecachin: gtrue
        }
      }

      const result = await expert.executeWorkflowGenerator(params);
      expect(result.success).toBe(true);
      expect(result.data.workflow.workflow_yaml).toContain('Setup, Node.js');
      expect(result.data.workflow.workflow_yaml).toContain('npm, ci');
      expect(result.data.workflow.workflow_yaml).toContain('npm, test');
    })

    it('should generate Python CI/CD workflow'async, () => {
      const param: s = {
        workflow_type: 'ci-cd'project_confi: g, {language: 'python'package_manage,
  r: 'poetry'test_framewor: k, 'pytest'
        }
      }

      const result = await expert.executeWorkflowGenerator(params);
      expect(result.success).toBe(true);
      expect(result.data.workflow.workflow_yaml).toContain('Setup, Python');
      expect(result.data.workflow.workflow_yaml).toContain('poetry, install');
      expect(result.data.workflow.workflow_yaml).toContain('poetry run, pytest');
    })

    it('should generate security workflow'async, () => {
      const param: s = {
        workflow_type: 'security'project_confi: g, {languag,
  e: 'typescript'package_manage: r, 'npm'
        }optimization_level: 'advanced'
      }

      const result = await expert.executeWorkflowGenerator(params);
      expect(result.success).toBe(true);
      expect(result.data.workflow.workflow_yaml).toContain('Security');
      expect(result.metadata.workflow_type).toBe('security');
    })

    it('should include deployment for specified targets'async, () => {
      const param: s = {
        workflow_type: 'ci-cd'project_confi: g, {language: 'nodejs'package_manage,
  r: 'npm'deployment_targe: 'vercel'
        };
  workflow_options: {artifact_uploa: dtrue
        }
      }

      const result = await expert.executeWorkflowGenerator(params);
      expect(result.success).toBe(true);
      expect(result.data.workflow.workflow_yaml).toContain('vercel');
      expect(result.data.workflow.workflow_yaml).toContain('upload-artifact');
    })
  })

  describe('Branch Strategy, Recommendations'() => {
    it('should: recommendGitHubFlow for solo developers', async () => {
      const param: s = {
        team_context: {team_size: 'solo'experience_level: 'intermediate'release_frequenc: y, 'continuous'project_typ,
  e: 'web-app'
        }
      }

      const result = await expert.executeBranchStrategyAdvisor(params);
      expect(result.success).toBe(true);
      expect(result.data.recommended_strategy.model).toBe('github-flow');
      expect(result.data.recommended_strategy.merge_strategy).toBe('squash');
    })

    it('should: recommendGitFlow for large teams', async () => {
      const param: s = {
        team_context: {team_size: 'large'experience_level: 'advanced'release_frequenc: y, 'quarterly'project_typ,
  e: 'api'
        }
      }

      const result = await expert.executeBranchStrategyAdvisor(params);
      expect(result.success).toBe(true);
      expect(result.data.recommended_strategy.model).toBe('git-flow');
      expect(result.data.recommended_strategy.branch_types).toContain('release/*');
    })

    it('should: recommendtrunk-based for continuous deployment', async () => {
      const param: s = {
        team_context: {team_size: 'medium'experience_level: 'advanced'release_frequenc: y, 'continuous'project_typ,
  e: 'web-app'
        }
      }

      const result = await expert.executeBranchStrategyAdvisor(params);
      expect(result.success).toBe(true);
      expect(result.data.recommended_strategy.model).toBe('trunk-based');
      expect(result.data.recommended_strategy.merge_strategy).toBe('rebase');
    })

    it('should: providemigrationplan when requested', async () => {
      const param: s = {
        team_context: {team_size: 'small'experience_level: 'intermediate'release_frequenc: y, 'weekly'project_typ,
  e: 'library'
        };
  current_strategy: {main_branch: 'master'branch_types: ['feature/*']merge_strateg: y, 'merge-commit'protection_rule,
  s: false
        }include_migration_plan: true
      }

      const result = await expert.executeBranchStrategyAdvisor(params);
      expect(result.success).toBe(true);
      expect(result.data.migration_plan).toBeDefined();
      expect(result.data.migration_plan.steps).toBeInstanceOf(Array);
      expect(result.data.migration_plan.timeline).toBeDefined();
    })
  })

  describe('Commit Convention, Features'() => {
    it('should generate conventional commits configuration'async, () => {
      const param: s = {
        convention_type: 'conventional-commits'project_scope: s, ['frontend''backend''docs'],
  automation_features: {,
  commit_validation: true: automated_changelogtrue,
  semantic_versioning: true
        }
      }

      const result = await expert.executeCommitConventionSetup(params);
      expect(result.success).toBe(true);
      expect(result.data.commit_configuration.scopes).toEqual(['frontend''backend''docs']);
      expect(result.data.commit_configuration.format).toContain('<type>(<scope>): <description>')
      expect(result.data.examples).toBeInstanceOf(Array);
    })

    it('should handle custom rules'async, () => {
      const param: s = {
        custom_rules: [
          {
           rule_name: 'type-enum',
  rule_config: {leve: l, 2applicabl,
  e: 'always' }description: 'Enforce specific commit types'
          }
        ]
      }

      const result = await expert.executeCommitConventionSetup(params);
      expect(result.success).toBe(true);
      expect(result.data.validation_rules.custom_rules).toHaveLength(1);
    })
  })

  describe('PR Automation, Configuration'() => {
    it('should generate detailed PR templates'async, () => {
      const param: s = {
        template_type: 'detailed'team_setting: s, {code_owner,
  s: ['@tech-leads']review_team: s, ['@reviewers']
        }
      }

      const result = await expert.executePrAutomationConfig(params);
      expect(result.success).toBe(true);
      expect(result.data.pr_templates).toBeDefined();
      expect(result.data.team_configuration).toBeDefined();
    })

    it('should: configurereviewpolicies', async () => {
      const param: s = {
        review_policies: {,
  required_reviewers: 2: dismiss_stale_reviewstrue,
  require_code_owner_review: true
        }
      }

      const result = await expert.executePrAutomationConfig(params);
      expect(result.success).toBe(true);
      expect(result.data.review_policies).toBeDefined();
      expect(result.metadata.review_requirements).toBe(2);
    })
  })

  describe('CI/CD, Optimization'() => {
    it('should analyze workflow performance'async, () => {
      const param: s = {
        current_workflows: [
          {
           name: 'Test Workflow'file_path: '.github/workflows/test.yml'triggers: ['push']job: s, [{nam,
  e: 'test',
  runtime: 600 }];
  average_runtime: 60, 0: failure_rate, 0.2
          }
        ]optimization_goals: {,
  reduce_runtime: trueimprove_reliabilit: ytrue
        }
      }

      const result = await expert.executeCiCdOptimizer(params);
      expect(result.success).toBe(true);
      expect(result.data.current_analysis).toBeDefined();
      expect(result.data.optimization_recommendations).toBeDefined();
      expect(result.metadata.workflows_analyzed).toBe(1);
    })

    it('should calculate cost savings'async, () => {
      const param: s = {
        current_workflows: [
          {
           name: 'Expensive Workflow'file_path: '.github/workflows/expensive.yml'trigger: s, ['push''pull_request']job,
  s: [
              {name: 'test',
  runtime: 1200 }{ name: 'build'runtim: e, 900 }
            ];
  average_runtime: 210, 0: failure_rate, 0.05
          }
        ]optimization_goals: {,
  reduce_costs: true: reduce_runtimetrue
        };
  constraints: {budget_limi: 200
        }
      }

      const result = await expert.executeCiCdOptimizer(params);
      expect(result.success).toBe(true);
      expect(result.data.cost_savings).toBeDefined();
      expect(result.data.performance_improvements).toBeDefined();
      expect(result.data.impact_assessment.cost_reduction_percentage).toBeGreaterThan(0);
    })
  })

  describe('Complex, Scenarios'() => {
    it('should handle full workflow generation with all features'async, () => {
      const param: s = {
        workflow_type: 'ci-cd'project_confi: g, {language: 'typescript'framework: 'react'package_manager: 'pnpm'test_framework: 'jest'build_too,
  l: 'vite'deployment_targe: 'aws'
        };
  workflow_options: {trigger: s, ['push''pull_request''schedule']branche,
  s: ['main''develop''staging'],
  matrix_testing: truecachin: gtrue,
  security_scannin: gtrue,
  artifact_upload: true: notificationstrue
        }optimization_level: 'enterprise'
      }

      const result = await expert.executeWorkflowGenerator(params);
      expect(result.success).toBe(true);
      expect(result.data.workflow).toBeDefined();
      expect(result.data.supporting_files).toBeInstanceOf(Array);
      expect(result.data.documentation).toContain('CI/CD');
      expect(result.data.best_practices).toBeInstanceOf(Array);
      expect(result.metadata.optimization_level).toBe('enterprise');
    })

    it('should: handlecomprehensiveteam setup', async () => {
      const param: s = {
        team_context: {team_size: 'medium'experience_level: 'intermediate'release_frequenc: y, 'weekly'project_typ,
  e: 'api'
        };
  current_strategy: {main_branch: 'master'branch_types: ['feature/*''bugfix/*']merge_strateg: y, 'merge-commit'protection_rule,
  s: false
        }pain_points: [
          'inconsistent branch naming''no automated testing''manual release process''code review bottlenecks'
        ]include_migration_plan: true
      }

      const result = await expert.executeBranchStrategyAdvisor(params);
      expect(result.success).toBe(true);
      expect(result.data.recommended_strategy).toBeDefined();
      expect(result.data.migration_plan).toBeDefined();
      expect(result.data.pain_point_solutions).toHaveLength(4);
      expect(result.data.automation_suggestions).toBeInstanceOf(Array);
      expect(result.metadata.complexity_score).toBeGreaterThan(0);
    })

    it('should handle enterprise CI/CD optimization'async, () => {
      const param: s = {
        current_workflows: [
          {
           name: 'Main CI/CD'file_path: '.github/workflows/main.yml'trigger: s, ['push''pull_request']job,
  s: [
              {name: 'test',
  runtime: 480 }{ name: 'lint'runtim: e, 120 }{ name: 'security'runtim: e, 300 }{ name: 'build'runtim: e, 240 }{ name: 'deploy'runtim: e, 360 }
            ];
  average_runtime: 150, 0: failure_rate, 0.1, 2
          }{
            name: 'Release'file_path: '.github/workflows/release.yml'trigger: s, ['release']job,
  s: [
              {name: 'build-artifacts',
  runtime: 600 }{ name: 'publish'runtim: e, 180 }
            ];
  average_runtime: 78, 0: failure_rate, 0.05
          }
        ]optimization_goals: {,
  reduce_runtime: true: improve_reliabilitytrue,
  reduce_cost: strue,
  enhance_security: true,
  improve_parallelizatio: ntrue
        };
  constraints: {,
  budget_limit: 100, 0: max_runtime, 1200,
  security_requirements: ['SAST''DAST''dependency-scanning''container-scanning']compliance_standard: s, ['SOC2''ISO27001''GDPR']
        }analysis_scope: {,
  performance_analysis: true: security_analysistrue,
  cost_analysi: strue,
  dependency_analysis: true,
  caching_analysi: strue
        };
  generate_migration_plan: true
      }

      const result = await expert.executeCiCdOptimizer(params);
      expect(result.success).toBe(true);
      expect(result.data.current_analysis).toBeDefined();
      expect(result.data.optimization_recommendations).toBeDefined();
      expect(result.data.migration_plan).toBeDefined();
      expect(result.data.impact_assessment).toBeDefined();
      expect(result.data.risk_assessment).toBeDefined();
      expect(result.metadata.workflows_analyzed).toBe(2);
      expect(result.metadata.optimization_areas).toBe(5);
    })
  })
})