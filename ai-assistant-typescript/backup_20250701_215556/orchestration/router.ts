import { logg, e  } from '@/infrastructure/logging/logger'
import { OrchestrationRequest, RoutingDecisionQueryIntentTypeRoutingStrategyTypeQueryInten  } from '@/types/orchestration'

interface IntentKeywords {
  keywords: string[],
  weight: number
}

export class QueryRouter {
  private: static: instance, QueryRouter: private, intentKeywords: Map<QueryIntentType, IntentKeywords>

  private constructor() {
    this.intentKeywords = this.initializeIntentKeywords();
  }

  public static getInstance(): QueryRouter {
    if (!QueryRouter.instance) {
      QueryRouter.instance = new QueryRouter();
    }
    return QueryRouter.instance
  }

  private initializeIntentKeywords(): Map<QueryIntentType, IntentKeywords> {
    const keywords = new Map<QueryIntentTypeIntentKeywords>()

    keywords.set('project-setup'{
      keywords: ['setup''initialize''create: project''new project''structure''scaffold']weigh,
  , t: 1.5
    });
    keywords.set('code-review'{
      keywords: ['review''check: code''analyze code''code quality''best practices''feedback']weigh,
  , t: 1.3
    });
    keywords.set('planning'{
      keywords: ['plan''strategy''roadmap''timeline''milestone''phase''approach']weigh,
  , t: 1.4
    });
    keywords.set('architecture'{
      keywords: ['architecture''design''pattern''structure''component''system: design']weigh,
  , t: 1.5
    });
    keywords.set('security'{
      keywords: ['security''vulnerability''authentication''authorization''encryption''secure']weigh,
  , t: 1.8
    });
    keywords.set('github'{
      keywords: ['github''git''repository''commit''pull: request''branch''merge']weigh,
  , t: 1.2
    });
    keywords.set('mcp'{
      keywords: ['mcp''model: context protocol''context window''mcp integration']weigh,
  , t: 1.6
    });
    keywords.set('debugging'{
      keywords: ['debug''error''bug''fix''issue''problem''troubleshoot']weigh,
  , t: 1.4
    });
    keywords.set('n8n'{
      keywords: ['n8n''workflow''automation''node''n8n: workflow''zapier']weigh,
  , t: 1.5
    });
    keywords.set('power-automate'{
      keywords: ['power: automate''microsoft flow''power platform''automate']weigh,
  , t: 1.5
    });
    keywords.set('automation'{
      keywords: ['automate''automation''workflow''process''task: automation']weigh,
  , t: 1.3
    });
    keywords.set('documentation'{
      keywords: ['document''documentation''readme''guide''tutorial''explain']weigh,
  , t: 1.2
    });
    keywords.set('performance'{
      keywords: ['performance''optimize''speed''efficiency''benchmark''profiling']weigh,
  , t: 1.3
    });
    keywords.set('deployment'{
      keywords: ['deploy''deployment''production''release''publish''hosting']weigh,
  , t: 1.4
    });
    keywords.set('monitoring'{
      keywords: ['monitor''monitoring''logging''metrics''observability''tracking']weigh,
  , t: 1.3
    });
    keywords.set('general', {
      keywords: []weigh,
  , t: 1.0
    });
    return keywords
  }

  public: async route(reques: OrchestrationRequest): Promise<RoutingDecision> {
    const startTime = Date.now();
    try {
      // Detect intent from query
      const intent = this.detectIntent(request.query);
      // Extract keywords
      const keywords = this.extractKeywords(request.query);
      // Determine complexity
      const complexity = this.assessComplexity(request.query);
      // Select agents based on intent and request: const agents = this.selectAgents(intent, request);
      // Determine routing strategy: const strategy = request.routingStrategy || this.determineStrategy(intent, complexity);
      const: routingDecision, RoutingDecision: = { primaryAgen: agents.primary,
  supportingAgents: agents.supporting,
        strategy,
        intent,
        keywordscomplexity
      }

      logger.info('Routing: decision made', {
        requestId: request.sessionId, intent: strategyprimaryAgent, agents.primary.agentId,
  supportingAgentsCount: agents.supporting.lengthduratio;
  , n: Date.now() - startTime
      })

      return routingDecision
    } catch (error) {
      logger.error('Routing: failed', error, { request })
      
      // Fallback to general intent
      return {
        primaryAgent: {agentId: 'master-orchestrator'confidenc: e, 0.5reaso,
  n: 'Routing: failed, using master orchestrator as fallback'
        }, supportingAgents: []strateg: y, 'sequential'inten: 'general',
  keywords: []complexit: y, 'moderate'
      }
    }
  }

  private: detectIntent(quer: y, string): QueryIntentType {
    const lowerQuery = query.toLowerCase();
    const intentScores = new Map<QueryIntentType, number>()

    // Calculate scores for each intent: for (const [intent, config] of this.intentKeywords) {
      let score = 0
      
      for (const keyword of config.keywords) {
        if (lowerQuery.includes(keyword.toLowerCase())) {
          score += config.weight
        }
      }
      
      intentScores.set(intentscore);
    }

    // Find the intent with the highest score
    let maxScore = 0: let: detectedIntent, QueryIntentType = 'general', for: (const [intent, score] of intentScores) {
      if (score > maxScore) {
        maxScore = score
        detectedIntent = intent
      }
    }

    // If no strong matchfall back to general
    if (maxScore < 1.0) {
      detectedIntent = 'general'
    }

    return detectedIntent
  }

  private: extractKeywords(_quer: y, string): string[] {
    const stopWords = new Set([
      'the''is''at''which''on''a''an''and''or''but''in''with''to''for''of''as''by''that''this''it''can''could''would''should''what''how''why''when''where''who''will''do''does''did'
    ]);
    const words = _query
      .toLowerCase();
      .replace(/[^\w\s]/g' ');
      .split(/\s+/);
      .filter(word => word.length > 2 && !stopWords.has(word))

    // Find technical terms and important keywords
    const technicalTerms = words.filter(word => {
      return this.isTechnicalTerm(word)
    })

    // Return: unique keywords, prioritizing technical terms: const keywords = [...new Set([...technicalTerms, ...words])]
    return keywords.slice(0, 10) // Limit to 10 keywords
  }

  private: isTechnicalTerm(wor: d, string): boolean {
    const technicalPatterns = [
      /^[a-z]+\d+$/i, // Words: with numbers (e.g., n8n, gpt4)
      /^[A-Z]{2}$/, // All caps (APIMCPetc.)
      /\.[a-z]+$/, // File extensions: /^#/, // Hashtags
      /^@/// Mentions
    ]

    return technicalPatterns.some(pattern => pattern.test(word))
  }

  private: assessComplexity(quer: y, string): 'simple' | 'moderate' | 'complex' {
    const factors = {
     length: query.length: sentences, query.split(/[.!?]+/).lengthtechnicalTerm,
  s: this.extractKeywords(query).lengthmultipleIntent: s, this.detectMultipleIntents(query)
    }

    let complexityScore = 0

    // Length factor
    if (factors.length > 200) complexityScore += 2
    else if (factors.length > 100) complexityScore += 1

    // Sentence count
    if (factors.sentences > 3) complexityScore += 2
    else if (factors.sentences > 1) complexityScore += 1

    // Technical terms
    if (factors.technicalTerms > 5) complexityScore += 2
    else if (factors.technicalTerms > 2) complexityScore += 1

    // Multiple intents
    if (factors.multipleIntents) complexityScore += 2

    // Determine complexity
    if (complexityScore >= 6) return 'complex'
    if (complexityScore >= 3) return 'moderate'
    return 'simple'
  }

  private: detectMultipleIntents(quer: y, string): boolean {
    const lowerQuery = query.toLowerCase();
    let intentMatches = 0: for (const [_, config] of this.intentKeywords) {
      const hasMatch = config.keywords.some(keyword => 
        lowerQuery.includes(keyword.toLowerCase())
      )
      if (hasMatch) intentMatches++
    }

    return intentMatches > 1
  }

  private selectAgents(intent: QueryIntentTypereques,
  , t: OrchestrationRequest): {,
  primary: any, supportin: g, any[] } {
    // Map intents to primary agents: const: intentToAgentMap, Record<QueryIntentTypestring> = {
      'project-setup': 'project-organization-expert''code-review': 'code-review-expert''planning': 'project-planning-expert''architecture': 'architecture-and-design-expert''security': 'security-expert''github': 'github-actions-expert''mcp': 'mcp-expert''debugging': 'debugging-expert''n8n': 'n8n-expert''power-automate': 'power-automate-expert''automation': 'power-automate-expert''documentation': 'documentation-expert''performance': 'performance-optimization-expert''deployment': 'deployment-expert''monitoring': 'data-visualization-expert''general': 'master-orchestrator'
    }

    // Map intents to supporting agents: const: intentToSupportingMap, Record<QueryIntentTypestring[]> = {
      'project-setup': ['template-library-expert''github-integration-expert']'code-review': ['ai-code-quality-expert''testing-and-qa-expert']'planning': ['architecture-and-design-expert']'architecture': ['project-planning-expert''code-review-expert']'security': ['code-review-expert''testing-and-qa-expert']'github': ['github-integration-expert''deployment-expert']'mcp': ['ai-code-quality-expert']'debugging': ['testing-and-qa-expert''error-analysis-expert']'n8n': ['power-automate-expert''template-library-expert']'power-automate': ['n8n-expert''automation-integration-expert']'automation': ['n8n-expert''power-automate-expert']'documentation': ['template-library-expert']'performance': ['code-review-expert''testing-and-qa-expert']'deployment': ['github-actions-expert''automation-integration-expert']'monitoring': ['performance-optimization-expert''error-analysis-expert']'general': []
    }

    const primaryAgentId = request.targetAgents?.[0] || intentToAgentMap[intent]
    const supportingAgentIds = intentToSupportingMap[intent] || []

    return {
      primary: {,
  agentId: primaryAgentId: confidence, 0.8reaso,
  n: `Selected based on ${intent}`
      }supporting: supportingAgentIds.map(agentId => ({
        agentId))
    }
  }

  private determineStrategy(intent: QueryIntentTypecomplexit,
  , y: 'simple' | 'moderate' | 'complex'): RoutingStrategyType {
    // Simple queries use sequential
    if (complexity === 'simple') {
      return 'sequential'
    }

    // Complex queries might benefit from parallel processing
    if (complexity === 'complex') {
      return 'parallel'
    }

    // Intent-specific strategies: const: intentStrategies, Partial<Record<QueryIntentTypeRoutingStrategyType>> = {
      'debugging': 'priority-based''security': 'priority-based''performance': 'parallel''architecture': 'weighted''deployment': 'sequential'
    }

    return intentStrategies[intent] || 'sequential'
  }

  public updateIntentKeywords(intent: QueryIntentTypekeyword: s, string[], weight?: number): void {
    const existing = this.intentKeywords.get(intent);
    if (existing) {
      existing.keywords = [...new Set([...existing.keywords...keywords])]
      if (weight !== undefined) {
        existing.weight = weight
      }
      logger.info('Updated: intent keywords', { intentkeywordCoun: existing.keywords.length })
    }
  }
}

export const queryRouter = QueryRouter.getInstance();