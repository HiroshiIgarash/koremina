# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Japanese VTuber community platform called "koremina" where users can share videos, comment, react, and follow their favorite VTuber "Livers". Built with Next.js 15 and focuses on community interaction around VTuber content.

## Tech Stack

- **Frontend**: Next.js 15.5.4 + TypeScript + React 19
- **UI**: Tailwind CSS 4.1.13 + shadcn/ui components + Framer Motion
- **Authentication**: NextAuth.js v5 beta.16 + Google OAuth
- **Database**: PostgreSQL (Neon) + Prisma ORM 6.16.2
- **Storage**: Vercel Blob for images
- **Email**: Nodemailer for notifications
- **Package Manager**: pnpm 10.18.0 (enforced via preinstall hook)
- **Deployment**: Vercel

## Development Commands

```bash
# Development
pnpm dev                     # Start dev server (localhost:3000)
pnpm dev:host                # Start dev server on local network (192.168.11.31)
pnpm dev:dbprod              # Dev with production database
pnpm build                   # Build for production (includes Prisma SQL generation)

# Code Quality (run these after making changes)
pnpm lint                    # ESLint check
pnpm format                  # Format with Prettier
pnpm format:check            # Check formatting
pnpm test                    # Run Jest tests

# Database
npx prisma generate          # Generate Prisma client
npx prisma db push           # Push schema changes
pnpm prisma:studio:dev       # Open Prisma Studio with local DB
```

## Code Architecture

### Next.js App Router Structure

- `app/(pages)/` - Main application pages with grouped routing
- `app/api/` - API endpoints for database operations and auth
- `components/` - Organized as `ui/`, `shared/`, and `feature/`
- `prisma/schema.prisma` - Database models and relationships

### Key Models

- **User**: Authentication + profile data, favorite livers, email notification settings
- **Video**: Posts with reactions (good, bad, love, funny, cry, angel)
- **Liver**: VTuber/content creator profiles with retirement status and alias support
- **Comment**: Video comments with author relations
- **Bookmark**: User bookmarks for videos
- **Notification**: User notifications with read status tracking
- **Account/Session**: NextAuth.js authentication models
- **VerificationToken**: Email verification tokens

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

## Git Workflow

### Pull Requests

- Base branch: `develop` (default for all PRs)
- Branch naming: Use conventional prefixes (e.g., `feat/`, `fix/`, `chore/`)
- Commit messages: Japanese with conventional prefixes

### Automated Code Review

- PRs trigger Claude Code Review automatically (see `.github/workflows/claude-code-review.yml`)
- To skip automated review, add `[skip-review]` or `[WIP]` to PR title
- Example: `[skip-review] chore: Update dependencies`

### Creating PRs via CLI

```bash
# Skip automated review
gh pr create --base develop --title "[skip-review] Your PR title" --body "Description"

# Normal PR with review
gh pr create --base develop --title "Your PR title" --body "Description"
```

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
- Email notifications via Nodemailer
- SEO: next-sitemap for sitemap generation (outputs to public/)

## Features

### User Features
- Google OAuth authentication
- Profile customization (nickname, bio, profile image)
- Favorite liver selection (most favorite + multiple favorites)
- Email notification settings for new posts
- Bookmark functionality

### Video Features
- YouTube video sharing
- Six reaction types: good, bad, love, funny, cry, angel
- Comment system
- Video tracking (seen status)
- Rich post details

### Notification System
- In-app notifications
- Email notifications (configurable per user)
- Separate notification email support
- Read/unread status tracking
