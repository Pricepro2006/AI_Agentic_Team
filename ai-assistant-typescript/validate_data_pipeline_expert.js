const fs = require('fs');

// Read the DataPipelineExpert file
const filePath = './src/agents/experts/DataPipelineExpert.ts';
const fileContent = fs.readFileSync(filePath, 'utf8');

// Define validation checks
const checks = [
  {
    name: 'ExpertAgentTemplate import',
    pattern: /import.*ExpertAgentTemplate.*from.*ExpertAgentTemplate/,
    required: true
  },
  {
    name: 'ExpertSpecialization import',
    pattern: /import.*ExpertSpecialization.*from.*ExpertAgentTemplate/,
    required: true
  },
  {
    name: 'RAGConfig import',
    pattern: /import.*RAGConfig.*from.*ExpertAgentTemplate/,
    required: true
  },
  {
    name: 'ToolExecutionResult import',
    pattern: /import.*ToolExecutionResult.*from.*types\/agents/,
    required: true
  },
  {
    name: 'Class extends ExpertAgentTemplate',
    pattern: /class.*DataPipelineExpert.*extends.*ExpertAgentTemplate/,
    required: true
  },
  {
    name: 'ExpertSpecialization configuration',
    pattern: /const specialization.*ExpertSpecialization.*=/,
    required: true
  },
  {
    name: 'RAGConfig configuration',
    pattern: /const ragConfig.*RAGConfig.*=/,
    required: true
  },
  {
    name: 'Domain specification',
    pattern: /domain:.*data_pipeline_engineering/,
    required: true
  },
  {
    name: 'Super call with configs',
    pattern: /super\(specialization,\s*ragConfig\)/,
    required: true
  },
  {
    name: 'buildAgentConfig method',
    pattern: /protected buildAgentConfig\(\)/,
    required: true
  },
  {
    name: 'getToolDefinitions method',
    pattern: /protected getToolDefinitions\(\)/,
    required: true
  },
  {
    name: 'executeTool method',
    pattern: /protected async executeTool\(/,
    required: true
  },
  {
    name: 'executeWithRAGContext method',
    pattern: /private async executeWithRAGContext\(/,
    required: true
  },
  {
    name: 'executeTraditionalProcessing method',
    pattern: /protected async executeTraditionalProcessing\(/,
    required: true
  }
];

// Tool-specific checks
const toolChecks = [
  { name: 'pipeline_designer', pattern: /name:\s*['"']pipeline_designer['"]/ },
  { name: 'data_flow_analyzer', pattern: /name:\s*['"']data_flow_analyzer['"]/ },
  { name: 'transformation_generator', pattern: /name:\s*['"']transformation_generator['"]/ },
  { name: 'schema_evolution_manager', pattern: /name:\s*['"']schema_evolution_manager['"]/ },
  { name: 'pipeline_monitor', pattern: /name:\s*['"']pipeline_monitor['"]/ },
  { name: 'data_quality_checker', pattern: /name:\s*['"']data_quality_checker['"]/ },
  { name: 'orchestration_configurator', pattern: /name:\s*['"']orchestration_configurator['"]/ },
  { name: 'performance_optimizer', pattern: /name:\s*['"']performance_optimizer['"]/ }
];

// RAG implementation checks
const ragImplementationChecks = [
  { name: 'designPipelineWithRAG', pattern: /private async designPipelineWithRAG\(/ },
  { name: 'analyzeDataFlowWithRAG', pattern: /private async analyzeDataFlowWithRAG\(/ },
  { name: 'generateTransformationWithRAG', pattern: /private async generateTransformationWithRAG\(/ },
  { name: 'manageSchemaEvolutionWithRAG', pattern: /private async manageSchemaEvolutionWithRAG\(/ },
  { name: 'designMonitoringWithRAG', pattern: /private async designMonitoringWithRAG\(/ },
  { name: 'checkDataQualityWithRAG', pattern: /private async checkDataQualityWithRAG\(/ },
  { name: 'configureOrchestrationWithRAG', pattern: /private async configureOrchestrationWithRAG\(/ },
  { name: 'optimizePerformanceWithRAG', pattern: /private async optimizePerformanceWithRAG\(/ }
];

// Traditional implementation checks
const traditionalImplementationChecks = [
  { name: 'designPipelineTraditional', pattern: /private async designPipelineTraditional\(/ },
  { name: 'analyzeDataFlowTraditional', pattern: /private async analyzeDataFlowTraditional\(/ },
  { name: 'generateTransformationTraditional', pattern: /private async generateTransformationTraditional\(/ },
  { name: 'manageSchemaEvolutionTraditional', pattern: /private async manageSchemaEvolutionTraditional\(/ },
  { name: 'designMonitoringTraditional', pattern: /private async designMonitoringTraditional\(/ },
  { name: 'checkDataQualityTraditional', pattern: /private async checkDataQualityTraditional\(/ },
  { name: 'configureOrchestrationTraditional', pattern: /private async configureOrchestrationTraditional\(/ },
  { name: 'optimizePerformanceTraditional', pattern: /private async optimizePerformanceTraditional\(/ }
];

console.log('🔍 DataPipelineExpert Migration Validation\n');

let totalScore = 0;
let maxScore = 0;

// Check basic migration requirements
console.log('📋 Basic Migration Checks:');
checks.forEach(check => {
  maxScore++;
  const passed = check.pattern.test(fileContent);
  if (passed) {
    totalScore++;
    console.log(`  ✅ ${check.name}`);
  } else {
    console.log(`  ❌ ${check.name}`);
  }
});

// Check tool definitions
console.log('\n🛠️  Tool Definition Checks:');
toolChecks.forEach(check => {
  maxScore++;
  const passed = check.pattern.test(fileContent);
  if (passed) {
    totalScore++;
    console.log(`  ✅ ${check.name} tool defined`);
  } else {
    console.log(`  ❌ ${check.name} tool missing`);
  }
});

// Check RAG implementations
console.log('\n🧠 RAG Implementation Checks:');
ragImplementationChecks.forEach(check => {
  maxScore++;
  const passed = check.pattern.test(fileContent);
  if (passed) {
    totalScore++;
    console.log(`  ✅ ${check.name} implemented`);
  } else {
    console.log(`  ❌ ${check.name} missing`);
  }
});

// Check traditional implementations
console.log('\n🔧 Traditional Implementation Checks:');
traditionalImplementationChecks.forEach(check => {
  maxScore++;
  const passed = check.pattern.test(fileContent);
  if (passed) {
    totalScore++;
    console.log(`  ✅ ${check.name} implemented`);
  } else {
    console.log(`  ❌ ${check.name} missing`);
  }
});

// Additional quality checks
console.log('\n✨ Quality Checks:');

// Check for RAG optimization
const ragOptimization = /chunkSize:\s*650/.test(fileContent);
maxScore++;
if (ragOptimization) {
  totalScore++;
  console.log('  ✅ RAG optimized for data pipeline specs (chunkSize: 650)');
} else {
  console.log('  ❌ RAG optimization missing');
}

// Check for domain-specific knowledge areas
const knowledgeAreas = /knowledgeAreas:\s*\[/.test(fileContent);
maxScore++;
if (knowledgeAreas) {
  totalScore++;
  console.log('  ✅ Domain-specific knowledge areas defined');
} else {
  console.log('  ❌ Knowledge areas missing');
}

// Check for metadata
const migrationMetadata = /migrationVersion.*2\.0\.0/.test(fileContent);
maxScore++;
if (migrationMetadata) {
  totalScore++;
  console.log('  ✅ Migration metadata present');
} else {
  console.log('  ❌ Migration metadata missing');
}

// Check for tool categories
const toolCategories = /ToolCategory\./.test(fileContent);
maxScore++;
if (toolCategories) {
  totalScore++;
  console.log('  ✅ Tool categories properly defined');
} else {
  console.log('  ❌ Tool categories missing');
}

// Calculate final score
const percentage = ((totalScore / maxScore) * 100).toFixed(1);

console.log('\n📊 Migration Results:');
console.log(`Score: ${totalScore}/${maxScore} (${percentage}%)`);

if (percentage >= 95) {
  console.log('🎉 EXCELLENT: Migration completed successfully!');
} else if (percentage >= 85) {
  console.log('✅ GOOD: Migration mostly complete with minor issues');
} else if (percentage >= 70) {
  console.log('⚠️  FAIR: Migration needs improvements');
} else {
  console.log('❌ POOR: Migration incomplete or failed');
}

console.log('\n📝 Summary:');
console.log(`- Class migrated from BaseAgent to ExpertAgentTemplate: ${/extends.*ExpertAgentTemplate/.test(fileContent) ? 'YES' : 'NO'}`);
console.log(`- RAG configuration enabled: ${/ragConfig.*enabled:\s*true/.test(fileContent) ? 'YES' : 'NO'}`);
console.log(`- Tools implemented: ${toolChecks.filter(check => check.pattern.test(fileContent)).length}/8`);
console.log(`- RAG implementations: ${ragImplementationChecks.filter(check => check.pattern.test(fileContent)).length}/8`);
console.log(`- Traditional fallbacks: ${traditionalImplementationChecks.filter(check => check.pattern.test(fileContent)).length}/8`);
console.log(`- Expert specialization configured: ${/ExpertSpecialization/.test(fileContent) ? 'YES' : 'NO'}`);
console.log(`- MO-Expert hybrid pattern: ${/mo-expert-hybrid/.test(fileContent) ? 'YES' : 'NO'}`);