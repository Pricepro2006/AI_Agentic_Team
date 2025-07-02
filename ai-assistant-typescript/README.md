# AI Assistant TypeScript

Production-ready TypeScript implementation of the AI Agentic Team system with integrated web scraping and RAG-powered knowledge bases.

## 🏗️ Architecture

This system implements 26 specialized AI experts using TypeScript and the Mastra framework, featuring:
- 🌐 Advanced web scraping capabilities without MCP dependencies
- 🧠 RAG (Retrieval-Augmented Generation) system integration
- 🔍 Automatic content routing to expert knowledge bases
- 💾 Support for multiple vector databases (Chroma, Pinecone, Weaviate, etc.)
- 🎨 Professional UI with OKLCH color system

## ✨ Key Features

### Web Scraping & RAG Integration
- **Intelligent Content Routing**: Automatically routes scraped content to appropriate expert knowledge bases
- **Multi-Strategy Scraping**: Static (Cheerio), Dynamic (Puppeteer/Playwright), and Batch scraping
- **Anti-Detection**: Stealth mode, user agent rotation, and proxy support
- **RAG System Management**: Automatic creation and management of expert-specific knowledge bases

### Expert Knowledge Bases
- Database Expert - SQL, schemas, query optimization
- Vector Search Expert - Embeddings, semantic search, RAG systems
- Architecture Expert - System design, patterns, scalability
- Security Specialist - Vulnerabilities, encryption, OWASP
- Performance Expert - Optimization, profiling, benchmarking
- And 21 more specialized experts...

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Start development server
npm run dev
```

## 📁 Project Structure

- `src/agents/` - AI expert implementations
- `src/tools/` - Tool implementations
- `src/infrastructure/` - Core infrastructure (logging, monitoring, etc.)
- `src/integration/` - External service integrations
- `src/orchestration/` - Expert orchestration logic
- `tests/` - Comprehensive test suite
- `n8n/` - N8N workflow integration
- `docs/` - Documentation

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test suite
npm test -- --testPathPattern=agents

# Run E2E tests
npm run test:e2e
```

## 📊 Quality Standards

- TypeScript strict mode
- >95% test coverage
- Zero `any` types
- Comprehensive error handling
- Performance monitoring

## 🔧 Development

```bash
# Start development mode
npm run dev

# Run linting
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

## 📦 Deployment

```bash
# Build for production
npm run build:prod

# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:prod
```

## 🌐 Web Scraping & RAG Usage

### Basic Web Scraping with Auto-Routing
```typescript
// Scrape and automatically route to appropriate expert
await webScrapingExpert.processMessage(
  'Scrape https://postgresql.org/docs and save to knowledge base'
)
```

### Explicit Expert Routing
```typescript
// Route to specific expert
await webScrapingExpert.processMessage(
  'Scrape https://owasp.org and route to security-specialist'
)
```

### Batch Scraping
```typescript
// Scrape multiple URLs
await webScrapingExpert.processMessage(
  'Batch scrape these URLs and save to knowledge bases: url1, url2, url3'
)
```

## 📚 Documentation

- `docs/WEB_SCRAPING_RAG_INTEGRATION.md` - Web scraping and RAG integration guide
- `docs/` - Additional comprehensive documentation
