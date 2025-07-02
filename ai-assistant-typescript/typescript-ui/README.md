# TypeScript AI Assistant UI

A dedicated UI for the TypeScript-based AI Agent System, featuring the Architecture Expert agent.

## Overview

This is a **completely separate** UI from the Python AI Assistant system. It's designed specifically for the TypeScript implementation and currently supports:

- **Architecture Expert**: AI agent specialized in TypeScript architecture and design patterns
- **Simple Authentication**: Demo authentication system (not for production use)
- **Clean Interface**: Blue/Purple themed UI to distinguish from the Python system

## Key Differences from Python UI

| Feature | Python UI | TypeScript UI |
|---------|-----------|---------------|
| Port | 3000 | 3100 |
| API Port | 8000 | 8001 |
| Agents | 23 agents | 1 agent (Architecture Expert) |
| Theme | Green/Teal | Blue/Purple |
| Auth | Full auth system | Simple demo auth |

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Access the UI**:
   - Open http://localhost:3100
   - Login with: `admin@typescript.ai` / `typescript123`

## Architecture

```
typescript-ui/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with theme
│   ├── page.tsx           # Home page (redirects to login)
│   ├── login/             # Login page
│   ├── dashboard/         # Main dashboard
│   └── architecture-expert/ # Architecture Expert interface
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utilities and services
│   ├── api/              # API client
│   ├── auth/             # Authentication store
│   └── utils.ts          # Utility functions
└── middleware.ts          # Next.js middleware for auth

```

## Development

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_API_URL=http://localhost:8001
NEXT_PUBLIC_APP_URL=http://localhost:3100
NEXT_PUBLIC_APP_NAME=AI Assistant TypeScript
NEXT_PUBLIC_MOCK_AUTH=false
```

### Available Scripts

- `npm run dev` - Start development server on port 3100
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Authentication

The TypeScript UI uses a simplified authentication system for demo purposes:

- **Credentials**: `admin@typescript.ai` / `typescript123`
- **Storage**: Zustand with localStorage persistence
- **Token**: Simple timestamp-based token (not secure for production)

### API Integration

The UI connects to the TypeScript API server on port 8001. The API client is configured in `lib/api/client.ts`.

Current endpoints:
- `GET /agents/architecture-expert` - Get Architecture Expert details
- `POST /agents/architecture-expert/execute` - Execute a task
- `GET /agents/architecture-expert/history` - Get task history

## Styling

The UI uses:
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - React component library
- **Custom theme** - Blue/Purple color scheme to distinguish from Python UI

## Future Enhancements

1. Add more TypeScript-specific agents
2. Implement real authentication with JWT
3. Add WebSocket support for real-time updates
4. Create visualization tools for architecture analysis
5. Add code upload and analysis features

## Troubleshooting

### Port conflicts
If port 3100 is in use, you can change it in `package.json`:
```json
"dev": "next dev -p 3101"
```

### API connection issues
Check that the TypeScript API server is running on port 8001:
```bash
curl http://localhost:8001/health
```

### Authentication issues
Clear localStorage and try logging in again:
```javascript
localStorage.clear()
```

## License

Part of the AI Assistant TypeScript project.