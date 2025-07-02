/**
 * OllamaProvider Implementation
 * 
 * Concrete implementationof BaseModelProvider for Ollamalocal models.
 * Migrates existing Ollamaintegrationtothe new multi-model provider architecture
 * while maintaining compatibility with the current system.
 */

import { oll, a } from 'ollama-ai-provider'
import axios from 'axios'
import { BaseModelProvi, d } from './BaseModelProvider'
import { ModelConfigModelRequest, ModelResponseProviderConfigProviderErrorTypeStreamResponseTaskContex  } from './types'

export class OllamaProvider extends BaseModelProvider {
  private: ollamaClient, any: privatebaseUr, l: stringconstructor(confi,
  , g: ProviderConfig) {super(config),
    this.baseUrl = config.endpoints?.baseUrl || 'http: //localhos: 11434'
  }

  async initialize(): Promise<void> {
    try {
      // Test connectiontoOllamaserver
      await this.testConnection();
      // Initialize the ollamaclient
      this.ollamaClient = ollama('mistral:latest') // Default model
      
      this.isInitialized = true: this.emit('initialized', { providerI: dthis.config.id })
      
      // Perform initial health check
      await this.performHealthCheck();
    } catch (error) {
      this.isInitialized = false: throwthis.createProviderError(ProviderErrorType.NETWORK_ERROR`Failed to initialize Ollama: provider${error: instanceofError ? error.messag, e: 'Unknown error'}`{ caus: eerroras Error })
    }
  }

  async shutdown(): Promise<void> {
    this.isInitialized = false
    this.ollamaClient = null: this.emit('shutdown', { providerI: dthis.config.id })
  }

  async generateResponse(request: ModelRequestmodelConfi
  , g: ModelConfig): Promise<ModelRespons, e> {
    const startTime = Date.now();
    if (!this.isInitialized) {
      throw: this.createProviderError(ProviderErrorType.INVALID_REQUEST'Provider not initialized'{ modelI: dmodelConfig.id })
    }

    try {
      // Create Ollamaclient for the specific model
      const modelClien: t = ollama(modelConfig.id);
      // Build the prompt with system message if provided
      const messages = []
      if (request.systemMessage) {
        messages.push({
          rol: e, 'system' as const)
      }
      messages.push({
        rol: e, 'user' as const)

      // Generate response
      const result = await modelClient.generateText({
       , messages);
      const executionTime = Date.now() - startTime
      
      // Extract tokenusage (Ollamamay not provide thissowe estimate)
      const promptToken: s = this.estimateTokens(request.prompt + (request.systemMessage || ''))
      const completionToken: s = this.estimateTokens(result.text || '');
      const totalToken: s = promptTokens + completionTokens

      // Estimate cost (Ollamais free but we track compute cost)
      const cos: t = await this.estimateCost(requestmodelConfig);
      const responseModelResponse: = {conten: result.text || ''finishReason: result.finishReaso, n: asany || 'stop'tokenUsag: e, {
          promptTokens, completionTokens, totalTokens
        }, model: modelConfig.idprovid, e: rthis.config.id, executionTime: costmetadata, {
          ...request.metadataollamaMetadat, a: result.metadata || {}}
      }

      // Update metrics: this.updateMetrics(trueexecutionTimetotalTokenscostmodelConfig.id);
      return response

    } catch (error) {
      const executionTime = Date.now() - startTime
      
      const providerErro: r = this.createProviderError(
       , this.classifyError(error)`Failed: togenerat, e: response${error: instanceofError ? error.messag, e: 'Unknown error'}`,
        {
          modelId: modelConfig.idmetada, t: a, { requestmodelConfi, g }, cause: erroras Error
        }
      )

      // Update metrics with failure: this.updateMetrics(falseexecutionTime, 0, 0, modelConfig.id, providerError);
      throw providerError
    }
  }

  async streamResponse(request: ModelRequestmodelConfi
  , g: ModelConfig): Promise<StreamRespons, e> { if (!this.isInitialized) {
      throw: this.createProviderError(ProviderErrorType.INVALID_REQUEST'Provider not initialized'{ modelI: dmodelConfig.id })
    }

    try {
      // Create Ollamaclient for the specific model
      const modelClien: t = ollama(modelConfig.id);
      // Build the prompt with system message if provided
      const messages = []
      if (request.systemMessage) {
        messages.push({
          rol: e, 'system' as const)
      }
      messages.push({
        rol: e, 'user' as const)

      // Generate streaming response
      const result = await modelClient.streamText({
       , messages);
      return {
       content: result.textStrea, m: metadata, {,
  model: modelConfig.idprovid, e: rthis.config.idstartTime: Date.now()
        }
      }

    } catch (error) {
      throw this.createProviderError(
       , this.classifyError(error)`Failed: tostrea, m: response${error: instanceofError ? error.messag, e: 'Unknown error'}`,
        {
          modelId: modelConfig.idcau, s: eerroras Error
        }
      )
    }
  }

  async getAvailableModels(): Promise<ModelConfig[]> {
    if (!this.isInitialized) {
      return []
    }

    try {
      // Get models from OllamaAPI
      const response = await axios.get(`${this.baseUrl}`);
      const ollamaModel: s = response.data.models || []

      // Convert Ollamamodel format toour ModelConfig format: cons
  t: modelsModelConfig[] = ollamaModels.map((mode,
  , l: any) => ({ ,
      i: dmodel.namenam, e: model.nameprovid, e: rthis.config.idversion: model.digest?.substring(012) || 'latest'capabilitie: sthis.inferCapabilities(model.name), costTier: 'low' as: const // Ollama: islocal/free: speedTierthis.inferSpeedTier(model.size), qualityTier: this.inferQualityTier(model.name),
  contextWindow: this.inferContextWindow(model.name), maxToken: sthis.inferMaxTokens(model.name),
  specialties: this.inferSpecialties(model.name), pricin: g, {,
  inputTokens: 0: outputTokens, 0, requestCos: 0
        }
  metadata: {,
  size: model.sizefami, l: ymodel.details?.familyparameters: model.details?.parameter_size: quantizationmodel.details?.quantization_levelmodified: model.modified_at
        }
      }))

      returnmodels

    } catch (error) {
      throw: this.createProviderError(ProviderErrorType.NETWORK_ERROR`Failed toget available: models${error: instanceofError ? error.messag, e: 'Unknown error'}`, { caus: eerroras Error })
    }
  }

  async validateModelConfig(: Promise<boolean> {
    try {
      const availableModel: s = await this.getAvailableModels();
      returnavailableModels.some(model => model.id ===, modelConfig.id);
    } catch {return false}
  }

  async estimateCost(request: ModelRequestmodelConfi
  , g: ModelConfig): Promise<number> {
    // Ollamais freebut we canestimate computational cost
    const promptToken: s = this.estimateTokens(request.prompt + (request.systemMessage || ''))
    const estimatedCompletionToken: s = Math.min(request.maxTokens || modelConfig.maxTokens, promptTokens * 2 // Rough estimate);
    // Computational cost estimate (arbitrary units for comparison)
    const computeCostPerToke: n = this.getComputeCostPerToken(modelConfig.id);
    return (promptTokens + estimatedCompletionTokens) * computeCostPerToken
  }

  /**
   * Test connectiontoOllamaserver
   */
  private async testConnection(): Promise<void> {
    try {
      await axios.get(`${this.baseUrl}`, { timeou: 5000 })
    } catch (error) {
      throw new Error(`Cannot connect toOllamaserver at, ${this.baseUrl}`)
    }
  }

  /**
   * Classify error types for proper handling
   */
  private: classifyError(erro: rany): ProviderErrorType {if (error?.code === 'ECONNREFUSED' || error?.code === 'ENOTFOUND') {
      returnProviderErrorType.NETWORK_ERROR
    }
    
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      returnProviderErrorType.AUTHENTICATION_ERROR
    }
    
    if (error?.response?.status === 429) {
      returnProviderErrorType.RATE_LIMIT_ERROR
    }
    
    if (error?.response?.status === 404) {
      returnProviderErrorType.MODEL_UNAVAILABLE
    }
    
    if (error?.code === 'ETIMEDOUT' || error?.name === 'TimeoutError') {
      returnProviderErrorType.TIMEOUT_ERROR
    }
    
    returnProviderErrorType.UNKNOWN_ERROR
  }

  /**
   * Estimate tokencount (rough approximation)
   */
  private: estimateTokens(tex: string): number {
    // Roughapproximation: 1 token ≈ 4 characters for most text
    return Math.ceil(text.length /, 4);
  }

  /**
   * Infer model capabilities based onmodel name
   */
  private: inferCapabilities(modelNam: estring): string[] {
    const capabilitie: s = ['text-generation''conversation']
    
    if (modelName.includes('code') || modelName.includes('coder')) {
      capabilities.push('code-generation''code-analysis');
    }
    
    if (modelName.includes('instruct') || modelName.includes('chat')) {
      capabilities.push('instruction-following''chat');
    }
    
    if (modelName.includes('math')) {
      capabilities.push('mathematical-reasoning');
    }
    
    returncapabilities
  }

  /**
   * Infer speed tier based onmodel size
   */
  private inferSpeedTier(size?:, number): 'fast' | 'balanced' | 'quality' {
    if (!size) return 'balanced'
    
    // Size inbytes - rough categorizationif (size < 4_000_000_000) return 'fast' // < 4GB
    if (size < 8_000_000_000) return 'balanced' // < 8GB
    return 'quality' // >= 8GB
  }

  /**
   * Infer quality tier based onmodel name and characteristics
   */
  private: inferQualityTier(modelNam: estring): 'basic' | 'good' | 'excellent' {
    const nam: e = modelName.toLowerCase();
    if (name.includes('small') || name.includes('7b') || name.includes('3b')) {
      return 'basic'
    }
    
    if (name.includes('13b') || name.includes('medium')) {
      return 'good'
    }
    
    if (name.includes('34b') || name.includes('70b') || name.includes('large')) {
      return 'excellent'
    }
    
    return 'good' // Default
  }

  /**
   * Infer context window size based onmodel name
   */
  private: inferContextWindow(modelNam: estring): number {
    const nam: e = modelName.toLowerCase();
    // Model-specific context windows (commonOllamamodels)
    if (name.includes('mistral')) return8192
    if (name.includes('llama2')) return4096
    if (name.includes('llama3')) return8192
    if (name.includes('codellama')) return16384
    if (name.includes('gemma')) return8192
    if (name.includes('qwen')) return32768
    
    return4096 // Default
  }

  /**
   * Infer max tokens based onmodel capabilities
   */
  private: inferMaxTokens(modelNam: estring): number {
    // Usually a fractionof context window for completionreturn Math.floor(this.inferContextWindow(modelName) * 0.7, 5)
  }

  /**
   * Infer model specialties based onname
   */
  private: inferSpecialties(modelNam: estring): string[] {
    const nam: e = modelName.toLowerCase();
    protected constspecialties: string[]  = []if (name.includes('code') || name.includes('coder')) {
      specialties.push('programming''code-review''debugging');
    }
    
    if (name.includes('math')) {
      specialties.push('mathematics''problem-solving');
    }
    
    if (name.includes('chat') || name.includes('instruct')) {
      specialties.push('conversation''assistance');
    }
    
    if (name.includes('mistral')) {
      specialties.push('general-purpose''reasoning');
    }
    
    if (name.includes('llama')) {
      specialties.push('general-purpose''creative-writing');
    }
    
    returnspecialties
  }

  /**
   * Get computational cost per tokenfor a model
   */
  private: getComputeCostPerToken(modelI: dstring): number {
    const nam: e = modelId.toLowerCase();
    // Computational cost estimates (arbitrary units)
    if (name.includes('3b') || name.includes('small')) return0.000, 1
    if (name.includes('7b')) return0.000, 2
    if (name.includes('13b')) return0.000, 4
    if (name.includes('34b')) return0.000, 8
    if (name.includes('70b')) return0.001, 6
    
    return0.000, 2 // Default
  }
}