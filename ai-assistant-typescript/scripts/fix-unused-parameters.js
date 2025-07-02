#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Fix unused parameters by prefixing with underscore
function fixUnusedParameters(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    const originalContent = content;

    // Common patterns for unused parameters
    const patterns = [
      // Function parameters
      /(\w+)\s+is\s+declared\s+but\s+never\s+used/g,
      // Method parameters in arrow functions
      /\(([^)]+)\)\s*=>\s*{/g,
      // Method parameters in regular functions
      /function\s+\w+\s*\(([^)]+)\)/g,
      // Async function parameters
      /async\s+\(([^)]+)\)\s*=>\s*{/g,
      /async\s+function\s+\w+\s*\(([^)]+)\)/g,
    ];

    // Specifically target known unused parameters from our codebase
    const unusedParams = [
      'query', 'context', 'config', 'options', 'params', 'args',
      'error', 'data', 'result', 'response', 'request', 'metadata',
      'tool', 'agent', 'message', 'payload', 'input', 'output',
      'callback', 'handler', 'event', 'state', 'props', 'value',
      'key', 'index', 'item', 'element', 'node', 'path', 'file',
      'tools', 'specialization', 'workflow', 'task', 'job', 'process',
      'logger', 'db', 'cache', 'session', 'user', 'auth', 'token',
      'target', 'source', 'destination', 'origin', 'endpoint', 'url',
      'timeout', 'duration', 'timestamp', 'date', 'time', 'interval',
      'limit', 'offset', 'page', 'size', 'count', 'total', 'max', 'min',
      'filter', 'sort', 'order', 'direction', 'ascending', 'descending',
      'status', 'progress', 'percentage', 'complete', 'remaining',
      'type', 'kind', 'category', 'group', 'tag', 'label', 'name', 'id',
      'schema', 'model', 'entity', 'record', 'document', 'collection',
      'req', 'res', 'next', 'err', 'ctx', 'env', 'vars', 'settings',
      'knowledge', 'domain', 'expertise', 'skill', 'capability',
      'integration', 'connection', 'client', 'server', 'host', 'port',
      'protocol', 'method', 'headers', 'body', 'payload', 'content',
      'format', 'encoding', 'charset', 'language', 'locale', 'timezone',
      'validation', 'validator', 'rule', 'constraint', 'requirement',
      'test', 'spec', 'suite', 'assertion', 'expectation', 'mock',
      'stub', 'spy', 'fixture', 'sample', 'example', 'template',
      'pattern', 'regex', 'expression', 'match', 'capture', 'replace',
      'transform', 'convert', 'parse', 'serialize', 'deserialize',
      'encode', 'decode', 'encrypt', 'decrypt', 'hash', 'salt',
      'algorithm', 'cipher', 'key', 'iv', 'nonce', 'signature',
      'certificate', 'credential', 'permission', 'role', 'scope',
      'resource', 'action', 'operation', 'command', 'instruction',
      'directive', 'policy', 'strategy', 'tactic', 'approach',
      'solution', 'implementation', 'execution', 'runtime', 'instance',
      'container', 'wrapper', 'adapter', 'bridge', 'proxy', 'facade',
      'decorator', 'observer', 'listener', 'emitter', 'publisher',
      'subscriber', 'consumer', 'producer', 'queue', 'stack', 'buffer',
      'stream', 'channel', 'pipeline', 'chain', 'sequence', 'flow',
      'step', 'stage', 'phase', 'cycle', 'iteration', 'loop',
      'condition', 'predicate', 'clause', 'expression', 'statement',
      'block', 'scope', 'closure', 'context', 'environment', 'namespace',
      'module', 'package', 'library', 'framework', 'platform', 'system',
      'service', 'component', 'element', 'widget', 'control', 'field',
      'input', 'output', 'parameter', 'argument', 'property', 'attribute',
      'variable', 'constant', 'literal', 'reference', 'pointer', 'handle',
      'descriptor', 'identifier', 'symbol', 'token', 'lexeme', 'grammar',
      'syntax', 'semantic', 'pragmatic', 'context', 'meaning', 'intent',
      'purpose', 'goal', 'objective', 'target', 'destination', 'outcome',
      'result', 'effect', 'impact', 'consequence', 'implication',
      'knowledgeDomain', 'routingInfo', 'senderAgent', 'testType',
      'parameters', 'targetExpert', 'scrapingTask', 'startTime'
    ];

    // Fix arrow function parameters
    content = content.replace(/\(([^)]+)\)\s*=>\s*{/g, (match, params) => {
      let newParams = params;
      let paramsModified = false;
      
      unusedParams.forEach(param => {
        const regex = new RegExp(`\\b(${param})\\b(?!:)`, 'g');
        if (regex.test(newParams)) {
          // Check if this parameter is already prefixed with underscore
          if (!new RegExp(`\\b_${param}\\b`).test(newParams)) {
            newParams = newParams.replace(regex, '_$1');
            paramsModified = true;
          }
        }
      });
      
      if (paramsModified) {
        modified = true;
        return `(${newParams}) => {`;
      }
      return match;
    });

    // Fix async arrow function parameters
    content = content.replace(/async\s+\(([^)]+)\)\s*=>\s*{/g, (match, params) => {
      let newParams = params;
      let paramsModified = false;
      
      unusedParams.forEach(param => {
        const regex = new RegExp(`\\b(${param})\\b(?!:)`, 'g');
        if (regex.test(newParams)) {
          // Check if this parameter is already prefixed with underscore
          if (!new RegExp(`\\b_${param}\\b`).test(newParams)) {
            newParams = newParams.replace(regex, '_$1');
            paramsModified = true;
          }
        }
      });
      
      if (paramsModified) {
        modified = true;
        return `async (${newParams}) => {`;
      }
      return match;
    });

    // Fix method definitions with unused parameters
    content = content.replace(/^(\s*)(async\s+)?(\w+)\s*\(([^)]*)\)\s*(?::\s*[^{]+)?\s*{/gm, (match, indent, async, methodName, params) => {
      if (!params.trim()) return match;
      
      let newParams = params;
      let paramsModified = false;
      
      // Parse parameters more carefully
      const paramList = params.split(',').map(p => p.trim());
      const newParamList = paramList.map(param => {
        // Extract parameter name (before colon if typed)
        const paramMatch = param.match(/^(\w+)(\s*:.*)?$/);
        if (paramMatch) {
          const [, paramName, typeAnnotation = ''] = paramMatch;
          if (unusedParams.includes(paramName) && !paramName.startsWith('_')) {
            paramsModified = true;
            return `_${paramName}${typeAnnotation}`;
          }
        }
        return param;
      });
      
      if (paramsModified) {
        modified = true;
        newParams = newParamList.join(', ');
        return `${indent}${async || ''}${methodName}(${newParams})${match.substring(match.indexOf('{') - 1)}`;
      }
      return match;
    });

    // Fix constructor parameters
    content = content.replace(/constructor\s*\(([^)]*)\)\s*{/g, (match, params) => {
      if (!params.trim()) return match;
      
      let newParams = params;
      let paramsModified = false;
      
      // Parse parameters more carefully
      const paramList = params.split(',').map(p => p.trim());
      const newParamList = paramList.map(param => {
        // Extract parameter name (before colon if typed)
        const paramMatch = param.match(/^(\w+)(\s*:.*)?$/);
        if (paramMatch) {
          const [, paramName, typeAnnotation = ''] = paramMatch;
          if (unusedParams.includes(paramName) && !paramName.startsWith('_')) {
            paramsModified = true;
            return `_${paramName}${typeAnnotation}`;
          }
        }
        return param;
      });
      
      if (paramsModified) {
        modified = true;
        newParams = newParamList.join(', ');
        return `constructor(${newParams}) {`;
      }
      return match;
    });

    if (modified && content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Fixed unused parameters in ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
console.log('Fixing unused parameters (TS6133 errors)...\n');

const expertFiles = glob.sync('src/agents/experts/*.ts', {
  cwd: path.join(__dirname, '..'),
  absolute: true
});

const toolFiles = glob.sync('src/tools/**/*.ts', {
  cwd: path.join(__dirname, '..'),
  absolute: true
});

const baseFiles = glob.sync('src/agents/base/*.ts', {
  cwd: path.join(__dirname, '..'),
  absolute: true
});

const allFiles = [...expertFiles, ...toolFiles, ...baseFiles];

let fixedCount = 0;
allFiles.forEach(file => {
  if (fixUnusedParameters(file)) {
    fixedCount++;
  }
});

console.log(`\n✅ Fixed unused parameters in ${fixedCount} files`);