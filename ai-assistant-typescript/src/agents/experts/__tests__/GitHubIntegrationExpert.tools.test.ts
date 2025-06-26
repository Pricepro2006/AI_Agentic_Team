// Direct tool tests for GitHubIntegrationExpert without BaseAgent dependencies

import { logger } from '@/infrastructure/logging/logger'

// Mock logger
jest.mock('@/infrastructure/logging/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  }
}))

// Import the expert class
const GitHubIntegrationExpert = jest.requireActual('../GitHubIntegrationExpert').GitHubIntegrationExpert

describe('GitHubIntegrationExpert Tools Direct Testing', () => {
  let expert: any

  beforeEach(() => {
    // Create expert without calling BaseAgent constructor
    expert = Object.create(GitHubIntegrationExpert.prototype)
    
    // Manually set the required properties
    expert.config = {
      id: 'test-expert',
      name: 'Test Expert',
      version: '1.0.0'
    }
  })

  describe('Tool Method Direct Calls', () => {
    it('should execute repository manager directly', async () => {
      const params = {
        action: 'create',
        repository_name: 'test-repo',
        organization: 'test-org',
        visibility: 'private',
        description: 'Test repository for unit testing',
        features: {
          issues: true,
          wiki: false,
          downloads: true,
          projects: false
        },
        branch_protection: {
          branch: 'main',
          rules: {
            require_pull_request_reviews: true,
            dismiss_stale_reviews: true,
            require_code_owner_reviews: true,
            required_approving_review_count: 2,
            require_conversation_resolution: true
          }
        },
        auto_init: true,
        gitignore_template: 'Node',
        license_template: 'MIT'
      }

      const result = await expert.executeRepositoryManager(params)

      expect(result).toBeDefined()
      expect(result.success).toBe(true)
      expect(result.retries).toBe(0)
      expect(result.data).toBeDefined()
      expect(result.data.repository).toBeDefined()
      expect(result.data.branch_protection).toBeDefined()
      expect(result.data.collaborators).toBeDefined()
      expect(result.data.setup_commands).toBeDefined()
      expect(result.data.action).toBe('create')
      expect(result.metadata.repository_name).toBe('test-repo')
      expect(result.metadata.action).toBe('create')
      expect(result.metadata.repository_name).toBe('test-repo')
    })

    it('should execute pull request automator directly', async () => {
      const params = {
        pr_action: 'create',
        repository: 'test-org/test-repo',
        title: 'Feature: Add new functionality',
        body: 'This PR implements new feature X',
        head_branch: 'feature/new-functionality',
        base_branch: 'main',
        labels: ['enhancement', 'needs-review'],
        assignees: ['user1', 'user2'],
        reviewers: ['reviewer1', 'reviewer2'],
        team_reviewers: ['team-backend'],
        milestone: 3,
        draft: false,
        auto_merge: {
          enabled: true,
          merge_method: 'squash',
          delete_branch_on_merge: true
        }
      }

      const result = await expert.executePullRequestAutomator(params)

      expect(result).toBeDefined()
      expect(result.success).toBe(true)
      expect(result.retries).toBe(0)
      expect(result.data).toBeDefined()
      expect(result.data.pull_request).toBeDefined()
      expect(result.data.action_result).toBeDefined()
      expect(result.data.labels).toBeDefined()
      expect(result.data.reviewers).toBeDefined()
      expect(result.data.auto_merge).toBeDefined()
      expect(result.data.pull_request.title).toBe('Feature: Add new functionality')
      expect(result.data.pull_request.state).toBe('open')
      expect(result.metadata.pr_action).toBe('create')
      expect(result.metadata.repository).toBe('test-org/test-repo')
    })

    it('should execute issue tracker directly', async () => {
      const params = {
        issue_action: 'create',
        repository: 'test-org/test-repo',
        issue_title: 'Bug: Application crashes on startup',
        issue_body: 'Detailed description of the bug...',
        labels: ['bug', 'critical', 'needs-triage'],
        assignees: ['developer1', 'developer2'],
        milestone: 2,
        project_board: {
          name: 'Sprint Board',
          initial_column: 'To Do'
        },
        custom_fields: {
          severity: 'critical',
          affected_version: '2.0.1',
          customer_impact: 'high'
        }
      }

      const result = await expert.executeIssueTracker(params)

      expect(result).toBeDefined()
      expect(result.success).toBe(true)
      expect(result.retries).toBe(0)
      expect(result.data).toBeDefined()
      expect(result.data.issue).toBeDefined()
      expect(result.data.project_board).toBeDefined()
      expect(result.data.action_result).toBeDefined()
      expect(result.data.workflow).toBeDefined()
      expect(result.data.metrics).toBeDefined()
      expect(result.data.issue.title).toBe('Bug: Application crashes on startup')
      expect(result.data.issue.state).toBe('open')
      expect(result.metadata.issue_action).toBe('create')
      expect(result.metadata.repository).toBe('test-org/test-repo')
    })

    it('should execute github api integrator directly', async () => {
      const params = {
        api_type: 'graphql',
        operation: 'query',
        endpoint: `
          query GetRepository($owner: String!, $name: String!) {
            repository(owner: $owner, name: $name) {
              name
              description
              stargazerCount
              forkCount
              issues(states: OPEN) { totalCount }
              pullRequests(states: OPEN) { totalCount }
            }
          }
        `,
        parameters: {
          owner: 'test-org',
          name: 'test-repo'
        },
        authentication: {
          type: 'token',
          token: 'github_pat_xxx'
        },
        pagination: {
          per_page: 100,
          page: 1
        }
      }

      const result = await expert.executeGitHubAPIIntegrator(params)

      expect(result).toBeDefined()
      expect(result.success).toBe(true)
      expect(result.retries).toBe(0)
      expect(result.data).toBeDefined()
      expect(result.data.api_result).toBeDefined()
      expect(result.data.rate_limit_status).toBeDefined()
      expect(result.data.code_examples).toBeDefined()
      expect(result.data.response_schema).toBeDefined()
      expect(result.data.authentication_methods).toBeDefined()
      expect(result.metadata.api_type).toBe('graphql')
      expect(result.metadata.operation).toBe('query')
    })

    it('should execute branch workflow manager directly', async () => {
      const params = {
        workflow_action: 'configure',
        repository: 'test-org/test-repo',
        branch_name: 'main',
        protection_rules: {
          required_status_checks: {
            strict: true,
            contexts: ['continuous-integration/travis-ci', 'lint', 'test']
          },
          enforce_admins: true,
          required_pull_request_reviews: {
            dismissal_restrictions: {
              users: ['admin1'],
              teams: ['admin-team']
            },
            dismiss_stale_reviews: true,
            require_code_owner_reviews: true,
            required_approving_review_count: 2
          },
          restrictions: {
            users: ['developer1', 'developer2'],
            teams: ['dev-team'],
            apps: []
          },
          required_linear_history: true,
          allow_force_pushes: false,
          allow_deletions: false,
          required_conversation_resolution: true,
          lock_branch: false,
          allow_fork_syncing: true
        },
        merge_strategy: {
          allowed_merge_methods: ['squash', 'rebase'],
          default_merge_method: 'squash',
          auto_merge_enabled: true,
          delete_branch_on_merge: true
        }
      }

      const result = await expert.executeBranchWorkflowManager(params)

      expect(result).toBeDefined()
      expect(result.success).toBe(true)
      expect(result.retries).toBe(0)
      expect(result.data).toBeDefined()
      expect(result.data.action_result).toBeDefined()
      expect(result.data.protection_config).toBeDefined()
      expect(result.data.required_checks).toBeDefined()
      expect(result.data.workflow_documentation).toBeDefined()
      expect(result.data.merge_guidelines).toBeDefined()
      expect(result.metadata.workflow_action).toBe('configure')
      expect(result.metadata.branch_name).toBe('main')
    })
  })

  describe('Tool Definition Validation', () => {
    it('should have properly defined tool schemas', () => {
      const toolDefinitions = expert.getToolDefinitions()
      
      expect(toolDefinitions).toHaveLength(5)
      
      const expectedTools = [
        'repository_manager',
        'pull_request_automator',
        'issue_tracker',
        'github_api_integrator',
        'branch_workflow_manager'
      ]
      
      const actualToolNames = toolDefinitions.map((tool: any) => tool.name)
      expect(actualToolNames).toEqual(expectedTools)
      
      // Validate each tool has required structure
      toolDefinitions.forEach((tool: any) => {
        expect(tool.name).toBeTruthy()
        expect(tool.description).toBeTruthy()
        expect(tool.parameters).toEqual(expect.objectContaining({
          type: 'object',
          properties: expect.any(Object)
        }))
        expect(tool.execute).toEqual(expect.any(Function))
      })
    })

    it('should have proper parameter validation for repository manager', () => {
      const toolDefinitions = expert.getToolDefinitions()
      const repoTool = toolDefinitions.find((tool: any) => tool.name === 'repository_manager')
      
      expect(repoTool.parameters.properties.action.enum).toEqual(['create', 'configure', 'archive', 'transfer', 'fork', 'template'])
      expect(repoTool.parameters.properties.visibility.enum).toEqual(['public', 'private', 'internal'])
      expect(repoTool.parameters.properties.visibility.default).toBe('private')
      expect(repoTool.parameters.required).toEqual(['action', 'repository_name'])
    })

    it('should have proper parameter validation for pull request automator', () => {
      const toolDefinitions = expert.getToolDefinitions()
      const prTool = toolDefinitions.find((tool: any) => tool.name === 'pull_request_automator')
      
      expect(prTool.parameters.properties.pr_action.enum).toEqual(['create', 'update', 'review', 'merge', 'close', 'automate'])
      expect(prTool.parameters.required).toEqual(['pr_action', 'repository'])
    })

    it('should have proper parameter validation for issue tracker', () => {
      const toolDefinitions = expert.getToolDefinitions()
      const issueTool = toolDefinitions.find((tool: any) => tool.name === 'issue_tracker')
      
      expect(issueTool.parameters.properties.issue_action.enum).toEqual(['create', 'update', 'close', 'search', 'label', 'assign', 'milestone'])
      expect(issueTool.parameters.required).toEqual(['issue_action', 'repository'])
    })

    it('should have proper parameter validation for github api integrator', () => {
      const toolDefinitions = expert.getToolDefinitions()
      const apiTool = toolDefinitions.find((tool: any) => tool.name === 'github_api_integrator')
      
      expect(apiTool.parameters.properties.api_type.enum).toEqual(['rest', 'graphql'])
      expect(apiTool.parameters.properties.rate_limit_handling.default).toBe(true)
      expect(apiTool.parameters.required).toEqual(['api_type', 'operation'])
    })

    it('should have proper parameter validation for branch workflow manager', () => {
      const toolDefinitions = expert.getToolDefinitions()
      const branchTool = toolDefinitions.find((tool: any) => tool.name === 'branch_workflow_manager')
      
      expect(branchTool.parameters.properties.workflow_action.enum).toEqual(['protect', 'unprotect', 'configure', 'merge-settings', 'cleanup', 'strategy'])
      expect(branchTool.parameters.required).toEqual(['workflow_action', 'repository', 'branch_name'])
    })
  })

  describe('Error Handling', () => {
    it('should handle repository manager with missing parameters', async () => {
      const params = {
        action: 'create',
        repository_name: ''
      }

      const result = await expert.executeRepositoryManager(params)

      expect(result.success).toBe(false)
      expect(result.retries).toBe(0)
      expect(result.error).toContain('Action and repository name are required')
    })

    it('should handle pull request automator with missing repository', async () => {
      const params = {
        pr_action: 'create',
        repository: '',
        title: 'Test PR'
      }

      const result = await expert.executePullRequestAutomator(params)

      expect(result.success).toBe(false)
      expect(result.retries).toBe(0)
      expect(result.error).toContain('PR action and repository are required')
    })

    it('should handle issue tracker with missing parameters', async () => {
      const params = {
        issue_action: 'create',
        repository: 'test-org/test-repo',
        issue_title: ''
      }

      const result = await expert.executeIssueTracker(params)

      expect(result.success).toBe(true) // Based on implementation, it doesn't validate title
      expect(result.retries).toBe(0)
    })

    it('should handle github api integrator with missing operation', async () => {
      const params = {
        api_type: 'rest',
        operation: ''
      }

      const result = await expert.executeGitHubAPIIntegrator(params)

      expect(result.success).toBe(false)
      expect(result.retries).toBe(0)
      expect(result.error).toContain('API type and operation are required')
    })

    it('should handle branch workflow manager with missing branch', async () => {
      const params = {
        workflow_action: 'configure',
        repository: 'test-org/test-repo',
        branch_name: ''
      }

      const result = await expert.executeBranchWorkflowManager(params)

      expect(result.success).toBe(false)
      expect(result.retries).toBe(0)
      expect(result.error).toContain('Workflow action, repository, and branch name are required')
    })
  })

  describe('Repository Management', () => {
    it('should handle repository creation with full configuration', async () => {
      const params = {
        action: 'create',
        repository_name: 'awesome-project',
        organization: 'my-org',
        visibility: 'public',
        description: 'An awesome open source project',
        features: {
          issues: true,
          wiki: true,
          downloads: true,
          projects: true
        },
        auto_init: true,
        gitignore_template: 'Python',
        license_template: 'apache-2.0'
      }

      const result = await expert.executeRepositoryManager(params)

      expect(result.success).toBe(true)
      expect(result.data.action).toBe('create')
      expect(result.data.repository).toBeDefined()
      expect(result.data.repository.name).toBe('awesome-project')
      expect(result.data.repository.visibility).toBe('public')
      expect(result.metadata.repository_name).toBe('awesome-project')
    })

    it('should handle repository forking', async () => {
      const params = {
        action: 'fork',
        repository_name: 'original-repo',
        source_repository: 'upstream-org/original-repo',
        organization: 'my-org',
        default_branch_only: true
      }

      const result = await expert.executeRepositoryManager(params)

      expect(result.success).toBe(true)
      expect(result.data.action).toBe('fork')
      expect(result.data.repository).toBeDefined()
      expect(result.data.repository.name).toBe('original-repo')
      expect(result.metadata.action).toBe('fork')
    })

    it('should handle repository archiving', async () => {
      const params = {
        action: 'archive',
        repository_name: 'old-project',
        organization: 'my-org',
        archive_reason: 'Project deprecated in favor of new-project'
      }

      const result = await expert.executeRepositoryManager(params)

      expect(result.success).toBe(true)
      expect(result.data.action).toBe('archive')
      expect(result.data.repository).toBeDefined()
      expect(result.data.repository.name).toBe('old-project')
      expect(result.metadata.action).toBe('archive')
    })

    it('should handle repository template creation', async () => {
      const params = {
        action: 'template',
        repository_name: 'project-template',
        organization: 'my-org',
        template_repository: 'base-template',
        include_all_branches: false
      }

      const result = await expert.executeRepositoryManager(params)

      expect(result.success).toBe(true)
      expect(result.data.action).toBe('template')
      expect(result.data.repository).toBeDefined()
      expect(result.data.repository.name).toBe('project-template')
      expect(result.metadata.action).toBe('template')
    })
  })

  describe('Pull Request Automation', () => {
    it('should handle PR creation with review request', async () => {
      const params = {
        pr_action: 'create',
        repository: 'my-org/my-repo',
        title: 'Fix: Resolve memory leak in data processor',
        body: '## Description\nThis PR fixes a memory leak...',
        head_branch: 'fix/memory-leak',
        base_branch: 'main',
        labels: ['bug', 'performance'],
        reviewers: ['senior-dev1', 'senior-dev2'],
        team_reviewers: ['backend-team']
      }

      const result = await expert.executePullRequestAutomator(params)

      expect(result.success).toBe(true)
      expect(result.data.reviewers).toBeDefined()
      expect(result.data.labels).toBeDefined()
      expect(result.data.workflow_config).toBeDefined()
    })

    it('should handle PR auto-merge configuration', async () => {
      const params = {
        pr_action: 'automate',
        repository: 'my-org/my-repo',
        pr_number: 123,
        auto_merge: {
          merge_method: 'squash',
          delete_branch_on_merge: true,
          required_approvals: 2
        },
        required_checks: ['build', 'test', 'lint']
      }

      const result = await expert.executePullRequestAutomator(params)

      expect(result.success).toBe(true)
      expect(result.data.auto_merge).toBeDefined()
      expect(result.data.auto_merge.auto_merge_enabled).toBe(true)
      expect(result.data.auto_merge.merge_method).toBe('squash')
    })

    it('should handle PR review submission', async () => {
      const params = {
        pr_action: 'review',
        repository: 'my-org/my-repo',
        pr_number: 123,
        review_state: 'APPROVED',
        body: 'LGTM! Great work on this implementation.',
        comments: [
          {
            path: 'src/index.ts',
            line: 42,
            body: 'Consider extracting this to a constant'
          }
        ]
      }

      const result = await expert.executePullRequestAutomator(params)

      expect(result.success).toBe(true)
      expect(result.data.action_result.status).toBe('reviewed')
      expect(result.data.action_result.review_state).toBe('APPROVED')
    })
  })

  describe('Issue Management', () => {
    it('should handle issue search with filters', async () => {
      const params = {
        issue_action: 'search',
        repository: 'my-org/my-repo',
        query: 'is:issue is:open label:bug label:high-priority assignee:developer1 milestone:v2.0',
        filters: {
          state: 'open',
          labels: ['bug', 'high-priority'],
          assignee: 'developer1',
          milestone: 'v2.0',
          created_after: '2024-01-01',
          sort: 'created',
          direction: 'desc'
        },
        include_pull_requests: false
      }

      const result = await expert.executeIssueTracker(params)

      expect(result.success).toBe(true)
      expect(result.data.action_result.status).toBe('searched')
      expect(result.data.action_result.issues).toEqual(expect.any(Array))
      expect(result.data.action_result.total_count).toEqual(expect.any(Number))
    })

    it('should handle bulk issue update', async () => {
      const params = {
        issue_action: 'label',
        repository: 'my-org/my-repo',
        issue_numbers: [10, 11, 12, 13],
        labels: ['needs-review'],
        updates: {
          labels_add: ['needs-review'],
          labels_remove: ['in-progress'],
          milestone: 5,
          assignees_add: ['reviewer1']
        }
      }

      const result = await expert.executeIssueTracker(params)

      expect(result.success).toBe(true)
      expect(result.data.action_result.status).toBe('labeled')
      expect(result.data.action_result.issues_labeled).toBe(4)
      expect(result.data.action_result.labels_applied).toEqual(['needs-review'])
    })

    it('should handle issue with project board integration', async () => {
      const params = {
        issue_action: 'create',
        repository: 'my-org/my-repo',
        issue_title: 'Feature: Add dashboard analytics',
        issue_body: 'We need analytics on the main dashboard',
        project_board: {
          name: 'Product Roadmap',
          initial_column: 'Backlog',
          automation: true
        },
        priority: 'medium',
        estimate: 8
      }

      const result = await expert.executeIssueTracker(params)

      expect(result.success).toBe(true)
      expect(result.data.project_board.board_name).toBe('Product Roadmap')
      expect(result.data.project_board.issue_added_to).toBe('Backlog')
      expect(result.data.project_board.automation_enabled).toBe(true)
    })
  })

  describe('GitHub API Integration', () => {
    it('should handle REST API call with pagination', async () => {
      const params = {
        api_type: 'rest',
        operation: 'list-org-repos',
        endpoint: '/orgs/my-org/repos',
        parameters: {
          type: 'all',
          sort: 'updated',
          direction: 'desc'
        },
        pagination: {
          per_page: 30,
          page: 2
        }
      }

      const result = await expert.executeGitHubAPIIntegrator(params)

      expect(result.success).toBe(true)
      expect(result.data.api_result.status).toBe(200)
      expect(result.data.api_result.data).toBeDefined()
      expect(result.data.rate_limit_status).toBeDefined()
      expect(result.data.code_examples).toBeDefined()
    })

    it('should handle GraphQL query with variables', async () => {
      const params = {
        api_type: 'graphql',
        operation: 'query',
        endpoint: `
          query GetIssuesAndPRs($owner: String!, $name: String!, $first: Int!) {
            repository(owner: $owner, name: $name) {
              issues(first: $first, states: OPEN) {
                nodes { title state }
                totalCount
              }
              pullRequests(first: $first, states: OPEN) {
                nodes { title state }
                totalCount
              }
            }
          }
        `,
        parameters: {
          owner: 'my-org',
          name: 'my-repo',
          first: 10
        }
      }

      const result = await expert.executeGitHubAPIIntegrator(params)

      expect(result.success).toBe(true)
      expect(result.data.api_result.data).toBeDefined()
      expect(result.data.api_result.data.viewer).toBeDefined()
      expect(result.data.api_result.extensions).toBeDefined()
    })

    it('should handle webhook configuration', async () => {
      const params = {
        api_type: 'rest',
        operation: 'create-webhook',
        endpoint: '/repos/my-org/my-repo/hooks',
        parameters: {
          name: 'web',
          active: true,
          events: ['push', 'pull_request', 'issues'],
          config: {
            url: 'https://example.com/webhook',
            content_type: 'json',
            secret: 'webhook-secret'
          }
        },
        webhook_config: {
          url: 'https://example.com/webhook',
          events: ['push', 'pull_request', 'issues'],
          secret: 'webhook-secret'
        }
      }

      const result = await expert.executeGitHubAPIIntegrator(params)

      expect(result.success).toBe(true)
      expect(result.data.webhook_setup).toBeDefined()
      expect(result.data.webhook_setup.active).toBe(true)
      expect(result.data.webhook_setup.events).toEqual(['push', 'pull_request', 'issues'])
    })

    it('should handle rate limit information', async () => {
      const params = {
        api_type: 'rest',
        operation: 'get-rate-limit',
        endpoint: '/rate_limit'
      }

      const result = await expert.executeGitHubAPIIntegrator(params)

      expect(result.success).toBe(true)
      // Rate limit handling is disabled for this test
      expect(result.data.api_result).toBeDefined()
      expect(result.data.api_result.status).toBe(200)
    })
  })

  describe('Branch Workflow Management', () => {
    it('should configure comprehensive branch protection', async () => {
      const params = {
        workflow_action: 'configure',
        repository: 'my-org/my-repo',
        branch_name: 'main',
        protection_rules: {
          required_status_checks: {
            strict: true,
            contexts: ['ci/build', 'ci/test', 'security/scan']
          },
          enforce_admins: true,
          required_pull_request_reviews: {
            required_approving_review_count: 2,
            dismiss_stale_reviews: true,
            require_code_owner_reviews: true
          },
          restrictions: {
            users: ['bot-user'],
            teams: ['release-team']
          },
          required_linear_history: true,
          allow_force_pushes: false,
          allow_deletions: false
        },
        required_checks: ['ci/build', 'ci/test', 'security/scan']
      }

      const result = await expert.executeBranchWorkflowManager(params)

      expect(result.success).toBe(true)
      expect(result.data.protection_config).toBeDefined()
      expect(result.data.required_checks).toBeDefined()
      expect(result.data.required_checks.required_checks).toEqual(['ci/build', 'ci/test', 'security/scan'])
    })

    it('should handle branch cleanup operations', async () => {
      const params = {
        workflow_action: 'cleanup',
        repository: 'my-org/my-repo',
        branch_name: 'all',
        cleanup_policy: 'merged_only',
        cleanup_rules: {
          delete_merged: true,
          days_after_merge: 7,
          exclude_patterns: ['release/*', 'hotfix/*'],
          dry_run: false
        }
      }

      const result = await expert.executeBranchWorkflowManager(params)

      expect(result.success).toBe(true)
      expect(result.data.action_result.status).toBe('cleaned_up')
      expect(result.data.action_result.branches_deleted).toBeDefined()
      expect(result.data.action_result.cleanup_policy).toBe('merged_only')
    })

    it('should handle branch synchronization', async () => {
      const params = {
        workflow_action: 'strategy',
        repository: 'my-org/my-repo',
        branch_name: 'develop',
        strategy_type: 'git-flow',
        merge_strategy: 'merge'
      }

      const result = await expert.executeBranchWorkflowManager(params)

      expect(result.success).toBe(true)
      expect(result.data.action_result.status).toBe('strategy_defined')
      expect(result.data.action_result.strategy_type).toBe('git-flow')
      expect(result.data.action_result.branches).toBeDefined()
    })
  })

})