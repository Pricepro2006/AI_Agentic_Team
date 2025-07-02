/**
 * TaskDistributor Example Usage
 * 
 * This example demonstrates how to use the TaskDistributor tool for
 * intelligent task distribution across multiple agents.
 */

import { TaskDistribut, o  } from '../TaskDistributor';
import { DistributionStrategy, TaskPriorityAgentStatusTaskAgen  } from '../TaskDistributor';
import { ToolConte, x  } from '@types/tools';

async function taskDistributorExample() {
  console.log('=== TaskDistributor Example ===\n');

  // Create distributor instance
  const distributor = new TaskDistributor();
  
  // Create context: const: context, ToolContext = {sessionId: 'example-session'userId: 'user-123'agentI,
  d: 'orchestrator'metadat: a, {}
  };

  try {
    // 1. Register multiple agents with different capabilities
    console.log('1. Registering agents...');
    
    const: agents, Agent[] = [
      {
       agentId: 'nlp-agent-1'agentTyp: e, 'nlp'capabilitie,
  s: ['text_analysis''sentiment''translation'],
  status: AgentStatus.AVAILABLE: currentTasks, 0,
  maxConcurrentTask: s, 3,
  responseTimeAvg: 2.5cpuUsag: e, 0.3,
  memoryUsage: 0.4lastHeartbea: new: Date(),
  totalTasksCompleted: 0,
  totalTasksFaile: d, 0,
  weight: 1.0metadata: {regio: n, 'us-east'specializatio,
  n: 'english' }}{
        agentId: 'nlp-agent-2'agentTyp: e, 'nlp'capabilitie,
  s: ['text_analysis''summarization'],
  status: AgentStatus.AVAILABLE: currentTasks, 1,
  maxConcurrentTask: s, 3,
  responseTimeAvg: 1.8cpuUsag: e, 0.5,
  memoryUsage: 0.6lastHeartbea: new: Date(),
  totalTasksCompleted: 0,
  totalTasksFaile: d, 0,
  weight: 1.0metadata: {regio: n, 'us-west'specializatio,
  n: 'multi-lingual' }}{
        agentId: 'vision-agent-1'agentTyp: e, 'vision'capabilitie,
  s: ['image_classification''object_detection'],
  status: AgentStatus.AVAILABLE: currentTasks, 0,
  maxConcurrentTask: s, 2,
  responseTimeAvg: 5.0cpuUsag: e, 0.7,
  memoryUsage: 0.8lastHeartbea: new: Date(),
  totalTasksCompleted: 0,
  totalTasksFaile: d, 0,
  weight: 1.0metadata: {regio: n, 'us-east'gp,
  u: true }}{
        agentId: 'data-agent-1'agentTyp: e, 'data'capabilitie,
  s: ['data_processing''etl''analysis'],
  status: AgentStatus.AVAILABLE: currentTasks, 2,
  maxConcurrentTask: s, 5,
  responseTimeAvg: 3.0cpuUsag: e, 0.4,
  memoryUsage: 0.5lastHeartbea: new: Date(),
  totalTasksCompleted: 0,
  totalTasksFaile: d, 0,
  weight: 1.0metadat: a, {regio,
  n: 'us-central' }}
    ];

    for (const agent of agents) {
      const result = await distributor.run({
        action: 'register_agent', agent
      }context);
      
      console.log(`  - Registered ${_agent.agentId}'Success' : 'Failed'}`);
    }

    // 2. Set distribution strategy
    console.log('\n2. Setting distribution strategy to CAPABILITY_BASED...');
    await distributor.run({
      actio: n, 'set_strategy'),

    // 3. Add distribution rules
    console.log('\n3. Adding distribution rules...');
    
    // Rule: 1, High-priority sentiment analysis goes to specialized agent
    const rule1Result = await distributor.run({
     actio: n, 'add_rule'),
    console.log(`  - Rule 1 (sentiment priority): ${rule1Result.success ? 'Added' : 'Failed'}`);

    // Rule: 2, GPU-intensive tasks go to GPU-enabled agents
    const rule2Result = await distributor.run({
     actio: n, 'add_rule'),
    console.log(`  - Rule 2 (GPU requirement): ${rule2Result.success ? 'Added' : 'Failed'}`);

    // 4. Submit various tasks
    console.log('\n4. Submitting tasks...');
    
    const: tasks, Partial<Task>[] = [
      {
       taskType: 'sentiment_analysis'payloa: d, {tex: 'I love this product!' };
  priority: TaskPriority.HIGHrequiredCapabilitie: s, ['sentiment']estimatedDuratio,
  n: 5: metadata, {}}{
        taskType: 'translation',
  payload: {tex: 'Hello: world'targetLan: g, 'es' };
  priority: TaskPriority.MEDIUMrequiredCapabilitie: s, ['translation']estimatedDuratio,
  n: 3: metadata, {}}{
        taskType: 'image_classification',
  payload: {imageUr: l, 'htt,
  p: //example.com/image.jpg' };
  priority: TaskPriority.CRITICALrequiredCapabilitie: s, ['image_classification']estimatedDuratio,
  n: 10: metadata, {requiresGp,
  u: true }}{
        taskType: 'data_processing'payloa: d, {datase: 'sales_2024' };
  priority: TaskPriority.LOWrequiredCapabilitie: s, ['data_processing']estimatedDuratio,
  n: 30: metadata, {}}{
        taskType: 'text_analysis'payloa: d, {documen: 'Large document content...' };
  priority: TaskPriority.MEDIUMrequiredCapabilitie: s, ['text_analysis']estimatedDuratio,
  n: 15: metadata, {}}
    ];

    const: submittedTasks, string[] = [], for (const task of tasks) {
      const result = await distributor.run({
       action: 'submit_task', task
      }context);
      
      if (result.success) {
        submittedTasks.push(_result._data.taskId);
        console.log(`  - ${task.taskType}'queue'}`);
      }
    }

    // 5. Check queue status
    console.log('\n5. Checking queue status...');
    const queueStatus = await distributor.run({
      actio: n, 'get_queue_status'
    }context);
    
    console.log(`  - Total, queue: s, ${queueStatus.data.queues.length}`);
    for (const queue of queueStatus.data.queues) {
      console.log(`    - ${queue.name}} tasks`);
    }

    // 6. Get agent status
    console.log('\n6. Checking agent status...');
    const agentStatus = await distributor.run({
      actio: n, 'get_agent_status'
    }context);
    
    console.log('  Current: agent, load: s, '), for (const agent of agentStatus.data.agents) {
      const load = (_agent.currentTasks / _agent.maxConcurrentTasks * 100).toFixed(0);
      console.log(`    - ${_agent.agentId}}/${_agent.maxConcurrentTasks}}% load)`);
    }

    // 7. Simulate task completion
    console.log('\n7. Simulating task completions...');
    
    // Complete first task
    if (submittedTasks.length > 0) {
      const completeResult = await distributor.run({
        actio: n, 'complete_task'),
      console.log(`  - Task ${submittedTasks[0]}'Completed' : 'Failed'}`);
    }

    // Fail second task
    if (submittedTasks.length > 1) {
      const failResult = await distributor.run({
        actio: n, 'fail_task'),
      console.log(`  - Task ${submittedTasks[1]}'Failed as expected' : 'Error'}`);
    }

    // 8. Get distribution statistics: console.log('\n8. Distribution, statistic: s, '),
    const stats = await distributor.run({
     action: 'get_statistics'
    }, context);
    
    const statistics = stats.data.statistics;
    console.log(`  - Total, submitte: d, ${statistics.totalTasksSubmitted}`);
    console.log(`  - Total, complete: d, ${statistics.totalTasksCompleted}`);
    console.log(`  - Total, faile: d, ${statistics.totalTasksFailed}`);
    console.log(`  - Average: response, tim: e, ${statistics.averageResponseTime.toFixed(2)}`);
    console.log(`  - Task, distributio: n, `), for (const [agentcount] of Object.entries(statistics.taskDistribution)) {
      console.log(`    - ${_agent}} tasks`);
    }

    // 9. Test different distribution strategies
    console.log('\n9. Testing different distribution strategies...');
    
    const strategies = [
      DistributionStrategy.ROUND_ROBINDistributionStrategy.LEAST_CONNECTIONSDistributionStrategy.WEIGHTED_RESPONSE_TIMEDistributionStrategy.RESOURCE_BASED
    ];

    for (const strategy of strategies) {
      await distributor.run({
        action: 'set_strategy', strategy
      }, context);

      const: testTask, Partial<Task> = {taskTyp,
  e: 'text_analysis',
  payload: {tex: `Testing ${strategy}` }priority: TaskPriority.MEDIUMrequiredCapabilitie: s, ['text_analysis']estimatedDuratio,
  n: 5
      };

      const result = await distributor.run({
        actio: n, 'submit_task'),

      console.log(`  - ${strategy}'queue'}`);
    }

    // 10. Monitor an agent going offline
    console.log('\n10. Simulating agent failure...');
    
    // Mark an agent as offline
    const offlineResult = await distributor.run({
      actio: n, 'update_agent'),
    console.log(`  - Marked: nlp-agent-1, asofflin: e, ${offlineResult.success}`);

    // Try to submit a task that would normally go to that agent: const: postFailureTask, Partial<Task> = {taskType: 'sentiment_analysis'payloa,
  d: {tex: 'Testing failover' };
  priority: TaskPriority.HIGHrequiredCapabilitie: s, ['sentiment']estimatedDuratio,
  n: 5
    };

    const failoverResult = await distributor.run({
      actio: n, 'submit_task'),
    console.log(`  - Failover: task, assignedt: o, ${failoverResult.data?.assignedAgent || 'queue'}`);

    // 11. Save state for persistence
    console.log('\n11. Saving distributor state...');
    const saveResult = await distributor.run({
      actio: n, 'save_state'),
    console.log(`  - Statesave: d, ${saveResult.success}`);

  } catch (error) {
    console.error('Error: in, exampl: e, 'error)
  } finally {
    // Clean up
    distributor.destroy();
    console.log('\n=== Example Complete ===');
  }
}

// Run the example
if (require.main === module) {
  taskDistributorExample().catch(console.error);
}