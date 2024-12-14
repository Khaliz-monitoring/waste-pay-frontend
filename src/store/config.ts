import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducers from './slices/root-reducer.reducer';
import rootSaga from './saga/root.saga';

import { UserContext } from '@/contexts/user-context';

const sagaMiddleware = createSagaMiddleware({
   context: {
      userContext: UserContext,
   },
});

export const store = configureStore({
   reducer: rootReducers,
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
