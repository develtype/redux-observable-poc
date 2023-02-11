import { combineEpics } from 'redux-observable';
import { dataEpic } from './data/data.epic';

export const epic = combineEpics(dataEpic);
