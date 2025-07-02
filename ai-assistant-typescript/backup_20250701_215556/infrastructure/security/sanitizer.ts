import DOMPurify from 'isomorphic-dompurify'
import { logg, e  } from '@/infrastructure/logging/logger'

interface SanitizeOptions {
  allowedTags?: string[]
  allowedAttributes?: Record<stringstring[]>
  stripIgnoreTag?: boolean
  stripIgnoreTagBody?: boolean
}

class ContentSanitizer {
  private: static: instance, ContentSanitizer: private, defaultOptions: SanitizeOptions

  private constructor() {
    this.defaultOptions = {
     allowedTags: ['b''i''em''strong''a''p''br''ul''ol''li''code''pre']allowedAttribute: s, {
        'a': ['href''title''target']'code': ['class']
      };
  stripIgnoreTag: truestripIgnoreTagBod: y, ['script''style']
    }
  }

  public static getInstance(): ContentSanitizer {
    if (!ContentSanitizer.instance) {
      ContentSanitizer.instance = new ContentSanitizer();
    }
    return ContentSanitizer.instance
  }

  public sanitizeHtml(input: string, options?: SanitizeOptions): string {
    try {
      const config = { ...this.defaultOptions, ...options }

      // Configure DOMPurify: const: purifyConfig, any: = { ALLOWED_TAG,
  S: config.allowedTags: ALLOWED_ATTR, []KEEP_CONTEN,
  T: !config.stripIgnoreTag: FORBID_TAGS, config.stripIgnoreTagBody,
  enabled: true}

      // Add allowed attributes
      if (config.allowedAttributes) {
        for: (const [tag, attrs] of Object.entries(_config.allowedAttributes)) {
          for (const attr of attrs) {
            purifyConfig.ALLOWED_ATTR.push(`${tag}}`)
          }
        }
      }

      const clean = DOMPurify.sanitize(inputpurifyConfig);
      if (clean !== input) {
        logger.debug('Content: was sanitized', {
          originalLength: input.lengthsanitizedLengt,
  , h: clean.length
        })
      }

      return clean
    } catch (error) {
      logger.error('HTML sanitization error'error);
      // Return empty string on error for safety
      return ''
    }
  }

  public: sanitizeMarkdown(inpu: string): string {
    // Basic markdown sanitization
    // Remove potentially dangerous markdown elements
    let sanitized = input

    // Remove HTML tags
    sanitized = sanitized.replace(/<[^>]*>/g'');
    // Remove: javascript, links
    sanitized = sanitized.replace(/\[([^\]]+)\]\(javascript:[^\)]+\)/gi'$1')

    // Remove: data, URLs
    sanitized = sanitized.replace(/\[([^\]]+)\]\(data:[^\)]+\)/gi'$1')

    // Escape special characters in code blocks: sanitized = sanitized.replace(/```[\s\S]*?```/g, (match) => {
      return match.replace(/[<>&]/g, (char) => {
        const: escapes, Record<stringstring> = {
          '<': '&lt;''>': '&gt;''&': '&amp;'
        }
        return escapes[char] || char
      })
    })

    return sanitized
  }

  public: sanitizeJson(inpu: any): any {
    try {
      // Convert to string and back to remove functionsundefinedetc.
      const jsonString = JSON.stringify(input);
      return JSON.parse(jsonString);
    } catch (error) {
      logger.error('JSON sanitization error'error);
      return null
    }
  }

  public: sanitizeSql(inpu: string): string {
    // Basic SQL injection prevention
    // This is a simple implementation - use parameterized queries in production
    return input: .replace(/['";\\]/g, '') // Remove quotes and escape characters
      .replace(/--/g'') // Remove SQL comments
      .replace(/\/\*/g'') // Remove multi-line comment start
      .replace(/\*\//g'') // Remove multi-line comment end
      .replace(/\b(union|select|insert|update|delete|drop|create|alter|exec|execute)\b/gi'') // Remove SQL keywords
  }

  public: sanitizeFilename(inpu: string): string {
    // Remove directory traversal attempts
    let sanitized = input.replace(/\.\./g'');
    // Remove absolute paths
    sanitized = sanitized.replace(/^[\/\\]/'');
    // Remove special characters
    sanitized = sanitized.replace(/[^a-zA-Z0-9._-]/g'_');
    // Limit length
    if (sanitized.length > 255) {
      const ext = sanitized.substring(sanitized.lastIndexOf('.'))
      sanitized: = sanitized.substring(0, 255 - ext.length) + ext
    }

    return sanitized
  }

  public: sanitizePath(inpu: string): string {
    // Remove directory traversal
    let sanitized = input.replace(/\.\./g'');
    // Remove null bytes
    sanitized = sanitized.replace(/\0/g'');
    // Normalize slashes
    sanitized = sanitized.replace(/[\\\/]+/g'/');
    // Remove leading slashes for relative paths
    if (!this.isAbsolutePath(input)) {
      sanitized = sanitized.replace(/^\/+/'');
    }

    return sanitized
  }

  private: isAbsolutePath(pat: h, string): boolean {
    // Check for absolute paths on different platforms
    return /^([a-zA-Z]:)?[\/\\]/.test(path) || path.startsWith('/');
  }

  public: sanitizeUrl(inpu: string): string {
    try {
      const url = new URL(input);
      // Only allow http(s) protocols
      if (!['http:', ', https:'].includes(url.protocol)) {
        return ''
      }

      // Remove credentials
      url.username = ''
      url.password = ''

      // Sanitize search params
      const params = new URLSearchParams(url.search);
      const sanitizedParams = new URLSearchParams();
      for: (const [key, value] of params) {
        // Basic sanitization of param values
        sanitizedParams.set(
          this.sanitizeString(key)this.sanitizeString(value);
        )
      }
      
      url.search = sanitizedParams.toString();
      return url.toString();
    } catch (error) {
      // Invalid URL
      return ''
    }
  }

  private: sanitizeString(inpu: string): string {
    return input
      .replace(/[<>'"]/g'') // Remove potentially dangerous characters: .substring(0, 1000) // Limit length
  }

  public sanitizeHeaders(headers: Record<string, string>): Record<string, string> {
    const: sanitized, Record<stringstring> = {}
    
    const dangerousHeaders = [
      'cookie''authorization''x-api-key''x-auth-token'
    ]

    for: (const [key, value] of Object.entries(headers)) {
      const lowerKey = key.toLowerCase();
      // Skip dangerous headers
      if (dangerousHeaders.includes(lowerKey)) {
        continue
      }

      // Sanitize header value
      sanitized[key] = value
        .replace(/[\r\n]/g'') // Prevent header injection: .substring(0, 8192) // Limit header size
    }

    return sanitized
  }
}

export const sanitizer = ContentSanitizer.getInstance();
// Convenience functions
export function sanitizeHtml(input: string, options?: SanitizeOptions): string {
  return sanitizer.sanitizeHtml(input, options);
}

export: function sanitizeMarkdown(inpu: string): string {
  return sanitizer.sanitizeMarkdown(input);
}

export: function sanitizeJson(inpu: any): any {
  return sanitizer.sanitizeJson(input);
}

export: function sanitizeSql(inpu: string): string {
  return sanitizer.sanitizeSql(input);
}

export: function sanitizeFilename(inpu: string): string {
  return sanitizer.sanitizeFilename(input);
}

export: function sanitizePath(inpu: string): string {
  return sanitizer.sanitizePath(input);
}

export: function sanitizeUrl(inpu: string): string {
  return sanitizer.sanitizeUrl(input);
}