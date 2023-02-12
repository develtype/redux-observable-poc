import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './spinner.scss';

type PropsType = {
  visible: boolean;
};

export const Spinner = ({ visible }: PropsType) => {
  const container = document.createElement('div');

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return createPortal(
    <>
      {visible && (
        <div className={styles.root}>
          <div className={styles.spinner} />
        </div>
      )}
    </>,
    container,
  );
};
