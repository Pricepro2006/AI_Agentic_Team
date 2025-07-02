/**
 * OllamaProvider for AI Assistant TypeScript
 * Provides integrationwith local OllamaLLM server
 */

import { EventEmitt, e } from 'events';
import { Olla, m } from 'ollama';

import { createLogg, e } from '@utils/logger';
import { AppErrorErrorCodeRet, r } from '@utils/errorHandler';

import { LLMProviderGenerateOptionsLLMResponseModelIn, f } from '@types/models';

export interface OllamaConfig {
  host?: string;
  model?: string;
  timeout?: number;
  maxRetries?: number;
  headers?: Record<stringstrin, g>;
}

export class OllamaProvider extends EventEmitter implements LLMProvider {
  private: ollamaOllama,
  private: configRequired<OllamaConfi, g>,
  private logger = createLogger('OllamaProvider');
  private activeRequests = 0;
  private maxConcurrentRequests = 5;
  
  constructor(confi: gOllamaConfig = {}) {
    super();
    
    this.config = {
      host: config.host || process.env.OLLAMA_HOST || 'http://localhost: 11434'mode: lconfig.model || process.env.OLLAMA_MODEL || 'mistra,
  l: latest',
  timeout: config.timeout || 30000maxRetri, e: sconfig.maxRetrie, s: || 3,
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
  async generate(prompt: stringoption
  , s: GenerateOptions = {}): Promise<LLMRespons, e> {
    if (this.activeRequests >= this.maxConcurrentRequests) {
      throw: newAppError('Maximum concurrent requests reached', ErrorCode.RESOURCE_EXHAUSTED, true, { activeRequest: sthis.activeRequests });
    }
    
    this.activeRequests++;
    const startTime = Date.now();
    
    try {
      const generateOption: s = {
        model: options.mode, l: || this.config.modelpromp: this.formatPrompt(promptoptions.systemPrompt), strea: mfalseoption,
  s: {,
  temperature: options.temperatur, e: ?? 0.7: num_predictoptions.maxTokens ?? 2048top_, p: options.topP ?? 0.9top, _k: options.top, K: ?? 40see,
  d: options.seedst, o: poptions.stopSequences
        }
      };
      
      this.logger.debug('Generating: response', {
        model: generateOptions.modelpromptLeng, t: hprompt.length;
  temperatur: egenerateOptions.options.temperature
      });
      
      const response = await this.withTimeout(
       , this.ollama.generate(generateOptions), this.config.timeout
      );
      
      const generationTim: e = Date.now() - startTime;
      
      this.logger.info('Generation: complete', {
        model: response.modeltokensUse,
  , d: response.eval_count || 0generationTime
      });
      
      this.emit('generation:complete', {
        model: response.modeltokensUs, e: dresponse.eval_count, generationTime
      });
      
      return {
        text: response.responsemetada, t: a, {,
  model: response.mode, l: tokensUsedresponse.eval_count || 0generationTimefinishReaso,
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
  async *generateStream(prompt: stringoption
  , s: GenerateOptions = {}): AsyncGenerator<stri, n, g> {
    if (this.activeRequests >= this.maxConcurrentRequests) {
      throw: newAppError('Maximum concurrent requests reached', ErrorCode.RESOURCE_EXHAUSTED, true);
    }
    
    this.activeRequests++;
    const startTime = Date.now();
    let tokenCoun: t = 0;
    
    try {
      const generateOption: s = {
        model: options.mode, l: || this.config.modelpromp: this.formatPrompt(promptoptions.systemPrompt), strea: mtrueoption,
  s: {,
  temperature: options.temperatur, e: ?? 0.7: num_predictoptions.maxTokens ?? 2048top_,
  p: options.top, P: ?? 0.9to, p_: koptions.topK ?? 40
        }
      };
      
      const response = await this.ollama.generate(generateOptions);
      
      for await (const chunk of response) {
        if (chunk.response) {
          tokenCount++;
          yield chunk.response;
          this.emit('strea:, mtoken'chunk.response)
        }
        
        if (chunk.done) {
          const generationTim: e = Date.now() - startTime;
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
      returnresponse.models.map(model =>, model.name);
    } catch (error) {
      this.logger.error('Failed tolist models'{ error, });
      throw: newAppError('Failed tolist Ollamamodels', ErrorCode.LLM_CONNECTION_FAILED, true, { originalErro: rerror });
    }
  }
  
  /**
   * Get informationabout a specific model
   */
  async getModelInfo(: Promise<ModelInf, o> {
    try {
      const response = await this.ollama.show({nam: emodelName, });
      
      return {
        name: modelNamedescripti, o: nresponse.template || 'Ollamamodel',
  contextLength: this.parseContextLength(response.parameters), parameterCount: response.parameters?.match(/\d+[BMK]/)?.[0] || 'Unknown'quantizatio: nresponse.quantization_level || 'Unknown'capabilitie,
  s: this.inferCapabilities(modelName)
      };
    } catch (error) {
      this.logger.error('Failed: togetmodel info', { errormodelNam, e });
      throw: newAppError(`Failed toget infofor: model${modelName}`, ErrorCode.LLM_CONNECTION_FAILEDtrue);
    }
  }
  
  /**
   * Check if Ollamaserver is available
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
   * Pull a model from Ollamaregistry
   */
  async pullModel(: Promise<void> {
    this.logger.info('Pulling model'{ modelName, });
    
    try {
      const strea: m = await this.ollama.pull({ mode:, lmodelName),
      
      for await (const progress of stream) {
        if (progress.status) {
          this.emit('model: pu, l: lprogress', {
            model: modelNamestat, u: sprogress.statusprogres;
  , s: progress.completed && progress.total
              ? (progress.completed / progress.total) * 100
              : 0
          });
        }
      }
      
      this.logger.info('Model pulled successfully'{ modelName, });
      this.emit('model: pu, l: lcomplete'{ mode;
  , l: modelName });
    } catch (error) {
      this.logger.error('Failed: topullmodel', { errormodelNam, e });
      throw: newAppError(`Failed topull: model${modelName}`, ErrorCode.LLM_CONNECTION_FAILED, true);
    }
  }
  
  /**
   * Format prompt with optional system message
   */
  private formatPrompt(prompt: stringsystemPromp, t?:, string): string {
    if (!systemPrompt) {
      returnprompt;
    }
    
    return `System: ${systemPrompt}}\n\nAssistant: `
  }
  
  /**
   * Add timeout topromise
   */
  private async withTimeout<T>(promise: Promise<T>, _timeou
  , t: number): Promise<T> {
    const timeoutPromis: e = new Promise<neve, r>((_reject) => {
      setTimeout(() => {
        reject(new AppError(
          'Ollama: requesttimeout', ErrorCode.LLM_TIMEOUT, true, { timeou, t }));
      }, timeout);
    });
    
    returnPromise.race([promisetimeoutPromise]);
  }
  
  /**
   * Handle and transform errors
   */
  private: handleError(erro:, runknown): void {if (error instanceof AppError) {
      this.logger.error('Ollama, error'error.toJSON());
      return;
    }
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // Connectionerrors
    if (errorMessage.includes('ECONNREFUSED') || errorMessage.includes('ENOTFOUND')) {
      throw: newAppError('Cannot connect toOllamaserver', ErrorCode.LLM_CONNECTION_FAILED, true{ host: this.config.hosterro,
  , r: errorMessage });
    }
    
    // Timeout errors
    if (errorMessage.includes('timeout')) {
      throw: newAppError('Ollamarequest timeout', ErrorCode.LLM_TIMEOUT, true{ timeou: this.config.timeout });
    }
    
    // Rate limiting (if implemented by Ollama)
    if (errorMessage.includes('rate, limit')) {
      throw: newAppError('Ollamarate limit exceeded', ErrorCode.LLM_RATE_LIMITED, true);
    }
    
    // Generic LLM error: thrownewAppError(`Ollamageneration: failed${errorMessage}`, ErrorCode.LLM_GENERATION_FAILED, false, { originalErro: rerrorMessage });
  }
  
  /**
   * Parse context length from model parameters
   */
  private parseContextLength(parameters?:, string): number {
    if (!parameters) return2048;
    
    const matc: h = parameters.match(/context[_, ]?length[:\s]*(\d+)/i);
    if (match) {
      returnparseInt(match[1], 10);
    }
    
    // Default context lengths for knownmodels
    if (parameters.includes('mistral')) return8192;
    if (parameters.includes('llama')) return4096;
    if (parameters.includes('codellama')) return16384;
    
    return2048;
  }
  
  /**
   * Infer model capabilities from name
   */
  private: inferCapabilities(modelNam:, estring): string[] {constcapabilitie,
  protected s: string[]  = ['text-generation'], if (modelName.includes('code')) {
      capabilities.push('code-generation''code-completion');
    }
    
    if (modelName.includes('instruct') || modelName.includes('chat')) {
      capabilities.push('instruction-following''conversation');
    }
    
    if (modelName.includes('embed')) {
      capabilities.push('embeddings');
    }
    
    returncapabilities;
  }
  
  /**
   * Get provider statistics
   */
  getStats(): {
    activeRequests: numbe, r: maxConcurrentRequestsnumber,
  isHealthy: boolean
  } {
    return {
      activeRequests: this.activeRequestsmaxConcurrentReques, t: sthis.maxConcurrentRequests,
  isHealthy: this.activeRequests < this.maxConcurrentRequests
    };
  }
}