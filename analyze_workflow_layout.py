#!/usr/bin/env python3
"""Analyze workflow layout for color grouping and spacing"""

import json

with open('/home/pricepro2006/iems_project/ehas_project/ai_assistant/n8n_workflows/Full_26_Agentic_Team_Proper_Expert_Layout_CLEAN_HORIZONTAL.json', 'r') as f:
    data = json.load(f)
    nodes = data['nodes']
    
    # Get sticky notes
    stickies = [n for n in nodes if n.get('type') == 'n8n-nodes-base.stickyNote']
    
    print('=== COLOR GROUPING AND SPACING ANALYSIS ===')
    print('')
    
    # Analyze color grouping
    color_positions = {}
    for sticky in stickies:
        color = sticky['parameters']['color']
        pos = sticky['position']
        if color not in color_positions:
            color_positions[color] = []
        color_positions[color].append({'name': sticky['name'], 'x': pos[0], 'y': pos[1]})
    
    # Color names
    color_names = {1:'Gray', 2:'Brown', 3:'Red', 4:'Orange', 5:'Yellow', 
                  6:'Green', 7:'Cyan', 8:'Blue', 9:'Purple', 10:'Pink'}
    
    print('COLOR GROUPING:')
    for color, positions in sorted(color_positions.items()):
        print(f'\n{color_names.get(color, f"Color{color}")} ({color}):')
        for p in sorted(positions, key=lambda x: (x['y'], x['x'])):
            print(f'  {p["name"]:25} at ({p["x"]}, {p["y"]})')
    
    # Check spacing
    print('\n\nSPACING ANALYSIS:')
    sticky_width = 3200
    sticky_height = 2400
    col_spacing = 3400
    row_spacing = 2600
    
    print(f'Sticky dimensions: {sticky_width} × {sticky_height}')
    print(f'Column spacing: {col_spacing} (gap: {col_spacing - sticky_width} = 200 pixels)')
    print(f'Row spacing: {row_spacing} (gap: {row_spacing - sticky_height} = 200 pixels)')
    
    # Check for overlaps
    print('\nOVERLAP CHECK:')
    overlaps = []
    for i, s1 in enumerate(stickies):
        x1, y1 = s1['position']
        for j, s2 in enumerate(stickies[i+1:], i+1):
            x2, y2 = s2['position']
            # Check if rectangles overlap
            if not (x1 + sticky_width <= x2 or x2 + sticky_width <= x1 or
                    y1 + sticky_height <= y2 or y2 + sticky_height <= y1):
                overlaps.append((s1['name'], s2['name']))
    
    if overlaps:
        print('❌ Found overlapping sticky notes:')
        for o in overlaps:
            print(f'  {o[0]} overlaps with {o[1]}')
    else:
        print('✅ No overlapping sticky notes - all have proper spacing')
    
    # Check AI Agent nodes
    print('\n\nAI AGENT ROOT NODE ANALYSIS:')
    agent_nodes = []
    for n in nodes:
        if n.get('type') != 'n8n-nodes-base.stickyNote':
            name = n.get('name', '').lower()
            node_type = n.get('type', '')
            # Look for AI agent root nodes
            if ('agent' in name and any(x in node_type for x in ['agent', 'langchain'])) or \
               any(x in name for x in ['orchestrator agent', 'expert agent', 'specialist agent']):
                agent_nodes.append(n)
    
    print(f'Total AI Agent root nodes found: {len(agent_nodes)}')
    
    # Count unique agent types
    agent_types = set()
    for n in agent_nodes:
        name = n.get('name', '')
        # Extract agent type
        if 'Master Orchestrator' in name:
            agent_types.add('master_orchestrator')
        elif 'Architecture Expert' in name:
            agent_types.add('architecture_expert')
        elif 'Python Expert' in name:
            agent_types.add('python_expert')
        # Add more as needed
        
    print(f'Unique agent types identified: {len(agent_types)}')
    print(f'Sticky notes created: {len(stickies)}')
    
    # Verify one-to-one mapping
    print('\n\nCOLOR PROXIMITY CHECK:')
    # Check if same-colored sticky notes are near each other
    for color, positions in sorted(color_positions.items()):
        if len(positions) > 1:
            print(f'\n{color_names.get(color, f"Color{color}")} sticky notes:')
            # Check if they're in adjacent positions
            positions_sorted = sorted(positions, key=lambda x: (x['y'], x['x']))
            for i in range(len(positions_sorted)-1):
                p1 = positions_sorted[i]
                p2 = positions_sorted[i+1]
                # Check if adjacent (same row or column)
                if p1['y'] == p2['y']:
                    print(f'  ✓ {p1["name"]} and {p2["name"]} are in same row')
                elif abs(p1['x'] - p2['x']) <= col_spacing:
                    print(f'  ✓ {p1["name"]} and {p2["name"]} are in adjacent columns')