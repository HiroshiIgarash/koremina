import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { BookmarkIcon } from 'lucide-react'

// Storybookで表示するためのシンプルなBookmarkButtonコンポーネント
const SimpleBookmarkButton = ({
  isBookmarked = false,
  onClick,
}: {
  isBookmarked?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button onClick={onClick} className="p-1">
      <BookmarkIcon
        size="1.4em"
        className={`cursor-pointer ${
          isBookmarked 
            ? 'text-orange-500 fill-orange-500' 
            : 'text-muted-foreground hover:text-orange-400'
        }`}
      />
    </button>
  )
}

const meta: Meta<typeof SimpleBookmarkButton> = {
  title: 'Feature/BookmarkButton',
  component: SimpleBookmarkButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isBookmarked: {
      control: 'boolean',
      description: 'ブックマーク済みかどうか',
    },
    onClick: {
      action: 'clicked',
      description: 'クリック時のアクション',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ブックマークしていない状態
export const NotBookmarked: Story = {
  args: {
    isBookmarked: false,
  },
}

// ブックマーク済み状態
export const Bookmarked: Story = {
  args: {
    isBookmarked: true,
  },
}

// インタラクティブな例
export const Interactive: Story = {
  render: function InteractiveRender() {
    const [isBookmarked, setIsBookmarked] = React.useState(false)
    
    return (
      <div className="flex items-center gap-4">
        <SimpleBookmarkButton
          isBookmarked={isBookmarked}
          onClick={() => setIsBookmarked(!isBookmarked)}
        />
        <span className="text-sm text-muted-foreground">
          {isBookmarked ? 'ブックマーク済み' : 'ブックマークしていません'}
        </span>
      </div>
    )
  },
}

// 複数のボタン
export const Multiple: Story = {
  render: () => (
    <div className="flex gap-4">
      <SimpleBookmarkButton isBookmarked={false} />
      <SimpleBookmarkButton isBookmarked={true} />
      <SimpleBookmarkButton isBookmarked={false} />
    </div>
  ),
}