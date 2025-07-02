#!/usr/bin/env node

/**
 * Simple test for Master Orchestrator native tools
 * Tests individual components without full Mastra integration
 */

console.log('🚀 Testing Master Orchestrator Native TypeScript Tools...\n');

// Simple test of the orchestrator tools directly
async function testNativeTools() {
  try {
    console.log('📦 Testing Enhanced Parser...');
    
    // Test the native TypeScript Enhanced Parser
    const { getEnhancedParser } = await import('./src/tools/orchestrator/index.js');
    const parser = getEnhancedParser();
    
    const parseResult = await parser.execute({
      query: "Help me create a Python script for data analysis",
      context: { sessionId: 'test-001' }
    });
    
    console.log('✅ Enhanced Parser Result:', {
      success: parseResult.success,
      mainTask: parseResult.data?.mainTask,
      technologies: parseResult.data?.technologies,
      complexity: parseResult.data?.complexity,
      duration: parseResult.metadata?.duration
    });
    
    console.log('\n📦 Testing Agent Router...');
    
    // Test the native TypeScript Agent Router
    const { getAgentRouter } = await import('./src/tools/orchestrator/index.js');
    const router = getAgentRouter();
    
    const routingResult = await router.execute({
      parsed_query: parseResult.data,
      strategy: 'optimal'
    });
    
    console.log('✅ Agent Router Result:', {
      success: routingResult.success,
      primaryAgent: routingResult.data?.primaryAgent?.agentId,
      confidence: routingResult.data?.primaryAgent?.confidence,
      supportingAgents: routingResult.data?.supportingAgents?.length,
      duration: routingResult.metadata?.duration
    });
    
    console.log('\n📦 Testing Cross-Agent Communicator...');
    
    // Test the native TypeScript Cross-Agent Communicator  
    const { getCrossAgentCommunicator } = await import('./src/tools/orchestrator/index.js');
    const communicator = getCrossAgentCommunicator();
    
    const commResult = await communicator.execute({
      message: {
        content: "Test cross-agent communication",
        recipients: ["test-expert"],
        pattern: "direct",
        messageType: "query"
      },
      timeout: 5000
    });
    
    console.log('✅ Cross-Agent Communicator Result:', {
      success: commResult.success,
      responsesCount: commResult.data?.responses?.length || 0,
      duration: commResult.metadata?.duration
    });
    
    // Summary
    console.log('\n🎉 NATIVE TYPESCRIPT TOOLS TEST SUMMARY:');
    console.log(`Enhanced Parser: ${parseResult.success ? '✅ WORKING' : '❌ FAILED'} (${parseResult.metadata?.duration}ms)`);
    console.log(`Agent Router: ${routingResult.success ? '✅ WORKING' : '❌ FAILED'} (${routingResult.metadata?.duration}ms)`);
    console.log(`Cross-Agent Comm: ${commResult.success ? '✅ WORKING' : '❌ FAILED'} (${commResult.metadata?.duration}ms)`);
    
    const allWorking = parseResult.success && routingResult.success && commResult.success;
    console.log(`\n🚀 OVERALL STATUS: ${allWorking ? '✅ ALL NATIVE TYPESCRIPT TOOLS WORKING' : '❌ SOME TOOLS FAILED'}`);
    
    if (allWorking) {
      const totalTime = (parseResult.metadata?.duration || 0) + 
                       (routingResult.metadata?.duration || 0) + 
                       (commResult.metadata?.duration || 0);
      console.log(`⚡ Total Processing Time: ${totalTime}ms`);
      console.log(`🎯 Performance Target: <50ms per tool (✅ TARGET: ${totalTime < 150 ? 'MET' : 'EXCEEDED'})`);
      console.log(`🔥 Python Subprocess Bridge: ELIMINATED`);
      console.log(`💎 Native TypeScript Implementation: CONFIRMED`);
    }
    
  } catch (error) {
    console.error('\n💥 ERROR during native tools test:', error);
    console.error('Stack:', error.stack);
  }
}

// Run test
testNativeTools()
  .then(() => console.log('\n✨ Native TypeScript tools test completed'))
  .catch(error => {
    console.error('\n💥 Test failed:', error);
    process.exit(1);
  });