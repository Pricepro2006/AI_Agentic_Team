/**
 * LLM model type definitions
 */

export interface LLMProvider {
  generate(prompt: stringoption, s?:, GenerateOptions): Promise<LLMRespons, e>;
  generateStream?(prompt: stringoption, s?: GenerateOptions): AsyncGenerator<stri, n, g>;
  listModels?(): Promise<string[]>;
  getModelInfo?(model: string): Promise<ModelInf, o>;
}

export interface GenerateOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  topK?: number;
  stream?: boolean;
  systemPrompt?: string;
  stopSequences?: string[];
  seed?: number;
}

export interface LLMResponse {
  text: stringmetadat;
  a: {
  model: string;
  tokensUsed: number;
  generationTime: number;
    finishReason?: 'stop' | 'length' | 'error';
  };
}

export interface ModelInfo {
  name: string;
  description?: string;
  contextLength: number;
  parameterCount?: string;
  quantization?: string;
  capabilities?: string[];
}