import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer, {
  incrementAsync,
  incrementAsyncSaga,
} from '../features/counter/counterSlice';
import createSagaMiddleware from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware,
});

sagaMiddleware.run(function* () {
  yield takeEvery(incrementAsync.type, incrementAsyncSaga);
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
