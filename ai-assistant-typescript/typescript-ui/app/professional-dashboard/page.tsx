'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  StatCard, 
  FeatureCard, 
  ProfessionalCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/professional-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Database,
  Code,
  GitBranch,
  FileCode,
  Shield,
  Cpu,
  Brain,
  Sparkles,
  TrendingUp,
  Users,
  Activity,
  Server,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  BarChart3,
  FileText,
  Settings
} from 'lucide-react'

// Animated background gradient
const AnimatedGradient = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 animate-gradient-shift" />
      <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-primary/5 animate-gradient-shift-reverse" />
    </div>
  </div>
)

// Professional navigation
const Navigation = () => (
  <motion.nav
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b"
  >
    <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">TypeScript AI Assistant</h1>
              <p className="text-xs text-muted-foreground">Enterprise Edition</p>
            </div>
          </motion.div>
          <div className="hidden md:flex items-center gap-6">
            <Button variant="ghost" size="sm">Dashboard</Button>
            <Button variant="ghost" size="sm">Agents</Button>
            <Button variant="ghost" size="sm">Analytics</Button>
            <Button variant="ghost" size="sm">Settings</Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="animate-pulse">
            <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2" />
            Live
          </Badge>
          <Button size="sm" className="gradient-primary text-primary-foreground">
            New Analysis
          </Button>
        </div>
      </div>
    </div>
  </motion.nav>
)

export default function ProfessionalDashboard() {
  const [activeAgents] = useState(13)
  const [progress] = useState(78)

  // Stagger animation for cards
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-background">
      <AnimatedGradient />
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            Welcome to Your AI Command Center
          </h2>
          <p className="text-xl text-muted-foreground">
            Orchestrating {activeAgents} specialized agents for optimal TypeScript development
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <motion.div variants={item}>
            <StatCard
              title="Total Analyses"
              value="2,847"
              change="+24.5%"
              trend="up"
              icon={<BarChart3 className="h-4 w-4" />}
            />
          </motion.div>
          <motion.div variants={item}>
            <StatCard
              title="Code Quality Score"
              value="94.2"
              change="+3.1%"
              trend="up"
              icon={<CheckCircle className="h-4 w-4" />}
            />
          </motion.div>
          <motion.div variants={item}>
            <StatCard
              title="Response Time"
              value="1.2s"
              change="-0.3s"
              trend="up"
              icon={<Clock className="h-4 w-4" />}
            />
          </motion.div>
          <motion.div variants={item}>
            <StatCard
              title="Active Projects"
              value="38"
              change="+5"
              trend="up"
              icon={<FileCode className="h-4 w-4" />}
            />
          </motion.div>
        </motion.div>

        {/* Featured Agents */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold">Expert Agents</h3>
            <Button variant="outline" size="sm">
              View All Agents
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Database Expert"
              description="Advanced database optimization and schema analysis"
              icon={<Database className="h-6 w-6" />}
              features={[
                "Schema optimization",
                "Query performance analysis",
                "Migration management",
                "Data integrity validation"
              ]}
              action={
                <Button className="w-full group">
                  Launch Expert
                  <Sparkles className="ml-2 h-4 w-4 group-hover:animate-spin" />
                </Button>
              }
            />
            
            <FeatureCard
              title="Architecture Expert"
              description="System design and architectural patterns"
              icon={<Cpu className="h-6 w-6" />}
              features={[
                "Pattern recommendations",
                "Dependency analysis",
                "Performance profiling",
                "Security assessment"
              ]}
              action={
                <Button className="w-full group">
                  Launch Expert
                  <Sparkles className="ml-2 h-4 w-4 group-hover:animate-spin" />
                </Button>
              }
            />
            
            <FeatureCard
              title="Code Review Expert"
              description="Automated code quality and best practices"
              icon={<Code className="h-6 w-6" />}
              features={[
                "Style enforcement",
                "Security scanning",
                "Performance tips",
                "Refactoring suggestions"
              ]}
              action={
                <Button className="w-full group">
                  Launch Expert
                  <Sparkles className="ml-2 h-4 w-4 group-hover:animate-spin" />
                </Button>
              }
            />
          </div>
        </motion.div>

        {/* Live Activity Feed */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2">
            <ProfessionalCard>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Real-time agent operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { agent: "Database Expert", action: "Optimized query performance", time: "2 min ago", status: "success" },
                    { agent: "Security Specialist", action: "Vulnerability scan completed", time: "5 min ago", status: "success" },
                    { agent: "Architecture Expert", action: "Pattern analysis in progress", time: "8 min ago", status: "pending" },
                    { agent: "Code Review Expert", action: "Found 3 optimization opportunities", time: "12 min ago", status: "warning" }
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className={cn(
                        "h-2 w-2 rounded-full",
                        activity.status === "success" && "bg-emerald-500",
                        activity.status === "pending" && "bg-amber-500 animate-pulse",
                        activity.status === "warning" && "bg-orange-500"
                      )} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.agent}</p>
                        <p className="text-xs text-muted-foreground">{activity.action}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </ProfessionalCard>
          </div>

          <div>
            <ProfessionalCard>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Overall performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">CPU Usage</span>
                      <span className="text-sm text-muted-foreground">32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Memory</span>
                      <span className="text-sm text-muted-foreground">4.2 GB / 16 GB</span>
                    </div>
                    <Progress value={26} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Agent Capacity</span>
                      <span className="text-sm text-muted-foreground">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <div className="pt-4 space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Server className="h-4 w-4 text-emerald-500" />
                      <span>API Server: Operational</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Database className="h-4 w-4 text-emerald-500" />
                      <span>Database: Connected</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Shield className="h-4 w-4 text-emerald-500" />
                      <span>Security: All systems secure</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </ProfessionalCard>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

// Utility function
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ')
}