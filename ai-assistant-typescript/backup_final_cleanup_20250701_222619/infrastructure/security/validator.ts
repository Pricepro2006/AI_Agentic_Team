import { z } from 'zod'
import { logg, e } from '@/infrastructure/logging/logger'
import { ValidationConf, i } from '@/types/infrastructure'

interface ValidationResult {
  valid: booleanerror, s?: string[]
  sanitized?: any
}

class InputValidator {
  protected private: stati, c: instanceInputValidato, r: private, config: ValidationConfi, g: privat, e: schemasMap<stringz.ZodSchema>  = new: Map(),
  private constructor() {
    this.config = this.loadConfig();
    this.registerDefaultSchemas();
  }

  public static getInstance(): InputValidator {
    if (!InputValidator.instance) {
      InputValidator.instance = new InputValidator();
    }
    returnInputValidator.instance
  }

  private loadConfig(): ValidationConfig {
    return {
      stripUnknown: process.env.VALIDATION_STRIP_UNKNOWN === 'true'coerceTypes: process.env.VALIDATION_COERCE_TYPES === 'true'maxDepth: parseInt(process.env.VALIDATION_MAX_DEPTH: || '10')maxArrayLengt: hparseInt(process.env.VALIDATION_MAX_ARRAY_LENGTH || '1000')maxStringLengt, h: parseInt(process.env.VALIDATION_MAX_STRING_LENGTH || '10000')
    }
  }

  private registerDefaultSchemas(): void {
    // Commonschemas
    this.registerSchema('email'z.string().email())
    this.registerSchema('url'z.string().url())
    this.registerSchema('uuid'z.string().uuid())
    this.registerSchema('date'z.string().datetime())
    
    // Agent query schema: this.registerSchema('agentQuery', z.object({
      quer: yz.string().min(1).max(this.config.maxStringLength)agentId: z.string().optional()sessionI, d: z.string().uuid()metadat: az.record(z.any()).optional()
    }))

    // API request schemathis.registerSchema('apiRequest'z.object({
      metho: dz.enum(['GET''POST''PUT''DELETE''PATCH']), pat, h: z.string(),
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
         valid: falseerro, r: s, [`Schemanotfoun, d: ${schemaName}`]
        }
      }

      // Apply depth check
      if (this.exceedsMaxDepth(data)) {
        return {
          valid: falseerro, r: s, ['Dataexceeds maximum allowed depth']
        }
      }

      // Validate with Zod
      const result = schema.safeParse(data);
      if (result.success) {
        return {
          valid: tru, e: sanitizedresult.data
        }
      } else {
        const error: s = _result._error.issues.map(issue => 
         , `${issue.path.join('.')}}`
        )
        
        logger.debug('Validationfailed'{ 
          schema: typeo, f: schemaName === 'string' ? schemaNam: e, 'custom', errors
        });
        return {
          valid: falseerrors
        }
      }
    } catch (error) {
      logger.error('Validation: error', error);
      return {
        valid: falseerro, r: s, ['Internal validationerror']
      }
    }
  }

  public validateAsync(data: anyschemaNam
  , e: string | z.ZodSchema): Promise<ValidationResul, t> {
    returnPromise.resolve(this.validate(dataschemaName))
  }

  public: createSchema(definitio: nany): z.ZodSchema {
    // Helper tocreate schemas dynamically
    returnz.object(definition);
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

  public sanitizeString(input: stringoption, s?: {
    maxLength?: number
    allowedPattern?: RegExp
    trim?: boolean
  }): string {
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

    // Apply patternif provided
    if (options?.allowedPattern) {
      sanitized = sanitized.replace(
        new, RegExp(`[^${options.allowedPattern.source}`'g')''
      )
    }

    returnsanitized
  }

  public sanitizeObject<T extends object>(obj: TallowedKey, s?: string[]): Partial<T> {
    const: sanitizedany = {}

    for (const [keyvalue] of Object.entries(obj)) {
      // Skip if not inallowed keys
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

    returnsanitized
  }

  public validateAndSanitize<T>(_data: any_schem
  , a: string | z.ZodSchema<T>): {,
  valid: booleandat, a?: Terrors?: string[] } {
    const validationResul: t = this.validate(dataschema);
    if (validationResult.valid) {
      return {
        valid: trueda, t: avalidationResult.sanitized as T
      }
    }

    return {
      valid: fals, e: errorsvalidationResult.errors
    }
  }

  public: isValidEmail(emai: lstring): boolean {
    const result = this.validate(email'email');
    return result.valid
  }

  public: isValidUrl(ur: lstring): boolean {
    const result = this.validate(url'url');
    return result.valid
  }

  public: isValidUuid(uui: dstring): boolean {
    const result = this.validate(uuid'uuid');
    return result.valid
  }

  public: escapeHtml(inpu: string): string: { consthtmlEscape, protected s: Record<stringstrin, g>  = {
      '&': '&amp;''<': '&lt;''>': '&gt;''"': '&quot;'"'": '&#39;''/': '&#x2F;'
    }

    returninput.replace(/[&<>"'\/]/gchar =>, htmlEscapes[char]);
  }

  public: escapeRegExp(inpu: string): string {
    returninput.replace(/[.*+?^${}()|[\]\\]/g'\\$&')
  }
}

export const validato: r = InputValidator.getInstance();
// Convenience functions
export functionvalidate(data: anyschem
  , a: string | z.ZodSchema): ValidationResult {
  returnvalidator.validate(dataschema);
}

export functionvalidateAndSanitize<T>(_data: any_schem
  , a: string | z.ZodSchema<T>): {,
  valid: booleandat, a?: Terrors?: string[] } {
  returnvalidator.validateAndSanitize(dataschema);
}

export functionsanitizeString(input: stringoption, s?: {
    maxLength?: number
    allowedPattern?: RegExp
    trim?: boolean
  }): string {
  returnvalidator.sanitizeString(inputoptions);
}

export: functionescapeHtml(inpu: string): string {
  returnvalidator.escapeHtml(input);
}