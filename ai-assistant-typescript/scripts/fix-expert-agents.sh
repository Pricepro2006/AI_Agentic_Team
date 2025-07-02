#!/bin/bash

# Script to fix common issues in Expert Agent files
# This will apply batch fixes for the most common structural issues

echo "Starting Expert Agent fixes..."

# Fix 1: Add missing modelPreferences to all expert agents
echo "Fixing missing modelPreferences..."
find src/agents/experts -name "*.ts" -type f | while read file; do
    if grep -q "buildAgentConfig" "$file" && ! grep -q "modelPreferences:" "$file"; then
        echo "Adding modelPreferences to $file"
        sed -i '/metadata: {/a\      },\n      modelPreferences: {\n        preferMultiModel: true,\n        fallbackToLegacy: true' "$file"
    fi
done

# Fix 2: Add missing retries property to ToolExecutionResult returns
echo "Fixing missing retries property..."
find src/agents/experts -name "*.ts" -type f | while read file; do
    # Fix success: true returns without retries
    sed -i 's/return {\s*success: true,/return {\n      success: true,\n      retries: 0,/g' "$file"
    
    # Fix success: false returns without retries
    sed -i 's/return {\s*success: false,/return {\n      success: false,\n      retries: 0,/g' "$file"
    
    # Fix inline object returns
    sed -i 's/{ success: true, data:/{ success: true, retries: 0, data:/g' "$file"
    sed -i 's/{ success: false, error:/{ success: false, retries: 0, error:/g' "$file"
done

# Fix 3: Import getErrorMessage for error handling
echo "Fixing error handling imports..."
find src/agents/experts -name "*.ts" -type f | while read file; do
    if grep -q "error is of type 'unknown'" "$file" && ! grep -q "getErrorMessage" "$file"; then
        echo "Adding getErrorMessage import to $file"
        sed -i '1s/^/import { getErrorMessage } from '\''..\/..\/utils\/error.utils'\''\n/' "$file"
    fi
done

# Fix 4: Replace error.message with getErrorMessage(error)
echo "Fixing error handling..."
find src/agents/experts -name "*.ts" -type f | while read file; do
    sed -i 's/error\.message/getErrorMessage(error)/g' "$file"
    sed -i 's/\${error}/\${getErrorMessage(error)}/g' "$file"
done

# Fix 5: Add metadata to model configurations
echo "Fixing model metadata..."
find src/agents/experts -name "*.ts" -type f | while read file; do
    # Add metadata: {} to model configs that don't have it
    sed -i '/specialties: \[.*\]$/s/$/,\n            metadata: {}/' "$file"
done

echo "Expert Agent fixes completed!"
echo "Run 'npm run typecheck' to verify the fixes"