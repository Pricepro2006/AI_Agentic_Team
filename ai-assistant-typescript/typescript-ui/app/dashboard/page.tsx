'use client'

import { useState, useEffect } from 'react'
import { SidebarNav } from '@/components/dashboard/sidebar-nav'
import { Header } from '@/components/dashboard/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  MessageSquare, 
  Users, 
  FileText, 
  Activity,
  RefreshCw,
  ExternalLink,
  CheckCircle,
  Circle
} from 'lucide-react'

interface SystemStats {
  ollama?: {
    status: string
    models: string[]
    primaryModel: string
  }
  api?: {
    status: string
    uptime: number
  }
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch system stats
    fetch('http://localhost:8001/api/system/stats')
      .then(res => res.json())
      .then(data => {
        setSystemStats(data)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch system stats:', err)
        setIsLoading(false)
      })
  }, [])

  const refreshStats = () => {
    setIsLoading(true)
    fetch('http://localhost:8001/api/system/stats')
      .then(res => res.json())
      .then(data => {
        setSystemStats(data)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch system stats:', err)
        setIsLoading(false)
      })
  }

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        <Header 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, User! Here's an overview of your AI Assistant.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128</div>
                <p className="text-xs text-muted-foreground">+12% from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">1 agents available</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documents Processed</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">35</div>
                <p className="text-xs text-muted-foreground">+7 in the last 24 hours</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Workflows Created</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">+2 in the last week</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Ollama Status */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <CardTitle>Ollama Status</CardTitle>
                  </div>
                  <Badge variant={systemStats?.ollama?.status === 'running' ? 'success' : 'destructive'}>
                    {systemStats?.ollama?.status === 'running' ? 'Online' : 'Offline'}
                  </Badge>
                </div>
                <CardDescription>Local LLM server for running AI models</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Server URL</span>
                    <span className="font-mono">http://localhost:11434</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Available Models</div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {systemStats?.ollama?.models?.map((model, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <Circle className="h-3 w-3 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="font-medium">{model}</div>
                          <div className="text-xs text-muted-foreground">
                            {model.includes('mini') ? '3.8B model' :
                             model.includes('7b') || model.includes('7B') ? '7.2B model' :
                             model.includes('14b') || model.includes('14B') ? '14.7B model' :
                             model.includes('8b') || model.includes('8B') ? '8.2B model' : 'Model'}
                          </div>
                        </div>
                      </div>
                    )) || (
                      <div className="text-sm text-muted-foreground">No models available</div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={refreshStats}
                    disabled={isLoading}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh Status
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://ollama.com/library" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ollama Library
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Available Agents */}
            <Card>
              <CardHeader>
                <CardTitle>Available Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Activity className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Architecture Expert</div>
                        <div className="text-sm text-muted-foreground">
                          AI agent specialized in TypeScript architecture and design patterns
                        </div>
                      </div>
                    </div>
                    <Button asChild>
                      <a href="/architecture-expert">Launch</a>
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Capabilities:</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Code Architecture Analysis</Badge>
                      <Badge variant="secondary">Design Pattern Recommendations</Badge>
                      <Badge variant="secondary">Performance Optimization</Badge>
                      <Badge variant="secondary">Best Practices Guidance</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}