#!/bin/bash

# Create directories in the archive folder
mkdir -p archive/test_files
mkdir -p archive/logs
mkdir -p archive/backups
mkdir -p archive/old_workflows
mkdir -p archive/old_documentation
mkdir -p archive/temp_scripts

# Move test files to archive/test_files
echo "Moving test files to archive/test_files..."
find . -name "test_*.py" -not -path "./tools/*" -not -path "./archive/*" -exec mv {} archive/test_files/ \;
find . -name "test_*.sh" -not -path "./tools/*" -not -path "./archive/*" -exec mv {} archive/test_files/ \;
find . -name "test_*.json" -not -path "./tools/*" -not -path "./archive/*" -exec mv {} archive/test_files/ \;

# Move log files to archive/logs
echo "Moving log files to archive/logs..."
find . -name "*.log" -not -path "./archive/*" -exec mv {} archive/logs/ \;

# Move backup files to archive/backups
echo "Moving backup files to archive/backups..."
find . -name "*.bak*" -not -path "./archive/*" -exec mv {} archive/backups/ \;
find . -name "*.backup*" -not -path "./archive/*" -exec mv {} archive/backups/ \;
find . -name "*_backup_*" -not -path "./archive/*" -not -path "./n8n_workflows/*" -exec mv {} archive/backups/ \;

# Move old workflow JSON files to archive/old_workflows
echo "Moving old workflow files to archive/old_workflows..."
find ./n8n_workflows -name "*.json" -not -path "*ULTIMATE_AGENTIC_WORKFLOW_FINAL*" -not -path "*Full_Agentic_System_RAG_Connected_RAG_ALL_CONNECTED_20250620_114723_fixed_registry*" -not -path "./archive/*" -not -path "./n8n_workflows/core/*" -not -path "./n8n_workflows/bridges/*" -exec mv {} archive/old_workflows/ \;

# Move old documentation files to archive/old_documentation
echo "Moving old documentation files to archive/old_documentation..."
find . -name "*.md.bak*" -not -path "./archive/*" -exec mv {} archive/old_documentation/ \;
find . -name "*.md.backup*" -not -path "./archive/*" -exec mv {} archive/old_documentation/ \;

# Move temporary scripts to archive/temp_scripts
echo "Moving temporary scripts to archive/temp_scripts..."
find . -name "fix_*.py" -not -path "./tools/*" -not -path "./archive/*" -exec mv {} archive/temp_scripts/ \;
find . -name "fix_*.sh" -not -path "./tools/*" -not -path "./archive/*" -exec mv {} archive/temp_scripts/ \;

echo "Cleanup complete. Files have been moved to the archive directory."