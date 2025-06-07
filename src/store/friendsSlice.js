import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [
    { id: 1, name: 'Rahul Gupta', isFavorite: true },
    { id: 2, name: 'Shivangi Sharma', isFavorite: false },
    { id: 3, name: 'Akash Singh', isFavorite: false },
  ]
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    addNewFriend: (state, action) => {
      console.log(action)
      state.list = [action.payload.friend, ...state.list];
    },
    deleteFriend: (state, action) => {
      state.list = state.list.filter(friend => friend.id !== action.payload.id);
    },
    toggleFavorite: (state, action) => {
      console.log(action)
      state.list = state.list.map(friend =>
        friend.id === action.payload.id ? { ...friend, isFavorite: !friend.isFavorite } : friend
      );
    }
  },
});

export const { addNewFriend, deleteFriend, toggleFavorite, sortByFavorite } = friendsSlice.actions;
export default friendsSlice.reducer;