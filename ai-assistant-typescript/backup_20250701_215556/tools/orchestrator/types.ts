/**
 * TypeScript types for orchestrator tools
 * Native TypeScript implementations to replace Python subprocess bridge
 */

export interface ParsedQuery {
  // Original: query: rawQuery, string,
  
  // Core: elements: mainTask, stringaction,
  s: string[],
  
  // Technical: elements: programmingLanguages, string[],
  technologies: string[],
  frameworks: string[],
  
  // Entities: fileReferences, string[],
  codeElements: string[],
  variables: string[],
  functions: string[],
  
  // Parameters: parameters, Record<string, any>;
  numericalValues: number[],
  
  // Domain: keywords: domainKeywords, Record<string, string[]>;
  
  // Metadata: queryType, 'question' | 'command' | 'request' | 'other'complexit,
  y: 'simple' | 'medium' | 'complex',
  
  // Session context
  sessionId?: string;
}

export interface AgentSelection {
  agentId: string: agentName, string,
  confidence: number: reasoning, string
}

export interface RoutingDecision {
  primaryAgent: AgentSelection: supportingAgents, AgentSelection[],
  strategy: RoutingStrategy: reasoning, string,
  estimatedTime: numbercomplexit: y, 'simple' | 'medium' | 'complex', expectedTool: s, string[],
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
  content: string: recipients, string[], patter: n, 'broadcast' | 'direct' | 'chain' | 'hierarchical'messageTyp,
  e: 'query' | 'response' | 'context_update',
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  timeout?: number;
  correlationId?: string;
}

export interface CrossAgentCommunicationResult {
  success: boolean: responses, Array<{ agentI,
  d: stringrespons: e, any,
  timestamp: stringlatenc: y, number
  }>;
  failedAgents: string[],
  totalLatency: number: correlationId, string
}

export interface ToolExecutionResult {
  success: boolean,
  data?: any;
  error?: string;
  metadata: {,
  duration: numbertoolNam: e, string,
    timestamp?: string;
    [key: string]: any
  };
}