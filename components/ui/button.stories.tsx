import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    asChild: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// デフォルトボタン
export const Default: Story = {
  args: {
    children: 'ボタン',
  },
}

// すべてのバリアント
export const Variants: Story = {
  args: {
    children: 'ボタン',
  },
  render: (args) => (
    <div className="flex gap-4 flex-wrap">
      <Button {...args} variant="default">Default</Button>
      <Button {...args} variant="destructive">Destructive</Button>
      <Button {...args} variant="outline">Outline</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="ghost">Ghost</Button>
      <Button {...args} variant="link">Link</Button>
    </div>
  ),
}

// すべてのサイズ
export const Sizes: Story = {
  args: {
    children: 'ボタン',
  },
  render: (args) => (
    <div className="flex gap-4 items-center">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="default">Default</Button>
      <Button {...args} size="lg">Large</Button>
      <Button {...args} size="icon">🚀</Button>
    </div>
  ),
}

// 無効化状態
export const Disabled: Story = {
  args: {
    children: '無効化されたボタン',
    disabled: true,
  },
}

// アウトラインバリアント
export const Outline: Story = {
  args: {
    children: 'アウトラインボタン',
    variant: 'outline',
  },
}

// 危険アクションボタン
export const Destructive: Story = {
  args: {
    children: '削除',
    variant: 'destructive',
  },
}