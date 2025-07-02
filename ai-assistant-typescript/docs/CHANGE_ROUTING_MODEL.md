# How to Change the Routing Model

The current routing system uses the following models:
- **ExpertRouter**: Uses `llama2` for AI-powered routing decisions
- **MasterOrchestrator**: Uses `mistral:latest` for AI tools

## To change to qwen 14B:

### 1. Update ExpertRouter
In `src/orchestration/ExpertRouter.ts`, line 216:
```typescript
// Current:
model: 'llama2'

// Change to:
model: 'qwen:14b'
```

### 2. Update MasterOrchestrator (optional)
In `src/agents/experts/MasterOrchestrator.ts`, line 186:
```typescript
// Current:
defaultModel: 'mistral:latest'

// Change to:
defaultModel: 'qwen:14b'
```

### 3. Ensure qwen:14b is installed in Ollama
```bash
ollama pull qwen:14b
```

## Model Comparison

| Model | Size | Speed | Quality | Memory Usage |
|-------|------|-------|---------|--------------|
| llama2 | 7B | Fast | Good | ~4GB |
| mistral:latest | 7B | Fast | Good | ~4GB |
| qwen:14b | 14B | Medium | Excellent | ~8GB |

## Benefits of qwen:14b for routing:
- Better understanding of complex queries
- More accurate expert selection
- Improved multi-expert coordination
- Better handling of ambiguous requests

## Performance Considerations:
- qwen:14b requires more memory (~8GB vs ~4GB)
- Slightly slower response times (but more accurate)
- May require GPU for optimal performance

## Configuration for Optimal Performance with qwen:14b

Update the ExpertRouter constructor to optimize for the larger model:

```typescript
constructor() {
  this.ollamaService = new OllamaService({
    defaultModel: 'qwen:14b',
    timeout: 45000,  // Increase timeout for larger model
    temperature: 0.2, // Lower temperature for more consistent routing
    maxTokens: 2048,  // Adjust based on needs
    numCtx: 4096      // Context window size
  })
}
```