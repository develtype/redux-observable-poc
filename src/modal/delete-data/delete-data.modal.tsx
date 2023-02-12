import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'src/component/atom/button/button';
import { withModalWrapper } from 'src/hoc/with-modal-wrapper';
import { dataAction } from 'src/redux/data/data.action';
import { dataSelector } from 'src/redux/data/data.state';
import { ReduxStatusEnum } from 'src/type/common.type';
import { DataType } from 'src/type/data.type';
import styles from './delete-data.scss';

type PropsType = {
  targetData: DataType;
  onClose(): void;
};

export const DeleteDataModal = withModalWrapper(
  'Delete Data',
  ({ targetData, onClose }: PropsType) => {
    const dispatch = useDispatch();
    const [createClick, setCreateClick] = useState(false);

    const dataStatus = useSelector(dataSelector.status);

    useEffect(() => {
      if (createClick && dataStatus === ReduxStatusEnum.IDLE) {
        onClose();
      }
    }, [dataStatus]);

    function handleCreateClick() {
      setCreateClick(true);
      dispatch(dataAction.deleteData.request({ id: targetData.id }));
    }

    return (
      <div className={styles.root}>
        <div className={styles.body}>
          Do you want to delete this {targetData.id}?
        </div>
        <div className={styles.footer}>
          <Button sizeType='lg' isRounded outlined onClick={onClose}>
            CANCEL
          </Button>
          <Button
            sizeType='lg'
            isRounded
            onClick={handleCreateClick}
            disabled={createClick}
          >
            DELETE
          </Button>
        </div>
      </div>
    );
  },
);
