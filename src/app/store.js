import { configureStore } from '@reduxjs/toolkit';
import feed from './slice/feedSlice';
import userProfile from './slice/userProfileSlice';

export const store = configureStore({
  reducer: { feed, userProfile },
});
