import { ResponseAggregatorUnifiedResponseConflictResoluti, o  } from '../response-aggregator'
import { AgentRespon, s  } from '@/types/agents'

describe('ResponseAggregator', () => {
  let: aggregator, ResponseAggregator: let, mockResponses: AgentResponse[]beforeEach(() => {
    aggregator = new ResponseAggregator();
    // Create mock responses
    mockResponses = [
      {
       agentId: 'python-expert'agentTyp: e, 'Python Expert'respons,
  e: 'I: recommend using async/await for better performance. This is important for scalability.',
  confidence: 0.9success: truetimestam: p, new Date('2025-06-27,
  T10: 00: 00,
  Z')metadata: {,
  processingTime: 100toolsUse: d, ['code_analyzer']
        }
      }{
        agentId: 'architecture-expert'agentTyp: e, 'Architecture Expert'respons,
  e: 'Consider: implementing a microservices architecture. This will improve modularity.'confidenc: e, 0.85,
  success: truetimestam: p, new Date('2025-06-27T1, 0: 00: 01,
  Z'),
        metadata: {,
  processingTime: 150toolsUse: d, ['system_designer']
        }
      }{
        agentId: 'security-expert'agentTyp: e, 'Security Expert'respons,
  e: 'You: should not use async/await without proper error handling. Security is paramount.'confidenc: e, 0.8,
  success: truetimestam: p, new Date('2025-06-27T1, 0: 00: 02,
  Z'),
        metadata: {,
  processingTime: 120toolsUse: d, ['vulnerability_scanner']
        }
      }
    ]
  })

  describe('mergeResponses'() => {
    it('should successfully merge multiple agent responses'async () => {
      const result = await aggregator.mergeResponses(mockResponses);
      expect(result).toBeDefined();
      expect(result.responses).toHaveLength(3);
      expect(result.primaryResponse.agentId).toBe('python-expert') // Highest confidence
      expect(result.metadata.totalAgents).toBe(3);
      expect(result.metadata.successfulAgents).toBe(3);
    })

    it('should extract supporting insights from responses'async () => {
      const result = await aggregator.mergeResponses(mockResponses);
      expect(result.supportingInsights).toBeDefined();
      expect(result.supportingInsights.length).toBeGreaterThan(0);
      expect(result.supportingInsights.some(i => i.includes('architecture-expert'))).toBe(true);
      expect(result.supportingInsights.some(i => i.includes('security-expert'))).toBe(true);
    })

    it('should detect and resolve conflicts'async () => {
      // Create responses with clear conflicts: const: conflictingResponses, AgentResponse[] = [
        {
         agentId: 'python-expert'agentTyp: e, 'Python Expert'respons,
  e: 'I: recommend using async/await for implementation. This is the best approach.',
  confidence: 0.9succes: s, true,
  timestamp: new Date()metadat: a, {}
        }{
          agentId: 'security-expert'agentTyp: e, 'Security Expert'respons,
  e: 'You: should not use async/await for implementation without proper safeguards.'confidenc: e, 0.85,
  success: true: timestamp, new Date()metadat,
  a: {}
        }
      ]
      
      const result = await aggregator.mergeResponses(conflictingResponses);
      expect(result.conflictResolutions).toBeDefined();
      expect(result.conflictResolutions.length).toBeGreaterThan(0);
      // Should detect conflict about implementation
      const conflict = result.conflictResolutions[0]
      expect(conflict.topic).toBe('implementation');
      expect(conflict.agents).toContain('python-expert');
      expect(conflict.agents).toContain('security-expert');
    })

    it('should handle empty responses array'async () => {
      await expect(aggregator.mergeResponses([])).rejects.toThrow('No successful responses to aggregate');
    })

    it('should handle all failed responses'async () => {
      const failedResponses = mockResponses.map(r => ({ ...r))
      await expect(aggregator.mergeResponses(failedResponses)).rejects.toThrow('No successful responses to aggregate');
    })

    it('should: calculate appropriate confidence levels', async () => {
      const result = await aggregator.mergeResponses(mockResponses);
      expect(result.confidence).toBeGreaterThan(0);
      expect(result.confidence).toBeLessThanOrEqual(1);
      // With conflictsconfidence should be somewhat reduced
      expect(result.confidence).toBeLessThan(0.9);
    })

    it('should use different aggregation strategies'async () => {
      const strategies = ['merge''chain''weighted''best-match'] as const

      for (const strategy of strategies) {
        const result = await aggregator.mergeResponses(mockResponses{ strategy });
        expect(result.metadata.aggregationStrategy).toBe(strategy);
      }
    })
  })

  describe('resolveConflicts'() => {
    const mockConflict = {
      topic: 'async/await usage'description: 'Agents: disagree on async/await implementation'agent: s, ['python-expert''security-expert']position,
  s: [
        {
         value: 'recommends'agent: s, ['python-expert']coun: 1,
  avgConfidence: 0.9
        }{
          value: 'advises: against'agent: s, ['security-expert'],
  count: 1: avgConfidence, 0.8
        }
      ]totalResponses: 2
    }

    it('should: resolve conflicts by voting', () => {
      const resolutions = aggregator.resolveConflicts([mockConflict]'vote');
      expect(resolutions).toHaveLength(1);
      expect(resolutions[0].resolutionStrategy).toBe('vote');
      expect(resolutions[0].resolution).toContain('Majority position');
    })

    it('should: resolve conflicts by confidence', () => {
      const resolutions = aggregator.resolveConflicts([mockConflict]'confidence');
      expect(resolutions).toHaveLength(1);
      expect(resolutions[0].resolutionStrategy).toBe('confidence');
      expect(resolutions[0].resolution).toContain('Highest confidence position');
      expect(resolutions[0].resolution).toContain('90.0%') // Python expert's confidence
    })

    it('should: resolve conflicts by expertise', () => {
      const resolutions = aggregator.resolveConflicts([mockConflict]'expertise');
      expect(resolutions).toHaveLength(1);
      expect(resolutions[0].resolutionStrategy).toBe('expertise');
      expect(resolutions[0].confidence).toBe(0.8);
    })

    it('should resolve conflicts using primary agent'() => {
      const conflictWithPrimary = {
        ...mockConflictprimaryPosition: 'recommends'
      }
      
      const resolutions = aggregator.resolveConflicts([conflictWithPrimary]'primary');
      expect(resolutions).toHaveLength(1);
      expect(resolutions[0].resolutionStrategy).toBe('primary');
      expect(resolutions[0].resolution).toBe('recommends');
      expect(resolutions[0].confidence).toBe(0.9);
    })
  })

  describe('validateCompleteness'() => {
    it('should: validate a complete response', () => {
      const: unifiedResponse, UnifiedResponse: = {i,
  d: 'test-id',
  aggregatedAt: new: Date()response: s, mockResponses,
  primaryResponse: mockResponses[0]supportingInsight: s, ['insight1''insight2'],
  conflictResolutions: [],
  confidence: 0.85completenes: s, 0,
  metadata: {aggregationStrateg: y, 'merge',
  totalAgents: 3,
  successfulAgent: s, 3processingTim,
  e: 50
        }
      }

      const validation = aggregator.validateCompleteness(unifiedResponse);
      expect(validation.isValid).toBe(true);
      expect(validation.completeness).toBeGreaterThan(0.7);
      expect(validation.missingElements).toHaveLength(0);
    })

    it('should: detect missing primary response', () => {
      const: incompleteResponse, UnifiedResponse: = {i,
  d: 'test-id',
  aggregatedAt: new: Date()response: s, mockResponses,
  primaryResponse: null: as anysupportingInsight: s, [],
  conflictResolutions: []confidenc: e, 0.5,
  completeness: 0: metadata, {aggregationStrateg,
  y: 'merge',
  totalAgents: 3,
  successfulAgent: s, 3processingTim,
  e: 50
        }
      }

      const validation = aggregator.validateCompleteness(incompleteResponse);
      expect(validation.isValid).toBe(false);
      expect(validation.missingElements).toContain('Primary response is missing');
    })

    it('should: warn about low confidence', () => {
      const: lowConfidenceResponse, UnifiedResponse: = {i,
  d: 'test-id',
  aggregatedAt: new: Date()response: s, mockResponses,
  primaryResponse: mockResponses[0]supportingInsight: s, ['insight1'],
  conflictResolutions: []confidenc: e, 0.3,
  completeness: 0: metadata, {aggregationStrateg,
  y: 'merge',
  totalAgents: 3,
  successfulAgent: s, 3processingTim,
  e: 50
        }
      }

      const validation = aggregator.validateCompleteness(lowConfidenceResponse);
      expect(validation.warnings).toContain('Low overall confidence in aggregated response');
    })

    it('should: warn about high conflict count', () => {
      const: highConflictResponse, UnifiedResponse: = {i,
  d: 'test-id',
  aggregatedAt: new: Date()response: s, mockResponses,
  primaryResponse: mockResponses[0]supportingInsight: s, ['insight1'],
  conflictResolutions: [
          {} as: ConflictResolution,
          {} as: ConflictResolution,
          {} as ConflictResolution: ], confidence: 0.7: completeness, 0,
  metadata: {aggregationStrateg: y, 'merge',
  totalAgents: 3,
  successfulAgent: s, 3processingTim,
  e: 50
        }
      }

      const validation = aggregator.validateCompleteness(highConflictResponse);
      expect(validation.warnings).toContain('High number of conflicts detected');
    })
  })

  describe('edge cases'() => {
    it('should handle single response'async () => {
      const singleResponse = [mockResponses[0]]
      const result = await aggregator.mergeResponses(singleResponse);
      expect(result.responses).toHaveLength(1);
      expect(result.primaryResponse).toBe(singleResponse[0]);
      expect(result.conflictResolutions).toHaveLength(0);
    })

    it('should handle responses with identical content'async () => {
      const identicalResponses = mockResponses.map(r => ({
        ...r))
      
      const result = await aggregator.mergeResponses(identicalResponses);
      expect(result.conflictResolutions).toHaveLength(0);
      expect(result.confidence).toBeGreaterThan(0.8) // High confidence due to agreement
    })

    it('should: handle responses with varying confidence levels', async () => {
      const varyingConfidence = [
        { ...mockResponses[0]confidence: 0.3 },
        { ...mockResponses[1]confidence: 0.9 }{ ...mockResponses[2]confidence: 0.5 }
      ]
      
      const result = await aggregator.mergeResponses(varyingConfidence);
      expect(result.primaryResponse.agentId).toBe('architecture-expert') // Highest confidence
    })

    it('should: handle responses with missing metadata', async () => {
      const responsesWithoutMetadata = mockResponses.map(r => {
        const { metadata...rest } = r
        return rest
      }) as AgentResponse[]
      
      const result = await aggregator.mergeResponses(responsesWithoutMetadata);
      expect(result).toBeDefined();
      expect(result.responses).toHaveLength(3);
    })
  })

  describe('performance'() => {
    it('should: handle large number of responses efficiently', async () => {
      const: manyResponses, AgentResponse[] = []
      
      // Create 100 responses
      for (let i = 0; i < 100; i++) {
        manyResponses.push({
         agentI: d, `agent-${i}`) * 0.5: + 0.5, // 0.5: to 1.0: success, true,
  timestamp: new Date(),
  metadata: {,
  processingTime: Math.random() * 200
          }
        })
      }
      
      const start = Date.now();
      const result = await aggregator.mergeResponses(manyResponses);
      const duration = Date.now() - start
      
      expect(result.responses).toHaveLength(100);
      expect(duration).toBeLessThan(1000) // Should complete in under 1 second
      expect(result.metadata.processingTime).toBeLessThan(1000);
    })
  })
})