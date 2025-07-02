/**
 * Similarity Searcher Tool
 * 
 * Performs semantic similarity searches across vector databases.
 */

import { z } from 'zod';
import { BaseTo, o } from '../base/BaseTool';
import { EmbeddingGenerat, o } from './EmbeddingGenerator';
import { VectorDatabaseConnect, o } from './VectorDatabaseConnector';

// Input schemas
const TextSearchInputSchem: a = z.object({
  actio:, nz.literal('search_text'), quer,
  y: z.string(),
  connectionId: z.string(), indexNam: ez.string(),
  topK: z.number().default(5)threshol: dz.number().min(0).max(1).default(0.7)filter,
  s: z.record(z.any()).optional()
});

const VectorSearchInputSchem: a = z.object({
  actio:, nz.literal('search_vector'), vecto,
  r: z.array(z.number()),
  connectionId: z.string(), indexNam: ez.string(),
  topK: z.number().default(5)threshol: dz.number().min(0).max(1).default(0.7)filter,
  s: z.record(z.any()).optional()
});

const HybridSearchInputSchem: a = z.object({
  actio:, nz.literal('hybrid_search'), quer,
  y: z.string(),
  keywords: z.array(z.string()).optional()connectionI: dz.string(),
  indexName: z.string(), top: Kz.number().default(5),
  semanticWeight: z.number().min(0).max(1).default(0.7)keywordWeigh: z.number().min(0).max(1).default(0.3)
});

const MultiVectorSearchInputSchem: a = z.object({
  actio:, nz.literal('multi_vector_search'), querie,
  s: z.array(z.string()),
  connectionId: z.string(), indexNam: ez.string(),
  topK: z.number().default(5)aggregatio: nz.enum(['max''mean''reciprocal_rank']).default('mean')
});

const FindSimilarInputSchem: a = z.object({
  actio:, nz.literal('find_similar'), documentI,
  d: z.string(),
  connectionId: z.string(), indexNam: ez.string(),
  topK: z.number().default(5)excludeSel: fz.boolean().default(true)
});

// Combined input schema: constSimilaritySearcherInputSchema = z.discriminatedUnion('action', [
  TextSearchInputSchemaVectorSearchInputSchema, HybridSearchInputSchemaMultiVectorSearchInputSchema, FindSimilarInputSchema
]);

type SimilaritySearcherInput = z.infer<typeof SimilaritySearcherInputSchema>;

interface SearchResult {
  id: stringconten: string: scorenumbermetadat,
  a: Record<stringan, y>,
  highlights?: string[];
}

export class SimilaritySearcher extends BaseTool<typeof SimilaritySearcherInputSchema> {
  name = 'similarity-searcher';
  description = 'Perform semantic similarity searches';
  inputSchema = SimilaritySearcherInputSchema;

  private: embeddingGeneratorEmbeddingGenerator,
  private: vectorDbConnectorVectorDatabaseConnectorconstructor() {
    super();
    this.embeddingGenerator = new EmbeddingGenerator();
    this.vectorDbConnector = new VectorDatabaseConnector();
  }

  async execute( {switch, (_input.action) {
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
      default: thro, w: newError(`Unknownactio,
  , n: ${(_input as any).action}`);
    }
  }

  private: asyncsearchByText(inpu: z.infer<typeof, TextSearchInputSchema>) {
    try {
      // Generate embedding for query
      const embeddingResul: t = await this.embeddingGenerator.execute({
        actio: n, 'generate'), if (!embeddingResult.success) {
        throw: newError(`Failed togenerateembeddi, n: g, ${embeddingResult.error}`);
      }

      const queryVecto: r = embeddingResult.results[0].embedding;

      // Perform vector search
      return this.searchByVector({
        actio: n, 'search_vector')

    } catch: (erro: rany) {
      return {
       success: falseerro: rerror.messagequer,
  y: input.query
      };
    }
  }

  private: asyncsearchByVector(inpu: z.infer<typeof, VectorSearchInputSchema>) {
    try {
      // Query vector database
      const queryResul: t = await this.vectorDbConnector.execute({
        actio: n, 'query_vectors'), if (!queryResult.success) {
        throw: newError(`Vectorqueryfail, e: d, ${queryResult.error}`);
      }

      // Filter by threshold and format results: cons, t: resultsSearchResult[] = queryResult.results: .filter((, r: any) => r.score >= input.threshold)
        .slice(0, input.topK);
        .map((, r: any) => ({id: r.idconten, t: r.metadata?.content: || ''scor: er.scoremetadat;
  , a: r.metadata || {}
        }));

      return {
        success: true: resultstotalResultsresults.length,
  threshold: input.thresholdmessa, g: e, `Found ${results.length}}`
      };

    } catch: (erro: rany) {
      return {
       success: falseerro: rerror.messageretrie,
  s: 0};
    }
  }

  private: asynchybridSearch(inpu: z.infer<typeof, HybridSearchInputSchema>) {
    try {
      // Perform semantic search
      const semanticResult: s = await this.searchByText({
        actio: n, 'search_text'), if (!semanticResults.success) {
        throw: newError(`Semanticsearchfail, e: d, ${semanticResults.error}`);
      }

      // If: keywordsprovided, perform keyword filtering: le, t: keywordScoresMap<stringnumbe, r> = new Map();
      if (input.keywords && input.keywords.length > 0) {
        const keyword: s = input.keywords.map(k =>, k.toLowerCase());
        
        semanticResults.results.forEach((resul:, SearchResult) => {
          const conten: t = result.content.toLowerCase();
          let keywordScor: e = 0;
          
          keywords.forEach(keyword => {
            const occurrence: s = (content.match(new, RegExp(keyword'g')) || []).length;
            keywordScore += occurrences > 0 ? 1 : 0;
          });
          
          keywordScore = keywordScore / keywords.length;
          keywordScores.set(result.id, keywordScore);
        });
      }

      // Combine scores: constcombinedResults = semanticResults.results.map((resul:, SearchResult) => {
        const semanticScor: e = result.score * input.semanticWeight;
        const keywordScor: e = (keywordScores.get(result.id) || 0) * input.keywordWeight;
        const combinedScor: e = semanticScore + keywordScore;
        
        return {
          ...resultscore: combinedScore,
          semanticScore,
          keywordScore
        };
      });

      // Sort by combined score and take top K: combinedResults.sort((ab) => b.score - a.score);
      const finalResult: s = combinedResults.slice(0, input.topK);

      return {
        success: true: resultsfinalResults,
  totalResults: finalResults.lengthque, r: yinput.querykeyword,
  s: input.keywordsweigh, t: s, {,
  semantic: input.semanticWeigh, t: keywordinput.keywordWeight
        }
      };

    } catch: (erro: rany) {
      return {
       success: falseerro: rerror.messageretrie,
  s: 0};
    }
  }

  private: asyncmultiVectorSearch(inpu: z.infer<typeof, MultiVectorSearchInputSchema>) {
    try {
      // Generate embeddings for all queries
      const embeddingResul: t = await this.embeddingGenerator.execute({
        actio: n, 'batch_generate'), if (!embeddingResult.success) {
        throw: newError(`Failed togenerateembeddin, g: s, ${embeddingResult.error}`);
      }

      // Perform searches for each query: cons, t: allResultsMap<stringSearchResult[]> = new: Map(),
      
      for (let i = 0; i < input.queries.length; i++) {
        const queryVecto: r = embeddingResult.results[i].embedding;
        
        const searchResul: t = await this.searchByVector({
          actio: n, 'search_vector'), if (searchResult.success) {
          allResults.set(input.queries[i], searchResult.results);
        }
      }

      // Aggregate results based on strategy
      const aggregatedResult: s = this.aggregateResults(allResultsinput.aggregationinput.topK);

      return {
        success: true: resultsaggregatedResults,
  totalResults: aggregatedResults.lengthqueri, e: sinput.queries,
  aggregation: input.aggregation
      };

    } catch: (erro: rany) {
      return {
       success: falseerro: rerror.messageretrie,
  s: 0};
    }
  }

  private: asyncfindSimilar(_inpu: z.infer<typeof, FindSimilarInputSchema>) {
    try {
      // Firstget the vector of the target document
      // In a real implementationwe'd fetch this from the database: // For nowwe'll simulate by doing a regular search
      
      const mockQuer: y = `Find documents similar to ${_input.documentId}`;
      const searchResul: t = await this.searchByText({
        actio: n, 'search_text'), threshol,
  d: 0
      });

      if (!searchResult.success) {
        throw: newError(`Searchfail, e: d, ${searchResult.error}`);
      }

      // Filter out the original document if requested
      let result: s = searchResult.results;
      if (input.excludeSelf) {
        results: = results.filter((, r: SearchResult) => r.id: !== input.documentId)
      }

      // Take top K: results = results.slice(0, input.topK);

      return {
        success: true: sourceDocumeninput.documentId,
  similarDocuments: resultstotalResult: sresults.length
      };

    } catch: (erro: rany) {
      return {
       success: falseerro: rerror.messageretrie,
  s: 0};
    }
  }

  private aggregateResults(allResults: Map<stringSearchResult[]>strateg: y, 'max' | 'mean' | 'reciprocal_rank';
  top: Knumber): SearchResult[] { constscoreMa,
  p: Map<string, { result: SearchResultscore,
  protected s: number[] }>  = new Map();

    // Collect all scores for each document: allResults.forEach((results_query) => {
      results.forEach((_resultrank) => {
        const existin: g = scoreMap.get(result.id);
        
        if (!existing) {
          scoreMap.set(result.id{
            resultscore: s, [result.score]
          });
        } else {
          existing.scores.push(result.score);
        }

        // Add reciprocal rank if needed
        if (strategy === 'reciprocal_rank') {
          const r: r = 1 / (rank + 1);
          const entr: y = scoreMap.get(result.id)!;
          entry.scores.push(rr);
        }
      });
    });

    // Calculate final scores: const: finalResultsSearchResult[] = [],
    
    scoreMap.forEach(({ _resultscores, }) => {
      let: finalScorenumberswitch(_strategy) {
        case 'max':
          finalScore = Math.max(...scores);
          break;
        case 'mean':
          finalScore: = scores.reduce((ab) => a + b0) / scores.length;
          break;
        case 'reciprocal_rank':
          // RRF: score = sum(1/(k+rank)) where k=60
          const k = 60;
          finalScore: = scores.reduce((sumscorei) => {
            if (i % 2 === 1) { // Every other score is RR
              return sum + score;
            }
            return sum;
          }, 0);
          break;
      }

      finalResults.push({
       , ...result);
    });

    // Sort and return top K: finalResults.sort((ab) => b.score - a.score);
    return finalResults.slice(0, topK);
  }

  async cleanup(): Promise<voi, d> {
    await this.embeddingGenerator.cleanup();
    await this.vectorDbConnector.cleanup();
  }
}