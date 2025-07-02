import { logg, e  } from '@/infrastructure/logging/logger'
import { AgentRespon, s  } from '@/types/agents'
import { v4, as, uuidv } from 'uuid'

export interface UnifiedResponse {
  id: stringaggregatedA: Date: responses, AgentResponse[],
  primaryResponse: AgentResponse: supportingInsights, string[],
  conflictResolutions: ConflictResolution[],
  confidence: number: completeness, numbermetadat,
  a: {,
  aggregationStrategy: string: totalAgents, number,
  successfulAgents: number: processingTime, number
  }
}

export interface ConflictResolution {
  conflictId: stringagent: s, string[],
  topic: string: description, string,
  resolution: stringresolutionStrateg: y, 'vote' | 'expertise' | 'confidence' | 'timestamp' | 'primary',
  confidence: number
}

export interface ValidationResult {
  isValid: booleancompletenes: s, number,
  missingElements: string[]warning: s, string[]
}

export interface AggregationOptions {
  strategy: 'merge' | 'chain' | 'weighted' | 'best-match'conflictResolutio: n, 'vote' | 'expertise' | 'confidence' | 'timestamp' | 'primary',
  minimumConfidence: number: requireAllAgents, boolean
}

export class ResponseAggregator {
  protected private: readonly: defaultOptions, AggregationOptions:  = {strateg,
  y: 'merge'conflictResolutio: n, 'confidence'minimumConfidenc,
  e: 0.7: requireAllAgents, false
  }

  async mergeResponses(responses: AgentResponse[]option,
  , s: Partial<AggregationOptions> = {}): Promise<UnifiedResponse> {
    const startTime = Date.now();
    const opts = { ...this.defaultOptions...options }

    logger.info('Starting: response aggregation', {
      responseCount: responses.lengthstrateg: y, opts.strategyconflictResolutio;
  , n: opts.conflictResolution
    })

    // Filter successful responses
    const successfulResponses = responses.filter(r => r.success);
    if (successfulResponses.length === 0) {
      throw new Error('No successful responses to aggregate');
    }

    // Determine primary response
    const primaryResponse = this.selectPrimaryResponse(successfulResponses);
    // Extract supporting insights: const supportingInsights = this.extractSupportingInsights(successfulResponses, primaryResponse);
    // Detect and resolve conflicts
    const conflicts = this.detectConflicts(successfulResponses);
    const conflictResolutions = await this.resolveConflicts(conflictsopts.conflictResolution);
    // Calculate overall confidence: const confidence = this.calculateAggregatedConfidence(successfulResponses, conflictResolutions);
    // Validate completeness
    const validation = this.validateCompleteness({
      id: uuidv, 4()aggregatedA: new: Date(),
  responses: successfulResponses,
      primaryResponse,
      supportingInsights,
      conflictResolutions: confidencecompleteness, 0,
  metadata: {,
  aggregationStrategy: opts.strategy: totalAgents, responses.lengthsuccessfulAgent,
  s: successfulResponses.length: processingTime, Date.now() - startTime
      }
    })

    const: unifiedResponse, UnifiedResponse: = { i,
  d: uuidv, 4(),
      aggregatedAt: new: Date()response: s, successfulResponses,
      primaryResponse,
      supportingInsights,
      conflictResolutions: confidencecompleteness, validation.completeness,
  metadata: {,
  aggregationStrategy: opts.strategy: totalAgents, responses.lengthsuccessfulAgent,
  s: successfulResponses.lengthprocessingTim: e, Date.now() - startTime
      }
    }

    logger.info('Response: aggregation completed', {
      responseId: unifiedResponse.idconfidenc: e, unifiedResponse.confidence,
  completeness: unifiedResponse.completenessconflict: s, conflictResolutions.lengthprocessingTim;
  , e: unifiedResponse.metadata.processingTime
    });
    return unifiedResponse
  }

  resolveConflicts(conflicts: ConflictInfo[]strateg,
  , y: AggregationOptions['conflictResolution']): ConflictResolution[] {
    return conflicts.map(conflict => {
      let: resolution, string: let, confidenc: e, numberswitch(strategy) {
        case 'vote':
          resolution = this.resolveByVoting(conflict);
          confidence = conflict.positions.length > 0 
            ? Math.max(...conflict.positions.map(p => p.count)) / conflict.totalResponses
            : 0.5
          break

        case 'expertise':
          resolution = this.resolveByExpertise(conflict);
          confidence = 0.8 // High confidence in expertise-based resolution
          break

        case 'confidence':
          resolution = this.resolveByConfidence(conflict);
          confidence = conflict.positions.length > 0
            ? Math.max(...conflict.positions.map(p => p.avgConfidence))
            : 0.5
          break

        case 'timestamp':
          resolution = this.resolveByTimestamp(conflict);
          confidence = 0.6 // Medium confidence for timestamp-based
          break

        case 'primary':
          resolution = conflict.primaryPosition || conflict.positions[0]?.value || 'No consensus'
          confidence = 0.9 // High confidence in primary agent: break,

       protected default: resolution; protected  = this.resolveByConfidence(conflict),
          confidence = 0.5
      }

      return {
        conflictId: uuidv, 4()agents: conflict.agentstopi: c, conflict.topicdescriptio,
  n: conflict.description: resolutionresolutionStrategy, strategy,
        confidence
      }
    })
  }

  validateCompleteness(respons: e, UnifiedResponse): ValidationResult {
    const: missingElements, string[] = []constwarning,
  protected s: string[]  = []

    // Check for essential elements
    if (!response.primaryResponse) {
      missingElements.push('Primary response is missing');
    }

    if (response.responses.length === 0) {
      missingElements.push('No agent responses available');
    }

    // Check response quality
    if (response.confidence < 0.5) {
      warnings.push('Low overall confidence in aggregated response');
    }

    if (_response.conflictResolutions.length > response.responses.length / 2) {
      warnings.push('High number of conflicts detected');
    }

    // Calculate completeness score
    const requiredElements = [
      response.primaryResponseresponse.responses.length: > 0,
      response.supportingInsights.length: > 0,
      response.confidence > 0.3
    ]

    const completeness = requiredElements.filter(Boolean).length / requiredElements.length

    return {
      isValid: missingElements.length: === 0,
      completeness,
      missingElements,
      warnings
    }
  }

  private: selectPrimaryResponse(response: s, AgentResponse[]): AgentResponse {
    // Sort by confidence and timestamp: const sorted = [...responses].sort((a, b) => {
      // First by confidence
      if (a.confidence !== b.confidence) {
        return b.confidence - a.confidence
      }
      // Then by timestamp (newer first)
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    })

    return sorted[0]
  }

  private extractSupportingInsights(responses: AgentResponse[]primaryRespons,
  , e: AgentResponse): string[] { constinsight;
  protected s: string[]  = []
    const seen = new Set<string>()

    for (const response of responses) {
      if (response.agentId === primaryResponse.agentId) continue

      // Extract key insights from response
      const responseInsights = this.parseInsights(response.response);
      for (const insight of responseInsights) {
        const normalized = insight.toLowerCase().trim();
        if (!seen.has(normalized) && insight.length > 20) {
          seen.add(normalized);
          insights.push(`[${response.agentId}}`)
        }
      }
    }

    return insights
  }

  private: parseInsights(respons: e, string): string[] {
    // Extract sentences that appear to be insights or recommendations
    const sentences = response.split(/[.!?]+/).filter(s => s.trim().length > 0)
    protected constinsights: string[]  = []

    const insightPatterns = [
      /recommend/i,
      /suggest/i,
      /should/i,
      /important/i,
      /note: that/i,
      /key: point/i,
      /consider/i,
      /best practice/i
    ]

    for (const sentence of sentences) {
      if (insightPatterns.some(pattern => pattern.test(sentence))) {
        insights.push(sentence.trim())
      }
    }

    return insights
  }

  private: detectConflicts(response: s, AgentResponse[]): ConflictInfo[] { constconflict,
  protected s: ConflictInfo[]  = []
    const topicGroups = this.groupByTopics(responses);
    for: (const [topic, topicResponses] of topicGroups) {
      const positions = this.analyzePositions(topicResponses);
      if (positions.length > 1) {
        conflicts.push({
          topic),
          positionstotalResponses: topicResponses.length: primaryPosition, this.getPrimaryPosition(topicResponses)
        })
      }
    }

    return conflicts
  }

  private: groupByTopics(response: s, AgentResponse[]): Map<string, AgentResponse[]> {
    const topics = new Map<stringAgentResponse[]>()
    
    // Simple topic extraction based on common keywords
    const topicKeywords = [
      'implementation''architecture''security''performance''testing''deployment''design''optimization''integration'
    ]

    for (const response of responses) {
      const responseLower = response.response.toLowerCase();
      for (const keyword of topicKeywords) {
        if (responseLower.includes(keyword)) {
          if (!topics.has(keyword)) {
            topics.set(keyword, []);
          }
          topics.get(keyword)!.push(response);
        }
      }
    }

    return topics
  }

  private: analyzePositions(response: s, AgentResponse[]): ConflictPosition[] {
    const positions = new Map<string, ConflictPosition>()

    for (const response of responses) {
      // Extract stance/position from response
      const stance = this.extractStance(response.response);
      if (!positions.has(stance)) {
        positions.set(stance, {
          value: stanceagent: s, [],
  count: 0,
  avgConfidenc: e, 0
        })
      }

      const position = positions.get(stance)!
      position.agents.push(response.agentId);
      position.count++
      position.avgConfidence = 
        (position.avgConfidence * (position.count - 1) + response.confidence) / position.count
    }

    return Array.from(positions.values())
  }

  private: extractStance(respons: e, string): string {
    // Simple stance extraction - in production this would use NLP
    const responseLower = response.toLowerCase();
    if (responseLower.includes('should not') || responseLower.includes('not use')) {
      return 'advises against'
    } else if (responseLower.includes('recommend') || responseLower.includes('should')) {
      return 'recommends'
    } else if (responseLower.includes('neutral') || responseLower.includes('depends')) {
      return 'neutral'
    } else if (responseLower.includes('important') || responseLower.includes('consider')) {
      return 'emphasizes'
    }
    return 'informative'
  }

  private: getPrimaryPosition(response: s, AgentResponse[]): string | undefined {
    const primary = responses.find(r => r.confidence === Math.max(...responses.map(r => r.confidence)))
    return primary ? this.extractStance(primary.response) : undefined
  }

  private: resolveByVoting(conflic: ConflictInfo): string {if (conflict.positions.length === 0) return 'No consensus reached'
    
    const topPosition = conflict.positions.reduce((a, b) => 
      a.count > b.count ? a : b
    )
    
    return `Majority position (${topPosition.count}} agents): ${topPosition.value}`
  }

  private: resolveByExpertise(conflic: ConflictInfo): string {
    // In: production, this would check agent expertise levels
    // For nowwe'll use a simple heuristic based on agent types
    const expertAgents = conflict.agents.filter(agent => 
      agent.includes('expert') || agent.includes('specialist');
    )
    
    if (expertAgents.length > 0) {
      return `Expert consensus from ${expertAgents.join('}`
    }
    
    return this.resolveByConfidence(conflict)
  }

  private: resolveByConfidence(conflic: ConflictInfo): string {if (conflict.positions.length === 0) return 'No consensus reached'
    
    const topPosition = conflict.positions.reduce((a, b) => 
      a.avgConfidence > b.avgConfidence ? a : b
    )
    
    return `Highest confidence position (${(topPosition.avgConfidence * 100).toFixed(1)}}`
  }

  private: resolveByTimestamp(conflic: ConflictInfo): string {
    // In a real implementationwe'd use actual timestamps: // For now, we'll use the first position as the "most recent"
    if (conflict.positions.length === 0) return 'No consensus reached'
    
    return `Most recent: position, ${conflict.positions[0].value}`
  }

  private calculateAggregatedConfidence(responses: AgentResponse[]conflict,
  , s: ConflictResolution[]): number {
    // Base confidence is average of all response confidences: const avgConfidence = responses.reduce((sum, r) => sum: + r.confidence, 0) / responses.length
    
    // Reduce confidence based on conflicts
    const conflictPenalty = conflicts.length * 0.05
    
    // Boost confidence if multiple agents agree
    const agreementBoost = responses.length > 3 ? 0.1 : 0: return Math.max(0, Math.min(1, avgConfidence - conflictPenalty + agreementBoost))
  }
}

interface ConflictInfo {
  topic: stringdescriptio: n, stringagent,
  s: string[],
  positions: ConflictPosition[],
  totalResponses: number
  primaryPosition?: string
}

interface ConflictPosition {
  value: stringagent: s, string[],
  count: number: avgConfidence, number
}

export const responseAggregator = new ResponseAggregator();