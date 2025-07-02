#!/usr/bin/env ts-node

/**
 * Simple demonstration of Web Scraping and RAG integration
 * This simulates the functionality without requiring the full UI
 */

import { WebScrapingExpert } from './src/agents/experts/WebScrapingExpert'
import { VectorSearchExpert } from './src/agents/experts/VectorSearchExpert'

async function demonstrateRAGIntegration() {
  console.log('🚀 Web Scraping & RAG Integration Demo\n')
  console.log('=' * 60)
  
  const webScrapingExpert = new WebScrapingExpert()
  const vectorSearchExpert = new VectorSearchExpert()
  
  // Demo 1: Simulate scraping a PostgreSQL documentation page
  console.log('\n📝 Demo 1: Scraping PostgreSQL Documentation')
  console.log('-' * 40)
  
  const postgresResult = await webScrapingExpert.processMessage(
    'Scrape https://www.postgresql.org/docs/current/indexes.html and save to knowledge base',
    { 
      saveToRAG: true,
      simulateOnly: true // Simulate for demo
    }
  )
  
  console.log('Scraped URL:', postgresResult.data?.url)
  console.log('Target Expert:', postgresResult.data?.ragRouting?.expert || 'database-expert')
  console.log('RAG System ID:', postgresResult.data?.ragRouting?.ragSystemId || 'db-expert-rag-001')
  console.log('Status:', postgresResult.data?.ragRouting?.success ? '✅ Success' : '❌ Failed')
  
  // Demo 2: Explicit routing to Security Expert
  console.log('\n\n🔒 Demo 2: Scraping Security Content with Explicit Routing')
  console.log('-' * 40)
  
  const securityResult = await webScrapingExpert.processMessage(
    'Scrape https://owasp.org/www-project-top-ten/ and route to security-specialist',
    { 
      saveToRAG: true,
      targetExpert: 'security-specialist',
      simulateOnly: true
    }
  )
  
  console.log('Scraped URL:', securityResult.data?.url)
  console.log('Target Expert:', securityResult.data?.ragRouting?.expert || 'security-specialist')
  console.log('RAG System ID:', securityResult.data?.ragRouting?.ragSystemId || 'sec-expert-rag-001')
  console.log('Status:', securityResult.data?.ragRouting?.success ? '✅ Success' : '❌ Failed')
  
  // Demo 3: Auto-routing based on content
  console.log('\n\n🤖 Demo 3: Auto-Routing Based on Content Analysis')
  console.log('-' * 40)
  
  const testContent = {
    'Database optimization techniques including indexing': 'database-expert',
    'Vector embeddings and semantic search implementation': 'vector-search-expert',
    'SQL injection prevention and security best practices': 'security-specialist',
    'React performance optimization and profiling': 'performance-optimization-expert'
  }
  
  for (const [content, expectedExpert] of Object.entries(testContent)) {
    const result = await webScrapingExpert.analyzeContentForExpert(content)
    console.log(`\nContent: "${content.substring(0, 50)}..."\nDetected Expert: ${result.expert}\nExpected: ${expectedExpert}\nMatch: ${result.expert === expectedExpert ? '✅' : '❌'}`)
  }
  
  // Demo 4: Show available experts
  console.log('\n\n📚 Available Expert Knowledge Bases')
  console.log('-' * 40)
  
  const experts = [
    { id: 'database-expert', name: 'Database Expert', focus: 'SQL, schemas, query optimization' },
    { id: 'vector-search-expert', name: 'Vector Search Expert', focus: 'Embeddings, semantic search, RAG' },
    { id: 'architecture-expert', name: 'Architecture Expert', focus: 'System design, patterns, scalability' },
    { id: 'security-specialist', name: 'Security Specialist', focus: 'Vulnerabilities, encryption, OWASP' },
    { id: 'performance-optimization-expert', name: 'Performance Expert', focus: 'Optimization, profiling, benchmarking' },
    { id: 'api-integration-expert', name: 'API Integration Expert', focus: 'REST, GraphQL, webhooks' },
    { id: 'testing-qa-expert', name: 'Testing & QA Expert', focus: 'Unit tests, E2E, quality assurance' },
    { id: 'code-review-expert', name: 'Code Review Expert', focus: 'Best practices, code quality' },
    { id: 'documentation-expert', name: 'Documentation Expert', focus: 'Technical writing, API docs' }
  ]
  
  experts.forEach(expert => {
    console.log(`\n${expert.name} (${expert.id})`)
    console.log(`Focus: ${expert.focus}`)
  })
  
  console.log('\n\n✅ Demo Complete!')
  console.log('=' * 60)
  
  // Cleanup
  await webScrapingExpert.cleanup()
  await vectorSearchExpert.cleanup()
}

// Run the demo
demonstrateRAGIntegration().catch(console.error)