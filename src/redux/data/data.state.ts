import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from 'src/redux/root.reducer';
import { ReduxStatusEnum } from 'src/type/common.type';

const dataState = (state: RootStateType) => state.dataState;
const status = createSelector(dataState, (state) =>
  state.pendingCount > 0 ? ReduxStatusEnum.PENDING : ReduxStatusEnum.IDLE,
);
const isDatas = createSelector(dataState, (state) => !!state.dataObjs);
const dataIds = createSelector(dataState, (state) => state.dataIds ?? []);
const dataObjs = createSelector(dataState, (state) => state.dataObjs ?? {});
const datas = createSelector(dataIds, dataObjs, (dataIds, dataObjs) => {
  return dataIds.map((id) => dataObjs[id]);
});
const dataById = (dataId: string) =>
  createSelector(dataObjs, (state) => state[dataId]);
const selectedDataId = createSelector(
  dataState,
  (state) => state.selectedDataId,
);
const selectedData = createSelector(dataObjs, selectedDataId, (datas, dataId) =>
  dataId ? datas[dataId] : null,
);

export const dataSelector = {
  status,
  isDatas,
  datas,
  dataObjs,
  dataById,
  selectedDataId,
  selectedData,
};
