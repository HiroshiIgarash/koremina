# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Japanese VTuber community platform called "koremina" where users can share videos, comment, react, and follow their favorite VTuber "Livers". Built with Next.js 16 and focuses on community interaction around VTuber content.

## Tech Stack

- **Frontend**: Next.js 16.1.6 + TypeScript + React 19.2.4
- **UI**: Tailwind CSS 4.2.0 + shadcn/ui components + Motion (formerly Framer Motion)
- **Authentication**: NextAuth.js v5 beta.16 + Google OAuth + Twitter OAuth
- **Database**: PostgreSQL (Neon) + Prisma ORM 7.0.0 + @prisma/adapter-pg (v7 driver adapter)
- **Storage**: Vercel Blob for images
- **Email**: Nodemailer for notifications
- **Package Manager**: pnpm 10.32.1 (enforced via preinstall hook)
- **Deployment**: Vercel

## Development Commands

```bash
# Development
pnpm dev                     # Start dev server with Turbopack (localhost:3000)
pnpm dev:host                # Start dev server on local network
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
- `app/action/` - Server Actions for database operations (main data access layer)
- `app/api/` - API endpoints (auth, post creation, image upload, notifications)
- `components/` - Organized as `ui/`, `shared/`, and `feature/`
- `prisma/schema.prisma` - Database models and relationships
- `types/type.ts` - Shared type definitions (`Reaction`, `NotificationType`)

### Server Actions (app/action/)

Server Actions are the primary data access layer, handling most database operations:

- **Posts**: `getPosts`, `getPostById`, `getTotalPosts`, `getTotalUserPosts`, `getUserPosts`, `getRecentPostsByUserId`, `deletePost`, `getVideoImage`
- **Users**: `getCurrentUser`, `getCurrentUserWithTag`, `getUserById`, `updateNickname`, `updateBio`, `updateAvatar`, `updateFavoriteLivers`, `updateMostFavoriteLiver`
- **Reactions & Interactions**: `updateReaction`, `updateSeenUsers`, `postComment`, `deleteComment`, `getCommentsByPostId`, `getReactionsByPostId`, `sendReportMail`
- **Bookmarks**: `getBookmarksById`, `getBookmarkInfoByPostId`, `getTotalBookmarksById`, `updateBookmark`
- **Livers**: `getLivers`, `getBirthdayLivers`, `getChannelIcon`, `updateLivers`
- **Notifications**: `updateNotification`, `updateReadAllNotifications`, `updateNotifyNewPostByEmail`, `updateNotificationEmail`

### API Routes (app/api/)

Used for operations that require HTTP endpoints:

- `/auth/[...nextauth]` - NextAuth.js authentication
- `/post` - Create/update video posts
- `/liver` - Liver data endpoints
- `/vercelblob` - Image upload to Vercel Blob
- `/notifications/confirm` - Email verification confirmation

### Key Models

- **User**: Authentication + profile data, favorite livers, email notification settings (double opt-in with HMAC tokens)
- **Video**: Posts with reactions (good, bad, love, funny, cry, angel), seen users, bookmarks
- **Liver**: VTuber/content creator profiles with retirement status, overseas flag, and alias support
- **Comment**: Video comments with cascading deletes
- **Bookmark**: User bookmarks for videos (unique per user+post)
- **Notification**: User notifications with read status tracking (reaction/comment types)
- **Account/Session**: NextAuth.js authentication models
- **VerificationToken**: Email verification tokens

### Authentication Flow

- NextAuth.js v5 with Google OAuth (automatic) and Twitter OAuth (manual)
- Session management via database sessions
- Custom pages: `/login`, `/auth_error`
- Protected routes handled in `middleware.ts`

### Next.js Configuration

- `typedRoutes: true` - Type-safe route generation (compile-time link checking)
- `cacheComponents: true` - Next.js 16 cache components feature
- Image remote patterns: Google OAuth, YouTube thumbnails, Twitter, Vercel Blob

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
- Type definitions in `types/type.ts`

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

<!-- AUTO-GENERATED from .env.example — edit .env.example to update -->

| 変数名 | 必須 | 説明 |
|--------|------|------|
| `DATABASE_URL` | Yes | PostgreSQL 接続文字列（接続プール） |
| `DATABASE_URL_UNPOOLED` | Yes | PostgreSQL 直接接続（マイグレーション用） |
| `POSTGRES_LOCAL_URL` | Dev | ローカル DB URL（prisma:studio:dev で使用） |
| `AUTH_SECRET` | Yes | NextAuth.js シークレット（`openssl rand -base64 32`） |
| `AUTH_GOOGLE_ID` | Yes | Google OAuth クライアント ID |
| `AUTH_GOOGLE_SECRET` | Yes | Google OAuth クライアントシークレット |
| `AUTH_TWITTER_ID` | Yes | Twitter/X OAuth クライアント ID |
| `AUTH_TWITTER_SECRET` | Yes | Twitter/X OAuth クライアントシークレット |
| `YT_API_KEY` | Yes | YouTube Data API v3 キー |
| `BLOB_READ_WRITE_TOKEN` | Yes | Vercel Blob ストレージトークン |
| `MAILER_USER` | Yes | Gmail アドレス（Nodemailer SMTP） |
| `MAILER_PASS` | Yes | Gmail アプリパスワード |
| `EMAIL_TOKEN_HMAC_SECRET` | Yes | メール確認用 HMAC シークレット（256bit 以上） |
| `NEXT_PUBLIC_BASE_URL` | Yes | アプリのベース URL（例: `http://localhost:3000`） |
| `VERCEL_PREVIEW_URL` | Preview | Vercel プレビュー環境 URL |

<!-- END AUTO-GENERATED -->

## Testing

- Jest + Testing Library setup
- Tests in `__tests__/` directory
- Run `pnpm test` for test suite

## Deployment Notes

- Vercel deployment with automatic builds
- Image uploads via Vercel Blob storage
- Uses Node.js v24.13.0 (mise managed via `.mise.toml`)
- Production builds include Prisma SQL generation
- Email notifications via Nodemailer
- SEO: next-sitemap for sitemap generation (outputs to public/)

## Features

### User Features
- Google OAuth + Twitter OAuth authentication
- Profile customization (nickname, bio, profile image with crop)
- Favorite liver selection (most favorite + multiple favorites)
- Email notification settings for new posts (double opt-in verification)
- Bookmark functionality
- Dark/light mode toggle

### Video Features
- YouTube video sharing
- Six reaction types: good, bad, love, funny, cry, angel
- Comment system
- Video tracking (seen status / browsing history)
- Search functionality
- Rich post details

### Liver Features
- VTuber directory listing
- Birthday display
- Retirement and overseas flags
- Alias support
- Liver registration management (`/liver_register`)

### Notification System
- In-app notifications (reaction / comment types)
- Email notifications (configurable per user)
- Separate notification email support
- Read/unread status tracking
- Email confirmation flow with result pages (`/notifications/confirmed`, `/expired`, `/invalid`)

### Other Pages
- `/history` - Browsing history (seen videos)
- `/faq` - Frequently asked questions
- `/policy` - Privacy policy
- `/about` - About the service
- `/crop` - Profile image crop tool
