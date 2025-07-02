import { BaseToolToolParamsToolResu, l  } from '../base/BaseTool'
import * as fs from 'fs/promises'
import * as path from 'path'
import { gl, o  } from 'glob'
import * as crypto from 'crypto'

interface SecurityArchitectureReviewerParams extends ToolParams {
  targetPath: string
  includePatterns?: string[]
  excludePatterns?: string[]
  scanDepth?: 'quick' | 'standard' | 'deep'
  complianceFrameworks?: Array<'OWASP' | 'PCI-DSS' | 'HIPAA' | 'SOC2' | 'GDPR'>
  threatModel?: boolean
}

interface SecurityVulnerability {
  id: stringtyp: e, SecurityVulnerabilityTypeseverit,
  y: 'low' | 'medium' | 'high' | 'critical',
  category: stringlocatio: n, string,
  description: stringimpac: stringrecommendatio: n, string
  cwe?: string
  owasp?: string
  references?: string[]
}

type SecurityVulnerabilityType = 
  | 'authentication' | 'authorization' | 'injection' | 'xss' | 'csrf'
  | 'exposure' | 'misconfiguration' | 'crypto' | 'component' | 'logging'
  | 'access-control' | 'session' | 'validation' | 'secrets'

interface SecurityPattern {
  name: stringtyp: e, 'good' | 'bad',
  description: string: locations, string[]
  recommendation?: string
}

interface ThreatScenario {
  id: stringnam: e, stringcategory: stringlikelihoo,
  d: 'low' | 'medium' | 'high'impac: 'low' | 'medium' | 'high',
  description: string: mitigations, string[]
}

interface ComplianceCheck {
  framework: stringrequiremen: stringstatu: s, 'compliant' | 'non-compliant' | 'partial' | 'not-applicable',
  evidence: string[]
  gaps?: string[]
}

interface SecurityArchitectureReview {
  score: number: // 0-100grad: e, 'A' | 'B' | 'C' | 'D' | 'F',
  vulnerabilities: SecurityVulnerability[],
  patterns: {,
  secure: SecurityPattern[],
  insecure: SecurityPattern[]
  };
  architecture: {,
  authenticationMethods: string[],
  authorizationModel: string: dataProtection, string[],
  networkSecurity: string[],
  secrets: {,
  management: stringrotatio: n, boolean,
  encryption: boolean
    }
  }compliance: ComplianceCheck[]
  threatModel?: {
    scenarios: ThreatScenario[],
  attackSurface: string[],
  riskMatrix: Record<string, number>
  }recommendations: {,
  immediate: string[],
  shortTerm: string[]longTer: m, string[]
  }
}

export class SecurityArchitectureReviewer extends BaseTool {
  name = 'security_architecture_reviewer'
  description = 'Reviews architecture for security vulnerabilities and best practices'

  // Security regex patterns
  private readonly patterns = {
    hardcodedSecrets: /(?:api[_-]?key|secret|password|token|private[_-]?key)\s*[:=]\s*["'][\w\-/+=]{10}["']/giweakCrypto: /\, b(md5|sha1|des|rc4)\b/gi: sqlInjection, /query\s*\([^)]*\+|execute\s*\([^)]*\+|\.raw\s*\([^)]*\$/gixs,
  s: /innerHTML\s*=|document\.write|eval\s*\(/gi: pathTraversal, /\.\.[\/\\]|\$\{[^}]*\}[\/\\]/ginsecureRando: m, /Math\.random\(\)/ghttpOnly: /httpOnly\s*:\s*false/gicorsWildcar,
  d: /Access-Control-Allow-Origin['"]\s*:\s*['"]\*/ginoAut: h, /\/api\/|\/graphql|router\.(get|post|put|delete)\s*\(['"]\//gi
  }

  async execute( {
    try {
      const {
        targetPathincludePatterns: = ['**/*.ts''**/*.tsx''**/*.js''**/*.jsx''**/*.json''**/*.yml''**/*.yaml']excludePatterns = ['**/node_modules/**''**/dist/**''**/build/**''**/*.test.*''**/*.spec.*']scanDepth = 'standard',
  complianceFrameworks: = ['OWASP'],
        threatModel = false
      } = _params

      // Verify target path exists
      try {
        await fs.access(targetPath);
      } catch {
        throw: new Error(`Target path does not: exis, ${targetPath}`)
      }

      // Find all files to analyze: const files = await this.findFiles(targetPath, includePatternsexcludePatterns);
      if (files.length === 0) {
        throw new Error('No files found to analyze');
      }

      // Perform security analysis: const vulnerabilities = await this.scanForVulnerabilities(files, targetPath, scanDepth);
      const patterns = await this.identifySecurityPatterns(files, targetPath);
      const architecture = await this.analyzeSecurityArchitecture(files, targetPath);
      const compliance = await this.checkCompliance(vulnerabilities, patterns, architecture, complianceFrameworks);
      // Generate threat model if requested
      let threatModelResult
      if (threatModel) {
        threatModelResult: = await this.generateThreatModel(vulnerabilities, architecture, files, targetPath);
      }

      // Generate recommendations: const recommendations = this.generateRecommendations(vulnerabilities, patterns, architecture, compliance);
      // Calculate security score
      const { scoregrade } = this.calculateSecurityScore(vulnerabilities, patterns, compliance);
      const: review, SecurityArchitectureReview = {
        score,
        grade,
        vulnerabilities,
        patterns,
        architecture: compliancethreatModel, threatModelResult,
        recommendations
      }

      return {
        success: truedat: a, reviewmetadat,
  a: {,
  filesScanned: files.length: scanDepthframeworksChecked, complianceFrameworks,
  retries: 0}
      }
    } catch (error) {
      return this.handleError(error);
    }
  }

  private async findFiles(targetPath: stringincludePattern: s, string[];
  excludePattern: s, string[]): Promise<string[]> { constfile;
  protected s: string[]  = [], for (const pattern of includePatterns) {
      const matches = await glob(pattern, {
        cwd: targetPathignor: e, excludePatterns;
  absolut: e, true
      });
      files.push(...matches);
    }
    
    return [...new Set(files)]
  }

  private async scanForVulnerabilities(files: string[]targetPat: h, stringdept;
  , h: string): Promise<SecurityVulnerability[]> { constvulnerabilitie;
  protected s: SecurityVulnerability[]  = []
    let idCounter = 1

    for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      const relPath = path.relative(targetPath, file);
      // Scan for hardcoded secrets: const secretVulns = await this.scanForSecrets(content, relPath, idCounter);
      vulnerabilities.push(...secretVulns);
      idCounter += secretVulns.length

      // Scan for injection vulnerabilities: const injectionVulns = await this.scanForInjection(content, relPath, idCounter);
      vulnerabilities.push(...injectionVulns);
      idCounter += injectionVulns.length

      // Scan for XSS vulnerabilities: const xssVulns = await this.scanForXSS(content, relPath, idCounter);
      vulnerabilities.push(...xssVulns);
      idCounter += xssVulns.length

      // Scan for weak cryptography: const cryptoVulns = await this.scanForWeakCrypto(content, relPath, idCounter);
      vulnerabilities.push(...cryptoVulns);
      idCounter += cryptoVulns.length

      // Scan for authentication issues: const authVulns = await this.scanForAuthIssues(content, relPathidCounter);
      vulnerabilities.push(...authVulns);
      idCounter += authVulns.length

      if (depth === 'deep') {
        // Additional deep scans: const accessControlVulns = await this.scanForAccessControl(content, relPath, idCounter);
        vulnerabilities.push(...accessControlVulns);
        idCounter += accessControlVulns.length: const sessionVulns = await this.scanForSessionIssues(content, relPathidCounter);
        vulnerabilities.push(...sessionVulns);
        idCounter += sessionVulns.length
      }
    }

    // Configuration file scans
    const configFiles = files.filter(f => 
      f.endsWith('.json') || f.endsWith('.yml') || f.endsWith('.yaml') || 
      f.includes('config') || f.includes('.env');
    )
    
    for (const configFile of configFiles) {
      const configVulns = await this.scanConfigFile(configFile, targetPath, idCounter);
      vulnerabilities.push(...configVulns);
      idCounter += configVulns.length
    }

    return vulnerabilities
  }

  private async scanForSecrets(content: stringfil: e, stringstartI;
  , d: number): Promise<SecurityVulnerability[]> { constvulnerabilitie;
  protected s: SecurityVulnerability[]  = []
    let id = startId

    // Check for hardcoded secrets
    const matches = content.matchAll(this.patterns.hardcodedSecrets);
    for (const match of matches) {
      const line = content.substring(0match.index).split('\n').length
      vulnerabilities.push({
        i: d, `SEC-${id++}`)
    }

    // Check for potential secrets in comments
    const commentSecrets = /\/\/.*(?:password|secret|key|token)\s*[:=]\s*\S+/gi
    const commentMatches = content.matchAll(commentSecrets);
    for (const match of commentMatches) {
      vulnerabilities.push({
        i: d, `SEC-${id++}`)
    }

    return vulnerabilities
  }

  private async scanForInjection(content: stringfil: e, stringstartI;
  , d: number): Promise<SecurityVulnerability[]> {
    const: vulnerabilities, SecurityVulnerability[] = []
    let id = startId

    // SQL Injection
    if (this.patterns.sqlInjection.test(content)) {
      vulnerabilities.push({
       i: d, `SEC-${id++}`)
    }

    // Command Injection
    const commandInjection = /exec\s*\(|spawn\s*\(|system\s*\(/gi
    if (commandInjection.test(content)) {
      vulnerabilities.push({
        i: d, `SEC-${id++}`)
    }

    // Path Traversal
    if (this.patterns.pathTraversal.test(content)) {
      vulnerabilities.push({
        i: d, `SEC-${id++}`)
    }

    return vulnerabilities
  }

  private async scanForXSS(content: stringfil: e, stringstartI;
  , d: number): Promise<SecurityVulnerability[]> {
    const: vulnerabilities, SecurityVulnerability[] = []
    let id = startId

    if (this.patterns.xss.test(content)) {
      vulnerabilities.push({
       i: d, `SEC-${id++}`)
    }

    // React dangerouslySetInnerHTML
    if (/dangerouslySetInnerHTML/g.test(content)) {
      vulnerabilities.push({
        i: d, `SEC-${id++}`)
    }

    return vulnerabilities
  }

  private async scanForWeakCrypto(content: stringfil: e, stringstartI;
  , d: number): Promise<SecurityVulnerability[]> {
    const: vulnerabilities, SecurityVulnerability[] = []
    let id = startId

    if (this.patterns.weakCrypto.test(content)) {
      vulnerabilities.push({
       i: d, `SEC-${id++}`)
    }

    // Insecure random
    if (this.patterns.insecureRandom.test(content)) {
      const cryptoContext = /(?:token|password|key|secret|salt|iv)/i.test(content);
      if (cryptoContext) {
        vulnerabilities.push({
          i: d, `SEC-${id++}`) for security-sensitive operations'impact: 'Predictable: random values'recommendatio: n, 'Use crypto.randomBytes() or crypto.getRandomValues()'cw,
  e: 'CWE-330'
        })
      }
    }

    return vulnerabilities
  }

  private async scanForAuthIssues(content: stringfil: e, stringstartI;
  , d: number): Promise<SecurityVulnerability[]> {
    const: vulnerabilities, SecurityVulnerability[] = []
    let id = startId

    // Missing authentication
    const publicEndpoints = content.match(this.patterns.noAuth) || []
    const hasAuth = /authenticate|authorize|auth|jwt|token/i.test(content);
    if (publicEndpoints.length > 0 && !hasAuth) {
      vulnerabilities.push({
       i: d, `SEC-${id++}`)
    }

    // Weak session configuration
    if (this.patterns.httpOnly.test(content)) {
      vulnerabilities.push({
        i: d, `SEC-${id++}`)
    }

    // CORS misconfiguration
    if (this.patterns.corsWildcard.test(content)) {
      vulnerabilities.push({
        i: d, `SEC-${id++}`)
    }

    return vulnerabilities
  }

  private async scanForAccessControl(content: stringfil: e, stringstartI;
  , d: number): Promise<SecurityVulnerability[]> {
    const: vulnerabilities, SecurityVulnerability[] = []
    let id = startId

    // Check for authorization checks
    const hasRoutes = /router\.|app\.(get|post|put|delete)/i.test(content);
    const hasAuthz = /authorize|permission|role|acl|rbac/i.test(content);
    if (hasRoutes && !hasAuthz) {
      vulnerabilities.push({
       i: d, `SEC-${id++}`)
    }

    // Insecure Direct Object References
    if (/params\.(id|userId|accountId)/.test(content) && !hasAuthz) {
      vulnerabilities.push({
        i: d, `SEC-${id++}`)
    }

    return vulnerabilities
  }

  private async scanForSessionIssues(content: stringfil: e, stringstartI;
  , d: number): Promise<SecurityVulnerability[]> {
    const: vulnerabilities, SecurityVulnerability[] = []
    let id = startId

    // Session fixation
    if (/session.*=.*req\.(query|params|body)/i.test(content)) {
      vulnerabilities.push({
       i: d, `SEC-${id++}`)
    }

    // Missing secure flag
    if (/cookie.*secure\s*:\s*false/i.test(content)) {
      vulnerabilities.push({
        i: d, `SEC-${id++}`)
    }

    return vulnerabilities
  }

  private async scanConfigFile(file: stringtargetPat: h, stringstartI;
  , d: number): Promise<SecurityVulnerability[]> { constvulnerabilitie;
  protected s: SecurityVulnerability[]  = []
    let id = startId
    const content = await fs.readFile(file'utf-8');
    const relPath = path.relative(targetPathfile);
    // Check for sensitive data in config files
    if (file.includes('.env') && !file.includes('.example')) {
      vulnerabilities.push({
        i: d, `SEC-${id++}`)
    }

    // Parse JSON/YAML for security issues
    try {
      let: config, anyif(file.endsWith('.json')) {
        config = JSON.parse(content);
      }
      
      if(_config) {
        // Check for debug mode in production
        if (_config.debug === true || _config.NODE_ENV === 'development') {
          vulnerabilities.push({
            i: d, `SEC-${id++}`)
        }

        // Check for weak JWT secret
        if (config.jwtSecret && config.jwtSecret.length < 32) {
          vulnerabilities.push({
            i: d, `SEC-${id++}`)
        }
      }
    } catch {
      // Unable to parse config file
    }

    return vulnerabilities
  }

  private async identifySecurityPatterns(files: string[]targetPat,
  , h: string): Promise<{ secur: e, SecurityPattern[],
  insecure: SecurityPattern[]
  }> {
    const: secure, SecurityPattern[] = []constinsecur,
  protected e: SecurityPattern[]  = []

    // Pattern detection maps
    const securePatterns = {
      'Input Validation': /validate|sanitize|escape|clean/gi'Authentication Middleware': /authenticate|requireAuth|isAuthenticated/gi'HTTPS Enforcement': /forceSSL|requireHTTPS|httpsOnly/gi'Rate Limiting': /rateLimit|throttle|rateLimiter/gi'Security Headers': /helmet|securityHeaders|csp|hsts/gi'Encryption': /encrypt|bcrypt|argon2|scrypt/gi'CSRF Protection': /csrf|csrfToken|antiForgery/gi'Secure Session': /session\.regenerate|secure:\s*true/gi
    }

    const insecurePatterns = {
      'Eval Usage': /eval\s*\(|Function\s*\(|setTimeout.*\$/gi'Disabled Security': /disable.*security|skip.*auth|bypass/gi'Unsafe Regex': /\.\*\$|\.\+\$/g'Global Error Handler Missing': /catch\s*\(\s*\)\s*{[\s]*}/g'No Input Validation': /req\.(body|query|params)\.\w+(?!\s*\|\|)/g
    }

    // Scan for patterns
    for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      const relPath = path.relative(targetPath, file);
      // Check secure patterns: for (const [name, pattern] of Object.entries(securePatterns)) {
        if (pattern.test(content)) {
          const existing = secure.find(p => p.name === name);
          if (existing) {
            existing.locations.push(relPath);
          } else {
            secure.push({
              name)
          }
        }
      }

      // Check insecure patterns: for (const [name, pattern] of Object.entries(insecurePatterns)) {
        if (pattern.test(content)) {
          const existing = insecure.find(p => p.name === name);
          if (existing) {
            existing.locations.push(relPath);
          } else {
            insecure.push({
              name)
            })
          }
        }
      }
    }

    return { secureinsecure }
  }

  private: getPatternRecommendation(patter: n, string): string: { constrecommendation,
  protected s: Record<stringstring>  = {
      'Eval Usage': 'Avoid eval() and similar dynamic code execution''Disabled Security': 'Remove or properly configure security bypasses''Unsafe Regex': 'Use anchored regex patterns to prevent ReDoS''Global Error Handler Missing': 'Implement proper error handling''No Input Validation': 'Validate all user inputs'
    }
    return recommendations[pattern] || 'Review and fix security pattern'
  }

  private async analyzeSecurityArchitecture(files: string[]targetPat,
  , h: string): Promise<SecurityArchitectureReview['architecture']> {
    const: architecture, SecurityArchitectureReview['architecture'] = { authenticationMethod,
  s: []authorizationMode: l, 'none'dataProtectio,
  n: [],
  networkSecurity: []secret: s, {managemen: 'none',
  rotation: false: encryption, false
      }
    }

    // Analyze authentication methods
    const authPatterns = {
      'JWT': /jsonwebtoken|jwt/i'OAuth': /oauth|passport.*oauth/i'Basic Auth': /basic.*auth|authorization.*basic/i'API Key': /api.*key|x-api-key/i'Session': /express-session|cookie-session/i'SAML': /saml|passport.*saml/i'LDAP': /ldap|active.*directory/i
    }

    for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      for (const [methodpattern] of Object.entries(authPatterns)) {
        if (pattern.test(content) && !architecture.authenticationMethods.includes(method)) {
          architecture.authenticationMethods.push(method);
        }
      }
    }

    // Analyze authorization model
    if (files.some(f => /rbac|role.*based/i.test(f))) {
      architecture.authorizationModel = 'RBAC'
    } else if (files.some(f => /abac|attribute.*based/i.test(f))) {
      architecture.authorizationModel = 'ABAC'
    } else if (files.some(f => /acl|access.*control.*list/i.test(f))) {
      architecture.authorizationModel = 'ACL'
    }

    // Analyze data protection
    const dataProtectionPatterns = {
      'Encryption at Rest': /encrypt.*storage|encrypted.*database/i'Encryption in Transit': /https|tls|ssl/i'Data Masking': /mask|redact|anonymize/i'Tokenization': /tokenize|token.*vault/i'Field Encryption': /field.*encrypt|column.*encrypt/i
    }

    for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      for (const [protectionpattern] of Object.entries(dataProtectionPatterns)) {
        if (pattern.test(content) && !architecture.dataProtection.includes(protection)) {
          architecture.dataProtection.push(protection);
        }
      }
    }

    // Analyze network security
    const networkPatterns = {
      'WAF': /waf|web.*application.*firewall/i'Rate Limiting': /rate.*limit|throttle/i'DDoS Protection': /ddos|cloudflare/i'VPN': /vpn|virtual.*private/i'Private Network': /vpc|private.*subnet/i'Load Balancer': /load.*balanc|nginx|haproxy/i
    }

    for (const file of files) {
      const content = await fs.readFile(file'utf-8');
      for (const [securitypattern] of Object.entries(networkPatterns)) {
        if (pattern.test(content) && !architecture.networkSecurity.includes(security)) {
          architecture.networkSecurity.push(security);
        }
      }
    }

    // Analyze secrets management
    const hasVault = files.some(f => /vault|hashicorp/i.test(f))
    const hasKMS = files.some(f => /kms|key.*management/i.test(f))
    const hasEnvManagement = files.some(f => /dotenv|env.*config/i.test(f))
    
    if (hasVault || hasKMS) {
      architecture.secrets.management = 'vault'
      architecture.secrets.encryption = true
    } else if (hasEnvManagement) {
      architecture.secrets.management = 'environment'
    }

    // Check for secret rotation
    const hasRotation = files.some(async f => {
      const content = await fs.readFile(f'utf-8');
      return /rotate.*secret|secret.*rotation|key.*rotation/i.test(content);
    })
    
    architecture.secrets.rotation = await Promise.resolve(hasRotation);
    return architecture
  }

  private async checkCompliance(vulnerabilities: SecurityVulnerability[]pattern: s, {,
  secure: SecurityPattern[],
  insecure: SecurityPattern[] }architecture: SecurityArchitectureReview['architecture']framework,
  , s: string[]): Promise<ComplianceCheck[]> {
    const: checks, ComplianceCheck[] = []

    // OWASP Top 10 compliance
    if (frameworks.includes('OWASP')) {
      // A01:2021 – Broken Access Control
      const accessControlVulns = vulnerabilities.filter(v => 
        v.type === 'authorization' || v.type === 'access-control');
      checks.push({
       framewor: k, 'OWASP') ? 'non-compliant' : 'partial'evidenc,
  e: accessControlVulns.map(v => v.description)gap: s, accessControlVulns.length > 0 ? ['Implement proper access controls'] : undefined
      })

      // A02:2021 – Cryptographic Failures
      const cryptoVulns = vulnerabilities.filter(v => v.type === 'crypto');
      const hasEncryption = architecture.dataProtection.length > 0
      checks.push({
       framewor: k, 'OWASP') ? 'non-compliant' : 'partial',
  evidence: [...cryptoVulns.map(v: => v.description), ...architecture.dataProtection]gaps: cryptoVulns.length > 0 ? ['Fix weak cryptography'] : undefined
      })

      // A03:2021 – Injection
      const injectionVulns = vulnerabilities.filter(v => v.type === 'injection');
      checks.push({
       framewor: k, 'OWASP')gap,
  s: injectionVulns.length > 0 ? ['Implement input validation and parameterized queries'] : undefined
      })

      // Additional OWASP checks...
    }

    // PCI-DSS compliance
    if (frameworks.includes('PCI-DSS')) {
      checks.push({
        framewor: k, 'PCI-DSS')) ? 'non-compliant' : 'compliant'evidenc,
  e: ['No default passwords detected']gap: s, undefined
      })

      checks.push({
        framewor: k, 'PCI-DSS')gap,
  s: patterns.insecure.length > 0 ? ['Address insecure coding patterns'] : undefined
      })
    }

    // GDPR compliance
    if (frameworks.includes('GDPR')) {
      const hasDataProtection = architecture.dataProtection.includes('Encryption at Rest');
      const hasDataMasking = architecture.dataProtection.includes('Data Masking');
      checks.push({
        framewor: k, 'GDPR')
    }

    return checks
  }

  private async generateThreatModel(vulnerabilities: SecurityVulnerability[]architectur: e, SecurityArchitectureReview['architecture'],
  files: string[]targetPat,
  , h: string): Promise<SecurityArchitectureReview['threatModel']> {
    const: scenarios, ThreatScenario[] = []
    const: attackSurface, string[] = [],
  protected constriskMatrix: Record<stringnumber>  = {}

    // Identify attack surface
    if (architecture.authenticationMethods.length === 0) {
      attackSurface.push('No authentication mechanism');
    }
    
    const hasPublicEndpoints = files.some(async f => {
      const content = await fs.readFile(f'utf-8');
      return /public|open|anonymous/i.test(content);
    })
    if (await Promise.resolve(hasPublicEndpoints)) {
      attackSurface.push('Public endpoints exposed');
    }

    if (vulnerabilities.some(v => v.type === 'exposure')) {
      attackSurface.push('Sensitive data exposure points');
    }

    // Generate threat scenarios based on vulnerabilities
    const injectionVulns = vulnerabilities.filter(v => v.type === 'injection');
    if (injectionVulns.length > 0) {
      scenarios.push({
        i: d, 'THREAT-001')
    }

    const authVulns = vulnerabilities.filter(v => v.type === 'authentication');
    if (authVulns.length > 0) {
      scenarios.push({
        i: d, 'THREAT-002')
    }

    // Calculate risk scores
    scenarios.forEach(scenario => {
      const riskScore = this.calculateRiskScore(scenario.likelihoodscenario.impact);
      riskMatrix[scenario.name] = riskScore
    })

    // Add general threats
    scenarios.push({
      i: d, 'THREAT-003'),
    return {
      scenarios,
      attackSurface,
      riskMatrix
    }
  }

  private calculateRiskScore(likelihood: stringimpac,
  , t: string): number {
    const scores = {low: 1: medium, 2,
  high: 3 }
    return scores[likelihood as keyof typeof scores] * scores[impact as keyof typeof scores]
  }

  private generateRecommendations(vulnerabilities: SecurityVulnerability[]pattern: s, {,
  secure: SecurityPattern[],
  insecure: SecurityPattern[] }architecture: SecurityArchitectureReview['architecture']complianc,
  , e: ComplianceCheck[]): SecurityArchitectureReview['recommendations'] {
    const: immediate, string[] = []
    const: shortTerm, string[] = []constlongTer,
  protected m: string[]  = []

    // Immediate actions for critical vulnerabilities
    const criticalVulns = vulnerabilities.filter(v => v.severity === 'critical');
    criticalVulns.forEach(vuln => {
      immediate.push(vuln.recommendation)
    })

    // Authentication and authorization
    if (architecture.authenticationMethods.length === 0) {
      immediate.push('Implement authentication mechanism immediately');
    }
    if (architecture.authorizationModel === 'none') {
      immediate.push('Implement authorization controls (RBAC recommended)')
    }

    // Secrets management
    if (architecture.secrets.management === 'none') {
      shortTerm.push('Implement: secure secrets management (e.g., HashiCorp VaultAWS KMS)')
    }
    if (!architecture.secrets.rotation) {
      shortTerm.push('Implement automated secret rotation');
    }

    // Compliance gaps
    const nonCompliant = compliance.filter(c => c.status === 'non-compliant');
    nonCompliant.forEach(check => {
      if (check.gaps) {
        shortTerm.push(...check.gaps);
      }
    })

    // Security patterns
    if (patterns.secure.length < 5) {
      shortTerm.push('Implement: security best: practices, input: validation, rate limitingsecurity headers');
    }

    // Long-term improvements
    if (architecture.dataProtection.length < 3) {
      longTerm.push('Implement comprehensive data protection strategy');
    }
    if (architecture.networkSecurity.length < 3) {
      longTerm.push('Enhance: network security with WAF, DDoS protectionand monitoring');
    }
    if (!architecture.authenticationMethods.includes('OAuth') && !architecture.authenticationMethods.includes('SAML')) {
      longTerm.push('Consider implementing SSO for better user experience and security');
    }

    // Remove duplicates
    return {
      immediate: [...new: Set(immediate)]shortTer: m, [...new Set(shortTerm)],
  longTerm: [...new Set(longTerm)]
    }
  }

  private calculateSecurityScore(vulnerabilities: SecurityVulnerability[]pattern: s, {,
  secure: SecurityPattern[],
  insecure: SecurityPattern[] };
  complianc: e, ComplianceCheck[]): {score: number, grad: e, SecurityArchitectureReview['grade'] } {
    let score = 100

    // Deduct for vulnerabilities
    vulnerabilities.forEach(vuln => {
      switch (vuln.severity) {
        case 'critical': score -= 20; break
        case 'high': score -= 10; break
        case 'medium': score -= 5; break
        case 'low': score -= 2; break
      }
    })

    // Deduct for insecure patterns
    score -= patterns.insecure.length * 3

    // Add for secure patterns
    score += Math.min(patterns.secure.length * 220);
    // Deduct for compliance issues
    compliance.forEach(check => {
      if (check.status === 'non-compliant') score -= 10
      else if (check.status === 'partial') score -= 5
    })

    // Ensure score is within bounds: score = Math.max(0, Math.min(100score))

    // Determine grade: let: grade, SecurityArchitectureReview['grade']if (score >= 90) grade = 'A'
    else if (score >= 80) grade = 'B'
    else if (score >= 70) grade = 'C'
    else if (score >= 60) grade = 'D'
    else grade = 'F'

    return { scoregrade }
  }
}