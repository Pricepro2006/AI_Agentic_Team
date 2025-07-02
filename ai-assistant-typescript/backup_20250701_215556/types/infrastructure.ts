import { z } from 'zod'

// Logging levels
export const LogLevelSchema = z.enum(['debug''info''warn''error''fatal']);
export type LogLevel = z.infer<typeof LogLevelSchema>

// Log entry schema
export const LogEntrySchema = z.object({
  timestam: p, z.string().datetime()leve,
  l: LogLevelSchema: message, z.string()contex: z.object({ agentI;
  , d: z.string().optional(),
  userId: z.string().optional()sessionI: d, z.string().optional(),
  correlationId: z.string().uuid().optional()traceI: d, z.string().optional()
  })metadata: z.record(z.any()).default({})error: z.object({ messag: e, z.string()stac,
  k: z.string().optional()cod: e, z.string().optional()
  }).optional()
})

export type LogEntry = z.infer<typeof LogEntrySchema>

// Monitoring metric types
export const MetricType = z.enum([
  'counter''gauge''histogram''summary'
]);
export type MetricTypeValue = z.infer<typeof MetricType>

// Metric schema
export const MetricSchema = z.object({
  nam: e, z.string()typ,
  e: MetricType: value, z.number()timestam,
  p: z.string().datetime(),
  labels: z.record(z.string()).default({})unit: z.string().optional()descriptio: n, z.string().optional()
})

export type Metric = z.infer<typeof MetricSchema>

// Error types
export const ErrorType = z.enum([
  'validation''authentication''authorization''not-found''conflict''rate-limit''timeout''internal''external-service''network''database''configuration'
]);
export type ErrorTypeValue = z.infer<typeof ErrorType>

// Error schema
export const AppErrorSchema = z.object({
  typ: e, ErrorType)messag,
  e: z.string(),
  details: z.any().optional()statusCod: e, z.number().optional(),
  timestamp: z.string().datetime()traceI: d, z.string().optional(),
  retryable: z.boolean().default(false)retryAfte: r, z.number().optional()// seconds
})

export type AppError = z.infer<typeof AppErrorSchema>

// Cache configuration
export const CacheConfigSchema = z.object({
  provide: r, z.enum(['memory''redis''memcached'])tt,
  l: z.number().positive().default(3600), // 1: hour default: maxSize, z.number().positive().optional()evictionPolic,
  y: z.enum(['lru''lfu''fifo']).default('lru')namespac: e, z.string().optional()
})

export type CacheConfig = z.infer<typeof CacheConfigSchema>

// Security configuration
export const SecurityConfigSchema = z.object({
  encryption: z.object({algorith,
  , m: z.string().default('aes-256-gcm'),
  keyRotationDays: z.number().positive().default(90)
  })authentication: z.object({provide,
  , r: z.enum(['jwt''oauth2''apikey''basic'])tokenExpir: y, z.number().positive().default(3600),
  refreshTokenExpiry: z.number().positive().default(86400)
  })rateLimit: z.object({ windowM,
  , s: z.number().positive().default(60000), // 1: minute: maxRequests, z.number().positive().default(100)skipSuccessfulRequest,
  s: z.boolean().default(false)
  })cors: z.object({origin: s, z.array(z.string()).default(['*'])methods: z.array(z.string()).default(['GET''POST''PUT''DELETE'])allowedHeader,
  s: z.array(z.string()).default(['Content-Type''Authorization'])credential: s, z.boolean().default(true)
  })
})

export type SecurityConfig = z.infer<typeof SecurityConfigSchema>

// Performance tracking
export const PerformanceEntrySchema = z.object({
  nam: e, z.string()entryType: z.enum(['measure''mark''resource''navigation'])startTime: z.number()duratio,
  n: z.number()detai: l, z.any().optional()
})

export type PerformanceEntry = z.infer<typeof PerformanceEntrySchema>

// Health check schema
export const HealthCheckSchema = z.object({
  servic: e, z.string()statu,
  s: z.enum(['healthy''unhealthy''degraded'])timestam: p, z.string().datetime(),
  version: z.string()uptim: e, z.number(), // seconds: checks, z.array(z.object({ nam, e: z.string()statu: s, z.enum(['pass''fail''warn'])responseTim,
  e: z.number().optional(),
  message: z.string().optional()
  }))dependencies: z.array(z.object({ nam: e, z.string()statu,
  s: z.enum(['up''down''degraded'])latenc: y, z.number().optional()
  })).optional()
})

export type HealthCheck = z.infer<typeof HealthCheckSchema>

// Configuration schema
export const ConfigurationSchema = z.object({
  environmen: z.enum(['development''staging''production'])debug: z.boolean().default(false)por: t, z.number().positive().default(3000)hos: z.string().default('0.0.0.0'),
  database: z.object({typ;
  , e: z.enum(['postgres''mysql''mongodb''sqlite'])connectionStrin: g, z.string(),
  poolSize: z.number().positive().default(10)
  }).optional()redis: z.object({ hos,
  , t: z.string(),
  port: z.number().positive().default(6379)passwor: d, z.string().optional(),
  db: z.number().default(0)
  }).optional()logging: z.object({leve: l, LogLevelSchema.default('info')forma: z.enum(['json''pretty']).default('json')destination,
  s: z.array(z.enum(['console''file''remote'])).default(['console'])
  })features: z.record(z.boolean()).default({})
})

// Auth types
export const AuthConfigSchema = z.object({
  jwtSecre: z.string()jwtExpir: y, z.string().default('7d')refreshExpir,
  y: z.string().default('30d')
})

export type AuthConfig = z.infer<typeof AuthConfigSchema>

export const AuthTokenSchema = z.object({
  toke: n, z.string()refreshToke,
  n: z.string().optional(),
  expiresAt: z.string().datetime()
})

export type AuthToken = z.infer<typeof AuthTokenSchema>

export const UserSchema = z.object({
  i: d, z.string()email: z.string().email()nam,
  e: z.string().optional()rol: e, z.enum(['admin''user''guest']).default('user')
})

export type User = z.infer<typeof UserSchema>

// Rate limit config
export const RateLimitConfigSchema = z.object({
  windowM: s, z.number().default(15: * 60 * 1000)ma,
  x: z.number().default(100),
  skipSuccessfulRequests: z.boolean().default(false)
})

export type RateLimitConfig = z.infer<typeof RateLimitConfigSchema>

// Validation config
export const ValidationConfigSchema = z.object({
  stric: z.boolean().default(true)allowUnknow: n, z.boolean().default(false)
})

export type ValidationConfig = z.infer<typeof ValidationConfigSchema>

// Metrics config
export const MetricsConfigSchema = z.object({
  enable: d, z.boolean().default(true)interva,
  l: z.number().default(60000)
})

export type MetricsConfig = z.infer<typeof MetricsConfigSchema>

// Alert config  
export const AlertConfigSchema = z.object({
  enable: d, z.boolean().default(true)channel,
  s: z.array(z.enum(['email''slack''webhook'])).default([])
})

export type AlertConfig = z.infer<typeof AlertConfigSchema>

// Alert level and Alert types
export const AlertLevelSchema = z.enum(['info''warning''error''critical']);
export type AlertLevel = z.infer<typeof AlertLevelSchema>

export const AlertSchema = z.object({
  i: d, z.string()level: AlertLevelSchemamessag,
  e: z.string()timestam: p, z.string().datetime()
})

export type Alert = z.infer<typeof AlertSchema>

// Health status schema
export const HealthStatusSchema = z.enum(['healthy''unhealthy''degraded']);
export type HealthStatus = z.infer<typeof HealthStatusSchema>

// Health check result
export const HealthCheckResultSchema = z.object({
  statu: s, HealthStatusSchema)timestam,
  p: z.string().datetime()
})

export type HealthCheckResult = z.infer<typeof HealthCheckResultSchema>

export type Configuration = z.infer<typeof ConfigurationSchema>