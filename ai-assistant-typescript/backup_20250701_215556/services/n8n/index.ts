/**
 * N8N Integration exports
 */

export { N8NClient } from './N8NClient';
export type { 
  N8NConfig,
  WorkflowInfo,
  WorkflowExecution,
  WebhookData,
  ExecutionData
} from './N8NClient';

export { N8NIntegration } from './N8NIntegration';
export type {
  N8NIntegrationConfig,
  WorkflowMapping,
  WorkflowTrigger,
  WorkflowResult
} from './N8NIntegration';