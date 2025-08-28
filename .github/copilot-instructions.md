# Koremina Development Instructions

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

Koremina is a Next.js 15.5.0 TypeScript web application for tracking VTuber birthdays and community posts. It uses Prisma with PostgreSQL, NextAuth for authentication, shadcn/ui components, and Vercel for deployment.

## CRITICAL: Network Limitations

**This environment has strict network restrictions that prevent many standard operations:**

- Prisma binary downloads FAIL (`getaddrinfo ENOTFOUND binaries.prisma.sh`)
- Google Fonts access FAILS during build (`getaddrinfo ENOTFOUND fonts.googleapis.com`)
- Production builds will FAIL due to external dependencies
- Many npm packages may fail to install if they require external downloads

## Working Effectively

### Essential Setup Commands (VALIDATED)

Run these commands in sequence to set up the development environment:

1. **Install dependencies**: `npm install`
   - Takes ~40 seconds. NEVER CANCEL. Set timeout to 90+ seconds.
   - Some warnings about deprecated packages are normal and expected.

2. **Start database**: `docker compose up db`
   - Takes ~30 seconds to pull images, then starts PostgreSQL.
   - NEVER CANCEL during image pulling. Set timeout to 120+ seconds.
   - Database runs on localhost:5432 with credentials: admin/password

3. **Remove conflicting directories**: `sudo rm -rf postgres_dev/`
   - Required before formatting due to permission issues.
   - The postgres_dev directory is created by Docker and causes formatting failures.

### Development Commands (VALIDATED)

#### Code Quality (All Working)

- **Format code**: `npm run format` (2 seconds)
- **Check formatting**: `npm run format:check` (2 seconds)
- **Lint code**: `npm run lint` (3 seconds)
  - Note: Uses deprecated `next lint` but works correctly
- **Check package updates**: `npm run ncu` (varies based on network)

#### Development Server (Partially Working)

- **Start dev server**: `npm run dev`
  - Starts in ~1.4 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
  - Server responds on http://localhost:3000
  - Will show 500 errors without proper database setup and Prisma generation
  - **DO NOT expect full functionality without database connection**

#### Testing (Partially Working)

- **Run tests**: `npm test` (4 seconds)
  - 2 out of 3 test suites pass (birthday logic tests work)
  - 1 test suite fails due to missing Prisma client generation
  - **Expected behavior**: Partial test failures due to Prisma limitations

### Commands That FAIL (Document But Don't Use)

#### Build Process (FAILS - Network Restricted)

- **DO NOT RUN**: `npm run build`
  - FAILS due to Google Fonts access and Prisma binary downloads
  - Takes ~15 seconds to fail
  - Error: "Failed to fetch `Noto Sans JP` from Google Fonts"

#### Prisma Commands (FAIL - Network Restricted)

- **DO NOT RUN**: `prisma generate`, `prisma db push`, `prisma migrate`
  - ALL FAIL due to inability to download Prisma binaries
  - Error: "getaddrinfo ENOTFOUND binaries.prisma.sh"

## Validation Scenarios

After making changes, ALWAYS run these validation steps:

### Core Validation (Required)

1. **Verify code quality**: `npm run format && npm run lint`
2. **Test logic changes**: `npm test` (accept that 1/3 suites fail due to Prisma)
3. **Check dev server startup**: `npm run dev` (verify it starts without crashing)

### Manual Testing Scenarios

Since full builds don't work, test functionality through:

1. **Component Testing**:
   - Make changes to React components in `components/` or `app/(pages)/`
   - Start dev server and navigate to affected pages
   - Check browser console for TypeScript errors

2. **Birthday Logic Testing**:
   - Test files in `__tests__/birthday*.test.ts` cover core birthday calculations
   - These tests work and should pass after logic changes

3. **Database Schema Changes**:
   - **Cannot test** schema migrations in this environment
   - Document any Prisma schema changes in `prisma/schema.prisma`
   - Note what manual testing will be required in production environment

## Project Structure and Navigation

### Key Directories

```
app/
├── (pages)/           # Route pages (Next.js app router)
├── action/           # Server actions for database operations
├── api/              # API routes
└── globals.css       # Global styles with Tailwind CSS

components/
├── feature/          # Feature-specific components
│   ├── post/        # Post-related components
│   ├── bookmark/    # Bookmark functionality
│   ├── setting/     # User settings
│   └── user/        # User profile components
└── ui/              # shadcn/ui base components

prisma/
├── schema.prisma    # Database schema (PostgreSQL)
└── migrations/      # Database migrations (if any)

__tests__/           # Jest tests
├── birthday.test.ts          # Birthday logic tests (WORKING)
└── birthday-component.test.tsx # Birthday component tests (WORKING)
```

### Important Files to Check After Changes

- **After modifying database operations**: Check `app/action/*.ts` files
- **After UI changes**: Check corresponding `components/feature/` directories
- **After schema changes**: Review `prisma/schema.prisma`
- **After adding dependencies**: Update `package.json` and run `npm install`

## Language and Conventions

### Code Language Requirements (Critical)

- **ALL PRs**: Create in Japanese with develop branch as target
- **ALL comments**: Write in Japanese
- **ALL commit messages**: Use Japanese with conventional commit prefixes:
  - `feat:` 新機能, `fix:` バグフィックス, `docs:` ドキュメント, etc.
- **Variables/functions**: Use English with camelCase
- **User-facing messages**: Use Japanese

### PR Requirements

- Target `develop` branch (NOT main)
- Include `Fixes #issue番号.` at end of PR description for auto-close
- Use conventional commit prefixes in titles

## Common Tasks and Outputs

### Repository Root Listing

```bash
ls -la /
.eslintrc.json  .github/  .gitignore  .prettierignore  .prettierrc.json
README.md  __tests__/  app/  auth.ts  components/  components.json
docker-compose.yml  hooks/  jest.config.ts  jest.setup.ts  lib/
middleware.ts  next-sitemap.config.js  next.config.mjs  package.json
postcss.config.mjs  prisma/  public/  schema.ts  tsconfig.json  types/  utils/
```

### Package.json Key Scripts

```json
{
  "dev": "next dev",                    # Start development server
  "build": "prisma generate --sql && next build",  # Build (FAILS)
  "start": "next start",               # Start production server
  "lint": "next lint",                 # Lint code (deprecated but works)
  "format": "prettier --write .",      # Format all code
  "test": "jest",                      # Run Jest tests
  "ncu": "npx npm-check-updates"       # Check for package updates
}
```

### Dependencies Summary

- **Next.js**: 15.5.0 (React 19, App Router)
- **Database**: Prisma + PostgreSQL
- **Auth**: NextAuth v5 beta
- **UI**: shadcn/ui + Tailwind CSS + Radix UI
- **Testing**: Jest + Testing Library
- **Image handling**: Sharp, react-image-crop
- **Deployment**: Vercel (next-sitemap for SEO)

## Troubleshooting

### "postgres_dev permission denied" during formatting

```bash
sudo rm -rf postgres_dev/
npm run format
```

### "Prisma binary download failed"

- Expected in this environment
- Document any Prisma changes for manual testing in production
- Focus on TypeScript/component logic that can be tested

### "Google Fonts failed" during build

- Expected in this environment
- Build process requires external network access
- Test components individually through dev server

### Dev server starts but shows 500 errors

- Normal without complete database setup
- Verify server starts without crashing (shows port number)
- TypeScript compilation errors will prevent startup

**Remember**: This environment is for code development and testing logic, not for full application deployment. Focus on code quality, component testing, and logic validation that can be accomplished within network restrictions.
