# AI Assistant System

Last updated: June 23, 2025

## Overview

The AI Assistant is a comprehensive agentic system featuring 23 specialized AI agents that work together to provide expert guidance across various domains. The system uses a RAG (Retrieval-Augmented Generation) vector search system for knowledge management and integrates with external tools through the Model Context Protocol (MCP).

## Latest Updates

### June 23, 2025 - Project Cleanup and Organization

1. **Project Organization**: Comprehensive cleanup and organization
   - Created CURRENT_FILES.md listing all active project files
   - Created archive_cleanup.sh for moving non-essential files to the archive directory
   - Created github_sync.sh for GitHub repository synchronization
   - Removed test files, temporary scripts, and logs from main directories

2. **Repository Structure**: Optimized repository structure
   - Clearly organized core system components
   - Streamlined tooling system with organized categories
   - Maintained only essential workflow files
   - Simplified documentation structure

For details on current files, see [CURRENT_FILES.md](CURRENT_FILES.md).

### June 21, 2025 - RAG Ollama Integration and API Authentication Fix

1. **RAG Ollama Integration**: The RAG system now uses local Ollama models
   - Local embedding generation and vector operations
   - Enhanced RAG System with multiple retrieval strategies
   - N8N workflow integration with Ollama RAG
   - Vector Search Expert agent enhanced with Ollama expertise

2. **Ollama LLM Integration**: The system now uses Ollama for local LLM inference
   - Mistral:latest is set as the default model
   - Free, local model inference without API costs
   - Automatic Ollama server and model verification

3. **API Authentication Fix**: Fixed authentication between UI and API server
   - Removed duplicate API key header
   - Improved authentication verification
   - Enhanced error handling

For detailed information, see:
- [RAG_OLLAMA_CONNECTOR_IMPLEMENTATION.md](RAG_OLLAMA_CONNECTOR_IMPLEMENTATION.md)
- [RAG_OLLAMA_N8N_WORKFLOW_INTEGRATION.md](RAG_OLLAMA_N8N_WORKFLOW_INTEGRATION.md)
- [OLLAMA_SERVER_INTEGRATION.md](OLLAMA_SERVER_INTEGRATION.md)
- [API_AUTHENTICATION_FIX_SUMMARY.md](API_AUTHENTICATION_FIX_SUMMARY.md)

## Key Features

- **Multi-Agent Orchestration**: 23 specialized AI agents coordinated by a master orchestrator
- **RAG Knowledge System**: Vector-based knowledge retrieval for enhanced capabilities
- **N8N Integration**: Workflow automation with N8N
- **Modern UI**: Next.js React application with chat interface
- **Local LLM Inference**: Ollama integration for running models locally
- **MCP Integration**: Model Context Protocol for secure tool access

## System Components

1. **API Server**: FastAPI-based backend for agent orchestration
2. **UI System**: Next.js React application for user interface
3. **Agentic Framework**: 23 specialized AI agents
4. **RAG System**: Vector-based knowledge retrieval
5. **N8N Integration**: Workflow automation
6. **MCP Integration**: Secure tool access

## Agent Expertise Areas

The system includes specialized agents for:

- Python development
- N8N workflows
- Project organization
- GitHub workflows
- Security
- Architecture
- UI/UX design
- Vector search
- And many more...

## Getting Started

### Prerequisites

- Node.js 20.x or later
- Python 3.10 or later
- Ollama (for local LLM inference)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   cd ai-assistant-ui && npm install
   ```

3. Set up configuration:
   ```bash
   cp .env.example .env
   ```

4. Install and start Ollama:
   ```bash
   # Follow instructions at https://ollama.ai/download
   ollama pull mistral:latest
   ```

### Running the System

Start the entire system with one command:

```bash
./run_agent_system_ui_with_ollama_check.sh
```

This script will:
1. Check if Ollama is running and start it if needed
2. Verify Mistral:latest model is available
3. Start the API server
4. Start the UI server
5. Open the dashboard in your browser

### Using the System

1. Navigate to http://localhost:3000/dashboard
2. Enter your query in the chat interface
3. The system will automatically route your query to the appropriate expert agent
4. View the response and any agent attributions

## Architecture

The system uses a three-tier architecture for tools:

1. **Python Function Implementation**: Core implementation code
2. **ToolCode Bridge**: Interface definition
3. **Agent Node**: Agent system message and configuration

## RAG System with Ollama

The RAG system now uses Ollama models for both embedding generation and LLM inference:

1. **Local Processing**: All operations run locally without external API calls
2. **Vector Operations**: Generate embeddings, store vectors, and perform similarity searches
3. **Multiple Retrieval Strategies**: Semantic, keyword, hybrid, and reranking
4. **Context Management**: Optimized context handling for better retrieval
5. **N8N Integration**: Seamless integration with N8N workflow

## Ollama Models

The system is configured to use these Ollama models:

- **mistral:latest** (default): Best general purpose model
- **mistral:7b**: Smaller, faster model
- **llama2:latest**: Meta's open source model
- **phi3:mini**: Microsoft's small, efficient model

## Available Scripts

See [CURRENT_SCRIPTS_JUNE21_2025.md](CURRENT_SCRIPTS_JUNE21_2025.md) for a complete list of available scripts.

## Directory Structure

For a detailed list of current files, see [CURRENT_FILES.md](CURRENT_FILES.md).

## License

This project is licensed under the MIT License - see the LICENSE file for details.