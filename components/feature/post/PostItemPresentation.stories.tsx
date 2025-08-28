import type { Meta, StoryObj } from '@storybook/react'
import PostItemPresentation from './PostItemPresentation'
import { User } from '@prisma/client'

// モックデータ
const mockUser: User = {
  id: 'user-1',
  name: 'テストユーザー',
  email: 'test@example.com',
  emailVerified: null,
  image: 'https://via.placeholder.com/32x32',
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockLivers = [
  { name: 'さくらみこ' },
  { name: '星街すいせい' },
  { name: '白上フブキ' },
]

const mockBookmarks = [
  { id: 'bookmark-1', userId: 'user-1', postId: 'post-1', createdAt: new Date() },
  { id: 'bookmark-2', userId: 'user-2', postId: 'post-1', createdAt: new Date() },
  { id: 'bookmark-3', userId: 'user-3', postId: 'post-1', createdAt: new Date() },
]

const mockReactionsCount = {
  good: 15,
  love: 8,
  funny: 3,
  cry: 1,
  angel: 2,
  comments: 12,
}

const meta: Meta<typeof PostItemPresentation> = {
  title: 'Feature/PostItemPresentation',
  component: PostItemPresentation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    comment: {
      control: 'text',
      description: '投稿のコメント',
    },
    videoTitle: {
      control: 'text',
      description: '動画のタイトル',
    },
    isError: {
      control: 'boolean',
      description: 'エラー状態の表示',
    },
    currentUserId: {
      control: 'text',
      description: '現在ログイン中のユーザーID',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 基本的な投稿アイテム
export const Default: Story = {
  args: {
    id: 'post-1',
    comment: '今日のホロライブ配信がとても面白かった！特にみこちの反応が最高でした🤣',
    videoId: 'dQw4w9WgXcQ',
    postedUserName: 'テストユーザー',
    postedUser: mockUser,
    livers: mockLivers,
    bookmark: mockBookmarks,
    seenUsersId: ['user-1', 'user-2'],
    reactionsCount: mockReactionsCount,
    videoTitle: 'ホロライブ 3期生コラボ配信！みんなでゲーム実況',
    currentUserId: 'user-1',
    isError: false,
  },
}

// ログインしていない状態
export const NotLoggedIn: Story = {
  args: {
    ...Default.args!,
    currentUserId: undefined,
  },
}

// エラー状態（動画タイトル取得失敗）
export const VideoTitleError: Story = {
  args: {
    ...Default.args!,
    videoTitle: null,
    isError: true,
  },
}

// 短いコメント
export const ShortComment: Story = {
  args: {
    ...Default.args!,
    comment: 'かわいい！',
    livers: [{ name: 'さくらみこ' }],
  },
}

// 長いコメント
export const LongComment: Story = {
  args: {
    ...Default.args!,
    comment: 'この配信本当に最高でした！特に後半のコラボ部分が面白くて、みんなの掛け合いが本当に自然で見ていて心温まりました。こういう企画をもっと見たいなあと思います。次回も楽しみにしています！',
  },
}

// 多数のライバー
export const ManyLivers: Story = {
  args: {
    ...Default.args!,
    livers: [
      { name: 'さくらみこ' },
      { name: '星街すいせい' },
      { name: '白上フブキ' },
      { name: '湊あくあ' },
      { name: '紫咲シオン' },
      { name: '百鬼あやめ' },
      { name: '癒月ちょこ' },
      { name: '大空スバル' },
    ],
  },
}

// リアクション数が多い投稿
export const HighEngagement: Story = {
  args: {
    ...Default.args!,
    bookmark: [
      ...mockBookmarks,
      { id: 'bookmark-4', userId: 'user-4', postId: 'post-1', createdAt: new Date() },
      { id: 'bookmark-5', userId: 'user-5', postId: 'post-1', createdAt: new Date() },
      { id: 'bookmark-6', userId: 'user-6', postId: 'post-1', createdAt: new Date() },
    ],
    reactionsCount: {
      good: 142,
      love: 89,
      funny: 23,
      cry: 5,
      angel: 31,
      comments: 67,
    },
  },
}

// 単一ライバー
export const SingleLiver: Story = {
  args: {
    ...Default.args!,
    livers: [{ name: 'さくらみこ' }],
    comment: 'みこちの歌枠最高だった！',
    videoTitle: '【歌枠】みんなで歌おう！リクエスト受付中',
  },
}