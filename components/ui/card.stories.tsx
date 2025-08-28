import type { Meta, StoryObj } from '@storybook/react'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from './card'
import { Button } from './button'
import { Badge } from './badge'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// 基本的なカード
export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>カードタイトル</CardTitle>
        <CardDescription>カードの説明文です。</CardDescription>
      </CardHeader>
      <CardContent>
        <p>ここにカードのメインコンテンツが入ります。</p>
      </CardContent>
      <CardFooter>
        <Button>アクション</Button>
      </CardFooter>
    </Card>
  ),
}

// 投稿カードの例
export const PostCard: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          <div>
            <CardTitle className="text-lg">ユーザー名</CardTitle>
            <CardDescription>2時間前</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p>今日のホロライブ配信がとても面白かった！特にみこちの部分が最高でした。</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">さくらみこ</Badge>
          <Badge variant="outline">星街すいせい</Badge>
        </div>
        <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
          <span className="text-gray-500">動画サムネイル</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>👍 12</span>
          <span>💬 3</span>
          <span>🔖 5</span>
        </div>
      </CardFooter>
    </Card>
  ),
}

// シンプルなカード
export const Simple: Story = {
  render: () => (
    <Card className="w-64 p-6">
      <h3 className="font-semibold">シンプルカード</h3>
      <p className="text-sm text-muted-foreground mt-2">
        ヘッダーやフッターなしの基本的なカードです。
      </p>
    </Card>
  ),
}

// リストカード
export const ListCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>最近のブックマーク</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3 p-2 hover:bg-accent rounded">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>ホロライブゲーム大会</span>
        </div>
        <div className="flex items-center gap-3 p-2 hover:bg-accent rounded">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>歌枠まとめ</span>
        </div>
        <div className="flex items-center gap-3 p-2 hover:bg-accent rounded">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>コラボ配信</span>
        </div>
      </CardContent>
    </Card>
  ),
}