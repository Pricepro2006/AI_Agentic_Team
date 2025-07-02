/**
 * Test Expert Routing System
 * 
 * This script demonstrates the complete expert routing flow:
 * 1. Query comes to Master Orchestrator
 * 2. MO interprets and routes to appropriate expert
 * 3. Expert executes using ToolExecutionFramework
 * 4. Results flow back through MO
 */

import { MasterOrchestrator } from './src/agents/experts/MasterOrchestrator'
import { AgentContext } from './src/types/agents'

async function testExpertRouting() {
  console.log('🚀 Testing Expert Routing System...\n')

  // Create Master Orchestrator instance
  const masterOrchestrator = new MasterOrchestrator()
  
  // Test queries for different experts
  const testQueries = [
    {
      query: "Review the security vulnerabilities in this authentication code",
      expectedExpert: "code-review-expert"
    },
    {
      query: "Design a microservices architecture for an e-commerce platform",
      expectedExpert: "architecture-expert"
    },
    {
      query: "Generate comprehensive API documentation for our REST endpoints",
      expectedExpert: "documentation-expert"
    },
    {
      query: "Analyze code quality and suggest refactoring for the payment module",
      expectedExpert: "code-review-expert"
    },
    {
      query: "Create a README file with installation instructions and usage examples",
      expectedExpert: "documentation-expert"
    }
  ]

  // Create test context
  const context: AgentContext = {
    userId: 'test-user',
    sessionId: `test-session-${Date.now()}`,
    conversationId: `test-conv-${Date.now()}`,
    conversationHistory: [],
    environment: 'test',
    metadata: {
      testRun: true,
      timestamp: new Date().toISOString()
    }
  }

  // Test each query
  for (const test of testQueries) {
    console.log(`\n📝 Query: "${test.query}"`)
    console.log(`Expected Expert: ${test.expectedExpert}`)
    
    try {
      // Execute through Master Orchestrator
      const result = await masterOrchestrator.execute(test.query, context)
      
      if (result.success) {
        console.log('✅ Routing successful!')
        console.log(`Primary Expert: ${result.metadata?.primaryExpert || 'Not specified'}`)
        console.log(`Confidence: ${result.confidence || 'N/A'}`)
        
        if (result.metadata?.supportingExperts) {
          console.log(`Supporting Experts: ${result.metadata.supportingExperts.join(', ')}`)
        }
        
        console.log('Response:', result.response || result.data)
      } else {
        console.log('❌ Routing failed:', result.error)
      }
    } catch (error) {
      console.error('❌ Error:', error instanceof Error ? error.message : error)
    }
  }

  // Test multi-agent coordination
  console.log('\n\n🤝 Testing Multi-Agent Coordination...')
  const complexQuery = "Design a secure REST API with comprehensive documentation and implement code quality checks"
  
  try {
    console.log(`Query: "${complexQuery}"`)
    const result = await masterOrchestrator.execute(complexQuery, context)
    
    if (result.success) {
      console.log('✅ Multi-agent coordination successful!')
      console.log('Result:', JSON.stringify(result, null, 2))
    } else {
      console.log('❌ Multi-agent coordination failed:', result.error)
    }
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error)
  }

  console.log('\n\n✨ Expert Routing Test Complete!')
}

// Run the test
testExpertRouting().catch(console.error)