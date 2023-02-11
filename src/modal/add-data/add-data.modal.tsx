import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'src/component/atom/button/button';
import { Input } from 'src/component/atom/input/input';
import { withModalWrapper } from 'src/hoc/with-modal-wrapper';
import { dataAction } from 'src/redux/data/data.action';
import { dataSelector } from 'src/redux/data/data.state';
import { ReduxStatusEnum } from 'src/type/common.type';
import styles from './add-data.scss';

type PropsType = {
  onClose(): void;
};

export const AddDataModal = withModalWrapper(
  'Add Data',
  ({ onClose }: PropsType) => {
    const dispatch = useDispatch();
    const [data, setData] = useState('');
    const [createClick, setCreateClick] = useState(false);

    const dataStatus = useSelector(dataSelector.status);

    useEffect(() => {
      if (createClick && dataStatus === ReduxStatusEnum.IDLE) {
        onClose();
      }
    }, [dataStatus]);

    function handleCreateClick() {
      setCreateClick(true);
      dispatch(dataAction.createData.request({ data }));
    }

    return (
      <div className={styles.root}>
        <div className={styles.body}>
          <label className={styles.label}>Data</label>
          <Input
            sizeType='md'
            value={data}
            onChange={(e) => setData(e.currentTarget.value)}
          />
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
            SUBMIT
          </Button>
        </div>
      </div>
    );
  },
);
