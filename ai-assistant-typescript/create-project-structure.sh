#!/bin/bash

echo "🏗️ Creating AI Assistant TypeScript Project Structure..."

# Create main source directories
mkdir -p src/{agents,tools,infrastructure,integration,orchestration,types,utils,config}

# Create agent subdirectories
mkdir -p src/agents/{base,core,domain,specialized,management}

# Create tool subdirectories
mkdir -p src/tools/{shared,agent-specific}

# Create infrastructure subdirectories
mkdir -p src/infrastructure/{logging,monitoring,error-handling,performance,security}

# Create integration subdirectories
mkdir -p src/integration/{n8n,mcp,github,vector-db,ollama,api}

# Create test directories
mkdir -p tests/{unit,integration,e2e,performance,utils,fixtures,mocks}

# Create script directories
mkdir -p scripts/{build,deploy,migrate,validate,dev}

# Create N8N directories
mkdir -p n8n/{nodes,workflows,templates,toolcode-snippets}

# Create documentation directories
mkdir -p docs/{api,architecture,deployment,migration,guides,diagrams}

# Create config directories
mkdir -p config/{production,staging,development,test}

# Create additional directories
mkdir -p {dist,coverage,logs,temp}

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Build outputs
dist/
build/
*.tsbuildinfo

# Test coverage
coverage/
.nyc_output/

# Logs
logs/
*.log

# Environment files
.env
.env.local
.env.*.local

# IDE
.idea/
.vscode/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Temporary files
temp/
tmp/
*.tmp

# API keys and secrets
config/secrets/
*.key
*.pem

# Test artifacts
test-results/
*.test.js
*.test.d.ts

# Documentation build
docs/_build/
docs/.vitepress/dist/

# Cache
.cache/
.parcel-cache/
.next/
.nuxt/

# Misc
*.bak
*.backup
.history/
EOF

# Create base tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "alwaysStrict": true,
    "allowSyntheticDefaultImports": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "paths": {
      "@/*": ["*"],
      "@agents/*": ["agents/*"],
      "@tools/*": ["tools/*"],
      "@infrastructure/*": ["infrastructure/*"],
      "@integration/*": ["integration/*"],
      "@orchestration/*": ["orchestration/*"],
      "@types/*": ["types/*"],
      "@utils/*": ["utils/*"],
      "@config/*": ["config/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "coverage", "**/*.test.ts", "**/*.spec.ts"]
}
EOF

# Create jest.config.js
cat > jest.config.js << 'EOF'
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 95,
      statements: 95
    }
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@agents/(.*)$': '<rootDir>/src/agents/$1',
    '^@tools/(.*)$': '<rootDir>/src/tools/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@integration/(.*)$': '<rootDir>/src/integration/$1',
    '^@orchestration/(.*)$': '<rootDir>/src/orchestration/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1'
  },
  testTimeout: 30000,
  globals: {
    'ts-jest': {
      tsconfig: {
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      },
    },
  },
}
EOF

# Create .eslintrc.js
cat > .eslintrc.js << 'EOF'
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'jest', 'security'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'plugin:security/recommended',
    'prettier',
  ],
  env: {
    node: true,
    jest: true,
    es2022: true,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'error',
    'import/order': ['error', {
      'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
      'alphabetize': { order: 'asc' }
    }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'security/detect-object-injection': 'warn',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
}
EOF

# Create .prettierrc
cat > .prettierrc << 'EOF'
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always",
  "endOfLine": "lf"
}
EOF

# Create README.md
cat > README.md << 'EOF'
# AI Assistant TypeScript

Production-ready TypeScript implementation of the AI Agentic Team system.

## 🏗️ Architecture

This system implements 26 specialized AI experts using TypeScript and the Mastra framework.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Start development server
npm run dev
```

## 📁 Project Structure

- `src/agents/` - AI expert implementations
- `src/tools/` - Tool implementations
- `src/infrastructure/` - Core infrastructure (logging, monitoring, etc.)
- `src/integration/` - External service integrations
- `src/orchestration/` - Expert orchestration logic
- `tests/` - Comprehensive test suite
- `n8n/` - N8N workflow integration
- `docs/` - Documentation

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test suite
npm test -- --testPathPattern=agents

# Run E2E tests
npm run test:e2e
```

## 📊 Quality Standards

- TypeScript strict mode
- >95% test coverage
- Zero `any` types
- Comprehensive error handling
- Performance monitoring

## 🔧 Development

```bash
# Start development mode
npm run dev

# Run linting
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

## 📦 Deployment

```bash
# Build for production
npm run build:prod

# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:prod
```

## 📚 Documentation

See the `docs/` directory for comprehensive documentation.
EOF

echo "✅ Project structure created successfully!"
echo ""
echo "📁 Directory structure:"
tree -d -L 3 --noreport

echo ""
echo "📄 Configuration files created:"
echo "  - tsconfig.json"
echo "  - jest.config.js"
echo "  - .eslintrc.js"
echo "  - .prettierrc"
echo "  - .gitignore"
echo "  - README.md"