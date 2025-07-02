# Expert Agent Implementation Guide

This comprehensive guide provides everything needed to implement standardized expert agents using the ExpertAgentTemplate with RAG integration and Master Orchestrator coordination.

## Quick Start

### 1. Generate a New Expert Agent

```bash
# Generate a cloud architecture expert
./scripts/create-expert-agent.ts \
  --name "CloudArchitectureExpert" \
  --domain "cloud_architecture" \
  --expertise "aws_design,azure_deployment,kubernetes_orchestration" \
  --skills "cost_optimization,security_assessment" \
  --knowledge "cloud_platforms,containerization,microservices" \
  --rag-enabled

# Generate a data science expert
./scripts/create-expert-agent.ts \
  --name "DataScienceExpert" \
  --domain "data_science" \
  --expertise "machine_learning,statistical_analysis,data_pipeline" \
  --skills "model_optimization,feature_engineering" \
  --knowledge "ml_algorithms,statistics,data_visualization" \
  --rag-enabled
```

### 2. Implement Domain-Specific Logic

```typescript
// Replace placeholder implementations with actual domain logic
private async executeAnalyzer(params: any): Promise<ToolExecutionResult> {
  // Your domain-specific implementation here
  const analysis = await this.performDomainAnalysis(params.input)
  
  return this.formatResponse({
    analysis,
    recommendations: this.generateRecommendations(analysis),
    nextSteps: this.identifyNextSteps(analysis)
  })
}
```

### 3. Test and Validate

```bash
# Run tests
npm test -- CloudArchitectureExpert.test.ts

# Run integration tests
npm run test:integration
```

## Template Architecture

### Core Components

#### 1. ExpertAgentTemplate (Base Class)
- Standardized foundation for all expert agents
- Built-in RAG integration capabilities
- MO coordination interface implementation
- Performance monitoring and metrics
- Error handling and resilience patterns

#### 2. Domain Specialization Configuration
```typescript
interface ExpertSpecialization {
  domain: string                    // Primary domain (e.g., 'database_management')
  primaryExpertise: string[]        // Core skills (e.g., ['sql_optimization', 'schema_design'])
  secondarySkills: string[]         // Supporting skills
  knowledgeAreas: string[]          // Knowledge domains for RAG
  limitations: string[]             // Clear boundaries and constraints
  integrationPoints: string[]       // External system connections
}
```

#### 3. RAG Integration Configuration
```typescript
interface RAGConfig {
  enabled: boolean                  // Enable/disable RAG processing
  embeddingModel: string           // Model for embeddings ('mistral:latest')
  chunkSize: number                // Text chunk size (500)
  chunkOverlap: number             // Overlap between chunks (50)
  topK: number                     // Number of relevant chunks (5)
  scoreThreshold: number           // Relevance threshold (0.7)
  optimizationStrategy: string     // 'semantic' | 'keyword' | 'hybrid'
  knowledgeDomains: string[]       // Domain-specific knowledge areas
  vectorStore: string              // Storage backend ('local')
  persistentStorage: boolean       // Persistent knowledge base
}
```

### Tool Implementation Pattern

Each expert agent implements exactly **8 standardized tools** following these categories:

1. **Core Domain** - Primary expertise implementation
2. **Analysis** - Domain-specific analysis capabilities  
3. **Generator** - Content/artifact generation
4. **Validator** - Quality assurance and validation
5. **Integration** - External system connectivity
6. **Optimizer** - Performance and efficiency improvements
7. **Reporter** - Status and metrics reporting
8. **Helper** - Supporting utilities

#### Tool Implementation Template
```typescript
private async executeToolName(params: any): Promise<ToolExecutionResult> {
  const startTime = Date.now()
  
  try {
    // 1. Parameter validation
    this.validateParams(params, ['required_param'])
    
    // 2. RAG-enhanced processing (if enabled)
    const ragResponse = await this.processWithRAG(
      `Process ${params.input} using domain expertise`,
      params,
      this.specialization.domain
    )
    
    // 3. Domain-specific business logic
    const result = await this.executeDomainLogic(params, ragResponse)
    
    // 4. Record metrics
    this.recordMetrics(true, ragResponse.confidence, ragResponse.ragSources.length > 0)
    
    // 5. Format response
    return this.formatResponse({
      output: result,
      recommendations: this.generateRecommendations(result),
      bestPractices: this.getBestPractices(),
      nextSteps: this.identifyNextSteps(result)
    }, true, {
      category: ToolCategory.ANALYSIS,
      processingTime: Date.now() - startTime,
      ragEnhanced: ragResponse.ragSources.length > 0,
      confidence: ragResponse.confidence
    })
    
  } catch (error) {
    this.recordMetrics(false, 0.3)
    return this.formatResponse(null, false, { error: error.message })
  }
}
```

## RAG Integration

### Knowledge Base Setup

1. **Prepare Domain Knowledge**
```bash
# Create knowledge directory
mkdir -p knowledge_base/cloud_architecture/

# Add documentation files
cp aws_best_practices.md knowledge_base/cloud_architecture/
cp kubernetes_guide.md knowledge_base/cloud_architecture/
cp security_standards.md knowledge_base/cloud_architecture/
```

2. **Configure RAG Processing**
```typescript
const ragConfig: Partial<RAGConfig> = {
  enabled: true,
  embeddingModel: 'mistral:latest',
  chunkSize: 600,                    // Larger for technical docs
  chunkOverlap: 100,
  topK: 8,                          // More context for complex queries
  scoreThreshold: 0.75,             // Higher threshold for quality
  optimizationStrategy: 'hybrid',
  knowledgeDomains: [
    'cloud_best_practices',
    'security_guidelines', 
    'performance_optimization'
  ]
}
```

3. **RAG-Enhanced Processing**
```typescript
protected async processWithRAG(
  query: string,
  context: any = {},
  knowledgeDomain?: string
): Promise<any> {
  // 1. Generate embeddings for query
  // 2. Perform similarity search in knowledge domain
  // 3. Retrieve relevant context
  // 4. Generate enhanced response with context
  
  const relevantContext = await this.retrieveRelevantContext(query, knowledgeDomain)
  const enhancedQuery = this.buildEnhancedQuery(query, relevantContext, context)
  
  const response = await this.ollamaService.generateCompletion(enhancedQuery)
  
  return {
    response,
    ragSources: relevantContext.sources,
    confidence: relevantContext.confidence,
    processingTime: Date.now() - startTime
  }
}
```

## Master Orchestrator Coordination

### MO Coordination Interface

Each expert agent implements standardized coordination methods:

#### 1. Query Analysis
```typescript
async queryAnalysis(query: string, context?: any): Promise<any> {
  return {
    domainRelevance: this.calculateDomainRelevance(query),      // 0.0 - 1.0
    expertiseRequired: this.identifyRequiredExpertise(query),   // string[]
    complexity: this.assessComplexity(query),                  // 'simple' | 'medium' | 'complex'
    estimatedDuration: this.estimateDuration(query),           // minutes
    requirements: analysis.response,
    confidence: analysis.confidence                             // 0.0 - 1.0
  }
}
```

#### 2. Routing Decision
```typescript
async routingDecision(intent: any): Promise<number> {
  const relevanceFactors = [
    this.calculateDomainRelevance(intent.query || ''),         // 40% weight
    this.assessSkillAlignment(intent.requiredSkills || []),    // 30% weight
    this.evaluateComplexityFit(intent.complexity || 'medium'), // 20% weight
    this.checkResourceAvailability()                           // 10% weight
  ]

  // Calculate weighted average
  const weights = [0.4, 0.3, 0.2, 0.1]
  return relevanceFactors.reduce((sum, factor, index) => 
    sum + (factor * weights[index]), 0
  )
}
```

#### 3. Response Formatting
```typescript
async responseFormat(results: any): Promise<any> {
  return {
    agentId: this.config.id,
    agentName: this.config.name,
    executionTime: results.processingTime || 0,
    confidence: results.confidence || 0.7,
    success: results.success !== false,
    data: results.response || results.data,
    metadata: {
      ragEnhanced: results.ragSources?.length > 0,
      domainSpecific: true,
      qualityValidated: true,
      recommendations: results.recommendations || [],
      nextSteps: results.nextSteps || [],
      bestPractices: results.bestPractices || []
    },
    ragSources: results.ragSources || []
  }
}
```

### Coordination Workflow

1. **Task Reception** - MO sends task with acceptance criteria
2. **Domain Analysis** - Expert analyzes relevance and requirements
3. **Execution** - Expert processes using RAG-enhanced capabilities  
4. **Quality Validation** - Expert validates outputs against criteria
5. **Progress Reporting** - Expert reports status to MO
6. **Result Delivery** - Expert formats and returns results

## Performance Optimization

### Metrics and Monitoring

```typescript
// Built-in performance tracking
getMetrics() {
  return {
    totalRequests: this.metrics.totalRequests,
    successfulRequests: this.metrics.successfulRequests,
    successRate: this.metrics.successfulRequests / this.metrics.totalRequests,
    averageResponseTime: this.metrics.averageResponseTime,
    averageConfidence: this.calculateAverageConfidence(),
    ragUtilization: this.metrics.ragQueries / this.metrics.totalRequests,
    ragQueries: this.metrics.ragQueries
  }
}
```

### Optimization Strategies

1. **RAG Optimization**
   - Tune chunk size for domain content
   - Optimize embedding models for technical content
   - Implement caching for frequent queries
   - Use hybrid search strategies

2. **Processing Optimization** 
   - Implement intelligent fallbacks
   - Cache domain-specific patterns
   - Optimize parameter validation
   - Use asynchronous processing

3. **Resource Management**
   - Monitor memory usage for vector operations
   - Implement connection pooling
   - Use streaming for large responses
   - Optimize batch processing

## Testing Strategy

### Comprehensive Test Coverage

1. **Unit Tests** - Individual tool functionality
2. **Integration Tests** - RAG and MO coordination
3. **Performance Tests** - Response times and resource usage
4. **Domain Tests** - Expertise validation and quality
5. **Error Handling Tests** - Resilience and fallbacks

### Test Implementation

```typescript
describe('CloudArchitectureExpert', () => {
  let agent: CloudArchitectureExpert

  beforeEach(() => {
    agent = new CloudArchitectureExpert()
  })

  describe('Tool Execution', () => {
    test('should execute architecture_analyzer successfully', async () => {
      const result = await agent.execute('architecture_analyzer', {
        input: 'analyze microservices architecture',
        options: { depth: 'comprehensive' }
      })
      
      expect(result.success).toBe(true)
      expect(result.data.analysis).toBeDefined()
      expect(result.data.recommendations).toBeInstanceOf(Array)
      expect(result.metadata.ragEnhanced).toBe(true)
    })
  })

  describe('RAG Integration', () => {
    test('should retrieve relevant context', async () => {
      const result = await agent['processWithRAG'](
        'design scalable microservices',
        {},
        'cloud_architecture'
      )
      
      expect(result.ragSources).toBeInstanceOf(Array)
      expect(result.confidence).toBeGreaterThan(0.5)
    })
  })

  describe('MO Coordination', () => {
    test('should calculate domain relevance correctly', () => {
      const relevance = agent['calculateDomainRelevance'](
        'kubernetes deployment optimization'
      )
      
      expect(relevance).toBeGreaterThan(0.7)
    })
  })
})
```

## Deployment and Production

### Deployment Checklist

- [ ] Domain logic fully implemented
- [ ] All 8 tools have production-ready implementations
- [ ] RAG knowledge base populated and tested
- [ ] Comprehensive test suite passing (>95% coverage)
- [ ] Performance benchmarks met
- [ ] Error handling and resilience validated
- [ ] Documentation complete and accurate
- [ ] MO coordination interface tested
- [ ] Security and input validation implemented

### Production Configuration

```typescript
// Production optimizations
const productionConfig = {
  ragConfig: {
    chunkSize: 600,
    topK: 8,
    scoreThreshold: 0.8,        // Higher threshold for production
    persistentStorage: true      // Enable persistent storage
  },
  performance: {
    cacheEnabled: true,
    batchProcessing: true,
    connectionPooling: true
  },
  monitoring: {
    metricsEnabled: true,
    alertThresholds: {
      responseTime: 5000,        // 5 second max
      errorRate: 0.05           // 5% max error rate
    }
  }
}
```

### Monitoring and Alerting

```typescript
// Production monitoring
if (responseTime > 5000) {
  this.alertManager.sendAlert({
    level: 'warning',
    message: `${this.config.name} response time exceeded threshold`,
    metrics: this.getMetrics()
  })
}

if (this.getMetrics().successRate < 0.95) {
  this.alertManager.sendAlert({
    level: 'critical', 
    message: `${this.config.name} success rate below threshold`,
    metrics: this.getMetrics()
  })
}
```

## Best Practices

### 1. Domain Expertise Implementation

- **Clear Boundaries** - Define what the agent can and cannot do
- **Quality Standards** - Implement comprehensive validation
- **Best Practices** - Encode domain best practices into tools
- **Error Handling** - Graceful degradation and helpful error messages

### 2. RAG Integration

- **Knowledge Curation** - High-quality, domain-specific content
- **Chunking Strategy** - Optimize for content type and query patterns
- **Embedding Quality** - Use appropriate models for technical content
- **Relevance Tuning** - Adjust thresholds based on domain requirements

### 3. Performance and Scalability

- **Caching** - Cache frequent queries and domain patterns
- **Async Processing** - Use async/await for all I/O operations
- **Resource Monitoring** - Track memory and compute usage
- **Graceful Degradation** - Fallback to traditional processing

### 4. Testing and Quality

- **Comprehensive Coverage** - Test all tools, integrations, and edge cases
- **Domain Validation** - Validate expertise and recommendations
- **Performance Testing** - Benchmark response times and resource usage
- **Integration Testing** - Test MO coordination and RAG integration

### 5. Documentation and Maintenance

- **Clear Documentation** - Comprehensive API and usage documentation
- **Examples** - Practical usage examples for each tool
- **Maintenance** - Regular updates to knowledge base and logic
- **Monitoring** - Production monitoring and alerting

## Troubleshooting

### Common Issues

1. **RAG Not Working**
   - Check embedding model availability
   - Verify knowledge base content
   - Validate chunk size and overlap settings
   - Test similarity search thresholds

2. **Low Confidence Scores**
   - Review domain relevance calculations
   - Optimize knowledge base content
   - Adjust scoring thresholds
   - Improve traditional processing fallbacks

3. **Performance Issues**
   - Profile tool execution times
   - Check RAG processing overhead
   - Optimize database queries
   - Implement caching strategies

4. **MO Coordination Problems**
   - Validate interface implementation
   - Check routing decision logic
   - Test response formatting
   - Verify task validation

### Debugging Tools

```typescript
// Enable debug logging
const debugMode = process.env.DEBUG_EXPERT_AGENTS === 'true'

if (debugMode) {
  console.log(`[${this.config.name}] Processing query:`, query)
  console.log(`[${this.config.name}] RAG response:`, ragResponse)
  console.log(`[${this.config.name}] Performance metrics:`, this.getMetrics())
}
```

## Future Enhancements

### Planned Features

1. **Advanced RAG** - Multi-modal knowledge integration
2. **Learning Capability** - Continuous improvement from interactions
3. **Cross-Agent Collaboration** - Direct expert-to-expert communication
4. **Domain Adaptation** - Dynamic expertise expansion
5. **Performance Optimization** - ML-based query optimization

### Extension Points

1. **Custom Tool Categories** - Domain-specific tool types
2. **Integration Adapters** - New external system connections
3. **Knowledge Sources** - Additional knowledge base types
4. **Coordination Patterns** - New MO coordination strategies
5. **Monitoring Extensions** - Advanced metrics and alerting

This guide provides comprehensive coverage for implementing production-ready expert agents using the standardized template. Follow the patterns and best practices outlined here to ensure consistent, high-quality implementations across your expert agent ecosystem.