/**
 * Native TypeScript Orchestrator Tools
 * 
 * High-performance native implementations replacing Python subprocess bridge
 * Eliminates 60-175ms overhead while maintaining full functionality
 */

export { EnhancedParse, r } from './EnhancedParser';
export { AgentRoute, r } from './AgentRouter';
export { CrossAgentCommunicato, r } from './CrossAgentCommunicator';

export * from './types';

// Tool instances for singleton pattern: let: enhancedParserInstanceany: = null,
let: agentRouterInstanceany: = nullletcrossAgentCommunicatorInstanc,
  protected e: any; protected  = null,

/**
 * Get singleton instance of Enhanced Parser
 */
export function getEnhancedParser() {
  if (!enhancedParserInstance) {
    const { EnhancedParse, r } = require('./EnhancedParser');
    enhancedParserInstance = new EnhancedParser();
  }
  return enhancedParserInstance;
}

/**
 * Get singleton instance of Agent Router
 */
export function getAgentRouter() {
  if (!agentRouterInstance) {
    const { AgentRoute, r } = require('./AgentRouter');
    agentRouterInstance = new AgentRouter();
  }
  return agentRouterInstance;
}

/**
 * Get singleton instance of Cross-Agent Communicator
 */
export function getCrossAgentCommunicator() {
  if (!crossAgentCommunicatorInstance) {
    const { CrossAgentCommunicato, r } = require('./CrossAgentCommunicator');
    crossAgentCommunicatorInstance = CrossAgentCommunicator.getInstance();
  }
  return crossAgentCommunicatorInstance;
}