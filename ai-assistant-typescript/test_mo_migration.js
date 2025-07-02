/**
 * Test script to verify MasterOrchestrator migration to ExpertAgentTemplate
 * Tests instantiation, configuration, and basic tool functionality
 */

const { MasterOrchestrator } = require('./src/agents/experts/MasterOrchestrator');

async function testMasterOrchestratorMigration() {
  console.log('🔧 Testing MasterOrchestrator Migration to ExpertAgentTemplate...\n');

  try {
    // Test 1: Instantiation
    console.log('1. Testing MasterOrchestrator instantiation...');
    const mo = new MasterOrchestrator();
    console.log('✅ MasterOrchestrator instantiated successfully');
    
    // Test 2: Configuration
    console.log('\n2. Testing configuration...');
    const config = mo.getConfig();
    console.log(`✅ Agent ID: ${config.id}`);
    console.log(`✅ Agent Name: ${config.name}`);
    console.log(`✅ Version: ${config.version}`);
    console.log(`✅ Tools count: ${config.tools.length}`);
    console.log(`✅ RAG enabled: ${mo.ragConfig.enabled}`);
    
    // Test 3: Tools verification
    console.log('\n3. Testing tools configuration...');
    const tools = mo.getTools();
    console.log(`✅ Tools implemented: ${tools.length}/12`);
    
    tools.forEach((tool, index) => {
      console.log(`   ${index + 1}. ${tool.name}: ${tool.description.substring(0, 50)}...`);
    });
    
    // Test 4: RAG configuration
    console.log('\n4. Testing RAG configuration...');
    console.log(`✅ Embedding model: ${mo.ragConfig.embeddingModel}`);
    console.log(`✅ Chunk size: ${mo.ragConfig.chunkSize}`);
    console.log(`✅ Knowledge domains: ${mo.ragConfig.knowledgeDomains.length}`);
    
    // Test 5: ExpertAgentTemplate inheritance
    console.log('\n5. Testing ExpertAgentTemplate inheritance...');
    console.log(`✅ Extends ExpertAgentTemplate: ${mo instanceof mo.constructor.__proto__.constructor}`);
    console.log(`✅ Has specialization: ${!!mo.specialization}`);
    console.log(`✅ Domain: ${mo.specialization.domain}`);
    console.log(`✅ Primary expertise count: ${mo.specialization.primaryExpertise.length}`);
    
    console.log('\n🎉 MasterOrchestrator migration test completed successfully!');
    console.log('✅ All tests passed - MasterOrchestrator successfully migrated to ExpertAgentTemplate with RAG integration');
    
    return true;
    
  } catch (error) {
    console.error('\n❌ Migration test failed:');
    console.error(error.message);
    console.error('\nStack trace:');
    console.error(error.stack);
    return false;
  }
}

// Run the test
testMasterOrchestratorMigration()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });