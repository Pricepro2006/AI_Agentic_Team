# Master Orchestrator Usage Patterns

This guide provides practical patterns and best practices for using the Master Orchestrator in various scenarios.

## Table of Contents
1. [Basic Patterns](#basic-patterns)
2. [Advanced Patterns](#advanced-patterns)
3. [Integration Patterns](#integration-patterns)
4. [Performance Patterns](#performance-patterns)
5. [Error Handling Patterns](#error-handling-patterns)
6. [Testing Patterns](#testing-patterns)

## Basic Patterns

### Simple Query Processing
The most straightforward use case - process a user query and get a response.

```typescript
import { MasterOrchestrator } from '@/agents/experts/MasterOrchestrator'

const orchestrator = new MasterOrchestrator()

// Simple query
const response = await orchestrator.processQuery(
  "How do I implement authentication in Node.js?"
)

console.log(response.unifiedResponse.primaryResponse.response)
```

### Session-Based Conversations
Maintain context across multiple queries in a conversation.

```typescript
const orchestrator = new MasterOrchestrator()
const sessionId = `user-${Date.now()}`

// First query
const response1 = await orchestrator.processQuery(
  "What's the best database for a chat application?",
  { sessionId }
)

// Follow-up query (context aware)
const response2 = await orchestrator.processQuery(
  "How do I scale it for millions of users?",
  { sessionId }
)
```

### Custom Routing Strategy
Override the default routing strategy for specific use cases.

```typescript
// Force comprehensive analysis with multiple experts
const response = await orchestrator.execute(
  query,
  {
    sessionId,
    routingStrategy: 'parallel', // Get all expert opinions
    minAgents: 3,
    timeout: 60000 // Allow more time
  }
)
```

## Advanced Patterns

### Multi-Stage Query Processing
Break complex queries into stages with intermediate processing.

```typescript
class EnhancedOrchestrator extends MasterOrchestrator {
  async processComplexQuery(query: string, context: any) {
    // Stage 1: Deep analysis
    const analysis = await this.executeTool('analyze_query_enhanced', {
      query,
      query_history: context.history,
      user_profile: context.profile
    })

    // Stage 2: Conditional routing based on complexity
    const routingStrategy = analysis.data.complexity === 'high' 
      ? 'comprehensive' 
      : 'optimal'
    
    const routing = await this.executeTool('route_query', {
      parsed_query: analysis.data,
      strategy: routingStrategy
    })

    // Stage 3: Pre-coordinate specialized agents
    if (routing.data.requires_research) {
      await this.executeTool('communicate_cross_agent', {
        message: {
          content: 'Prepare research context',
          recipients: ['research-agent'],
          pattern: 'broadcast',
          message_type: 'context_update'
        }
      })
    }

    // Stage 4: Execute with custom aggregation
    return await this.executeWithCustomAggregation(query, routing.data)
  }
}
```

### Conditional Agent Selection
Dynamically select agents based on query characteristics.

```typescript
async function smartAgentSelection(orchestrator: MasterOrchestrator, query: string) {
  // Analyze query first
  const analysis = await orchestrator.executeTool('analyze_query', { query })
  
  const agents = []
  
  // Add agents based on detected domains
  if (analysis.data.domains.includes('security')) {
    agents.push({ agentId: 'security-expert', confidence: 0.9 })
  }
  
  if (analysis.data.domains.includes('performance')) {
    agents.push({ agentId: 'performance-expert', confidence: 0.8 })
  }
  
  // Add general expert if no specific domain
  if (agents.length === 0) {
    agents.push({ agentId: 'python-expert', confidence: 0.7 })
  }
  
  // Create custom routing decision
  const customRouting = {
    primaryAgent: agents[0],
    supportingAgents: agents.slice(1),
    strategy: agents.length > 2 ? 'parallel' : 'sequential'
  }
  
  return await orchestrator.processWithRouting(query, customRouting)
}
```

### Hierarchical Query Decomposition
Break complex queries into sub-queries for different agents.

```typescript
async function decomposeComplexQuery(orchestrator: MasterOrchestrator, query: string) {
  // Example: "Build a secure, scalable REST API with React frontend"
  
  const subQueries = [
    {
      query: "REST API architecture patterns",
      agents: ['architecture-expert', 'api-integration-expert']
    },
    {
      query: "Security best practices for REST APIs",
      agents: ['security-expert']
    },
    {
      query: "React frontend integration with REST APIs",
      agents: ['ui-ux-expert', 'react-expert']
    },
    {
      query: "Scaling strategies for full-stack applications",
      agents: ['performance-expert', 'architecture-expert']
    }
  ]
  
  // Process sub-queries in parallel
  const subResults = await Promise.all(
    subQueries.map(sq => 
      orchestrator.processWithSpecificAgents(sq.query, sq.agents)
    )
  )
  
  // Aggregate all sub-results
  return await orchestrator.aggregateResults(subResults, {
    strategy: 'hierarchical',
    parentQuery: query
  })
}
```

## Integration Patterns

### REST API Integration
Expose orchestrator functionality via REST endpoints.

```typescript
import express from 'express'
import { MasterOrchestrator } from '@/agents/experts/MasterOrchestrator'
import { conversationStateManager } from '@/orchestration/conversation-state'

const app = express()
const orchestrator = new MasterOrchestrator()

app.post('/api/query', async (req, res) => {
  const { query, sessionId } = req.body
  
  try {
    // Process query
    const result = await orchestrator.processQuery(query, { sessionId })
    
    // Update conversation state
    await conversationStateManager.updateContext(sessionId, {
      type: 'query',
      data: {
        query,
        ...result
      },
      timestamp: new Date()
    })
    
    res.json({
      success: true,
      response: result.unifiedResponse.primaryResponse.response,
      confidence: result.unifiedResponse.confidence,
      agents: result.unifiedResponse.responses.map(r => r.agentId)
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

app.get('/api/session/:id/history', async (req, res) => {
  const history = await conversationStateManager.getHistory(
    req.params.id,
    parseInt(req.query.limit) || 10
  )
  res.json(history)
})
```

### WebSocket Real-time Integration
Stream responses as they arrive from different agents.

```typescript
import { WebSocket } from 'ws'
import { MasterOrchestrator } from '@/agents/experts/MasterOrchestrator'

const wss = new WebSocket.Server({ port: 8080 })
const orchestrator = new MasterOrchestrator()

wss.on('connection', (ws) => {
  ws.on('message', async (message) => {
    const { query, sessionId } = JSON.parse(message)
    
    // Stream agent responses as they arrive
    const streamingOrchestrator = new StreamingOrchestrator()
    
    streamingOrchestrator.on('agent-response', (agentResponse) => {
      ws.send(JSON.stringify({
        type: 'partial',
        agent: agentResponse.agentId,
        response: agentResponse.response
      }))
    })
    
    const finalResponse = await streamingOrchestrator.processQuery(query, { sessionId })
    
    ws.send(JSON.stringify({
      type: 'final',
      response: finalResponse
    }))
  })
})
```

### GraphQL Integration
Expose orchestrator through GraphQL for flexible querying.

```typescript
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      askQuestion: {
        type: ResponseType,
        args: {
          query: { type: GraphQLString },
          sessionId: { type: GraphQLString },
          strategy: { type: GraphQLString }
        },
        resolve: async (_, { query, sessionId, strategy }) => {
          const orchestrator = new MasterOrchestrator()
          return await orchestrator.processQuery(query, {
            sessionId,
            routingStrategy: strategy
          })
        }
      },
      conversationSummary: {
        type: SummaryType,
        args: {
          sessionId: { type: GraphQLString }
        },
        resolve: async (_, { sessionId }) => {
          return await conversationStateManager.getConversationSummary(sessionId)
        }
      }
    }
  })
})
```

## Performance Patterns

### Response Caching
Cache common queries to reduce latency.

```typescript
class CachedOrchestrator extends MasterOrchestrator {
  private cache = new Map<string, any>()
  private cacheTimeout = 3600000 // 1 hour
  
  async processQuery(query: string, context?: any) {
    const cacheKey = `${query}-${context?.sessionId || 'default'}`
    const cached = this.cache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.response
    }
    
    const response = await super.processQuery(query, context)
    
    this.cache.set(cacheKey, {
      response,
      timestamp: Date.now()
    })
    
    return response
  }
}
```

### Parallel Agent Warming
Pre-warm agents for faster response times.

```typescript
async function warmupAgents(orchestrator: MasterOrchestrator) {
  const warmupQueries = [
    { query: "Hello", agents: ['python-expert'] },
    { query: "Test", agents: ['security-expert'] },
    { query: "Ping", agents: ['architecture-expert'] }
  ]
  
  // Warm up agents in parallel
  await Promise.all(
    warmupQueries.map(wq => 
      orchestrator.processWithSpecificAgents(wq.query, wq.agents)
    )
  )
  
  console.log('Agents warmed up and ready')
}
```

### Load Balancing Pattern
Distribute queries across multiple orchestrator instances.

```typescript
class LoadBalancedOrchestrator {
  private instances: MasterOrchestrator[] = []
  private currentIndex = 0
  
  constructor(instanceCount: number = 3) {
    for (let i = 0; i < instanceCount; i++) {
      this.instances.push(new MasterOrchestrator())
    }
  }
  
  async processQuery(query: string, context?: any) {
    // Round-robin selection
    const instance = this.instances[this.currentIndex]
    this.currentIndex = (this.currentIndex + 1) % this.instances.length
    
    return await instance.processQuery(query, context)
  }
}
```

## Error Handling Patterns

### Graceful Degradation
Fallback strategies when primary agents fail.

```typescript
async function robustQueryProcessing(orchestrator: MasterOrchestrator, query: string) {
  try {
    // Try with optimal strategy first
    return await orchestrator.processQuery(query, {
      routingStrategy: 'optimal',
      timeout: 10000
    })
  } catch (error) {
    console.warn('Optimal strategy failed, trying failover', error)
    
    try {
      // Fallback to failover strategy
      return await orchestrator.processQuery(query, {
        routingStrategy: 'failover',
        timeout: 20000
      })
    } catch (fallbackError) {
      console.error('Failover failed, using emergency response', fallbackError)
      
      // Emergency response
      return {
        success: false,
        response: "I'm having trouble processing your request. Please try rephrasing or try again later.",
        error: fallbackError.message
      }
    }
  }
}
```

### Circuit Breaker Pattern
Prevent cascading failures when agents are down.

```typescript
class CircuitBreakerOrchestrator extends MasterOrchestrator {
  private circuitBreakers = new Map<string, CircuitBreaker>()
  
  async executeAgent(agentId: string, query: string) {
    let breaker = this.circuitBreakers.get(agentId)
    
    if (!breaker) {
      breaker = new CircuitBreaker({
        failureThreshold: 3,
        resetTimeout: 60000
      })
      this.circuitBreakers.set(agentId, breaker)
    }
    
    return await breaker.execute(() => 
      super.executeAgent(agentId, query)
    )
  }
}
```

### Retry with Exponential Backoff
Retry failed operations with increasing delays.

```typescript
async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: Error
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error
      const delay = initialDelay * Math.pow(2, i)
      console.log(`Retry ${i + 1}/${maxRetries} after ${delay}ms`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
  
  throw lastError
}

// Usage
const response = await retryWithBackoff(() => 
  orchestrator.processQuery(query)
)
```

## Testing Patterns

### Unit Testing Individual Tools
Test orchestrator tools in isolation.

```typescript
describe('MasterOrchestrator Tools', () => {
  let orchestrator: MasterOrchestrator
  
  beforeEach(() => {
    orchestrator = new MasterOrchestrator()
  })
  
  describe('analyze_query tool', () => {
    it('should extract entities from query', async () => {
      const result = await orchestrator.executeTool('analyze_query', {
        query: 'How to use React with TypeScript?'
      })
      
      expect(result.success).toBe(true)
      expect(result.data.entities).toContain('React')
      expect(result.data.entities).toContain('TypeScript')
      expect(result.data.domains).toContain('frontend')
    })
  })
  
  describe('route_query tool', () => {
    it('should select appropriate agents', async () => {
      const analysisResult = {
        domains: ['security', 'api'],
        complexity: 'medium'
      }
      
      const result = await orchestrator.executeTool('route_query', {
        parsed_query: analysisResult,
        strategy: 'optimal'
      })
      
      expect(result.data.primary_agent.agent_id).toBe('security-expert')
      expect(result.data.supporting_agents).toContainEqual(
        expect.objectContaining({ agent_id: 'api-integration-expert' })
      )
    })
  })
})
```

### Integration Testing
Test the full orchestration flow.

```typescript
describe('MasterOrchestrator Integration', () => {
  let orchestrator: MasterOrchestrator
  let coordinator: AgentCoordinator
  
  beforeAll(async () => {
    orchestrator = new MasterOrchestrator()
    coordinator = AgentCoordinator.getInstance()
    
    // Register test agents
    coordinator.registerAgent('test-agent-1', new TestAgent('agent1'))
    coordinator.registerAgent('test-agent-2', new TestAgent('agent2'))
  })
  
  it('should process query end-to-end', async () => {
    const response = await orchestrator.processQuery(
      'Test query for integration',
      { sessionId: 'test-session' }
    )
    
    expect(response.success).toBe(true)
    expect(response.unifiedResponse).toBeDefined()
    expect(response.unifiedResponse.responses.length).toBeGreaterThan(0)
    expect(response.unifiedResponse.confidence).toBeGreaterThan(0.5)
  })
})
```

### Performance Testing
Measure orchestrator performance under load.

```typescript
describe('MasterOrchestrator Performance', () => {
  it('should handle concurrent queries', async () => {
    const orchestrator = new MasterOrchestrator()
    const queries = Array(10).fill(null).map((_, i) => 
      `Performance test query ${i}`
    )
    
    const start = Date.now()
    const responses = await Promise.all(
      queries.map(q => orchestrator.processQuery(q))
    )
    const duration = Date.now() - start
    
    expect(responses).toHaveLength(10)
    expect(responses.every(r => r.success)).toBe(true)
    expect(duration).toBeLessThan(10000) // 10 seconds for 10 queries
  })
  
  it('should maintain response time under load', async () => {
    const responseTimes: number[] = []
    
    for (let i = 0; i < 20; i++) {
      const start = Date.now()
      await orchestrator.processQuery(`Load test ${i}`)
      responseTimes.push(Date.now() - start)
    }
    
    const avgResponseTime = responseTimes.reduce((a, b) => a + b) / responseTimes.length
    const maxResponseTime = Math.max(...responseTimes)
    
    expect(avgResponseTime).toBeLessThan(2000) // 2 second average
    expect(maxResponseTime).toBeLessThan(5000) // 5 second max
  })
})
```

## Best Practices

1. **Always use sessions** for multi-turn conversations to maintain context
2. **Choose appropriate routing strategies** based on query complexity
3. **Implement timeouts** to prevent hanging requests
4. **Monitor agent health** and implement circuit breakers
5. **Cache responses** for common queries
6. **Use parallel execution** for independent agents
7. **Log all interactions** for debugging and analytics
8. **Validate inputs** to prevent injection attacks
9. **Handle errors gracefully** with user-friendly messages
10. **Test thoroughly** including edge cases and error scenarios

## Conclusion

These patterns demonstrate the flexibility and power of the Master Orchestrator. By combining these patterns, you can build sophisticated AI applications that leverage multiple specialized agents effectively. Remember to monitor performance, handle errors gracefully, and continuously optimize based on real-world usage patterns.