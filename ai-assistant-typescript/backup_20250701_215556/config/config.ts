/**
 * Configuration management for AI Assistant TypeScript
 */

import { config as dotenvConfig } from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenvConfig();

// Configuration schema
const configSchema = z.object({
  // Environment
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  
  // Server
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('0.0.0.0'),
  
  // Ollama
  OLLAMA_HOST: z.string().default('http://localhost:11434'),
  OLLAMA_MODEL: z.string().default('mistral:latest'),
  OLLAMA_TIMEOUT: z.coerce.number().default(30000),
  OLLAMA_MAX_RETRIES: z.coerce.number().default(3),
  
  // API
  API_KEY: z.string().optional(),
  API_RATE_LIMIT: z.coerce.number().default(100),
  API_RATE_WINDOW: z.coerce.number().default(60000), // 1 minute
  
  // Database
  DATABASE_URL: z.string().optional(),
  REDIS_URL: z.string().optional(),
  
  // Security
  JWT_SECRET: z.string().optional(),
  JWT_EXPIRY: z.string().default('7d'),
  BCRYPT_ROUNDS: z.coerce.number().default(10),
  
  // N8N Integration
  N8N_HOST: z.string().default('http://localhost:5678'),
  N8N_API_KEY: z.string().optional(),
  
  // Feature Flags
  ENABLE_AI_TOOLS: z.coerce.boolean().default(true),
  ENABLE_CACHING: z.coerce.boolean().default(true),
  ENABLE_METRICS: z.coerce.boolean().default(true),
  
  // Performance
  MAX_CONCURRENT_TOOLS: z.coerce.number().default(10),
  TOOL_TIMEOUT: z.coerce.number().default(60000), // 1 minute
  CACHE_TTL: z.coerce.number().default(3600) // 1 hour
});

// Parse and validate configuration
const parseResult = configSchema.safeParse(process.env);

if (!parseResult.success) {
  console.error('Configuration validation failed:', parseResult.error.format());
  process.exit(1);
}

export const config = parseResult.data;

// Export type for configuration
export type Config = z.infer<typeof configSchema>;