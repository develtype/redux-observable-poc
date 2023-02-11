import { combineReducers } from 'redux';
import { dataReducer } from './data/data.action';

export const reducer = combineReducers({
  dataState: dataReducer,
});

export type RootStateType = ReturnType<typeof reducer>;
