<!-- Generated: 2026-03-15 | Files scanned: ~80 | Token estimate: ~700 -->

# Frontend Architecture

## Page Tree (app/(pages)/)

```
/                           page.tsx          # Home (post list + pickup)
/post                       page.tsx          # Post creation
/post/[postId]              page.tsx          # Post detail
/post/edit/[postId]         page.tsx          # Post edit
/search                     page.tsx          # Video search
/livers                     page.tsx          # VTuber directory
/bookmark                   page.tsx          # User bookmarks
/history                    page.tsx          # Browsing history (seen videos)
/notification               page.tsx          # Notifications
/user/[userId]              page.tsx          # User profile
/user/[userId]/posts        page.tsx          # User's posts
/setting                    page.tsx          # Profile settings
/crop                       page.tsx          # Avatar crop tool
/liver_register             page.tsx          # Liver registration (admin)
/login                      page.tsx          # OAuth login
/auth_error                 page.tsx          # Auth error
/notifications/confirmed    page.tsx          # Email confirmed
/notifications/expired      page.tsx          # Token expired
/notifications/invalid      page.tsx          # Invalid token
/about                      page.tsx          # About
/policy                     page.tsx          # Privacy policy
/faq                        page.tsx          # FAQ
```

## Component Hierarchy

```
app/layout.tsx
  └── ThemeProvider
        ├── NextTopLoader
        ├── Header
        │     ├── HeaderRight (auth state)
        │     ├── HeaderPopover (user menu)
        │     ├── ModeToggle (dark/light)
        │     └── NotificationField
        ├── {page content}
        ├── MobileFixedFooter
        └── Sonner (toast notifications)
```

## Feature Components by Domain

```
feature/post/
  PostList → PostItem → ReactionButtonList → ReactionButton
                      → PostFooter → BookMarkButton, XShareButton
  PostDetailCard → PostVideo → CommentArea → CommentList, CommentForm
  PostForm (creation) / PostEditForm (edit)
  PickUpList, SpecialList (home page featured sections)
  SearchForm + SearchPagination

feature/comment/
  CommentArea → CommentList → DeleteCommentButton
             → CommentForm

feature/bookmark/
  BookmarkContainer → BookmarkList + BookmarkPagination
  TopBookMarkList

feature/user/
  UserInfo → FavoriteLiversArea
  RecentPostArea → RecentPostList → RecentPostItem
  UserPostList + UserPostPagination

feature/setting/
  ChangeNicknameDialog → ChangeNicknameForm
  ChangeBioDialog → ChangeBioForm
  ChangeAvatarDialog → AvatarDropZone → AvatarCrop → AvatarPreview
  MostFavoriteLiverDialog → MostFavoriteLiverForm
  FavoriteLiversDialog → FavoriteLiversForm → FavoriteLiversList
  NotificationSettings

feature/livers/
  LiverContainer

feature/scroll/
  FadeIn (Motion animation wrapper)
```

## State Management

- **Server State**: React Server Components + Server Actions (no client state library)
- **Form State**: `react-hook-form` + `zod` validation
- **UI State**: React `useState` (local component state only)
- **Theme**: `next-themes` (localStorage + system preference)
- **Toast**: `sonner`

## Skeleton Loading Pattern

Each feature has corresponding skeleton components:
```
SkeletonPostItem, SkeletonPostList, SkeletonPostDetailCard
SkeletonPickUpList, SkeletonTopBookmarkList
SkeletonReactionButton, SkeletonReactionButtonList
SkeletonCommentList
SkeletonUserInfo, SkeletonRecentPostItem
```

## UI Library

- **Base**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS 4
- **Animation**: Motion (formerly Framer Motion)
- **Icons**: lucide-react + react-icons
