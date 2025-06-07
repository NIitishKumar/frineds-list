import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer'; // Adjust the path
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

// Minimal reducer and initial state for testing
const initialState = {
  friends: {
    list: [
      { id: 1, name: 'Alice', isFavorite: true },
      { id: 2, name: 'Bob', isFavorite: false },
      { id: 3, name: 'Charlie', isFavorite: true },
    ],
  },
};

function reducer(state = initialState, action) {
  return state;
}

const store = createStore(reducer);

describe('Footer Component', () => {
  it('renders favorite and filtered friend count correctly', () => {
    const filteredFriends = [
      { id: 1, name: 'Alice', isFavorite: true },
      { id: 3, name: 'Charlie', isFavorite: true },
    ];
    const favoriteCount = 2;

    render(
      <Provider store={store}>
        <Footer filteredFriends={filteredFriends} favoriteCount={favoriteCount} />
      </Provider>
    );

    expect(screen.getByText('2 favorites')).toBeInTheDocument();
    expect(screen.getByText('2 of 3')).toBeInTheDocument();
  });
});
