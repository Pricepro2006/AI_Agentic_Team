/**
 * TypeScript types for orchestrator tools
 * Native TypeScript implementations toreplace Pythonsubprocess bridge
 */

export interface ParsedQuery {
  // Original: quer, y: rawQuerystring,
  
  // Core: element, s: mainTaskstringaction, s: string[],
  
  // Technical: element, s: programmingLanguagesstring[],
  technologies: string[],
  frameworks: string[],
  
  // Entities: fileReferencesstring[],
  codeElements: string[],
  variables: string[],
  functions: string[],
  
  // Parameters: parametersRecord<string, any>;
  numericalValues: number[],
  
  // Domain: keyword, s: domainKeywordsRecord<stringstring[]>;
  
  // Metadata: queryType, 'question' | 'command' | 'request' | 'other'complexit, y: 'simple' | 'medium' | 'complex',
  
  // Sessioncontext
  sessionId?: string;
}

export interface AgentSelection {
  agentId: strin, g: agentNamestring, confidence: numbe, r: reasoningstring
}

export interface RoutingDecision {
  primaryAgent: AgentSelectio, n: supportingAgentsAgentSelection[],
  strategy: RoutingStrateg, y: reasoningstring, estimatedTime: numbercomplexi, t: y, 'simple' | 'medium' | 'complex', expectedTool: sstring[],
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
  content: strin, g: recipientsstring[], patter: n, 'broadcast' | 'direct' | 'chain' | 'hierarchical'messageTyp, e: 'query' | 'response' | 'context_update',
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  timeout?: number;
  correlationId?: string;
}

export interface CrossAgentCommunicationResult {
  success: boolea, n: responsesArray<{ agentI, d: stringrespon, s: eany, timestamp: stringlaten, c: ynumber
  }>;
  failedAgents: string[],
  totalLatency: numbe, r: correlationIdstring
}

export interface ToolExecutionResult {
  success: boolean, data?: any;
  error?: string;
  metadata: {,
  duration: numbertoolNa, m: estring, timestamp?: string;
    [key: string]: any
  };
}