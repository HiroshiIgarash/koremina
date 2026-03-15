<!-- Generated: 2026-03-15 | Files scanned: 1 (prisma/schema.prisma) | Token estimate: ~500 -->

# Data Architecture

## Models Overview

```
User ──────┬── Account (1:N) — NextAuth OAuth accounts
           ├── Session (1:N) — NextAuth sessions
           ├── Video (1:N) — posted videos
           ├── Comment (1:N) — authored comments
           ├── Bookmark (1:N)
           ├── Notification (1:N)
           ├── seenVideos (M:N) — browsing history
           ├── mostFavoriteLiver (M:1) — primary favorite VTuber
           ├── favoriteLivers (M:N) — favorite VTubers list
           └── reactions (M:N × 6) — good/bad/love/funny/cry/angel

Video ─────┬── Comment (1:N, cascade delete)
           ├── liver (M:N) — associated VTubers
           ├── seenUsers (M:N)
           ├── reactions (M:N × 6)
           ├── Bookmark (1:N, cascade delete)
           └── Notification (1:N)

Liver ─────┬── mostFavoriteUser (1:N)
           ├── favoriteUser (M:N)
           └── video (M:N)
```

## Model Definitions

### User
```prisma
id                              String    @id @default(cuid())
name, nickname, bio             String?
email                           String?   @unique
emailVerified                   DateTime?
image, uploadedImage            String?
createdAt, updatedAt            DateTime
notifyNewPostByEmail            Boolean   @default(true)
notificationEmail               String?
notificationEmailVerified       Boolean   @default(false)
notificationEmailTokenHash      String?   (HMAC token for double opt-in)
notificationEmailTokenExpires   DateTime?
notificationEmailSendAttempts   Int       @default(0)
notificationEmailLastSentAt     DateTime?
```

### Video
```prisma
id            String   @id @default(cuid())
videoId       String   (YouTube video ID)
comment       String   (post title/description)
detailComment String?
postedUserId  String   (FK → User)
postedAt      DateTime @default(now())
```

### Liver (VTuber)
```prisma
id            String  @id @default(cuid())
index         Int     @default(autoincrement())
name          String
aliasFirst    String? (alias name 1)
aliasSecond   String? (alias name 2)
channelHandle String  (YouTube channel handle)
birthMonth    Int?
birthDate     Int?
isRetire      Boolean @default(false)
isOverseas    Boolean @default(false)
```

### Comment
```prisma
id        String   @id @default(cuid())
content   String
videoId   String   (FK → Video, onDelete: Cascade)
authorId  String   (FK → User, onDelete: Cascade)
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
```

### Bookmark
```prisma
id        String   @id @default(cuid())
userId    String   (FK → User, onDelete: Cascade)
postId    String   (FK → Video, onDelete: Cascade)
createdAt DateTime @default(now())
@@unique([userId, postId])
```

### Notification
```prisma
id        String   @id @default(cuid())
userId    String?  (FK → User)
postId    String?  (FK → Video)
type      String   ("reaction" | "comment")
isRead    Boolean  @default(false)
createdAt DateTime @default(now())
```

### NextAuth Models
```
Account — OAuth provider accounts (provider + providerAccountId)
Session — Active sessions (sessionToken + expires)
VerificationToken — Email verification (identifier + token + expires)
```

## Reaction System

6 reaction types stored as M:N relations between User and Video:
```
good, bad, love, funny, cry, angel
→ Each is a separate join table (User[] ↔ Video[])
→ Toggled by updateReaction() server action
```

## Key Constraints

- `Bookmark`: `@@unique([userId, postId])` — one bookmark per user per post
- `Comment`: cascade deletes when Video or User is deleted
- `Bookmark`: cascade deletes when Video or User is deleted
- `notificationEmail`: separate from login email, requires double opt-in
