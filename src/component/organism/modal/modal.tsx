import classNames from 'classnames';
import React from 'react';
import { createPortal } from 'react-dom';
import InlineSVG from 'react-inlinesvg/esm';
import closeIcon from 'src/style/icon/icon-x.svg';
import styles from './modal.scss';

export type PropsType = {
  title: string;
  alignV?: 'top' | 'bottom' | 'center';
  alignH?: 'left' | 'right' | 'center';
  children: React.ReactNode;
  onClose(): void;
};

export const Modal = ({
  title,
  alignV = 'center',
  alignH = 'center',
  children,
  onClose,
}: PropsType) => {
  const container = document.createElement('div');

  React.useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return createPortal(
    <div
      className={classNames(styles.root, {
        [styles.alignVModalTop]: alignV === 'top',
        [styles.alignVModalCenter]: alignV === 'center',
        [styles.alignVModalBottom]: alignV === 'bottom',
        [styles.alignHModalLeft]: alignH === 'left',
        [styles.alignHModalCenter]: alignH === 'center',
        [styles.alignHModalRight]: alignH === 'right',
      })}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.headerTitle}>{title}</span>
          <InlineSVG
            className={styles.closeButton}
            src={closeIcon}
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>,
    container,
  );
};
