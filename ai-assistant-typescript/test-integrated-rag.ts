#!/usr/bin/env ts-node

/**
 * Test script for integrated Web Scraping and RAG system
 * 
 * This tests:
 * 1. Web scraping with WebScrapingExpert
 * 2. Automatic routing to expert RAG systems
 * 3. Knowledge base integration
 */

import { WebScrapingExpert } from './src/agents/experts/WebScrapingExpert'
import { VectorSearchExpert } from './src/agents/experts/VectorSearchExpert'

async function testIntegratedSystem() {
  console.log('🧪 Testing Integrated Web Scraping + RAG System\n')
  
  const webScrapingExpert = new WebScrapingExpert()
  const vectorSearchExpert = new VectorSearchExpert()
  
  // Test 1: Scrape a database-related page and route to Database Expert
  console.log('Test 1: Scraping database content and routing to Database Expert')
  console.log('=' * 60)
  
  try {
    const databaseTestResult = await webScrapingExpert.processMessage(
      'Scrape https://www.postgresql.org/docs/current/indexes.html and save to knowledge base',
      { saveToRAG: true }
    )
    
    console.log('Result:', JSON.stringify(databaseTestResult, null, 2))
    
    if (databaseTestResult.data?.ragRouting?.success) {
      console.log('✅ Successfully routed to:', databaseTestResult.data.ragRouting.expert)
      console.log('   RAG System ID:', databaseTestResult.data.ragRouting.ragSystemId)
    }
  } catch (error) {
    console.error('❌ Test 1 failed:', error)
  }
  
  console.log('\n')
  
  // Test 2: Scrape a security-related page with explicit routing
  console.log('Test 2: Scraping security content with explicit routing')
  console.log('=' * 60)
  
  try {
    const securityTestResult = await webScrapingExpert.processMessage(
      'Scrape https://owasp.org/www-project-top-ten/ and route to security-specialist',
      { saveToRAG: true }
    )
    
    console.log('Result:', JSON.stringify(securityTestResult, null, 2))
    
    if (securityTestResult.data?.ragRouting?.success) {
      console.log('✅ Successfully routed to:', securityTestResult.data.ragRouting.expert)
      console.log('   RAG System ID:', securityTestResult.data.ragRouting.ragSystemId)
    }
  } catch (error) {
    console.error('❌ Test 2 failed:', error)
  }
  
  console.log('\n')
  
  // Test 3: Batch scraping with automatic routing
  console.log('Test 3: Batch scraping with automatic content routing')
  console.log('=' * 60)
  
  try {
    const batchTestResult = await webScrapingExpert.processMessage(
      `Scrape these pages and save to appropriate knowledge bases:
      - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
      - https://nodejs.org/api/cluster.html
      - https://jestjs.io/docs/getting-started`,
      { saveToRAG: true }
    )
    
    console.log('Result:', JSON.stringify(batchTestResult, null, 2))
    
    if (batchTestResult.success) {
      console.log('✅ Batch scraping completed')
      console.log('   Summary:', batchTestResult.summary)
    }
  } catch (error) {
    console.error('❌ Test 3 failed:', error)
  }
  
  console.log('\n')
  
  // Test 4: Search in expert knowledge bases
  console.log('Test 4: Searching in expert knowledge bases')
  console.log('=' * 60)
  
  try {
    const searchResult = await vectorSearchExpert.processMessage(
      'Search for "PostgreSQL index optimization" in database-expert knowledge base'
    )
    
    console.log('Search Result:', JSON.stringify(searchResult, null, 2))
    
    if (searchResult.success && searchResult.results?.length > 0) {
      console.log('✅ Found', searchResult.results.length, 'relevant results')
      console.log('   Top result score:', searchResult.results[0].score)
    }
  } catch (error) {
    console.error('❌ Test 4 failed:', error)
  }
  
  console.log('\n')
  
  // Test 5: Test content analysis and auto-routing
  console.log('Test 5: Content analysis and automatic expert routing')
  console.log('=' * 60)
  
  const testContents = [
    {
      content: 'This article discusses SQL query optimization techniques including proper indexing strategies and query plan analysis.',
      expectedExpert: 'database-expert'
    },
    {
      content: 'Learn about vector embeddings, semantic search, and how to implement RAG systems with Pinecone.',
      expectedExpert: 'vector-search-expert'
    },
    {
      content: 'OWASP Top 10 vulnerabilities and how to prevent SQL injection attacks in your applications.',
      expectedExpert: 'security-specialist'
    }
  ]
  
  for (const test of testContents) {
    try {
      // Create a mock scraped data object
      const mockScrapedData = {
        url: 'https://example.com/test',
        title: 'Test Article',
        content: test.content,
        links: [],
        images: [],
        metadata: {}
      }
      
      const routingResult = await webScrapingExpert.routeToExpertRAG(mockScrapedData)
      
      console.log(`Content: "${test.content.substring(0, 50)}..."`)
      console.log(`Expected: ${test.expectedExpert}`)
      console.log(`Actual: ${routingResult.expert}`)
      console.log(`Match: ${routingResult.expert === test.expectedExpert ? '✅' : '❌'}`)
      console.log('---')
    } catch (error) {
      console.error('❌ Routing test failed:', error)
    }
  }
  
  console.log('\n🎉 Integration test completed!')
  
  // Cleanup
  await webScrapingExpert.cleanup()
  await vectorSearchExpert.cleanup()
}

// Run the test
testIntegratedSystem().catch(console.error)