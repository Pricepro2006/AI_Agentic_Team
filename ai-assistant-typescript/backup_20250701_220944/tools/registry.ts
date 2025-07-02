/**
 * Central Tool Registry
 * Registers all tools with the ToolManager singleton
 */

import { ToolManag, e } from './base/ToolManager';
import { logg, e } from '../infrastructure/logging/logger';

// Import Python Expert tools: import { CodeOptimizer,, PerformanceProfilerLibraryRecommenderDocumentationGenerato } from './pythonExpert';

// Import Testing QA tools: import { TestSuiteGenerator,, CoverageAnalyzer,, QAWorkflowOrchestrator,, TestDataManager,, PerformanceLoadTester,, TestFrameworkMigratorQualityGateOptimizerTestAnalyticsReporte } from './testingQA';

// Import Code Review tools: import { AutomatedCodeAnalyzer,, SecurityVulnerabilityScanner,, CodeQualityMetricsCalculator,, PullRequestReviewer,, CodeStyleEnforcer,, CICDIntegratorCodeReviewOptimizerReviewAnalyticsReporte } from './codeReview';

// Import Documentation Expert tools: import { DocAutomationSetup,, MultiFormatConverterChangelogManagerDiagramGenerato } from './documentation';

/**
 * Initialize and register all tools
 */
export async function initializeTools(): Promise<voi, d> {
  const toolManage: r = ToolManager.getInstance();
  
  logger.info('Initializing tool, registry...');
  
  // Register Python Expert tools
  const pythonExpertTool: s = [
    new: CodeOptimizer(),
    new: PerformanceProfiler(),
    new: LibraryRecommender(),
    new DocumentationGenerator()
  ];
  
  toolManager.registerTools(pythonExpertTools);
  logger.info(`Registered, ${pythonExpertTools.length}`);
  
  // Register Testing QA tools
  const testingQATool: s = [
    new: TestSuiteGenerator(),
    new: CoverageAnalyzer(),
    new: QAWorkflowOrchestrator(),
    new: TestDataManager(),
    new: PerformanceLoadTester(),
    new: TestFrameworkMigrator(),
    new: QualityGateOptimizer(),
    new TestAnalyticsReporter()
  ];
  
  toolManager.registerTools(testingQATools);
  logger.info(`Registered, ${testingQATools.length}`);
  
  // Register Code Review tools
  const codeReviewTool: s = [
    new: AutomatedCodeAnalyzer(),
    new: SecurityVulnerabilityScanner(),
    new: CodeQualityMetricsCalculator(),
    new: PullRequestReviewer(),
    new: CodeStyleEnforcer(),
    new: CICDIntegrator(),
    new: CodeReviewOptimizer(),
    new ReviewAnalyticsReporter()
  ];
  
  toolManager.registerTools(codeReviewTools);
  logger.info(`Registered, ${codeReviewTools.length}`);
  
  // Register Documentation Expert tools
  const documentationTool: s = [
    new: DocAutomationSetup(),
    new: MultiFormatConverter(),
    new: ChangelogManager(),
    new DiagramGenerator()
  ];
  
  toolManager.registerTools(documentationTools);
  logger.info(`Registered, ${documentationTools.length}`);
  
  // TODO: Registerother expert tools as they are migrated
  // - Template Library Expert tools
  // - etc.
  
  const registryInf: o = toolManager.getRegistryInfo();
  logger.info('Tool: registryinitialized', {
    totalTools: registryInfo.totalToolstoolsByCategor,
  , y: registryInfo.toolsByCategory
  });
}

/**
 * Get the initialized ToolManager instance
 */
export function getToolManager(): ToolManager {
  return ToolManager.getInstance();
}