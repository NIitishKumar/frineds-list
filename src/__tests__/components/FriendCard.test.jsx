import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FriendCard from '../../components/FriendCard';
import '@testing-library/jest-dom';

// Mock useDispatch
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

// Mock actions with return values
jest.mock('../../store/friendsSlice', () => ({
  toggleFavorite: jest.fn((payload) => ({ type: 'TOGGLE_FAVORITE', payload })),
  deleteFriend: jest.fn((payload) => ({ type: 'DELETE_FRIEND', payload })),
}));

// Mock helper
const getInitials = (name) =>
  name
    .split(' ')
    .map((n) => n[0].toUpperCase())
    .join('');

describe('FriendCard Component', () => {
  const friend = {
    id: 1,
    name: 'John Doe',
    isFavorite: true,
  };

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('renders friend name and initials', () => {
    render(<FriendCard friend={friend} getInitials={getInitials} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

});

