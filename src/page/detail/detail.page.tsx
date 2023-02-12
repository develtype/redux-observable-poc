import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/component/atom/button/button';
import { Input } from 'src/component/atom/input/input';
import { dataAction } from 'src/redux/data/data.action';
import { dataSelector } from 'src/redux/data/data.state';
import { ReduxStatusEnum } from 'src/type/common.type';
import { DataType } from 'src/type/data.type';
import styles from './detail.scss';

type PropsType = {
  data: DataType;
};

export const DetailPage = ({ data }: PropsType) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [_data, set_data] = useState(data.data);
  const [editClick, setEditClick] = useState(false);

  const dataStatus = useSelector(dataSelector.status);

  useEffect(() => {
    if (editClick && dataStatus === ReduxStatusEnum.IDLE) {
      setEditMode(false);
      setEditClick(false);
    }
  }, [dataStatus]);

  function handleListBtnClick() {
    navigate('/');
  }
  function handleEditBtnClick() {
    setEditMode(!editMode);
  }

  function handleUpdateBtnClick() {
    dispatch(dataAction.updateData.request({ id: data.id, data: _data }));
    setEditClick(true);
  }

  return (
    <div className={styles.root}>
      <h2>{`${data.id}'s Detail`}</h2>
      <div className={styles.control}>
        <Button sizeType='sm' outlined onClick={handleListBtnClick}>
          List
        </Button>
        <Button sizeType='sm' outlined={editMode} onClick={handleEditBtnClick}>
          {editMode ? 'CANCEL' : 'EDIT'}
        </Button>
        {editMode && (
          <Button
            sizeType='sm'
            onClick={handleUpdateBtnClick}
            disabled={editClick}
          >
            {'UPDATE'}
          </Button>
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.name}>ID:</div>
        <div className={styles.item}>{data.id}</div>
        <div className={styles.name}>Data:</div>
        <div className={styles.item}>
          {editMode ? (
            <Input
              sizeType='md'
              defaultValue={data.data}
              onChange={(e) => set_data(e.currentTarget.value)}
            />
          ) : (
            <>{data.data}</>
          )}
        </div>
      </div>
    </div>
  );
};
