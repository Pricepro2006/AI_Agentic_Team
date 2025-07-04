# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Recent Changes (June 24, 2025) - N8N Workflow Layout & MCP Domains Fix

### 🎯 N8N Workflow Color Grouping & Layout Fix
- **Fixed N8N workflow layout** with proper horizontal 5×5 grid
- **Achieved color grouping** - all similar-colored experts grouped together:
  - Row 0: Orange + Yellow (Dev) + Purple (Version Control)
  - Row 1: Purple (DevOps) + Green (Automation)
  - Row 2: Blue (Data/AI) + Cyan (Integration)
  - Row 3: Red (Security) + Brown (Management)
  - Row 4: Brown + Pink (Optimization) + Green
- **Created 24 AI Agent clusters** - each expert has own sticky note
- **Fixed spacing** - 200px gaps between all sticky notes
- **Output:** `Full_26_Agentic_Team_Proper_Expert_Layout_CLEAN_HORIZONTAL_PROPER_CLUSTERS.json`

### 🔧 MCP Domains Setup Fix
- **Restored missing `setup_mcp_domains.sh`** from archive
- **Fixed file references:**
  - `api_server_enhanced.py` → `api_server_enhanced_with_cross_agent.py`
  - Copied `add_mcp_domains_api.py` to root directory
- **System now starts without MCP warnings**

## Recent Changes (June 23, 2025) - Emergency System Fixes & Complete Restoration ⭐ MAJOR UPDATE

### 🛠️ Critical System Fixes - Both Issues Resolved

1. **Dashboard System Completely Fixed**
   - ✅ Resolved infinite spinning at dashboard (http://localhost:3000/dashboard)
   - ✅ Fixed port configuration (API: 8000, UI: 3000, was incorrectly set to 8001)
   - ✅ Eliminated infinite API loops (reduced from 104,496+ calls to normal single calls)
   - ✅ Fixed Next.js route parameter errors (added await to params)
   - ✅ Resolved syntax highlighter import issues (CommonJS vs ESM)
   - ✅ Implemented proper process management with CTRL+C support

2. **N8N Workflow Organization Completely Fixed**
   - ✅ Created 29 expert sticky notes (was only 3)
   - ✅ Color-coded sticky notes by agent type
   - ✅ Organized all 1,407 nodes within proper sticky notes
   - ✅ Generated `Full_26_Agentic_Team_Proper_Expert_Layout.json` ready for N8N import
   - ✅ Follows EXPERT_CLUSTER_ORGANIZATION_PLAN.md exactly

### 📋 System Verification
- Dashboard loads in <2 seconds without spinning
- API calls optimized to single calls per page load
- Process management works with proper signal handling
- N8N workflow organized with 29 color-coded expert clusters
- All components fully operational

### 📁 Quick Start Commands
```bash
# Start the complete system
./start_system_corrected.sh

# Stop the system cleanly  
./shutdown_corrected_system.sh

# Import N8N workflow
cd n8n_workflows
n8n import --input Full_26_Agentic_Team_Proper_Expert_Layout.json
```

## Recent Changes (June 21, 2025)

- **RAG Ollama Integration**: Implemented comprehensive RAG system with Ollama
  - Created `OllamaConnector` class for local embedding generation and vector operations
  - Implemented `RAGSystemEnhanced` class with multiple retrieval strategies
  - Added N8N workflow integration with Ollama RAG components
  - Enhanced Vector Search Expert agent with Ollama RAG expertise
  - Created detailed documentation in [RAG_OLLAMA_CONNECTOR_IMPLEMENTATION.md](RAG_OLLAMA_CONNECTOR_IMPLEMENTATION.md) and [RAG_OLLAMA_N8N_WORKFLOW_INTEGRATION.md](RAG_OLLAMA_N8N_WORKFLOW_INTEGRATION.md)

- **Ollama LLM Integration and API Authentication Fix**:
  - System now uses Ollama for free, local LLM inference instead of Claude API
  - Mistral:latest set as the default model
  - Fixed critical authentication issues between UI and API server
  - Removed duplicate X-API-Key header in query route
  - Automated model verification and server management
  - See [OLLAMA_SERVER_INTEGRATION.md](OLLAMA_SERVER_INTEGRATION.md) and [API_AUTHENTICATION_FIX_SUMMARY.md](API_AUTHENTICATION_FIX_SUMMARY.md) for details

## Recent Changes (June 20, 2025)

- **Documentation Generator Tool Implementation**: Added comprehensive documentation generation capabilities
  - Created `run_doc_generator.py` wrapper script to fix import issues and provide easy-to-use interface
  - Implemented shell script wrapper `run_doc_generator.sh` with convenient CLI options
  - Added support for multiple documentation generators (native, Sphinx, MkDocs, pdoc)
  - Created detailed Tool Specification Document in `docs/DOCUMENTATION_GENERATOR_TOOL_SPEC.md`

- **Agent Router Tool Implementation**: Added comprehensive agent routing capabilities
  - Created `agent_router.py` tool for sophisticated query routing decisions
  - Implemented confidence-based routing with multiple workflow strategies
  - Integrated with orchestrator.py via new `route_with_enhanced_tools` method
  - Created comprehensive documentation in `docs/AGENT_ROUTER_TOOL.md`

- **Comprehensive API Authentication and React Component Fix**: Fixed critical UI issues
  - Fixed 403 Forbidden API key errors with comprehensive API authentication solution
  - Resolved React duplicate key errors in chat-message component and syntax highlighting
  - Fixed React component key uniqueness in file attachments and agent attribution
  - See [API_AND_CHAT_FIX_SUMMARY.md](API_AND_CHAT_FIX_SUMMARY.md) for details

- **MCP Error Handler Implementation**: Added robust error handling for MCP operations
  - Created `MCPErrorHandler` class for standardized error handling across MCP operations
  - Implemented fallback mechanisms for graceful error recovery
  - Added retry functionality with exponential backoff for transient errors
  - See [MCP_ERROR_HANDLING_IMPLEMENTATION.md](MCP_ERROR_HANDLING_IMPLEMENTATION.md) for details

- **N8N Workflow Registry and Optimization**: Comprehensive workflow management solution
  - Created hierarchical registry system with numerical IDs for 1326+ workflow nodes
  - Developed tools for registry visualization and node search
  - Reduced node overlaps by 87% using character-based spacing algorithm
  - See [WORKFLOW_REGISTRY_DIRECTORY_TREE.md](n8n_workflows/WORKFLOW_REGISTRY_DIRECTORY_TREE.md) for details

- **UI and API Model Consistency Fix**: Fixed inconsistencies between UI model selection and API model handling
  - Updated UI components to use consistent model format with colons (e.g., "mistral:7b")
  - Fixed default model selection to use available models from the user's Ollama installation
  - Standardized on "mistral:latest" as default
  - Improved model selection error handling and fallback logic

## Recent Changes (June 19, 2025)

- **UI Syntax Highlighter Fix**: Fixed critical issue with code syntax highlighting in chat interface
  - Changed import path from ESM to CommonJS format in chat-message.tsx
  - Fixed API route parameter types to match Next.js 15.3.3 requirements
  - See [UI_SYNTAX_HIGHLIGHTER_FIX_SUMMARY.md](UI_SYNTAX_HIGHLIGHTER_FIX_SUMMARY.md) for details

- **RAG System Integration with All 23 Agent Clusters**: Enhanced RAG connections for all agents
  - Created script to connect all 23 agent clusters to RAG
  - Implemented bidirectional connections between RAG system and each agent
  - Added proper ai_tool, ai_languageModel, and ai_memory connections
  - Provided universal knowledge access across all agent clusters

## Recent Changes (June 18, 2025)

- **N8N Workflow Node Types Standardized**: Fixed critical issue with node types in N8N workflows
  - Replaced outdated `n8n-nodes-base.code` nodes with proper node types
  - Implemented proper three-tier architecture for tools
  - See `N8N_WORKFLOW_NODE_TYPES_UPGRADE_GUIDE.md` for full details

- **N8N Workflow Organization & Connection Fix**: Resolved workflow execution errors
  - Fixed Python function node syntax (`$input.item.json` → `items[0].json`)
  - Added visual organization with color-coded sticky notes
  - Created comprehensive guidelines for workflow organization

## Project Overview

The AI Assistant project is a multi-agent orchestration system designed to assist in AI development. It consists of 23 specialized AI agents that work together to provide expert guidance in various domains. The system uses a three-tier architecture for tool implementation:

1. **Python Function Node Implementation** - Contains the actual implementation code
2. **ToolCode Bridge** - Defines the tool's schema/interface
3. **Agent Node** - Contains the AI agent's system message and configuration

## Current System Architecture

The system is organized into interconnected components with a Master Orchestrator coordinating specialized agents through LLM and memory components. Each agent has dedicated tools and capabilities.

## RAG System with Ollama

The RAG (Retrieval Augmented Generation) system now uses Ollama models for both embedding generation and LLM inference. Key components include:

1. **OllamaConnector Class**
   - Located in: `tools/vector_tools/ollama_connector.py`
   - Provides embedding generation using local Ollama models
   - Supports vector storage and retrieval operations
   - Implements similarity search with cosine similarity
   - Handles namespace management for different RAG systems

2. **RAGSystemEnhanced Class**
   - Located in: `tools/vector_tools/rag_system_enhanced.py`
   - Provides complete RAG functionality using Ollama
   - Supports multiple retrieval strategies: hybrid, semantic, keyword, reranking
   - Implements enhanced context management for better retrieval performance
   - Includes system evaluation and optimization capabilities

3. **N8N Workflow Integration**
   - Added RAG System Enhanced Function node
   - Added Ollama Connector Function node
   - Created JavaScript bridge nodes for workflow integration
   - Connected Vector Search Expert agent to new RAG components

4. **Ollama Models Support**
   - mistral:latest (default) - 4096 dimensions for embeddings
   - mistral:7b - 4096 dimensions
   - llama2:latest - 4096 dimensions
   - phi3:mini - 2560 dimensions

## N8N Python Function Node Best Practices

When working with N8N Python Function nodes:

1. **Do NOT use** N8N template variables like `$input.item.json` directly in Python code
2. **Instead use** the automatically provided Python variables:
   - `items[0].json` - For accessing the input data
   - Other variables like `items[0].binary` are also available

Example of correct usage:

```python
# Get input data from N8N
input_data = items[0].json
query = input_data.get('query', '')
user = input_data.get('user', 'anonymous')
session_id = input_data.get('session_id')
```

Note that JavaScript nodes can continue to use the template variable syntax (`$input.item.json`).

## Workflow Organization Standards

For optimal workflow organization, follow these guidelines:

1. **Expert Node Organization**:
   - One expert per sticky note
   - Each sticky note should contain: AI Agent Root Node, Ollama Chat node, LLM Memory Node, pythonFunction tools, and toolCode bridges
   - Bridge nodes connected to the Root node
   - No overlapping text or nodes

2. **Spacing Guidelines**:
   - Maintain at least 40 pixels horizontal space between nodes
   - Maintain at least 30 pixels vertical space between nodes
   - Account for node name length in spacing calculations

3. **Color Coding**:
   - Agent clusters: Indigo background (#E8EAF6)
   - RAG components: Deep Purple border (#673AB7)
   - Tool bridges: Light Blue background
   - Implementation nodes: Light Green background

## Common Commands

```bash
# Start the complete AI Assistant system (recommended)
./run_agent_system_ui_with_ollama_check.sh

# Update N8N workflow with Ollama RAG integration
./update_n8n_with_ollama_rag.sh

# Fix API authentication issues
./fix_api_auth.sh

# Fix Syntax Highlighter issues
./fix_syntax_highlighter.sh

# Generate documentation
./run_doc_generator.sh --source-dir ./tools --output-dir ./docs --format markdown --style comprehensive

# Fix RAG system connections
./fix_workflow_rag_connections_all_agents.sh

# Generate workflow registry
./n8n_workflows/generate_registry.sh

# Import the properly organized N8N workflow
cd n8n_workflows && n8n import --input Full_26_Agentic_Team_Proper_Expert_Layout_CLEAN_HORIZONTAL_PROPER_CLUSTERS.json

# For a complete list of all current scripts and their usage
# See CURRENT_SCRIPTS_JUNE23_2025.md
```

## Development Guidelines

1. **Consistent Pattern**: Follow the established three-tier architecture
2. **Error Handling**: Use `MCPErrorHandler` for MCP-related operations
3. **Documentation**: Use the Documentation Generator tool for generating documentation
4. **N8N Python Functions**: Always use `items[0].json` for accessing input data, never `$input.item.json`
5. **Module Imports**: Use CommonJS imports (`dist/cjs`) for react-syntax-highlighter, not ESM (`dist/esm`)
6. **MCP Error Handling**: Use the standardized error handling approach:
   ```python
   try:
       # Perform MCP operation
       result = await mcp_operation()
       return result
   except Exception as e:
       return await MCPErrorHandler.handle_error(
           operation="operation_name",
           error=e,
           fallback_function=optional_fallback
       )
   ```
7. **UI Authentication**: Ensure API_KEY is set in both .env and .env.local files
8. **API and UI Consistency**: Keep model names and configurations synchronized between frontend and backend
9. **RAG Implementation**: Use the RAGSystemEnhanced class for RAG operations with Ollama
10. **Vector Operations**: Use the OllamaConnector for local embedding generation and vector operations

## Current System Status

The AI Assistant system is fully operational with all components working together:

- 24 specialized AI agents coordinated by a master orchestrator (now includes Automation Integration Expert)
- RAG system integrated with all agents for enhanced knowledge retrieval
- Enhanced RAG system with Ollama for local embedding generation and LLM inference
- N8N workflow properly organized with color-grouped sticky notes in 5×5 grid layout
- MCP integration enhanced with robust error handling and domains setup
- UI fixed with proper syntax highlighting and API communication
- Local LLM inference with Ollama's Mistral:latest model
- System starts cleanly without MCP warnings

The system can be started with a single command (`./run_agent_system_ui_with_ollama_check.sh`) which will launch both the API server and UI, and open the dashboard in the browser automatically.