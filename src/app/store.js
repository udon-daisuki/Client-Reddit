import { configureStore } from '@reduxjs/toolkit';
import subreddistsReducer from '../features/Subreddits/subredditsSlice'
import postsReducer from '../features/Posts/postsSlice'
import commentsReducer from '../features/Comments/commentsSlice'

export const store = configureStore({
  reducer: {
    subreddits: subreddistsReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});
