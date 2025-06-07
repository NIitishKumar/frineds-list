import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('Header Component', () => {
  const mockFriends = [
    { id: 1, name: 'Alice', isFavorite: false },
    { id: 2, name: 'Bob', isFavorite: true },
    { id: 3, name: 'Charlie', isFavorite: false },
  ];

  beforeEach(() => {
    useSelector.mockImplementation((cb) => cb({ friends: { list: mockFriends } }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders title and subtitle', () => {
    render(<Header favoriteCount={1} activeTab="all" setActiveTab={jest.fn()} />);
    expect(screen.getByText('Friends')).toBeInTheDocument();
    expect(screen.getByText('Manage your connections')).toBeInTheDocument();
  });

  it('displays favorite friend count', () => {
    render(<Header favoriteCount={1} activeTab="favorites" setActiveTab={jest.fn()} />);
    expect(screen.getByText('1')).toBeInTheDocument(); // 1 favorite
    expect(screen.getByText('Favorites')).toBeInTheDocument();
  });

  it('calls setActiveTab with "all" on All Friends click', () => {
    const setActiveTab = jest.fn();
    render(<Header favoriteCount={1} activeTab="favorites" setActiveTab={setActiveTab} />);
    const allButton = screen.getAllByText('All Friends')[0];
    fireEvent.click(allButton);
    expect(setActiveTab).toHaveBeenCalledWith('all');
  });

  it('calls setActiveTab with "favorites" on Favorites click', () => {
    const setActiveTab = jest.fn();
    render(<Header favoriteCount={1} activeTab="all" setActiveTab={setActiveTab} />);
    const favButton = screen.getAllByText('Favorites')[0];
    fireEvent.click(favButton);
    expect(setActiveTab).toHaveBeenCalledWith('favorites');
  });

});
