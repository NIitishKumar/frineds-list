import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../../components/Pagination';

describe('Pagination Component', () => {
  const setup = (props = {}) => {
    const defaultProps = {
      filteredFriends: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: `Friend ${i + 1}` })),
      itemsPerPage: 4,
      currentPage: 1,
      totalPages: 3,
      setCurrentPage: jest.fn(),
    };
    const utils = render(<Pagination {...defaultProps} {...props} />);
    return {
      ...utils,
      props: { ...defaultProps, ...props },
    };
  };

  it('renders pagination info correctly', () => {
    setup();
    expect(screen.getByText(/showing 1 to 4 of 10 friends/i)).toBeInTheDocument();
  });

  it('calls setCurrentPage with correct value when page number is clicked', () => {
    const setCurrentPage = jest.fn();
    setup({ currentPage: 1, setCurrentPage });

    const page2 = screen.getByRole('button', { name: '2' });
    fireEvent.click(page2);
    expect(setCurrentPage).toHaveBeenCalledWith(2);
  });

  it('highlights the current page number', () => {
    setup({ currentPage: 2 });
    const activeButton = screen.getByRole('button', { name: '2' });
    expect(activeButton).toHaveClass('bg-blue-600');
  });
});
