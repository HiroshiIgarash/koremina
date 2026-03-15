<!-- Generated: 2026-03-15 | Files scanned: ~120 | Token estimate: ~600 -->

# Architecture Overview

## System Diagram

```
Browser
  │
  ├── Next.js 16 (Vercel)
  │     ├── App Router (SSR/RSC)
  │     ├── Server Actions ──────► Neon PostgreSQL (Prisma ORM)
  │     ├── API Routes
  │     │     ├── /api/auth      ──► NextAuth.js v5
  │     │     ├── /api/post      ──► YouTube API
  │     │     ├── /api/vercelblob──► Vercel Blob Storage
  │     │     └── /api/notifications/confirm ──► HMAC verify
  │     └── Middleware (auth guard)
  │
  ├── External Services
  │     ├── Google OAuth / Twitter OAuth
  │     ├── YouTube Data API v3 (video metadata)
  │     ├── Vercel Blob (profile images)
  │     └── Gmail SMTP / Nodemailer (email notifications)
  │
  └── Vercel Analytics (pageview tracking)
```

## Project Type

Single Next.js application (monolithic SPA with App Router)

## Key Directories

```
koremina/
├── app/
│   ├── (pages)/        # UI pages (route groups)
│   ├── action/         # Server Actions (primary data layer)
│   └── api/            # HTTP API endpoints (5 routes)
├── components/
│   ├── ui/             # shadcn/ui primitives
│   ├── shared/         # Cross-feature reusable components
│   └── feature/        # Domain-specific components
├── prisma/
│   └── schema.prisma   # DB schema (7 models)
└── types/type.ts       # Shared type definitions
```

## Data Flow

```
User Action
  → React Component
  → Server Action (app/action/)   ← primary path (most operations)
  → Prisma Client
  → Neon PostgreSQL

OR

User Action
  → React Component
  → API Route (app/api/)          ← used for: auth, post creation, image upload
  → External Service / DB
```

## Auth Flow

```
User → /login → Google/Twitter OAuth
  → NextAuth callback → PrismaAdapter → Session (JWT)
  → middleware.ts guards protected routes
```

## Email Notification Flow

```
User opts in → POST /api/notifications/confirm
  → HMAC token generated → Gmail SMTP sends verification
  → User clicks link → GET /api/notifications/confirm?token=...
  → HMAC verify → DB update → /notifications/confirmed
```
