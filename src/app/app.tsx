import 'src/style/css/common.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataAction } from 'src/redux/data/data.action';
import { dataSelector } from 'src/redux/data/data.state';
import { AppRoute } from './app.route';
import styles from './app.scss';

export const App = () => {
  const dispatch = useDispatch();
  const isDatas = useSelector(dataSelector.isDatas);

  useEffect(() => {
    dispatch(dataAction.fetchDatas.request());
  }, []);

  return (
    <div className={styles.root}>
      <h1>Redux-observable middleware with rxjs!</h1>
      {isDatas && <AppRoute />}
    </div>
  );
};
