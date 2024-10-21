import { configureStore } from '@reduxjs/toolkit';
import user from '@/store/slices/user.reducer';
import common from '@/store/slices/common.reducer';

export const store = configureStore({
   reducer: {
      [common.name]: common.reducer,
      [user.name]: user.reducer,
   },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
