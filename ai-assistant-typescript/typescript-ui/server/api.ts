import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';
import axios from 'axios';

const app = express();
const PORT = 8001;

// Middleware
app.use(cors());
app.use(express.json());

// Ollama configuration
const OLLAMA_API_URL = 'http://localhost:11434';
let ollamaProcess: any = null;

// Start Ollama process
function startOllama() {
  console.log('Starting Ollama...');
  ollamaProcess = spawn('ollama', ['serve'], {
    stdio: 'pipe'
  });

  ollamaProcess.stdout.on('data', (data: Buffer) => {
    console.log(`Ollama: ${data.toString()}`);
  });

  ollamaProcess.stderr.on('data', (data: Buffer) => {
    console.error(`Ollama Error: ${data.toString()}`);
  });

  ollamaProcess.on('close', (code: number) => {
    console.log(`Ollama process exited with code ${code}`);
  });
}

// Check if Ollama is running
async function checkOllama(): Promise<boolean> {
  try {
    const response = await axios.get(`${OLLAMA_API_URL}/api/tags`);
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

// Architecture Expert endpoints
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'TypeScript AI Assistant API' });
});

app.get('/api/agents', (req, res) => {
  res.json([
    {
      id: 'architecture-expert',
      name: 'Architecture Expert',
      description: 'AI agent specialized in TypeScript architecture and design patterns',
      status: 'active',
      capabilities: [
        'Code Architecture Analysis',
        'Design Pattern Recommendations',
        'Performance Optimization',
        'Best Practices Guidance'
      ]
    }
  ]);
});

app.get('/api/agents/architecture-expert', (req, res) => {
  res.json({
    id: 'architecture-expert',
    name: 'Architecture Expert',
    description: 'AI agent specialized in TypeScript architecture and design patterns',
    status: 'active',
    model: 'qwen3:14b',
    metrics: {
      totalAnalyses: 142,
      avgResponseTime: '2.3s',
      successRate: '98.5%',
      lastActive: new Date().toISOString()
    }
  });
});

app.post('/api/agents/architecture-expert/execute', async (req, res) => {
  const { task, context } = req.body;

  try {
    // Check if Ollama is available
    const ollamaRunning = await checkOllama();
    
    if (!ollamaRunning) {
      // Return a simulated response if Ollama is not running
      return res.json({
        task,
        analysis: `Architecture Analysis for: ${task}\n\nNote: Ollama is not currently running. This is a simulated response.\n\n` +
          `Based on TypeScript best practices, here are my recommendations:\n\n` +
          `1. **Code Structure**: Consider organizing your code into feature-based modules\n` +
          `2. **Type Safety**: Ensure all functions have proper type annotations\n` +
          `3. **Design Patterns**: Apply SOLID principles where applicable\n` +
          `4. **Performance**: Use lazy loading for large modules\n\n` +
          `Context considered: ${context || 'General TypeScript application'}`,
        recommendations: [
          'Use interfaces for type definitions',
          'Implement dependency injection for better testability',
          'Consider using a state management solution like Zustand or Redux',
          'Apply the Repository pattern for data access'
        ],
        timestamp: new Date().toISOString(),
        model: 'simulated',
        executionTime: '0.5s'
      });
    }

    // Call Ollama API for real analysis
    const prompt = `You are an Architecture Expert specializing in TypeScript and software design patterns.
    
Task: ${task}
Context: ${context || 'General TypeScript application'}

Please provide:
1. A detailed architecture analysis
2. Specific recommendations for improvement
3. Design pattern suggestions
4. Performance considerations

Format your response in a clear, professional manner.`;

    const response = await axios.post(`${OLLAMA_API_URL}/api/generate`, {
      model: 'qwen3:14b',
      prompt,
      stream: false
    });

    res.json({
      task,
      analysis: response.data.response,
      recommendations: [
        'Based on AI analysis - see detailed response above'
      ],
      timestamp: new Date().toISOString(),
      model: 'qwen3:14b',
      executionTime: `${response.data.total_duration / 1000000000}s`
    });

  } catch (error) {
    console.error('Error executing task:', error);
    res.status(500).json({
      error: 'Failed to execute task',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.get('/api/agents/architecture-expert/history', (req, res) => {
  // Mock history data
  res.json([
    {
      id: '1',
      task: 'Review microservices architecture',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      status: 'completed',
      executionTime: '3.2s'
    },
    {
      id: '2',
      task: 'Optimize React component structure',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      status: 'completed',
      executionTime: '2.8s'
    }
  ]);
});

// System stats endpoint
app.get('/api/system/stats', async (req, res) => {
  const ollamaRunning = await checkOllama();
  
  // Get list of available models if Ollama is running
  let models = [];
  if (ollamaRunning) {
    try {
      const response = await axios.get(`${OLLAMA_API_URL}/api/tags`);
      models = response.data.models?.map((m: any) => m.name) || ['qwen3:14b'];
    } catch (error) {
      models = ['qwen3:14b']; // Default to qwen3:14b
    }
  }
  
  res.json({
    ollama: {
      status: ollamaRunning ? 'running' : 'stopped',
      models: models,
      primaryModel: 'qwen3:14b'
    },
    api: {
      status: 'running',
      uptime: process.uptime(),
      memory: process.memoryUsage()
    }
  });
});

// Start server
app.listen(PORT, async () => {
  console.log(`TypeScript API Server running on http://localhost:${PORT}`);
  
  // Check if Ollama is already running
  const ollamaRunning = await checkOllama();
  if (!ollamaRunning) {
    console.log('Ollama not detected, starting...');
    startOllama();
  } else {
    console.log('Ollama is already running');
  }
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down gracefully...');
  if (ollamaProcess) {
    ollamaProcess.kill();
  }
  process.exit(0);
});