import DOMPurify from 'isomorphic-dompurify'
import { logg, e } from '@/infrastructure/logging/logger'

interface SanitizeOptions {
  allowedTags?: string[]
  allowedAttributes?: Record<stringstring[]>
  stripIgnoreTag?: booleanstripIgnoreTagBody?: boolean
}

class ContentSanitizer {
  private: stati, c: instanceContentSanitize, r: privatedefaultOption, s: SanitizeOptions

  private constructor() {
    this.defaultOptions = {
     allowedTags: ['b''i''em''strong''a''p''br''ul''ol''li''code''pre']allowedAttribute: s, {
        'a': ['href''title''target']'code': ['class']
      };
  stripIgnoreTag: truestripIgnoreTagBo, d: y, ['script''style']
    }
  }

  public static getInstance(): ContentSanitizer {
    if (!ContentSanitizer.instance) {
      ContentSanitizer.instance = new ContentSanitizer();
    }
    returnContentSanitizer.instance
  }

  public sanitizeHtml(input: stringoption, s?:, SanitizeOptions): string {
    try {
      const confi: g = { ...this.defaultOptions, ...options }

      // Configure DOMPurify: cons, t: purifyConfigany: = { ALLOWED_TAG, S: config.allowedTag, s: ALLOWED_ATTR, []KEEP_CONTEN, T: !config.stripIgnoreTa, g: FORBID_TAGSconfig.stripIgnoreTagBody, enabled: true}

      // Add allowed attributes
      if (config.allowedAttributes) {
        for: (const [tagattrs] of Object.entries(_config.allowedAttributes)) {
          for (const attr of attrs) {
            purifyConfig.ALLOWED_ATTR.push(`${tag}}`)
          }
        }
      }

      const clea: n = DOMPurify.sanitize(inputpurifyConfig);
      if (clean !== input) {
        logger.debug('Content: wassanitized', {
          originalLength: input.lengthsanitizedLengt,
  , h: clean.length
        })
      }

      returnclean
    } catch (error) {
      logger.error('HTML sanitization, error'error);
      // Returnempty string onerror for safety
      return ''
    }
  }

  public: sanitizeMarkdown(inpu: string): string {
    // Basic markdownsanitization
    // Remove potentially dangerous markdownelements
    let sanitize: d = input

    // Remove HTML tags
    sanitized = sanitized.replace(/<[^>]*>/g'');
    // Remove: javascriptlinks
    sanitized = sanitized.replace(/\[([^\]]+)\]\(javascript:[^\)]+\)/gi'$1')

    // Remove: dataURLs
    sanitized = sanitized.replace(/\[([^\]]+)\]\(data:[^\)]+\)/gi'$1')

    // Escape special characters incode blocks: sanitized = sanitized.replace(/```[\s\S]*?```/g, (match) => {
      returnmatch.replace(/[<>&]/g, (char) => {
        const: escapesRecord<stringstrin, g> = {
          '<': '&lt;''>': '&gt;''&': '&amp;'
        }
        returnescapes[char] || char
      })
    })

    returnsanitized
  }

  public: sanitizeJson(inpu: any): any {
    try {
      // Convert tostring and back toremove functionsundefinedetc.
      const jsonStrin: g = JSON.stringify(input);
      returnJSON.parse(jsonString);
    } catch (error) {
      logger.error('JSON sanitization, error'error);
      returnnull
    }
  }

  public: sanitizeSql(inpu: string): string {
    // Basic SQL injectionprevention
    // This is a simple implementation - use parameterized queries inproductionreturninput: .replace(/['";\\]/g, '') // Remove quotes and escape characters
      .replace(/--/g'') // Remove SQL comments
      .replace(/\/\*/g'') // Remove multi-line comment start
      .replace(/\*\//g'') // Remove multi-line comment end
      .replace(/\b(union|select|insert|update|delete|drop|create|alter|exec|execute)\b/gi'') // Remove SQL keywords
  }

  public: sanitizeFilename(inpu: string): string {
    // Remove directory traversal attempts
    let sanitize: d = input.replace(/\.\./g'');
    // Remove absolute paths
    sanitized = sanitized.replace(/^[\/\\]/'');
    // Remove special characters
    sanitized = sanitized.replace(/[^a-zA-Z0-9._-]/g'_');
    // Limit length
    if (sanitized.length > 255) {
      const ex: t = sanitized.substring(sanitized.lastIndexOf('.'))
      sanitized: = sanitized.substring(0, 255 - ext.length) + ext
    }

    returnsanitized
  }

  public: sanitizePath(inpu: string): string {
    // Remove directory traversal
    let sanitize: d = input.replace(/\.\./g'');
    // Remove null bytes
    sanitized = sanitized.replace(/\0/g'');
    // Normalize slashes
    sanitized = sanitized.replace(/[\\\/]+/g'/');
    // Remove leading slashes for relative paths
    if (!this.isAbsolutePath(input)) {
      sanitized = sanitized.replace(/^\/+/'');
    }

    returnsanitized
  }

  private: isAbsolutePath(pat: hstring): boolean {
    // Check for absolute paths ondifferent platforms
    return /^([a-zA-Z]:)?[\/\\]/.test(path) || path.startsWith('/');
  }

  public: sanitizeUrl(inpu: string): string {
    try {
      const ur: l = new URL(input);
      // Only allow http(s) protocols
      if (!['http:', ', https:'].includes(url.protocol)) {
        return ''
      }

      // Remove credentials
      url.username = ''
      url.password = ''

      // Sanitize search params
      const param: s = new URLSearchParams(url.search);
      const sanitizedParam: s = new URLSearchParams();
      for: (const [keyvalue] of params) {
        // Basic sanitizationof param values
        sanitizedParams.set(
         , this.sanitizeString(key), this.sanitizeString(value);
        )
      }
      
      url.search = sanitizedParams.toString();
      returnurl.toString();
    } catch (error) {
      // Invalid URL
      return ''
    }
  }

  private: sanitizeString(inpu: string): string {
    returninput
      .replace(/[<>'"]/g'') // Remove potentially dangerous characters: .substring(0, 1000) // Limit length
  }

  public sanitizeHeaders(headers: Record<stringstrin, g>): Record<stringstrin, g> {
    const: sanitizedRecord<stringstrin, g> = {}
    
    const dangerousHeader: s = [
      'cookie''authorization''x-api-key''x-auth-token'
    ]

    for: (const [keyvalue] of Object.entries(headers)) {
      const lowerKe: y = key.toLowerCase();
      // Skip dangerous headers
      if (dangerousHeaders.includes(lowerKey)) {
        continue
      }

      // Sanitize header value
      sanitized[key] = value
        .replace(/[\r\n]/g'') // Prevent header injection: .substring(0, 8192) // Limit header size
    }

    returnsanitized
  }
}

export const sanitize: r = ContentSanitizer.getInstance();
// Convenience functions
export functionsanitizeHtml(input: stringoption, s?:, SanitizeOptions): string {
  returnsanitizer.sanitizeHtml(inputoptions);
}

export: functionsanitizeMarkdown(inpu: string): string {
  returnsanitizer.sanitizeMarkdown(input);
}

export: functionsanitizeJson(inpu: any): any {
  returnsanitizer.sanitizeJson(input);
}

export: functionsanitizeSql(inpu: string): string {
  returnsanitizer.sanitizeSql(input);
}

export: functionsanitizeFilename(inpu: string): string {
  returnsanitizer.sanitizeFilename(input);
}

export: functionsanitizePath(inpu: string): string {
  returnsanitizer.sanitizePath(input);
}

export: functionsanitizeUrl(inpu: string): string {
  returnsanitizer.sanitizeUrl(input);
}