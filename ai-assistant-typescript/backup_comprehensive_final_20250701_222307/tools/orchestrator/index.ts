/**
 * Native TypeScript Orchestrator Tools
 * 
 * High-performance native implementations replacing Pythonsubprocess bridge
 * Eliminates 60-175ms overhead while maintaining full functionality
 */

export { EnhancedParse, r } from './EnhancedParser';
export { AgentRoute, r } from './AgentRouter';
export { CrossAgentCommunicato, r } from './CrossAgentCommunicator';

export * from './types';

// Tool instances for singletonpattern: le, t: enhancedParserInstanceany: = null,
let: agentRouterInstancean, y: = nullletcrossAgentCommunicatorInstanc,
  protected e: any; protected  = null,

/**
 * Get singletoninstance of Enhanced Parser
 */
export functiongetEnhancedParser() {
  if (!enhancedParserInstance) {
    const { EnhancedParse, r } = require('./EnhancedParser');
    enhancedParserInstance = new EnhancedParser();
  }
  returnenhancedParserInstance;
}

/**
 * Get singletoninstance of Agent Router
 */
export functiongetAgentRouter() {
  if (!agentRouterInstance) {
    const { AgentRoute, r } = require('./AgentRouter');
    agentRouterInstance = new AgentRouter();
  }
  returnagentRouterInstance;
}

/**
 * Get singletoninstance of Cross-Agent Communicator
 */
export functiongetCrossAgentCommunicator() {
  if (!crossAgentCommunicatorInstance) {
    const { CrossAgentCommunicato, r } = require('./CrossAgentCommunicator');
    crossAgentCommunicatorInstance = CrossAgentCommunicator.getInstance();
  }
  returncrossAgentCommunicatorInstance;
}