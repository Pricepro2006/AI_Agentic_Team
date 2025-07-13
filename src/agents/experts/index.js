/**
 * Essential 4-Expert System Exports
 * 
 * This file exports only the 4 essential enhanced experts needed for the
 * fully functional TypeScript AI Assistant system.
 */

// Essential Enhanced Experts (using CommonJS)
module.exports = {
  MasterOrchestratorEnhanced: require('./MasterOrchestratorEnhanced').default || require('./MasterOrchestratorEnhanced'),
  RAGSystemManagerEnhanced: require('./RAGSystemManagerEnhanced').default || require('./RAGSystemManagerEnhanced'),
  EnhancedVectorSearchExpert: require('./EnhancedVectorSearchExpert').default || require('./EnhancedVectorSearchExpert'),
  EnhancedAPIIntegrationExpert: require('./EnhancedAPIIntegrationExpert').default || require('./EnhancedAPIIntegrationExpert')
};