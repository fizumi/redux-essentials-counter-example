import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer, {
  incrementAsyncEpic,
} from '../features/counter/counterSlice';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

const epicMiddleware = createEpicMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), epicMiddleware];

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware,
});

epicMiddleware.run(combineEpics(incrementAsyncEpic));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
