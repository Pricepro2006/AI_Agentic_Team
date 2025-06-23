# Current Files in AI Assistant Project

This document lists all the current, active files in the AI Assistant project, organized by their purpose and function. These files represent the core codebase that is actively maintained and used.

## Core System Files

### Main API Server
- `api_server_enhanced_with_cross_agent.py` - Enhanced API server with cross-agent communication support
- `api_endpoints/` - Directory containing all API endpoint implementations
  - `agent_query_api.py` - API for agent queries
  - `cross_agent_communication_api.py` - API for cross-agent communication
  - `cross_agent_integration_handler.py` - Handler for cross-agent integration
  - `memory_api.py` - API for memory operations
  - `orchestrator_router.py` - Orchestrator routing API
  - `vector_search_api.py` - API for vector search operations

### Agent System
- `agents/` - Directory containing all agent implementations
  - `base_agent.py` - Base agent class definition
  - `api_integration_expert_agent.py` - API Integration Expert agent
  - `architecture_expert_agent.py` - Architecture Expert agent
  - `automation_expert_agent.py` - Automation Expert agent
  - `data_pipeline_expert_agent.py` - Data Pipeline Expert agent
  - `documentation_expert_agent.py` - Documentation Expert agent
  - `github_expert_agent_enhanced.py` - Enhanced GitHub Expert agent
  - `llm_integration_expert_agent.py` - LLM Integration Expert agent
  - `mcp_integration_agent.py` - MCP Integration agent
  - `multi_project_manager_agent.py` - Multi-Project Manager agent
  - `n8n_expert_agent_enhanced.py` - Enhanced N8N Expert agent
  - `pdr_framework_agent.py` - PDR Framework agent
  - `performance_optimization_expert_agent.py` - Performance Optimization Expert agent
  - `project_organization_agent.py` - Project Organization agent
  - `python_expert_agent.py` - Python Expert agent
  - `risk_manager_agent.py` - Risk Manager agent
  - `security_specialist_agent.py` - Security Specialist agent
  - `sprint_manager_agent.py` - Sprint Manager agent
  - `ui_ux_design_expert_agent.py` - UI/UX Design Expert agent
  - `vector_search_expert_agent_enhanced.py` - Enhanced Vector Search Expert agent
  - `version_control_expert_agent.py` - Version Control Expert agent
  - `vscode_expert_agent_enhanced.py` - Enhanced VSCode Expert agent

### UI System
- `ai-assistant-ui/` - Directory containing UI implementation
  - `package.json` - UI package configuration
  - `tsconfig.json` - TypeScript configuration

## Tool System

### Core Tools
- `tools/base_tool.py` - Base tool class definition
- `tools/tool_registry.py` - Tool registry for registration and discovery

### Tool Categories
- `tools/api_integration_tools/` - API Integration tools
- `tools/architecture_tools/` - Architecture tools
- `tools/automation_tools/` - Automation tools
- `tools/data_analysis_tools/` - Data Analysis tools
- `tools/data_pipeline_tools/` - Data Pipeline tools
- `tools/documentation_tools/` - Documentation tools
- `tools/error_handling/` - Error handling tools
- `tools/github_workflow_tools/` - GitHub Workflow tools
- `tools/llm_integration_tools/` - LLM Integration tools
- `tools/mcp_integration_tools/` - MCP Integration tools
- `tools/multi_project_tools/` - Multi-Project tools
- `tools/n8n_tools/` - N8N tools
- `tools/orchestrator_tools/` - Orchestrator tools
- `tools/pdr_framework_tools/` - PDR Framework tools
- `tools/performance_optimization_tools/` - Performance Optimization tools
- `tools/project_organization_tools/` - Project Organization tools
- `tools/python_tools/` - Python tools
- `tools/risk_management_tools/` - Risk Management tools
- `tools/security_tools/` - Security tools
- `tools/shared_tools/` - Shared tools
- `tools/sprint_management_tools/` - Sprint Management tools
- `tools/ui_ux_design_tools/` - UI/UX Design tools
- `tools/vector_tools/` - Vector tools
- `tools/version_control_tools/` - Version Control tools
- `tools/vscode_tools/` - VSCode tools
- `tools/workflow_tools/` - Workflow tools

### MCP Integration
- `tools/mcp_integration_tools/mcp_context7_connector.py` - MCP Context7 connector
- `tools/mcp_integration_tools/mcp_cursor_rules_connector.py` - MCP Cursor Rules connector
- `tools/mcp_integration_tools/mcp_vectorize_connector.py` - MCP Vectorize connector
- `tools/mcp_integration_tools/mcp_web_search_connector.py` - MCP Web Search connector
- `tools/mcp_integration_tools/mcp_wsl_filesystem_connector.py` - MCP WSL Filesystem connector
- `tools/mcp_integration_tools/mcp_error_handler.py` - MCP Error Handler

### Vector Tools
- `tools/vector_tools/advanced_query_processor.py` - Advanced Query Processor
- `tools/vector_tools/chunk_manager.py` - Chunk Manager
- `tools/vector_tools/embedding_generator.py` - Embedding Generator
- `tools/vector_tools/ollama_connector.py` - Ollama Connector
- `tools/vector_tools/rag_system_enhanced.py` - Enhanced RAG System
- `tools/vector_tools/similarity_searcher.py` - Similarity Searcher
- `tools/vector_tools/vector_database_connector.py` - Vector Database Connector
- `tools/vector_tools/vector_index_manager.py` - Vector Index Manager

## N8N Workflow System

### Main Workflow Files
- `n8n_workflows/ULTIMATE_AGENTIC_WORKFLOW_FINAL_UPDATED_20250620.json` - Final updated agentic workflow
- `n8n_workflows/Full_Agentic_System_RAG_Connected_RAG_ALL_CONNECTED_20250620_114723_fixed_registry.json` - RAG-connected workflow
- `n8n_workflows/connection_registry/` - Directory containing connection registry

### Core Functions
- `n8n_workflows/core/` - Directory containing core function implementations
- `n8n_workflows/bridges/` - Directory containing bridge implementations

## Configuration and Documentation

### Configuration Files
- `configs/action_registry.json` - Action registry configuration
- `configs/agents.json` - Agents configuration
- `configs/allowed_domains.json` - Allowed domains configuration
- `configs/port_config.json` - Port configuration
- `configs/vector_config.json` - Vector system configuration

### Documentation
- `docs/` - Directory containing documentation
- `CLAUDE.md` - Claude instructions
- `README.md` - Project README
- `CURRENT_FILES.md` - This file

## Run Scripts

### Main Run Scripts
- `run_agent_system_ui_with_ollama_check.sh` - Run agent system UI with Ollama check
- `run_enhanced_api_server_with_cross_agent.sh` - Run enhanced API server with cross-agent
- `restart_api_server_complete.sh` - Restart API server completely

### Tool-Specific Run Scripts
- `run_doc_generator.sh` - Run documentation generator
- `update_registry_connections.sh` - Update registry connections