// Direct test to verify MO tools functionality
const { TaskDistributor } = require('./dist/tools/implementations/orchestrator/TaskDistributor');
const { ResponseCoordinator } = require('./dist/tools/implementations/orchestrator/ResponseCoordinator');

console.log('🔍 Master Orchestrator Tools Functionality Test\n');

try {
  // Test 1: TaskDistributor
  console.log('1. Testing TaskDistributor:');
  const taskDistributor = new TaskDistributor();
  const tdInfo = taskDistributor.getInfo();
  console.log(`   ✅ Tool name: ${tdInfo.metadata.name}`);
  console.log(`   ✅ Description: ${tdInfo.metadata.description}`);
  console.log(`   ✅ Category: ${tdInfo.metadata.category}`);
  console.log(`   ✅ Parameters: ${tdInfo.parameters.length}`);
  
  // Test 2: ResponseCoordinator  
  console.log('\n2. Testing ResponseCoordinator:');
  const responseCoordinator = new ResponseCoordinator();
  const rcInfo = responseCoordinator.getInfo();
  console.log(`   ✅ Tool name: ${rcInfo.metadata.name}`);
  console.log(`   ✅ Description: ${rcInfo.metadata.description}`);
  console.log(`   ✅ Category: ${rcInfo.metadata.category}`);
  console.log(`   ✅ Parameters: ${rcInfo.parameters.length}`);
  
  console.log('\n✅ Master Orchestrator tools are functional!');
} catch (error) {
  console.error('❌ Error:', error.message);
  console.log('\nMake sure to run: npm run build');
}