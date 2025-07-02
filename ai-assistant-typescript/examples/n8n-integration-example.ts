/**
 * Example: Using N8N Integration with AI Assistant
 * This demonstrates how to integrate N8N workflows with AI agents
 */

import { ToolManager } from '../src/tools/base/ToolManager';
import { N8NIntegration, N8NIntegrationConfig } from '../src/services/n8n';
import { CrossAgentCommunicator } from '../src/tools/implementations/orchestrator/CrossAgentCommunicator';
import { createLogger } from '../src/utils/logger';

async function main() {
  const logger = createLogger('N8NExample');
  
  try {
    // 1. Initialize Tool Manager
    const toolManager = new ToolManager();
    
    // 2. Register some tools
    const communicator = new CrossAgentCommunicator();
    toolManager.registerTool(communicator);
    
    logger.info('Tool Manager initialized', {
      totalTools: toolManager.getRegistryInfo().totalTools,
    });
    
    // 3. Configure N8N Integration
    const n8nConfig: N8NIntegrationConfig = {
      n8nHost: process.env.N8N_HOST || 'http://localhost:5678',
      n8nApiKey: process.env.N8N_API_KEY,
      workflowMappings: [
        {
          // Map the cross-agent communicator to an N8N workflow
          toolName: 'cross_agent_communicator',
          workflowId: 'workflow_001', // Replace with your actual workflow ID
          webhookPath: 'agent-message',
          inputMapping: {
            'sourceAgent': 'data.source',
            'targetAgent': 'data.target',
            'message': 'data.message',
          },
          outputMapping: {
            'data.deliveryStatus': 'status',
            'data.timestamp': 'deliveredAt',
          },
          waitForCompletion: true,
        },
        {
          // Example of async workflow
          toolName: 'data_processor',
          workflowId: 'workflow_002',
          webhookPath: 'process-data',
          waitForCompletion: false,
        },
      ],
      webhookPrefix: '/n8n',
      autoRegisterTools: true, // Auto-register workflow tools
    };
    
    // 4. Create N8N Integration
    const n8nIntegration = new N8NIntegration(n8nConfig, toolManager);
    
    // 5. Initialize the integration
    logger.info('Initializing N8N integration...');
    await n8nIntegration.initialize();
    logger.info('N8N integration initialized successfully');
    
    // 6. Example: Execute a workflow through a tool
    const context = {
      agent: 'ExampleAgent',
      sessionId: 'example-session',
      traceId: 'example-trace',
      metadata: {},
    };
    
    logger.info('Executing workflow through tool...');
    const result = await n8nIntegration.executeWorkflow(
      'cross_agent_communicator',
      {
        sourceAgent: 'Agent1',
        targetAgent: 'Agent2',
        message: 'Hello from TypeScript integration!',
        priority: 'high',
      },
      context
    );
    
    logger.info('Workflow execution result:', result);
    
    // 7. Example: Handle webhook (simulated)
    logger.info('Simulating webhook handling...');
    const webhookResult = await n8nIntegration.handleWebhook(
      'agent-message',
      'POST',
      {
        executionId: result.executionId,
        status: 'completed',
        data: {
          deliveryStatus: 'delivered',
          timestamp: new Date().toISOString(),
        },
      }
    );
    
    logger.info('Webhook handled:', webhookResult);
    
    // 8. Listen for events
    n8nIntegration.on('workflow:started', (event) => {
      logger.info('Workflow started:', event);
    });
    
    n8nIntegration.on('webhook:received', (event) => {
      logger.info('Webhook received:', event);
    });
    
    // 9. Example: Get workflow status
    if (result.executionId !== 'error') {
      const status = await n8nIntegration.getWorkflowStatus(result.executionId);
      logger.info('Workflow status:', status);
    }
    
  } catch (error) {
    logger.error('Example failed:', error);
    process.exit(1);
  }
}

// Run the example
if (require.main === module) {
  main()
    .then(() => {
      console.log('✅ N8N integration example completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Example failed:', error);
      process.exit(1);
    });
}