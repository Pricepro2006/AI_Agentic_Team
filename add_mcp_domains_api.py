#!/usr/bin/env python3
"""
Script to add MCP domains API to the API server
"""

import re
import sys
from pathlib import Path

# Path to the API server file
API_SERVER_PATH = Path(__file__).parent / "api_server_enhanced.py"

def update_api_server():
    """Add MCP domains API to the API server"""
    try:
        # Read the current content of the API server file
        content = API_SERVER_PATH.read_text(encoding='utf-8')
        
        # Check if the MCP domains API is already added
        if "from api_endpoints.mcp_domains_api import router as mcp_domains_router" in content:
            print("MCP domains API already added to the API server.")
            return True
            
        # Find the import section end
        last_import_match = re.search(r"from ai_assistant\.orchestration\.aggregator import ResponseAggregator", content)
        if not last_import_match:
            print("Could not find a suitable position to insert the import.")
            return False
        
        import_pos = last_import_match.end()
        import_statement = "\n\n# Import MCP domains API\nfrom api_endpoints.mcp_domains_api import router as mcp_domains_router"
        
        # Insert the import statement
        content = content[:import_pos] + import_statement + content[import_pos:]
        
        # Find the main function
        main_func_match = re.search(r"if __name__ == \"__main__\":", content)
        if not main_func_match:
            print("Could not find the main function.")
            return False
            
        # Find position to insert router before the main function
        insert_pos = main_func_match.start()
        
        # Insert the router include statement
        router_statement = "\n# Include MCP domains API router\napp.include_router(mcp_domains_router)\n\n"
        content = content[:insert_pos] + router_statement + content[insert_pos:]
        
        # Write the updated content back to the file
        API_SERVER_PATH.write_text(content, encoding='utf-8')
        
        print("API server updated with MCP domains API router.")
        return True
        
    except Exception as e:
        print(f"Error updating API server: {str(e)}")
        return False

if __name__ == "__main__":
    success = update_api_server()
    sys.exit(0 if success else 1)