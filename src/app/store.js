import { configureStore } from '@reduxjs/toolkit';
import subreddistsReducer from '../features/Subreddits/subredditsSlice'

export const store = configureStore({
  reducer: {
    subreddits: subreddistsReducer,
  },
});
