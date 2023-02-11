import React from 'react';
import { useSelector } from 'react-redux';
import { dataSelector } from 'src/redux/data/data.state';

export const ListPage = () => {
  const datas = useSelector(dataSelector.datas);

  return (
    <div>
      <h2>Data List</h2>
      <ul>
        {datas.map((data) => (
          <li key={data.id}>{data.data}</li>
        ))}
      </ul>
    </div>
  );
};
