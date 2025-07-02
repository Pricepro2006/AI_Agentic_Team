# N8N Integration Guide

This guide explains how to integrate N8N workflow automation with the AI Assistant TypeScript system.

## Overview

The N8N integration allows AI agents to trigger workflows and receive webhook callbacks, enabling seamless automation between the AI system and external services.

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  AI Agent   │────▶│ N8N Client   │────▶│ N8N Server  │
└─────────────┘     └──────────────┘     └─────────────┘
       │                    │                     │
       │                    │                     │
       ▼                    ▼                     ▼
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│Tool Manager │     │ Integration  │     │  Workflows  │
└─────────────┘     └──────────────┘     └─────────────┘
```

## Components

### 1. N8NClient
Low-level client for N8N API communication.

**Features:**
- Authentication (API key or username/password)
- Workflow management (list, get, activate, deactivate)
- Execution management (execute, monitor, wait)
- Webhook triggering
- Error handling with retry logic

### 2. N8NIntegration
High-level integration service that bridges AI agents with N8N workflows.

**Features:**
- Tool-to-workflow mapping
- Input/output transformation
- Event-driven architecture
- Automatic workflow activation
- Agent registration

### 3. N8NWebhookHandler
Express middleware for handling N8N webhook callbacks.

**Features:**
- Webhook authentication
- Request validation
- Payload security checks
- Status endpoints
- Error handling

## Configuration

### Basic Configuration

```typescript
const n8nConfig: N8NIntegrationConfig = {
  n8nHost: 'http://localhost:5678',
  n8nApiKey: 'your-api-key',
  workflowMappings: [
    {
      toolName: 'email_processor',
      workflowId: 'workflow_123',
      webhookPath: 'email-webhook',
      waitForCompletion: true,
    }
  ],
  autoRegisterTools: true,
};
```

### Workflow Mapping

Each workflow mapping defines how a tool maps to an N8N workflow:

```typescript
{
  toolName: string;           // Name of the tool
  workflowId: string;         // N8N workflow ID
  webhookPath?: string;       // Webhook path for callbacks
  inputMapping?: {            // Map tool params to workflow inputs
    [key: string]: string;
  };
  outputMapping?: {           // Map workflow outputs to tool results
    [key: string]: string;
  };
  waitForCompletion?: boolean; // Wait for workflow to complete
}
```

### Input/Output Mapping

Transform data between tool parameters and workflow inputs:

```typescript
inputMapping: {
  'email.subject': 'data.subject',      // tool.email.subject → workflow.data.subject
  'email.body': 'data.content',         // tool.email.body → workflow.data.content
  'metadata.priority': 'priority',      // tool.metadata.priority → workflow.priority
}
```

## Usage Examples

### 1. Initialize Integration

```typescript
import { ToolManager } from '@tools/base/ToolManager';
import { N8NIntegration } from '@services/n8n';

const toolManager = new ToolManager();
const n8nIntegration = new N8NIntegration(config, toolManager);

await n8nIntegration.initialize();
```

### 2. Execute Workflow

```typescript
const result = await n8nIntegration.executeWorkflow(
  'email_processor',
  {
    subject: 'Important Email',
    body: 'This is the email content',
    from: 'sender@example.com',
  },
  {
    agent: 'EmailAgent',
    sessionId: 'session-123',
    traceId: 'trace-456',
    metadata: {},
  }
);
```

### 3. Handle Webhooks

```typescript
import express from 'express';
import { N8NWebhookHandler } from '@services/n8n/N8NWebhookHandler';

const app = express();
const webhookHandler = new N8NWebhookHandler(n8nIntegration, {
  webhookPath: '/webhook/n8n',
  authToken: 'secret-token',
});

app.use(webhookHandler.getRouter());
```

### 4. Register Agent

```typescript
import { BaseAgent } from '@agents/base/BaseAgent';

const agent = new MyCustomAgent();
n8nIntegration.registerAgent(agent);

// Agent tool executions will now trigger workflows automatically
```

## Webhook Integration

### Webhook URLs

When N8N workflows need to send data back, use these webhook endpoints:

- `POST /webhook/n8n/:path` - Main webhook endpoint
- `GET /webhook/n8n/status/:executionId` - Check execution status
- `GET /webhook/n8n/health` - Health check

### Webhook Authentication

Include authentication token in requests:

```bash
curl -X POST http://localhost:3000/webhook/n8n/email-webhook \
  -H "X-Webhook-Token: your-secret-token" \
  -H "Content-Type: application/json" \
  -d '{"executionId": "exec-123", "data": {...}}'
```

## Error Handling

The integration includes comprehensive error handling:

### Error Types

1. **Connection Errors** - Cannot reach N8N server
2. **Authentication Errors** - Invalid credentials
3. **Workflow Errors** - Workflow not found or failed
4. **Timeout Errors** - Execution timeout
5. **Rate Limit Errors** - Too many requests

### Retry Logic

Automatic retry with exponential backoff for:
- Connection failures
- Timeout errors
- Rate limiting

```typescript
@Retry(3, 1000, 2, [ErrorCode.LLM_TIMEOUT, ErrorCode.LLM_CONNECTION_FAILED])
async executeWorkflow(...) {
  // Automatic retry logic
}
```

## Events

The integration emits various events:

```typescript
n8nIntegration.on('workflow:started', (event) => {
  console.log('Workflow started:', event.workflowId);
});

n8nIntegration.on('webhook:received', (event) => {
  console.log('Webhook received:', event.path);
});

n8nIntegration.on('initialized', (event) => {
  console.log('Integration ready:', event.workflows);
});
```

## Best Practices

### 1. Workflow Design

- Keep workflows modular and focused
- Use webhook nodes for async communication
- Include error handling in workflows
- Add logging nodes for debugging

### 2. Security

- Use API keys for authentication
- Validate all webhook payloads
- Implement rate limiting
- Use HTTPS in production

### 3. Performance

- Use async workflows for long-running tasks
- Implement proper timeout handling
- Monitor execution times
- Clean up old executions

### 4. Error Recovery

- Implement retry logic in workflows
- Use dead letter queues
- Log all errors for debugging
- Provide fallback mechanisms

## Testing

### Unit Tests

```typescript
import { N8NIntegration } from '@services/n8n';
import { N8NClient } from '@services/n8n/N8NClient';

jest.mock('@services/n8n/N8NClient');

describe('N8NIntegration', () => {
  it('should execute workflow successfully', async () => {
    // Test implementation
  });
});
```

### Integration Tests

```typescript
// Test with real N8N instance
const integration = new N8NIntegration(config, toolManager);
await integration.initialize();

const result = await integration.executeWorkflow('test_workflow', {}, context);
expect(result.status).toBe('success');
```

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Check N8N server is running
   - Verify host and port settings
   - Check firewall rules

2. **Authentication Failed**
   - Verify API key is correct
   - Check user permissions in N8N
   - Ensure API is enabled in N8N

3. **Workflow Not Found**
   - Verify workflow ID is correct
   - Check workflow exists in N8N
   - Ensure workflow is not deleted

4. **Timeout Errors**
   - Increase timeout settings
   - Check workflow complexity
   - Monitor N8N server resources

### Debug Mode

Enable debug logging:

```typescript
process.env.LOG_LEVEL = 'debug';
```

Check N8N logs:
```bash
docker logs n8n
```

## Migration from Python

If migrating from the Python implementation:

1. **Tool Names** - Keep the same tool names for consistency
2. **Workflow IDs** - Use existing workflow IDs
3. **Webhook Paths** - Maintain the same webhook paths
4. **Data Formats** - Ensure compatible data structures

## Resources

- [N8N Documentation](https://docs.n8n.io/)
- [N8N API Reference](https://docs.n8n.io/api/)
- [N8N Workflow Examples](https://n8n.io/workflows/)
- [TypeScript AI Assistant Docs](../README.md)