# Web Scraping and RAG System Integration

## Overview

This document describes the integration between the Web Scraping Expert and the RAG (Retrieval-Augmented Generation) system for automatic knowledge base management. The system allows scraped web content to be automatically routed to appropriate expert knowledge bases.

## Architecture

### Components

1. **Web Scraping Expert** (`src/agents/experts/WebScrapingExpert.ts`)
   - Handles web scraping operations
   - Analyzes content to determine appropriate expert domain
   - Routes scraped content to expert RAG systems

2. **Vector/RAG Tools** (`src/tools/vector/`)
   - `VectorDatabaseConnector.ts` - Manages vector database connections
   - `EmbeddingGenerator.ts` - Generates embeddings from text
   - `ChunkManager.ts` - Manages text chunking strategies
   - `SimilaritySearcher.ts` - Performs semantic searches
   - `VectorIndexManager.ts` - Manages vector indexes
   - `RAGSystemManager.ts` - Orchestrates RAG system operations

3. **Vector Search Expert** (`src/agents/experts/VectorSearchExpert.ts`)
   - Manages vector search operations
   - Provides interface to all vector tools
   - Handles RAG system queries

## Features

### 1. Automatic Content Routing

The system automatically analyzes scraped content and routes it to the most appropriate expert knowledge base based on:

- Content analysis (keywords, patterns)
- URL patterns
- Page title analysis
- Metadata examination

**Supported Experts:**
- Database Expert (SQL, schemas, queries)
- Vector Search Expert (embeddings, semantic search)
- Architecture Expert (system design, patterns)
- Security Specialist (vulnerabilities, encryption)
- Performance Expert (optimization, profiling)
- API Integration Expert (REST, GraphQL)
- Testing & QA Expert (unit tests, E2E)
- Code Review Expert (best practices)
- Documentation Expert (default)

### 2. Manual Expert Routing

Users can explicitly specify which expert should receive the scraped content:

```typescript
// Example: Route to security expert
await webScrapingExpert.processMessage(
  'Scrape https://example.com and route to security-specialist',
  { saveToRAG: true }
)
```

### 3. Batch Scraping with RAG Integration

The system supports batch scraping with automatic routing for each URL:

```typescript
await webScrapingExpert.processMessage(
  `Scrape these pages and save to knowledge bases:
  - https://postgresql.org/docs
  - https://redis.io/docs
  - https://mongodb.com/docs`,
  { saveToRAG: true }
)
```

## UI Integration

### Web Scraping Page (`typescript-ui/app/web-scraping/page.tsx`)

Features:
- **RAG Integration Toggle** - Enable/disable automatic knowledge base saving
- **Expert Selection** - Choose target expert or use auto-detection
- **Visual Feedback** - Shows RAG routing status after scraping
- **Enhanced UI** - Professional design with OKLCH colors

### Knowledge Base Page (`typescript-ui/app/knowledge-base/page.tsx`)

Features:
- **Expert Overview** - Visual cards for each expert knowledge base
- **Statistics** - Document count, queries, last updated
- **Search Interface** - Search within or across knowledge bases
- **Activity Feed** - Recent additions and updates
- **Knowledge Sources** - Breakdown of content types

### Dashboard Integration

The main dashboard includes:
- Web Scraping link in sidebar with "New" badge
- Knowledge Base link with "RAG" badge
- Vector Search link for advanced searches

## Usage Examples

### 1. Basic Web Scraping with Auto-Routing

```typescript
const result = await webScrapingExpert.processMessage(
  'Scrape https://www.postgresql.org/docs/current/indexes.html and save to knowledge base'
)

// Result includes:
// - Scraped content
// - RAG routing information
// - Target expert determination
```

### 2. Explicit Expert Routing

```typescript
const result = await webScrapingExpert.processMessage(
  'Scrape https://owasp.org/top-ten and route to security-specialist'
)
```

### 3. Batch Processing

```typescript
const result = await webScrapingExpert.processMessage(
  'Batch scrape multiple URLs and save each to appropriate expert knowledge base',
  {
    urls: ['url1', 'url2', 'url3'],
    saveToRAG: true
  }
)
```

## Content Analysis Algorithm

The system uses a scoring algorithm to determine the best expert for content:

1. **Pattern Matching** - Searches for expert-specific keywords
2. **Scoring System**:
   - Content matches: +2 points
   - Title matches: +3 points
   - URL matches: +1 point
3. **Expert Selection** - Highest scoring expert wins
4. **Default Fallback** - Documentation Expert for unclear content

## RAG System Management

### Automatic System Creation

If a RAG system doesn't exist for an expert, it's automatically created:

```typescript
const createResult = await ragSystemManager.execute({
  action: 'create_system',
  expertId: 'database-expert',
  vectorDbConfig: {
    databaseType: 'chroma',
    collection: 'database_expert_knowledge'
  }
})
```

### Content Ingestion

Scraped content is processed and stored:

```typescript
const ingestResult = await ragSystemManager.execute({
  action: 'ingest_scraped',
  systemId: ragSystemId,
  scrapedData: {
    url, title, content, links, images, metadata
  }
})
```

## Testing

Run the integration test:

```bash
npx ts-node test-integrated-rag.ts
```

This tests:
1. Web scraping with automatic routing
2. Explicit expert routing
3. Batch scraping
4. Knowledge base searching
5. Content analysis accuracy

## Configuration

### Supported Vector Databases

- Chroma (default for local development)
- Pinecone
- Weaviate
- Qdrant
- FAISS
- Milvus

### Embedding Models

- Sentence Transformer (default)
- OpenAI Ada
- Cohere
- HuggingFace models

## Best Practices

1. **Content Quality** - Ensure scraped content is meaningful before saving
2. **Expert Selection** - Use auto-detection unless you're certain of the domain
3. **Batch Limits** - Keep batch sizes reasonable (< 10 URLs) for performance
4. **Rate Limiting** - The system includes automatic rate limiting
5. **Error Handling** - Check `ragRouting` in results for success status

## Troubleshooting

### Common Issues

1. **RAG Routing Failed**
   - Check if vector database is running
   - Verify expert ID is valid
   - Ensure content is not empty

2. **Expert Misclassification**
   - Content may be ambiguous
   - Use explicit routing for better control
   - Check content analysis scores

3. **Performance Issues**
   - Reduce batch sizes
   - Check vector database performance
   - Monitor embedding generation time

## Future Enhancements

1. **Multi-Expert Routing** - Route content to multiple relevant experts
2. **Confidence Scores** - Show confidence in expert selection
3. **Custom Expert Definition** - Allow users to define new expert domains
4. **Cross-Expert Search** - Enhanced search across all knowledge bases
5. **Content Deduplication** - Prevent duplicate content in knowledge bases