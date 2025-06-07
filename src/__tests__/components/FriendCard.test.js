import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FriendCard from '../../components/FriendCard';

jest.mock('../../utils', () => ({
    capitalizeFirstChar: (str) => str.charAt(0).toUpperCase() + str.slice(1),
}));

// describe('FriendCard', () => {
//     const friend = { name: 'alice', favorite: false };
//     const friendFavorite = { name: 'bob', favorite: true };

//     test('shows favorite star if friend.favorite is true', () => {
//         render(<FriendCard friend={friendFavorite} onDelete={() => { }} onToggleFavorite={() => { }} />);
//         expect(screen.getByText('⭐️')).toBeInTheDocument();
//     });

//     test('calls onToggleFavorite when "Add to favourite" button is clicked', () => {
//         const toggleFavoriteMock = jest.fn();
//         render(<FriendCard friend={friend} onDelete={() => { }} onToggleFavorite={toggleFavoriteMock} />);

//         const favButton = screen.getByText(/Add to favourite/i);
//         fireEvent.click(favButton);

//         expect(toggleFavoriteMock).toHaveBeenCalledTimes(1);
//     });

//     test('calls onDelete when delete confirmed', () => {
//         const deleteMock = jest.fn();
//         window.confirm = jest.fn(() => true);

//         render(<FriendCard friend={friend} onDelete={deleteMock} onToggleFavorite={() => { }} />);

//         const deleteButton = screen.getByText(/Delete/i);
//         fireEvent.click(deleteButton);

//         expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this friend?');
//         expect(deleteMock).toHaveBeenCalledTimes(1);
//     });

//     test('does not call onDelete when delete is cancelled', () => {
//         const deleteMock = jest.fn();
//         window.confirm = jest.fn(() => false); // mock confirm to return false

//         render(<FriendCard friend={friend} onDelete={deleteMock} onToggleFavorite={() => { }} />);

//         const deleteButton = screen.getByText(/Delete/i);
//         fireEvent.click(deleteButton);

//         expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this friend?');
//         expect(deleteMock).not.toHaveBeenCalled();
//     });
// });
