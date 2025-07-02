#!/usr/bin/env node

/**
 * Basic test for Master Orchestrator with real Ollama integration
 * Tests the native TypeScript implementation without mocks
 */

console.log('🚀 Testing Master Orchestrator Native TypeScript Implementation...\n');

async function testBasicOrchestration() {
  try {
    // Import the MasterOrchestrator
    const { MasterOrchestrator } = await import('./src/agents/experts/MasterOrchestrator.ts');
    
    console.log('✅ MasterOrchestrator imported successfully');
    
    // Create instance
    const mo = new MasterOrchestrator();
    console.log('✅ MasterOrchestrator instance created');
    
    // Test basic query processing
    const testQuery = "Can you help me test the routing system?";
    console.log(`🔍 Testing query: "${testQuery}"`);
    
    const result = await mo.processQuery(testQuery, {
      sessionId: 'test-session-001',
      timestamp: new Date().toISOString()
    });
    
    console.log('✅ Query processed successfully!');
    console.log('📊 Result:', JSON.stringify(result, null, 2));
    
    if (result.success) {
      console.log('\n🎉 SUCCESS: Native TypeScript Master Orchestrator is working!');
      console.log(`⚡ Performance: ${result.performance?.totalDuration}ms (Target: <50ms)`);
      console.log(`🎯 Primary Agent: ${result.routingDecision?.primaryAgent?.agentId}`);
      console.log(`🔗 Native TypeScript: ${result.unifiedResponse?.metadata?.nativeTypescript ? 'YES' : 'NO'}`);
      console.log(`🚫 Python Bridge: ${result.unifiedResponse?.metadata?.pythonBridgeEliminated ? 'ELIMINATED' : 'PRESENT'}`);
    } else {
      console.log('\n❌ FAILED: Test unsuccessful');
      console.log('Error:', result.error);
    }
    
  } catch (error) {
    console.error('\n💥 ERROR during test:', error);
    console.error('Stack:', error.stack);
  }
}

// Run test
testBasicOrchestration()
  .then(() => console.log('\n✨ Test completed'))
  .catch(error => {
    console.error('\n💥 Test failed:', error);
    process.exit(1);
  });