#!/bin/bash

# Script to sync the AI Assistant project with GitHub

echo "Preparing to sync with GitHub repository..."

# Ensure we're in the right directory
cd /home/pricepro2006/iems_project/ehas_project/ai_assistant

# Check if we have any uncommitted changes
git status

# Add the current files to git
echo "Adding current files to git..."
git add CURRENT_FILES.md
git add CLAUDE.md
git add README.md
git add archive_cleanup.sh
git add github_sync.sh

# Add the core directories
echo "Adding core directories..."
git add api_endpoints/
git add agents/
git add tools/
git add configs/
git add docs/
git add n8n_workflows/core/
git add n8n_workflows/bridges/
git add n8n_workflows/ULTIMATE_AGENTIC_WORKFLOW_FINAL_UPDATED_20250620.json
git add n8n_workflows/Full_Agentic_System_RAG_Connected_RAG_ALL_CONNECTED_20250620_114723_fixed_registry.json
git add n8n_workflows/connection_registry/

# Add main run scripts
echo "Adding main run scripts..."
git add run_agent_system_ui_with_ollama_check.sh
git add run_enhanced_api_server_with_cross_agent.sh
git add restart_api_server_complete.sh
git add run_doc_generator.sh
git add update_registry_connections.sh

# Commit changes
echo "Committing changes..."
git commit -m "Project cleanup and organization

- Created CURRENT_FILES.md documenting active project files
- Created archive_cleanup.sh for organizing non-essential files
- Created github_sync.sh for GitHub synchronization
- Organized repository structure
- Cleaned up test files and temporary scripts"

# Push to GitHub
echo "Pushing to GitHub..."
git push origin master

echo "GitHub sync complete!"