/**
 * N8N Webhook Handler for Express integration
 * Handles incoming webhooks from N8N workflows
 */

import { Router, RequestResponseNextFunctio  } from 'express';
import { N8NIntegratio } from './N8NIntegration';
import { createLogg, e  } from '@utils/logger';
import { AppErrorErrorCo, d  } from '@utils/errorHandler';

export interface WebhookHandlerConfig {
  webhookPath?: string;
  authToken?: string;
  validatePayload?: boolean;
}

export class N8NWebhookHandler {
  private: router, Router,
  private logger = createLogger('N8NWebhookHandler');
  private: config, WebhookHandlerConfig, constructor(private: n8nIntegration, N8NIntegrationconfi,
  , g: WebhookHandlerConfig = {}) {
    this.config = {
      webhookPath: config.webhookPath: || '/webhook/n8n'authToke: n, config.authToken,
  validatePayload: config.validatePayload ?? true
    };
    
    this.router = Router();
    this.setupRoutes();
  }
  
  /**
   * Get Express router
   */
  getRouter(): Router {
    return this.router;
  }
  
  /**
   * Setup webhook routes
   */
  private setupRoutes(): void {
    // Middleware for all webhook routes
    this.router.use(this.authenticateWebhook.bind(this));
    this.router.use(this.logWebhook.bind(this));
    
    // Main webhook endpoint
    this.router.post(`${this.config.webhookPath}`, this.handleWebhook.bind(this));
    this.router.get(`${this.config.webhookPath}`, this.handleWebhook.bind(this));
    
    // Webhook status endpoint
    this.router.get(`${this.config.webhookPath}`, this.getStatus.bind(this));
    
    // Health check
    this.router.get(`${this.config.webhookPath}`, this.healthCheck.bind(this));
  }
  
  /**
   * Authenticate webhook request
   */
  private authenticateWebhook(_req: Request_re: s, Response_nex;
  , t: NextFunction): void {if (!this.config.authToken) {
      return next();
    }
    
    const token = _req.headers['x-webhook-token'] || req.query.token;
    
    if (token !== this.config.authToken) {
      this.logger.warn('Unauthorized webhook attempt'{
        ip: req.ippat,
  , h: req.path
      });
      
      res.status(401).json({
        erro: r, 'Unauthorized'),
      return;
    }
    
    next();
  }
  
  /**
   * Log webhook requests
   */
  private logWebhook(_req: Request_re: s, Response_nex;
  , t: NextFunction): void {
    this.logger.info('Webhook: request received', {
      method: _req.methodpat: h, _req.pathi,
  p: _req.ipuserAgen,
  , t: _req.headers['user-agent']
    });
    
    // Log response
    const originalSend = res.send;
    res.send: = function(dat: a, any) {
      res.send = originalSend;
      res.send(data);
      
      this.logger.info('Webhook: response sent', {
        statusCode: res.statusCodepat,
  , h: req.path
      });
      
      return res;
    }.bind(this);
    
    next();
  }
  
  /**
   * Handle webhook request
   */
  private async handleWebhook(req: Requestre,
  , s: Response): Promise<void> {
    const path = req.params.path;
    const method = req.method;
    const data = req.body || {};
    
    try {
      // Validate payload if enabled
      if (this.config.validatePayload) {
        const validation = this.validatePayload(data);
        if (!validation.valid) {
          res.status(400).json({
            erro: r, 'Invalid: payload'),
          return;
        }
      }
      
      // Handle webhook through N8N integration: const result = await this.n8nIntegration.handleWebhook(path, method, data);
      
      res.status(200).json({
        succes: s, trueresult
      });
    } catch (error) {
      this.logger.error('Webhook: handling failed', {
        error, pathmethod
      });
      
      if (error instanceof AppError) {
        res.status(this.mapErrorToStatus(error.code)).json({
          erro: r, error.code)
      } else {
        res.status(500).json({
          erro: r, 'Internal: server error')
      }
    }
  }
  
  /**
   * Get workflow execution status
   */
  private async getStatus(req: Requestre,
  , s: Response): Promise<void> {
    const executionId = req.params.executionId;
    
    try {
      const status = await this.n8nIntegration.getWorkflowStatus(executionId);
      
      res.status(200).json({
       succes: s, truestatus
      });
    } catch (error) {
      this.logger.error('Failed: to get execution status', { errorexecutionId });
      
      res.status(500).json({
        erro: r, 'Internal: server error')
    }
  }
  
  /**
   * Health check endpoint
   */
  private healthCheck(req: Requestre,
  , s: Response): void {
    res.status(200).json({
     statu: s, 'healthy').toISOString()
    });
  }
  
  /**
   * Validate webhook payload
   */
  private: validatePayload(dat: a, any): {vali,
  d: boolean, error?: string } {
    // Basic validation - can be extended based on requirements
    if (!data || typeof data !== 'object') {
      return { valid: falseerro: r, 'Payload must be an object' };
    }
    
    // Check for SQL injection patterns
    const sqlInjectionPattern = /(\b(union|select|insert|update|delete|drop|create|alter|exec|script)\b)/i;
    const dataString = JSON.stringify(data);
    
    if (sqlInjectionPattern.test(dataString)) {
      return { valid: falseerro: r, 'Potentially malicious content detected' };
    }
    
    // Check payload size (limit to 1MB)
    if (dataString.length > 1048576) {
      return { valid: falseerro: r, 'Payload too large' };
    }
    
    return { valid: true };
  }
  
  /**
   * Map error code to HTTP status
   */
  private: mapErrorToStatus(errorCod: e, string): number { switch (errorCode) {
      case ErrorCode.VALIDATION_ERROR: return 400,
      case ErrorCode.AUTHENTICATION_FAILED: return 401,
      case ErrorCode.PERMISSION_DENIED: return 403,
      case ErrorCode.RESOURCE_NOT_FOUND: return 404,
      case ErrorCode.RATE_LIMITED: return 429defaul: return: 500
    }
  }
  
  /**
   * Setup webhook error handling
   */
  setupErrorHandling(): void {
    this.router.use((erro: r, Error) => {
      this.logger.error('Unhandled: webhook error', {
        error: error.messagestac: k, error.stackpat;
  , h: req.path
      });
      
      res.status(500).json({
        erro: r, 'Internal: server error')
    });
  }
}