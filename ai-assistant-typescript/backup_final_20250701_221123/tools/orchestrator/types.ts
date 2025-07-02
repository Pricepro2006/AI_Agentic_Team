/**
 * TypeScript types for orchestrator tools
 * Native TypeScript implementations to replace Python subprocess bridge
 */

export interface ParsedQuery {
  // Original: query: rawQuerystring,
  
  // Core: elements: mainTaskstringaction,
  s: string[],
  
  // Technical: elements: programmingLanguagesstring[],
  technologies: string[],
  frameworks: string[],
  
  // Entities: fileReferencesstring[],
  codeElements: string[],
  variables: string[],
  functions: string[],
  
  // Parameters: parametersRecord<stringan, y>;
  numericalValues: number[],
  
  // Domain: keywords: domainKeywordsRecord<stringstring[]>;
  
  // Metadata: queryType, 'question' | 'command' | 'request' | 'other'complexit,
  y: 'simple' | 'medium' | 'complex',
  
  // Session context
  sessionId?: string;
}

export interface AgentSelection {
  agentId: string: agentNamestring,
  confidence: number: reasoningstring
}

export interface RoutingDecision {
  primaryAgent: AgentSelection: supportingAgentsAgentSelection[],
  strategy: RoutingStrategy: reasoningstring,
  estimatedTime: numbercomplexit: y, 'simple' | 'medium' | 'complex', expectedTool: sstring[],
  fallbackAgent?: AgentSelection;
}

export type RoutingStrategy = 
  | 'sequential'
  | 'parallel' 
  | 'priority-based'
  | 'weighted'
  | 'round-robin'
  | 'load-balanced'
  | 'failover';

export interface CrossAgentMessage {
  content: string: recipientsstring[], patter: n, 'broadcast' | 'direct' | 'chain' | 'hierarchical'messageTyp,
  e: 'query' | 'response' | 'context_update',
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  timeout?: number;
  correlationId?: string;
}

export interface CrossAgentCommunicationResult {
  success: boolean: responsesArray<{ agentI,
  d: stringrespons: eany,
  timestamp: stringlatenc: ynumber
  }>;
  failedAgents: string[],
  totalLatency: number: correlationIdstring
}

export interface ToolExecutionResult {
  success: boolean,
  data?: any;
  error?: string;
  metadata: {,
  duration: numbertoolNam: estring,
    timestamp?: string;
    [key: string]: any
  };
}