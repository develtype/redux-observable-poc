import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ItemPage } from 'src/page/detail/detail.page';
import { ListPage } from 'src/page/list/list.page';

export const AppRoute = () => {
  return (
    <Routes>
      <Route index element={<ListPage />} />
      <Route path=':dataId' element={<ItemPage />} />
      <Route path='*' element={<Navigate replace to='/' />} />
    </Routes>
  );
};
