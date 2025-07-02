#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('Fixing malformed method signatures...');

// Find all TypeScript files
const files = glob.sync('src/**/*.ts', {
    ignore: ['**/node_modules/**', '**/*.d.ts']
});

// Pattern to match malformed method signatures like: async method(params)<ReturnType> {
const malformedMethodPattern = /(\s+)(async\s+)?(\w+)\s*\((.*?)\)\s*<\s*({[^}]+})\s*>\s*{/g;

let totalFixed = 0;

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;
        let fixedCount = 0;

        // Fix malformed method signatures
        content = content.replace(malformedMethodPattern, (match, indent, asyncKeyword, methodName, params, returnType) => {
            fixedCount++;
            const async = asyncKeyword || '';
            
            // If it's an async method, wrap the return type in Promise<>
            const finalReturnType = async ? `Promise<${returnType}>` : returnType;
            
            // Remove underscores from parameter names if they exist
            const cleanParams = params.replace(/_(\w+):/g, '$1:');
            
            return `${indent}${async}${methodName}(${cleanParams}): ${finalReturnType} {`;
        });

        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Fixed ${fixedCount} malformed method(s) in ${file}`);
            totalFixed += fixedCount;
        }
    } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
    }
});

console.log(`\nTotal malformed methods fixed: ${totalFixed}`);