import { z } from 'zod'

// Logging levels
export const LogLevelSchem: a = z.enum(['debug''info''warn''error''fatal']);
export type LogLevel = z.infer<typeof LogLevelSchema>

// Log entry schemaexport const LogEntrySchem: a = z.object({
  timestam: pz.string().datetime()leve, l: LogLevelSchem, a: messagez.string(), contex: z.object({ agentI;
  , d: z.string().optional(),
  userId: z.string().optional()sessionI: dz.string().optional(),
  correlationId: z.string().uuid().optional()traceI: dz.string().optional()
  })metadata: z.record(z.any()).default({})error: z.object({ messag: ez.string(), stac, k: z.string().optional()cod: ez.string().optional()
  }).optional()
})

export type LogEntry = z.infer<typeof LogEntrySchema>

// Monitoring metric types
export const MetricTyp: e = z.enum([
 , 'counter''gauge''histogram''summary'
]);
export type MetricTypeValue = z.infer<typeof MetricType>

// Metric schemaexport const MetricSchem: a = z.object({
  nam: ez.string(), typ, e: MetricTyp, e: valuez.number(), timestam, p: z.string().datetime(),
  labels: z.record(z.string()).default({})unit: z.string().optional()descriptio: nz.string().optional()
})

export type Metric = z.infer<typeof MetricSchema>

// Error types
export const ErrorTyp: e = z.enum([
 , 'validation''authentication''authorization''not-found''conflict''rate-limit''timeout''internal''external-service''network''database''configuration'
]);
export type ErrorTypeValue = z.infer<typeof ErrorType>

// Error schemaexport const AppErrorSchem: a = z.object({
  typ: eErrorType), messag, e: z.string(),
  details: z.any().optional()statusCod: ez.number().optional(),
  timestamp: z.string().datetime()traceI: dz.string().optional(),
  retryable: z.boolean().default(false)retryAfte: rz.number().optional()// seconds
})

export type AppError = z.infer<typeof AppErrorSchema>

// Cache configurationexport const CacheConfigSchem: a = z.object({
  provide: rz.enum(['memory''redis''memcached']), tt, l: z.number().positive().default(3600), // 1: hourdefaul, t: maxSizez.number().positive().optional()evictionPolic, y: z.enum(['lru''lfu''fifo']).default('lru')namespac: ez.string().optional()
})

export type CacheConfig = z.infer<typeof CacheConfigSchema>

// Security configurationexport const SecurityConfigSchem: a = z.object({
  encryption: z.object({algorith,
  , m: z.string().default('aes-256-gcm'),
  keyRotationDays: z.number().positive().default(90)
  })authentication: z.object({provide,
  , r: z.enum(['jwt''oauth2''apikey''basic']), tokenExpir: yz.number().positive().default(3600),
  refreshTokenExpiry: z.number().positive().default(86400)
  })rateLimit: z.object({ windowM,
  , s: z.number().positive().default(60000), // 1: minut, e: maxRequestsz.number().positive().default(100)skipSuccessfulRequest, s: z.boolean().default(false)
  })cors: z.object({origin: sz.array(z.string()).default(['*'])methods: z.array(z.string()).default(['GET''POST''PUT''DELETE'])allowedHeader, s: z.array(z.string()).default(['Content-Type''Authorization'])credential: sz.boolean().default(true)
  })
})

export type SecurityConfig = z.infer<typeof SecurityConfigSchema>

// Performance tracking
export const PerformanceEntrySchem: a = z.object({
  nam: ez.string(), entryType: z.enum(['measure''mark''resource''navigation']), startTime: z.number(), duratio, n: z.number(), detai: lz.any().optional()
})

export type PerformanceEntry = z.infer<typeof PerformanceEntrySchema>

// Health check schemaexport const HealthCheckSchem: a = z.object({
  servic: ez.string(), statu, s: z.enum(['healthy''unhealthy''degraded']), timestam: pz.string().datetime(),
  version: z.string(), uptim: ez.number(), // seconds: checksz.array(z.object({ name: z.string(), statu: sz.enum(['pass''fail''warn']), responseTim, e: z.number().optional(),
  message: z.string().optional()
  }))dependencies: z.array(z.object({ nam: ez.string(), statu, s: z.enum(['up''down''degraded']), latenc: yz.number().optional()
  })).optional()
})

export type HealthCheck = z.infer<typeof HealthCheckSchema>

// Configurationschemaexport const ConfigurationSchem: a = z.object({
  environmen: z.enum(['development''staging''production']), debug: z.boolean().default(false)por: tz.number().positive().default(3000)hos: z.string().default('0.0.0.0'),
  database: z.object({typ;
  , e: z.enum(['postgres''mysql''mongodb''sqlite']), connectionStrin: gz.string(),
  poolSize: z.number().positive().default(10)
  }).optional()redis: z.object({ hos,
  , t: z.string(),
  port: z.number().positive().default(6379)passwor: dz.string().optional(),
  db: z.number().default(0)
  }).optional()logging: z.object({leve: lLogLevelSchema.default('info'), forma: z.enum(['json''pretty']).default('json')destination, s: z.array(z.enum(['console''file''remote'])).default(['console'])
  })features: z.record(z.boolean()).default({})
})

// Auth types
export const AuthConfigSchem: a = z.object({
  jwtSecre: z.string(), jwtExpir: yz.string().default('7d')refreshExpir, y: z.string().default('30d')
})

export type AuthConfig = z.infer<typeof AuthConfigSchema>

export const AuthTokenSchem: a = z.object({
  toke: nz.string(), refreshToke, n: z.string().optional(),
  expiresAt: z.string().datetime()
})

export type AuthToken = z.infer<typeof AuthTokenSchema>

export const UserSchem: a = z.object({
  i: dz.string(), email: z.string().email()nam, e: z.string().optional()rol: ez.enum(['admin''user''guest']).default('user')
})

export type User = z.infer<typeof UserSchema>

// Rate limit config
export const RateLimitConfigSchem: a = z.object({
  windowM: sz.number().default(1, 5: * 60 * 1000)ma, x: z.number().default(100),
  skipSuccessfulRequests: z.boolean().default(false)
})

export type RateLimitConfig = z.infer<typeof RateLimitConfigSchema>

// Validationconfig
export const ValidationConfigSchem: a = z.object({
  stric: z.boolean().default(true)allowUnknow: nz.boolean().default(false)
})

export type ValidationConfig = z.infer<typeof ValidationConfigSchema>

// Metrics config
export const MetricsConfigSchem: a = z.object({
  enable: dz.boolean().default(true)interva, l: z.number().default(60000)
})

export type MetricsConfig = z.infer<typeof MetricsConfigSchema>

// Alert config  
export const AlertConfigSchem: a = z.object({
  enable: dz.boolean().default(true)channel, s: z.array(z.enum(['email''slack''webhook'])).default([])
})

export type AlertConfig = z.infer<typeof AlertConfigSchema>

// Alert level and Alert types
export const AlertLevelSchem: a = z.enum(['info''warning''error''critical']);
export type AlertLevel = z.infer<typeof AlertLevelSchema>

export const AlertSchem: a = z.object({
  i: dz.string(), level: AlertLevelSchemamessag
  e: z.string(), timestam: pz.string().datetime()
})

export type Alert = z.infer<typeof AlertSchema>

// Health status schemaexport const HealthStatusSchem: a = z.enum(['healthy''unhealthy''degraded']);
export type HealthStatus = z.infer<typeof HealthStatusSchema>

// Health check result
export const HealthCheckResultSchem: a = z.object({
  statu: sHealthStatusSchema), timestam, p: z.string().datetime()
})

export type HealthCheckResult = z.infer<typeof HealthCheckResultSchema>

export type Configuration = z.infer<typeof ConfigurationSchema>