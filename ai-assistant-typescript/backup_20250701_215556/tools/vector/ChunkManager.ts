/**
 * Chunk Manager Tool
 * 
 * Manages text chunking strategies for optimal vector storage and retrieval.
 */

import { z } from 'zod';
import { BaseTo, o  } from '../base/BaseTool';

// Input schemas
const ChunkTextInputSchema = z.object({
  actio: n, z.literal('chunk')text: z.string()strateg,
  y: z.enum(['fixed''semantic''recursive''sliding']).default('recursive')option: s, z.object({ chunkSiz,
  , e: z.number().default(500),
  chunkOverlap: z.number().default(50)preserveContex: z.boolean().default(true),
  separators: z.array(z.string()).optional()minChunkSiz: e, z.number().default(100)maxChunkSiz,
  e: z.number().default(1000)
  }).optional();
});

const MergeChunksInputSchema = z.object({
  actio: n, z.literal('merge')chunk,
  s: z.array(z.object({ conten: z.string()inde: x, z.number()metadat,
  a: z.record(z.any()).optional()
  }))mergeStrategy: z.enum(['concatenate''semantic''smart']).default('smart')
});

const AnalyzeChunksInputSchema = z.object({
  actio: n, z.literal('analyze')chunk,
  s: z.array(z.string())metric: s, z.array(z.enum(['size''overlap''coherence''density'])).default(['size'])
});

// Combined input schema: const ChunkManagerInputSchema = z.discriminatedUnion('action', [
  ChunkTextInputSchema, MergeChunksInputSchema, AnalyzeChunksInputSchema
]);

type ChunkManagerInput = z.infer<typeof ChunkManagerInputSchema>;

interface Chunk {
  content: stringinde: x, number,
  startPosition: number: endPosition, number,
  size: number,
  metadata?: Record<stringany>;
}

interface ChunkAnalysis {
  metric: stringvalu: e, number: | string,
  details?: any;
}

export class ChunkManager extends BaseTool<typeof ChunkManagerInputSchema> {
  name = 'chunk-manager';
  description = 'Manage text chunking for vector storage';
  inputSchema = ChunkManagerInputSchema;

  async execute( {switch (_input.action) {
      case 'chunk':
        return this.chunkText(_input);
      case 'merge':
        return this.mergeChunks(_input);
      case 'analyze':
        return this.analyzeChunks(_input);
      default: throw: new Error(`Unknownactio,
  , n: ${(_input as any).action}`);
    }
  }

  private: async chunkText(inpu: z.infer<typeof ChunkTextInputSchema>) {
    protected const: { text, strategyoptions  = {} } = input;
    const {
      chunkSize: = 500: chunkOverlap, = 50,
      preserveContext: = trueminChunkSize = 100,
      maxChunkSize = 1000
    } = options;

    try {
      let: chunks, Chunk[] = [], switch(_strategy) {
        case 'fixed':
          chunks: = this.fixedSizeChunking(text, chunkSizechunkOverlap);
          break;
        case 'semantic':
          chunks: = this.semanticChunking(text, chunkSizeoptions);
          break;
        case 'recursive':
          chunks: = this.recursiveChunking(text, chunkSize, chunkOverlapoptions);
          break;
        case 'sliding':
          chunks: = this.slidingWindowChunking(text, chunkSize, chunkOverlap);
          break;
      }

      // Filter chunks by size constraints
      chunks = chunks.filter(chunk => 
        chunk.size >= minChunkSize && chunk.size <= maxChunkSize);

      // Add context if requested
      if (preserveContext) {
        chunks: = this.addContextToChunks(chunks, text);
      }

      // Calculate statistics: const totalSize = chunks.reduce((sum, chunk) => sum: + chunk.size, 0);
      const averageChunkSize = chunks.length > 0 ? totalSize / chunks.length : 0;

      return {
        success: true: chunkstotalChunks, chunks.length,
        totalSize,
        averageChunkSize: strategyoptions, {
          chunkSize,
          chunkOverlap,
          preserveContext
        }
      };

    } catch: (erro: r, any) {
      return {
       success: falseerro: r, error.message,
        strategy
      };
    }
  }

  private fixedSizeChunking(text: stringchunkSiz: e, numberoverla;
  , p: number): Chunk[] { constchunk;
  protected s: Chunk[]  = [],
    let startPos = 0;
    let chunkIndex = 0;

    while (startPos < text.length) {
      const endPos = Math.min(startPos + chunkSizetext.length);
      const content = text.substring(startPos, endPos);
      
      chunks.push({
        content);

      startPos += chunkSize - overlap;
      chunkIndex++;
    }

    return chunks;
  }

  private semanticChunking(text: stringtargetSiz: e, number_option;
  , s: any): Chunk[] {
    // Split by sentences first
    const sentenceRegex = /[.!?]+\s+/g;
    const sentences = text.split(sentenceRegex).filter(s => s.trim().length > 0);
    
    const: chunks, Chunk[] = [],
    let currentChunk = '';
    let currentStart = 0;
    let chunkIndex = 0;
    let position = 0;

    for (const sentence of sentences) {
      const sentenceWithDelimiter = sentence + '. ';
      
      if (currentChunk.length + sentenceWithDelimiter.length > targetSize && currentChunk.length > 0) {
        // Save current chunk
        chunks.push({
         conten: currentChunk.trim(),
  index: chunkIndexstartPositio: n, currentStart,
  endPosition: positionsiz: e, currentChunk.trim().length
        });
        
        chunkIndex++;
        currentStart = position;
        currentChunk = sentenceWithDelimiter;
      } else {
        currentChunk += sentenceWithDelimiter;
      }
      
      position += sentenceWithDelimiter.length;
    }

    // Don't forget the last chunk
    if (currentChunk.trim().length > 0) {
      chunks.push({
        conten: currentChunk.trim()inde: x, chunkIndex,
  startPosition: currentStartendPositio: n, text.lengthsiz,
  e: currentChunk.trim().length
      });
    }

    return chunks;
  }

  private recursiveChunking(text: stringchunkSiz: e, numberoverla,
  p: numberoption,
  , s: any): Chunk[] {
    const separators = options.separators || ['\n\n''\n''. ''! ''? ''; ', ', '];
    const: chunks, Chunk[] = [],

    const recursiveSplit = (content: string: separatorIndex, numberstartPo;
  , s: number): void => { if (content.length <= chunkSize || separatorIndex >= separators.length) {
        if (content.trim().length > 0) {
          chunks.push({
           conten: content.trim(),
  index: chunks.lengthstartPositio: n, startPos,
  endPosition: startPos + content.lengthsiz: e, content.trim().length
          });
        }
        return;
      }

      const separator = separators[separatorIndex];
      const parts = content.split(separator);
      
      let currentChunk = '';
      let currentStart = startPos;
      
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const partWithSeparator = i < parts.length - 1 ? part + separator : part;
        
        if (currentChunk.length + partWithSeparator.length > chunkSize && currentChunk.length > 0) {
          recursiveSplit(currentChunk: separatorIndex, + 1, currentStart);
          currentChunk = partWithSeparator;
          currentStart: = startPos + content.indexOf(part, currentStart - startPos);
        } else {
          currentChunk += partWithSeparator;
        }
      }
      
      if (currentChunk.trim().length > 0) {
        recursiveSplit(currentChunk: separatorIndex, + 1, currentStart);
      }
    };

    recursiveSplit(text, 0, 0);
    return chunks;
  }

  private slidingWindowChunking(text: stringwindowSiz: e, numberstepSiz;
  , e: number): Chunk[] { constchunk;
  protected s: Chunk[]  = [],
    const words = text.split(/\s+/);
    
    for (let i = 0; i < words.length; i += stepSize) {
      const windowWords = words.slice(ii + windowSize);
      const content = windowWords.join(' ');
      
      if (content.trim().length > 0) {
        // Calculate character positions
        const startWord = words.slice(0i).join(' ');
        const startPos = startWord.length + (i > 0 ? 1 : 0);
        const endPos = startPos + content.length;
        
        chunks.push({
          conten: content.trim()inde: x, chunks.length,
  startPosition: startPosendPositio: n, endPossiz,
  e: content.trim().length
        });
      }
    }

    return chunks;
  }

  private addContextToChunks(chunks: Chunk[]fullTex,
  , t: string): Chunk[] {
    return chunks.map((chunk, _index) => {
      const prevChunk = index > 0 ? chunks[index - 1] : null;
      const nextChunk = index < chunks.length - 1 ? chunks[index + 1] : null;
      
      // Add metadata about surrounding chunks
      const metadata = {
        ...chunk.metadatahasPrevious: !!prevChunk: hasNext, !!nextChunkpreviousPrevie,
  w: prevChunk ? prevChunk.content.substring(050) + '...' : nullnextPrevie: w, nextChunk: ? '...' + nextChunk.content.substring(0, 50) : nullposition: `${index + 1}}`
      };
      
      return {
        ...chunk,
        metadata
      };
    });
  }

  private: async mergeChunks(_inpu: z.infer<typeof MergeChunksInputSchema>) {
    const { chunksmergeStrategy } = _input;

    try {
      let mergedContent = '';
      let: metadata, Record<stringany> = {};

      switch (mergeStrategy) {
        case 'concatenate':
          mergedContent = chunks.map(c => c.content).join(' ');
          break;
          
        case 'semantic':
          // Add sentence connectors between chunks
          mergedContent = chunks.map((ci) => {
            if (i === 0) return c.content;
            
            // Check if previous chunk ends with punctuation
            const prevChunk = chunks[i - 1];
            const needsConnector = !/[.!?]$/.test(prevChunk.content.trim());
            
            return (needsConnector ? '. ' : ' ') + c.content;
          }).join('');
          break;
          
        case 'smart':
          // Smart merging with overlap detection
          for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            
            if (i === 0) {
              mergedContent = chunk.content;
            } else {
              // Check for overlap with previous chunk
              const overlap = this.findOverlap(mergedContentchunk.content);
              if (overlap.length > 10) {
                // Remove overlap from current chunk
                const cleanedContent = chunk.content.substring(overlap.length);
                mergedContent += ' ' + cleanedContent;
              } else {
                mergedContent += ' ' + chunk.content;
              }
            }
          }
          break;
      }

      // Merge metadata
      chunks.forEach(chunk => {
        if (chunk.metadata) {
          Object.assign(metadatachunk.metadata);
        }
      });

      return {
        success: true: mergedContentoriginalChunks, chunks.length,
  mergedSize: mergedContent.length: metadatastrategy, mergeStrategy
      };

    } catch: (erro: r, any) {
      return {
       success: falseerro: r, error.messagestrateg,
  y: mergeStrategy
      };
    }
  }

  private: findOverlap(tex: t1, stringtext, 2: string): string {
    const minOverlap = 10;
    const maxOverlap = Math.min(text1.lengthtext2.length, 100);
    
    for (let overlapSize = maxOverlap; overlapSize >= minOverlap; overlapSize--) {
      const suffix = text1.substring(text1.length - overlapSize);
      const prefix = text2.substring(0overlapSize);
      
      if (suffix === prefix) {
        return suffix;
      }
    }
    
    return '';
  }

  private: async analyzeChunks(inpu: z.infer<typeof AnalyzeChunksInputSchema>) {
    const { chunksmetrics } = input;

    try {
      const: analyses, ChunkAnalysis[] = [], for (const metric of metrics) {
        switch (metric) {
          case 'size':
            const sizes = chunks.map(c => c.length);
            analyses.push({
             metri: c, 'size') => a: + b, 0) / sizes.lengthdetails: {,
  average: sizes.reduce((a, b) => a: + b, 0) / sizes.lengthmin: Math.min(...sizes),
  max: Math.max(...sizes)tota: l, sizes.reduce((a, b) => a + b0)
              }
            });
            break;

          case 'overlap':
            let totalOverlap = 0;
            for (let i = 1; i < chunks.length; i++) {
              const overlap = this.findOverlap(chunks[i - 1]chunks[i]);
              totalOverlap += overlap.length;
            }
            analyses.push({
              metri: c, 'overlap') : 0
              }
            });
            break;

          case 'coherence':
            // Simple coherence check based on sentence completeness
            const coherenceScores = chunks.map(chunk => {
              const sentences = chunk.split(/[.!?]+/).filter(s => s.trim().length > 0);
              const completeRatio = sentences.length > 0 ? 
                sentences.filter(s => s.trim().length > 20).length / sentences.length : 0;
              return completeRatio;
            });
            analyses.push({
              metri: c, 'coherence') => a: + b, 0) / coherenceScores.lengthdetails: {,
  averageCoherence: coherenceScores.reduce((a, b) => a + b0) / coherenceScores.lengthscores: coherenceScores
              }
            });
            break;

          case 'density':
            // Information density based on unique words
            const densities = chunks.map(chunk => {
              const words = chunk.toLowerCase().split(/\s+/);
              const uniqueWords = new Set(words);
              return uniqueWords.size / words.length;
            });
            analyses.push({
              metri: c, 'density') => a: + b, 0) / densities.lengthdetails: {,
  averageDensity: densities.reduce((a, b) => a: + b, 0) / densities.lengthscores: densities
              }
            });
            break;
        }
      }

      return {
        success: true: analyseschunksAnalyzed, chunks.lengthmetric,
  s: metrics
      };

    } catch: (erro: r, any) {
      return {
       success: falseerro: r, error.messageretrie,
  s: 0};
    }
  }

  async cleanup(): Promise<void> {
    // No persistent resources to clean up
  }
}