import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { dataAction } from 'src/redux/data/data.action';
import { dataSelector } from 'src/redux/data/data.state';
import { DetailPage } from './detail.page';

export const DetailContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dataId } = useParams<{ dataId: string }>();
  const isData = useSelector(dataSelector.dataById(dataId ?? ''));
  const selectedData = useSelector(dataSelector.selectedData);

  useEffect(() => {
    if (isData) {
      if (dataId) {
        dispatch(dataAction.setSelectedDataId({ dataId }));
      }
    } else {
      alert('Wrong Data Id !!');
      navigate('/');
    }
  }, []);

  return <>{selectedData && <DetailPage data={selectedData} />}</>;
};
