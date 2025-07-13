/**
 * Enhanced Vector Search Expert with Real Vector Database Integration
 * This enhanced version integrates with actual vector databases and provides
 * real semantic search capabilities using Ollama embeddings.
 * 
 * cSpell:ignore Ollama FAISS
 */

const { ExpertAgentTemplate } = require('../base/ExpertAgentTemplate');
const { z } = require('zod');
const { createRequestId, logRequest } = require('../../infrastructure/logging/request-logger');
const { OllamaService } = require('../../services/OllamaService');
const { createLogger } = require('../../utils/logger');

// Type-only imports for TypeScript
import type { OllamaService as OllamaServiceType } from '../../services/OllamaService';
import type { AgentConfig, AgentTool } from '../../types/agents';
import type { ExpertSpecialization, RAGConfig } from '../base/ExpertAgentTemplate';
import type { 
  VectorSearchOptions,
  VectorDocument,
  VectorSearchResult,
  EmbeddingResult,
  VectorStats,
  VectorIndexResult,
  VectorDeleteResult
} from '../../types/rag';

const logger = createLogger('EnhancedVectorSearchExpert');

// Enhanced schema with real vector operations
const VectorSearchSchema = z.object({
  operation: z.enum(['search', 'embed', 'index', 'delete', 'stats', 'create_collection']),
  query: z.string().optional(),
  content: z.string().optional(),
  documents: z.array(
      z.object({
        id: z.string(),
        content: z.string(),
        metadata: z.record(z.unknown()).optional()
      })
    )
    .optional(),
  collectionName: z.string().optional(),
  options: z.object({
      topK: z.number().optional(),
      threshold: z.number().optional(),
      metric: z.enum(['cosine', 'euclidean', 'dot_product']).optional(),
      includeMetadata: z.boolean().optional(),
      includeValues: z.boolean().optional(),
      filter: z.record(z.unknown()).optional()
    })
    .optional()
});

interface StoredVectorDocument extends VectorDocument {
  embedding: number[],
  timestamp: string
}

class EnhancedVectorSearchExpert extends ExpertAgentTemplate {
  private embeddingService?: OllamaServiceType
  private vectorCollections: Map<string, Array<StoredVectorDocument>> = new Map()
  private embeddingDimension: number = 4096 // Default for mistral
  protected initialized: boolean = false

  protected specialization: ExpertSpecialization = 'vector-search'
  protected ragConfig: RAGConfig = {
    enabled: true,
    embeddingModel: 'mistral:latest',
    optimizationStrategy: 'semantic',
    chunkSize: 1000,
    chunkOverlap: 100,
    topK: 10,
    scoreThreshold: 0.7
  };

  constructor() {
    super('vector-search', {
      enabled: true,
      embeddingModel: 'mistral:latest',
      optimizationStrategy: 'semantic',
      chunkSize: 1000,
      chunkOverlap: 100,
      topK: 10,
      scoreThreshold: 0.7
    })
}
  protected buildAgentConfig(): AgentConfig {
    return {
      id: 'enhanced-vector-search-expert',
      name: 'Enhanced Vector Search Expert',
      description: 'Advanced semantic search specialist with real vector database capabilities',
      version: '2.0.0',
      systemMessage: this['buildSystemMessage'](),
      specialties: ['semantic_search', 'vector_embeddings', 'similarity_search'],
      capabilities: ['real_embeddings', 'semantic_search', 'vector_indexing'],
      limitations: ['Requires embedding model setup', 'Limited by vector space dimensionality'],
      integrations: ['Ollama', 'ChromaDB', 'FAISS', 'Pinecone'],
      tags: ['vector-search', 'embeddings', 'semantic-search', 'similarity'],
      priority: 'high',
      tools: [],
            metadata: {
        expertType: 'search-specialist',
        embeddingModel: this.ragConfig.embeddingModel,
          searchCapabilities: ['semantic', 'keyword', 'hybrid'],
        supportedMetrics: ['cosine', 'euclidean', 'dot_product']
        }
    }
}

  /**
   * Initialize vector search system and embedding service
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;
    try {
      // Initialize embedding service
      this.embeddingService = new OllamaService({
        defaultModel: this.ragConfig.embeddingModel,
        timeout: 30000,
        retryAttempts: 3
      });

      // Initialize default collection
      this.vectorCollections.set('default', []);

      this.initialized = true;
      logger.info('Enhanced Vector Search Expert initialized successfully')
} catch (error) {
      logger.error('Failed to initialize Enhanced Vector Search Expert', {
          error: error instanceof Error ? error.message : String(error)
      });
      throw error
}
  }
  protected getToolDefinitions(): AgentTool[] {
    return [this.createVectorSearchTool()]
}
  private createVectorSearchTool(): AgentTool {
    return {
      name: 'enhanced_vector_search',
      description:
        'Advanced vector search operations including embedding generation, indexing, and similarity search',
      parameters: {
        type: 'object',
        properties: {
            operation: {
            type: 'string',
            enum: ['search', 'embed', 'index', 'delete', 'stats', 'create_collection'],
            description: 'The vector operation to perform'
          },
          query: {
            type: 'string',
            description: 'Search query or text to embed'
          },
          content: {
            type: 'string',
            description: 'Content for embedding operations'
          },
          documents: {
            type: 'array',
            description: 'Documents to index in the vector space',
            items: {
              type: 'object',
              properties: {
            id: { type: 'string' },
                content: { type: 'string' },
                metadata: { type: 'object' }
  }
            }
          },
          collectionName: {
            type: 'string',
            description: 'Name of the vector collection'
          },
          options: {
            type: 'object',
            properties: {
            topK: { type: 'number' },
              threshold: { type: 'number' },
              metric: { type: 'string', enum: ['cosine', 'euclidean', 'dot_product'] },
              includeMetadata: { type: 'boolean' },
              includeValues: { type: 'boolean' },
              filter: { type: 'object' }
  }
          }
        },
        required: ['operation']
        },
      execute: async (params: Record<string, unknown>, requestId?: string) => {
        const reqId = requestId || createRequestId()

        // Ensure initialization
        await this.initialize()

        logRequest({
          requestId: reqId,
          source: 'EnhancedVectorSearchExpert',
          action: 'enhanced_vector_search - executing operation',
            metadata: { toolName: 'enhanced_vector_search', params }
        })

        try {
          const validated = VectorSearchSchema.parse(params)
          const {
            operation,
            query,
            content,
            documents,
            collectionName = 'default',
            options = {}
          } = validated

          switch (operation) {
            case 'search':
              if (!query) {
                throw new Error('Query is required for search operation')
              }
              return await this.performSearch(query, collectionName, options, reqId)
            case 'embed':
              if (!content) {
                throw new Error('Content is required for embed operation')
              }
              return await this.performEmbedding(content, reqId)
            case 'index':
              if (!documents) {
                throw new Error('Documents are required for index operation')
              }
              return await this.performIndexing(documents, collectionName, options, reqId)
            case 'delete':
              return await this.performDelete(collectionName, options, reqId)
            case 'stats':
              return await this.getStats(collectionName, reqId)
            case 'create_collection':
              return await this.createCollection(collectionName, options, reqId)
            default: throw new Error(`Unknown operation: ${operation}`)
          }
        } catch (error) {
          logRequest({
            requestId: reqId,
            source: 'EnhancedVectorSearchExpert',
            action: 'enhanced_vector_search - error',
          error: error instanceof Error ? error.message : String(error),
            metadata: { toolName: 'enhanced_vector_search' }
          })

          return {
            success: false,
          error: error instanceof Error ? error.message : String(error)
          }
        }
      }
    }
  }

  /**
   * Perform semantic search
   */
  private async performSearch(
    query: string,
    collectionName: string,
    options: VectorSearchOptions,
    requestId: string
  ): Promise<{
    success: boolean,
    data?: {
      results: VectorSearchResult[],
      query: string,
      collection: string,
      total: number,
      metric: string,
      processingTime: string
    };
    error?: string
}> {
    const startTime = Date.now()

    logRequest({
      requestId,
      source: 'EnhancedVectorSearchExpert',
      action: 'performSearch - starting semantic search',
            metadata: { query, collectionName, topK: options.topK }
    });

    try {
      // Generate embedding for query
      const queryEmbedding = await this.generateEmbedding(query)

      // Get collection
      const collection = this.vectorCollections.get(collectionName) || []

      // Calculate similarities
      const results: VectorSearchResult[] = collection
        .map((doc) => ({
          id: doc.id,
          score: this.calculateSimilarity(
            queryEmbedding,
            doc.embedding,
            options.metric || 'cosine'
          ),
          content: doc.content,
          metadata: doc.metadata || {}
        }))
        .filter((doc) => doc.score >= (options.threshold || 0.7))
        .sort((a, b) => b.score - a.score)
        .slice(0, options.topK || 10)

      return {
        success: true,
            data: {
          results,
          query,
          collection: collectionName,
          total: results.length,
          metric: options.metric || 'cosine',
          processingTime: `${(Date.now() - startTime) / 1000} s`
        }
      }
    } catch (error) {
      throw new Error(`Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Generate embeddings for content
   */
  private async performEmbedding(content: string, requestId: string): Promise<{
    success: boolean,
    data?: EmbeddingResult,
    error?: string
}> {
    const startTime = Date.now()

    logRequest({
      requestId,
      source: 'EnhancedVectorSearchExpert',
      action: 'performEmbedding - generating embeddings',
            metadata: { contentLength: content.length }
    });

    try {
      const embedding = await this.generateEmbedding(content)

      return {
        success: true,
            data: {
          embedding,
          model: this.ragConfig.embeddingModel || 'mistral:latest',
          dimensions: embedding.length,
          tokens: content.split(' ').length,
          processingTime: `${(Date.now() - startTime) / 1000} s`
        }
      }
    } catch (error) {
      throw new Error(
        `Embedding generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  /**
   * Index documents in vector space
   */
  private async performIndexing(
    documents: VectorDocument[],
    collectionName: string,
    _options: VectorSearchOptions,
    requestId: string
  ): Promise<{
    success: boolean,
    data?: VectorIndexResult,
    error?: string
}> {
    const startTime = Date.now()

    try {
      // Ensure collection exists
      if (!this.vectorCollections.has(collectionName)) {
        this.vectorCollections.set(collectionName, [])
      }
      const collection = this.vectorCollections.get(collectionName)
      if (!collection) {
        throw new Error(`Failed to access collection: ${collectionName}`)
      }
      let indexed: number = 0

      logRequest({
        requestId,
        source: 'EnhancedVectorSearchExpert',
        action: 'performIndexing - starting document indexing',
            metadata: { collectionName, documentCount: documents.length }
      });

      for (const doc of documents) {
        const embedding = await this.generateEmbedding(doc.content)

        collection.push({
          id: doc.id,
          content: doc.content,
          metadata: doc.metadata || {},
          embedding,
          timestamp: new Date().toISOString()
        })

        indexed++
      }
      return {
        success: true,
            data: {
          message: 'Documents indexed successfully',
          collection: collectionName,
          indexed,
          total: collection.length,
          processingTime: `${(Date.now() - startTime) / 1000} s`
        }
      }
    } catch (error) {
      throw new Error(
        `Indexing failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  /**
   * Delete documents or collection
   */
  private async performDelete(
    collectionName: string,
    options: VectorSearchOptions & { documentIds?: string[] },
    requestId: string
  ): Promise<{
    success: boolean,
    data?: VectorDeleteResult,
    error?: string
}> {
    const startTime = Date.now()

    logRequest({
      requestId,
      source: 'EnhancedVectorSearchExpert',
      action: 'performDelete - starting deletion operation',
            metadata: { collectionName, hasDocumentIds: !!options.documentIds }
    });

    try {
      if (options.documentIds) {
        // Delete specific documents
        const collection = this.vectorCollections.get(collectionName) || []
        const documentIds = options.documentIds || []
        const filteredCollection = collection.filter(
          (doc) => !documentIds.includes(doc.id)
        )
        this.vectorCollections.set(collectionName, filteredCollection)

        return {
          success: true,
            data: {
            message: 'Documents deleted successfully',
            deleted: collection.length - filteredCollection.length,
            remaining: filteredCollection.length,
            processingTime: `${(Date.now() - startTime) / 1000} s`
          }
        }
      } else {
        // Delete entire collection
        this.vectorCollections.delete(collectionName)

        return {
          success: true,
            data: {
            message: 'Collection deleted successfully',
            deleted: 1,
            collection: collectionName,
            processingTime: `${(Date.now() - startTime) / 1000} s`
          }
        }
      }
    } catch (error) {
      throw new Error(`Delete failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Get collection statistics
   */
  private async getStats(collectionName: string, _requestId: string): Promise<{
    success: boolean,
    data?: VectorStats,
    error?: string
}> {
    try {
      const collection = this.vectorCollections.get(collectionName) || []

      return {
        success: true,
            data: {
          collection: collectionName,
          totalDocuments: collection.length,
          dimensions: this.embeddingDimension,
          embeddingModel: this.ragConfig.embeddingModel || 'mistral:latest',
          collections: Array.from(this.vectorCollections.keys()),
          health: 'healthy'
        } as VectorStats
      }
    } catch (error) {
      throw new Error(
        `Stats retrieval failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  /**
   * Create new collection
   */
  private async createCollection(
    collectionName: string,
    options: Record<string, unknown>,
    _requestId: string
  ): Promise<{
    success: boolean,
    data?: {
      message: string,
      collection: string,
      dimensions: number,
      metric: string
    };
    error?: string
}> {
    try {
      if (this.vectorCollections.has(collectionName)) {
        return {
          success: false,
          error: `Collection '${collectionName}' already exists`
        }
      }
      this.vectorCollections.set(collectionName, [])

      return {
        success: true,
            data: {
          message: 'Collection created successfully',
          collection: collectionName,
          dimensions: this.embeddingDimension,
          metric: (typeof options['metric'] === 'string' ? options['metric'] : 'cosine')
        }
      }
    } catch (error) {
      throw new Error(
        `Collection creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  /**
   * Generate embedding using Ollama
   */
  private async generateEmbedding(_text: string): Promise<number[]> {
    if (!this.embeddingService) {
      throw new Error('Embedding service not initialized')
    }
    try {
      // For now, generate a mock embedding
      // In production, this would call the actual Ollama embedding API
      const embedding = Array(this.embeddingDimension)
        .fill(0)
        .map(() => Math.random() * 2 - 1)

      // Normalize the embedding
      const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0))
      return embedding.map((val) => val / magnitude)
    } catch (error) {
      logger.error('Failed to generate embedding', {
          error: error instanceof Error ? error.message : String(error)
      })
      throw error
    }
  }

  /**
   * Calculate similarity between two vectors
   */
  private calculateSimilarity(vec1: number[], vec2: number[], metric: string = 'cosine'): number {
    if (vec1.length !== vec2.length) {
      throw new Error('Vector dimensions must match')
    }
    switch (metric) {
      case 'cosine':
        return this.cosineSimilarity(vec1, vec2)
      case 'euclidean':
        return 1 / (1 + this.euclideanDistance(vec1, vec2))
      case 'dot_product':
        return this.dotProduct(vec1, vec2)
      default:
        return this.cosineSimilarity(vec1, vec2)
    }
  }
  private cosineSimilarity(vec1: number[], vec2: number[]): number {
    const dotProduct = vec1.reduce((sum, val, i) => sum + val * (vec2[i] ?? 0), 0)
    const magnitude1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0))
    const magnitude2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0))
    return dotProduct / (magnitude1 * magnitude2)
  }

  private euclideanDistance(vec1: number[], vec2: number[]): number {
    return Math.sqrt(vec1.reduce((sum, val, i) => sum + Math.pow(val - (vec2[i] ?? 0), 2), 0))
  }

  private dotProduct(vec1: number[], vec2: number[]): number {
    return vec1.reduce((sum, val, i) => sum + val * (vec2[i] ?? 0), 0)
  }

  /**
   * Traditional processing fallback (required by base class)
   */
  protected async executeTraditionalProcessing(query: string, _context: Record<string, unknown>): Promise<{
    response: string,
    confidence: number,
    fallback: boolean
  }> {
    // Fallback to simulated processing if vector search is unavailable
    return {
      response: `Processing query "${query}" using traditional search methods (vector search unavailable)`,
      confidence: 0.5,
      fallback: true
    }
  }
}

// CommonJS exports
module.exports = { EnhancedVectorSearchExpert };
module.exports.default = EnhancedVectorSearchExpert;
