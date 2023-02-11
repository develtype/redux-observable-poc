import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { epic } from './root.epic';
import { reducer } from './root.reducer';

const epicMiddleware = createEpicMiddleware();

export const rootStore = configureStore({
  reducer,
  middleware: [epicMiddleware],
});

epicMiddleware.run(epic);
