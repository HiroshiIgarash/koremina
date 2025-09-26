# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Japanese VTuber community platform called "koremina" where users can share videos, comment, react, and follow their favorite VTuber "Livers". Built with Next.js 15 and focuses on community interaction around VTuber content.

## Tech Stack

- **Frontend**: Next.js 15.5.2 + TypeScript + React 19
- **UI**: Tailwind CSS + shadcn/ui components + Framer Motion
- **Authentication**: NextAuth.js v5 beta + Google OAuth
- **Database**: PostgreSQL (Neon) + Prisma ORM
- **Storage**: Vercel Blob for images
- **Deployment**: Vercel

## Development Commands

```bash
# Development
npm run dev                    # Start dev server (localhost:3000)
npm run dev:host              # Start dev server on local network
npm run build                 # Build for production (includes Prisma generate)

# Code Quality (run these after making changes)
npm run lint                  # ESLint check
npm run format               # Format with Prettier
npm run format:check         # Check formatting
npm test                     # Run Jest tests

# Database
npx prisma generate          # Generate Prisma client
npx prisma db push          # Push schema changes
npm run prisma:studio:dev   # Open Prisma Studio with local DB
```

## Code Architecture

### Next.js App Router Structure

- `app/(pages)/` - Main application pages with grouped routing
- `app/api/` - API endpoints for database operations and auth
- `components/` - Organized as `ui/`, `shared/`, and `feature/`
- `prisma/schema.prisma` - Database models and relationships

### Key Models

- **User**: Authentication + profile data, favorite livers
- **Video**: Posts with reactions (good, bad, love, funny, cry, angel)
- **Liver**: VTuber/content creator profiles
- **Comment**: Video comments with author relations
- **Bookmark**: User bookmarks for videos

### Authentication Flow

- NextAuth.js v5 with Google OAuth and Prisma adapter
- Session management via database sessions
- Protected routes handled in `middleware.ts`

## Code Conventions

### Language Standards

- **Comments & Documentation**: Japanese language
- **Commit Messages**: Japanese with conventional prefixes (feat:, fix:, etc.)
- **Variable/Function Names**: English camelCase
- **User Messages**: Japanese

### Formatting (Prettier)

- Double quotes, semicolons required
- 2-space indentation, 80-char line width
- ES5 trailing commas, LF line endings

### TypeScript

- Strict mode enabled, ES2017 target
- Path alias: `@/*` maps to project root
- Type definitions in `types/` directory

## Database Development

### Schema Changes

1. Edit `prisma/schema.prisma`
2. Run `npx prisma db push` (development)
3. Run `npx prisma generate` to update client

### Environment Variables

- `POSTGRES_PRISMA_URL` - Connection pooling (production)
- `POSTGRES_URL_NON_POOLING` - Direct connection (migrations)

## Testing

- Jest + Testing Library setup
- Tests in `__tests__/` directory
- Run `npm test` for test suite

## Deployment Notes

- Vercel deployment with automatic builds
- Image uploads via Vercel Blob storage
- Uses Node.js 22.16.0 (volta managed)
- Production builds include Prisma SQL generation
