import { createSelector } from '@reduxjs/toolkit';
import { dataSelector } from 'src/redux/data/data.state';
import { ReduxStatusEnum } from 'src/type/common.type';

const visible = createSelector(dataSelector.status, (dataStatus) => {
  if ([dataStatus].includes(ReduxStatusEnum.PENDING)) {
    return true;
  }

  return false;
});

export const spinnerSelector = {
  visible,
};
