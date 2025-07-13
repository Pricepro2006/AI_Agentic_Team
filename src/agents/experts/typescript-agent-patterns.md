# TypeScript Agent Interface Patterns for Multi-Agent Systems

## Introduction

Agent interface patterns are architectural blueprints for building AI-powered systems where autonomous agents collaborate to solve complex tasks. In TypeScript, these patterns provide type-safe, modular approaches to creating scalable multi-agent applications that can leverage Large Language Models (LLMs), external tools, and maintain contextual awareness across interactions.

## Core Agent Interface Patterns

### 1. Base Agent Interface

The foundation of any agent system starts with a well-defined agent interface:

```typescript
interface Agent {
  name: string;
  description: string;
  model: string;
  llm: LanguageModelInterface;
  tools?: Tool[];
  memory?: MemorySystem;
  
  // Core methods
  processQuery: (query: string) => AsyncGenerator<Message>;
  initialize?: () => Promise<void>;
  cleanup?: () => Promise<void>;
}

// Message types for agent communication
type Role = 'system' | 'user' | 'assistant' | 'tool';
type Message = {
  role: Role;
  content: string;
  name?: string; // For tool messages
  toolCallId?: string; // Links tool responses to requests
};
```

### 2. Tool Definition Pattern

Tools extend agent capabilities by allowing interaction with external systems:

```typescript
interface Tool {
  name: string;
  description: string;
  parameters: object; // JSON Schema for validation
  execute: (args: Record<string, unknown>) => Promise<unknown>;
}

// Example: Calculator Tool
const calculatorTool: Tool = {
  name: 'calculator',
  description: 'Perform arithmetic calculations',
  parameters: {
    type: 'object',
    properties: {
      expression: {
        type: 'string',
        description: 'Math expression to evaluate (e.g., "2 + 2")'
      }
    },
    required: ['expression']
  },
  execute: async ({ expression }) => {
    // Safe evaluation implementation
    return { result: evaluateExpression(expression as string) };
  }
};

// Example: Weather API Tool
const weatherTool: Tool = {
  name: 'get_weather',
  description: 'Get current weather for a location',
  parameters: {
    type: 'object',
    properties: {
      location: {
        type: 'string',
        description: 'City name (e.g., "New York")'
      },
      unit: {
        type: 'string',
        enum: ['celsius', 'fahrenheit'],
        default: 'celsius'
      }
    },
    required: ['location']
  },
  execute: async ({ location, unit }) => {
    const weather = await fetchWeatherAPI(location as string, unit as string);
    return weather;
  }
};
```

### 3. Multi-Agent Orchestration Patterns

#### Sequential Pipeline Pattern
Agents process tasks in sequence, with each agent's output feeding the next:

```typescript
interface Pipeline {
  agents: Agent[];
  execute: (input: string) => Promise<string>;
}

class SequentialPipeline implements Pipeline {
  constructor(public agents: Agent[]) {}
  
  async execute(input: string): Promise<string> {
    let result = input;
    for (const agent of this.agents) {
      const response = agent.processQuery(result);
      let finalContent = '';
      for await (const message of response) {
        if (message.role === 'assistant') {
          finalContent = message.content;
        }
      }
      result = finalContent;
    }
    return result;
  }
}
```

#### Parallel Execution Pattern
Multiple agents work simultaneously for faster processing or diverse perspectives:

```typescript
interface ParallelAgentSystem {
  agents: Agent[];
  executeParallel: (task: Task) => Promise<Result[]>;
  voting?: (results: Result[]) => Result;
}

class ParallelExecutor implements ParallelAgentSystem {
  constructor(
    public agents: Agent[],
    public voting?: (results: Result[]) => Result
  ) {}
  
  async executeParallel(task: Task): Promise<Result[]> {
    const promises = this.agents.map(agent => 
      this.executeAgent(agent, task)
    );
    
    const results = await Promise.all(promises);
    
    if (this.voting) {
      return [this.voting(results)];
    }
    
    return results;
  }
  
  private async executeAgent(agent: Agent, task: Task): Promise<Result> {
    // Agent execution logic
  }
}
```

#### Supervisor-Worker Pattern
A supervisor agent delegates tasks to specialized worker agents:

```typescript
interface SupervisorAgent extends Agent {
  subAgents: Map<string, Agent>;
  routingStrategy: RoutingStrategy;
  
  delegateTask: (task: ComplexTask) => Promise<TaskAssignment[]>;
  aggregateResults: (results: WorkerResult[]) => FinalResult;
}

class Supervisor implements SupervisorAgent {
  constructor(
    baseConfig: AgentConfig,
    public subAgents: Map<string, Agent>,
    public routingStrategy: RoutingStrategy
  ) {
    super(baseConfig);
  }
  
  async delegateTask(task: ComplexTask): Promise<TaskAssignment[]> {
    // Analyze task and determine which agents to use
    const analysis = await this.analyzeTask(task);
    const assignments: TaskAssignment[] = [];
    
    for (const subtask of analysis.subtasks) {
      const bestAgent = this.routingStrategy.selectAgent(
        subtask,
        this.subAgents
      );
      assignments.push({
        agent: bestAgent,
        task: subtask
      });
    }
    
    return assignments;
  }
}
```

### 4. Language Model Interface Pattern

Abstract LLM provider differences with a unified interface:

```typescript
interface LanguageModelInterface {
  generateResponse(
    messages: Message[],
    options?: {
      temperature?: number;
      maxTokens?: number;
      toolChoice?: 'auto' | 'none' | { name: string };
    }
  ): AsyncGenerator<LLMResponse>;
}

// Response types
type LLMResponse = string | ToolCall;
type ToolCall = {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
};

// Provider configuration
type LLMConfig = {
  provider: 'openai' | 'anthropic' | 'google' | 'custom';
  model: string;
  apiKey: string;
  baseURL?: string;
  defaultOptions?: LLMOptions;
};

// Factory pattern for provider creation
const createLanguageModelInterface = (
  config: LLMConfig
): LanguageModelInterface => {
  switch (config.provider) {
    case 'openai':
      return new OpenAIProvider(config);
    case 'anthropic':
      return new AnthropicProvider(config);
    case 'google':
      return new GoogleProvider(config);
    default:
      throw new Error(`Unsupported provider: ${config.provider}`);
  }
};
```

### 5. Memory System Pattern

Enable agents to maintain context across interactions:

```typescript
interface MemorySystem {
  // Basic operations
  getMessages(): Message[];
  addMessage(message: Message): void;
  clear(): void;
  
  // Advanced features
  getContext(maxTokens?: number): Message[];
  summarize?(): Promise<string>;
  
  // Vector storage for RAG
  embedAndStore?: (content: string, metadata?: any) => Promise<void>;
  retrieve?: (query: string, k?: number) => Promise<Document[]>;
}

// Simple in-memory implementation
class InMemorySystem implements MemorySystem {
  private messages: Message[] = [];
  
  getMessages(): Message[] {
    return [...this.messages];
  }
  
  addMessage(message: Message): void {
    this.messages.push(message);
  }
  
  clear(): void {
    this.messages = [];
  }
  
  getContext(maxTokens: number = 4000): Message[] {
    // Return recent messages within token limit
    let tokenCount = 0;
    const context: Message[] = [];
    
    for (let i = this.messages.length - 1; i >= 0; i--) {
      const message = this.messages[i];
      const messageTokens = this.estimateTokens(message.content);
      
      if (tokenCount + messageTokens > maxTokens) break;
      
      context.unshift(message);
      tokenCount += messageTokens;
    }
    
    return context;
  }
  
  private estimateTokens(text: string): number {
    // Rough estimation: 1 token ≈ 4 characters
    return Math.ceil(text.length / 4);
  }
}

// Persistent memory with vector storage
class VectorMemorySystem extends InMemorySystem {
  constructor(
    private vectorStore: VectorStore,
    private embedder: Embedder
  ) {
    super();
  }
  
  async embedAndStore(content: string, metadata?: any): Promise<void> {
    const embedding = await this.embedder.embed(content);
    await this.vectorStore.insert({
      content,
      embedding,
      metadata: {
        ...metadata,
        timestamp: new Date().toISOString()
      }
    });
  }
  
  async retrieve(query: string, k: number = 5): Promise<Document[]> {
    const queryEmbedding = await this.embedder.embed(query);
    return this.vectorStore.search(queryEmbedding, k);
  }
}
```

### 6. Tool Executor Pattern

Centralized tool management with validation and error handling:

```typescript
interface ToolExecutor {
  listTools(): Tool[];
  executeTool(name: string, args: Record<string, unknown>): Promise<ToolResult>;
  registerTool(tool: Tool): void;
  unregisterTool(name: string): void;
}

type ToolResult = {
  result: unknown;
  error?: string;
  executionTime?: number;
};

class ToolExecutorImpl implements ToolExecutor {
  private tools: Map<string, Tool> = new Map();
  private validator: Ajv;
  
  constructor() {
    this.validator = new Ajv({ allErrors: true });
  }
  
  registerTool(tool: Tool): void {
    // Validate tool schema
    const valid = this.validator.validateSchema(tool.parameters);
    if (!valid) {
      throw new Error(
        `Invalid tool schema: ${this.validator.errorsText()}`
      );
    }
    
    this.tools.set(tool.name, tool);
  }
  
  listTools(): Tool[] {
    return Array.from(this.tools.values());
  }
  
  async executeTool(
    name: string, 
    args: Record<string, unknown>
  ): Promise<ToolResult> {
    const startTime = Date.now();
    
    const tool = this.tools.get(name);
    if (!tool) {
      return {
        result: null,
        error: `Tool "${name}" not found`
      };
    }
    
    // Validate arguments
    const validate = this.validator.compile(tool.parameters);
    if (!validate(args)) {
      return {
        result: null,
        error: `Invalid arguments: ${this.validator.errorsText(validate.errors)}`
      };
    }
    
    try {
      const result = await tool.execute(args);
      return {
        result,
        executionTime: Date.now() - startTime
      };
    } catch (error) {
      return {
        result: null,
        error: error instanceof Error ? error.message : 'Unknown error',
        executionTime: Date.now() - startTime
      };
    }
  }
  
  unregisterTool(name: string): void {
    this.tools.delete(name);
  }
}
```

## Popular TypeScript Agent Frameworks

### 1. Mastra

Mastra is a modern TypeScript agent framework designed for cloud deployment with excellent developer experience. Key features include:

- **Agent Networks**: Automatically route and execute complex multi-agent tasks
- **Cloud-Native**: Built for deployment from day one
- **Clean DX**: Beautiful CLI and developer tools
- **Example Usage**:

```typescript
import { Agent } from '@mastra/core';

const agent = new Agent({
  name: "researcher",
  model: "gpt-4",
  description: "Conducts research and analysis",
  tools: [webSearchTool, summarizerTool]
});
```

### 2. VoltAgent

An open-source TypeScript framework with modular building blocks:

- **Multi-Agent Systems**: Supervisor agents coordinating specialized sub-agents
- **MCP Support**: Model Context Protocol for standardized tool interactions
- **Visual Monitoring**: VoltAgent Console for debugging and performance tracking
- **Example**:

```typescript
import { VoltAgent, Agent } from "@voltagent/core";
import { VercelAIProvider } from "@voltagent/vercel-ai";

const agent = new Agent({
  name: "assistant",
  description: "A helpful AI assistant",
  llm: new VercelAIProvider(),
  model: openai("gpt-4"),
  tools: [calculatorTool]
});

new VoltAgent({
  agents: { agent }
});
```

### 3. TypeScript ADK (Agent Development Kit)

Provides a flexible toolkit for building modular agents:

- **Pipeline Support**: Sequential and parallel agent orchestration
- **Graph-Based Workflows**: LangGraph integration for complex flows
- **Extensive Examples**: From simple agents to complex multi-agent systems

```typescript
import { Agent, LLMRegistry } from '@pontus-devoteam/adk';
import { OpenAILLM } from '@pontus-devoteam/adk/llm';

LLMRegistry.registerLLM(OpenAILLM);

const researchAgent = new Agent({
  name: "researcher",
  model: "gpt-3.5-turbo",
  description: "Conducts research",
  systemPrompt: "You are a research assistant..."
});
```

### 4. LlamaIndex.TS

TypeScript implementation of the popular LlamaIndex framework:

- **FunctionTool Class**: Type-safe tool creation with JSON schemas
- **OpenAIAgent**: Built-in agent orchestration
- **RAG Support**: Vector stores and document processing

```typescript
import { OpenAIAgent, FunctionTool } from "llamaindex";

const sumFunctionTool = new FunctionTool(sum, {
  name: "sum",
  description: "Add two numbers",
  parameters: {
    type: "object",
    properties: {
      a: { type: "number", description: "First number" },
      b: { type: "number", description: "Second number" }
    },
    required: ["a", "b"]
  }
});

const agent = new OpenAIAgent({
  tools: [sumFunctionTool]
});
```

## Best Practices

### 1. Type Safety
- Use TypeScript's type system extensively
- Define clear interfaces for all components
- Leverage generics for reusable patterns

### 2. Modular Design
- Keep agents, tools, and memory systems as separate modules
- Use dependency injection for flexibility
- Follow single responsibility principle

### 3. Error Handling
```typescript
class RobustAgent {
  async processWithRetry(
    query: string, 
    maxRetries: number = 3
  ): Promise<Result> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await this.process(query);
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await this.delay(Math.pow(2, i) * 1000); // Exponential backoff
      }
    }
  }
}
```

### 4. Streaming Support
Use AsyncGenerators for real-time response streaming:
```typescript
async function* streamResponse(llm: LLM, prompt: string) {
  const stream = await llm.streamCompletion(prompt);
  for await (const chunk of stream) {
    yield chunk;
  }
}
```

### 5. Provider Abstraction
Always abstract LLM providers to allow easy switching:
```typescript
interface LLMProvider {
  name: string;
  complete(prompt: string, options?: any): Promise<string>;
  stream(prompt: string, options?: any): AsyncGenerator<string>;
}
```

### 6. Validation
Use JSON Schema with libraries like Ajv for robust parameter validation:
```typescript
import Ajv from 'ajv';

const ajv = new Ajv();
const validate = ajv.compile(toolSchema);

if (!validate(input)) {
  throw new ValidationError(ajv.errorsText(validate.errors));
}
```

### 7. Testing
Design with dependency injection for easy unit testing:
```typescript
describe('Agent', () => {
  it('should process query correctly', async () => {
    const mockLLM = createMockLLM();
    const mockTools = createMockTools();
    
    const agent = new Agent({
      llm: mockLLM,
      tools: mockTools
    });
    
    const result = await agent.process('test query');
    expect(result).toBeDefined();
  });
});
```

### 8. Observability
Implement comprehensive logging and monitoring:
```typescript
class ObservableAgent extends Agent {
  async process(query: string): Promise<Result> {
    const traceId = generateTraceId();
    this.logger.info('Processing query', { traceId, query });
    
    const startTime = Date.now();
    try {
      const result = await super.process(query);
      this.metrics.recordSuccess(Date.now() - startTime);
      return result;
    } catch (error) {
      this.metrics.recordError();
      this.logger.error('Processing failed', { traceId, error });
      throw error;
    }
  }
}
```

## References and Resources

- [Mastra Documentation](https://mastra.ai/docs)
- [VoltAgent GitHub](https://github.com/VoltAgent/voltagent)
- [TypeScript ADK on Medium](https://medium.com/@pontus.espe.walletin)
- [LlamaIndex.TS Documentation](https://ts.llamaindex.ai/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)
- [LangChain TypeScript](https://js.langchain.com/)
- [Vercel AI SDK](https://sdk.vercel.ai/)

---

## Document Metadata

- **Created Date**: January 6, 2025
- **Conversation ID**: [To be added]
- **Last Updated**: January 6, 2025
- **Author**: AI Assistant (Claude)
- **Topics**: TypeScript, AI Agents, Multi-Agent Systems, Agent Patterns, LLM Integration, Software Architecture
- **Version**: 1.0