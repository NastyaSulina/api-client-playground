# Vite Template

A minimal fullstack template using Vite, React, TypeScript, and Express.
Includes a development proxy setup and a simple example API endpoint (getting clients).

## Project Structure
```
src/
  app/              → Application entry and layout
  components/       → Reusable UI components
  api/              → Client-side API layer
  hooks/            → Custom React hooks

server/             → Express backend
shared/             → Shared types
```

## Getting Started

To get started with this project, follow these steps:

1. Install dependencies:

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm dev
```

This starts:
- Vite dev server (http://localhost:5173)
- Express API server (http://localhost:3001)

API routes are proxied via Vite.

## Features

- Client list display using React components.
- Pagination for the client list.
- Error handling for server-side errors.
