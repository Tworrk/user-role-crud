import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice';
import appSlice from './slices/appSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    app: appSlice,
  },
});
