import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dataSelector } from 'src/redux/data/data.state';
import styles from './list.scss';

export const ListPage = () => {
  const navigate = useNavigate();
  const datas = useSelector(dataSelector.datas);

  function handleRowClick(id: string) {
    navigate(id);
  }

  return (
    <div>
      <h2>Data List</h2>
      <div className={styles.list}>
        <div className={styles.head}>
          <div className={styles.hCell}>Id</div>
          <div className={styles.hCell}>Data</div>
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
