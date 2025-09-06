import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// デフォルトバッジ
export const Default: Story = {
  args: {
    children: 'バッジ',
  },
}

// すべてのバリアント
export const Variants: Story = {
  args: {
    children: 'バッジ',
  },
  render: (args) => (
    <div className="flex gap-4 flex-wrap">
      <Badge {...args} variant="default">Default</Badge>
      <Badge {...args} variant="secondary">Secondary</Badge>
      <Badge {...args} variant="destructive">Destructive</Badge>
      <Badge {...args} variant="outline">Outline</Badge>
    </div>
  ),
}

// アウトラインバッジ
export const Outline: Story = {
  args: {
    children: 'アウトライン',
    variant: 'outline',
  },
}

// ライバー名バッジの例
export const LiverNames: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="outline">星街すいせい</Badge>
      <Badge variant="outline">さくらみこ</Badge>
      <Badge variant="outline">白上フブキ</Badge>
      <Badge variant="outline">湊あくあ</Badge>
    </div>
  ),
}