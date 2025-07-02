'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/auth/auth-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Network, Loader2, Database, Search,
  Settings, Upload, Download, Zap, Shield, Plus,
  Trash2, RefreshCw, Info
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function VectorSearchPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDatabase, setSelectedDatabase] = useState('chroma')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [connections, setConnections] = useState<any[]>([
    { id: '1', name: 'Local Chroma', type: 'chroma', status: 'connected', vectors: 15420 },
    { id: '2', name: 'Pinecone Prod', type: 'pinecone', status: 'disconnected', vectors: 0 }
  ])

  const handleSearch = async () => {
    if (!searchQuery) return
    
    setIsLoading(true)
    try {
      // Simulate search
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setSearchResults([
        {
          id: '1',
          content: 'TypeScript best practices for large-scale applications...',
          score: 0.95,
          metadata: { source: 'Architecture Guide', expert: 'architecture-expert' }
        },
        {
          id: '2',
          content: 'Implementing vector search with pgvector and TypeScript...',
          score: 0.89,
          metadata: { source: 'Technical Blog', expert: 'vector-search-expert' }
        },
        {
          id: '3',
          content: 'Database indexing strategies for performance optimization...',
          score: 0.84,
          metadata: { source: 'Database Docs', expert: 'database-expert' }
        }
      ])
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent-purple/5">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b glass backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push('/dashboard')}
                className="hover:bg-accent-purple/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-purple to-accent-purple/80 shadow-lg">
                  <Network className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Vector Search Expert</h1>
                  <p className="text-sm text-muted-foreground">
                    Semantic search and knowledge retrieval
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-accent-purple/10 text-accent-purple border-accent-purple/20">
                6 Tools Available
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="glass border-0 shadow-lg p-1">
            <TabsTrigger value="search" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent-purple data-[state=active]:to-accent-purple/80 data-[state=active]:text-white">
              Semantic Search
            </TabsTrigger>
            <TabsTrigger value="databases" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent-purple data-[state=active]:to-accent-purple/80 data-[state=active]:text-white">
              Databases
            </TabsTrigger>
            <TabsTrigger value="embeddings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent-purple data-[state=active]:to-accent-purple/80 data-[state=active]:text-white">
              Embeddings
            </TabsTrigger>
            <TabsTrigger value="indexes" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent-purple data-[state=active]:to-accent-purple/80 data-[state=active]:text-white">
              Indexes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            {/* Search Interface */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Semantic Search</CardTitle>
                  <CardDescription>
                    Search across all knowledge bases using natural language
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="search">Search Query</Label>
                    <div className="flex space-x-2">
                      <Textarea
                        id="search"
                        placeholder="Enter your search query in natural language..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 min-h-[80px]"
                      />
                    </div>
                  </div>

                  <div className="flex items-end space-x-4">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="database">Database</Label>
                      <Select value={selectedDatabase} onValueChange={setSelectedDatabase}>
                        <SelectTrigger id="database">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="chroma">Chroma (Local)</SelectItem>
                          <SelectItem value="pinecone">Pinecone</SelectItem>
                          <SelectItem value="weaviate">Weaviate</SelectItem>
                          <SelectItem value="qdrant">Qdrant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex-1 space-y-2">
                      <Label htmlFor="topk">Results</Label>
                      <Select defaultValue="5">
                        <SelectTrigger id="topk">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">Top 5</SelectItem>
                          <SelectItem value="10">Top 10</SelectItem>
                          <SelectItem value="20">Top 20</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={handleSearch}
                      disabled={!searchQuery || isLoading}
                      className="bg-gradient-to-r from-accent-purple to-accent-purple/80 hover:opacity-90 text-white"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                      <span className="ml-2">Search</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle>Search Results</CardTitle>
                    <CardDescription>
                      Found {searchResults.length} relevant results
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {searchResults.map((result, index) => (
                        <motion.div
                          key={result.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {result.content}
                              </p>
                              <div className="flex items-center space-x-4 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {result.metadata.source}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {result.metadata.expert}
                                </Badge>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-right">
                                <p className="text-sm font-medium text-accent-purple">
                                  {(result.score * 100).toFixed(1)}%
                                </p>
                                <p className="text-xs text-muted-foreground">Similarity</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="databases" className="space-y-6">
            {/* Database Connections */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Vector Database Connections</CardTitle>
                      <CardDescription>
                        Manage your vector database connections
                      </CardDescription>
                    </div>
                    <Button className="bg-gradient-to-r from-accent-purple to-accent-purple/80 hover:opacity-90 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Connection
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {connections.map((conn) => (
                      <div
                        key={conn.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-muted/30"
                      >
                        <div className="flex items-center space-x-4">
                          <div className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-lg",
                            conn.status === 'connected' ? 'bg-accent-emerald/10' : 'bg-muted'
                          )}>
                            <Database className={cn(
                              "h-5 w-5",
                              conn.status === 'connected' ? 'text-accent-emerald' : 'text-muted-foreground'
                            )} />
                          </div>
                          <div>
                            <p className="font-medium">{conn.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {conn.type} • {conn.vectors.toLocaleString()} vectors
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={conn.status === 'connected' ? 'default' : 'secondary'}
                            className={cn(
                              conn.status === 'connected' 
                                ? 'bg-accent-emerald/10 text-accent-emerald border-accent-emerald/20' 
                                : ''
                            )}
                          >
                            {conn.status}
                          </Badge>
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Database Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Database Statistics</CardTitle>
                  <CardDescription>
                    Overview of your vector storage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Total Vectors</p>
                      <p className="text-2xl font-bold">15,420</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Dimensions</p>
                      <p className="text-2xl font-bold">384</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Indexes</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Queries/Day</p>
                      <p className="text-2xl font-bold">1,250</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="embeddings">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Embedding Generator</CardTitle>
                <CardDescription>
                  Generate embeddings for text data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text">Text to Embed</Label>
                    <Textarea
                      id="text"
                      placeholder="Enter text to generate embeddings..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="model">Embedding Model</Label>
                      <Select defaultValue="sentence-transformer">
                        <SelectTrigger id="model">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sentence-transformer">Sentence Transformer</SelectItem>
                          <SelectItem value="openai">OpenAI Ada</SelectItem>
                          <SelectItem value="cohere">Cohere</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="normalize">Options</Label>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-gray-300 text-accent-purple focus:ring-accent-purple"
                          />
                          <span className="text-sm">Normalize vectors</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-accent-purple to-accent-purple/80 hover:opacity-90 text-white">
                    <Zap className="h-4 w-4 mr-2" />
                    Generate Embeddings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="indexes">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Vector Indexes</CardTitle>
                    <CardDescription>
                      Manage and optimize your vector indexes
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-accent-purple to-accent-purple/80 hover:opacity-90 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Index
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['expert_knowledge', 'web_scraping_data', 'code_embeddings'].map((indexName) => (
                    <div
                      key={indexName}
                      className="p-4 rounded-lg border bg-muted/30"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{indexName}</p>
                          <p className="text-sm text-muted-foreground">
                            HNSW • Cosine similarity • 5,140 vectors
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="icon">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Index Health</span>
                          <span className="text-accent-emerald">Optimal</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}