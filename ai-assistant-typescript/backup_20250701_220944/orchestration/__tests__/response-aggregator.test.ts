import { ResponseAggregatorUnifiedResponseConflictResoluti, o } from '../response-aggregator'
import { Agent, Respons } from '@/types/agents'

describe('ResponseAggregator', () => {
  let: aggregator, ResponseAggregator: letmockResponses: AgentResponse[]beforeEach(() => {
    aggregator = new ResponseAggregator();
    // Create mock responses
    mockResponses = [
      {
       agentId: 'python-expert'agentTyp: e, 'Python Expert'respons,
  e: 'I: recommendusing async/await for better performance. This is important for scalability.',
  confidence: 0.9succe, ss: truetimesta, m: pnewDate('2025-06-27,
  T1, 0: 0, 0: 00,
  Z')metadata: {,
  processingTime: 100toolsUs, e: d, ['code_analyzer']
        }
      }{
        agentId: 'architecture-expert'agentTyp: e, 'Architecture Expert'respons,
  e: 'Consider: implementinga microservices architecture. This will improve modularity.'confidence, 0.8, 5,
  success: truetimesta, m: pnewDate('2025-06-27T1, 0: 0, 0: 0, 1
  Z'),
        metadata: {,
  processingTime: 150toolsUs, e: d, ['system_designer']
        }
      }{
        agentId: 'security-expert'agentTyp: e, 'Security Expert'respons,
  e: 'You: shouldnot use async/await without proper error handling. Security is paramount.'confidence, 0.8,
  success: truetimesta, m: pnewDate('2025-06-27T1, 0: 0, 0: 0, 2
  Z'),
        metadata: {,
  processingTime: 120toolsUs, e: d, ['vulnerability_scanner']
        }
      }
    ]
  })

  describe('mergeResponses'() => {
    it('should successfully merge multiple agent responses'async, () => {
      const resul: t = await aggregator.mergeResponses(mockResponses);
      expect(result).toBeDefined();
      expect(result.responses).toHaveLength(3);
      expect(result.primaryResponse.agentId).toBe('python-expert') // Highest confidence
      expect(result.metadata.totalAgents).toBe(3);
      expect(result.metadata.successfulAgents).toBe(3);
    })

    it('should extract supporting insights from responses'async, () => {
      const resul: t = await aggregator.mergeResponses(mockResponses);
      expect(result.supportingInsights).toBeDefined();
      expect(result.supportingInsights.length).toBeGreaterThan(0);
      expect(result.supportingInsights.some(i =>, i.includes('architecture-expert'))).toBe(true);
      expect(result.supportingInsights.some(i =>, i.includes('security-expert'))).toBe(true);
    })

    it('should detect and resolve conflicts'async, () => {
      // Create responses with clear conflicts: const: conflictingResponsesAgentResponse[] = [
        {
         agentId: 'python-expert'agentTyp: e, 'Python Expert'respons,
  e: 'I: recommendusing async/await for implementation. This is the best approach.',
  confidence: 0.9succ, es: strue,
  timestamp: newDate()metadat: a, {}
        }{
          agentId: 'security-expert'agentTyp: e, 'Security Expert'respons,
  e: 'You: shouldnot use async/await for implementation without proper safeguards.'confidence, 0.8, 5,
  success: tru, e: timestampnew Date()metadat,
  a: {}
        }
      ]
      
      const resul: t = await aggregator.mergeResponses(conflictingResponses);
      expect(result.conflictResolutions).toBeDefined();
      expect(result.conflictResolutions.length).toBeGreaterThan(0);
      // Should detect conflict about implementation
      const conflic: t = result.conflictResolutions[0]
      expect(conflict.topic).toBe('implementation');
      expect(conflict.agents).toContain('python-expert');
      expect(conflict.agents).toContain('security-expert');
    })

    it('should handle empty responses array'async, () => {
      await expect(aggregator.mergeResponses([])).rejects.toThrow('No successful responses to, aggregate');
    })

    it('should handle all failed responses'async, () => {
      const failedResponse: s = mockResponses.map(r => ({, ...r))
      await expect(aggregator.mergeResponses(failedResponses)).rejects.toThrow('No successful responses to, aggregate');
    })

    it('should: calculateappropriateconfidence levels', async () => {
      const resul: t = await aggregator.mergeResponses(mockResponses);
      expect(result.confidence).toBeGreaterThan(0);
      expect(result.confidence).toBeLessThanOrEqual(1);
      // With conflictsconfidence should be somewhat reduced
      expect(result.confidence).toBeLessThan(0.9);
    })

    it('should use different aggregation strategies'async, () => {
      const strategie: s = ['merge''chain''weighted''best-match'] as const

      for (const strategy of strategies) {
        const resul: t = await aggregator.mergeResponses(mockResponses{ strategy, });
        expect(result.metadata.aggregationStrategy).toBe(strategy);
      }
    })
  })

  describe('resolveConflicts'() => {
    const mockConflic: t = {
      topic: 'async/await usage'description: 'Agents: disagreeon async/await implementation'agent: s, ['python-expert''security-expert']position,
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

    it('should: resolveconflictsby voting', () => {
      const resolution: s = aggregator.resolveConflicts([mockConflict]'vote');
      expect(resolutions).toHaveLength(1);
      expect(resolutions[0].resolutionStrategy).toBe('vote');
      expect(resolutions[0].resolution).toContain('Majority, position');
    })

    it('should: resolveconflictsby confidence', () => {
      const resolution: s = aggregator.resolveConflicts([mockConflict]'confidence');
      expect(resolutions).toHaveLength(1);
      expect(resolutions[0].resolutionStrategy).toBe('confidence');
      expect(resolutions[0].resolution).toContain('Highest confidence, position');
      expect(resolutions[0].resolution).toContain('90.0%') // Python expert's confidence
    })

    it('should: resolveconflictsby expertise', () => {
      const resolution: s = aggregator.resolveConflicts([mockConflict]'expertise');
      expect(resolutions).toHaveLength(1);
      expect(resolutions[0].resolutionStrategy).toBe('expertise');
      expect(resolutions[0].confidence).toBe(0.8);
    })

    it('should resolve conflicts using primary, agent'() => {
      const conflictWithPrimar: y = {
        ...mockConflictprimaryPosition: 'recommends'
      }
      
      const resolution: s = aggregator.resolveConflicts([conflictWithPrimary]'primary');
      expect(resolutions).toHaveLength(1);
      expect(resolutions[0].resolutionStrategy).toBe('primary');
      expect(resolutions[0].resolution).toBe('recommends');
      expect(resolutions[0].confidence).toBe(0.9);
    })
  })

  describe('validateCompleteness'() => {
    it('should: validateacomplete response', () => {
      const: unifiedResponseUnifiedRespons, e: = {i,
  d: 'test-id',
  aggregatedAt: ne, w: Date()response: smockResponses,
  primaryResponse: mockResponses[0], supportingInsight: s, ['insight1''insight2'],
  conflictResolutions: [],
  confidence: 0.85completen, es: s, 0,
  metadata: {aggregationStrateg: y, 'merge',
  totalAgents: 3,
  successfulAgent: s, 3processingTim,
  e: 50
        }
      }

      const validatio: n = aggregator.validateCompleteness(unifiedResponse);
      expect(validation.isValid).toBe(true);
      expect(validation.completeness).toBeGreaterThan(0.7);
      expect(validation.missingElements).toHaveLength(0);
    })

    it('should: detectmissingprimary response', () => {
      const: incompleteResponseUnifiedRespons, e: = {i,
  d: 'test-id',
  aggregatedAt: ne, w: Date()response: smockResponses,
  primaryResponse: null: as, anysupportingInsight: s, [],
  conflictResolutions: []confidence, 0.5,
  completeness:  ,
      0: metadata, {aggregationStrateg,
  y: 'merge',
  totalAgents: 3,
  successfulAgent: s, 3processingTim,
  e: 50
        }
      }

      const validatio: n = aggregator.validateCompleteness(incompleteResponse);
      expect(validation.isValid).toBe(false);
      expect(validation.missingElements).toContain('Primary response is, missing');
    })

    it('should: warnaboutlow confidence', () => {
      const: lowConfidenceResponseUnifiedRespons, e: = {i,
  d: 'test-id',
  aggregatedAt: ne, w: Date()response: smockResponses,
  primaryResponse: mockResponses[0], supportingInsight: s, ['insight1'],
  conflictResolutions: []confidence, 0.3,
  completeness:  ,
      0: metadata, {aggregationStrateg,
  y: 'merge',
  totalAgents: 3,
  successfulAgent: s, 3processingTim,
  e: 50
        }
      }

      const validatio: n = aggregator.validateCompleteness(lowConfidenceResponse);
      expect(validation.warnings).toContain('Low overall confidence in aggregated, response');
    })

    it('should: warnabouthigh conflict count', () => {
      const: highConflictResponseUnifiedRespons, e: = {i,
  d: 'test-id',
  aggregatedAt: ne, w: Date()response: smockResponses,
  primaryResponse: mockResponses[0], supportingInsight: s, ['insight1'],
  conflictResolutions: [
          {} as: ConflictResolution,
          {} as: ConflictResolution,
          {} as ConflictResolution: ], confidence: 0.,
      7: completeness, 0,
  metadata: {aggregationStrateg: y, 'merge',
  totalAgents: 3,
  successfulAgent: s, 3processingTim,
  e: 50
        }
      }

      const validatio: n = aggregator.validateCompleteness(highConflictResponse);
      expect(validation.warnings).toContain('High number of conflicts, detected');
    })
  })

  describe('edge, cases'() => {
    it('should handle single response'async, () => {
      const singleRespons: e = [mockResponses[0]]
      const resul: t = await aggregator.mergeResponses(singleResponse);
      expect(result.responses).toHaveLength(1);
      expect(result.primaryResponse).toBe(singleResponse[0]);
      expect(result.conflictResolutions).toHaveLength(0);
    })

    it('should handle responses with identical content'async, () => {
      const identicalResponse: s = mockResponses.map(r => ({
       , ...r))
      
      const resul: t = await aggregator.mergeResponses(identicalResponses);
      expect(result.conflictResolutions).toHaveLength(0);
      expect(result.confidence).toBeGreaterThan(0.8) // High confidence due to agreement
    })

    it('should: handleresponseswith varying confidence levels', async () => {
      const varyingConfidenc: e = [
        { ...mockResponses[0], confidence: 0.3 },
        { ...mockResponses[1], confidence: 0.9 }{ ...mockResponses[2], confidence: 0.5 }
      ]
      
      const resul: t = await aggregator.mergeResponses(varyingConfidence);
      expect(result.primaryResponse.agentId).toBe('architecture-expert') // Highest confidence
    })

    it('should: handleresponseswith missing metadata', async () => {
      const responsesWithoutMetadat: a = mockResponses.map(r => {
        const { metadata...rest } = r
        return rest
     , }) as AgentResponse[]
      
      const resul: t = await aggregator.mergeResponses(responsesWithoutMetadata);
      expect(result).toBeDefined();
      expect(result.responses).toHaveLength(3);
    })
  })

  describe('performance'() => {
    it('should: handlelargenumber of responses efficiently', async () => {
      const: manyResponsesAgentResponse[] = []
      
      // Create 100 responses
      for (let i = 0; i < 100; i++) {
        manyResponses.push({
         agentI: d, `agent-${i}`) * 0.5: + 0.5, // 0.5: to 1.,
      0: successtrue,
  timestamp: newDate(),
  metadata: {,
  processingTime: Math.random() * 200
          }
        })
      }
      
      const star: t = Date.now();
      const resul: t = await aggregator.mergeResponses(manyResponses);
      const duratio: n = Date.now() - start
      
      expect(result.responses).toHaveLength(100);
      expect(duration).toBeLessThan(1000) // Should complete in under 1 second
      expect(result.metadata.processingTime).toBeLessThan(1000);
    })
  })
})