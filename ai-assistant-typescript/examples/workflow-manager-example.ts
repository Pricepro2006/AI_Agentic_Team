/**
 * Example: Using WorkflowManager Tool
 * This demonstrates how to create and execute complex workflows
 */

import { WorkflowManager } from '../src/tools/implementations/orchestrator/WorkflowManager';
import { ToolContext } from '../src/types/tools';
import { createLogger } from '../src/utils/logger';

// Sample task handlers
async function initializeTask(
  parameters: Record<string, any>,
  variables: Record<string, any>
): Promise<any> {
  console.log('🚀 Initializing system...', { parameters, variables });
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { status: 'initialized', timestamp: new Date().toISOString() };
}

async function fetchDataTask(
  parameters: Record<string, any>,
  variables: Record<string, any>
): Promise<any> {
  console.log('📊 Fetching data...', { source: parameters.source });
  await new Promise(resolve => setTimeout(resolve, 2000));
  return { 
    data: Array.from({ length: parameters.count || 10 }, (_, i) => ({
      id: i + 1,
      value: Math.random() * 100,
    })),
    fetchedAt: new Date().toISOString(),
  };
}

async function processDataTask(
  parameters: Record<string, any>,
  variables: Record<string, any>
): Promise<any> {
  console.log('⚙️ Processing data...', { algorithm: parameters.algorithm });
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    processed: true,
    algorithm: parameters.algorithm,
    processedAt: new Date().toISOString(),
  };
}

async function generateReportTask(
  parameters: Record<string, any>,
  variables: Record<string, any>
): Promise<any> {
  console.log('📄 Generating report...', { format: parameters.format });
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    report: {
      title: 'Workflow Execution Report',
      format: parameters.format,
      sections: ['Summary', 'Data Analysis', 'Conclusions'],
      generatedAt: new Date().toISOString(),
    },
  };
}

async function main() {
  const logger = createLogger('WorkflowExample');
  const workflowManager = new WorkflowManager('./example-workflows');
  
  const context: ToolContext = {
    agent: 'ExampleAgent',
    sessionId: 'example-session',
    traceId: 'example-trace',
    metadata: {},
  };

  try {
    logger.info('Starting Workflow Manager example...');

    // Step 1: Register task handlers
    logger.info('Registering task handlers...');
    
    await workflowManager.execute({
      action: 'register_task_handler',
      params: { name: 'initialize', handler: initializeTask },
    }, context);

    await workflowManager.execute({
      action: 'register_task_handler',
      params: { name: 'fetch_data', handler: fetchDataTask },
    }, context);

    await workflowManager.execute({
      action: 'register_task_handler',
      params: { name: 'process_data', handler: processDataTask },
    }, context);

    await workflowManager.execute({
      action: 'register_task_handler',
      params: { name: 'generate_report', handler: generateReportTask },
    }, context);

    // Step 2: Create a complex workflow
    logger.info('Creating data pipeline workflow...');
    
    const createResult = await workflowManager.execute({
      action: 'create_workflow',
      params: {
        name: 'Data Pipeline Workflow',
        description: 'A complete data processing pipeline with parallel tasks',
        tasks: [
          {
            taskId: 'init',
            name: 'System Initialization',
            taskType: 'initialize',
            parameters: { mode: 'production' },
            dependencies: [],
            priority: 'high',
          },
          {
            taskId: 'fetch_sales',
            name: 'Fetch Sales Data',
            taskType: 'fetch_data',
            parameters: { source: 'sales_db', count: 20 },
            dependencies: ['init'],
            priority: 'medium',
          },
          {
            taskId: 'fetch_inventory',
            name: 'Fetch Inventory Data',
            taskType: 'fetch_data',
            parameters: { source: 'inventory_db', count: 15 },
            dependencies: ['init'],
            priority: 'medium',
          },
          {
            taskId: 'process_sales',
            name: 'Process Sales Data',
            taskType: 'process_data',
            parameters: { algorithm: 'sales_analytics' },
            dependencies: ['fetch_sales'],
            priority: 'medium',
          },
          {
            taskId: 'process_inventory',
            name: 'Process Inventory Data',
            taskType: 'process_data',
            parameters: { algorithm: 'inventory_optimization' },
            dependencies: ['fetch_inventory'],
            priority: 'medium',
          },
          {
            taskId: 'generate_report',
            name: 'Generate Final Report',
            taskType: 'generate_report',
            parameters: { format: 'pdf' },
            dependencies: [
              { taskId: 'process_sales', condition: 'completed' },
              { taskId: 'process_inventory', condition: 'completed' },
            ],
            priority: 'high',
          },
        ],
        variables: {
          environment: 'production',
          date: new Date().toISOString(),
        },
        triggers: ['daily_run', 'manual_trigger'],
        maxConcurrentTasks: 3,
        timeoutSeconds: 600,
      },
    }, context);

    if (!createResult.success) {
      logger.error('Failed to create workflow:', createResult.error);
      return;
    }

    const workflowId = createResult.data.workflowInfo.workflowId;
    logger.info('Workflow created successfully', { workflowId });

    // Step 3: Start the workflow
    logger.info('Starting workflow execution...');
    
    const startResult = await workflowManager.execute({
      action: 'start_workflow',
      params: {
        workflowId,
        inputVariables: {
          user: 'admin',
          runType: 'scheduled',
        },
      },
    }, context);

    if (!startResult.success) {
      logger.error('Failed to start workflow:', startResult.error);
      return;
    }

    const executionId = startResult.data.executionInfo.executionId;
    logger.info('Workflow execution started', { executionId });

    // Step 4: Monitor workflow progress
    logger.info('Monitoring workflow progress...');
    
    let isComplete = false;
    let lastProgress = 0;
    
    while (!isComplete) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const statusResult = await workflowManager.execute({
        action: 'get_workflow_status',
        params: { executionId },
      }, context);

      if (statusResult.success) {
        const status = statusResult.data.executionStatus;
        const progress = Math.round(status.progressPercentage);
        
        if (progress !== lastProgress) {
          logger.info('Workflow progress', {
            state: status.state,
            progress: `${progress}%`,
            completedTasks: status.completedTasks,
            currentTasks: status.currentTasks,
          });
          lastProgress = progress;
        }

        if (['completed', 'failed', 'cancelled'].includes(status.state)) {
          isComplete = true;
          logger.info('Workflow execution finished', {
            state: status.state,
            duration: status.completedAt 
              ? new Date(status.completedAt).getTime() - new Date(status.createdAt).getTime()
              : 'N/A',
          });

          // Show task details
          logger.info('Task execution summary:');
          for (const [taskId, taskStatus] of Object.entries(status.taskStatuses)) {
            logger.info(`  - ${taskId}: ${(taskStatus as any).state}`);
          }
        }
      }
    }

    // Step 5: Test workflow triggers
    logger.info('Testing workflow triggers...');
    
    const triggerResult = await workflowManager.execute({
      action: 'trigger_workflow',
      params: {
        triggerName: 'manual_trigger',
        data: {
          triggeredBy: 'example_script',
          reason: 'demonstration',
        },
      },
    }, context);

    if (triggerResult.success) {
      logger.info('Workflow triggered successfully', {
        count: triggerResult.data.triggerResult.count,
      });
    }

    // Step 6: Get workflow statistics
    logger.info('Getting workflow statistics...');
    
    const statsResult = await workflowManager.execute({
      action: 'get_statistics',
      params: {},
    }, context);

    if (statsResult.success) {
      const stats = statsResult.data.statistics;
      logger.info('Workflow Manager Statistics:', {
        totalWorkflows: stats.totalWorkflows,
        activeExecutions: stats.activeExecutions,
        completedExecutions: stats.completedExecutions,
        totalTasksExecuted: stats.totalTasksExecuted,
        uptimeSeconds: Math.round(stats.uptimeSeconds),
      });
    }

    // Step 7: List all workflows
    logger.info('Listing all workflows...');
    
    const listResult = await workflowManager.execute({
      action: 'list_workflows',
      params: { includeExecutions: true },
    }, context);

    if (listResult.success) {
      logger.info(`Total workflows: ${listResult.data.totalCount}`);
      for (const workflow of listResult.data.workflows) {
        logger.info(`  - ${workflow.name} (${workflow.workflowId})`);
        logger.info(`    Tasks: ${workflow.taskCount}, Triggers: ${workflow.triggers.join(', ')}`);
        if (workflow.executions?.length > 0) {
          logger.info(`    Executions: ${workflow.executions.length}`);
        }
      }
    }

    logger.info('✅ Workflow Manager example completed successfully!');

  } catch (error) {
    logger.error('Example failed:', error);
  } finally {
    // Cleanup
    workflowManager.destroy();
  }
}

// Run the example
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Example failed:', error);
      process.exit(1);
    });
}