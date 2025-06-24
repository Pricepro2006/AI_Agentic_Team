#!/usr/bin/env python3
"""
Create proper agent clusters with correct color grouping
"""

import json
import logging
from typing import Dict, List, Any, Tuple, Set

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('create_agent_clusters')

class ProperAgentClusterCreator:
    def __init__(self, workflow_file: str):
        self.workflow_file = workflow_file
        self.workflow_data = {}
        self.nodes = []
        self.connections = []
        
        # Define color groups and layout
        self.agent_layout = [
            # Row 0 - Core (Orange) + Development (Yellow) + Version Control (Purple)
            [
                {'id': 'master_orchestrator', 'name': 'Master Orchestrator', 'color': 4},
                {'id': 'architecture_expert', 'name': 'Architecture Expert', 'color': 5},
                {'id': 'python_expert', 'name': 'Python Expert', 'color': 5},
                {'id': 'documentation_expert', 'name': 'Documentation Expert', 'color': 5},
                {'id': 'version_control', 'name': 'Version Control', 'color': 9},
            ],
            # Row 1 - DevOps (Purple) + Automation (Green)
            [
                {'id': 'github_workflow', 'name': 'GitHub Workflow', 'color': 9},
                {'id': 'vscode_expert', 'name': 'VS Code Expert', 'color': 9},
                {'id': 'n8n_expert', 'name': 'N8N Expert', 'color': 6},
                {'id': 'automation_expert', 'name': 'Automation Expert', 'color': 6},
                {'id': 'power_automate', 'name': 'Power Automate', 'color': 6},
            ],
            # Row 2 - Data/AI (Blue) + Integration (Cyan)
            [
                {'id': 'vector_search', 'name': 'Vector Search', 'color': 8},
                {'id': 'data_pipeline', 'name': 'Data Pipeline', 'color': 8},
                {'id': 'llm_integration', 'name': 'LLM Integration', 'color': 8},
                {'id': 'mcp_integration', 'name': 'MCP Integration', 'color': 7},
                {'id': 'api_integration', 'name': 'API Integration', 'color': 7},
            ],
            # Row 3 - Security (Red) + Management (Brown)
            [
                {'id': 'security_specialist', 'name': 'Security Specialist', 'color': 3},
                {'id': 'risk_manager', 'name': 'Risk Manager', 'color': 3},
                {'id': 'project_organization', 'name': 'Project Organization', 'color': 2},
                {'id': 'sprint_manager', 'name': 'Sprint Manager', 'color': 2},
                {'id': 'multi_project_manager', 'name': 'Multi-Project Manager', 'color': 2},
            ],
            # Row 4 - Additional (Brown + Pink + Green)
            [
                {'id': 'pdr_framework', 'name': 'PDR Framework', 'color': 2},
                {'id': 'performance_optimization', 'name': 'Performance Optimization', 'color': 10},
                {'id': 'ui_ux_design', 'name': 'UI/UX Design', 'color': 10},
                {'id': 'automation_integration', 'name': 'Automation Integration', 'color': 6},
                None,  # Empty cell
            ],
        ]
        
        # Layout settings
        self.base_x = -16000
        self.base_y = -8000
        self.col_spacing = 3400
        self.row_spacing = 2600
        self.sticky_width = 3200
        self.sticky_height = 2400
        
    def load_workflow(self):
        """Load workflow and extract connections"""
        with open(self.workflow_file, 'r') as f:
            self.workflow_data = json.load(f)
        
        self.nodes = [n for n in self.workflow_data.get('nodes', []) 
                     if n.get('type') != 'n8n-nodes-base.stickyNote']
        self.connections = self.workflow_data.get('connections', {})
        
        logger.info(f"Loaded {len(self.nodes)} nodes")
        
    def find_agent_root_nodes(self) -> Dict[str, Dict]:
        """Find actual AI Agent root nodes"""
        agent_roots = {}
        
        for node in self.nodes:
            node_name = node.get('name', '').lower()
            node_type = node.get('type', '')
            
            # Check for agent nodes
            is_agent_node = (
                '@n8n/n8n-nodes-langchain.agent' in node_type or
                ('agent' in node_name and any(x in node_name for x in [
                    'master orchestrator', 'architecture', 'python', 'documentation',
                    'github', 'security', 'vector', 'project', 'sprint', 'n8n',
                    'vscode', 'vs code', 'automation', 'power automate', 'data pipeline',
                    'llm', 'mcp', 'api', 'risk', 'version', 'multi-project', 'pdr',
                    'performance', 'ui/ux', 'ui ux'
                ]))
            )
            
            if is_agent_node:
                # Identify agent type
                agent_type = self.identify_agent_type(node_name)
                if agent_type:
                    agent_roots[agent_type] = node
                    logger.info(f"Found agent root: {agent_type} - {node['name']}")
                    
        return agent_roots
        
    def identify_agent_type(self, name: str) -> str:
        """Map agent name to type"""
        name_lower = name.lower()
        
        mappings = {
            'master orchestrator': 'master_orchestrator',
            'architecture': 'architecture_expert',
            'python': 'python_expert',
            'documentation': 'documentation_expert',
            'version control': 'version_control',
            'github': 'github_workflow',
            'vscode': 'vscode_expert',
            'vs code': 'vscode_expert',
            'n8n': 'n8n_expert',
            'automation expert': 'automation_expert',
            'power automate': 'power_automate',
            'vector': 'vector_search',
            'data pipeline': 'data_pipeline',
            'llm': 'llm_integration',
            'mcp': 'mcp_integration',
            'api integration': 'api_integration',
            'security': 'security_specialist',
            'risk': 'risk_manager',
            'project organization': 'project_organization',
            'sprint': 'sprint_manager',
            'multi-project': 'multi_project_manager',
            'multi project': 'multi_project_manager',
            'pdr': 'pdr_framework',
            'performance': 'performance_optimization',
            'ui/ux': 'ui_ux_design',
            'ui ux': 'ui_ux_design',
            'automation integration': 'automation_integration',
        }
        
        for key, value in mappings.items():
            if key in name_lower:
                return value
                
        return None
        
    def find_connected_nodes(self, root_node: Dict) -> List[Dict]:
        """Find all nodes connected to a root node"""
        connected = [root_node]
        connected_ids = {root_node['id']}
        
        # Get directly connected nodes
        node_id = root_node['id']
        
        # Check outgoing connections
        if node_id in self.connections:
            for output_name, output_connections in self.connections[node_id].items():
                if isinstance(output_connections, list):
                    for conn in output_connections:
                        if isinstance(conn, dict) and 'node' in conn:
                            target_id = conn['node']
                            if target_id not in connected_ids:
                                target_node = next((n for n in self.nodes if n['id'] == target_id), None)
                                if target_node:
                                    connected.append(target_node)
                                    connected_ids.add(target_id)
                            
        # Check incoming connections
        for source_id, outputs in self.connections.items():
            if isinstance(outputs, dict):
                for output_name, output_connections in outputs.items():
                    if isinstance(output_connections, list):
                        for conn in output_connections:
                            if isinstance(conn, dict) and 'node' in conn:
                                if conn['node'] == node_id and source_id not in connected_ids:
                                    source_node = next((n for n in self.nodes if n['id'] == source_id), None)
                                    if source_node:
                                        # Only add if it's a relevant node (memory, chat, tool)
                                        name_lower = source_node.get('name', '').lower()
                                        if any(x in name_lower for x in ['memory', 'chat', 'ollama', 'tool', 'code']):
                                            connected.append(source_node)
                                            connected_ids.add(source_id)
                                
        return connected
        
    def create_layout(self):
        """Create the proper layout with agent clusters"""
        # Find agent root nodes
        agent_roots = self.find_agent_root_nodes()
        
        # Track which nodes have been placed
        placed_node_ids = set()
        
        # Create new nodes list
        new_nodes = []
        
        # Process each position in the grid
        for row_idx, row in enumerate(self.agent_layout):
            for col_idx, agent_config in enumerate(row):
                if agent_config is None:
                    continue
                    
                agent_id = agent_config['id']
                
                # Calculate sticky position
                x = self.base_x + (col_idx * self.col_spacing)
                y = self.base_y + (row_idx * self.row_spacing)
                
                # Get agent root and connected nodes
                agent_root = agent_roots.get(agent_id)
                if agent_root:
                    cluster_nodes = self.find_connected_nodes(agent_root)
                else:
                    cluster_nodes = []
                    
                # Create sticky note
                sticky = {
                    'id': f'sticky-{agent_id}-final',
                    'name': agent_config['name'],
                    'type': 'n8n-nodes-base.stickyNote',
                    'typeVersion': 1,
                    'position': [x, y],
                    'parameters': {
                        'content': f"## {agent_config['name']}\\n\\n{len(cluster_nodes)} nodes",
                        'height': self.sticky_height,
                        'width': self.sticky_width,
                        'color': agent_config['color']
                    }
                }
                new_nodes.append(sticky)
                
                # Position cluster nodes
                margin = 80
                node_width = 280
                node_height = 140
                spacing = 25
                
                # Organize nodes by type
                agent_nodes = [n for n in cluster_nodes if 'agent' in n.get('type', '').lower()]
                memory_nodes = [n for n in cluster_nodes if 'memory' in n.get('name', '').lower()]
                chat_nodes = [n for n in cluster_nodes if any(x in n.get('name', '').lower() for x in ['chat', 'ollama'])]
                other_nodes = [n for n in cluster_nodes if n not in agent_nodes + memory_nodes + chat_nodes]
                
                # Place in order: agent -> memory -> chat -> others
                ordered_nodes = agent_nodes + memory_nodes + chat_nodes + other_nodes
                
                for i, node in enumerate(ordered_nodes):
                    # Calculate position
                    cols_per_row = (self.sticky_width - 2 * margin) // (node_width + spacing)
                    col = i % cols_per_row
                    row = i // cols_per_row
                    
                    node_x = x + margin + col * (node_width + spacing)
                    node_y = y + margin + row * (node_height + spacing)
                    
                    # Keep within bounds
                    node_x = min(node_x, x + self.sticky_width - node_width - margin)
                    node_y = min(node_y, y + self.sticky_height - node_height - margin)
                    
                    node['position'] = [int(node_x), int(node_y)]
                    new_nodes.append(node)
                    placed_node_ids.add(node['id'])
                    
        # Add remaining nodes to master orchestrator
        remaining_nodes = [n for n in self.nodes if n['id'] not in placed_node_ids]
        if remaining_nodes:
            logger.info(f"Placing {len(remaining_nodes)} remaining nodes on Master Orchestrator")
            
            # Find master orchestrator sticky
            master_x = self.base_x
            master_y = self.base_y
            
            margin = 80
            node_width = 250
            node_height = 120
            spacing = 20
            
            for i, node in enumerate(remaining_nodes):
                cols_per_row = (self.sticky_width - 2 * margin) // (node_width + spacing)
                col = i % cols_per_row
                row = i // cols_per_row
                
                node_x = master_x + margin + col * (node_width + spacing)
                node_y = master_y + margin + row * (node_height + spacing)
                
                node_x = min(node_x, master_x + self.sticky_width - node_width - margin)
                node_y = min(node_y, master_y + self.sticky_height - node_height - margin)
                
                node['position'] = [int(node_x), int(node_y)]
                new_nodes.append(node)
                
        # Update workflow
        self.workflow_data['nodes'] = new_nodes
        self.workflow_data['connections'] = self.connections
        
        logger.info(f"Created layout with {len([n for n in new_nodes if n.get('type') == 'n8n-nodes-base.stickyNote'])} sticky notes")
        
    def save_workflow(self):
        """Save the workflow"""
        output_file = self.workflow_file.replace('.json', '_PROPER_CLUSTERS.json')
        
        with open(output_file, 'w') as f:
            json.dump(self.workflow_data, f, indent=2, ensure_ascii=False)
            
        return output_file
        
    def run(self):
        """Run the creator"""
        logger.info("Creating proper agent clusters with color grouping...")
        
        self.load_workflow()
        self.create_layout()
        output_file = self.save_workflow()
        
        # Print visual grid
        print("\n📊 COLOR LAYOUT GRID:")
        print("=" * 50)
        
        color_names = {
            2: 'BRN', 3: 'RED', 4: 'ORG', 5: 'YEL', 6: 'GRN',
            7: 'CYN', 8: 'BLU', 9: 'PRP', 10: 'PNK'
        }
        
        for row in self.agent_layout:
            row_str = ""
            for agent in row:
                if agent:
                    color = color_names.get(agent['color'], '???')
                    row_str += f"[{color}] "
                else:
                    row_str += "[   ] "
            print(row_str)
            
        print("\nLEGEND:")
        print("ORG=Orange, YEL=Yellow, PRP=Purple, GRN=Green")
        print("BLU=Blue, CYN=Cyan, RED=Red, BRN=Brown, PNK=Pink")
        
        print(f"\n✅ Workflow created with proper agent clusters!")
        print(f"📁 Output: {output_file}")
        
        return output_file


def main():
    workflow_file = "/home/pricepro2006/iems_project/ehas_project/ai_assistant/n8n_workflows/Full_26_Agentic_Team_Proper_Expert_Layout_CLEAN_HORIZONTAL.json"
    
    creator = ProperAgentClusterCreator(workflow_file)
    creator.run()


if __name__ == "__main__":
    main()