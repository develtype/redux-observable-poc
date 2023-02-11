import { Action } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import {
  catchError,
  filter,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { dataAction } from './data.action';
import { dataService } from './data.service';

const pendingStartEpic: Epic = (actions$: Observable<Action>) =>
  actions$.pipe(
    filter((action) =>
      [
        dataAction.fetchDatas.request.type,
        dataAction.createData.request.type,
        dataAction.deleteData.request.type,
        dataAction.updateData.request.type,
      ].includes(action.type),
    ),
    map(() => dataAction.increasePendingCount()),
  );

const pendingEndEpic: Epic = (actions$: Observable<Action>) =>
  actions$.pipe(
    filter((action) =>
      [
        dataAction.fetchDatas.success.type,
        dataAction.fetchDatas.failure.type,
        dataAction.fetchDatas.cancelled.type,
        dataAction.createData.success.type,
        dataAction.createData.failure.type,
        dataAction.createData.cancelled.type,
        dataAction.deleteData.success.type,
        dataAction.deleteData.failure.type,
        dataAction.deleteData.cancelled.type,
        dataAction.updateData.success.type,
        dataAction.updateData.failure.type,
        dataAction.updateData.cancelled.type,
      ].includes(action.type),
    ),
    map(() => dataAction.decreasePendingCount()),
  );

const fetchDatasEpic: Epic = (actions$: Observable<Action>) =>
  actions$.pipe(
    filter(dataAction.fetchDatas.request.match),
    switchMap(() =>
      dataService.fetchDatas().pipe(
        mergeMap(({ response }) => [
          dataAction.fetchDatas.success(),
          dataAction.setDatas(response),
        ]),
        catchError((err) =>
          of(
            dataAction.fetchDatas.failure({
              errorMsg: err.response?.message,
            }),
          ),
        ),
      ),
    ),
  );

const createDataEpic: Epic = (actions$: Observable<Action>) =>
  actions$.pipe(
    filter(dataAction.createData.request.match),
    switchMap(({ payload }) =>
      dataService.createData(payload).pipe(
        mergeMap(({ response }) => [
          dataAction.createData.success(),
          dataAction.setData(response),
        ]),
        catchError((err) => [
          dataAction.initSelectedDataId(),
          dataAction.createData.failure({
            errorMsg: err.response?.message,
          }),
        ]),
      ),
    ),
  );

const deleteDataEpic: Epic = (actions$: Observable<Action>) =>
  actions$.pipe(
    filter(dataAction.deleteData.request.match),
    switchMap(({ payload }) =>
      dataService.deleteData(payload).pipe(
        mergeMap(() => [
          dataAction.deleteData.success(),
          dataAction.removeData({ dataId: payload.id }),
        ]),
        catchError((err) =>
          of(
            dataAction.deleteData.failure({
              errorMsg: err.response?.message,
            }),
          ),
        ),
      ),
    ),
  );

const updateDataEpic: Epic = (actions$: Observable<Action>) =>
  actions$.pipe(
    filter(dataAction.updateData.request.match),
    switchMap(({ payload }) =>
      dataService.updateData(payload).pipe(
        mergeMap(() => [
          dataAction.updateData.success(),
          dataAction.editData(payload),
        ]),
        catchError((err) =>
          of(
            dataAction.updateData.failure({
              errorMsg: err.response?.message,
            }),
          ),
        ),
      ),
    ),
  );

export const dataEpic = combineEpics(
  pendingStartEpic,
  pendingEndEpic,
  fetchDatasEpic,
  createDataEpic,
  deleteDataEpic,
  updateDataEpic,
);
