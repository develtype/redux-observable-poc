import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DetailContainer } from 'src/page/detail/detail.container';
import { ListPage } from 'src/page/list/list.page';

export const AppRoute = () => {
  return (
    <Routes>
      <Route index element={<ListPage />} />
      <Route path=':dataId' element={<DetailContainer />} />
      <Route path='*' element={<Navigate replace to='/' />} />
    </Routes>
  );
};
