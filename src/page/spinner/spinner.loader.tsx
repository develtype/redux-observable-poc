import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'src/component/organism/spinner/spinner';
import { spinnerSelector } from 'src/redux/spinner/spinner.state';

export const SpinnerLoader = () => {
  const visible = useSelector(spinnerSelector.visible);

  return <Spinner visible={visible} />;
};
