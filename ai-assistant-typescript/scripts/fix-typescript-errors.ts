#!/usr/bin/env ts-node

import * as fs from 'fs'
import * as path from 'path'
import * as glob from 'glob'

/**
 * TypeScript Error Fixer Utility
 * Applies automated fixes for common TypeScript errors in the codebase
 */

interface Fix {
  pattern: RegExp
  replacement: string | ((match: string, ...args: any[]) => string)
  description: string
}

const fixes: Fix[] = [
  // Fix 1: Add retries property to ToolExecutionResult
  {
    pattern: /return\s*{\s*success:\s*(true|false),\s*(?!retries:)/g,
    replacement: 'return {\n      success: $1,\n      retries: 0,\n      ',
    description: 'Add missing retries property to ToolExecutionResult'
  },
  
  // Fix 2: Replace error.message with getErrorMessage(error)
  {
    pattern: /catch\s*\((\w+)\)\s*{\s*([^}]*)\1\.message/g,
    replacement: (match, errorVar, content) => {
      return match.replace(new RegExp(`${errorVar}\\.message`, 'g'), `getErrorMessage(${errorVar})`)
    },
    description: 'Replace error.message with getErrorMessage(error)'
  },
  
  // Fix 3: Add missing modelPreferences
  {
    pattern: /(metadata:\s*{[^}]*}\s*)(}\s*})/g,
    replacement: (match, metadataBlock, closingBraces) => {
      if (!match.includes('modelPreferences:')) {
        return `${metadataBlock},\n      modelPreferences: {\n        preferMultiModel: true,\n        fallbackToLegacy: true\n      }${closingBraces}`
      }
      return match
    },
    description: 'Add missing modelPreferences to agent configs'
  },
  
  // Fix 4: Add metadata to model configs
  {
    pattern: /(specialties:\s*\[[^\]]*\])(\s*})/g,
    replacement: (match, specialties, closing) => {
      if (!match.includes('metadata:')) {
        return `${specialties},\n            metadata: {}${closing}`
      }
      return match
    },
    description: 'Add missing metadata to model configurations'
  },
  
  // Fix 5: Fix unused parameter warnings
  {
    pattern: /\((\w+):\s*\w+[^)]*\)\s*=>\s*{[^}]*}/g,
    replacement: (match, param) => {
      // Check if parameter is used in the function body
      const functionBody = match.substring(match.indexOf('{'))
      if (!functionBody.includes(param) && !param.startsWith('_')) {
        return match.replace(param, `_${param}`)
      }
      return match
    },
    description: 'Prefix unused parameters with underscore'
  }
]

async function fixFile(filePath: string): Promise<number> {
  let content = fs.readFileSync(filePath, 'utf-8')
  let fixCount = 0
  
  // Check if file needs getErrorMessage import
  if (content.includes('error.message') && !content.includes('getErrorMessage')) {
    content = `import { getErrorMessage } from '../../utils/error.utils'\n${content}`
    fixCount++
  }
  
  // Apply all fixes
  for (const fix of fixes) {
    const originalContent = content
    content = content.replace(fix.pattern, fix.replacement as any)
    if (content !== originalContent) {
      console.log(`  Applied: ${fix.description}`)
      fixCount++
    }
  }
  
  if (fixCount > 0) {
    fs.writeFileSync(filePath, content)
  }
  
  return fixCount
}

async function main() {
  console.log('TypeScript Error Fixer')
  console.log('======================\n')
  
  // Find all TypeScript files in agents directory
  const files = glob.sync('src/agents/**/*.ts', {
    cwd: process.cwd(),
    absolute: true
  })
  
  console.log(`Found ${files.length} TypeScript files to check\n`)
  
  let totalFixes = 0
  let filesFixed = 0
  
  for (const file of files) {
    const relativePath = path.relative(process.cwd(), file)
    process.stdout.write(`Checking ${relativePath}...`)
    
    const fixes = await fixFile(file)
    if (fixes > 0) {
      console.log(` ✓ (${fixes} fixes)`)
      filesFixed++
      totalFixes += fixes
    } else {
      console.log(' (no fixes needed)')
    }
  }
  
  console.log('\n======================')
  console.log(`Summary: Fixed ${totalFixes} issues in ${filesFixed} files`)
  console.log('\nRun "npm run typecheck" to verify the fixes')
}

// Run the fixer
main().catch(console.error)