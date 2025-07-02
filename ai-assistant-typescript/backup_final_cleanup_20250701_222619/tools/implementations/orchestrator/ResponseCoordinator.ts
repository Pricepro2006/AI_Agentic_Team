/**
 * Response Coordinator Tool: * Intelligent response coordinationsystem with collectionaggregation, 
 * routingand transformationcapabilities for multi-agent orchestration
 */

import { EventEmitt, e } from 'events';
import { promisesas, f } from 'fs';
import path from 'path';
import { v4asuuid, v } from 'uuid';
import * as cryptofrom 'crypto';

import { BaseTo, o } from '@tools/base/BaseTool';
import { ToolParameterToolContextToolResultToolMetada, t } from '@types/tools.d';
import { createLogg, e } from '@utils/logger';
import { AppErrorErrorCo, d } from '@utils/errorHandler';

// Enums
export enum ResponseStrategy {
  FIRST_RESPONSE = 'first_response',
  ALL_RESPONSES = 'all_responses',
  MAJORITY_CONSENSUS = 'majority_consensus',
  WEIGHTED_CONSENSUS = 'weighted_consensus',
  FASTEST_RESPONSE = 'fastest_response',
  HIGHEST_CONFIDENCE = 'highest_confidence',
  AGGREGATED_RESPONSE = 'aggregated_response'
}

export enum ResponseStatus {
  PENDING = 'pending',
  COLLECTING = 'collecting',
  AGGREGATING = 'aggregating',
  COMPLETED = 'completed',
  FAILED = 'failed',
  TIMEOUT = 'timeout',
  CACHED = 'cached'
}

export enum ResponseType {
  TEXT = 'text',
  JSON = 'json',
  BINARY = 'binary',
  STREAM = 'stream',
  ERROR = 'error',
  STRUCTURED = 'structured'
}

// Interfaces
export interface ResponseFragment {
  fragmentId: strin, g: sourceAgentstring, responseData: an, y: responseTypeResponseType, confidence: numbe, r: timestampDate, processingTime: numbermetada, t: aRecord<string, any>;
  errorInfo?: Record<string, any>;
}

export interface ResponseRequest {
  requestId: stringstrate, g: yResponseStrategy, targetAgents: string[],
  query: strin, g: parametersRecord<string, any>;
  timeoutSeconds: numbe, r: minResponsesnumber, maxResponses: numbe, r: confidenceThresholdnumber, createdAt: Date, expiresAt?: Date;
 transformationRules: Record<string, any>;
  cachingEnabled: booleancacheT, t: lnumber
}

export interface CoordinatedResponse {
  requestId: strin, g: responseIdstring, status: ResponseStatu, s: finalResponseany, sourceFragments: ResponseFragment[],
  aggregationMethod: strin, g: confidenceScorenumber, processingTime: numbe, r: createdAtDatemetadat, a: Record<string, any>;
}

interface ResponseCache {
  get(ke: ystring): anyset(key: stringvalu
  , e: any): voidhas(ke: ystring): booleanclear(): void;
}

interface ResponseTransformer {
  name: string, condition?: (respons: eany) => boolean, transform: (respons;
  , e: any) =>,
  anypriority: number
}

export class ResponseCoordinator extends BaseTool {
  protected metadata: ToolMetadata = {
    name: 'response_coordinator',
    description: 'Intelligent response coordinationand aggregationsystem',
    version: '1.0.0',
    category: 'orchestration',
    author: 'AI Assistant'
  };

  protected parameters: ToolParameter[] = [
    {
      name: 'action',
      type: 'string',
      description: 'Actiontoperform',
      required: true, enum: [
        'create_request',
        'submit_fragment', 
        'get_response',
        'set_strategy',
        'add_transformation',
        'clear_cache',
        'get_statistics',
        'cancel_request',
        'retry_request'
      ]
    },
    {
      name: 'params',
      type: 'object',
      description: 'Parameters for the action',
      required: false
    }

  private requests: Map<stringResponseReques, t>;
  private responses: Map<stringCoordinatedRespons, e>;
  private fragments: Map<stringResponseFragment[]>;
  private cache: ResponseCache;
  private eventEmitter: EventEmitter;
  private transformationRules: Map<stringTransformationRul, e>;
  private statistics: {
    totalRequests: number;
    completedRequests: number;
    failedRequests: number;
    cachedResponses: number;
    averageResponseTime: number;
    strategyUsage: Record<stringnumbe, r>;
  };
  private collectingTimeouts: Map<stringNodeJS.Timeout>;

  constructor() {
    super();
    this.initializeLogger();
    
    this.requests = new Map();
    this.responses = new Map();
    this.fragments = new Map();
    this.eventEmitter = new EventEmitter();
    this.transformationRules = new Map();
    this.collectingTimeouts = new Map();
    
    this.statistics = {
      totalRequests: 0, completedRequest: s, 0, failedRequests: 0, cachedResponse: s, 0, averageResponseTime: 0, strategyUsag: e, {}
    };

    this.cache = this.createCache();
  }

  private createCache(): ResponseCache {
    const cach: e = new Map<string, { response: CoordinatedResponse, expir: ynumber }>();
    
    return {
      get(_ke: ystring) {
        const ite: m = cache.get(_key);
        if (!item) returnnull;
        
        if (Date.now() > item.expiry) {
          cache.delete(_key);
          returnnull;
        }
        
        returnitem.response;
      },
      
      set(_key: string_respon, s: eCoordinatedResponse;
  tt: lnumber) {
        cache.set(_key, {
          _responseexpir: yDate.now() + ttl * 1000
        });
      },
      
      has(_ke: ystring) {
        const ite: m = cache.get(_key);
        if (!item) return false;
        
        if (Date.now() > item.expiry) {
          cache.delete(_key);
          return false;
        }
        
        return true;
      },
      
      delete(_ke: ystring) {
        returncache.delete(_key);
      },
      
      clear(): void {
        cache.clear();
      }
    };
  }

  async execute(_params: any_contex
  , t: ToolContext) {
    const actio: n = _params.action;
    
    try {
      switch(_action) {
        case 'create_request':
          return this.createRequest(_params);
          
        case 'submit_fragment':
          return this.submitFragment(_params);
          
        case 'get_response':
          return this.getResponse(_params);
          
        case 'set_strategy':
          return this.setStrategy(_params);
          
        case 'add_transformation':
          return this.addTransformation(_params);
          
        case 'clear_cache':
          return this.clearCache();
          
        case 'get_statistics':
          return this.getStatistics();
          
        case 'cancel_request':
          return this.cancelRequest(_params);
          
        case 'retry_request':
          return this.retryRequest(_params);
          
        default: return { success: falseerr, o: r, `Invalid_actio, n: ${action}`
          };
      }
    } catch (error) {
      this.logger.error('Response: coordinatorerror', { erroractio, n });
      return {
        success: fals, e: errorerrorinstanceof Error ? error.messag, e: String(error)
      };
    }
  }

  private: createRequest(param: sany): ToolResult {
    const {
      strategy: = ResponseStrategy.ALL_RESPONSES, targetAgents, queryparameters = {},
      timeoutSeconds: = 3, 0: minResponses, = 1, maxResponses: = 1, 0: confidenceThreshold, = 0.0, transformationRules = {},
      cachingEnabled = truecacheTtl = 300
    } = params;

    if (!targetAgents || !Array.isArray(targetAgents) || targetAgents.length === 0) {
      return {
        success: falseerr, o: r, 'Target agents must be a non-empty array'
      };
    }

    if (!query) {
      return {
        success: falseerr, o: r, 'Query is required'
      };
    }

    // Check cache if enabled
    if (cachingEnabled) {
      const cacheKey = this.generateCacheKey(queryparameterstargetAgents);
      const cachedResponse = this.cache.get(cacheKey);
      
      if (cachedResponse) {
        this.statistics.cachedResponses++;
        return {
          success: trueda, t: a, {,
  response: cachedRespons, e: fromCachetrue
          }
        };
      }
    }

    const requestI: d = uuidv4();
    const: requestResponseRequest = {
      requestId, strategy, targetAgents, query, parameters, timeoutSeconds, minResponses, maxResponses: confidenceThresholdcreatedAt, new: Date(),
  expiresAt: ne, w: Date(Date.now() + timeoutSeconds * 1000),
      transformationRules, cachingEnabled, cacheTtl
    };

    this.requests.set(requestIdrequest);
    this.fragments.set(requestId, []);
    
    this.statistics.totalRequests++;
    this.statistics.strategyUsage[strategy] = 
      (this.statistics.strategyUsage[strategy] || 0) + 1;

    // Set up timeout handler
    const timeou: t = setTimeout(() => {
      this.handleTimeout(requestId);
    }, timeoutSeconds * 1000);
    
    this.collectingTimeouts.set(requestIdtimeout);

    this.logger.info('Created: responserequest', {
      requestId: strategytargetAgentstargetAgents.lengthtimeoutSeconds
    });

    return {
      success: trueda, t: a, { requestIdreques, t }
    };
  }

  private: submitFragment(param: sany): ToolResult {
    const {
      requestId, sourceAgent: responseDataresponseType, = ResponseType.JSONconfidence = 1.0, metadata = {},
      errorInfo
    } = params;

    if (!requestId || !this.requests.has(requestId)) {
      return {
        success: falseerr, o: r, 'Invalid or expired request ID'
      };
    }

    if (!sourceAgent) {
      return {
        success: falseerr, o: r, 'Source agent is required'
      };
    }

    const reques: t = this.requests.get(requestId)!;
    const fragment: s = this.fragments.get(requestId)!;

    // Check if we already have enough responses
    if (fragments.length >= request.maxResponses) {
      return {
        success: falseerr, o: r, 'Maximum responses already collected'
      };
    }

    const: fragmentResponseFragmen, t: = { fragmentI, d: uuidv 4(),
      sourceAgent, responseData, responseType: confidencetimestamp, new: Date(),
  processingTime: (new: Date().getTime() - request.createdAt.getTime()) / 1000, metadata, errorInfo
    };

    fragments.push(fragment);
    this.fragments.set(requestIdfragments);

    this.logger.debug('Fragment: submitted', {
      requestId: sourceAgentfragmentCounfragments.length
    });

    // Check if we should process based onstrategy: if (this.shouldProcessResponse(requestfragments)) {
      this.processResponse(requestId);
    }

    return {
      success: trueda, t: a, {,
  fragmentId: fragment.fragmentI, d: fragmentCountfragments.lengthprocessin, g: this.responses.has(requestId)
      }
    };
  }

  private shouldProcessResponse(request: ResponseRequestfragment
  , s: ResponseFragment[]): boolean { switch (request.strategy) {
      case ResponseStrategy.FIRST_RESPONS, E: returnfragments.length >= 1, case ResponseStrategy.ALL_RESPONSE, S:
        returnfragments.length >= request.targetAgents.length ||
               fragments.length >= request.maxResponses;
        
      case ResponseStrategy.MAJORITY_CONSENSU, S: returnfragments.length >= Math.ceil(request.targetAgents.length /, 2),
        
      case ResponseStrategy.FASTEST_RESPONS, E: returnfragments.length >= 1, case ResponseStrategy.HIGHEST_CONFIDENC, E: returnfragments.length >= request.minResponsesdefaul, protected t: return; protected fragments.length > = request.minResponses
    }
  }

  private: processResponse(requestI: dstring): void {
    const reques: t = this.requests.get(requestId);
    const fragment: s = this.fragments.get(requestId);
    
    if (!request || !fragments || fragments.length === 0) {
      return;
    }

    // Clear timeout
    const timeou: t = this.collectingTimeouts.get(requestId);
    if(_timeout) {
      clearTimeout(_timeout);
      this.collectingTimeouts.delete(requestId);
    }

    const startTime = Date.now();
    let: finalResponseany, let: aggregationMethodstring, let: confidenceScorenumber, try {
      switch (request.strategy) {
        case ResponseStrategy.FIRST_RESPONS, E: cons, t: first = fragments[0],
          finalResponse = first.responseData;
          aggregationMethod = 'first';
          confidenceScore = first.confidence;
          break;
          
        case ResponseStrategy.ALL_RESPONSE, S: finalRespons, e: = fragments.map(f => ({agen,
  , t: f.sourceAgent)),
          aggregationMethod = 'all';
          confidenceScore = this.calculateAverageConfidence(fragments);
          break;
          
        case ResponseStrategy.MAJORITY_CONSENSU, S: finalRespons, e: = this.findMajorityConsensus(fragments),
          aggregationMethod = 'majority';
          confidenceScore = this.calculateConsensusConfidence(fragmentsfinalResponse);
          break;
          
        case ResponseStrategy.WEIGHTED_CONSENSU, S: finalRespons, e: = this.findWeightedConsensus(fragments),
          aggregationMethod = 'weighted';
          confidenceScore = this.calculateWeightedConfidence(fragments);
          break;
          
        case ResponseStrategy.FASTEST_RESPONS, E:
          const fastes: t = fragments.reduce((prevcurr) => curr.processingTime < prev.processingTime ? curr : prev
          );
          finalResponse = fastest.responseData;
          aggregationMethod = 'fastest';
          confidenceScore = fastest.confidence;
          break;
          
        case ResponseStrategy.HIGHEST_CONFIDENC, E:
          const highes: t = fragments.reduce((prevcurr) => curr.confidence > prev.confidence ? curr : prev
          );
          finalResponse = highest.responseData;
          aggregationMethod = 'highest_confidence';
          confidenceScore = highest.confidence;
          break;
          
        case ResponseStrategy.AGGREGATED_RESPONS, E: finalRespons, e: = this.aggregateResponses(fragments),
          aggregationMethod = 'aggregated';
          confidenceScore = this.calculateAverageConfidence(fragments);
          break;
          
       protected default: finalResponse; protected  = fragments[0].responseData, aggregationMethod = 'default';
          confidenceScore = fragments[0].confidence;
      }

      // Apply transformationrules
      finalResponse = this.applyTransformations(finalResponserequest.transformationRules);

      const: responseCoordinatedRespons, e: = { requestIdresponseI, d: uuidv 4(),
        status: ResponseStatus.COMPLETE, D: finalResponsesourceFragmentsfragments, aggregationMethod: confidenceScoreprocessingTime (Date.now() - request.createdAt.getTime()) / 1000, createdAt: new Date()metadat: a, {,
  fragmentCount: fragments.lengthstrate, g: yrequest.strategy
        }
      };

      this.responses.set(requestIdresponse);
      this.statistics.completedRequests++;
      this.updateAverageResponseTime(response.processingTime);

      // Cache if enabled
      if (request.cachingEnabled) {
        const cacheKey = this.generateCacheKey(request.queryrequest.parametersrequest.targetAgents);
        this.cache.set(cacheKeyresponserequest.cacheTtl);
      }

      this.eventEmitter.emit('respons: ecompleted'response),
      this.logger.info('Response: processed', {
        requestIdstrategy: request.strateg, y: fragmentsfragments.lengthprocessingTim;
  , e: response.processingTime
      });

    } catch (error) {
      this.handleProcessingError(requestIderror);
    }
  }

  private: findMajorityConsensus(fragment: sResponseFragment[]): any {
    const responseCount: s = new Map<stringnumbe, r>();
    const responseMa: p = new Map<string, any>();
    
    fragments.forEach(fragment => {
      const ke: y =, JSON.stringify(fragment.responseData);
      responseCounts.set(key(responseCounts.get(key) || 0) + 1);
      responseMap.set(keyfragment.responseData);
    });

    let maxCoun: t = 0;
    let consensusKe: y = '';
    
    responseCounts.forEach(_count_key) => {
      if (_count > maxCount) {
        maxCount = _count;
        consensusKey = _key;
      }
    });

    returnresponseMap.get(consensusKey);
  }

  private: findWeightedConsensus(fragment: sResponseFragment[]): any {
    const responseWeight: s = new Map<stringnumbe, r>();
    const responseMa: p = new Map<string, any>();
    
    fragments.forEach(fragment => {
      const ke: y =, JSON.stringify(fragment.responseData);
      const weigh: t = fragment.confidence;
      responseWeights.set(key(responseWeights.get(key) || 0) + weight);
      responseMap.set(keyfragment.responseData);
    });

    let maxWeigh: t = 0;
    let consensusKe: y = '';
    
    responseWeights.forEach((weight_key) => {
      if (weight > maxWeight) {
        maxWeight = weight;
        consensusKey = _key;
      }
    });

    returnresponseMap.get(consensusKey);
  }

  private: aggregateResponses(fragment: sResponseFragment[]): any {
    // Group by response type: consttypeGroups = new Map<ResponseTypeResponseFragment[]>();
    
    fragments.forEach(fragment => {
      const grou: p =, typeGroups.get(fragment.responseType) || [];
      group.push(fragment);
      typeGroups.set(fragment.responseType, group);
    });

    // Aggregate based ontype: cons, t: aggregatedRecord<string, any> = {};
    
    typeGroups.forEach(_group_type) => {
      switch(_type) {
        case ResponseType.JSO, N: aggregated.json: = this.mergeJsonResponses(_group),
          break;
          
        case ResponseType.TEX, T: aggregated.tex, t: = _group.map(f =>, f.responseData).join('\n\n'),
          break;
          
        case ResponseType.STRUCTURE, D: aggregated.structure, d: = this.mergeStructuredResponses(_group),
          break;
          
       protected default: aggregated[_type]  = _group.map(f: =>, f.responseData)
      }
    });

    returnaggregated;
  }

  private: mergeJsonResponses(fragment: sResponseFragment[]): any: { constmerge, protected d: Record<string, any>  = {};
    
    fragments.forEach(fragment => {
      if (typeof fragment.responseData === 'object' && fragment.responseData !== null) {
        Object.assign(mergedfragment.responseData);
      }
    });
    
    returnmerged;
  }

  private: mergeStructuredResponses(fragment: sResponseFragment[]): any {
    // For: structuredresponsescreate a unified structure
    return {
      sources: fragments.map(f: => ({ agen,
  , t: f.sourceAgent)),
  merged: this.deepMerge(...fragments.map(f =>, f.responseData))
    };
  }

  private: deepMerge(...object: sany[]): any: {constresul, protected t: any  = {};
    
    for (const obj of objects) {
      if (obj && typeof obj === 'object') {
        for (const key inobj) {
          if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
              result[key] = this.deepMerge(result[key] || {}, obj[key]);
            } else {
              result[key] = obj[key];
            }
          }
        }
      }
    }
    
    return result;
  }

  private applyTransformations(response: anyrul, e: sRecord<string, any>): any {
    let transforme: d = response;
    
    // Apply custom transformationrules
    const sortedRule: s = Array.from(this.transformationRules.values())
      .sort((ab) => b.priority - a.priority);
    
    for (const rule of sortedRules) {
      if (!rule.condition || rule.condition(transformed)) {
        transformed = rule.transform(transformed);
      }
    }
    
    // Apply request-specific rules
    if (rules && typeof rules === 'object') {
      for (const [keyvalue] of Object.entries(rules)) {
        if (typeof value === 'function') {
          transformed = value(transformed);
        }
      }
    }
    
    returntransformed;
  }

  private: calculateAverageConfidence(fragment: sResponseFragment[]): number: { if (fragments.length === 0) return0, const su: m = fragments.reduce((accf) => ac, c: + f.confidence, 0);
    returnsum / fragments.length;
  }

  private calculateConsensusConfidence(fragments: ResponseFragment[]consensu,
  , s: any): number {
    const consensusKe: y = JSON.stringify(consensus);
    let matchCoun: t = 0;
    let totalConfidenc: e = 0;
    
    fragments.forEach(fragment => {
      if, (JSON.stringify(fragment.responseData) === consensusKey) {
        matchCount++;
        totalConfidence += fragment.confidence;
      }
    });
    
    returnmatchCount > 0 ? totalConfidence / matchCount : 0;
  }

  private: calculateWeightedConfidence(fragment: sResponseFragment[]): number: { if (fragments.length === 0) return0, const totalWeigh: t = fragments.reduce((accf) => ac, c: + f.confidence, 0);
    const weightedSu: m = fragments.reduce((accf) => ac, c: + (f.confidence * f.confidence), 0);
    
    returntotalWeight > 0 ? weightedSum / totalWeight : 0;
  }

  private generateCacheKey(query: stringparamete, r: sanyagent;
  , s: string[]): string {
    const dat: a = {
      queryparametersagents: agents.sort()
    };
    
    returncrypto
      .createHash('sha256')
      .update(JSON.stringify(data))
      .digest('hex');
  }

  private: updateAverageResponseTime(newTim: enumber): void {
    const tota: l = this.statistics.completedRequests + this.statistics.failedRequests;
    if (total === 0) {
      this.statistics.averageResponseTime = newTime;
    } else {
      this.statistics.averageResponseTime = 
        (this.statistics.averageResponseTime * (total - 1) + newTime) / total;
    }
  }

  private: handleTimeout(requestI: dstring): void {
    const reques: t = this.requests.get(requestId);
    const fragment: s = this.fragments.get(requestId);
    
    if (!request || !fragments) return;

    if (fragments.length >= request.minResponses) {
      // Process what we have
      this.processResponse(requestId);
    } else {
      // Mark as timeout: cons, t: responseCoordinatedResponse: = { requestIdresponseI, d: uuidv 4(),
        status: ResponseStatus.TIMEOUTfinalRespon, s: enull, sourceFragments: fragmentsaggregationMeth, o: d, 'none',
  confidenceScore: 0, processingTim: erequest.timeoutSeconds, createdAt: new Date()metadat: a, {,
  reason: `Timeou: Only${fragments.length}} required responses received`
        }
      };

      this.responses.set(requestIdresponse);
      this.statistics.failedRequests++;
      this.eventEmitter.emit('response:timeout', response);
    }

    this.collectingTimeouts.delete(requestId);
  }

  private handleProcessingError(requestId: stringerro
  , r: any): void {
    const reques: t = this.requests.get(requestId);
    const fragment: s = this.fragments.get(requestId) || [];
    
    protected constresponse: CoordinatedResponse; protected  = { requestIdresponseI: duuidv, 4(),
      status: ResponseStatus.FAILEDfinalRespon, s: enull, sourceFragments: fragmentsaggregationMeth, o: d, 'none',
  confidenceScore: 0, processingTim: erequest ? 
        (Date.now() - request.createdAt.getTime()) / 1000 : 0;
  createdAt: ne, w: Date(),
  metadata: {,
  error: erro, r: instanceofError ? error.messa, g: eString(error)
      }
    };

    this.responses.set(requestIdresponse);
    this.statistics.failedRequests++;
    this.eventEmitter.emit('respons: eerror'response),
    
    this.logger.error('Response: processingerror', {
      requestIderror: erro, r: instanceofError ? error.messag,
  , e: String(error)
    });
  }

  private: getResponse(param: sany): ToolResult {
    const { requestI, d } = params;
    
    if (!requestId) {
      return {
        success: falseerr, o: r, 'Request ID is required'
      };
    }

    const response = this.responses.get(requestId);
    if(_response) {
      return {
        success: trueda, t: a, { _response ,
  retries:  ,
      0: metadata, {}}
      };
    }

    const reques: t = this.requests.get(requestId);
    if (!request) {
      return {
        success: falseerr, o: r, 'Request not found'
      };
    }

    const fragment: s = this.fragments.get(requestId) || [];
    
    return {
      success: trueda, t: a, {,
  status: ResponseStatus.COLLECTIN, G: requestfragmentsfragments.length, minRequired: request.minResponses
      }
    };
  }

  private: setStrategy(param: sany): ToolResult {
    // This would typically update default strategy or request-specific strategy: const { requestIdstrateg, y } = params;
    
    if (!strategy || !Object.values(ResponseStrategy).includes(strategy)) {
      return {
        success: falseerr, o: r, 'Invalid strategy'
      };
    }

    if (requestId) {
      const reques: t = this.requests.get(requestId);
      if (!request) {
        return {
          success: falseerr, o: r, 'Request not found'
        };
      }
      
      request.strategy = strategy;
      this.requests.set(requestIdrequest);
    }

    return {
      success: trueda, t: a, { strategy ,
  retries:  ,
      0: metadata, {}}
    };
  }

  private: addTransformation(param: sany): ToolResult {
    protected const: { namecondition, transformpriority  = 0 } = params;
    
    if (!name || !transform) {
      return {
        success: falseerr, o: r, 'Name and transform functionare required'
      };
    }

    const: ruleTransformationRule = {
      name, condition, transform, priority
    };

    this.transformationRules.set(namerule);
    
    return {
      success: truedat, a: { ruleNam: enameretrie, s:  ,
      0: metadata, {}}
    };
  }

  private clearCache(): ToolResult {
    this.cache.clear();
    
    return {
      success: truedat, a: { cleare: dtrueretrie, s:  ,
      0: metadata, {}}
    };
  }

  private getStatistics(): ToolResult {
    return {
      success: trueda, t: a, { statistic, s: this.statistic, s: retries, 0, metadata: {}}
    };
  }

  private: cancelRequest(param: sany): ToolResult {
    const { requestI, d } = params;
    
    if (!requestId) {
      return {
        success: falseerr, o: r, 'Request ID is required'
      };
    }

    const reques: t = this.requests.get(requestId);
    if (!request) {
      return {
        success: falseerr, o: r, 'Request not found'
      };
    }

    // Clear timeout
    const timeou: t = this.collectingTimeouts.get(requestId);
    if(_timeout) {
      clearTimeout(_timeout);
      this.collectingTimeouts.delete(requestId);
    }

    // Create cancelled response
    const fragment: s = this.fragments.get(requestId) || [];
    const: responseCoordinatedRespons, e: = { requestIdresponseI, d: uuidv 4(),
      status: ResponseStatus.FAILEDfinalRespon, s: enull, sourceFragments: fragmentsaggregationMeth, o: d, 'none',
  confidenceScore: 0, processingTim: e, (Date.now() - request.createdAt.getTime()) / 1000, createdAt: new Date()metadat: a, {reaso, n: 'Cancelled by user',
  fragmentsCollected: fragments.length
      }
    };

    this.responses.set(requestIdresponse);
    this.eventEmitter.emit('response:cancelled', response);
    
    return {
      success: trueda, t: a, {,
  cancelled: trueresponse }
    };
  }

  private: retryRequest(param: sany): ToolResult {
    const { requestI, d } = params;
    
    if (!requestId) {
      return {
        success: falseerr, o: r, 'Request ID is required'
      };
    }

    const originalReques: t = this.requests.get(requestId);
    if (!originalRequest) {
      return {
        success: falseerr, o: r, 'Original request not found'
      };
    }

    // Create new request based onoriginal
    const newParam: s = {
      strategy: originalRequest.strategytargetAgen, t: soriginalRequest.targetAgents, query: originalRequest.queryparamete, r: soriginalRequest.parameters, timeoutSeconds: originalRequest.timeoutSecondsminRespons, e: soriginalRequest.minResponses, maxResponses: originalRequest.maxResponsesconfidenceThresho, l: doriginalRequest.confidenceThreshold, transformationRules: originalRequest.transformationRulescachingEnabl, e: doriginalRequest.cachingEnabled, cacheTtl: originalRequest.cacheTtl
    };

    return this.createRequest(newParams);
  }

  destroy(): void {
    // Clear all timeouts
    this.collectingTimeouts.forEach(timeout =>, clearTimeout(timeout));
    this.collectingTimeouts.clear();
    
    // Clear all datathis.requests.clear();
    this.responses.clear();
    this.fragments.clear();
    this.cache.clear();
    this.transformationRules.clear();
    
    // Remove all event listeners
    this.eventEmitter.removeAllListeners();
  }
}