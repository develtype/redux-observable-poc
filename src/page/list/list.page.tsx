import React, { useState } from 'react';
import InlineSVG from 'react-inlinesvg/esm';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/component/atom/button/button';
import { SymmetryButton } from 'src/component/atom/symmetry-button/symmetry-button';
import { AddDataModal } from 'src/modal/add-data/add-data.modal';
import { DeleteDataModal } from 'src/modal/delete-data/delete-data.modal';
import { dataSelector } from 'src/redux/data/data.state';
import IconTrash from 'src/style/icon/icon-trash.svg';
import { DataType } from 'src/type/data.type';
import styles from './list.scss';

export const ListPage = () => {
  const navigate = useNavigate();
  const datas = useSelector(dataSelector.datas);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [targetData, setTargetData] = useState<DataType>();

  function handleRowClick(id: string) {
    navigate(id);
  }

  function handleDeleteClick(data: DataType) {
    setTargetData(data);
    setDeleteModalVisible(true);
  }

  return (
    <div className={styles.root}>
      <h2>Data List</h2>
      <div className={styles.control}>
        <Button sizeType='md' onClick={() => setAddModalVisible(true)}>
          ADD
        </Button>
      </div>
      <div className={styles.list}>
        <div className={styles.head}>
          <div className={styles.hCell}>Id</div>
          <div className={styles.hCell}>Data</div>
          <div className={styles.hCell}></div>
        </div>
        <ul className={styles.body}>
          {datas.map((data) => (
            <li
              key={data.id}
              className={styles.bodyRow}
              onClick={() => handleRowClick(data.id)}
            >
              <div className={styles.bCell}>{data.id}</div>
              <div className={styles.bCell}>{data.data}</div>
              <div className={styles.bCell}>
                <SymmetryButton
                  sizeType='xs'
                  buttonColor='secondary'
                  noShape
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(data);
                  }}
                >
                  <InlineSVG src={IconTrash} />
                </SymmetryButton>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <AddDataModal
        modalVisible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
      />
      {targetData && (
        <DeleteDataModal
          targetData={targetData}
          onClose={() => setDeleteModalVisible(false)}
          modalVisible={deleteModalVisible}
        />
      )}
    </div>
  );
};
