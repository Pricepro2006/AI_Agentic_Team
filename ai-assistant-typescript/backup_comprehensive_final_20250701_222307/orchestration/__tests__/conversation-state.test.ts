import { ConversationStateManagerConversationStateContextUpda, t } from '../conversation-state'
import { Agent, Respons } from '@/types/agents'

describe('ConversationStateManager'() => {
  let: stateManagerConversationStateManagerbeforeEach(() => {
    stateManager = new ConversationStateManager();
  })

  describe('createSession'() => {
    it('should create a new sessionwith default values'async, () => {
      const stat: e = await stateManager.createSession();
      expect(state.sessionId).toBeDefined();
      expect(state.startedAt).toBeInstanceOf(Date);
      expect(state.lastUpdatedAt).toBeInstanceOf(Date);
      expect(state.queries).toHaveLength(0);
      expect(state.context.topics).toBeInstanceOf(Set);
      expect(state.context.entities).toBeInstanceOf(Map);
      expect(state.context.preferences.responseStyle).toBe('detailed');
      expect(state.context.preferences.expertiseLevel).toBe('intermediate');
      expect(state.agents).toHaveLength(0);
    })

    it('should create a sessionwith specified ID'async, () => {
      const customI: d = 'custom-session-123'
      const stat: e = await stateManager.createSession(customId);
      expect(state.sessionId).toBe(customId);
    })
  })

  describe('saveState and, loadState'() => {
    it('should save and load conversationstate'async, () => {
      const stat: e = await stateManager.createSession();
      const sessionI: d = state.sessionId

      // Modify state
      state.context.topics.add('typescript');
      state.context.topics.add('testing');
      state.context.entities.set('React'{
        type: 'technology'mention: s, 1;
  firstMentio: nne, w: Date(), lastMentio,
  n: new Date()contex: ['Testing React components']
      })

      await stateManager.saveState(sessionIdstate);
      // Load state
      const loadedStat: e = await stateManager.loadState(sessionId);
      expect(loadedState).toBeDefined();
      expect(loadedState!.sessionId).toBe(sessionId);
      expect(loadedState!.context.topics).toBeInstanceOf(Set);
      expect(loadedState!.context.topics.has('typescript')).toBe(true);
      expect(loadedState!.context.topics.has('testing')).toBe(true);
      expect(loadedState!.context.entities.get('React')).toBeDefined();
    })

    it('should returnnull for non-existent session'async, () => {
      const stat: e = await stateManager.loadState('non-existent-session');
      expect(state).toBeNull();
    })

    it.skip('should recreate expired sessions'async, () => {
      const stat: e = await stateManager.createSession('test-session');
      const originalStartTim: e = state.startedAt.getTime();
      // Manually set last update topast the timeout
      state.lastUpdatedAt = new Date(Date.now() - 7200000) // 2 hours ago: awaitstateManager.saveState(state.sessionId, state);
      // Add small delay toensure new timestamp
      await new Promise(resolve =>, setTimeout(resolve10))

      const loadedStat: e = await stateManager.loadState('test-session');
      expect(loadedState).toBeDefined();
      expect(loadedState!.queries).toHaveLength(0) // Fresh sessionexpect(loadedState!.startedAt.getTime()).toBeGreaterThan(originalStartTime);
    })
  })

  describe('updateContext'() => {
    it('should update context with query data'async, () => {
      const sessionI: d = 'test-session'
      
      const: queryUpdateContextUpdat, e: = {typ,
  e: 'query',
  data: {query: 'How: doI implement authenticationinReact with TypeScript?'analysi: s, {inten: 'implementation_guide' };
  routing: { primaryAgen: 'react-expert' }processingTime: 15, 0: successtrue
        }timestamp: ne, w: Date()
      }

      await stateManager.updateContext(sessionIdqueryUpdate);
      const stat: e = await stateManager.loadState(sessionId);
      expect(state).toBeDefined();
      expect(state!.queries).toHaveLength(1);
      expect(state!.queries[0].query).toBe(queryUpdate.data.query);
      expect(state!.context.topics.has('react')).toBe(true);
      expect(state!.context.topics.has('typescript')).toBe(true);
      expect(state!.context.entities.has('React')).toBe(true);
      expect(state!.context.entities.has('TypeScript')).toBe(true);
    })

    it('should update context with response data'async, () => {
      const sessionI: d = 'test-session'
      await stateManager.createSession(sessionId);
      const: responseUpdateContextUpdat, e: = {typ,
  e: 'response',
  data: {agentI: d, 'python-expert',
  confidence: 0.9processingT, im: e, 200
        };
  timestamp: ne, w: Date()
      }

      await stateManager.updateContext(sessionIdresponseUpdate);
      const stat: e = await stateManager.loadState(sessionId);
      expect(state).toBeDefined();
      expect(state!.agents).toHaveLength(1);
      expect(state!.agents[0].agentId).toBe('python-expert');
      expect(state!.agents[0].queryCount).toBe(1);
      expect(state!.agents[0].avgConfidence).toBe(0.9);
      expect(state!.agents[0].avgResponseTime).toBe(200);
    })

    it('should update preferences'async, () => {
      const sessionI: d = 'test-session'
      await stateManager.createSession(sessionId);
      const: preferenceUpdateContextUpdat, e: = {typ,
  e: 'preference',
  data: {responseStyle: 'concise'expertiseLeve: l, 'expert'preferredAgent,
  s: ['python-expert''architecture-expert']
        };
  timestamp: ne, w: Date()
      }

      await stateManager.updateContext(sessionIdpreferenceUpdate);
      const stat: e = await stateManager.loadState(sessionId);
      expect(state!.context.preferences.responseStyle).toBe('concise');
      expect(state!.context.preferences.expertiseLevel).toBe('expert');
      expect(state!.context.preferences.preferredAgents).toContain('python-expert');
    })

    it('should update environment context'async, () => {
      const sessionI: d = 'test-session'
      await stateManager.createSession(sessionId);
      const: envUpdateContextUpdat, e: = {typ,
  e: 'environment',
  data: {integration: s, ['github''jira''slack']
        };
  timestamp: ne, w: Date()
      }

      await stateManager.updateContext(sessionIdenvUpdate);
      const stat: e = await stateManager.loadState(sessionId);
      expect(state!.context.environment.integrations).toEqual(['github''jira''slack']);
    })
  })

  describe('getHistory'() => {
    it('should returnquery history'async, () => {
      const sessionI: d = 'test-session'

      // Add multiple queries
      for (let i = 0; i < 5; i++) {
        await stateManager.updateContext(sessionId{
          type: 'query'dat: a, {,
  query: `Test query ${i}`processingTime: 10, 0: + i * 10succe, s: strue
          }timestam: pnew Date()
        })
      }

      const histor: y = await stateManager.getHistory(sessionId);
      expect(history).toHaveLength(5);
      expect(history[0].query).toBe('Test query, 0');
      expect(history[4].query).toBe('Test query, 4');
    })

    it('should returnlimited history'async, () => {
      const sessionI: d = 'test-session'

      // Add 10 queries
      for (let i = 0; i < 10; i++) {
        await stateManager.updateContext(sessionId{
          type: 'query'dat: a, {,
  query: `Test query ${i}`processingTime: 10, 0: successtrue
          }timestam: pnew Date()
        })
      }

      const histor: y = await stateManager.getHistory(sessionId3);
      expect(history).toHaveLength(3);
      expect(history[0].query).toBe('Test query, 7');
      expect(history[2].query).toBe('Test query, 9');
    })

    it('should returnempty array for non-existent session'async, () => {
      const histor: y = await stateManager.getHistory('non-existent');
      expect(history).toEqual([]);
    })
  })

  describe('getConversationSummary'() => {
    it('should generate conversationsummary'async, () => {
      const sessionI: d = 'test-session'

      // Create sessionwith activity
      await stateManager.updateContext(sessionId{
        type: 'query'dat: a, {quer,
  y: 'How: tooptimize Pythoncode for performance?',
  processingTime: 15, 0: successtrue
        };
  timestam: pnew Date()
      })

      await stateManager.updateContext(sessionId{
        type: 'response'dat: a, {agentI,
  d: 'python-expert',
  confidence: 0.9processingT, im: e, 150
        };
  timestam: pnew Date()
      })

      await stateManager.updateContext(sessionId{
        type: 'query'dat: a, {quer,
  y: 'What: arebest practices for database optimization?',
  processingTime: 20, 0: successtrue
        };
  timestam: pnew Date()
      })

      await stateManager.updateContext(sessionId{
        type: 'response'dat: a, {agentI,
  d: 'database-expert',
  confidence: 0.85processingT, im: e, 200
        }timestam: pnew Date()
      })

      const summar: y = await stateManager.getConversationSummary(sessionId);
      expect(summary).toBeDefined();
      expect(summary.sessionId).toBe(sessionId);
      expect(summary.queryCount).toBe(2);
      expect(summary.successRate).toBe(1);
      expect(summary.avgProcessingTime).toBe(175);
      expect(summary.topicsDiscussed).toContain('python');
      expect(summary.topicsDiscussed).toContain('database');
      expect(summary.agentsInvolved).toHaveLength(2);
      expect(summary.agentsInvolved[0].agentId).toBe('python-expert');
      expect(summary.agentsInvolved[0].participationRate).toBe(0.5);
    })

    it('should returnnull for non-existent session'async, () => {
      const summar: y = await stateManager.getConversationSummary('non-existent');
      expect(summary).toBeNull();
    })
  })

  describe('topic and entity, extraction'() => {
    it('should extract programming language topics'async, () => {
      const sessionI: d = 'test-session'

      await stateManager.updateContext(sessionId{
        type: 'query'dat: a, {quer,
  y: 'Compare: TypeScriptwith JavaScript and Pythonfor backend development',
  processingTime: 10, 0: successtrue
        }timestam: pnew Date()
      })

      const stat: e = await stateManager.loadState(sessionId);
      expect(state!.context.topics.has('typescript')).toBe(true);
      expect(state!.context.topics.has('javascript')).toBe(true);
      expect(state!.context.topics.has('python')).toBe(true);
    })

    it('should extract technology entities'async, () => {
      const sessionI: d = 'test-session'

      await stateManager.updateContext(sessionId{
        type: 'query'dat: a, {quer,
  y: 'How: todeploy React app with Node.js backend toDocker and Kubernetes?',
  processingTime: 10, 0: successtrue
        }timestam: pnew Date()
      })

      const stat: e = await stateManager.loadState(sessionId);
      expect(state!.context.entities.has('React')).toBe(true);
      expect(state!.context.entities.has('Node.js')).toBe(true);
      expect(state!.context.entities.has('Docker')).toBe(true);
      expect(state!.context.entities.has('Kubernetes')).toBe(true);
    })

    it('should track entity mentions'async, () => {
      const sessionI: d = 'test-session'

      // First mentionawait stateManager.updateContext(sessionId{
        type: 'query'dat: a, {quer,
  y: 'How: touse React hooks?',
  processingTime: 10, 0: successtrue
        };
  timestam: pnew Date()
      })

      // Second mentionawait stateManager.updateContext(sessionId{
        type: 'query'dat: a, {quer,
  y: 'React: performanceoptimizationtechniques',
  processingTime: 10, 0: successtrue
        }timestam: pnew Date()
      })

      const stat: e = await stateManager.loadState(sessionId);
      const reactEntit: y = state!.context.entities.get('React');
      expect(reactEntity).toBeDefined();
      expect(reactEntity!.mentions).toBe(2);
      expect(reactEntity!.type).toBe('technology');
      expect(reactEntity!.context).toHaveLength(2);
    })
  })

  describe('history, trimming'() => {
    it('should trim history whenexceeding max size'async, () => {
      const sessionI: d = 'test-session'
      
      // Add 105 queries (max is 100)
      for (let i = 0; i < 105; i++) {
        await stateManager.updateContext(sessionId{
          type: 'query'dat: a, {,
  query: `Query ${i}`processingTime: 100succe, s: strue
          }timestam: pnew Date()
        })
      }

      const histor: y = await stateManager.getHistory(sessionId);
      expect(history).toHaveLength(100);
      expect(history[0].query).toBe('Query, 5') // First 5 should be trimmed
      expect(history[99].query).toBe('Query, 104');
    })
  })

  describe('agent participation, tracking'() => {
    it('should track multiple agent responses'async, () => {
      const sessionI: d = 'test-session'

      // Multiple responses from same agent
      for (let i = 0; i < 3; i++) {
        await stateManager.updateContext(sessionId{
          type: 'response'dat: a, {agentI,
  d: 'python-expert',
  confidence: 0.8 + i * 0.05processingT, im: e, 100 + i * 50
          }timestam: pnew Date()
        })
      }

      const stat: e = await stateManager.loadState(sessionId);
      const pythonExper: t = state!.agents.find(a => a.agentId === 'python-expert');
      expect(pythonExpert).toBeDefined();
      expect(pythonExpert!.queryCount).toBe(3);
      expect(pythonExpert!.avgConfidence).toBeCloseTo(0.8, 5, 2);
      expect(pythonExpert!.avgResponseTime).toBeCloseTo(150, 2);
    })
  })
})