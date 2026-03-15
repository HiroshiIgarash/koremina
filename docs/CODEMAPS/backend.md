<!-- Generated: 2026-03-15 | Files scanned: ~40 | Token estimate: ~700 -->

# Backend Architecture

## API Routes (app/api/)

```
POST /api/auth/[...nextauth]  → NextAuth.js handler (Google + Twitter OAuth)
POST /api/post                → Create/update video post (YouTube metadata fetch)
GET  /api/liver               → Liver list data
POST /api/vercelblob          → Upload image to Vercel Blob (returns URL)
GET  /api/notifications/confirm?token=... → HMAC verify → activate email notification
```

## Server Actions (app/action/) — Primary Data Layer

### Posts
```
getPosts(page?, liverId?, userId?)        → Video[] with pagination
getPostById(postId)                       → Video + relations
getTotalPosts(liverId?, userId?)          → number
getUserPosts(userId, page?)              → Video[]
getTotalUserPosts(userId)                → number
getRecentPostsByUserId(userId)           → Video[] (last 5)
deletePost(postId)                       → void (auth check)
getVideoImage(videoId)                   → thumbnail URL
```

### Users
```
getCurrentUser()                         → User + favoriteLivers + mostFavoriteLiver
getCurrentUserWithTag()                  → User + tags
getUserById(userId)                      → User + profile
updateNickname(nickname)                 → void
updateBio(bio)                           → void
updateAvatar(imageUrl)                   → void
updateFavoriteLivers(liverIds)           → void
updateMostFavoriteLiver(liverId)         → void
```

### Reactions & Comments
```
updateReaction(postId, reaction)         → void (toggle: good|bad|love|funny|cry|angel)
updateSeenUsers(postId)                  → void (mark as seen)
postComment(postId, content)             → Comment
deleteComment(commentId)                 → void (auth check)
getCommentsByPostId(postId)              → Comment[]
getReactionsByPostId(postId)             → reactions count map
sendReportMail(postId, reason)           → void (Gmail SMTP)
```

### Bookmarks
```
getBookmarksById(userId, page?)          → Video[]
getBookmarkInfoByPostId(postId)          → { isBookmarked, count }
getTotalBookmarksById(userId)            → number
updateBookmark(postId)                   → void (toggle)
```

### Livers
```
getLivers()                              → Liver[]
getBirthdayLivers()                      → Liver[] (today's birthdays)
getChannelIcon(channelHandle)            → iconUrl (YouTube API)
updateLivers(liverData[])               → void (bulk upsert)
```

### Notifications
```
updateNotification(notificationId)       → void (mark read)
updateReadAllNotifications()             → void
updateNotifyNewPostByEmail(enabled)      → void
updateNotificationEmail(email)           → void + send verification
```

## Middleware (middleware.ts)

```
Protected routes: all pages except
  - /login
  - /auth_error
  - /about, /policy, /faq
  - /api/auth/*
  - /api/notifications/confirm
  - Static assets
```

## Caching Strategy (Next.js 16)

```
"use cache" directive + cacheTag() + cacheLife()
  → Automatic invalidation via revalidateTag()
  → Used in Server Actions and RSC data fetches
```
