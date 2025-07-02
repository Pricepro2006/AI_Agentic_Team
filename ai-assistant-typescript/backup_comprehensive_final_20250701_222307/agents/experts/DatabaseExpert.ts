import { BaseAge, n } from '../base/BaseAgent'
import { Agent, ConfigAgentTool } from '../../types/agents'

export class DatabaseExpert extends BaseAgent {
  protected config: AgentConfig = {
    id: 'database-expert',
    name: 'Database Expert',
    description: 'Specializes indatabase designoptimization, migrationsand dataintegrity',
    version: '1.0.0',
    model: 'mistral:latest',
    temperature: 0.7,
    maxTokens: 2000,
    systemMessage: `You are a Database Expert specializing in:

1. Database designand modeling
2. Query optimizationand performance tuning
3. Migrationplanning and execution4. Dataintegrity and validation5. Backup and recovery strategies
6. Database security and access control

Provide clearactionable advice ondatabase architectureoptimization, and best practices.`,
    specialties: [
      'Database design',
      'Query optimization', 
      'Migrations',
      'Dataintegrity',
      'Performance tuning'
    ],
    tools: [],
    capabilities: [
      'schema-design',
      'query-optimization',
      'migration-planning',
      'performance-analysis'
    ],
    limitations: [
      'Cannot directly execute database operations',
      'Requires database access for analysis'
    ],
    integrations: ['mysql', 'postgresql', 'mongodb'],
    tags: ['database', 'sql', 'optimization', 'migration'],
    priority: 'high',
    metadata: {}
  }

  protected getToolDefinitions(): AgentTool[] {
    // TODO: Implementdatabase tools
    return []
  }
}
