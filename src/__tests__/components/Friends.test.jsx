import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSelector } from 'react-redux';
import FriendsList from '../../components/friends';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

// Mock subcomponents
jest.mock('../../components/FriendCard', () => ({ friend }) => (
  <div data-testid="friend-card">{friend.name}</div>
));
jest.mock('../../components/Header', () => () => <div data-testid="header">Header</div>);
jest.mock('../../components/Footer', () => () => <div data-testid="footer">Footer</div>);
jest.mock('../../components/Pagination', () => () => <div data-testid="pagination">Pagination</div>);
jest.mock('../../components/Fallback', () => ({ searchTerm, activeTab }) => (
  <div data-testid="fallback">No results for {searchTerm || activeTab}</div>
));
jest.mock('../../components/InputSection', () => ({ searchTerm, setSearchTerm }) => (
  <input
    data-testid="search-input"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
));

describe('FriendsList Component', () => {
  const mockFriends = [
    { id: 1, name: 'Alice Smith', isFavorite: false },
    { id: 2, name: 'Bob Johnson', isFavorite: true },
    { id: 3, name: 'Charlie Lee', isFavorite: false },
    { id: 4, name: 'David Kim', isFavorite: false },
    { id: 5, name: 'Eva Adams', isFavorite: true },
  ];

  beforeEach(() => {
    useSelector.mockImplementation((cb) => cb({ friends: { list: mockFriends } }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders fallback if no friends match filter', () => {
    useSelector.mockImplementation((cb) => cb({ friends: { list: [] } }));
    render(<FriendsList />);
    expect(screen.getByTestId('fallback')).toBeInTheDocument();
  });

  it('filters friends by search input', () => {
    render(<FriendsList />);
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'Bob' } });
    expect(input.value).toBe('Bob');
    // Only Bob matches
    expect(screen.getAllByTestId('friend-card').length).toBe(1);
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('resets to first page when filter changes', () => {
    render(<FriendsList />);
    expect(screen.getAllByTestId('friend-card').length).toBe(4);
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'Eva' } });
    expect(screen.getAllByTestId('friend-card').length).toBe(1);
    expect(screen.getByText('Eva Adams')).toBeInTheDocument();
  });

});
