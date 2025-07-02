/**
 * Main test page for AI Assistant TypeScript API
 * This provides a comprehensive interface to test all implemented functionality
 */
import React, { useState } from 'react'
import { trpc } from '@/utils/trpc'
import Head from 'next/head'

// Import example components
import { 
  HealthCheck, 
  AgentList, 
  QueryOrchestrator, 
  PythonToolExecutor, 
  ToolSearch,
  AIAssistantApp 
} from '@/examples/trpc-client-usage'

/**
 * Documentation Expert Tool Tester
 */
function DocumentationToolTester() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const executeTool = trpc.tools.execute.useMutation({
    onSuccess: (data) => {, setResult(data)
      setLoading(false)
    },
    onError: (error) => {, setResult({ error: error.message })
      setLoading(false)
    },
  })

  const testDocAutomationSetup = () => {
    setLoading(true)
    executeTool.mutate({
      category: 'documentation',
      toolName: 'doc_automation_setup',
      parameters: {, project_path: '/example/project',
        automation_type: 'github_actions',
        documentation_tools: ['typedoc', 'mkdocs'],
        triggers: [{ even, t: 'push', branches: ['main'] }],
        output_targets: [{ platfor, m: 'github_pages', path: 'docs/' }]
      },
    })
  }

  const testMultiFormatConverter = () => {
    setLoading(true)
    executeTool.mutate({
      category: 'documentation',
      toolName: 'multi_format_converter',
      parameters: {, source_format: 'markdown',
        target_format: 'pdf',
        input_path: '/example/docs',
        output_path: '/example/output',
        conversion_options: {, preserve_formatting: true,
          include_toc: true
        }
      },
    })
  }

  const testChangelogManager = () => {
    setLoading(true)
    executeTool.mutate({
      category: 'documentation',
      toolName: 'changelog_manager',
      parameters: {, action: 'generate',
        project_path: '/example/project',
        changelog_format: 'keep_a_changelog',
        version: '1.0.0',
        release_notes: {, version: '1.0.0',
          date: '2025-06-30',
          changes: [
            { type: 'added', description: 'New documentation tools' },
            { type: 'fixed', description: 'TypeScript migration issues' }
          ]
        }
      },
    })
  }

  const testDiagramGenerator = () => {
    setLoading(true)
    executeTool.mutate({
      category: 'documentation',
      toolName: 'diagram_generator',
      parameters: {, diagram_type: 'architecture',
        source_input: {, input_type: 'code_analysis',
          source_path: '/example/src',
          analysis_options: {, include_dependencies: true,
            dependency_depth: 2
          }
        },
        output_options: {, output_directory: '/example/diagrams',
          base_filename: 'architecture',
          include_metadata: true
        },
        export_formats: ['svg', 'png', 'pdf']
      },
    })
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', margin: '20px 0' }}>
      <h3>🚀 Documentation Expert Tools Tester</h3>
      <p>Test the newly implemented Documentation Expert tools:</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={testDocAutomationSetup} disabled={loading} style={{ margin: '5px' }}>
          Test Doc Automation Setup
        </button>
        <button onClick={testMultiFormatConverter} disabled={loading} style={{ margin: '5px' }}>
          Test Multi-Format Converter
        </button>
        <button onClick={testChangelogManager} disabled={loading} style={{ margin: '5px' }}>
          Test Changelog Manager
        </button>
        <button onClick={testDiagramGenerator} disabled={loading} style={{ margin: '5px' }}>
          Test Diagram Generator
        </button>
      </div>

      {loading && <p>🔄 Executing tool...</p>}
      
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h4>📋 Tool Execution Result:</h4>
          <pre style={{ 
            background: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '5px',
            overflow: 'auto',
            maxHeight: '400px'
          }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

/**
 * System Status Dashboard
 */
function SystemStatus() {
  const { data: tools } = trpc.tools.list.useQuery()
  const { data: stats } = trpc.tools.getStats.useQuery()
  const { data: health } = trpc.health.check.useQuery()

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', margin: '20px 0' }}>
      <h3>📊 System Status</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        <div>
          <h4>🏥 Health Status</h4>
          <p>Status: {health?.status || 'Checking...'}</p>
          <p>Service: {health?.service || 'N/A'}</p>
          <p>Version: {health?.version || 'N/A'}</p>
        </div>
        
        <div>
          <h4>🛠️ Tool Statistics</h4>
          <p>Total Tools: {stats?.totalTools || 0}</p>
          <p>Categories: {stats?.categories || 0}</p>
          <p>Documentation Tools: {stats?.toolsByCategory?.documentation || 0}</p>
        </div>
        
        <div>
          <h4>📈 Implementation Progress</h4>
          <p>Implemented: {tools?.length || 0} tools</p>
          <p>Documentation Expert: ✅ Complete</p>
          <p>Python Expert: ✅ Complete</p>
        </div>
      </div>
    </div>
  )
}

/**
 * Main testing page
 */
export default function TestPage() {
  const [activeTab, setActiveTab] = useState('status')

  return (
    <>
      <Head>
        <title>AI Assistant TypeScript API - Live Testing</title>
        <meta name="description" content="Live testing interface for AI Assistant TypeScript API" />
      </Head>

      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1>🤖 AI Assistant TypeScript API - Live Testing</h1>
          <p>Comprehensive testing interface for the migrated TypeScript system</p>
        </header>

        <nav style={{ marginBottom: '30px', textAlign: 'center' }}>
          <button 
            onClick={() => setActiveTab('status')} 
            style={{ 
              margin: '5px', 
              padding: '10px 20px',
              backgroundColor: activeTab === 'status' ? '#007bff' : '#f8f9fa',
              color: activeTab === 'status' ? 'white' : 'black',
              border: '1px solid #ddd',
              borderRadius: '5px'
            }}
          >
            📊 System Status
          </button>
          <button 
            onClick={() => setActiveTab('documentation')} 
            style={{ 
              margin: '5px', 
              padding: '10px 20px',
              backgroundColor: activeTab === 'documentation' ? '#007bff' : '#f8f9fa',
              color: activeTab === 'documentation' ? 'white' : 'black',
              border: '1px solid #ddd',
              borderRadius: '5px'
            }}
          >
            📚 Documentation Tools
          </button>
          <button 
            onClick={() => setActiveTab('full')} 
            style={{ 
              margin: '5px', 
              padding: '10px 20px',
              backgroundColor: activeTab === 'full' ? '#007bff' : '#f8f9fa',
              color: activeTab === 'full' ? 'white' : 'black',
              border: '1px solid #ddd',
              borderRadius: '5px'
            }}
          >
            🚀 Full Demo
          </button>
        </nav>

        <main>
          {activeTab === 'status' && <SystemStatus />}
          {activeTab === 'documentation' && <DocumentationToolTester />}
          {activeTab === 'full' && <AIAssistantApp />}
        </main>

        <footer style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
          <p>🔧 TypeScript Migration • 📚 Documentation Expert Complete • 🎯 Ready for Production Testing</p>
        </footer>
      </div>
    </>
  )
}