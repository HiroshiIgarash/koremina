import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FlexiblePagination from '@/components/shared/FlexiblePagination';

// URLごとのページネーション表示をテストするためのモックデータ
const mockPaginationData = {
  showPages: 5,
  currentPage: 3,
  totalItems: 100,
  itemsPerPage: 10,
  generateHref: (page: number) => `/test?page=${page}`
};

describe('FlexiblePaginationコンポーネント', () => {
  test('正しいページネーションを表示すること', () => {
    render(<FlexiblePagination {...mockPaginationData} />);
    
    // 前のページボタンを確認
    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
    
    // 次のページボタンを確認
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
    
    // 現在のページが正しく表示されることを確認
    const currentPageElement = screen.getByText('3');
    expect(currentPageElement).toBeInTheDocument();
  });

  test('1ページ以下の場合はページネーションを表示しないこと', () => {
    const singlePageData = {
      ...mockPaginationData,
      totalItems: 5,
      itemsPerPage: 10
    };
    
    const { container } = render(<FlexiblePagination {...singlePageData} />);
    expect(container.firstChild).toBeNull();
  });

  test('最初のページの場合は前のページボタンが表示されないこと', () => {
    const firstPageData = {
      ...mockPaginationData,
      currentPage: 1
    };
    
    render(<FlexiblePagination {...firstPageData} />);
    
    // 前のページボタンがないことを確認
    expect(screen.queryByLabelText('Go to previous page')).not.toBeInTheDocument();
    
    // 次のページボタンがあることを確認
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
  });

  test('最後のページの場合は次のページボタンが表示されないこと', () => {
    const lastPageData = {
      ...mockPaginationData,
      currentPage: 10 // 100 items / 10 per page = 10 total pages
    };
    
    render(<FlexiblePagination {...lastPageData} />);
    
    // 前のページボタンがあることを確認
    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
    
    // 次のページボタンがないことを確認
    expect(screen.queryByLabelText('Go to next page')).not.toBeInTheDocument();
  });

  test('generateHref関数が正しく呼ばれること', () => {
    const mockGenerateHref = jest.fn((page: number) => `/custom/${page}`);
    const customData = {
      ...mockPaginationData,
      generateHref: mockGenerateHref
    };
    
    render(<FlexiblePagination {...customData} />);
    
    // generateHref関数が呼ばれることを確認
    expect(mockGenerateHref).toHaveBeenCalled();
  });
});