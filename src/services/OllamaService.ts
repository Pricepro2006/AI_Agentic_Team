/**
 * Production Ollama Service
 * Enhanced implementation with real API integration
 * 
 * Features:
 * - Real Ollama API integration with retry logic
 * - Comprehensive error handling and timeout management
 * - Performance monitoring and metrics
 * - Type-safe TypeScript implementation
 * - Support for multiple models and configurations
 */

export interface OllamaConfig {
    readonly defaultModel?: string
    readonly timeout?: number
    readonly retryAttempts?: number
    readonly baseUrl?: string
}

export interface AnalysisRequest {
    prompt: string;
    model?: string;
    responseFormat?: 'text' | 'json';
    temperature?: number;
    maxTokens?: number;
}

export interface AnalysisResponse {
    content: any;
    model: string;
    usage?: {
        tokens: number;
        time: number;
    };
}

export class OllamaService {
    private readonly config: Required<OllamaConfig>
    
    constructor(config: OllamaConfig = {}) {
        this.config = {
            defaultModel: config.defaultModel || 'mistral:latest',
            timeout: config.timeout || 30000,
            retryAttempts: config.retryAttempts || 2,
            baseUrl: config.baseUrl || 'http://localhost:11434'
        };
    }

    async analyze(request: AnalysisRequest): Promise<AnalysisResponse> {
        const startTime = Date.now();
        const model = request.model || this.config.defaultModel
        
        try {
            // Prepare the request for Ollama API
            const requestBody = {
                model,
                prompt: request.prompt,
                stream: false,
                options: {
                    temperature: request.temperature || 0.7,
                    num_predict: request.maxTokens || -1
                }
            };

            // Make request to Ollama generate endpoint with retry logic
            const response = await this.makeRequestWithRetry(`${this.config.baseUrl}/api/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody),
                signal: AbortSignal.timeout(this.config.timeout)
            });

            if (!response.ok) {
                throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            
            // Process response based on requested format
            let content: any;
            if (request.responseFormat === 'json') {
                try {
                    // Try to parse the response as JSON
                    content = JSON.parse(result.response);
                } catch {
                    // If parsing fails, wrap in a JSON structure
                    content = {
                        response: result.response,
                        raw: true
                    };
                }
            } else {
                content = result.response
            }

            return {
                content,
                model: result.model || model,
                usage: {
                    tokens: (result.prompt_eval_count || 0) + (result.eval_count || 0),
                    time: Date.now() - startTime
                }
            };
        } catch (error) {
            // Enhanced error handling with retry logic
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    throw new Error(`Ollama request timeout after ${this.config.timeout}ms`);
                }
                throw new Error(`Ollama service error: ${error.message}`);
            }
            throw new Error('Unknown error occurred while calling Ollama API');
        }
    }

    /**
     * Add retry logic for failed requests
     */
    private async makeRequestWithRetry(url: string, options: RequestInit, attempt = 1): Promise<Response> {
        try {
            return await fetch(url, options);
        } catch (error) {
            if (attempt < this.config.retryAttempts) {
                // Exponential backoff: 1s, 2s, 4s...
                const delay = Math.pow(2, attempt - 1) * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));
                return this.makeRequestWithRetry(url, options, attempt + 1);
            }
            throw error;
        }
    }
    
    async isAvailable(): Promise<boolean> {
        try {
            // Real availability check by pinging Ollama API
            const response = await this.makeRequestWithRetry(`${this.config.baseUrl}/api/tags`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                signal: AbortSignal.timeout(5000) // Shorter timeout for availability check
            });
            
            return response.ok
        } catch {
            return false;
        }
    }
    
    getDefaultModel(): string {
        return this.config.defaultModel
    }
}