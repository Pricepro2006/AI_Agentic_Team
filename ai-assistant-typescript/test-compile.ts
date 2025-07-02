// Test that our new files compile correctly
import { expertRouter } from './src/orchestration/ExpertRouter'
import { toolExecutionFramework } from './src/infrastructure/tools/ToolExecutionFramework'
import { MasterOrchestrator } from './src/agents/experts/MasterOrchestrator'

console.log('✅ All imports successful!')
console.log('ExpertRouter:', typeof expertRouter)
console.log('ToolExecutionFramework:', typeof toolExecutionFramework)
console.log('MasterOrchestrator:', typeof MasterOrchestrator)