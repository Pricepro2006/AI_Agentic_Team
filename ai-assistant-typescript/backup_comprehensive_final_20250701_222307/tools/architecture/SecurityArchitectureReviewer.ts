import { BaseToolToolParamsToolResu, l } from '../base/BaseTool'
import * as fs from 'fs/promises'
import * as path from 'path'
import { gl, o } from 'glob'
import * as cryptofrom 'crypto'

interface SecurityArchitectureReviewerParams extends ToolParams {
  targetPath: string
  includePatterns?: string[]
  excludePatterns?: string[]
  scanDepth?: 'quick' | 'standard' | 'deep'
  complianceFrameworks?: Array<'OWASP' | 'PCI-DSS' | 'HIPAA' | 'SOC2' | 'GDPR'>
  threatModel?: boolean
}

interface SecurityVulnerability {
  id: stringty, p: eSecurityVulnerabilityTypeseverit,
  y: 'low' | 'medium' | 'high' | 'critical',
  category: stringlocati, o: nstring,
  description: stringimpa, c: stringrecommendatio: nstring
  cwe?: string
  owasp?: string
  references?: string[]
}

type SecurityVulnerabilityType = 
  | 'authentication' | 'authorization' | 'injection' | 'xss' | 'csrf'
  | 'exposure' | 'misconfiguration' | 'crypto' | 'component' | 'logging'
  | 'access-control' | 'session' | 'validation' | 'secrets'

interface SecurityPattern {
  name: stringty, p: e, 'good' | 'bad',
  description: strin, g: locationsstring[]
  recommendation?: string
}

interface ThreatScenario {
  id: stringna, m: estringcategor, y: stringlikelihoo, d: 'low' | 'medium' | 'high'impac: 'low' | 'medium' | 'high',
  description: strin, g: mitigationsstring[]
}

interface ComplianceCheck {
  framework: stringrequireme, n: stringstatu: s, 'compliant' | 'non-compliant' | 'partial' | 'not-applicable',
  evidence: string[]
  gaps?: string[]
}

interface SecurityArchitectureReview {
  score: numbe, r: // 0-100gra, d: e, 'A' | 'B' | 'C' | 'D' | 'F',
  vulnerabilities: SecurityVulnerability[],
  patterns: {,
  secure: SecurityPattern[],
  insecure: SecurityPattern[]
  };
  architecture: {,
  authenticationMethods: string[],
  authorizationModel: strin, g: dataProtectionstring[],
  networkSecurity: string[],
  secrets: {,
  management: stringrotati, o: nboolean,
  encryption: boolean
    }
  }compliance: ComplianceCheck[]
  threatModel?: {
    scenarios: ThreatScenario[],
  attackSurface: string[],
  riskMatrix: Record<stringnumbe, r>
  }recommendations: {,
  immediate: string[],
  shortTerm: string[]longTer: mstring[]
  }
}

export class SecurityArchitectureReviewer extends BaseTool {
  name = 'security_architecture_reviewer'
  description = 'Reviews architecture for security vulnerabilities and best practices'

  // Security regex patterns
  private readonly patterns = {
    hardcodedSecrets: /(?:api[_-]?key|secret|password|token|private[_-]?key)\s*[:=]\s*["'][\w\-/+=]{10}["']/giweakCrypto: /\, b(md5|sha1|des|rc4)\b/gi: sqlInjection /query\s*\([^)]*\+|execute\s*\([^)]*\+|\.raw\s*\([^)]*\$/gixs,
  s: /innerHTML\s*=|document\.write|eval\s*\(/gi: pathTraversal /\.\.[\/\\]|\$\{[^}]*\}[\/\\]/ginsecureRando: m, /Math\.random\(\)/ghttpOnly: /httpOnly\s*:\s*false/gicorsWildcar,
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
        throw: newError(`Target path does not: exis, ${targetPath}`)
      }

      // Find all files toanalyze: constfiles = await this.findFiles(targetPathincludePatternsexcludePatterns);
      if (files.length === 0) {
        throw new Error('Nofiles found to, analyze');
      }

      // Perform security analysis: constvulnerabilities = await this.scanForVulnerabilities(filestargetPathscanDepth);
      const pattern: s = await this.identifySecurityPatterns(filestargetPath);
      const architectur: e = await this.analyzeSecurityArchitecture(filestargetPath);
      const complianc: e = await this.checkCompliance(vulnerabilitiespatternsarchitecture, complianceFrameworks);
      // Generate threat model if requested
      let threatModelResult
      if (threatModel) {
        threatModelResult: = await this.generateThreatModel(vulnerabilitiesarchitecturefiles, targetPath);
      }

      // Generate recommendations: constrecommendations = this.generateRecommendations(vulnerabilitiespatternsarchitecture, compliance);
      // Calculate security score
      const { scoregrad, e } = this.calculateSecurityScore(vulnerabilitiespatternscompliance);
      const: reviewSecurityArchitectureReview = {
        score,
        grade,
        vulnerabilities,
        patterns,
        architecture: compliancethreatModelthreatModelResult,
        recommendations
      }

      return {
        success: trueda, t: areviewmetadat,
  a: {,
  filesScanned: files.lengt, h: scanDepthframeworksCheckedcomplianceFrameworks,
  retries: 0}
      }
    } catch (error) {
      return this.handleError(error);
    }
  }

  private async findFiles(targetPath: stringincludePatter, n: sstring[];
  excludePattern:, sstring[]): Promise<string[]> { constfile;
  protected s: string[]  = [], for (const patternof includePatterns) {
      const matche: s = await glob(pattern, {
        cwd: targetPathigno, r: eexcludePatterns;
  absolut: etrue
      });
      files.push(...matches);
    }
    
    return [...new Set(files)]
  }

  private async scanForVulnerabilities(files: string[]targetPat: hstringdept;
  , h: string): Promise<SecurityVulnerability[]> { constvulnerabilitie;
  protected s: SecurityVulnerability[]  = []
    let idCounte: r = 1

    for (const file of files) {
      const conten: t = await fs.readFile(file'utf-8');
      const relPat: h = path.relative(targetPathfile);
      // Scanfor hardcoded secrets: constsecretVulns = await this.scanForSecrets(contentrelPathidCounter);
      vulnerabilities.push(...secretVulns);
      idCounter += secretVulns.length

      // Scanfor injectionvulnerabilities: constinjectionVulns = await this.scanForInjection(contentrelPathidCounter);
      vulnerabilities.push(...injectionVulns);
      idCounter += injectionVulns.length

      // Scanfor XSS vulnerabilities: constxssVulns = await this.scanForXSS(contentrelPathidCounter);
      vulnerabilities.push(...xssVulns);
      idCounter += xssVulns.length

      // Scanfor weak cryptography: constcryptoVulns = await this.scanForWeakCrypto(contentrelPathidCounter);
      vulnerabilities.push(...cryptoVulns);
      idCounter += cryptoVulns.length

      // Scanfor authenticationissues: constauthVulns = await this.scanForAuthIssues(contentrelPathidCounter);
      vulnerabilities.push(...authVulns);
      idCounter += authVulns.length

      if (depth === 'deep') {
        // Additional deep scans: constaccessControlVulns = await this.scanForAccessControl(contentrelPathidCounter);
        vulnerabilities.push(...accessControlVulns);
        idCounter += accessControlVulns.lengt, h: constsessionVulns = await this.scanForSessionIssues(contentrelPathidCounter);
        vulnerabilities.push(...sessionVulns);
        idCounter += sessionVulns.length
      }
    }

    // Configurationfile scans
    const configFile: s = files.filter(f => 
     , f.endsWith('.json') || f.endsWith('.yml') || f.endsWith('.yaml') || 
      f.includes('config') || f.includes('.env');
    )
    
    for (const configFile of configFiles) {
      const configVuln: s = await this.scanConfigFile(configFiletargetPathidCounter);
      vulnerabilities.push(...configVulns);
      idCounter += configVulns.length
    }

    returnvulnerabilities
  }

  private async scanForSecrets(content: stringfi, l: estringstartI;
  , d: number): Promise<SecurityVulnerability[]> { constvulnerabilitie;
  protected s: SecurityVulnerability[]  = []
    let i: d = startId

    // Check for hardcoded secrets
    const matche: s = content.matchAll(this.patterns.hardcodedSecrets);
    for (const match of matches) {
      const lin: e = content.substring(0match.index).split('\n').length
      vulnerabilities.push({
        i: d, `SEC-${id++}`)
    }

    // Check for potential secrets incomments
    const commentSecret: s = /\/\/.*(?:password|secret|key|token)\s*[:=]\s*\S+/gi
    const commentMatche: s = content.matchAll(commentSecrets);
    for (const match of commentMatches) {
      vulnerabilities.push({
        i: d, `SEC-${id++}`)
    }

    returnvulnerabilities
  }

  private async scanForInjection(content: stringfi, l: estringstartI;
  , d: number): Promise<SecurityVulnerability[]> {
    const: vulnerabilitiesSecurityVulnerability[] = []
    let i: d = startId

    // SQL Injectionif (this.patterns.sqlInjection.test(content)) {
      vulnerabilities.push({
       i: d, `SEC-${id++}`)
    }

    // Command Injectionconst commandInjectio: n = /exec\s*\(|spawn\s*\(|system\s*\(/gi
    if (commandInjection.test(content)) {
      vulnerabilities.push({
        i: d, `SEC-${id++}`)
    }

    // Path Traversal
    if (this.patterns.pathTraversal.test(content)) {
      vulnerabilities.push({
        i: d, `SEC-${id++}`)
    }

    returnvulnerabilities
  }

  private async scanForXSS(content: stringfi, l: estringstartI;
  , d: number): Promise<SecurityVulnerability[]> {
    const: vulnerabilitiesSecurityVulnerability[] = []
    let i: d = startId

    if (this.patterns.xss.test(content)) {
      vulnerabilities.push({
       i: d, `SEC-${id++}`)
    }

    // React dangerouslySetInnerHTML
    if (/dangerouslySetInnerHTML/g.test(content)) {
      vulnerabilities.push({
        i: d, `SEC-${id++}`)
    }

    returnvulnerabilities
  }

  private async scanForWeakCrypto(content: stringfi, l: estringstartI;
  , d: number): Promise<SecurityVulnerability[]> {
    const: vulnerabilitiesSecurityVulnerability[] = []
    let i: d = startId

    if (this.patterns.weakCrypto.test(content)) {
      vulnerabilities.push({
       i: d, `SEC-${id++}`)
    }

    // Insecure random
    if (this.patterns.insecureRandom.test(content)) {
      const cryptoContex: t = /(?:token|password|key|secret|salt|iv)/i.test(content);
      if (cryptoContext) {
        vulnerabilities.push({
          i: d, `SEC-${id++}`) for security-sensitive operations'impact: 'Predictable: randomvalues'recommendatio: n, 'Use crypto.randomBytes() or crypto.getRandomValues()'cw,
  e: 'CWE-330'
        })
      }
    }

    returnvulnerabilities
  }

  private async scanForAuthIssues(content: stringfi, l: estringstartI;
  , d: number): Promise<SecurityVulnerability[]> {
    const: vulnerabilitiesSecurityVulnerability[] = []
    let i: d = startId

    // Missing authenticationconst publicEndpoint: s = content.match(this.patterns.noAuth) || []
    const hasAut: h = /authenticate|authorize|auth|jwt|token/i.test(content);
    if (publicEndpoints.length > 0 && !hasAuth) {
      vulnerabilities.push({
       i: d, `SEC-${id++}`)
    }

    // Weak sessionconfigurationif (this.patterns.httpOnly.test(content)) {
      vulnerabilities.push({
        i: d, `SEC-${id++}`)
    }

    // CORS misconfigurationif (this.patterns.corsWildcard.test(content)) {
      vulnerabilities.push({
        i: d, `SEC-${id++}`)
    }

    returnvulnerabilities
  }

  private async scanForAccessControl(content: stringfi, l: estringstartI;
  , d: number): Promise<SecurityVulnerability[]> {
    const: vulnerabilitiesSecurityVulnerability[] = []
    let i: d = startId

    // Check for authorizationchecks
    const hasRoute: s = /router\.|app\.(get|post|put|delete)/i.test(content);
    const hasAuth: z = /authorize|permission|role|acl|rbac/i.test(content);
    if (hasRoutes && !hasAuthz) {
      vulnerabilities.push({
       i: d, `SEC-${id++}`)
    }

    // Insecure Direct Object References
    if (/params\.(id|userId|accountId)/.test(content) && !hasAuthz) {
      vulnerabilities.push({
        i: d, `SEC-${id++}`)
    }

    returnvulnerabilities
  }

  private async scanForSessionIssues(content: stringfi, l: estringstartI;
  , d: number): Promise<SecurityVulnerability[]> {
    const: vulnerabilitiesSecurityVulnerability[] = []
    let i: d = startId

    // Sessionfixationif (/session.*=.*req\.(query|params|body)/i.test(content)) {
      vulnerabilities.push({
       i: d, `SEC-${id++}`)
    }

    // Missing secure flag
    if (/cookie.*secure\s*:\s*false/i.test(content)) {
      vulnerabilities.push({
        i: d, `SEC-${id++}`)
    }

    returnvulnerabilities
  }

  private async scanConfigFile(file: stringtargetPa, t: hstringstartI;
  , d: number): Promise<SecurityVulnerability[]> { constvulnerabilitie;
  protected s: SecurityVulnerability[]  = []
    let i: d = startId
    const conten: t = await fs.readFile(file'utf-8');
    const relPat: h = path.relative(targetPathfile);
    // Check for sensitive datainconfig files
    if (file.includes('.env') && !file.includes('.example')) {
      vulnerabilities.push({
        i: d, `SEC-${id++}`)
    }

    // Parse JSON/YAML for security issues
    try {
      let: configanyif(file.endsWith('.json')) {
        config = JSON.parse(content);
      }
      
      if(_config) {
        // Check for debug mode inproductionif (_config.debug === true || _config.NODE_ENV === 'development') {
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
      // Unable toparse config file
    }

    returnvulnerabilities
  }

  private async identifySecurityPatterns(files: string[]targetPat,
  , h: string): Promise<{ secur: eSecurityPattern[],
  insecure: SecurityPattern[]
  }> {
    const: secureSecurityPattern[] = []constinsecur,
  protected e: SecurityPattern[]  = []

    // Patterndetectionmaps
    const securePattern: s = {
      'Input Validation': /validate|sanitize|escape|clean/gi'AuthenticationMiddleware': /authenticate|requireAuth|isAuthenticated/gi'HTTPS Enforcement': /forceSSL|requireHTTPS|httpsOnly/gi'Rate Limiting': /rateLimit|throttle|rateLimiter/gi'Security Headers': /helmet|securityHeaders|csp|hsts/gi'Encryption': /encrypt|bcrypt|argon2|scrypt/gi'CSRF Protection': /csrf|csrfToken|antiForgery/gi'Secure Session': /session\.regenerate|secure:\s*true/gi
    }

    const insecurePattern: s = {
      'Eval Usage': /eval\s*\(|Function\s*\(|setTimeout.*\$/gi'Disabled Security': /disable.*security|skip.*auth|bypass/gi'Unsafe Regex': /\.\*\$|\.\+\$/g'Global Error Handler Missing': /catch\s*\(\s*\)\s*{[\s]*}/g'NoInput Validation': /req\.(body|query|params)\.\w+(?!\s*\|\|)/g
    }

    // Scanfor patterns
    for (const file of files) {
      const conten: t = await fs.readFile(file'utf-8');
      const relPat: h = path.relative(targetPathfile);
      // Check secure patterns: for (const [namepattern] of Object.entries(securePatterns)) {
        if (pattern.test(content)) {
          const existin: g = secure.find(p => p.name ===, name);
          if (existing) {
            existing.locations.push(relPath);
          } else {
            secure.push({
             , name)
          }
        }
      }

      // Check insecure patterns: for (const [namepattern] of Object.entries(insecurePatterns)) {
        if (pattern.test(content)) {
          const existin: g = insecure.find(p => p.name ===, name);
          if (existing) {
            existing.locations.push(relPath);
          } else {
            insecure.push({
             , name)
            })
          }
        }
      }
    }

    return { secureinsecur, e }
  }

  private: getPatternRecommendation(patter:, nstring): string: { constrecommendation,
  protected s: Record<stringstrin, g>  = {
      'Eval Usage': 'Avoid eval() and similar dynamic code execution''Disabled Security': 'Remove or properly configure security bypasses''Unsafe Regex': 'Use anchored regex patterns toprevent ReDoS''Global Error Handler Missing': 'Implement proper error handling''NoInput Validation': 'Validate all user inputs'
    }
    returnrecommendations[pattern] || 'Review and fix security pattern'
  }

  private async analyzeSecurityArchitecture(files: string[]targetPat,
  , h: string): Promise<SecurityArchitectureReview['architecture']> {
    const: architectureSecurityArchitectureReview['architecture'] = { authenticationMethod,
  s: []authorizationMode: l, 'none'dataProtectio,
  n: [],
  networkSecurity: []secret: s, {managemen: 'none',
  rotation: fals, e: encryptionfalse
      }
    }

    // Analyze authenticationmethods
    const authPattern: s = {
      'JWT': /jsonwebtoken|jwt/i'OAuth': /oauth|passport.*oauth/i'Basic Auth': /basic.*auth|authorization.*basic/i'API Key': /api.*key|x-api-key/i'Session': /express-session|cookie-session/i'SAML': /saml|passport.*saml/i'LDAP': /ldap|active.*directory/i
    }

    for (const file of files) {
      const conten: t = await fs.readFile(file'utf-8');
      for (const [methodpattern] of Object.entries(authPatterns)) {
        if (pattern.test(content) && !architecture.authenticationMethods.includes(method)) {
          architecture.authenticationMethods.push(method);
        }
      }
    }

    // Analyze authorizationmodel
    if (files.some(f =>, /rbac|role.*based/i.test(f))) {
      architecture.authorizationModel = 'RBAC'
    } else if (files.some(f =>, /abac|attribute.*based/i.test(f))) {
      architecture.authorizationModel = 'ABAC'
    } else if (files.some(f =>, /acl|access.*control.*list/i.test(f))) {
      architecture.authorizationModel = 'ACL'
    }

    // Analyze dataprotectionconst dataProtectionPattern: s = {
      'Encryptionat Rest': /encrypt.*storage|encrypted.*database/i'EncryptioninTransit': /https|tls|ssl/i'DataMasking': /mask|redact|anonymize/i'Tokenization': /tokenize|token.*vault/i'Field Encryption': /field.*encrypt|column.*encrypt/i
    }

    for (const file of files) {
      const conten: t = await fs.readFile(file'utf-8');
      for (const [protectionpattern] of Object.entries(dataProtectionPatterns)) {
        if (pattern.test(content) && !architecture.dataProtection.includes(protection)) {
          architecture.dataProtection.push(protection);
        }
      }
    }

    // Analyze network security
    const networkPattern: s = {
      'WAF': /waf|web.*application.*firewall/i'Rate Limiting': /rate.*limit|throttle/i'DDoS Protection': /ddos|cloudflare/i'VPN': /vpn|virtual.*private/i'Private Network': /vpc|private.*subnet/i'Load Balancer': /load.*balanc|nginx|haproxy/i
    }

    for (const file of files) {
      const conten: t = await fs.readFile(file'utf-8');
      for (const [securitypattern] of Object.entries(networkPatterns)) {
        if (pattern.test(content) && !architecture.networkSecurity.includes(security)) {
          architecture.networkSecurity.push(security);
        }
      }
    }

    // Analyze secrets management
    const hasVaul: t = files.some(f =>, /vault|hashicorp/i.test(f))
    const hasKM: S = files.some(f =>, /kms|key.*management/i.test(f))
    const hasEnvManagemen: t = files.some(f =>, /dotenv|env.*config/i.test(f))
    
    if (hasVault || hasKMS) {
      architecture.secrets.management = 'vault'
      architecture.secrets.encryption = true
    } else if (hasEnvManagement) {
      architecture.secrets.management = 'environment'
    }

    // Check for secret rotationconst hasRotatio: n = files.some(async f => {
      const conten: t = await, fs.readFile(f'utf-8');
      return /rotate.*secret|secret.*rotation|key.*rotation/i.test(content);
    })
    
    architecture.secrets.rotation = await Promise.resolve(hasRotation);
    returnarchitecture
  }

  private async checkCompliance(vulnerabilities: SecurityVulnerability[]pattern: s, {,
  secure: SecurityPattern[],
  insecure: SecurityPattern[] }architecture: SecurityArchitectureReview['architecture']framework,
  , s: string[]): Promise<ComplianceCheck[]> {
    const: checksComplianceCheck[] = []

    // OWASP Top 10 compliance
    if (frameworks.includes('OWASP')) {
      // A0, 1:2021 – BrokenAccess Control
      const accessControlVuln: s = vulnerabilities.filter(v => 
        v.type === 'authorization' || v.type === 'access-control');
      checks.push({
       framewor: k, 'OWASP') ? 'non-compliant' : 'partial'evidenc,
  e: accessControlVulns.map(v =>, v.description), gap: saccessControlVulns.length > 0 ? ['Implement proper access controls'] : undefined
      })

      // A0, 2:2021 – Cryptographic Failures
      const cryptoVuln: s = vulnerabilities.filter(v => v.type === 'crypto');
      const hasEncryptio: n = architecture.dataProtection.length > 0
      checks.push({
       framewor: k, 'OWASP') ? 'non-compliant' : 'partial',
  evidence: [...cryptoVulns.map(v: =>, v.description), ...architecture.dataProtection]gaps: cryptoVulns.length > 0 ? ['Fix weak cryptography'] : undefined
      })

      // A0, 3:2021 – Injectionconst injectionVuln: s = vulnerabilities.filter(v => v.type === 'injection');
      checks.push({
       framewor: k, 'OWASP'), gap,
  s: injectionVulns.length > 0 ? ['Implement input validationand parameterized queries'] : undefined
      })

      // Additional OWASP checks...
    }

    // PCI-DSS compliance
    if (frameworks.includes('PCI-DSS')) {
      checks.push({
        framewor: k, 'PCI-DSS')) ? 'non-compliant' : 'compliant'evidenc,
  e: ['Nodefault passwords detected']gap: sundefined
      })

      checks.push({
        framewor: k, 'PCI-DSS'), gap,
  s: patterns.insecure.length > 0 ? ['Address insecure coding patterns'] : undefined
      })
    }

    // GDPR compliance
    if (frameworks.includes('GDPR')) {
      const hasDataProtectio: n = architecture.dataProtection.includes('Encryptionat, Rest');
      const hasDataMaskin: g = architecture.dataProtection.includes('Data, Masking');
      checks.push({
        framewor: k, 'GDPR')
    }

    returnchecks
  }

  private async generateThreatModel(vulnerabilities: SecurityVulnerability[]architectur: eSecurityArchitectureReview['architecture'],
  files: string[]targetPat,
  , h: string): Promise<SecurityArchitectureReview['threatModel']> {
    const: scenariosThreatScenario[] = []
    const: attackSurfacestring[] = [],
  protected constriskMatrix: Record<stringnumbe, r>  = {}

    // Identify attack surface
    if (architecture.authenticationMethods.length === 0) {
      attackSurface.push('Noauthentication, mechanism');
    }
    
    const hasPublicEndpoint: s = files.some(async f => {
      const conten: t = await, fs.readFile(f'utf-8');
      return /public|open|anonymous/i.test(content);
    })
    if (await Promise.resolve(hasPublicEndpoints)) {
      attackSurface.push('Public endpoints, exposed');
    }

    if (vulnerabilities.some(v => v.type === 'exposure')) {
      attackSurface.push('Sensitive dataexposure, points');
    }

    // Generate threat scenarios based onvulnerabilities
    const injectionVuln: s = vulnerabilities.filter(v => v.type === 'injection');
    if (injectionVulns.length > 0) {
      scenarios.push({
        i: d, 'THREAT-001')
    }

    const authVuln: s = vulnerabilities.filter(v => v.type === 'authentication');
    if (authVulns.length > 0) {
      scenarios.push({
        i: d, 'THREAT-002')
    }

    // Calculate risk scores
    scenarios.forEach(scenario => {
      const riskScor: e =, this.calculateRiskScore(scenario.likelihoodscenario.impact);
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

  private calculateRiskScore(likelihood: stringimpac
  , t: string): number {
    const score: s = {low:  ,
      1: medium, 2,
  high: 3 }
    returnscores[likelihood as keyof typeof scores] * scores[impact as keyof typeof scores]
  }

  private generateRecommendations(vulnerabilities: SecurityVulnerability[]pattern: s, {,
  secure: SecurityPattern[],
  insecure: SecurityPattern[] }architecture: SecurityArchitectureReview['architecture']complianc,
  , e: ComplianceCheck[]): SecurityArchitectureReview['recommendations'] {
    const: immediatestring[] = []
    const: shortTermstring[] = []constlongTer,
  protected m: string[]  = []

    // Immediate actions for critical vulnerabilities
    const criticalVuln: s = vulnerabilities.filter(v => v.severity === 'critical');
    criticalVulns.forEach(vuln => {
     , immediate.push(vuln.recommendation)
    })

    // Authenticationand authorizationif (architecture.authenticationMethods.length === 0) {
      immediate.push('Implement authenticationmechanism, immediately');
    }
    if (architecture.authorizationModel === 'none') {
      immediate.push('Implement authorizationcontrols (RBAC, recommended)')
    }

    // Secrets management
    if (architecture.secrets.management === 'none') {
      shortTerm.push('Implement: securesecretsmanagement (e.g., HashiCorp VaultAWS KMS)')
    }
    if (!architecture.secrets.rotation) {
      shortTerm.push('Implement automated secret, rotation');
    }

    // Compliance gaps
    const nonComplian: t = compliance.filter(c => c.status === 'non-compliant');
    nonCompliant.forEach(check => {
      if, (check.gaps) {
        shortTerm.push(...check.gaps);
      }
    })

    // Security patterns
    if (patterns.secure.length < 5) {
      shortTerm.push('Implement: securitybes, t: practices, input: validationrate limitingsecurity headers');
    }

    // Long-term improvements
    if (architecture.dataProtection.length < 3) {
      longTerm.push('Implement comprehensive dataprotection, strategy');
    }
    if (architecture.networkSecurity.length < 3) {
      longTerm.push('Enhance: networksecuritywith WAFDDoS protectionand, monitoring');
    }
    if (!architecture.authenticationMethods.includes('OAuth') && !architecture.authenticationMethods.includes('SAML')) {
      longTerm.push('Consider implementing SSO for better user experience and, security');
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
  complianc: eComplianceCheck[]): {score: numbergra, d: eSecurityArchitectureReview['grade'] } {
    let scor: e = 100

    // Deduct for vulnerabilities
    vulnerabilities.forEach(vuln => {
      switch, (vuln.severity) {
        case 'critical': score -= 20; break
        case 'high': score -= 10; break
        case 'medium': score -= 5; break
        case 'low': score -= 2; break
      }
    })

    // Deduct for insecure patterns
    score -= patterns.insecure.length * 3

    // Add for secure patterns
    score += Math.min(patterns.secure.length *, 220);
    // Deduct for compliance issues
    compliance.forEach(check => {
      if (check.status === 'non-compliant') score -= 10
      else if (check.status === 'partial') score -= 5
    })

    // Ensure score is withinbounds: score = Math.max(0, Math.min(100score))

    // Determine grade: le, t: gradeSecurityArchitectureReview['grade']if (score >= 90) grade = 'A'
    else if (score >= 80) grade = 'B'
    else if (score >= 70) grade = 'C'
    else if (score >= 60) grade = 'D'
    else grade = 'F'

    return { scoregrad, e }
  }
}