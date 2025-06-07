import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: []
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    addFriend: (state, action) => {
      state.list = [{ name: action.payload, favorite: false }, ...state.list];
    },
    deleteFriend: (state, action) => {
      state.list = state.list.filter(f => f.name !== action.payload);
    },
    toggleFavorite: (state, action) => {
      const friend = state.list.find(f => f.name === action.payload);
      if (friend) friend.favorite = !friend.favorite;
    },
  }
});

export const { addFriend, deleteFriend, toggleFavorite, sortByFavorite } = friendsSlice.actions;
export default friendsSlice.reducer;