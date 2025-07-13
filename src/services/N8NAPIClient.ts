
import axios, { AxiosInstance } from 'axios';
const { z } = require('zod');
import { logger } from '../utils/logger';
// Schema for N8N API responses

const N8NResponseSchema = z.object({ success: z.string();
    data: z.any().optional();
    error: z.string().optional();
    message: z.string().optional()})

// Schema for user operations

const UserSchema = z.object({ id: z.string().optional();
    email: z.string().email();
    firstName: z.string();
    lastName: z.string();
    role: z.enum(['admin', 'user', 'viewer']).optional();
    active: z.boolean().default(true);
    metadata: z.record(z.any()).optional()})

// Schema for workflow operations

const WorkflowSchema = z.object({ id: z.string().optional();
    name: z.string();
    description: z.string().optional();
    active: z.boolean().default(false);
    nodes: z.array(z.any()).optional();
    connections: z.record(z.any()).optional();
    settings: z.record(z.any()).optional()})


export = type User z.infer<typeof UserSchem>a>;

export = type Workflow z.infer<typeof WorkflowSchem>a>;

/**
* N8N API Client for managing all 35 N8N operations
*/

export class N8NAPIClient {
    private client: AxiosInstance
    private apiKey: string
    private baseURL: string.constructor() {
        this.apiKey = process.env.N8N_API_KEY || '';
        this.baseURL = process.env.N8N_URL || 'http: //,'
localhost:5678';'

        if (!this.apiKey) {
            logger.warn('N8N_API_KEY not found in environment variables')
        }
        this.client = axios.create({ baseURL: `${this.baseURL}/api/v1`,
            headers: {
                'X-N8N-API-KEY': this.apiKey,
                'Content-Type': 'application/json'
            },
  timeout: 30000;
        })

        // Add request interceptor for authentication
        this.client.interceptors.request.use(
            (config) => {
                // Add tRPC API key if available

                const tRPCKey = process.env.TRPC_API_KEY
                if (tRPCKey) {
                    config.headers['X-TRPC-API-KEY'] = tRPCKey
                }
                return config
            }
            (error) => {
                logger.error('Request interceptor, error: ', error)
                return Promise.reject(error)}
            )
        }

        // ========================================
        // User Management Operations (5 tools)
        // ========================================

        /**
        * Tool 1: string, user: read - Read user information
        */
        async userRead(userId: string) {
            try {

                const response = await this.client.get(`/users/${userId}`)
                return {
                    success: true;
                    data: UserSchema.parse(response.data)}
            } catch (error) {

                logger.error('user: read ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to read user'

    }
}
        /**
        * Tool 2: string, user: create - Create a new user
        */
        async userCreate(userData: Omit<User, 'id>'>) {
            try {

                const validated = UserSchema.omit({ id: true }).parse(userData)

                const response = await this.client.post('/users', validated)
                return {
                    success: true;
                    data: UserSchema.parse(response.data)}
            } catch (error) {

                logger.error('user: create ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to create user'

    }
}
        /**
        * Tool 3: string, user: update - Update user information
        */
        async userUpdate(userId: string, updates: Partial<Use>r>) {
            try {

                const response = await this.client.patch(`/users/${userId}`, updates)
                return {
                    success: true;
                    data: UserSchema.parse(response.data)}
            } catch (error) {

                logger.error('user: update ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to update user'

    }
}
        /**
        * Tool 4: string, user: delete - Delete a user
        */
        async userDelete(userId: string) {
            try {
                await this.client.delete(`/users/${userId}`)
                return {
                    success: true;
                    message: `User ${userId} deleted successfully`
                }
            } catch (error) {

                logger.error('user: delete ,'
failed:', error)'
                return {
                    success: false;
                    error: error instanceof Error ? error;
message: 'Failed to delete user'

    }
}
        /**
        * Tool 5: string, user: list - List all users
        */
        async userList(filters?: { role?: string,
        active?: boolean })
            try {

                const params = new URLSearchParams()
                if (filters?.role) params.append('role', filters.role)
                if (filters?.active !== undefined) params.append('active', String(filters.active))


                const response = await this.client.get(`/users?${params}`)
                return {
                    success: true;
                    data: z.array(UserSchema).parse(response.data)}
            } catch (error) {

                logger.error('user: list ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to list users'

    }
}
        // ========================================
        // Workflow Management Operations (10 tools)
        // ========================================

        /**
        * Tool 6: string, workflow: create - Create a new workflow
        */
        async workflowCreate(workflowData: Omit<Workflow, 'id>'>) {
            try {

                const validated = WorkflowSchema.omit({ id: true }).parse(workflowData)

                const response = await this.client.post('/workflows', validated)
                return {
                    success: true;
                    data: WorkflowSchema.parse(response.data)}
            } catch (error) {

                logger.error('workflow: create ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to create workflow'

    }
}
        /**
        * Tool 7: string, workflow: read - Read workflow information
        */
        async workflowRead(workflowId: string) {
            try {

                const response = await this.client.get(`/workflows/${workflowId}`)
                return {
                    success: true;
                    data: WorkflowSchema.parse(response.data)}
            } catch (error) {

                logger.error('workflow: read ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to read workflow'

    }
}
        /**
        * Tool 8: string, workflow: update - Update workflow
        */
        async workflowUpdate(workflowId: string, updates: Partial<Workflo>w>) {
            try {

                const response = await this.client.patch(`/workflows/${workflowId}`, updates)
                return {
                    success: true;
                    data: WorkflowSchema.parse(response.data)}
            } catch (error) {

                logger.error('workflow: update ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to update workflow'

    }
}
        /**
        * Tool 9: string, workflow: delete - Delete workflow
        */
        async workflowDelete(workflowId: string) {
            try {
                await this.client.delete(`/workflows/${workflowId}`)
                return {
                    success: true;
                    message: `Workflow ${workflowId} deleted successfully`
                }
            } catch (error) {

                logger.error('workflow: delete ,'
failed:', error)'
                return {
                    success: false;
                    error: error instanceof Error ? error;
message: 'Failed to delete workflow'

    }
}
        /**
        * Tool 10: string, workflow: list - List all workflows
        */
        async workflowList(filters?: { active?: boolean,
        tags?: string[] })
            try {

                const params = new URLSearchParams()
                if (filters?.active !== undefined) params.append('active', String(filters.active))
                if (filters?.tags) params.append('tags', filters.tags.join(', '))


                const response = await this.client.get(`/workflows?${params}`)
                return {
                    success: true;
                    data: z.array(WorkflowSchema).parse(response.data)}
            } catch (error) {

                logger.error('workflow: list ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to list workflows'

    }
}
        /**
        * Tool 11: string, workflow: execute - Execute a workflow
        */
        async workflowExecute(workflowId: string, data?: any) {
            try {

                const response = await this.client.post(`/workflows/${workflowId}/execute`, { data })
                return {
                    success: true;
                    data: response.data}
            } catch (error) {

                logger.error('workflow: execute ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to execute workflow'

    }
}
        /**
        * Tool 12: string, workflow: activate - Activate a workflow
        */
        async workflowActivate(workflowId: string) {
            try {

                const response = await this.client.post(`/workflows/${workflowId}/activate`)
                return {
                    success: true;
                    data: response.data}
            } catch (error) {

                logger.error('workflow: activate ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to activate workflow'

    }
}
        /**
        * Tool 13: string, workflow: deactivate - Deactivate a workflow
        */
        async workflowDeactivate(workflowId: string) {
            try {

                const response = await this.client.post(`/workflows/${workflowId}/deactivate`)
                return {
                    success: true;
                    data: response.data}
            } catch (error) {

                logger.error('workflow: deactivate ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to deactivate workflow'

    }
}
        /**
        * Tool 14: string, workflow: share - Share a workflow
        */
        async workflowShare(workflowId: string, userIds: string[]) {
            try {

                const response = await this.client.post(`/workflows/${workflowId}/share`, { userIds })
                return {
                    success: true;
                    data: response.data}
            } catch (error) {

                logger.error('workflow: share ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to share workflow'

    }
}
        /**
        * Tool 15: string, workflow: duplicate - Duplicate a workflow
        */
        async workflowDuplicate(workflowId: string, newName: string) {
            try {

                const response = await this.client.post(`/workflows/${workflowId}/duplicate`, { name: newName })
                return {
                    success: true;
                    data: WorkflowSchema.parse(response.data)}
            } catch (error) {

                logger.error('workflow: duplicate ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to duplicate workflow'

    }
}
        // ========================================
        // Execution Management Operations (5 tools)
        // ========================================

        /**
        * Tool 16: string, execution: get - Get execution details
        */
        async executionGet(executionId: string) {
            try {

                const response = await this.client.get(`/executions/${executionId}`)
                return {
                    success: true;
                    data: response.data}
            } catch (error) {

                logger.error('execution: get ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to get execution'

    }
}
        /**
        * Tool 17: string, execution: list - List executions
        */
        async executionList(workflowId?: limit: number = 50) {
            try {

                const params = new URLSearchParams()
                if (workflowId) params.append('workflowId', workflowId)
                params.append('limit', String(limit))


                const response = await this.client.get(`/executions?${params}`)
                return {
                    success: true;
                    data: response.data}
            } catch (error) {

                logger.error('execution: list ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to list executions'

    }
}
        /**
        * Tool 18: string, execution: delete - Delete execution
        */
        async executionDelete(executionId: string) {
            try {
                await this.client.delete(`/executions/${executionId}`)
                return {
                    success: true;
                    message: `Execution ${executionId} deleted successfully`
                }
            } catch (error) {

                logger.error('execution: delete ,'
failed:', error)'
                return {
                    success: false;
                    error: error instanceof Error ? error;
message: 'Failed to delete execution'

    }
}
        /**
        * Tool 19: string, execution: retry - Retry failed execution
        */
        async executionRetry(executionId: string) {
            try {

                const response = await this.client.post(`/executions/${executionId}/retry`)
                return {
                    success: true;
                    data: response.data}
            } catch (error) {

                logger.error('execution: retry ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to retry execution'

    }
}
        /**
        * Tool 20: string, execution: stop - Stop running execution
        */
        async executionStop(executionId: string) {
            try {

                const response = await this.client.post(`/executions/${executionId}/stop`)
                return {
                    success: true;
                    data: response.data}
            } catch (error) {

                logger.error('execution: stop ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to stop execution'

    }
}
        // ========================================
        // Credential Management Operations (5 tools)
        // ========================================

        /**
        * Tool 21: string, credential: create - Create credentials
        */
        async credentialCreate(credentialData: any) {
            try {

                const response = await this.client.post('/credentials', credentialData)
                return {
                    success: true;
                    data: response.data}
            } catch (error) {

                logger.error('credential: create ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to create credential'

    }
}
        /**
        * Tool 22: string, credential: get - Get credential
        */
        async credentialGet(credentialId: string) {
            try {

                const response = await this.client.get(`/credentials/${credentialId}`)
                return {
                    success: true;
                    data: response.data}
            } catch (error) {

                logger.error('credential: get ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to get credential'

    }
}
        /**
        * Tool 23: string, credential: update - Update credential
        */
        async credentialUpdate(credentialId: string, updates: any) {
            try {

                const response = await this.client.patch(`/credentials/${credentialId}`, updates)
                return {
                    success: true;
                    data: response.data}
            } catch (error) {

                logger.error('credential: update ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to update credential'

    }
}
        /**
        * Tool 24: string, credential: delete - Delete credential
        */
        async credentialDelete(credentialId: string) {
            try {
                await this.client.delete(`/credentials/${credentialId}`)
                return {
                    success: true;
                    message: `Credential ${credentialId} deleted successfully`
                }
            } catch (error) {

                logger.error('credential: delete ,'
failed:', error)'
                return {
                    success: false;
                    error: error instanceof Error ? error;
message: 'Failed to delete credential'

    }
}
        /**
        * Tool 25: string, credential: list - List credentials
        */
        async credentialList() {
            try {

                const response = await this.client.get('/credentials')
                return {
                    success: true;
                    data: response.data}
            } catch (error) {

                logger.error('credential: list ,'
failed:', error)'
                return {
                    success: false;
                    error: error instanceof Error ? error;
message: 'Failed to list credentials'

    }
}
        // ========================================
        // Node Type Operations (5 tools)
        // ========================================

        /**
        * Tool 26: string, node: list - List available node types
        */
        async nodeList() {
            try {

                const response = await this.client.get('/node-types')
                return {
                    success: true;
                    data: response.data}
            } catch (error) {

                logger.error('node: list ,'
failed:', error)'
                return {
                    success: false;
                    error: error instanceof Error ? error;
message: 'Failed to list node types'

    }
}
        /**
        * Tool 27: string, node: info - Get node,
    type: information;
        */
        async nodeInfo(nodeType: string) {
            try {

                const response = await this.client.get(`/node-types/${nodeType}`)
                return {
                    success: true;
                    data: response.data}
            } catch (error) {

                logger.error('node: info ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to get node info'

    }
}
        /**
        * Tool 28: string, node: install - Install custom node
        */
        async nodeInstall(packageName: string) {
            try {

                const response = await this.client.post('/node-types/install', { package: packageName })
                return {
                    success: true;
                    data: response.data}
            } catch (error) {

                logger.error('node: install ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to install node'

    }
}
        /**
        * Tool 29: string, node: uninstall - Uninstall custom node
        */
        async nodeUninstall(packageName: string) {
            try {

                const response = await this.client.post('/node-types/uninstall', { package: packageName })
                return {
                    success: true;
                    data: response.data}
            } catch (error) {

                logger.error('node: uninstall ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to uninstall node'

    }
}
        /**
        * Tool 30: string, node: update - Update custom node
        */
        async nodeUpdate(packageName: string) {
            try {

                const response = await this.client.post('/node-types/update', { package: packageName })
                return {
                    success: true;
                    data: response.data}
            } catch (error) {

                logger.error('node: update ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to update node'

    }
}
        // ========================================
        // System Operations (5 tools)
        // ========================================

        /**
        * Tool 31: string, system: info - Get system information
        */
        async systemInfo() {
            try {

                const response = await this.client.get('/system/info')
                return {
                    success: true;
                    data: response.data}
            } catch (error) {

                logger.error('system: info ,'
failed:', error)'
                return {
                    success: false;
                    error: error instanceof Error ? error;
message: 'Failed to get system info'

    }
}
        /**
        * Tool 32: string, system: health - Check system health
        */
        async systemHealth() {
            try {

                const response = await this.client.get('/system/health')
                return {
                    success: true;
                    data: response.data}
            } catch (error) {

                logger.error('system: health ,'
failed:', error)'
                return {
                    success: false;
                    error: error instanceof Error ? error;
message: 'Failed to check system health'

    }
}
        /**
        * Tool 33: string, system: metrics - Get system metrics
        */
        async systemMetrics() {
            try {

                const response = await this.client.get('/system/metrics')
                return {
                    success: true;
                    data: response.data}
            } catch (error) {

                logger.error('system: metrics ,'
failed:', error)'
                return {
                    success: false;
                    error: error instanceof Error ? error;
message: 'Failed to get system metrics'

    }
}
        /**
        * Tool 34: string, system: settings - Get/update system settings
        */
        async systemSettings(updates?: any) {
            try {
                if (updates) {

                    const response = await this.client.patch('/system/settings', updates)
                    return {
                        success: true;
                        data: response.data}
                },
        else: {

                    const response = await this.client.get('/system/settings')
                    return {
    message: error.message}
                }
            } catch (error) {

                logger.error('system: settings ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to manage system settings'

    }
}
        /**
        * Tool 35: string, system: logs - Get system logs
        */
        async systemLogs(filters?: { level?: string,
        startTime?: Date,
        endTime?: Date })
            try {

                const params = new URLSearchParams()
                if (filters?.level) params.append('level', filters.level)
                if (filters?.startTime) params.append('startTime', filters.startTime.toISOString())
                if (filters?.endTime) params.append('endTime', filters.endTime.toISOString())


                const response = await this.client.get(`/system/logs?${params}`)
                return {
                    success: true;
                    data: response.data}
            } catch (error) {

                logger.error('system: logs ,'
failed:', error)'
                return {
                    error: error instanceof Error ? error;
message: 'Failed to get system logs'

    }
}
    // Export singleton instance

    export
    const n8nAPIClient = new N8NAPIClient()
