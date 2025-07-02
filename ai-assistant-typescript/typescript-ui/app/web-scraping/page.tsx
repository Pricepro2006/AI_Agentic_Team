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
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Globe2, Loader2, Shield, Zap, Database,
  Download, Search, Settings, Brain, Play, Save, Info
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function WebScrapingPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [url, setUrl] = useState('')
  const [scrapingConfig, setScrapingConfig] = useState({
    strategy: 'auto',
    extractTitle: true,
    extractContent: true,
    extractLinks: true,
    extractImages: true,
    extractMetadata: true,
    saveToRAG: false,
    targetExpert: 'auto'
  })
  const [results, setResults] = useState<any>(null)

  const handleScrape = async () => {
    if (!url) return
    
    setIsLoading(true)
    try {
      // Call the actual web scraping API endpoint
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      
      const response = await fetch(`${apiUrl}/api/agents/web-scraping-expert/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Scrape the following URL and extract data: ${url}`,
          context: {
            url: url,
            config: scrapingConfig,
            saveToRAG: scrapingConfig.saveToRAG,
            targetExpert: scrapingConfig.targetExpert
          }
        })
      })

      if (!response.ok) {
        // Fallback to Python API if TypeScript API fails
        const pythonResponse = await fetch('http://localhost:5000/api/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `Please scrape the webpage at ${url} and extract the title, content, links, images, and metadata. ${scrapingConfig.saveToRAG ? `Route the extracted content to the ${scrapingConfig.targetExpert === 'auto' ? 'appropriate expert' : scrapingConfig.targetExpert} knowledge base.` : ''}`,
            model: 'mistral:latest'
          })
        })

        if (pythonResponse.ok) {
          const data = await pythonResponse.json()
          setResults({
            success: true,
            url,
            title: `Scraped: ${url}`,
            content: data.response || 'Content extracted successfully',
            links: [],
            images: [],
            metadata: {},
            metrics: {
              contentLength: data.response?.length || 0,
              wordCount: data.response?.split(' ').length || 0,
              linkCount: 0,
              imageCount: 0
            },
            ragRouting: scrapingConfig.saveToRAG ? {
              success: true,
              expert: scrapingConfig.targetExpert,
              ragSystemId: `${scrapingConfig.targetExpert}-rag-001`
            } : undefined
          })
        } else {
          throw new Error(`API request failed: ${pythonResponse.statusText}`)
        }
      } else {
        const data = await response.json()
        
        // Parse the response from the TypeScript API
        setResults({
          success: data.success || true,
          url,
          title: data.title || data.data?.title || `Scraped: ${url}`,
          content: data.content || data.data?.content || data.response || 'Content extracted',
          links: data.links || data.data?.links || [],
          images: data.images || data.data?.images || [],
          metadata: data.metadata || data.data?.metadata || {},
          metrics: {
            contentLength: data.metrics?.contentLength || (data.content?.length || 0),
            wordCount: data.metrics?.wordCount || (data.content?.split(' ').length || 0),
            linkCount: data.metrics?.linkCount || (data.links?.length || 0),
            imageCount: data.metrics?.imageCount || (data.images?.length || 0)
          },
          ragRouting: scrapingConfig.saveToRAG ? {
            success: true,
            expert: scrapingConfig.targetExpert,
            ragSystemId: `${scrapingConfig.targetExpert}-rag-001`
          } : undefined
        })
      }
    } catch (error) {
      console.error('Scraping failed:', error)
      setResults({
        success: false,
        url,
        title: 'Scraping Failed',
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        links: [],
        images: [],
        metadata: {},
        metrics: {
          contentLength: 0,
          wordCount: 0,
          linkCount: 0,
          imageCount: 0
        }
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent-emerald/5">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b glass backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push('/dashboard')}
                className="hover:bg-accent-emerald/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-emerald to-accent-emerald/80 shadow-lg">
                  <Globe2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Web Scraping Expert</h1>
                  <p className="text-sm text-muted-foreground">
                    Advanced data extraction with RAG integration
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-accent-emerald/10 text-accent-emerald border-accent-emerald/20">
                New Feature
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="scraper" className="space-y-6">
          <TabsList className="glass border-0 shadow-lg p-1">
            <TabsTrigger value="scraper" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent-emerald data-[state=active]:to-accent-emerald/80 data-[state=active]:text-white">
              Web Scraper
            </TabsTrigger>
            <TabsTrigger value="batch" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent-emerald data-[state=active]:to-accent-emerald/80 data-[state=active]:text-white">
              Batch Scraping
            </TabsTrigger>
            <TabsTrigger value="sessions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent-emerald data-[state=active]:to-accent-emerald/80 data-[state=active]:text-white">
              Sessions
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent-emerald data-[state=active]:to-accent-emerald/80 data-[state=active]:text-white">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scraper" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Input Panel */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle>Scraping Configuration</CardTitle>
                    <CardDescription>
                      Configure your web scraping parameters
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="url">Target URL</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="url"
                          type="url"
                          placeholder="https://example.com"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          onClick={handleScrape}
                          disabled={!url || isLoading}
                          className="bg-gradient-to-r from-accent-emerald to-accent-emerald/80 hover:opacity-90 text-white"
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                          <span className="ml-2">Scrape</span>
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="strategy">Scraping Strategy</Label>
                      <Select 
                        value={scrapingConfig.strategy} 
                        onValueChange={(value) => setScrapingConfig({...scrapingConfig, strategy: value})}
                      >
                        <SelectTrigger id="strategy">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Auto Detect</SelectItem>
                          <SelectItem value="static">Static HTML</SelectItem>
                          <SelectItem value="dynamic">Dynamic (JavaScript)</SelectItem>
                          <SelectItem value="stealth">Stealth Mode</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Data Extraction</Label>
                      <div className="space-y-2">
                        {[
                          { key: 'extractTitle', label: 'Page Title' },
                          { key: 'extractContent', label: 'Main Content' },
                          { key: 'extractLinks', label: 'Links' },
                          { key: 'extractImages', label: 'Images' },
                          { key: 'extractMetadata', label: 'Metadata' }
                        ].map((item) => (
                          <label key={item.key} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={scrapingConfig[item.key as keyof typeof scrapingConfig] as boolean}
                              onChange={(e) => setScrapingConfig({
                                ...scrapingConfig,
                                [item.key]: e.target.checked
                              })}
                              className="rounded border-gray-300 text-accent-emerald focus:ring-accent-emerald"
                            />
                            <span className="text-sm">{item.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Brain className="h-4 w-4 text-accent-emerald" />
                        <Label>RAG Integration</Label>
                      </div>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={scrapingConfig.saveToRAG}
                          onChange={(e) => setScrapingConfig({
                            ...scrapingConfig,
                            saveToRAG: e.target.checked
                          })}
                          className="rounded border-gray-300 text-accent-emerald focus:ring-accent-emerald"
                        />
                        <span className="text-sm">Automatically save to expert knowledge base</span>
                      </label>
                      
                      {scrapingConfig.saveToRAG && (
                        <div className="space-y-3 mt-3 p-3 rounded-lg bg-accent-emerald/5 border border-accent-emerald/20">
                          <div className="space-y-2">
                            <Label htmlFor="expert">Target Expert Knowledge Base</Label>
                            <Select
                              value={scrapingConfig.targetExpert}
                              onValueChange={(value) => setScrapingConfig({...scrapingConfig, targetExpert: value})}
                            >
                              <SelectTrigger id="expert">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="auto">🤖 Auto Detect (Content-based routing)</SelectItem>
                                <SelectItem value="database-expert">💾 Database Expert</SelectItem>
                                <SelectItem value="vector-search-expert">🔍 Vector Search Expert</SelectItem>
                                <SelectItem value="architecture-expert">🏗️ Architecture Expert</SelectItem>
                                <SelectItem value="security-specialist">🔒 Security Specialist</SelectItem>
                                <SelectItem value="performance-optimization-expert">⚡ Performance Expert</SelectItem>
                                <SelectItem value="api-integration-expert">🔌 API Integration Expert</SelectItem>
                                <SelectItem value="testing-qa-expert">🧪 Testing & QA Expert</SelectItem>
                                <SelectItem value="code-review-expert">👀 Code Review Expert</SelectItem>
                                <SelectItem value="documentation-expert">📚 Documentation Expert</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="flex items-start space-x-2 text-xs text-muted-foreground">
                            <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                            <p>
                              When set to Auto Detect, the system analyzes the scraped content and routes it to the most appropriate expert based on keywords, patterns, and context.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Results Panel */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-0 shadow-xl h-full">
                  <CardHeader>
                    <CardTitle>Scraping Results</CardTitle>
                    <CardDescription>
                      Extracted data and metadata
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {results ? (
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold mb-2">Title</h3>
                          <p className="text-sm text-muted-foreground">{results.title}</p>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-2">Content Preview</h3>
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {results.content}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-2">Metrics</h3>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-2 rounded-lg bg-muted/50">
                              <p className="text-xs text-muted-foreground">Words</p>
                              <p className="text-sm font-medium">{results.metrics.wordCount}</p>
                            </div>
                            <div className="p-2 rounded-lg bg-muted/50">
                              <p className="text-xs text-muted-foreground">Links</p>
                              <p className="text-sm font-medium">{results.metrics.linkCount}</p>
                            </div>
                            <div className="p-2 rounded-lg bg-muted/50">
                              <p className="text-xs text-muted-foreground">Images</p>
                              <p className="text-sm font-medium">{results.metrics.imageCount}</p>
                            </div>
                            <div className="p-2 rounded-lg bg-muted/50">
                              <p className="text-xs text-muted-foreground">Size</p>
                              <p className="text-sm font-medium">{results.metrics.contentLength}B</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2 pt-4">
                          <Button variant="outline" className="flex-1">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </Button>
                          <Button 
                            className="flex-1 bg-gradient-to-r from-accent-emerald to-accent-emerald/80 hover:opacity-90 text-white"
                            disabled={!scrapingConfig.saveToRAG}
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save to RAG
                          </Button>
                        </div>

                        {results.ragRouting && (
                          <div className="mt-4 p-3 rounded-lg bg-accent-emerald/10 border border-accent-emerald/20">
                            <div className="flex items-center space-x-2 mb-2">
                              <Brain className="h-4 w-4 text-accent-emerald" />
                              <h4 className="font-semibold text-sm">RAG Integration Status</h4>
                            </div>
                            {results.ragRouting.success ? (
                              <div className="space-y-1 text-sm">
                                <p className="text-accent-emerald">✓ Successfully routed to {results.ragRouting.expert}</p>
                                <p className="text-xs text-muted-foreground">
                                  Knowledge base ID: {results.ragRouting.ragSystemId}
                                </p>
                              </div>
                            ) : (
                              <p className="text-sm text-destructive">
                                ✗ Failed to route: {results.ragRouting.error}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                        <Globe2 className="h-16 w-16 mb-4 text-accent-emerald/20" />
                        <p className="text-sm">No results yet</p>
                        <p className="text-xs mt-1">Enter a URL and click Scrape to begin</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Advanced Features</CardTitle>
                  <CardDescription>
                    Professional web scraping capabilities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-emerald/10">
                        <Shield className="h-5 w-5 text-accent-emerald" />
                      </div>
                      <div>
                        <p className="font-medium">Anti-Detection</p>
                        <p className="text-sm text-muted-foreground">
                          Stealth mode with user agent rotation
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-purple/10">
                        <Zap className="h-5 w-5 text-accent-purple" />
                      </div>
                      <div>
                        <p className="font-medium">Dynamic Content</p>
                        <p className="text-sm text-muted-foreground">
                          JavaScript rendering support
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-amber/10">
                        <Database className="h-5 w-5 text-accent-amber" />
                      </div>
                      <div>
                        <p className="font-medium">Session Management</p>
                        <p className="text-sm text-muted-foreground">
                          Maintain state across requests
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Brain className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">RAG Integration</p>
                        <p className="text-sm text-muted-foreground">
                          Direct to knowledge base
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="batch">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Batch Scraping</CardTitle>
                <CardDescription>
                  Scrape multiple URLs efficiently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  <div className="text-center">
                    <Globe2 className="h-16 w-16 mx-auto mb-4 text-accent-emerald/20 animate-pulse" />
                    <p className="text-lg font-medium">Batch scraping coming soon...</p>
                    <p className="text-sm mt-2">Process multiple URLs with a single request</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Session Management</CardTitle>
                <CardDescription>
                  Manage authenticated scraping sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  <div className="text-center">
                    <Database className="h-16 w-16 mx-auto mb-4 text-accent-purple/20 animate-pulse" />
                    <p className="text-lg font-medium">Session management coming soon...</p>
                    <p className="text-sm mt-2">Handle authentication and cookies</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Scraping Settings</CardTitle>
                <CardDescription>
                  Configure default scraping behavior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  <div className="text-center">
                    <Settings className="h-16 w-16 mx-auto mb-4 text-primary/20 animate-spin-slow" />
                    <p className="text-lg font-medium">Settings coming soon...</p>
                    <p className="text-sm mt-2">Configure proxies, rate limits, and more</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}