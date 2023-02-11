import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAsyncAction } from 'src/redux/redux.util';
import { DatasType, DataType } from 'src/type/data.type';
import {
  CreateDataParamsType,
  DeleteDataParamsType,
  UpdateDataParamsType,
} from './data.service';

type DataStateType = {
  pendingCount: number;
  dataObjs: DatasType | null;
  dataIds: string[] | null;
  selectedDataId: string | null;
};

const increasePendingCount = createAction(
  '[data] increase async action pending count',
);
const decreasePendingCount = createAction(
  '[data] dencrease async action pending count',
);
const fetchDatas = createAsyncAction('[data] fetch datas');
const setDatas = createAction<DataType[]>('[data] set datas');
const initSelectedDataId = createAction('[data] init selected data id');
const setSelectedDataId = createAction<{ dataId: string }>(
  '[data] set selected data id',
);
const createData = createAsyncAction<CreateDataParamsType>(
  '[data] create datas',
);
const setData = createAction<DataType>('[data] set data');
const deleteData =
  createAsyncAction<DeleteDataParamsType>('[data] delete data');
const removeData = createAction<{ dataId: string }>('[data] remove data state');
const updateData =
  createAsyncAction<UpdateDataParamsType>('[data] update data');
const editData = createAction<DataType>('[data] edit data state');

export const dataAction = {
  increasePendingCount,
  decreasePendingCount,
  fetchDatas,
  setDatas,
  initSelectedDataId,
  setSelectedDataId,
  createData,
  setData,
  deleteData,
  removeData,
  updateData,
  editData,
};

const initDataState: DataStateType = {
  pendingCount: 0,
  dataObjs: null,
  dataIds: null,
  selectedDataId: null,
};

export const dataReducer = createReducer(initDataState, (builder) =>
  builder
    .addCase(increasePendingCount, (state) => {
      state.pendingCount++;
    })
    .addCase(decreasePendingCount, (state) => {
      state.pendingCount--;
    })
    .addCase(setDatas, (state, { payload }) => {
      state.dataObjs = payload.reduce<DatasType>((res, data) => {
        res[data.id] = data;
        return res;
      }, {});

      state.dataIds = payload.map((data) => data.id);
    })
    .addCase(initSelectedDataId, (state) => {
      state.selectedDataId = null;
    })
    .addCase(setSelectedDataId, (state, { payload }) => {
      state.selectedDataId = payload.dataId;
    })
    .addCase(setData, (state, { payload }) => {
      if (!state.dataObjs) {
        state.dataObjs = { [payload.id]: payload };
      } else {
        state.dataObjs[payload.id] = payload;
      }

      if (!state.dataIds) {
        state.dataIds = [payload.id];
      } else {
        state.dataIds.push(payload.id);
      }
    })
    .addCase(removeData, (state, { payload }) => {
      if (state.dataObjs) {
        delete state.dataObjs[payload.dataId];
      }

      if (state.dataIds) {
        state.dataIds = state.dataIds.filter((id) => id !== payload.dataId);
      }
    })
    .addCase(editData, (state, { payload }) => {
      if (state.dataObjs) {
        state.dataObjs[payload.id] = payload;
      }
    }),
);
