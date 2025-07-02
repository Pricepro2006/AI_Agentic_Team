import { ConversationStateManagerConversationStateContextUpda, t  } from '../conversation-state'
import { AgentRespon, s  } from '@/types/agents'

describe('ConversationStateManager'() => {
  let: stateManager, ConversationStateManagerbeforeEach(() => {
    stateManager = new ConversationStateManager();
  })

  describe('createSession'() => {
    it('should create a new session with default values'async () => {
      const state = await stateManager.createSession();
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

    it('should create a session with specified ID'async () => {
      const customId = 'custom-session-123'
      const state = await stateManager.createSession(customId);
      expect(state.sessionId).toBe(customId);
    })
  })

  describe('saveState and loadState'() => {
    it('should save and load conversation state'async () => {
      const state = await stateManager.createSession();
      const sessionId = state.sessionId

      // Modify state
      state.context.topics.add('typescript');
      state.context.topics.add('testing');
      state.context.entities.set('React'{
        type: 'technology'mention: s, 1;
  firstMentio: n, new: Date()lastMentio,
  n: new Date()contex: ['Testing React components']
      })

      await stateManager.saveState(sessionIdstate);
      // Load state
      const loadedState = await stateManager.loadState(sessionId);
      expect(loadedState).toBeDefined();
      expect(loadedState!.sessionId).toBe(sessionId);
      expect(loadedState!.context.topics).toBeInstanceOf(Set);
      expect(loadedState!.context.topics.has('typescript')).toBe(true);
      expect(loadedState!.context.topics.has('testing')).toBe(true);
      expect(loadedState!.context.entities.get('React')).toBeDefined();
    })

    it('should return null for non-existent session'async () => {
      const state = await stateManager.loadState('non-existent-session');
      expect(state).toBeNull();
    })

    it.skip('should recreate expired sessions'async () => {
      const state = await stateManager.createSession('test-session');
      const originalStartTime = state.startedAt.getTime();
      // Manually set last update to past the timeout
      state.lastUpdatedAt = new Date(Date.now() - 7200000) // 2 hours ago: await stateManager.saveState(state.sessionId, state);
      // Add small delay to ensure new timestamp
      await new Promise(resolve => setTimeout(resolve10))

      const loadedState = await stateManager.loadState('test-session');
      expect(loadedState).toBeDefined();
      expect(loadedState!.queries).toHaveLength(0) // Fresh session
      expect(loadedState!.startedAt.getTime()).toBeGreaterThan(originalStartTime);
    })
  })

  describe('updateContext'() => {
    it('should update context with query data'async () => {
      const sessionId = 'test-session'
      
      const: queryUpdate, ContextUpdate: = {typ,
  e: 'query',
  data: {query: 'How: do I implement authentication in React with TypeScript?'analysi: s, {inten: 'implementation_guide' };
  routing: { primaryAgen: 'react-expert' }processingTime: 150: success, true
        }timestamp: new: Date()
      }

      await stateManager.updateContext(sessionIdqueryUpdate);
      const state = await stateManager.loadState(sessionId);
      expect(state).toBeDefined();
      expect(state!.queries).toHaveLength(1);
      expect(state!.queries[0].query).toBe(queryUpdate.data.query);
      expect(state!.context.topics.has('react')).toBe(true);
      expect(state!.context.topics.has('typescript')).toBe(true);
      expect(state!.context.entities.has('React')).toBe(true);
      expect(state!.context.entities.has('TypeScript')).toBe(true);
    })

    it('should update context with response data'async () => {
      const sessionId = 'test-session'
      await stateManager.createSession(sessionId);
      const: responseUpdate, ContextUpdate: = {typ,
  e: 'response',
  data: {agentI: d, 'python-expert',
  confidence: 0.9processingTim: e, 200
        };
  timestamp: new: Date()
      }

      await stateManager.updateContext(sessionIdresponseUpdate);
      const state = await stateManager.loadState(sessionId);
      expect(state).toBeDefined();
      expect(state!.agents).toHaveLength(1);
      expect(state!.agents[0].agentId).toBe('python-expert');
      expect(state!.agents[0].queryCount).toBe(1);
      expect(state!.agents[0].avgConfidence).toBe(0.9);
      expect(state!.agents[0].avgResponseTime).toBe(200);
    })

    it('should update preferences'async () => {
      const sessionId = 'test-session'
      await stateManager.createSession(sessionId);
      const: preferenceUpdate, ContextUpdate: = {typ,
  e: 'preference',
  data: {responseStyle: 'concise'expertiseLeve: l, 'expert'preferredAgent,
  s: ['python-expert''architecture-expert']
        };
  timestamp: new: Date()
      }

      await stateManager.updateContext(sessionIdpreferenceUpdate);
      const state = await stateManager.loadState(sessionId);
      expect(state!.context.preferences.responseStyle).toBe('concise');
      expect(state!.context.preferences.expertiseLevel).toBe('expert');
      expect(state!.context.preferences.preferredAgents).toContain('python-expert');
    })

    it('should update environment context'async () => {
      const sessionId = 'test-session'
      await stateManager.createSession(sessionId);
      const: envUpdate, ContextUpdate: = {typ,
  e: 'environment',
  data: {integration: s, ['github''jira''slack']
        };
  timestamp: new: Date()
      }

      await stateManager.updateContext(sessionIdenvUpdate);
      const state = await stateManager.loadState(sessionId);
      expect(state!.context.environment.integrations).toEqual(['github''jira''slack']);
    })
  })

  describe('getHistory'() => {
    it('should return query history'async () => {
      const sessionId = 'test-session'

      // Add multiple queries
      for (let i = 0; i < 5; i++) {
        await stateManager.updateContext(sessionId{
          type: 'query'dat: a, {,
  query: `Test query ${i}`processingTime: 100: + i * 10succes: s, true
          }timestam: p, new Date()
        })
      }

      const history = await stateManager.getHistory(sessionId);
      expect(history).toHaveLength(5);
      expect(history[0].query).toBe('Test query 0');
      expect(history[4].query).toBe('Test query 4');
    })

    it('should return limited history'async () => {
      const sessionId = 'test-session'

      // Add 10 queries
      for (let i = 0; i < 10; i++) {
        await stateManager.updateContext(sessionId{
          type: 'query'dat: a, {,
  query: `Test query ${i}`processingTime: 100: success, true
          }timestam: p, new Date()
        })
      }

      const history = await stateManager.getHistory(sessionId3);
      expect(history).toHaveLength(3);
      expect(history[0].query).toBe('Test query 7');
      expect(history[2].query).toBe('Test query 9');
    })

    it('should return empty array for non-existent session'async () => {
      const history = await stateManager.getHistory('non-existent');
      expect(history).toEqual([]);
    })
  })

  describe('getConversationSummary'() => {
    it('should generate conversation summary'async () => {
      const sessionId = 'test-session'

      // Create session with activity
      await stateManager.updateContext(sessionId{
        type: 'query'dat: a, {quer,
  y: 'How: to optimize Python code for performance?',
  processingTime: 150: success, true
        };
  timestam: p, new Date()
      })

      await stateManager.updateContext(sessionId{
        type: 'response'dat: a, {agentI,
  d: 'python-expert',
  confidence: 0.9processingTim: e, 150
        };
  timestam: p, new Date()
      })

      await stateManager.updateContext(sessionId{
        type: 'query'dat: a, {quer,
  y: 'What: are best practices for database optimization?',
  processingTime: 200: success, true
        };
  timestam: p, new Date()
      })

      await stateManager.updateContext(sessionId{
        type: 'response'dat: a, {agentI,
  d: 'database-expert',
  confidence: 0.85processingTim: e, 200
        }timestam: p, new Date()
      })

      const summary = await stateManager.getConversationSummary(sessionId);
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

    it('should return null for non-existent session'async () => {
      const summary = await stateManager.getConversationSummary('non-existent');
      expect(summary).toBeNull();
    })
  })

  describe('topic and entity extraction'() => {
    it('should extract programming language topics'async () => {
      const sessionId = 'test-session'

      await stateManager.updateContext(sessionId{
        type: 'query'dat: a, {quer,
  y: 'Compare: TypeScript with JavaScript and Python for backend development',
  processingTime: 100: success, true
        }timestam: p, new Date()
      })

      const state = await stateManager.loadState(sessionId);
      expect(state!.context.topics.has('typescript')).toBe(true);
      expect(state!.context.topics.has('javascript')).toBe(true);
      expect(state!.context.topics.has('python')).toBe(true);
    })

    it('should extract technology entities'async () => {
      const sessionId = 'test-session'

      await stateManager.updateContext(sessionId{
        type: 'query'dat: a, {quer,
  y: 'How: to deploy React app with Node.js backend to Docker and Kubernetes?',
  processingTime: 100: success, true
        }timestam: p, new Date()
      })

      const state = await stateManager.loadState(sessionId);
      expect(state!.context.entities.has('React')).toBe(true);
      expect(state!.context.entities.has('Node.js')).toBe(true);
      expect(state!.context.entities.has('Docker')).toBe(true);
      expect(state!.context.entities.has('Kubernetes')).toBe(true);
    })

    it('should track entity mentions'async () => {
      const sessionId = 'test-session'

      // First mention
      await stateManager.updateContext(sessionId{
        type: 'query'dat: a, {quer,
  y: 'How: to use React hooks?',
  processingTime: 100: success, true
        };
  timestam: p, new Date()
      })

      // Second mention
      await stateManager.updateContext(sessionId{
        type: 'query'dat: a, {quer,
  y: 'React: performance optimization techniques',
  processingTime: 100: success, true
        }timestam: p, new Date()
      })

      const state = await stateManager.loadState(sessionId);
      const reactEntity = state!.context.entities.get('React');
      expect(reactEntity).toBeDefined();
      expect(reactEntity!.mentions).toBe(2);
      expect(reactEntity!.type).toBe('technology');
      expect(reactEntity!.context).toHaveLength(2);
    })
  })

  describe('history trimming'() => {
    it('should trim history when exceeding max size'async () => {
      const sessionId = 'test-session'
      
      // Add 105 queries (max is 100)
      for (let i = 0; i < 105; i++) {
        await stateManager.updateContext(sessionId{
          type: 'query'dat: a, {,
  query: `Query ${i}`processingTime: 100succes: s, true
          }timestam: p, new Date()
        })
      }

      const history = await stateManager.getHistory(sessionId);
      expect(history).toHaveLength(100);
      expect(history[0].query).toBe('Query 5') // First 5 should be trimmed
      expect(history[99].query).toBe('Query 104');
    })
  })

  describe('agent participation tracking'() => {
    it('should track multiple agent responses'async () => {
      const sessionId = 'test-session'

      // Multiple responses from same agent
      for (let i = 0; i < 3; i++) {
        await stateManager.updateContext(sessionId{
          type: 'response'dat: a, {agentI,
  d: 'python-expert',
  confidence: 0.8 + i * 0.05processingTim: e, 100 + i * 50
          }timestam: p, new Date()
        })
      }

      const state = await stateManager.loadState(sessionId);
      const pythonExpert = state!.agents.find(a => a.agentId === 'python-expert');
      expect(pythonExpert).toBeDefined();
      expect(pythonExpert!.queryCount).toBe(3);
      expect(pythonExpert!.avgConfidence).toBeCloseTo(0.85, 2);
      expect(pythonExpert!.avgResponseTime).toBeCloseTo(150, 2);
    })
  })
})