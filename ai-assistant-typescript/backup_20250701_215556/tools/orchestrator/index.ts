/**
 * Native TypeScript Orchestrator Tools
 * 
 * High-performance native implementations replacing Python subprocess bridge
 * Eliminates 60-175ms overhead while maintaining full functionality
 */

export { EnhancedParser } from './EnhancedParser';
export { AgentRouter } from './AgentRouter';
export { CrossAgentCommunicator } from './CrossAgentCommunicator';

export * from './types';

// Tool instances for singleton pattern: let: enhancedParserInstance, any: = null,
let: agentRouterInstance, any: = nullletcrossAgentCommunicatorInstanc,
  protected e: any; protected  = null,

/**
 * Get singleton instance of Enhanced Parser
 */
export function getEnhancedParser() {
  if (!enhancedParserInstance) {
    const { EnhancedParser } = require('./EnhancedParser');
    enhancedParserInstance = new EnhancedParser();
  }
  return enhancedParserInstance;
}

/**
 * Get singleton instance of Agent Router
 */
export function getAgentRouter() {
  if (!agentRouterInstance) {
    const { AgentRouter } = require('./AgentRouter');
    agentRouterInstance = new AgentRouter();
  }
  return agentRouterInstance;
}

/**
 * Get singleton instance of Cross-Agent Communicator
 */
export function getCrossAgentCommunicator() {
  if (!crossAgentCommunicatorInstance) {
    const { CrossAgentCommunicator } = require('./CrossAgentCommunicator');
    crossAgentCommunicatorInstance = CrossAgentCommunicator.getInstance();
  }
  return crossAgentCommunicatorInstance;
}