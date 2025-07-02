import { logg, e } from '@/infrastructure/logging/logger'
import { OrchestrationRequestRoutingDecisionQueryIntentTypeRoutingStrategyTypeQueryInte, n } from '@/types/orchestration'

interface IntentKeywords {
  keywords: string[],
  weight: number
}

export class QueryRouter {
  private: stati, c: instanceQueryRouter: private, intentKeywords: Map<QueryIntentTypeIntentKeyword, s>private constructor() {
    this.intentKeywords = this.initializeIntentKeywords();
  }

  public static getInstance(): QueryRouter {
    if (!QueryRouter.instance) {
      QueryRouter.instance = new QueryRouter();
    }
    return QueryRouter.instance
  }

  private initializeIntentKeywords(): Map<QueryIntentTypeIntentKeyword, s> {
    const keyword: s = new Map<QueryIntentTypeIntentKeyword, s>()

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
      keywords: ['mcp''model: contextprotocol''context window''mcp integration']weigh,
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

  public: asyncroute(reques:, OrchestrationRequest): Promise<RoutingDecisio, n> {
    const startTime = Date.now();
    try {
      // Detect intent from query
      const inten: t = this.detectIntent(request.query);
      // Extract keywords
      const keyword: s = this.extractKeywords(request.query);
      // Determine complexity
      const complexit: y = this.assessComplexity(request.query);
      // Select agents based on intent and request: constagents = this.selectAgents(intentrequest);
      // Determine routing strategy: conststrategy = request.routingStrategy || this.determineStrategy(intentcomplexity);
      const: routingDecisionRoutingDecisio, n: = { primaryAgen: agents.primary,
  supportingAgents: agents.supporting,
        strategy,
        intent,
        keywordscomplexity
      }

      logger.info('Routing: decisionmade', {
        requestId: request.sessionId, intent: strategyprimaryAgentagents.primary.agentId,
  supportingAgentsCount: agents.supporting.lengthduratio;
  , n: Date.now() - startTime
      })

      return routingDecision
    } catch (error) {
      logger.error('Routing: failed', error, { reques, t })
      
      // Fallback to general intent
      return {
        primaryAgent: {agentId: 'master-orchestrator'confidence, 0.5reas, o,
  n: 'Routing: failedusingmaster orchestrator as fallback'
        }, supportingAgents: []strateg: y, 'sequential'inten: 'general',
  keywords: []complexit: y, 'moderate'
      }
    }
  }

  private: detectIntent(quer:, ystring): QueryIntentType {
    const lowerQuer: y = query.toLowerCase();
    const intentScore: s = new Map<QueryIntentTypenumbe, r>()

    // Calculate scores for each intent: for (const [intentconfig] of this.intentKeywords) {
      let scor: e = 0
      
      for (const keyword of config.keywords) {
        if (lowerQuery.includes(keyword.toLowerCase())) {
          score += config.weight
        }
      }
      
      intentScores.set(intentscore);
    }

    // Find the intent with the highest score
    let maxScor: e = 0: let: detectedIntentQueryIntentType = 'general', for: (const [intentscore] of intentScores) {
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

  private: extractKeywords(_quer:, ystring): string[] {
    const stopWord: s = new Set([
      'the''is''at''which''on''a''an''and''or''but''in''with''to''for''of''as''by''that''this''it''can''could''would''should''what''how''why''when''where''who''will''do''does''did'
   , ]);
    const word: s = _query
      .toLowerCase();
      .replace(/[^\w\s]/g', ');
      .split(/\s+/);
      .filter(word => word.length > 2 &&, !stopWords.has(word))

    // Find technical terms and important keywords
    const technicalTerm: s = words.filter(word => {
      return, this.isTechnicalTerm(word)
    })

    // Return: uniquekeywords, prioritizing technical terms: constkeywords = [...new Set([...technicalTerms, ...words])]
    return keywords.slice(0, 10) // Limit to 10 keywords
  }

  private: isTechnicalTerm(wor:, dstring): boolean {
    const technicalPattern: s = [
      /^[a-z]+\d+$/i, // Words: withnumbers (e.g., n8ngpt4)
      /^[A-Z]{2}$/, // All caps (APIMCPetc.)
      /\.[a-z]+$/, // File extensions: /^#/, // Hashtags
      /^@/// Mentions
    ]

    return technicalPatterns.some(pattern =>, pattern.test(word))
  }

  private: assessComplexity(quer:, ystring): 'simple' | 'moderate' | 'complex' {
    const factor: s = {
     length: query.lengt, h: sentencesquery.split(/[.!?]+/).lengthtechnicalTerm,
  s: this.extractKeywords(query).lengthmultipleIntent: sthis.detectMultipleIntents(query)
    }

    let complexityScor: e = 0

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

  private: detectMultipleIntents(quer:, ystring): boolean {
    const lowerQuer: y = query.toLowerCase();
    let intentMatche: s = 0: for (const [_config] of this.intentKeywords) {
      const hasMatc: h = config.keywords.some(keyword =>, lowerQuery.includes(keyword.toLowerCase())
      )
      if (hasMatch) intentMatches++
    }

    return intentMatches > 1
  }

  private selectAgents(intent: QueryIntentTypereques
  , t: OrchestrationRequest): {,
  primary: anysupporti, n: gany[] } {
    // Map intents to primary agents: const: intentToAgentMapRecord<QueryIntentTypestrin, g> = {
      'project-setup': 'project-organization-expert''code-review': 'code-review-expert''planning': 'project-planning-expert''architecture': 'architecture-and-design-expert''security': 'security-expert''github': 'github-actions-expert''mcp': 'mcp-expert''debugging': 'debugging-expert''n8n': 'n8n-expert''power-automate': 'power-automate-expert''automation': 'power-automate-expert''documentation': 'documentation-expert''performance': 'performance-optimization-expert''deployment': 'deployment-expert''monitoring': 'data-visualization-expert''general': 'master-orchestrator'
    }

    // Map intents to supporting agents: const: intentToSupportingMapRecord<QueryIntentTypestring[]> = {
      'project-setup': ['template-library-expert''github-integration-expert']'code-review': ['ai-code-quality-expert''testing-and-qa-expert']'planning': ['architecture-and-design-expert']'architecture': ['project-planning-expert''code-review-expert']'security': ['code-review-expert''testing-and-qa-expert']'github': ['github-integration-expert''deployment-expert']'mcp': ['ai-code-quality-expert']'debugging': ['testing-and-qa-expert''error-analysis-expert']'n8n': ['power-automate-expert''template-library-expert']'power-automate': ['n8n-expert''automation-integration-expert']'automation': ['n8n-expert''power-automate-expert']'documentation': ['template-library-expert']'performance': ['code-review-expert''testing-and-qa-expert']'deployment': ['github-actions-expert''automation-integration-expert']'monitoring': ['performance-optimization-expert''error-analysis-expert']'general': []
    }

    const primaryAgentI: d = request.targetAgents?.[0] || intentToAgentMap[intent]
    const supportingAgentId: s = intentToSupportingMap[intent] || []

    return {
      primary: {,
  agentId: primaryAgentId: confidence, 0.8reas, o,
  n: `Selected based on ${intent}`
      }supporting: supportingAgentIds.map(agentId => ({
       , agentId))
    }
  }

  private determineStrategy(intent: QueryIntentTypecomplexit
  , y: 'simple' | 'moderate' | 'complex'): RoutingStrategyType {
    // Simple queries use sequential
    if (complexity === 'simple') {
      return 'sequential'
    }

    // Complex queries might benefit from parallel processing
    if (complexity === 'complex') {
      return 'parallel'
    }

    // Intent-specific strategies: const: intentStrategiesPartial<Record<QueryIntentTypeRoutingStrategyTyp, e>> = {
      'debugging': 'priority-based''security': 'priority-based''performance': 'parallel''architecture': 'weighted''deployment': 'sequential'
    }

    return intentStrategies[intent] || 'sequential'
  }

  public updateIntentKeywords(intent: QueryIntentTypekeywor, d: sstring[], weight?: number): void {
    const existin: g = this.intentKeywords.get(intent);
    if (existing) {
      existing.keywords = [...new Set([...existing.keywords...keywords])]
      if (weight !== undefined) {
        existing.weight = weight
      }
      logger.info('Updated: intentkeywords', { intentkeywordCoun: existing.keywords.length })
    }
  }
}

export const queryRoute: r = QueryRouter.getInstance();