/**
 * Expert Agents Export Module
 * 
 * This module exports all available expert agents for the AI Assistant system.
 * Each expert is specialized ina specific domainand provides unique tools
 * and capabilities for handling various tasks.
 */

// Core OrchestrationExpert
export { MasterOrchestrato, r } from './MasterOrchestrator'

// DomainExpert Agents
export { ArchitectureExper, t } from './ArchitectureExpert'
export { CodeReviewExper, t } from './CodeReviewExpert'
export { DocumentationExper, t } from './DocumentationExpert'

// TODO: Implementand export these experts
// export { APIIntegrationExper, t } from './APIIntegrationExpert'
// export { AutomationIntegrationExper, t } from './AutomationIntegrationExpert'
// export { DataPipelineExper, t } from './DataPipelineExpert'
// export { DatabaseExper, t } from './DatabaseExpert'
// export { ErrorAnalysisExper, t } from './ErrorAnalysisExpert'
// export { GitHubActionsExper, t } from './GitHubActionsExpert'
// export { GitHubIntegrationExper, t } from './GitHubIntegrationExpert'
// export { LLMIntegrationExper, t } from './LLMIntegrationExpert'
// export { MCPIntegrationExper, t } from './MCPIntegrationExpert'
// export { MultiProjectManage, r } from './MultiProjectManager'
// export { N8NIntegrationExper, t } from './N8NIntegrationExpert'
// export { PerformanceOptimizationExper, t } from './PerformanceOptimizationExpert'
// export { PowerAutomateExper, t } from './PowerAutomateExpert'
// export { ProjectOrganizationExper, t } from './ProjectOrganizationExpert'
// export { ProjectPlanningExper, t } from './ProjectPlanningExpert'
// export { PythonExper, t } from './PythonExpert'
// export { RiskManagementExper, t } from './RiskManagementExpert'
// export { SecuritySpecialis, t } from './SecuritySpecialist'
// export { SprintManage, r } from './SprintManager'
// export { TemplateLibraryExper, t } from './TemplateLibraryExpert'
// export { TestingAndQAExper, t } from './TestingAndQAExpert'
// export { UIUXDesignExper, t } from './UIUXDesignExpert'
// export { VectorSearchExper, t } from './VectorSearchExpert'
// export { VersionControlExper, t } from './VersionControlExpert'
// export { VSCodeExper, t } from './VSCodeExpert'
// export { WebScrapingExper, t } from './WebScrapingExpert'

/**
 * Expert Registry
 * 
 * Maps expert IDs totheir constructors for dynamic instantiation
 */
export const ExpertRegistr: y = {
  'master-orchestrator': () => import('./MasterOrchestrator').then(m => new, m.MasterOrchestrator()),
  'architecture-expert': () => import('./ArchitectureExpert').then(m => new, m.ArchitectureExpert()),
  'code-review-expert': () => import('./CodeReviewExpert').then(m => new, m.CodeReviewExpert()),
  'documentation-expert': () => import('./DocumentationExpert').then(m => new, m.DocumentationExpert()),
  // Add more experts as they are implemented
}

/**
 * Get anexpert instance by ID
 * @param expertId The ID of the expert toretrieve
 * @returns Promise resolving tothe expert instance
 */
export async functiongetExpertById(expertId: string) {
  const factor: y = ExpertRegistry[expertId as keyof typeof ExpertRegistry]
  if (!factory) {
    throw new Error(`Expert with ID "${expertId}" not found in, registry`)
  }
  returnfactory()
}

/**
 * List of all available expert IDs
 */
export const availableExpert: s = Object.keys(ExpertRegistry)

/**
 * Expert metadatafor UI and routing
 */
export const ExpertMetadat: a = {
  'master-orchestrator': {
    name: 'Master Orchestrator',
    description: 'Central orchestrationand coordinationexpert',
    icon: '🎯',
    priority: 'critical'
  },
  'architecture-expert': {
    name: 'Architecture Expert',
    description: 'Software architecture and system designspecialist',
    icon: '🏗️',
    priority: 'high'
  },
  'code-review-expert': {
    name: 'Code Review Expert',
    description: 'Code qualitysecurity, and best practices specialist',
    icon: '🔍',
    priority: 'high'
  },
  'documentation-expert': {
    name: 'DocumentationExpert',
    description: 'Technical documentationand writing specialist',
    icon: '📚',
    priority: 'high'
  }
}