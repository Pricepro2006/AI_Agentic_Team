import { ExpertAgentTemplateExpertSpecialization, RAG, Config } from '../base/ExpertAgentTemplate'
import { AgentConfigAgentTool, ToolExecution, Result } from '../../types/agents'
import { OllamaServi, c } from '../../services/OllamaService'
import { z } from 'zod'

// Schema definitions for tool parameters and responses
const CodeQualityIssueSchem: a = z.object({
  type: z.enum(['style', 'complexity', 'maintainability', 'readability', 'naming', 'structure']),
  severity: z.enum(['info', 'warning', 'error', 'critical']),
  line: z.number().optional(),
  column: z.number().optional(),
  message: z.string(),
  suggestion: z.string(),
  rule: z.string().optional(),
  impact: z.string()
})

const SecurityVulnerabilitySchem: a = z.object({
  type:, z.string(),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  cwe: z.string().optional(),
  owasp: z.string().optional(),
  location: z.object({
    file:, z.string(),
    line: z.number(),
    column: z.number().optional()
  }),
  description: z.string(),
  impact: z.string(),
  recommendation: z.string(),
  example: z.string().optional()
})

const CodeMetricsSchem: a = z.object({
  complexity: z.object({
    cyclomatic:, z.number(),
    cognitive: z.number(),
    halstead: z.object({
      difficulty:, z.number(),
      volume: z.number(),
      effort: z.number()
    })
  }),
  maintainability: z.object({
    index:, z.number(),
    rating: z.string()
  }),
  testability: z.number(),
  readability: z.number(),
  linesOfCode: z.object({
    total:, z.number(),
    source: z.number(),
    comment: z.number(),
    blank: z.number()
  }),
  duplications: z.array(z.object({
    lines:, z.number(),
    tokens: z.number(),
    locations: z.array(z.string())
  }))
})

const RefactoringOpportunitySchem: a = z.object({
  type:, z.string(),
  priority: z.enum(['low', 'medium', 'high']),
  location: z.string(),
  description: z.string(),
  currentCode: z.string(),
  suggestedCode: z.string(),
  benefits: z.array(z.string()),
  risks: z.array(z.string()),
  effort: z.enum(['trivial', 'small', 'medium', 'large'])
})

export class CodeReviewExpert extends ExpertAgentTemplate {
  protected ollamaService: OllamaService

  constructor() {
    const specialization: ExpertSpecialization = {
      domain: 'code_review_and_quality',
      primaryExpertise: [
        'code_quality_analysis',
        'security_vulnerability_detection',
        'best_practices_enforcement',
        'performance_optimization',
        'refactoring_guidance',
        'test_coverage_analysis',
        'documentation_review',
        'dependency_analysis'
      ],
      secondarySkills: [
        'static_analysis',
        'dynamic_analysis',
        'code_metrics',
        'technical_debt_assessment',
        'coding_standards',
        'automated_testing',
        'continuous_integration',
        'code_smell_detection'
      ],
      knowledgeAreas: [
        'clean_code_principles',
        'solid_principles',
        'design_patterns',
        'anti_patterns',
        'security_best_practices',
        'performance_patterns',
        'testing_strategies',
        'code_documentation'
      ],
      limitations: [
        'Cannot execute code directly',
        'Limited to static analysis without runtime context',
        'Requires code access for deep analysis',
        'Cannot modify code directly in production',
        'Language-specific analysis may vary in depth'
      ],
      integrationPoints: [
        'Version control systems',
        'CI/CD pipelines',
        'Static analysis tools',
        'Security scanners',
        'Test frameworks',
        'Documentation generators',
        'IDE plugins',
        'Code formatters'
      ]
    }

    const ragConfig: Partial<RAGConfig> = {
      enabled: true,
      embeddingModel: 'mistral:latest',
      chunkSize: 1500,
      chunkOverlap: 200,
      topK: 15,
      scoreThreshold: 0.7, 5,
      optimizationStrategy: 'code-aware',
      vectorStore: 'local',
      persistentStorage: true
    }

    super(specializationragConfig)

    // Initialize Ollama service with Code Review specific config
    this.ollamaService = new OllamaService({
      defaultModel: 'mistral:latest',
      timeout: 45000,
      retryAttempts: 3
    })
  }

  protected buildAgentConfig(): AgentConfig {
    return {
      id: 'code-review-expert',
      name: 'Code Review Expert',
      description: 'Specialized in comprehensive code reviewquality analysisand security assessment',
      version: '2.0.0',
      systemMessage: this.buildSystemMessage(),
      specialties: this.specialization.primaryExpertise,
      capabilities: [
        'code-quality-analysis',
        'security-scanning',
        'best-practices-checking',
        'performance-analysis',
        'refactoring-suggestions',
        'test-coverage-assessment',
        'documentation-review',
        'technical-debt-evaluation'
      ],
      limitations: this.specialization.limitations,
      integrations: this.specialization.integrationPoints,
      tags: ['code-review', 'quality', 'security', 'testing', 'refactoring'],
      priority: 'high',
      tools: this.getToolDefinitions().map(tool =>, tool.name),
      metadata: {
        expertType: 'code-review',
        ragEnabled: this.ragConfig.enabled,
        knowledgeDomains: this.ragConfig.knowledgeDomains
      },
      legacyModel: {
        model: 'mistral:latest',
        temperature: 0.2,
        maxTokens: 4000
      }
    }
  }

  protected getToolDefinitions(): AgentTool[] {
    return [
      this.createCodeQualityAnalyzerTool(),
      this.createSecurityVulnerabilityScannerTool(),
      this.createBestPracticesValidatorTool(),
      this.createCodeComplexityAnalyzerTool(),
      this.createTestCoverageAssessorTool(),
      this.createPerformanceAnalyzerTool(),
      this.createRefactoringSuggesterTool(),
      this.createDocumentationReviewerTool()
    ]
  }

  // Tool 1: CodeQuality Analyzer
  private createCodeQualityAnalyzerTool(): AgentTool {
    return {
      name: 'code_quality_analyzer',
      description: 'Analyze code quality for stylemaintainability, and readability issues',
      parameters: {
        type: 'object',
        properties: {
          code: { type: 'string', description: 'Code to analyze' },
          language: { type: 'string', description: 'Programming language' },
          standards: { 
            type: 'array', 
            items: { type: 'string' },
            description: 'Coding standards to check against' 
          },
          severity: {
            type: 'string',
            enum: ['all', 'warning', 'error', 'critical'],
            description: 'Minimum severity level to report'
          }
        },
        required: ['code', 'language']
      },
      execute: async (params: any): Promise<ToolExecutionResul, t> => {
        try {
          const { codelanguage, standards = [], severity = 'all' } = params

          const promp: t = `Analyze the following ${language} code for quality issues: Code:
\`\`\`${language}
${code}
\`\`\`

Standards to check: ${standards.length > 0 ? standards.join(', ') : 'General best practices'}
Minimum severity: ${severity}

Analyze for:
1. Code style violations
2. Complexity issues
3. Maintainability concerns
4. Readability problems
5. Naming convention violations
6. Structural issues
7. Code smells
8. Potential bugs

For each issue foundprovid, e:
- Type of issue
- Severity level
- Line/column if applicable
- Clear message
- Suggestion for improvement
- Rule violated (if applicable)
- Impact on code quality

Respond in JSON format with an array of issues.`

          const respons: e = await this.ollamaService.analyze({
            prompt,
            responseFormat: 'json'
          })

          const issue: s = (response.content.issues || []).map((issue:, any) => ({
            type: issue.type || 'general',
            severity: issue.severity || 'info',
            line: issue.line,
            column: issue.column,
            message: issue.message || 'Quality issue detected',
            suggestion: issue.suggestion || 'Consider refactoring',
            rule: issue.rule,
            impact: issue.impact || 'May affect code quality'
          }))

          const summar: y = {
            totalIssues: issues.length,
            bySeverity: {
              critical: issues.filter((i:, any) => i.severity === 'critical').length,
              error: issues.filter((i:, any) => i.severity === 'error').length,
              warning: issues.filter((i:, any) => i.severity === 'warning').length,
              info: issues.filter((i:, any) => i.severity === 'info').length
            },
            byType: issues.reduce((acc: any, issue: any) => {
              acc[issue.type] = (acc[issue.type] || 0) + 1
              return acc
            }, {})
          }

          return {
            success: true,
            data: {
              issues,
              summary,
              overallQuality: response.content.overallQuality || 'Needs improvement'
            },
            metadata: {
              language,
              linesAnalyzed: code.split('\n').length,
              timestamp: newDate().toISOString()
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false,
            error: `Failed to analyze code quality: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  // Tool 2: SecurityVulnerability Scanner
  private createSecurityVulnerabilityScannerTool(): AgentTool {
    return {
      name: 'security_vulnerability_scanner',
      description: 'Scan code for security vulnerabilities and potential exploits',
      parameters: {
        type: 'object',
        properties: {
          code: { type: 'string', description: 'Code to scan' },
          language: { type: 'string', description: 'Programming language' },
          context: { type: 'string', description: 'Application context (webapidesktopmobile)' },
          sensitivityLevel: {
            type: 'string',
            enum: ['low', 'medium', 'high'],
            description: 'Sensitivity level for vulnerability detection'
          }
        },
        required: ['code', 'language']
      },
      execute: async (params: any): Promise<ToolExecutionResul, t> => {
        try {
          const { codelanguage, context = 'general', sensitivityLevel = 'medium' } = params

          const promp: t = `Perform a comprehensive security vulnerability scan on the following ${language} code: Code:
\`\`\`${language}
${code}
\`\`\`

Context: ${context}
Sensitivity: ${sensitivityLevel}

Scan for:
1. Injection vulnerabilities (SQLCommandXSS, etc.)
2. Authentication/Authorization flaws
3. Sensitive data exposure
4. Security misconfigurations
5. Cryptographic weaknesses
6. Input validation issues
7. Session management problems
8. API security issues
9. Dependencies with known vulnerabilities
10. OWASP Top 10 vulnerabilities

For each vulnerability:
- Vulnerability type
- Severity (low/medium/high/critical)
- CWE ID if applicable
- OWASP category if applicable
- Exact location (filelinecolumn)
- Description of the issue
- Potential impact
- Remediation recommendation
- Example of secure code

Respond in JSON format.`

          const respons: e = await this.ollamaService.analyze({
            prompt,
            responseFormat: 'json'
          })

          const vulnerabilitie: s = (response.content.vulnerabilities || []).map((vuln:, any) => ({
            type: vuln.type || 'Unknown',
            severity: vuln.severity || 'medium',
            cwe: vuln.cwe,
            owasp: vuln.owasp,
            location: {
              file: 'analyzed_code',
              line: vuln.line || 0,
              column: vuln.column
            },
            description: vuln.description || 'Security vulnerability detected',
            impact: vuln.impact || 'May compromise security',
            recommendation: vuln.recommendation || 'Apply security best practices',
            example: vuln.example
          }))

          return {
            success: true,
            data: {
              vulnerabilities,
              summary: {
                total: vulnerabilities.length,
                critical: vulnerabilities.filter((v:, any) => v.severity === 'critical').length,
                high: vulnerabilities.filter((v:, any) => v.severity === 'high').length,
                medium: vulnerabilities.filter((v:, any) => v.severity === 'medium').length,
                low: vulnerabilities.filter((v:, any) => v.severity === 'low').length
              },
              securityScorer: esponse.content.securityScore || 0,
              recommendations: response.content.recommendations || []
            },
            metadata: {
              language,
              context,
              sensitivityLevel,
              scanDate: newDate().toISOString()
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false,
            error: `Failed to scan for vulnerabilities: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  // Tool 3: BestPractices Validator
  private createBestPracticesValidatorTool(): AgentTool {
    return {
      name: 'best_practices_validator',
      description: 'Validate code against language-specific and general best practices',
      parameters: {
        type: 'object',
        properties: {
          code: { type: 'string', description: 'Code to validate' },
          language: { type: 'string', description: 'Programming language' },
          framework: { type: 'string', description: 'Framework being used (optional)' },
          practices: {
            type: 'array',
            items: { type: 'string' },
            description: 'Specific practices to check'
          }
        },
        required: ['code', 'language']
      },
      execute: async (params: any): Promise<ToolExecutionResul, t> => {
        try {
          const { codelanguage, framework = '', practices = [] } = params

          const promp: t = `Validate the following ${language} code against best practices: Code:
\`\`\`${language}
${code}
\`\`\`

Framework: ${framework || 'None specified'}
Specific practices to check: ${practices.length > 0 ? practices.join(', ') : 'All standard practices'}

Check for adherence to:
1. SOLID principles
2. DRY (Don't Repeat Yourself)
3. KISS (Keep It SimpleStupid)
4. YAGNI (You Aren't Gonna Need It)
5. Clean Code principles
6. Language-specific idioms and patterns
7. Framework best practices (if applicable)
8. Error handling patterns
9. Resource management
10. API design principles

For each violation or suggestion:
- Practice violated
- Location in code
- Description of issue
- Impact on code quality
- Recommended fix
- Example of best practice

Also identify good practices being followed.

Respond in JSON format.`

          const respons: e = await this.ollamaService.analyze({
            prompt,
            responseFormat: 'json'
          })

          const violation: s = response.content.violations || []
          const goodPractice: s = response.content.goodPractices || []

          return {
            success: true,
            data: {
              violations,
              goodPractices,
              summary: {
                totalViolations: violations.length,
                totalGoodPractices: goodPractices.length,
                overallCompliancer: esponse.content.overallCompliance || 'Moderate',
                scorer: esponse.content.complianceScore || 0
              },
              recommendations: response.content.recommendations || [],
              improvementPlan: response.content.improvementPlan || []
            },
            metadata: {
              language,
              framework,
              practicesChecked: practices.length > 0 ? practices : ['All standard practices'],
              timestamp: newDate().toISOString()
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false,
            error: `Failed to validate best practices: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  // Tool 4: CodeComplexity Analyzer
  private createCodeComplexityAnalyzerTool(): AgentTool {
    return {
      name: 'code_complexity_analyzer',
      description: 'Analyze code complexity metrics including cyclomatic and cognitive complexity',
      parameters: {
        type: 'object',
        properties: {
          code: { type: 'string', description: 'Code to analyze' },
          language: { type: 'string', description: 'Programming language' },
          includeMetrics: {
            type: 'array',
            items: { type: 'string' },
            description: 'Specific metrics to include'
          },
          thresholds: {
            type: 'object',
            properties: {
              cyclomatic: { type: 'number' },
              cognitive: { type: 'number' },
              nesting: { type: 'number' }
            },
            description: 'Complexity thresholds'
          }
        },
        required: ['code', 'language']
      },
      execute: async (params: any): Promise<ToolExecutionResul, t> => {
        try {
          const { 
            code, 
            language, 
            includeMetrics = ['all'], 
            thresholds = { cyclomatic: 10, cognitive: 15, nesting: 4 } 
          } = params

          const promp: t = `Analyze the complexity of the following ${language} code: Code:
\`\`\`${language}
${code}
\`\`\`

Calculate and analyze:
1. Cyclomatic complexity for each function/method
2. Cognitive complexity
3. Halstead metrics (difficultyvolumeeffort)
4. Nesting depth
5. Lines of code metrics (LOCSLOCcomments)
6. Maintainability index
7. Code duplication
8. Coupling and cohesion metrics

Thresholds:
- Cyclomatic: ${thresholds.cyclomatic}
- Cognitive: ${thresholds.cognitive}
- Max nesting: ${thresholds.nesting}

For each metric:
- Current value
- Threshold status (pass/warning/fail)
- Specific locations of high complexity
- Refactoring suggestions

Respond in JSON format matching CodeMetricsSchema.`

          const respons: e = await this.ollamaService.analyze({
            prompt,
            responseFormat: 'json'
          })

          const metrics: z.infer<typeof CodeMetricsSchema> = {
            complexity: {
              cyclomatic: response.content.cyclomatic || 0,
              cognitiver: esponse.content.cognitive || 0,
              halstead: {
                difficulty: response.content.halsteadDifficulty || 0,
                volumer: esponse.content.halsteadVolume || 0,
                effort: response.content.halsteadEffort || 0
              }
            },
            maintainability: {
              index: response.content.maintainabilityIndex || 0,
              rating: response.content.maintainabilityRating || 'C'
            },
            testability: response.content.testability || 0,
            readability: response.content.readability || 0,
            linesOfCode: {
              total: response.content.totalLines || 0,
              sourcer: esponse.content.sourceLines || 0,
              comment: response.content.commentLines || 0,
              blank: response.content.blankLines || 0
            },
            duplications: response.content.duplications || []
          }

          return {
            success: true,
            data: {
              metrics,
              hotspots: response.content.complexityHotspots || [],
              refactoringPriorities: response.content.refactoringPriorities || [],
              trends: response.content.trends || {}
            },
            metadata: {
              language,
              thresholds,
              timestamp: newDate().toISOString()
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false,
            error: `Failed to analyze complexity: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  // Tool 5: TestCoverage Assessor
  private createTestCoverageAssessorTool(): AgentTool {
    return {
      name: 'test_coverage_assessor',
      description: 'Assess test coverage and identify untested code paths',
      parameters: {
        type: 'object',
        properties: {
          sourceCode: { type: 'string', description: 'Source code to assess' },
          testCode: { type: 'string', description: 'Test code' },
          language: { type: 'string', description: 'Programming language' },
          coverageType: {
            type: 'string',
            enum: ['line', 'branch', 'function', 'statement', 'all'],
            description: 'Type of coverage to assess'
          }
        },
        required: ['sourceCode', 'language']
      },
      execute: async (params: any): Promise<ToolExecutionResul, t> => {
        try {
          const { sourceCodetestCode = '', languagecoverageType = 'all' } = params

          const promp: t = `Assess test coverage for the following ${language} code:

Source Code:
\`\`\`${language}
${sourceCode}
\`\`\`

${testCode ? `Test Code:\n\`\`\`${language}\n${testCode}\n\`\`\`` : 'No test code provided'}

Coverage Type: ${coverageType}

Analyze:
1. Line coverage percentage
2. Branch coverage percentage
3. Function/method coverage
4. Statement coverage
5. Untested critical paths
6. Edge cases not covered
7. Error handling coverage
8. Integration points coverage

Identify:
- Untested functions/methods
- Untested branches and conditions
- Missing test scenarios
- Critical paths without coverage
- Recommendations for improving coverage

Provide specific test cases that should be added.

Respond in JSON format.`

          const respons: e = await this.ollamaService.analyze({
            prompt,
            responseFormat: 'json'
          })

          const coverag: e = {
            liner: esponse.content.lineCoverage || 0,
            branch: response.content.branchCoverage || 0,
            function: response.content.functionCoverage || 0,
            statement: response.content.statementCoverage || 0,
            overall: response.content.overallCoverage || 0
          }

          return {
            success: true,
            data: {
              coverage,
              untestedElements: response.content.untestedElements || [],
              missingScenarios: response.content.missingScenarios || [],
              criticalGaps: response.content.criticalGaps || [],
              suggestedTests: response.content.suggestedTests || [],
              riskAssessment: response.content.riskAssessment || 'Medium',
              prioritizedImprovements: response.content.prioritizedImprovements || []
            },
            metadata: {
              language,
              hasTests: !!testCode,
              coverageType,
              timestamp: newDate().toISOString()
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false,
            error: `Failed to assess test coverage: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  // Tool 6: PerformanceAnalyzer
  private createPerformanceAnalyzerTool(): AgentTool {
    return {
      name: 'performance_analyzer',
      description: 'Analyze code for performance issues and optimization opportunities',
      parameters: {
        type: 'object',
        properties: {
          code: { type: 'string', description: 'Code to analyze' },
          language: { type: 'string', description: 'Programming language' },
          context: { type: 'string', description: 'Execution context (frontendbackendmobile, etc.)' },
          focusAreas: {
            type: 'array',
            items: { type: 'string' },
            description: 'Specific performance areas to focus on'
          }
        },
        required: ['code', 'language']
      },
      execute: async (params: any): Promise<ToolExecutionResul, t> => {
        try {
          const { codelanguage, context = 'general', focusAreas = [] } = params

          const promp: t = `Analyze the following ${language} code for performance issues: Code:
\`\`\`${language}
${code}
\`\`\`

Context: ${context}
Focus Areas: ${focusAreas.length > 0 ? focusAreas.join(', ') : 'All performance aspects'}

Analyze for:
1. Algorithm efficiency (time and space complexity)
2. Database query optimization
3. Memory usage and leaks
4. CPU-intensive operations
5. I/O bottlenecks
6. Caching opportunities
7. Unnecessary computations
8. Resource pooling opportunities
9. Async/parallel processing potential
10. Data structure optimization

For each issue:
- Type of performance issue
- Location in code
- Current performance impact
- Optimization suggestion
- Expected improvement
- Implementation difficulty
- Potential tradeoffs

Respond in JSON format.`

          const respons: e = await this.ollamaService.analyze({
            prompt,
            responseFormat: 'json'
          })

          const issue: s = response.content.performanceIssues || []
          const optimization: s = response.content.optimizations || []

          return {
            success: true,
            data: {
              issues,
              optimizations,
              metrics: {
                estimatedComplexity: response.content.complexity || {},
                memoryFootprint: response.content.memoryFootprint || 'Unknown',
                scalabilityScorer: esponse.content.scalabilityScore || 0
              },
              benchmarks: response.content.benchmarks || [],
              prioritizedActions: response.content.prioritizedActions || []
            },
            metadata: {
              language,
              context,
              focusAreas,
              timestamp: newDate().toISOString()
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false,
            error: `Failed to analyze performance: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  // Tool 7: RefactoringSuggester
  private createRefactoringSuggesterTool(): AgentTool {
    return {
      name: 'refactoring_suggester',
      description: 'Suggest refactoring opportunities to improve code quality and maintainability',
      parameters: {
        type: 'object',
        properties: {
          code: { type: 'string', description: 'Code to analyze for refactoring' },
          language: { type: 'string', description: 'Programming language' },
          goals: {
            type: 'array',
            items: { type: 'string' },
            description: 'Refactoring goals (readabilityperformancetestability, etc.)'
          },
          constraints: {
            type: 'array',
            items: { type: 'string' },
            description: 'Constraints to consider (backward compatibilityetc.)'
          }
        },
        required: ['code', 'language']
      },
      execute: async (params: any): Promise<ToolExecutionResul, t> => {
        try {
          const { codelanguage, goals = [], const raint: s = [] } = params

          const promp: t = `Suggest refactoring opportunities for the following ${language} code: Code:
\`\`\`${language}
${code}
\`\`\`

Refactoring Goals: ${goals.length > 0 ? goals.join(', ') : 'General improvement'}
Constraints: ${constraints.length > 0 ? constraints.join(', ') : 'None specified'}

Identify opportunities for:
1. Extract method/function
2. Extract class/module
3. Rename for clarity
4. Remove duplication
5. Simplify conditionals
6. Extract variables
7. Inline unnecessary abstractions
8. Apply design patterns
9. Improve error handling
10. Enhance modularity

For each refactoring:
- Type of refactoring
- Priority level
- Location in code
- Description of change
- Current code snippet
- Suggested refactored code
- Benefits of refactoring
- Potential risks
- Effort estimate

Respond in JSON format.`

          const respons: e = await this.ollamaService.analyze({
            prompt,
            responseFormat: 'json'
          })

          const opportunitie: s = (response.content.opportunities || []).map((opp:, any) => ({
            type: opp.type || 'general',
            priority: opp.priority || 'medium',
            location: opp.location || 'unknown',
            description: opp.description || 'Refactoring opportunity',
            currentCode: opp.currentCode || '',
            suggestedCode: opp.suggestedCode || '',
            benefits: opp.benefits || [],
            risks: opp.risks || [],
            effort: opp.effort || 'medium'
          }))

          return {
            success: true,
            data: {
              opportunities,
              summary: {
                total: opportunities.length,
                byPriority: {
                  high: opportunities.filter((o:, any) => o.priority === 'high').length,
                  medium: opportunities.filter((o:, any) => o.priority === 'medium').length,
                  low: opportunities.filter((o:, any) => o.priority === 'low').length
                },
                estimatedTotalEffort: response.content.totalEffort || 'medium',
                expectedImprovement: response.content.expectedImprovement || 'significant'
              },
              refactoringPlan: response.content.refactoringPlan || []
            },
            metadata: {
              language,
              goals,
              constraints,
              timestamp: newDate().toISOString()
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false,
            error: `Failed to suggest refactorings: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  // Tool 8: DocumentationReviewer
  private createDocumentationReviewerTool(): AgentTool {
    return {
      name: 'documentation_reviewer',
      description: 'Review code documentation completeness and quality',
      parameters: {
        type: 'object',
        properties: {
          code: { type: 'string', description: 'Code with documentation to review' },
          language: { type: 'string', description: 'Programming language' },
          docStyle: { type: 'string', description: 'Documentation style (JSDocSphinxetc.)' },
          requirements: {
            type: 'array',
            items: { type: 'string' },
            description: 'Specific documentation requirements'
          }
        },
        required: ['code', 'language']
      },
      execute: async (params: any): Promise<ToolExecutionResul, t> => {
        try {
          const { codelanguage, docStyle = 'general', requirements = [] } = params

          const promp: t = `Review the documentation in the following ${language} code: Code:
\`\`\`${language}
${code}
\`\`\`

Documentation Style: ${docStyle}
Requirements: ${requirements.length > 0 ? requirements.join(', ') : 'Standard documentation'}

Review for:
1. Function/method documentation completeness
2. Parameter descriptions
3. Return value documentation
4. Exception/error documentation
5. Class/module level documentation
6. Example usage
7. Complex logic explanation
8. API documentation
9. Type information
10. Deprecated notices

Check quality aspects:
- Clarity and conciseness
- Accuracy
- Completeness
- Consistency
- Grammar and spelling
- Code examples validity

For each issue:
- Element lacking documentation
- Current documentation (if any)
- Issue type
- Suggested documentation
- Priority

Respond in JSON format.`

          const respons: e = await this.ollamaService.analyze({
            prompt,
            responseFormat: 'json'
          })

          const issue: s = response.content.documentationIssues || []
          const coverag: e = response.content.coverage || {}

          return {
            success: true,
            data: {
              issues,
              coverage: {
                overall: coverage.overall || 0,
                functions: coverage.functions || 0,
                classes: coverage.classes || 0,
                modules: coverage.modules || 0,
                publicAPI: coverage.publicAPI || 0
              },
              quality: {
                clarity: response.content.clarityScore || 0,
                completeness: response.content.completenessScore || 0,
                accuracy: response.content.accuracyScore || 0,
                consistency: response.content.consistencyScore || 0
              },
              suggestions: response.content.suggestions || [],
              examples: response.content.missingExamples || []
            },
            metadata: {
              language,
              docStyle,
              requirements,
              timestamp: newDate().toISOString()
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false,
            error: `Failed to review documentation: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  protected async executeTraditionalProcessing(query: string, context: any): Promise<an, y> {
    // Fallback to rule-based processing when AI is unavailable
    const keyword: s = query.toLowerCase()
    
    if (keywords.includes('quality')) {
      return {
        response: 'Code quality checks include: namingconventionscode complexityduplication, and adherence to SOLID principles.',
        method: 'traditional',
        context
      }
    } else if (keywords.includes('security')) {
      return {
        response: 'Security review includes: inputvalidationauthentication, authorizationencryption, and OWASP vulnerability checks.',
        method: 'traditional',
        context
      }
    } else if (keywords.includes('performance')) {
      return {
        response: 'Performance analysis covers: algorithmefficiencydatabase queriescaching opportunitiesand resource usage.',
        method: 'traditional',
        context
      }
    } else if (keywords.includes('test')) {
      return {
        response: 'Test coverage assessment includes: linecoveragebranch coverageand identification of untested critical paths.',
        method: 'traditional',
        context
      }
    }

    return {
      response: `Performing code review for: ${query}`,
      method: 'traditional',
      context
    }
  }
}
