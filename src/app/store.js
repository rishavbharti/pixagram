import { configureStore } from '@reduxjs/toolkit';
import feed from './slice/feedSlice';

export const store = configureStore({
  reducer: { feed },
});
