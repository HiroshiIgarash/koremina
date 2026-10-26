<!-- Generated: 2026-03-15 | Files scanned: 1 (package.json) | Token estimate: ~400 -->

# Dependencies

## External Services

| Service | Purpose | Config |
|---------|---------|--------|
| Neon PostgreSQL | Primary database | `DATABASE_URL`, `DATABASE_URL_UNPOOLED` |
| Vercel Blob | Profile image storage | `BLOB_READ_WRITE_TOKEN` |
| Google OAuth | Authentication | `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` |
| Twitter/X OAuth | Authentication | `AUTH_TWITTER_ID`, `AUTH_TWITTER_SECRET` |
| YouTube Data API v3 | Video metadata + channel icons | `YT_API_KEY` |
| Gmail SMTP | Email notifications | `MAILER_USER`, `MAILER_PASS` |
| Vercel | Hosting + CI/CD | Auto-detect |
| Vercel Analytics | Pageview tracking | `@vercel/analytics` |

## Core Framework

| Package | Version | Role |
|---------|---------|------|
| next | 16.4.1 | Framework (App Router, Server Actions, Cache Components) |
| react | 19.2.8 | UI library |
| typescript | 6.0.3 | Type safety |
| @prisma/client | ^7.0.0 | ORM client |
| @prisma/adapter-pg | ^7.0.0 | v7 driver adapter (pg-based) |
| next-auth | ^5.0.0-beta.16 | Authentication |
| @auth/prisma-adapter | ^2.10.0 | NextAuth ↔ Prisma bridge |

## UI / Styling

| Package | Version | Role |
|---------|---------|------|
| tailwindcss | 4.3.3 | Utility CSS |
| @radix-ui/* | various | Headless UI primitives (shadcn/ui base) |
| motion | ^13.0.0 | Animation (formerly Framer Motion) |
| lucide-react | ^1.0.0 | Icons |
| react-icons | ^5.5.0 | Additional icons |
| next-themes | ^0.4.6 | Dark/light mode |
| class-variance-authority | ^0.7.1 | Component variants |
| clsx + tailwind-merge | latest | Class merging |
| sonner | ^2.0.7 | Toast notifications |
| nextjs-toploader | ^3.9.17 | Page transition loader |

## Forms & Validation

| Package | Version | Role |
|---------|---------|------|
| react-hook-form | ^7.63.0 | Form state management |
| @hookform/resolvers | ^5.2.2 | Zod integration |
| zod | ^4.1.11 | Schema validation |

## Media & File Handling

| Package | Version | Role |
|---------|---------|------|
| sharp | ^0.35.0 | Server-side image processing |
| react-image-crop | ^11.0.10 | Client-side image crop |
| react-dropzone | ^20.0.0 | File drag-and-drop upload |

## Utilities

| Package | Version | Role |
|---------|---------|------|
| dayjs | ^1.11.18 | Date formatting |
| nodemailer | ^10.0.0 | Email sending |
| cmdk | ^1.1.1 | Command palette (search UI) |

## Dev Tools

| Package | Version | Role |
|---------|---------|------|
| jest | 30.5.2 | Test runner |
| @testing-library/react | 16.3.3 | Component testing |
| eslint | 10.13.0 | Linting |
| prettier | 3.9.10 | Formatting |
| dotenv-cli | 11.0.0 | Env var injection for scripts |
| only-allow | 1.2.2 | Enforces pnpm usage |

## Package Manager

- **pnpm** 10.34.7 (enforced via `preinstall` hook)
- **Node.js** v24.22.0 (mise managed, `.mise.toml`)
