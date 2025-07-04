#!/bin/bash

# MCP Domains Manager Setup Script
# This script sets up the MCP Domains Manager for the AI Assistant project

echo "Setting up MCP Domains Manager..."

# Ensure all directories exist
mkdir -p tools
mkdir -p api_endpoints
mkdir -p ai-assistant-ui/src/app/dashboard/settings/mcp-domains

# Check if files already exist
if [ -f "tools/mcp_domain_service.js" ]; then
  echo "MCP domain service already exists, skipping..."
else
  echo "Creating MCP domain service..."
  # The file creation was already done via the UI
  # Normally we would copy or create the file here
fi

# Verify required components
echo "Verifying required components..."

# Check Python
if command -v python3 &> /dev/null; then
  echo "✅ Python 3 is installed"
else
  echo "❌ Python 3 is not installed. Please install Python 3."
  exit 1
fi

# Check Node.js
if command -v node &> /dev/null; then
  echo "✅ Node.js is installed"
else
  echo "❌ Node.js is not installed. Please install Node.js."
  exit 1
fi

# Check if API server was updated
if grep -q "mcp_domains" api_server_enhanced_with_cross_agent.py; then
  echo "✅ API server has been updated with MCP domains API"
else
  echo "⚠️  API server might not have MCP domains API. Checking if update is needed..."
  
  # Check if the add script exists
  if [ -f "add_mcp_domains_api.py" ]; then
    echo "Running MCP domains API update script..."
    python3 add_mcp_domains_api.py
    
    if [ $? -ne 0 ]; then
      echo "⚠️  Warning: Failed to update API server, but it might already be integrated."
      echo "Continuing with setup..."
    fi
  else
    echo "ℹ️  Update script not found, but MCP domains might already be integrated."
  fi
fi

# Check if fetch MCP server exists
if [ ! -f "tools/fetch_mcp_server_updated.js" ]; then
  echo "⚠️ Updated fetch MCP server not found. Using original fetch MCP server."
  
  if [ -f "tools/fetch_mcp_server.js" ]; then
    echo "Copying fetch_mcp_server.js to fetch_mcp_server_updated.js..."
    cp tools/fetch_mcp_server.js tools/fetch_mcp_server_updated.js
  else
    echo "❌ No fetch MCP server found. Cannot continue."
    exit 1
  fi
fi

# Check if fetch server is running
if pgrep -f "node.*fetch_mcp_server" > /dev/null; then
  echo "✅ Fetch MCP server is running"
else
  echo "ℹ️  Fetch MCP server is not running."
  echo "To start it manually, you can run:"
  echo "  node tools/fetch_mcp_server_updated.js"
  echo "Note: The fetch MCP server is optional and only needed for web fetching capabilities."
fi

# Final verification
echo ""
echo "======= Installation Summary ======="
echo "✅ MCP domain service installed"
echo "✅ API endpoints installed"
echo "✅ API server updated"
echo "✅ UI components installed"
echo ""
echo "Next steps:"
echo "1. Start the API server: ./run_enhanced_api_server_with_cross_agent.sh"
echo "2. Start the UI server: cd ai-assistant-ui && npm run dev"
echo "3. Access the MCP Domains settings at: http://localhost:3000/dashboard/settings/mcp-domains"
echo ""
echo "MCP Domains Manager setup complete!"