import type { Meta, StoryObj } from '@storybook/react'
import RecentPostItemPresentation from './RecentPostItemPresentation'
import { Liver } from '@prisma/client'

// モックデータ
const mockLivers: Liver[] = [
  {
    id: 'liver-1',
    name: 'さくらみこ',
    generation: '0期生',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'liver-2',
    name: '星街すいせい',
    generation: '0期生',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'liver-3',
    name: '白上フブキ',
    generation: '1期生',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const mockReactionsCount = {
  good: 25,
  love: 12,
  funny: 8,
  cry: 2,
  angel: 5,
  comments: 18,
}

const meta: Meta<typeof RecentPostItemPresentation> = {
  title: 'Feature/RecentPostItemPresentation',
  component: RecentPostItemPresentation,
  parameters: {
    layout: 'padded',
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
    bookmarkCount: {
      control: 'number',
      description: 'ブックマーク数',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 基本的な最近の投稿アイテム
export const Default: Story = {
  args: {
    postId: 'post-1',
    videoId: 'dQw4w9WgXcQ',
    comment: 'ホロライブのゲーム大会配信が最高でした！',
    livers: mockLivers,
    reactionsCount: mockReactionsCount,
    bookmarkCount: 8,
    videoTitle: 'ホロライブ ゲーム大会2024 - みんなでワイワイ実況！',
    isError: false,
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
    comment: 'かわいい',
    livers: [mockLivers[0]],
    bookmarkCount: 3,
  },
}

// 長いコメント
export const LongComment: Story = {
  args: {
    ...Default.args!,
    comment: 'この配信本当に最高でした！みんなのやり取りが面白くて最初から最後まで楽しく見れました。こういう企画がもっと増えると嬉しいです。',
  },
}

// 単一ライバー
export const SingleLiver: Story = {
  args: {
    ...Default.args!,
    livers: [mockLivers[0]],
    comment: 'みこちの歌枠癒されました〜',
    videoTitle: '【歌枠】夜中の歌声でお届け',
    bookmarkCount: 15,
  },
}

// 多数のライバー
export const ManyLivers: Story = {
  args: {
    ...Default.args!,
    livers: [
      ...mockLivers,
      {
        id: 'liver-4',
        name: '湊あくあ',
        generation: '2期生',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'liver-5',
        name: '紫咲シオン',
        generation: '2期生',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'liver-6',
        name: '百鬼あやめ',
        generation: '2期生',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    comment: '6人コラボ配信！全員揃うとやっぱり賑やかで楽しい',
    videoTitle: 'ホロライブ 6人大集合！みんなでゲーム配信',
  },
}

// 高エンゲージメント
export const HighEngagement: Story = {
  args: {
    ...Default.args!,
    reactionsCount: {
      good: 156,
      love: 89,
      funny: 34,
      cry: 8,
      angel: 23,
      comments: 78,
    },
    bookmarkCount: 45,
    comment: 'みんなの歌声がハモってて感動しました！',
    videoTitle: 'ホロライブ 合唱企画 - 心を一つに',
  },
}

// ゼロエンゲージメント
export const LowEngagement: Story = {
  args: {
    ...Default.args!,
    reactionsCount: {
      good: 1,
      love: 0,
      funny: 0,
      cry: 0,
      angel: 0,
      comments: 0,
    },
    bookmarkCount: 1,
    comment: '投稿したばかりです',
    videoTitle: '新作動画投稿しました',
  },
}