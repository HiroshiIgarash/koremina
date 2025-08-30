import { render, screen, fireEvent } from '@testing-library/react';
import TextWithTimestamps from '../components/ui/TextWithTimestamps';

// window.openのモック
const mockOpen = jest.fn();
Object.defineProperty(window, 'open', {
  writable: true,
  value: mockOpen,
});

describe('TextWithTimestamps', () => {
  beforeEach(() => {
    mockOpen.mockClear();
  });

  it('should render plain text when no timestamps are found', () => {
    render(
      <TextWithTimestamps 
        text="タイムスタンプのないテキストです" 
        videoId="test-video-id"
      />
    );
    
    expect(screen.getByText('タイムスタンプのないテキストです')).toBeInTheDocument();
  });

  it('should render clickable timestamps', () => {
    render(
      <TextWithTimestamps 
        text="1:23から始まる部分が面白いです" 
        videoId="test-video-id"
      />
    );
    
    expect(screen.getByText('から始まる部分が面白いです')).toBeInTheDocument();
    
    const timestampButton = screen.getByRole('button', { name: '1:23' });
    expect(timestampButton).toBeInTheDocument();
    expect(timestampButton).toHaveAttribute('title', 'YouTubeで1:23から再生');
  });

  it('should handle multiple timestamps', () => {
    const { container } = render(
      <TextWithTimestamps 
        text="1:23から始まって12:34で盛り上がります" 
        videoId="test-video-id"
      />
    );
    
    expect(screen.getByRole('button', { name: '1:23' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '12:34' })).toBeInTheDocument();
    
    // コンテナ全体のテキストコンテンツを確認
    expect(container.textContent).toBe('1:23から始まって12:34で盛り上がります');
  });

  it('should open YouTube URL when timestamp is clicked', () => {
    render(
      <TextWithTimestamps 
        text="1:23の部分をチェック" 
        videoId="test-video-id"
      />
    );
    
    const timestampButton = screen.getByRole('button', { name: '1:23' });
    fireEvent.click(timestampButton);
    
    expect(mockOpen).toHaveBeenCalledWith(
      'https://www.youtube.com/watch?v=test-video-id&t=83s',
      '_blank'
    );
  });

  it('should handle hour:minute:second format', () => {
    render(
      <TextWithTimestamps 
        text="1:23:45の長いタイムスタンプ" 
        videoId="test-video-id"
      />
    );
    
    const timestampButton = screen.getByRole('button', { name: '1:23:45' });
    fireEvent.click(timestampButton);
    
    expect(mockOpen).toHaveBeenCalledWith(
      'https://www.youtube.com/watch?v=test-video-id&t=5025s',
      '_blank'
    );
  });

  it('should apply custom className', () => {
    const { container } = render(
      <TextWithTimestamps 
        text="テストテキスト" 
        videoId="test-video-id"
        className="custom-class"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});