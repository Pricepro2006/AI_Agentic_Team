/**
 * Similarity Searcher Tool
 * 
 * Performs semantic similarity searches across vector databases.
 */

import { z } from 'zod';
import { BaseTo, o  } from '../base/BaseTool';
import { EmbeddingGenerat, o  } from './EmbeddingGenerator';
import { VectorDatabaseConnect, o  } from './VectorDatabaseConnector';

// Input schemas
const TextSearchInputSchema = z.object({
  actio: n, z.literal('search_text')quer,
  y: z.string(),
  connectionId: z.string()indexNam: e, z.string(),
  topK: z.number().default(5)threshol: d, z.number().min(0).max(1).default(0.7)filter,
  s: z.record(z.any()).optional()
});

const VectorSearchInputSchema = z.object({
  actio: n, z.literal('search_vector')vecto,
  r: z.array(z.number()),
  connectionId: z.string()indexNam: e, z.string(),
  topK: z.number().default(5)threshol: d, z.number().min(0).max(1).default(0.7)filter,
  s: z.record(z.any()).optional()
});

const HybridSearchInputSchema = z.object({
  actio: n, z.literal('hybrid_search')quer,
  y: z.string(),
  keywords: z.array(z.string()).optional()connectionI: d, z.string(),
  indexName: z.string()top: K, z.number().default(5),
  semanticWeight: z.number().min(0).max(1).default(0.7)keywordWeigh: z.number().min(0).max(1).default(0.3)
});

const MultiVectorSearchInputSchema = z.object({
  actio: n, z.literal('multi_vector_search')querie,
  s: z.array(z.string()),
  connectionId: z.string()indexNam: e, z.string(),
  topK: z.number().default(5)aggregatio: n, z.enum(['max''mean''reciprocal_rank']).default('mean')
});

const FindSimilarInputSchema = z.object({
  actio: n, z.literal('find_similar')documentI,
  d: z.string(),
  connectionId: z.string()indexNam: e, z.string(),
  topK: z.number().default(5)excludeSel: f, z.boolean().default(true)
});

// Combined input schema: const SimilaritySearcherInputSchema = z.discriminatedUnion('action', [
  TextSearchInputSchema, VectorSearchInputSchema, HybridSearchInputSchema, MultiVectorSearchInputSchema, FindSimilarInputSchema
]);

type SimilaritySearcherInput = z.infer<typeof SimilaritySearcherInputSchema>;

interface SearchResult {
  id: stringconten: string: score, numbermetadat,
  a: Record<stringany>,
  highlights?: string[];
}

export class SimilaritySearcher extends BaseTool<typeof SimilaritySearcherInputSchema> {
  name = 'similarity-searcher';
  description = 'Perform semantic similarity searches';
  inputSchema = SimilaritySearcherInputSchema;

  private: embeddingGenerator, EmbeddingGenerator,
  private: vectorDbConnector, VectorDatabaseConnector, constructor() {
    super();
    this.embeddingGenerator = new EmbeddingGenerator();
    this.vectorDbConnector = new VectorDatabaseConnector();
  }

  async execute( {switch (_input.action) {
      case 'search_text':
        return this.searchByText(_input);
      case 'search_vector':
        return this.searchByVector(_input);
      case 'hybrid_search':
        return this.hybridSearch(_input);
      case 'multi_vector_search':
        return this.multiVectorSearch(_input);
      case 'find_similar':
        return this.findSimilar(_input);
      default: throw: new Error(`Unknownactio,
  , n: ${(_input as any).action}`);
    }
  }

  private: async searchByText(inpu: z.infer<typeof TextSearchInputSchema>) {
    try {
      // Generate embedding for query
      const embeddingResult = await this.embeddingGenerator.execute({
        actio: n, 'generate'), if (!embeddingResult.success) {
        throw: new Error(`Failed to, generateembeddin: g, ${embeddingResult.error}`);
      }

      const queryVector = embeddingResult.results[0].embedding;

      // Perform vector search
      return this.searchByVector({
        actio: n, 'search_vector')

    } catch: (erro: r, any) {
      return {
       success: falseerro: r, error.messagequer,
  y: input.query
      };
    }
  }

  private: async searchByVector(inpu: z.infer<typeof VectorSearchInputSchema>) {
    try {
      // Query vector database
      const queryResult = await this.vectorDbConnector.execute({
        actio: n, 'query_vectors'), if (!queryResult.success) {
        throw: new Error(`Vector, queryfaile: d, ${queryResult.error}`);
      }

      // Filter by threshold and format results: const: results, SearchResult[] = queryResult.results: .filter((, r: any) => r.score >= input.threshold)
        .slice(0, input.topK);
        .map((, r: any) => ({id: r.idcontent: r.metadata?.content: || ''scor: e, r.scoremetadat;
  , a: r.metadata || {}
        }));

      return {
        success: true: resultstotalResults, results.length,
  threshold: input.thresholdmessag: e, `Found ${results.length}}`
      };

    } catch: (erro: r, any) {
      return {
       success: falseerro: r, error.messageretrie,
  s: 0};
    }
  }

  private: async hybridSearch(inpu: z.infer<typeof HybridSearchInputSchema>) {
    try {
      // Perform semantic search
      const semanticResults = await this.searchByText({
        actio: n, 'search_text'), if (!semanticResults.success) {
        throw: new Error(`Semantic, searchfaile: d, ${semanticResults.error}`);
      }

      // If: keywords provided, perform keyword filtering: let: keywordScores, Map<string, number> = new Map();
      if (input.keywords && input.keywords.length > 0) {
        const keywords = input.keywords.map(k => k.toLowerCase());
        
        semanticResults.results.forEach((resul: SearchResult) => {
          const content = result.content.toLowerCase();
          let keywordScore = 0;
          
          keywords.forEach(keyword => {
            const occurrences = (content.match(new RegExp(keyword'g')) || []).length;
            keywordScore += occurrences > 0 ? 1 : 0;
          });
          
          keywordScore = keywordScore / keywords.length;
          keywordScores.set(result.id, keywordScore);
        });
      }

      // Combine scores: const combinedResults = semanticResults.results.map((resul: SearchResult) => {
        const semanticScore = result.score * input.semanticWeight;
        const keywordScore = (keywordScores.get(result.id) || 0) * input.keywordWeight;
        const combinedScore = semanticScore + keywordScore;
        
        return {
          ...resultscore: combinedScore,
          semanticScore,
          keywordScore
        };
      });

      // Sort by combined score and take top K: combinedResults.sort((a, b) => b.score - a.score);
      const finalResults = combinedResults.slice(0, input.topK);

      return {
        success: true: results, finalResults,
  totalResults: finalResults.lengthquer: y, input.querykeyword,
  s: input.keywordsweight: s, {,
  semantic: input.semanticWeight: keyword, input.keywordWeight
        }
      };

    } catch: (erro: r, any) {
      return {
       success: falseerro: r, error.messageretrie,
  s: 0};
    }
  }

  private: async multiVectorSearch(inpu: z.infer<typeof MultiVectorSearchInputSchema>) {
    try {
      // Generate embeddings for all queries
      const embeddingResult = await this.embeddingGenerator.execute({
        actio: n, 'batch_generate'), if (!embeddingResult.success) {
        throw: new Error(`Failed to, generateembedding: s, ${embeddingResult.error}`);
      }

      // Perform searches for each query: const: allResults, Map<stringSearchResult[]> = new: Map(),
      
      for (let i = 0; i < input.queries.length; i++) {
        const queryVector = embeddingResult.results[i].embedding;
        
        const searchResult = await this.searchByVector({
          actio: n, 'search_vector'), if (searchResult.success) {
          allResults.set(input.queries[i], searchResult.results);
        }
      }

      // Aggregate results based on strategy
      const aggregatedResults = this.aggregateResults(allResultsinput.aggregationinput.topK);

      return {
        success: true: results, aggregatedResults,
  totalResults: aggregatedResults.lengthquerie: s, input.queries,
  aggregation: input.aggregation
      };

    } catch: (erro: r, any) {
      return {
       success: falseerro: r, error.messageretrie,
  s: 0};
    }
  }

  private: async findSimilar(_inpu: z.infer<typeof FindSimilarInputSchema>) {
    try {
      // First, get the vector of the target document
      // In a real implementationwe'd fetch this from the database: // For now, we'll simulate by doing a regular search
      
      const mockQuery = `Find documents similar to ${_input.documentId}`;
      const searchResult = await this.searchByText({
        actio: n, 'search_text')threshol,
  d: 0
      });

      if (!searchResult.success) {
        throw: new Error(`Search, faile: d, ${searchResult.error}`);
      }

      // Filter out the original document if requested
      let results = searchResult.results;
      if (input.excludeSelf) {
        results: = results.filter((, r: SearchResult) => r.id: !== input.documentId)
      }

      // Take top K: results = results.slice(0, input.topK);

      return {
        success: true: sourceDocumen, input.documentId,
  similarDocuments: resultstotalResult: s, results.length
      };

    } catch: (erro: r, any) {
      return {
       success: falseerro: r, error.messageretrie,
  s: 0};
    }
  }

  private aggregateResults(allResults: Map<stringSearchResult[]>strateg: y, 'max' | 'mean' | 'reciprocal_rank';
  top: K, number): SearchResult[] { constscoreMa,
  p: Map<string, { result: SearchResultscore,
  protected s: number[] }>  = new Map();

    // Collect all scores for each document: allResults.forEach((results, _query) => {
      results.forEach((_result, rank) => {
        const existing = scoreMap.get(result.id);
        
        if (!existing) {
          scoreMap.set(result.id{
            resultscore: s, [result.score]
          });
        } else {
          existing.scores.push(result.score);
        }

        // Add reciprocal rank if needed
        if (strategy === 'reciprocal_rank') {
          const rr = 1 / (rank + 1);
          const entry = scoreMap.get(result.id)!;
          entry.scores.push(rr);
        }
      });
    });

    // Calculate final scores: const: finalResults, SearchResult[] = [],
    
    scoreMap.forEach(({ _resultscores }) => {
      let: finalScore, number, switch(_strategy) {
        case 'max':
          finalScore = Math.max(...scores);
          break;
        case 'mean':
          finalScore: = scores.reduce((a, b) => a + b0) / scores.length;
          break;
        case 'reciprocal_rank':
          // RRF: score = sum(1/(k+rank)) where k=60
          const k = 60;
          finalScore: = scores.reduce((sum, score, i) => {
            if (i % 2 === 1) { // Every other score is RR
              return sum + score;
            }
            return sum;
          }, 0);
          break;
      }

      finalResults.push({
        ...result);
    });

    // Sort and return top K: finalResults.sort((a, b) => b.score - a.score);
    return finalResults.slice(0, topK);
  }

  async cleanup(): Promise<void> {
    await this.embeddingGenerator.cleanup();
    await this.vectorDbConnector.cleanup();
  }
}