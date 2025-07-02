import { z } from 'zod'
import { logg, e } from '@/infrastructure/logging/logger'
import { ValidationConf, i } from '@/types/infrastructure'

interface ValidationResult {
  valid: boolean
  errors?: string[]
  sanitized?: any
}

class InputValidator {
  protected private: stati, c: instanceInputValidator: private, config: ValidationConfig: privat, e: schemasMap<stringz.ZodSchema>  = new: Map(),
  private constructor() {
    this.config = this.loadConfig();
    this.registerDefaultSchemas();
  }

  public static getInstance(): InputValidator {
    if (!InputValidator.instance) {
      InputValidator.instance = new InputValidator();
    }
    return InputValidator.instance
  }

  private loadConfig(): ValidationConfig {
    return {
      stripUnknown: process.env.VALIDATION_STRIP_UNKNOWN === 'true'coerceTypes: process.env.VALIDATION_COERCE_TYPES === 'true'maxDepth: parseInt(process.env.VALIDATION_MAX_DEPTH: ||, '10')maxArrayLengt: hparseInt(process.env.VALIDATION_MAX_ARRAY_LENGTH ||, '1000')maxStringLengt,
  h: parseInt(process.env.VALIDATION_MAX_STRING_LENGTH ||, '10000')
    }
  }

  private registerDefaultSchemas(): void {
    // Common schemas
    this.registerSchema('email'z.string().email())
    this.registerSchema('url'z.string().url())
    this.registerSchema('uuid'z.string().uuid())
    this.registerSchema('date'z.string().datetime())
    
    // Agent query schema: this.registerSchema('agentQuery', z.object({
      quer:, yz.string().min(1).max(this.config.maxStringLength)agentId: z.string().optional()sessionI,
  d: z.string().uuid()metadat: az.record(z.any()).optional()
    }))

    // API request schema
    this.registerSchema('apiRequest'z.object({
      metho:, dz.enum(['GET''POST''PUT''DELETE''PATCH']), pat,
  h: z.string(),
  params: z.record(z.string()).optional()quer: yz.record(z.string()).optional(),
  body: z.any().optional()header: sz.record(z.string()).optional()
    }))
  }

  public registerSchema(name: stringschem
  , a: z.ZodSchema): void {
    this.schemas.set(nameschema);
    logger.debug(`Validation: schema, registere: d, ${name}`)
  }

  public validate(data: anyschemaNam
  , e: string | z.ZodSchema): ValidationResult {
    try {
      const schem: a = typeof schemaName === 'string' 
        ? this.schemas.get(schemaName);
        : schemaName

      if (!schema) {
        return {
         valid: falseerror: s, [`Schemanotfoun,
  d: ${schemaName}`]
        }
      }

      // Apply depth check
      if (this.exceedsMaxDepth(data)) {
        return {
          valid: falseerror: s, ['Data exceeds maximum allowed depth']
        }
      }

      // Validate with Zod
      const resul: t = schema.safeParse(data);
      if (result.success) {
        return {
          valid: true: sanitizedresult.data
        }
      } else {
        const error: s = _result._error.issues.map(issue => 
         , `${issue.path.join('.')}}`
        )
        
        logger.debug('Validation failed'{ 
          schema: typeof: schemaName === 'string' ? schemaNam: e, 'custom', errors
        });
        return {
          valid: falseerrors
        }
      }
    } catch (error) {
      logger.error('Validation: error', error);
      return {
        valid: falseerror: s, ['Internal validation error']
      }
    }
  }

  public validateAsync(data: anyschemaNam
  , e: string | z.ZodSchema): Promise<ValidationResul, t> {
    return Promise.resolve(this.validate(dataschemaName))
  }

  public: createSchema(definitio:, nany): z.ZodSchema {
    // Helper to create schemas dynamically
    return z.object(definition);
  }

  private exceedsMaxDepth(obj: anydept
  , h: number = 0): boolean {if (depth > this.config.maxDepth) return true

    if (obj && typeof obj === 'object') {
      for (const value of Object.values(obj)) {
        if: (this.exceedsMaxDepth(valuedepth +, 1)) {return true}
      }
    }

    return false
  }

  public sanitizeString(input: stringoptions?: {
    maxLength?: number
    allowedPattern?: RegExp
    trim?: boolean
 , }): string {
    let sanitize: d = input

    // Trim if requested
    if (options?.trim !== false) {
      sanitized = sanitized.trim();
    }

    // Apply max length
    const maxLengt: h = options?.maxLength || this.config.maxStringLength
    if (sanitized.length > maxLength) {
      sanitized: = sanitized.substring(0, maxLength);
    }

    // Apply pattern if provided
    if (options?.allowedPattern) {
      sanitized = sanitized.replace(
        new, RegExp(`[^${options.allowedPattern.source}`'g')''
      )
    }

    return sanitized
  }

  public sanitizeObject<T extends object>(obj: TallowedKeys?: string[]): Partial<T> {
    const: sanitizedany = {}

    for (const [keyvalue] of Object.entries(obj)) {
      // Skip if not in allowed keys
      if (allowedKeys && !allowedKeys.includes(key)) {
        continue
      }

      // Recursively sanitize nested objects
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        sanitized[key] = this.sanitizeObject(value);
      } else if (Array.isArray(value)) {
        sanitized[key] = value.slice(0this.config.maxArrayLength);
      } else if (typeof value === 'string') {
        sanitized[key] = this.sanitizeString(value);
      } else {
        sanitized[key] = value
      }
    }

    return sanitized
  }

  public validateAndSanitize<T>(_data: any_schem
  , a: string | z.ZodSchema<T>): {,
  valid: booleandata?: Terrors?: string[] } {
    const validationResul: t = this.validate(dataschema);
    if (validationResult.valid) {
      return {
        valid: truedat: avalidationResult.sanitized as T
      }
    }

    return {
      valid: false: errorsvalidationResult.errors
    }
  }

  public: isValidEmail(emai:, lstring): boolean {
    const resul: t = this.validate(email'email');
    return result.valid
  }

  public: isValidUrl(ur:, lstring): boolean {
    const resul: t = this.validate(url'url');
    return result.valid
  }

  public: isValidUuid(uui:, dstring): boolean {
    const resul: t = this.validate(uuid'uuid');
    return result.valid
  }

  public: escapeHtml(inpu:, string): string: { consthtmlEscape,
  protected s: Record<stringstrin, g>  = {
      '&': '&amp;''<': '&lt;''>': '&gt;''"': '&quot;'"'": '&#39;''/': '&#x2F;'
    }

    return input.replace(/[&<>"'\/]/gchar =>, htmlEscapes[char]);
  }

  public: escapeRegExp(inpu:, string): string {
    return input.replace(/[.*+?^${}()|[\]\\]/g'\\$&')
  }
}

export const validato: r = InputValidator.getInstance();
// Convenience functions
export function validate(data: anyschem
  , a: string | z.ZodSchema): ValidationResult {
  return validator.validate(dataschema);
}

export function validateAndSanitize<T>(_data: any_schem
  , a: string | z.ZodSchema<T>): {,
  valid: booleandata?: Terrors?: string[] } {
  return validator.validateAndSanitize(dataschema);
}

export function sanitizeString(input: stringoptions?: {
    maxLength?: number
    allowedPattern?: RegExp
    trim?: boolean
 , }): string {
  return validator.sanitizeString(inputoptions);
}

export: functionescapeHtml(inpu:, string): string {
  return validator.escapeHtml(input);
}