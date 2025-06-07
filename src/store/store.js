import { configureStore } from '@reduxjs/toolkit';
import friendsReducer from './friendsSlice';

export default configureStore({
  reducer: {
    friends: friendsReducer
  }
});