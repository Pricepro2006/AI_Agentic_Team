# Expert Routing Implementation

## Overview

The Expert Routing System implements intelligent query routing through the Master Orchestrator (MO) to appropriate expert agents. All requests flow through the MO, which analyzes queries and routes them to the most suitable expert(s) for execution.

## Architecture

### Core Components

1. **Master Orchestrator** (`src/agents/experts/MasterOrchestrator.ts`)
   - Central coordinator for all AI queries
   - Implements intelligent routing logic
   - Coordinates multi-agent execution
   - Uses ToolExecutionFramework for reliable tool execution

2. **Expert Router** (`src/orchestration/ExpertRouter.ts`)
   - Analyzes queries to determine best expert routing
   - Manages expert instances and caching
   - Coordinates multi-expert execution strategies
   - Tracks routing decisions and statistics

3. **Tool Execution Framework** (`src/infrastructure/tools/ToolExecutionFramework.ts`)
   - Standardized tool execution with error handling
   - Retry logic with exponential backoff
   - Input/output validation using Zod schemas
   - Caching mechanism for tool results
   - Rate limiting and monitoring

## Request Flow

```
User Query
    ↓
Master Orchestrator
    ↓
Interpret Request (AI Tool)
    ↓
Route Decision
    ├─→ Single Expert Path
    │      ↓
    │   Expert Router
    │      ↓
    │   Execute Expert
    │      ↓
    │   Return Result
    │
    └─→ Multi-Expert Path
           ↓
       Task Decomposition
           ↓
       Coordinate Experts
           ↓
       Aggregate Results
           ↓
       Return Summary
```

## Key Features

### 1. Intelligent Routing

The system uses AI-powered analysis to:
- Understand query intent and complexity
- Identify required capabilities
- Select primary and supporting experts
- Determine execution strategy (single, sequential, parallel, hierarchical)

### 2. Multi-Expert Coordination

For complex queries requiring multiple experts:
- **Sequential**: Experts execute one after another, passing results forward
- **Parallel**: All experts execute simultaneously for faster results
- **Hierarchical**: Primary expert executes first, then secondary experts enhance results

### 3. Tool Execution Framework

All tool executions benefit from:
- **Error Handling**: Comprehensive error catching and reporting
- **Retry Logic**: Automatic retries with exponential backoff
- **Caching**: Results cached to improve performance
- **Validation**: Input/output validation using Zod schemas
- **Monitoring**: Execution metrics and performance tracking
- **Rate Limiting**: Prevents overuse of resources

### 4. Expert Capabilities

Current implemented experts:
- **Architecture Expert**: System design, patterns, scalability
- **Code Review Expert**: Code quality, security, best practices
- **Documentation Expert**: Technical writing, API docs, README generation

## Implementation Details

### Master Orchestrator Tools

The MO implements 13 AI-powered tools:
1. `interpret_request_ai` - Analyzes user queries
2. `decompose_tasks_ai` - Breaks complex tasks into subtasks
3. `evaluate_quality_ai` - Assesses response quality
4. `route_with_enhanced_tools` - Routes to appropriate experts
5. `coordinate_multi_agent` - Manages multi-expert execution
6. `send_cross_agent_message` - Inter-agent communication
7. `parse_with_enhanced_parser` - Advanced query parsing
8. `generate_outcome_specification` - Defines expected outcomes
9. `generate_task_plan` - Creates execution plans
10. `create_coordination_plan` - Plans multi-agent coordination
11. `validate_progress` - Tracks task progress
12. `assess_delivery_confidence` - Evaluates completion confidence
13. `route_with_traditional_parser` - Fallback routing

### Expert Router Methods

Key methods in the Expert Router:
- `routeQuery()` - Main routing logic
- `analyzeQueryForRouting()` - AI-powered query analysis
- `keywordBasedRouting()` - Fallback routing logic
- `executeWithExpert()` - Execute query with specific expert
- `coordinateMultiExpertExecution()` - Coordinate multiple experts
- `generateExecutionSummary()` - Summarize multi-expert results

### Tool Execution Framework

Key features:
- `execute()` - Main execution method with all safeguards
- `executeWithRetry()` - Retry logic implementation
- `validateInput()` - Zod-based input validation
- `checkCache()` - Cache lookup
- `trackExecution()` - Metrics collection
- `handleError()` - Error classification and handling

## Usage Example

```typescript
// Create Master Orchestrator
const masterOrchestrator = new MasterOrchestrator()

// Create context
const context: AgentContext = {
  userId: 'user-123',
  sessionId: 'session-456',
  conversationId: 'conv-789',
  conversationHistory: [],
  environment: 'production',
  metadata: {}
}

// Execute query
const result = await masterOrchestrator.execute(
  "Review the security of our authentication system and suggest improvements",
  context
)

if (result.success) {
  console.log('Primary Expert:', result.metadata.primaryExpert)
  console.log('Response:', result.response)
} else {
  console.error('Error:', result.error)
}
```

## TypeScript API Integration

The system integrates with the TypeScript API through:
- `/orchestration.processRequest` - Main entry point
- `/orchestration.analyzeQuery` - Query analysis without execution
- `/orchestration.executeTask` - Multi-agent task execution
- `/orchestration.getAvailableExperts` - List experts
- `/orchestration.getExpertTools` - Get expert's tools
- `/orchestration.executeTool` - Direct tool execution

## Configuration

### Tool Execution Options

```typescript
const options: ToolExecutionOptions = {
  maxRetries: 3,              // Retry attempts
  retryDelay: 1000,           // Initial retry delay (ms)
  timeout: 30000,             // Execution timeout (ms)
  cache: true,                // Enable caching
  cacheTTL: 300,              // Cache TTL (seconds)
  validateInput: true,        // Validate inputs
  validateOutput: true,       // Validate outputs
  rateLimit: {
    requests: 100,            // Max requests
    window: 60000             // Time window (ms)
  },
  monitoring: {
    trackMetrics: true,       // Track metrics
    trackErrors: true,        // Track errors
    trackPerformance: true    // Track performance
  }
}
```

## Monitoring and Statistics

### Routing Statistics

```typescript
const stats = expertRouter.getRoutingStats()
// Returns:
// {
//   totalRoutings: 150,
//   expertUsage: {
//     'architecture-expert': 45,
//     'code-review-expert': 60,
//     'documentation-expert': 45
//   },
//   averageConfidence: 0.85,
//   complexityDistribution: {
//     simple: 30,
//     moderate: 80,
//     complex: 35,
//     expert: 5
//   }
// }
```

### Tool Execution Statistics

```typescript
const stats = toolExecutionFramework.getExecutionStats()
// Returns per-tool statistics including:
// - Total executions
// - Success/failure rates
// - Average execution time
// - Cache hit rate
```

## Future Enhancements

1. **Additional Experts**: Implement remaining 23 experts
2. **Learning System**: Learn from routing decisions to improve accuracy
3. **Advanced Caching**: Semantic caching based on query similarity
4. **Load Balancing**: Distribute load across expert instances
5. **Priority Queues**: Handle urgent requests with priority
6. **Streaming Responses**: Support streaming for long-running tasks

## Troubleshooting

### Common Issues

1. **Expert Not Found**
   - Ensure expert is registered in `ExpertRegistry`
   - Check expert ID matches expected format

2. **Tool Execution Timeout**
   - Increase timeout in tool execution options
   - Check if Ollama service is running

3. **Routing Failures**
   - Check Ollama model is available
   - Verify expert capabilities mapping
   - Use fallback routing for critical paths

### Debug Mode

Enable debug logging:
```typescript
process.env.LOG_LEVEL = 'debug'
```

View routing decisions:
```typescript
const history = expertRouter.getExecutionHistory('tool-name')
```

## Conclusion

The Expert Routing System provides a robust, scalable foundation for intelligent query routing in the TypeScript AI Assistant. By leveraging the Master Orchestrator pattern with specialized experts, the system can handle complex queries efficiently while maintaining high reliability through the Tool Execution Framework.