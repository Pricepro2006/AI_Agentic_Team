import axios from 'axios'
import { useAuthStore } from '../auth/auth-store'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Agent API functions
export const agentAPI = {
  // Get the Architecture Expert (only agent in TypeScript system)
  getArchitectureExpert: async () => {
    const response = await apiClient.get('/agents/architecture-expert')
    return response.data
  },
  
  // Execute Architecture Expert task
  executeTask: async (task: string, context?: any) => {
    const response = await apiClient.post('/agents/architecture-expert/execute', {
      task,
      context
    })
    return response.data
  },
  
  // Get task history
  getTaskHistory: async () => {
    const response = await apiClient.get('/agents/architecture-expert/history')
    return response.data
  }
}