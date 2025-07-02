# Master Orchestrator Architecture Guide

## Overview

The Master Orchestrator (MO) is the central coordination intelligence of the AI Assistant System, responsible for managing interactions between 26 specialized AI agents. It analyzes queries, routes them to appropriate experts, manages cross-agent communication, and aggregates responses into unified answers.

## Architecture Components

### 1. Core Components

#### MasterOrchestrator Class (`src/agents/experts/MasterOrchestrator.ts`)
- Extends `BaseAgent` from the Mastra framework
- Implements Python-TypeScript tool bridge for legacy tool integration
- Manages 4 critical orchestration tools:
  - `analyze_query` - Query understanding and entity extraction
  - `route_query` - Agent selection and execution strategy
  - `communicate_cross_agent` - Inter-agent messaging patterns
  - `analyze_query_enhanced` - Deep analysis with history/profile

#### AgentCoordinator (`src/orchestration/coordinator.ts`)
- Singleton pattern for centralized agent management
- Implements multiple execution strategies:
  - Sequential - One agent at a time, passing context
  - Parallel - Multiple agents simultaneously
  - Priority-based - Primary agent first, then supporting
  - Failover - Try agents until success
  - Round-robin - Distribute load across agents
  - Weighted - Balance based on agent expertise
  - Load-balanced - Select least loaded agents

#### ResponseAggregator (`src/orchestration/response-aggregator.ts`)
- Merges multiple agent responses into unified answers
- Conflict detection and resolution strategies:
  - Voting - Majority opinion wins
  - Confidence - Highest confidence response
  - Expertise - Expert agents prioritized
  - Timestamp - Most recent information
  - Primary - Primary agent's view dominates
- Completeness validation and quality scoring

#### ConversationStateManager (`src/orchestration/conversation-state.ts`)
- Maintains conversation context and history
- Tracks:
  - Query history with analysis results
  - Topic and entity extraction
  - User preferences and patterns
  - Agent participation metrics
- Supports multiple storage backends (memory, Redis, PostgreSQL)

### 2. Communication Infrastructure

#### Message Bus (`src/infrastructure/message-bus/`)
- Event-driven architecture for agent communication
- Supports patterns:
  - Publish/Subscribe for broadcasts
  - Request/Reply for direct queries
  - Event streaming for real-time updates
- Built on EventEmitter3 for performance

#### Cross-Agent Communicator Tool
- WebSocket-based real-time communication
- Message routing with priority queues
- Session management and heartbeat monitoring
- Correlation tracking for request-response patterns

### 3. Integration Layer

#### Python Tool Bridge
- Subprocess execution of Python orchestrator tools
- JSON serialization for data exchange
- Error handling and timeout management
- Performance metrics collection

#### Agent Registry (`src/orchestration/agent-registry.ts`)
- Centralized agent registration and discovery
- Capability-based agent lookup
- Health monitoring and status tracking
- Dynamic agent loading

## Data Flow

### Query Processing Pipeline

```
User Query
    ↓
[1. Query Analysis]
    - Enhanced Parser extracts intent, entities, complexity
    - Context enrichment from conversation history
    ↓
[2. Agent Routing]
    - Agent Router selects primary and supporting agents
    - Determines execution strategy (parallel, sequential, etc.)
    ↓
[3. Agent Coordination]
    - AgentCoordinator executes routing decision
    - Manages inter-agent dependencies
    - Handles timeouts and failures
    ↓
[4. Response Aggregation]
    - ResponseAggregator merges agent outputs
    - Resolves conflicts between agent opinions
    - Validates response completeness
    ↓
[5. State Update]
    - ConversationStateManager updates history
    - Extracts topics and entities
    - Updates agent participation metrics
    ↓
Unified Response
```

### Cross-Agent Communication Flow

```
Agent A needs help from Agent B
    ↓
[1. Message Creation]
    - Agent A calls communicate_cross_agent
    - Message formatted with type, priority, content
    ↓
[2. Message Routing]
    - Cross-Agent Communicator validates recipients
    - Queues message if recipient offline
    - Handles broadcast patterns
    ↓
[3. Message Delivery]
    - WebSocket delivery for online agents
    - Queue processing for offline agents
    - Retry with exponential backoff
    ↓
[4. Response Handling]
    - Correlation tracking for responses
    - Timeout handling for no response
    - Aggregation of multiple responses
```

## Configuration

### Agent Configuration
```typescript
protected config: AgentConfig = {
  id: 'master-orchestrator',
  name: 'Master Orchestrator',
  model: 'mistral:latest',
  temperature: 0.3, // Lower for consistent routing
  maxTokens: 4096,
  timeout: 30000,
  capabilities: [
    'query_analysis',
    'agent_routing',
    'cross_agent_communication',
    'response_coordination',
    'context_management'
  ]
}
```

### Routing Strategies
```typescript
type RoutingStrategyType = 
  | 'sequential'      // Execute agents one by one
  | 'parallel'        // Execute all at once
  | 'priority-based'  // Primary first, then supporting
  | 'weighted'        // Balance by expertise weight
  | 'round-robin'     // Distribute evenly
  | 'load-balanced'   // Select least loaded
  | 'failover'        // Try until success
```

### Aggregation Options
```typescript
interface AggregationOptions {
  strategy: 'merge' | 'chain' | 'weighted' | 'best-match'
  conflictResolution: 'vote' | 'expertise' | 'confidence' | 'timestamp' | 'primary'
  minimumConfidence: number
  requireAllAgents: boolean
}
```

## Usage Examples

### Basic Query Processing
```typescript
const orchestrator = new MasterOrchestrator()
const result = await orchestrator.processQuery(
  "How do I optimize Python code for performance?",
  { sessionId: 'user-123' }
)
```

### Direct Tool Usage
```typescript
// Analyze a query
const analysis = await orchestrator.executeTool('analyze_query', {
  query: "Build a REST API with authentication",
  context: conversationHistory
})

// Route to agents
const routing = await orchestrator.executeTool('route_query', {
  parsed_query: analysis.data,
  strategy: 'optimal'
})

// Cross-agent communication
const message = await orchestrator.executeTool('communicate_cross_agent', {
  message: {
    content: "Need security review of this API design",
    recipients: ['security-expert'],
    pattern: 'direct',
    message_type: 'query'
  }
})
```

### Custom Coordination
```typescript
// Register agents
agentCoordinator.registerAgent('python-expert', pythonExpert)
agentCoordinator.registerAgent('security-expert', securityExpert)

// Create routing decision
const routing: RoutingDecision = {
  primaryAgent: { agentId: 'python-expert', confidence: 0.9 },
  supportingAgents: [{ agentId: 'security-expert', confidence: 0.7 }],
  strategy: 'priority-based',
  reasoning: 'Python optimization with security considerations'
}

// Execute with aggregation
const response = await agentCoordinator.coordinateAndAggregate(
  { sessionId: 'session-123', query: userQuery, context: {} },
  routing
)
```

### Conversation Management
```typescript
// Create session
const session = await conversationStateManager.createSession()

// Update with query
await conversationStateManager.updateContext(session.sessionId, {
  type: 'query',
  data: { query: userQuery, analysis, routing },
  timestamp: new Date()
})

// Get history
const history = await conversationStateManager.getHistory(
  session.sessionId, 
  10 // last 10 queries
)

// Get conversation summary
const summary = await conversationStateManager.getConversationSummary(
  session.sessionId
)
```

## Performance Characteristics

### Latency Breakdown
- Query Analysis: 50-100ms (Python subprocess)
- Agent Routing: 20-50ms (Python subprocess)
- Agent Execution: 100-5000ms (varies by agent)
- Response Aggregation: 10-50ms (TypeScript native)
- Total E2E: 200-5000ms typical

### Scalability
- Concurrent Sessions: Limited by memory/CPU
- Agents per Query: Tested up to 10 parallel
- Message Queue Size: 1000 per agent default
- History Retention: 100 queries per session

### Resource Usage
- Memory: ~50MB base + 10MB per session
- CPU: Minimal when idle, spikes during routing
- Network: WebSocket connections for real-time
- Storage: Optional persistence to Redis/PostgreSQL

## Error Handling

### Failure Modes
1. **Python Tool Failure**
   - Graceful degradation to simple routing
   - Error logged, default agent selection

2. **Agent Timeout**
   - Configurable timeout per agent (30s default)
   - Partial results returned if some succeed

3. **Aggregation Conflicts**
   - Multiple resolution strategies available
   - Always returns best-effort response

4. **Session Expiry**
   - Auto-recreate after 1 hour timeout
   - Conversation history preserved

### Monitoring
- Comprehensive logging with context
- Performance metrics per component
- Agent health checks
- Error rate tracking

## Security Considerations

1. **Input Validation**
   - Query length limits
   - Script injection prevention
   - Rate limiting per session

2. **Agent Isolation**
   - Agents run in separate contexts
   - No direct file system access
   - Controlled inter-agent communication

3. **Data Privacy**
   - Session data isolation
   - Optional encryption for storage
   - Configurable retention policies

## Future Enhancements

1. **Machine Learning Integration**
   - Learn optimal routing from history
   - Predict query complexity
   - Personalized agent selection

2. **Distributed Orchestration**
   - Multi-region deployment
   - Agent clustering
   - Fault tolerance

3. **Advanced Analytics**
   - Query pattern analysis
   - Agent performance optimization
   - Cost tracking per query

## Troubleshooting

### Common Issues

1. **"Agent not found" errors**
   - Ensure agent is registered in registry
   - Check agent health status
   - Verify agent ID matches

2. **Slow response times**
   - Check Python tool performance
   - Monitor agent response times
   - Consider parallel execution

3. **Memory growth**
   - Implement session cleanup
   - Limit history size
   - Use external storage

### Debug Mode
```typescript
// Enable debug logging
process.env.LOG_LEVEL = 'debug'

// Trace query execution
const result = await orchestrator.processQuery(query, {
  debug: true,
  trace: true
})
```

## Conclusion

The Master Orchestrator provides a sophisticated coordination layer for multi-agent AI systems. Its modular architecture, flexible routing strategies, and comprehensive state management make it suitable for complex conversational AI applications. The  TypeScript approach allows leveraging existing tools while building towards a fully TypeScript future.