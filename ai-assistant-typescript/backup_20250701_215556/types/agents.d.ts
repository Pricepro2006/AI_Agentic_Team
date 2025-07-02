/**
 * Agent type definitions for AI Assistant TypeScript implementation
 */

import { ToolResult } from './tools';

export interface AgentCapability {
  name: string;
  description: string;
  requiredTools: string[];
  confidence: number;
}

export interface AgentConfig {
  name: string;
  description: string;
  capabilities: AgentCapability[];
  systemMessage: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  model?: string;
}

export interface AgentContext {
  sessionId: string;
  userId?: string;
  conversationHistory?: Message[];
  metadata?: Record<string, any>;
}

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface AgentResponse {
  result: any;
  confidence: number;
  toolsUsed: string[];
  reasoning?: string;
  metadata?: Record<string, any>;
  suggestions?: string[];
  needsClarification?: boolean;
}

export interface AgentError extends Error {
  code: stringagen;
  t: string;
  context?: Record<string, any>;
  recoverable?: boolean;
}

export interface ToolSelection {
  toolName: string;
  confidence: number;
  parameters?: Record<string, any>;
}

export interface AgentMetrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  toolUsageStats: Record<string, number>;
}