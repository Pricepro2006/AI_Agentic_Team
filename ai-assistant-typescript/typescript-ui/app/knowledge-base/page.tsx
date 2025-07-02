'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/auth/auth-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Brain, Loader2, Database, Search,
  Settings, Plus, RefreshCw, Info, BookOpen,
  FileText, Link, Image, Hash, Calendar,
  Users, Shield, Cpu, Code, TestTube, MessageSquare
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ExpertKnowledgeBase {
  id: string
  name: string
  icon: any
  color: string
  description: string
  stats: {
    documents: number
    queries: number
    lastUpdated: string
  }
}

export default function KnowledgeBasePage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const expertKnowledgeBases: ExpertKnowledgeBase[] = [
    {
      id: 'database-expert',
      name: 'Database Expert',
      icon: Database,
      color: 'text-blue-500',
      description: 'SQL, schema design, query optimization, and database best practices',
      stats: {
        documents: 342,
        queries: 1250,
        lastUpdated: '2 hours ago'
      }
    },
    {
      id: 'vector-search-expert',
      name: 'Vector Search Expert',
      icon: Search,
      color: 'text-purple-500',
      description: 'Embeddings, semantic search, vector databases, and RAG systems',
      stats: {
        documents: 189,
        queries: 650,
        lastUpdated: '5 hours ago'
      }
    },
    {
      id: 'architecture-expert',
      name: 'Architecture Expert',
      icon: Code,
      color: 'text-indigo-500',
      description: 'System design, microservices, scalability, and design patterns',
      stats: {
        documents: 456,
        queries: 2100,
        lastUpdated: '1 hour ago'
      }
    },
    {
      id: 'security-specialist',
      name: 'Security Specialist',
      icon: Shield,
      color: 'text-red-500',
      description: 'Security vulnerabilities, encryption, authentication, and OWASP',
      stats: {
        documents: 278,
        queries: 890,
        lastUpdated: '3 hours ago'
      }
    },
    {
      id: 'performance-optimization-expert',
      name: 'Performance Expert',
      icon: Cpu,
      color: 'text-orange-500',
      description: 'Performance profiling, optimization, memory management, and benchmarking',
      stats: {
        documents: 167,
        queries: 430,
        lastUpdated: '6 hours ago'
      }
    },
    {
      id: 'testing-qa-expert',
      name: 'Testing & QA Expert',
      icon: TestTube,
      color: 'text-green-500',
      description: 'Unit testing, integration testing, E2E testing, and quality assurance',
      stats: {
        documents: 234,
        queries: 780,
        lastUpdated: '4 hours ago'
      }
    }
  ]

  const handleSearch = async () => {
    if (!searchQuery || !selectedExpert) return
    
    setIsLoading(true)
    try {
      // Simulate search
      await new Promise(resolve => setTimeout(resolve, 1500))
      // In real implementation, this would search the expert's knowledge base
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b glass backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push('/dashboard')}
                className="hover:bg-primary/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Knowledge Base</h1>
                  <p className="text-sm text-muted-foreground">
                    Expert knowledge bases powered by RAG
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                RAG Enabled
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="glass border-0 shadow-lg p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="search" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white">
              Search All
            </TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white">
              Recent Activity
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white">
              Statistics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Expert Knowledge Bases Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {expertKnowledgeBases.map((expert, index) => (
                <motion.div
                  key={expert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="border-0 shadow-xl hover:shadow-2xl transition-all cursor-pointer group"
                    onClick={() => setSelectedExpert(expert.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
                            expert.color === 'text-blue-500' && "from-blue-500 to-blue-600",
                            expert.color === 'text-purple-500' && "from-purple-500 to-purple-600",
                            expert.color === 'text-indigo-500' && "from-indigo-500 to-indigo-600",
                            expert.color === 'text-red-500' && "from-red-500 to-red-600",
                            expert.color === 'text-orange-500' && "from-orange-500 to-orange-600",
                            expert.color === 'text-green-500' && "from-green-500 to-green-600"
                          )}>
                            <expert.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{expert.name}</CardTitle>
                            <CardDescription className="text-xs">
                              {expert.stats.documents} documents
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {expert.description}
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Queries</span>
                          <span className="font-medium">{expert.stats.queries.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Last Updated</span>
                          <span className="font-medium">{expert.stats.lastUpdated}</span>
                        </div>
                        
                        <div className="pt-3 border-t">
                          <Button 
                            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 text-white group-hover:shadow-lg transition-all"
                            onClick={(e) => {
                              e.stopPropagation()
                              router.push(`/knowledge-base/${expert.id}`)
                            }}
                          >
                            <Search className="h-4 w-4 mr-2" />
                            Search Knowledge
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Knowledge Sources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Knowledge Sources</CardTitle>
                  <CardDescription>
                    Content automatically scraped and indexed from various sources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                        <FileText className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium">Documentation</p>
                        <p className="text-sm text-muted-foreground">12,450 pages</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                        <Link className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Web Pages</p>
                        <p className="text-sm text-muted-foreground">8,320 URLs</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                        <MessageSquare className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="font-medium">Discussions</p>
                        <p className="text-sm text-muted-foreground">3,890 threads</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                        <Hash className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-medium">Code Snippets</p>
                        <p className="text-sm text-muted-foreground">15,670 examples</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="search">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Search All Knowledge Bases</CardTitle>
                <CardDescription>
                  Search across all expert knowledge bases simultaneously
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="global-search">Search Query</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="global-search"
                      placeholder="Enter your search query..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSearch}
                      disabled={!searchQuery || isLoading}
                      className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 text-white"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                      <span className="ml-2">Search All</span>
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p>
                    This will search across all expert knowledge bases and return results grouped by expert domain. 
                    For more focused results, search within individual expert knowledge bases.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest additions and updates to the knowledge bases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: 'scrape',
                      title: 'PostgreSQL 16 Documentation',
                      expert: 'Database Expert',
                      time: '10 minutes ago',
                      icon: Link,
                      color: 'text-blue-500'
                    },
                    {
                      type: 'upload',
                      title: 'Microservices Design Patterns',
                      expert: 'Architecture Expert',
                      time: '1 hour ago',
                      icon: FileText,
                      color: 'text-indigo-500'
                    },
                    {
                      type: 'scrape',
                      title: 'OWASP Top 10 2024',
                      expert: 'Security Specialist',
                      time: '2 hours ago',
                      icon: Shield,
                      color: 'text-red-500'
                    },
                    {
                      type: 'index',
                      title: 'React Performance Guide',
                      expert: 'Performance Expert',
                      time: '3 hours ago',
                      icon: Cpu,
                      color: 'text-orange-500'
                    }
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg",
                        activity.color === 'text-blue-500' && "bg-blue-500/10",
                        activity.color === 'text-indigo-500' && "bg-indigo-500/10",
                        activity.color === 'text-red-500' && "bg-red-500/10",
                        activity.color === 'text-orange-500' && "bg-orange-500/10"
                      )}>
                        <activity.icon className={cn("h-5 w-5", activity.color)} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.expert} • {activity.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-0 shadow-xl">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">40,350</div>
                  <p className="text-xs text-muted-foreground">Total Documents</p>
                  <Progress value={85} className="mt-2" />
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">6,250</div>
                  <p className="text-xs text-muted-foreground">Total Queries</p>
                  <Progress value={65} className="mt-2" />
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">12.5GB</div>
                  <p className="text-xs text-muted-foreground">Storage Used</p>
                  <Progress value={42} className="mt-2" />
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">99.8%</div>
                  <p className="text-xs text-muted-foreground">Query Success Rate</p>
                  <Progress value={99.8} className="mt-2" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}