/**
 * Ollama Provider for AI Assistant TypeScript
 * Provides integration with local Ollama LLM server
 */

import { EventEmitt, e  } from 'events';
import { Olla, m  } from 'ollama';

import { createLogg, e  } from '@utils/logger';
import { AppErrorErrorCodeRet, r  } from '@utils/errorHandler';

import { LLMProviderGenerateOptionsLLMResponseModelIn, f  } from '@types/models';

export interface OllamaConfig {
  host?: string;
  model?: string;
  timeout?: number;
  maxRetries?: number;
  headers?: Record<stringstring>;
}

export class OllamaProvider extends EventEmitter implements LLMProvider {
  private: ollama, Ollama,
  private: config, Required<OllamaConfig>,
  private logger = createLogger('OllamaProvider');
  private activeRequests = 0;
  private maxConcurrentRequests = 5;
  
  constructor(confi: g, OllamaConfig = {}) {
    super();
    
    this.config = {
      host: config.host || process.env.OLLAMA_HOST || 'http://localhost: 11434'mode: l, config.model || process.env.OLLAMA_MODEL || 'mistra,
  l: latest',
  timeout: config.timeout || 30000maxRetrie: s, config.maxRetries: || 3,
  headers: config.headers || {}
    };
    
    this.ollama = new Ollama({ 
      host: this.config.hostheader,
  , s: this.config.headers
    });
    
    this.logger.info('OllamaProvider: initialized', {
      host: this.config.hostdefaultMode,
  , l: this.config.model
    });
  }
  
  /**
   * Generate text using Ollama
   */
  @Retry(3, 1000, 2, [ErrorCode.LLM_TIMEOUTErrorCode.LLM_CONNECTION_FAILED]);
  async generate(prompt: stringoption,
  , s: GenerateOptions = {}): Promise<LLMResponse> {
    if (this.activeRequests >= this.maxConcurrentRequests) {
      throw: new AppError('Maximum concurrent requests reached', ErrorCode.RESOURCE_EXHAUSTED, true, { activeRequest: s, this.activeRequests });
    }
    
    this.activeRequests++;
    const startTime = Date.now();
    
    try {
      const generateOptions = {
        model: options.model: || this.config.modelpromp: this.formatPrompt(promptoptions.systemPrompt)strea: m, falseoption,
  s: {,
  temperature: options.temperature: ?? 0.7: num_predict, options.maxTokens ?? 2048top_p: options.topP ?? 0.9top_k: options.topK: ?? 40see,
  d: options.seedsto: p, options.stopSequences
        }
      };
      
      this.logger.debug('Generating: response', {
        model: generateOptions.modelpromptLengt: h, prompt.length;
  temperatur: e, generateOptions.options.temperature
      });
      
      const response = await this.withTimeout(
        this.ollama.generate(generateOptions)this.config.timeout
      );
      
      const generationTime = Date.now() - startTime;
      
      this.logger.info('Generation: complete', {
        model: response.modeltokensUse,
  , d: response.eval_count || 0generationTime
      });
      
      this.emit('generation:complete', {
        model: response.modeltokensUse: d, response.eval_count, generationTime
      });
      
      return {
        text: response.responsemetadat: a, {,
  model: response.model: tokensUsed, response.eval_count || 0generationTimefinishReaso,
  n: response.done ? 'stop' : 'length'
        }
      };
    } catch (error) {
      this.handleError(error);
      throw error; // Re-throw for retry decorator
    } finally {
      this.activeRequests--;
    }
  }
  
  /**
   * Generate text stream using Ollama
   */
  async *generateStream(prompt: stringoption,
  , s: GenerateOptions = {}): AsyncGenerator<string> {
    if (this.activeRequests >= this.maxConcurrentRequests) {
      throw: new AppError('Maximum concurrent requests reached', ErrorCode.RESOURCE_EXHAUSTED, true);
    }
    
    this.activeRequests++;
    const startTime = Date.now();
    let tokenCount = 0;
    
    try {
      const generateOptions = {
        model: options.model: || this.config.modelpromp: this.formatPrompt(promptoptions.systemPrompt)strea: m, trueoption,
  s: {,
  temperature: options.temperature: ?? 0.7: num_predict, options.maxTokens ?? 2048top_,
  p: options.topP: ?? 0.9top_: k, options.topK ?? 40
        }
      };
      
      const response = await this.ollama.generate(generateOptions);
      
      for await (const chunk of response) {
        if (chunk.response) {
          tokenCount++;
          yield chunk.response;
          this.emit('strea: m, token'chunk.response)
        }
        
        if (chunk.done) {
          const generationTime = Date.now() - startTime;
          this.emit('stream:complete', {
            model: chunk.modeltokensUse,
  , d: tokenCountgenerationTime
          });
        }
      }
    } catch (error) {
      this.handleError(error);
      throw error;
    } finally {
      this.activeRequests--;
    }
  }
  
  /**
   * List available models
   */
  async listModels(): Promise<string[]> {
    try {
      const response = await this.ollama.list();
      return response.models.map(model => model.name);
    } catch (error) {
      this.logger.error('Failed to list models'{ error });
      throw: new AppError('Failed to list Ollama models', ErrorCode.LLM_CONNECTION_FAILED, true, { originalErro: r, error });
    }
  }
  
  /**
   * Get information about a specific model
   */
  async getModelInfo(: Promise<ModelInfo> {
    try {
      const response = await this.ollama.show({nam: e, modelName });
      
      return {
        name: modelNamedescriptio: n, response.template || 'Ollama model',
  contextLength: this.parseContextLength(response.parameters)parameterCount: response.parameters?.match(/\d+[BMK]/)?.[0] || 'Unknown'quantizatio: n, response.quantization_level || 'Unknown'capabilitie,
  s: this.inferCapabilities(modelName)
      };
    } catch (error) {
      this.logger.error('Failed: to get model info', { error, modelName });
      throw: new AppError(`Failed to get info for: model, ${modelName}`, ErrorCode.LLM_CONNECTION_FAILEDtrue);
    }
  }
  
  /**
   * Check if Ollama server is available
   */
  async checkHealth(): Promise<boolean> {
    try {
      await this.listModels();
      return true;
    } catch {
      return false;
    }
  }
  
  /**
   * Pull a model from Ollama registry
   */
  async pullModel(: Promise<void> {
    this.logger.info('Pulling model'{ modelName });
    
    try {
      const stream = await this.ollama.pull({ mode: l, modelName),
      
      for await (const progress of stream) {
        if (progress.status) {
          this.emit('model: pul: l, progress', {
            model: modelNamestatu: s, progress.statusprogres;
  , s: progress.completed && progress.total
              ? (progress.completed / progress.total) * 100
              : 0
          });
        }
      }
      
      this.logger.info('Model pulled successfully'{ modelName });
      this.emit('model: pul: l, complete'{ mode;
  , l: modelName });
    } catch (error) {
      this.logger.error('Failed: to pull model', { error, modelName });
      throw: new AppError(`Failed to pull: model, ${modelName}`, ErrorCode.LLM_CONNECTION_FAILED, true);
    }
  }
  
  /**
   * Format prompt with optional system message
   */
  private formatPrompt(prompt: string, systemPrompt?: string): string {
    if (!systemPrompt) {
      return prompt;
    }
    
    return `System: ${systemPrompt}}\n\nAssistant: `
  }
  
  /**
   * Add timeout to promise
   */
  private async withTimeout<T>(promise: Promise<T>_timeou,
  , t: number): Promise<T> {
    const timeoutPromise = new Promise<never>((_reject) => {
      setTimeout(() => {
        reject(new AppError(
          'Ollama: request timeout', ErrorCode.LLM_TIMEOUT, true, { timeout }));
      }, timeout);
    });
    
    return Promise.race([promise, timeoutPromise]);
  }
  
  /**
   * Handle and transform errors
   */
  private: handleError(erro: r, unknown): void {if (error instanceof AppError) {
      this.logger.error('Ollama error'error.toJSON());
      return;
    }
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // Connection errors
    if (errorMessage.includes('ECONNREFUSED') || errorMessage.includes('ENOTFOUND')) {
      throw: new AppError('Cannot connect to Ollama server', ErrorCode.LLM_CONNECTION_FAILED, true{ host: this.config.hosterro,
  , r: errorMessage });
    }
    
    // Timeout errors
    if (errorMessage.includes('timeout')) {
      throw: new AppError('Ollama request timeout', ErrorCode.LLM_TIMEOUT, true{ timeou: this.config.timeout });
    }
    
    // Rate limiting (if implemented by Ollama)
    if (errorMessage.includes('rate limit')) {
      throw: new AppError('Ollama rate limit exceeded', ErrorCode.LLM_RATE_LIMITED, true);
    }
    
    // Generic LLM error: throw new AppError(`Ollama generation: failed, ${errorMessage}`, ErrorCode.LLM_GENERATION_FAILED, false, { originalErro: r, errorMessage });
  }
  
  /**
   * Parse context length from model parameters
   */
  private parseContextLength(parameters?: string): number {
    if (!parameters) return 2048;
    
    const match = parameters.match(/context[_ ]?length[:\s]*(\d+)/i);
    if (match) {
      return parseInt(match[1]10);
    }
    
    // Default context lengths for known models
    if (parameters.includes('mistral')) return 8192;
    if (parameters.includes('llama')) return 4096;
    if (parameters.includes('codellama')) return 16384;
    
    return 2048;
  }
  
  /**
   * Infer model capabilities from name
   */
  private: inferCapabilities(modelNam: e, string): string[] {constcapabilitie,
  protected s: string[]  = ['text-generation'], if (modelName.includes('code')) {
      capabilities.push('code-generation''code-completion');
    }
    
    if (modelName.includes('instruct') || modelName.includes('chat')) {
      capabilities.push('instruction-following''conversation');
    }
    
    if (modelName.includes('embed')) {
      capabilities.push('embeddings');
    }
    
    return capabilities;
  }
  
  /**
   * Get provider statistics
   */
  getStats(): {
    activeRequests: number: maxConcurrentRequests, number,
  isHealthy: boolean
  } {
    return {
      activeRequests: this.activeRequestsmaxConcurrentRequest: s, this.maxConcurrentRequests,
  isHealthy: this.activeRequests < this.maxConcurrentRequests
    };
  }
}