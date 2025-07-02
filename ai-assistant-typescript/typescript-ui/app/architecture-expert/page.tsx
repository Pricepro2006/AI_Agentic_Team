'use client'

import { useState } from 'react'
import { SidebarNav } from '@/components/dashboard/sidebar-nav'
import { Header } from '@/components/dashboard/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Building2, Send, Loader2, Brain } from 'lucide-react'
import { toast } from 'sonner'

export default function ArchitectureExpertPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [task, setTask] = useState('')
  const [context, setContext] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!task.trim()) {
      toast.error('Please enter a task description')
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      // This is a UI demo - TypeScript API not yet implemented
      // Simulating a response for demonstration purposes
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockResult = {
        task: task,
        analysis: `Architecture Analysis for: ${task}\\n\\n` +
          `Based on TypeScript best practices, here are my recommendations:\\n\\n` +
          `1. **Code Structure**: Consider organizing your code into feature-based modules\\n` +
          `2. **Type Safety**: Ensure all functions have proper type annotations\\n` +
          `3. **Design Patterns**: Apply SOLID principles where applicable\\n` +
          `4. **Performance**: Use lazy loading for large modules\\n\\n` +
          `Context considered: ${context || 'General TypeScript application'}`,
        recommendations: [
          'Use interfaces for type definitions',
          'Implement dependency injection for better testability',
          'Consider using a state management solution like Zustand or Redux',
          'Apply the Repository pattern for data access'
        ],
        timestamp: new Date().toISOString()
      }
      
      setResult(mockResult)
      toast.success('Analysis completed successfully!')
    } catch (error) {
      toast.error('Failed to analyze. Please try again.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
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
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <Brain className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Architecture Expert</h1>
            </div>
            <p className="text-muted-foreground">
              AI agent specialized in TypeScript architecture analysis and design pattern recommendations
            </p>
          </div>

          <Card>
          <CardHeader>
            <CardTitle>Architecture Analysis Request</CardTitle>
            <CardDescription>
              Describe your TypeScript architecture challenge or code structure you'd like analyzed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="task">Task Description *</Label>
                <Textarea
                  id="task"
                  placeholder="e.g., Review the architecture of my React + TypeScript application with Redux state management"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  rows={4}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="context">Additional Context (Optional)</Label>
                <Textarea
                  id="context"
                  placeholder="e.g., This is a large-scale enterprise application with 50+ components"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Analyze Architecture
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          </Card>

          {result && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>
                  Generated at {new Date(result.timestamp).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Analysis</h3>
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap bg-muted p-4 rounded-lg text-sm">
                        {result.analysis}
                      </pre>
                    </div>
                  </div>
                  
                  {result.recommendations && (
                    <div>
                      <h3 className="font-semibold mb-2">Key Recommendations</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {result.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="text-sm text-muted-foreground">{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}