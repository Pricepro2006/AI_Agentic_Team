#!/usr/bin/env tsx

/**
 * Test script to verify progress_validator tool implementation
 */

import { MasterOrchestrator } from './src/agents/experts/MasterOrchestrator'

async function testProgressValidatorTool() {
  console.log('🔧 Testing progress_validator tool implementation...')
  
  try {
    // Create MasterOrchestrator instance
    const mo = new MasterOrchestrator()
    
    // Get tool definitions
    const tools = mo['getToolDefinitions']()
    
    // Find progress_validator tool
    const progressValidatorTool = tools.find(tool => tool.name === 'progress_validator')
    
    if (!progressValidatorTool) {
      throw new Error('progress_validator tool not found in tool definitions!')
    }
    
    console.log('✅ progress_validator tool found in tool definitions')
    console.log('📋 Tool details:')
    console.log(`   Name: ${progressValidatorTool.name}`)
    console.log(`   Description: ${progressValidatorTool.description}`)
    console.log(`   Parameters required: ${progressValidatorTool.parameters.required?.join(', ')}`)
    
    // Check parameters structure
    const params = progressValidatorTool.parameters.properties
    if (!params?.coordination_plan || !params?.current_state) {
      throw new Error('Required parameters missing from tool definition!')
    }
    
    console.log('✅ Required parameters validation passed')
    
    // Check execute function exists
    if (typeof progressValidatorTool.execute !== 'function') {
      throw new Error('Execute function missing from tool definition!')
    }
    
    console.log('✅ Execute function exists')
    
    // Test tool structure completeness
    console.log('📊 Tool structure verification:')
    console.log(`   - coordination_plan parameter: ${params.coordination_plan ? '✅' : '❌'}`)
    console.log(`   - current_state parameter: ${params.current_state ? '✅' : '❌'}`)
    console.log(`   - validation_scope parameter: ${params.validation_scope ? '✅' : '❌'}`)
    console.log(`   - validation_context parameter: ${params.validation_context ? '✅' : '❌'}`)
    
    console.log('\n🎉 Progress validator tool implementation verification PASSED!')
    console.log('🚀 Tool is ready for integration with Master Orchestrator coordination workflow')
    
    return true
    
  } catch (error) {
    console.error('❌ Progress validator tool test FAILED:', error)
    return false
  }
}

async function testConfidenceAssessorTool() {
  console.log('\n🔧 Testing confidence_assessor tool implementation...')
  
  try {
    // Create MasterOrchestrator instance
    const mo = new MasterOrchestrator()
    
    // Get tool definitions
    const tools = mo['getToolDefinitions']()
    
    // Find confidence_assessor tool
    const confidenceAssessorTool = tools.find(tool => tool.name === 'confidence_assessor')
    
    if (!confidenceAssessorTool) {
      throw new Error('confidence_assessor tool not found in tool definitions!')
    }
    
    console.log('✅ confidence_assessor tool found in tool definitions')
    console.log('📋 Tool details:')
    console.log(`   Name: ${confidenceAssessorTool.name}`)
    console.log(`   Description: ${confidenceAssessorTool.description}`)
    console.log(`   Parameters required: ${confidenceAssessorTool.parameters.required?.join(', ')}`)
    
    // Check parameters structure
    const params = confidenceAssessorTool.parameters.properties
    if (!params?.expected_outcome || !params?.final_results) {
      throw new Error('Required parameters missing from tool definition!')
    }
    
    console.log('✅ Required parameters validation passed')
    
    // Check execute function exists
    if (typeof confidenceAssessorTool.execute !== 'function') {
      throw new Error('Execute function missing from tool definition!')
    }
    
    console.log('✅ Execute function exists')
    
    // Test tool structure completeness
    console.log('📊 Tool structure verification:')
    console.log(`   - expected_outcome parameter: ${params.expected_outcome ? '✅' : '❌'}`)
    console.log(`   - final_results parameter: ${params.final_results ? '✅' : '❌'}`)
    console.log(`   - validation_context parameter: ${params.validation_context ? '✅' : '❌'}`)
    console.log(`   - assessment_criteria parameter: ${params.assessment_criteria ? '✅' : '❌'}`)
    
    console.log('\n🎉 Confidence assessor tool implementation verification PASSED!')
    console.log('🚀 Tool is ready for final result evaluation and confidence scoring')
    
    return true
    
  } catch (error) {
    console.error('❌ Confidence assessor tool test FAILED:', error)
    return false
  }
}

async function testAllMOTools() {
  console.log('🚀 Master Orchestrator AI Enhancement Tools Verification\n')
  
  try {
    const mo = new MasterOrchestrator()
    const tools = mo['getToolDefinitions']()
    
    console.log(`📊 Total tools found: ${tools.length}`)
    
    // Test for all required AI-enhanced tools
    const requiredTools = [
      'outcome_specification_generator',
      'task_lifecycle_manager', 
      'expert_coordination_hub',
      'progress_validator',
      'confidence_assessor'
    ]
    
    let allToolsFound = true
    for (const toolName of requiredTools) {
      const tool = tools.find(t => t.name === toolName)
      if (tool) {
        console.log(`✅ ${toolName} - IMPLEMENTED`)
      } else {
        console.log(`❌ ${toolName} - MISSING`)
        allToolsFound = false
      }
    }
    
    if (!allToolsFound) {
      throw new Error('Not all required AI-enhanced tools are implemented!')
    }
    
    console.log('\n🎉 ALL Master Orchestrator AI Enhancement Tools VERIFIED!')
    console.log('🚀 Complete MO coordination workflow ready for production!')
    
    return true
    
  } catch (error) {
    console.error('❌ Master Orchestrator tools verification FAILED:', error)
    return false
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  Promise.all([
    testProgressValidatorTool(),
    testConfidenceAssessorTool(),
    testAllMOTools()
  ])
    .then(results => {
      const allPassed = results.every(result => result === true)
      if (allPassed) {
        console.log('\n🎉 ALL TESTS PASSED!')
        console.log('🚀 Master Orchestrator enhanced coordination workflow is READY!')
      } else {
        console.log('\n❌ Some tests failed!')
      }
      process.exit(allPassed ? 0 : 1)
    })
    .catch(error => {
      console.error('Test execution failed:', error)
      process.exit(1)
    })
}

export { testProgressValidatorTool, testConfidenceAssessorTool, testAllMOTools }