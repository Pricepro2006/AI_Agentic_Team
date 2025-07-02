/**
 * Example: N8N Webhook Server
 * This demonstrates how to set up an Express server with N8N webhook handling
 */

import express, { Application } from 'express';
import { ToolManager } from '../src/tools/base/ToolManager';
import { N8NIntegration, N8NIntegrationConfig } from '../src/services/n8n';
import { N8NWebhookHandler } from '../src/services/n8n/N8NWebhookHandler';
import { createLogger } from '../src/utils/logger';

async function createWebhookServer(): Promise<Application> {
  const logger = createLogger('WebhookServer');
  const app = express();
  
  // Middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  
  // Request logging
  app.use((req, res, next) => {
    logger.info('Incoming request', {
      method: req.method,
      path: req.path,
      ip: req.ip,
    });
    next();
  });
  
  // Initialize Tool Manager
  const toolManager = new ToolManager();
  
  // Configure N8N Integration
  const n8nConfig: N8NIntegrationConfig = {
    n8nHost: process.env.N8N_HOST || 'http://localhost:5678',
    n8nApiKey: process.env.N8N_API_KEY,
    workflowMappings: [
      {
        toolName: 'email_classifier',
        workflowId: 'email_workflow_001',
        webhookPath: 'classify-email',
        inputMapping: {
          'subject': 'email.subject',
          'body': 'email.body',
          'from': 'email.sender',
        },
        outputMapping: {
          'classification.category': 'category',
          'classification.confidence': 'confidence',
        },
        waitForCompletion: true,
      },
      {
        toolName: 'task_creator',
        workflowId: 'task_workflow_001',
        webhookPath: 'create-task',
        waitForCompletion: false,
      },
    ],
    autoRegisterTools: true,
  };
  
  // Create N8N Integration
  const n8nIntegration = new N8NIntegration(n8nConfig, toolManager);
  
  // Initialize integration
  await n8nIntegration.initialize();
  logger.info('N8N integration initialized');
  
  // Create webhook handler
  const webhookHandler = new N8NWebhookHandler(n8nIntegration, {
    webhookPath: '/webhook/n8n',
    authToken: process.env.WEBHOOK_AUTH_TOKEN,
    validatePayload: true,
  });
  
  // Mount webhook routes
  app.use(webhookHandler.getRouter());
  
  // Setup error handling for webhooks
  webhookHandler.setupErrorHandling();
  
  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        n8n: 'connected',
        tools: toolManager.getRegistryInfo().totalTools,
      },
    });
  });
  
  // Example endpoint to trigger a workflow
  app.post('/api/classify-email', async (req, res) => {
    try {
      const { subject, body, from } = req.body;
      
      if (!subject || !body) {
        return res.status(400).json({
          error: 'Missing required fields: subject, body',
        });
      }
      
      const result = await n8nIntegration.executeWorkflow(
        'email_classifier',
        { subject, body, from },
        {
          agent: 'EmailAPI',
          sessionId: req.headers['x-session-id'] as string || 'api-session',
          traceId: req.headers['x-trace-id'] as string || 'api-trace',
          metadata: {},
        }
      );
      
      res.json({
        success: result.status !== 'failed',
        result,
      });
    } catch (error) {
      logger.error('Failed to classify email', { error });
      res.status(500).json({
        error: 'Failed to process email classification',
      });
    }
  });
  
  // Example endpoint to create a task
  app.post('/api/create-task', async (req, res) => {
    try {
      const { title, description, assignee, priority } = req.body;
      
      if (!title) {
        return res.status(400).json({
          error: 'Missing required field: title',
        });
      }
      
      const result = await n8nIntegration.executeWorkflow(
        'task_creator',
        { title, description, assignee, priority },
        {
          agent: 'TaskAPI',
          sessionId: req.headers['x-session-id'] as string || 'api-session',
          traceId: req.headers['x-trace-id'] as string || 'api-trace',
          metadata: {},
        }
      );
      
      res.json({
        success: true,
        executionId: result.executionId,
        message: 'Task creation workflow started',
      });
    } catch (error) {
      logger.error('Failed to create task', { error });
      res.status(500).json({
        error: 'Failed to start task creation workflow',
      });
    }
  });
  
  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      error: 'Not found',
      path: req.path,
    });
  });
  
  // Error handler
  app.use((err: any, req: any, res: any, next: any) => {
    logger.error('Unhandled error', { error: err.message, stack: err.stack });
    res.status(500).json({
      error: 'Internal server error',
    });
  });
  
  return app;
}

// Start the server
async function startServer() {
  const logger = createLogger('Server');
  const port = process.env.PORT || 3000;
  
  try {
    const app = await createWebhookServer();
    
    const server = app.listen(port, () => {
      logger.info(`Server started on port ${port}`);
      logger.info('Webhook endpoints:');
      logger.info(`  - POST /webhook/n8n/:path`);
      logger.info(`  - GET  /webhook/n8n/health`);
      logger.info(`  - GET  /webhook/n8n/status/:executionId`);
      logger.info('API endpoints:');
      logger.info(`  - POST /api/classify-email`);
      logger.info(`  - POST /api/create-task`);
      logger.info(`  - GET  /health`);
    });
    
    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received, shutting down gracefully');
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    });
    
  } catch (error) {
    logger.error('Failed to start server', { error });
    process.exit(1);
  }
}

// Run if main module
if (require.main === module) {
  startServer();
}