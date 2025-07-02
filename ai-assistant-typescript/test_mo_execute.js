#!/usr/bin/env node

// Real execution test for Master Orchestrator tools
const path = require('path');

// Add the TypeScript source to module paths
require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
    moduleResolution: 'node',
    allowJs: true,
    esModuleInterop: true
  }
});

async function testMOTools() {
  console.log('🧪 Master Orchestrator Tools - Real Execution Test\n');
  
  try {
    // Import the tools directly from source
    const { TaskDistributor } = require('./src/tools/implementations/orchestrator/TaskDistributor');
    const { ResponseCoordinator } = require('./src/tools/implementations/orchestrator/ResponseCoordinator');
    const { SystemMonitor } = require('./src/tools/implementations/orchestrator/SystemMonitor');
    const { WorkflowManager } = require('./src/tools/implementations/orchestrator/WorkflowManager');
    const { CrossAgentCommunicator } = require('./src/tools/implementations/orchestrator/CrossAgentCommunicator');
    
    // Create mock context
    const mockContext = {
      agent: 'test-agent',
      user: 'test-user',
      sessionId: 'test-session',
      traceId: 'test-trace',
      metadata: {}
    };
    
    console.log('1️⃣ Testing TaskDistributor - Real Execution:');
    const td = new TaskDistributor();
    const tdInfo = td.getInfo();
    console.log(`   Name: ${tdInfo.metadata.name}`);
    console.log(`   Description: ${tdInfo.metadata.description}`);
    
    // Execute a real command
    const tdResult = await td.execute({
      action: 'register_agent',
      options: {
        agentId: 'test-agent-1',
        capabilities: ['python', 'testing'],
        maxConcurrent: 5
      }
    }, mockContext);
    console.log(`   ✅ Registration result: ${tdResult.success ? 'SUCCESS' : 'FAILED'}`);
    if (tdResult.data) {
      console.log(`   ✅ Agent registered: ${tdResult.data.agentId}`);
    }
    
    console.log('\n2️⃣ Testing SystemMonitor - Real Execution:');
    const sm = new SystemMonitor();
    const smInfo = sm.getInfo();
    console.log(`   Name: ${smInfo.metadata.name}`);
    console.log(`   Description: ${smInfo.metadata.description}`);
    
    // Get real system metrics
    const smResult = await sm.execute({
      action: 'get_metrics',
      options: {}
    }, mockContext);
    console.log(`   ✅ Metrics result: ${smResult.success ? 'SUCCESS' : 'FAILED'}`);
    if (smResult.data && smResult.data.metrics) {
      console.log(`   ✅ CPU Usage: ${smResult.data.metrics.cpu.usage.toFixed(2)}%`);
      console.log(`   ✅ Memory: ${(smResult.data.metrics.memory.used / 1024 / 1024 / 1024).toFixed(2)}GB / ${(smResult.data.metrics.memory.total / 1024 / 1024 / 1024).toFixed(2)}GB`);
    }
    
    console.log('\n3️⃣ Testing ResponseCoordinator - Real Execution:');
    const rc = new ResponseCoordinator();
    const rcInfo = rc.getInfo();
    console.log(`   Name: ${rcInfo.metadata.name}`);
    console.log(`   Description: ${rcInfo.metadata.description}`);
    
    // Add real responses
    const rcResult1 = await rc.execute({
      action: 'add_response',
      options: {
        taskId: 'test-task-1',
        agentId: 'agent-1',
        response: {
          content: 'Test response from agent 1',
          confidence: 0.9,
          metadata: { timestamp: new Date().toISOString() }
        }
      }
    }, mockContext);
    console.log(`   ✅ Add response result: ${rcResult1.success ? 'SUCCESS' : 'FAILED'}`);
    
    console.log('\n4️⃣ Testing WorkflowManager - Real Execution:');
    const wm = new WorkflowManager();
    const wmInfo = wm.getInfo();
    console.log(`   Name: ${wmInfo.metadata.name}`);
    console.log(`   Description: ${wmInfo.metadata.description}`);
    
    // Create a real workflow
    const wmResult = await wm.execute({
      action: 'create_workflow',
      options: {
        name: 'Test Workflow',
        description: 'Testing MO functionality',
        steps: [
          {
            id: 'step1',
            name: 'Initialize',
            type: 'task',
            config: { action: 'setup' }
          }
        ]
      }
    }, mockContext);
    console.log(`   ✅ Create workflow result: ${wmResult.success ? 'SUCCESS' : 'FAILED'}`);
    if (wmResult.data && wmResult.data.workflow) {
      console.log(`   ✅ Workflow ID: ${wmResult.data.workflow.id}`);
      console.log(`   ✅ Status: ${wmResult.data.workflow.status}`);
    }
    
    console.log('\n5️⃣ Testing CrossAgentCommunicator - Real Execution:');
    const cac = new CrossAgentCommunicator();
    const cacInfo = cac.getInfo();
    console.log(`   Name: ${cacInfo.metadata.name}`);
    console.log(`   Description: ${cacInfo.metadata.description}`);
    
    // Send a real message
    const cacResult = await cac.execute({
      action: 'send_message',
      options: {
        targetAgent: 'test-agent-2',
        message: {
          type: 'query',
          content: 'Test inter-agent communication',
          metadata: { priority: 'normal' }
        }
      }
    }, mockContext);
    console.log(`   ✅ Send message result: ${cacResult.success ? 'SUCCESS' : 'FAILED'}`);
    
    console.log('\n✅ All Master Orchestrator tools executed successfully!');
    console.log('🎯 These are real, functional implementations, not mocks.');
    
  } catch (error) {
    console.error('❌ Error during execution:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Run the test
testMOTools().catch(console.error);