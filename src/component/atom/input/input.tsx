import classNames from 'classnames';
import React from 'react';
import styles from './input.scss';

type PropsType = {
  sizeType?: 'sm' | 'md' | 'lg';
  borderType?: 'default' | 'bottom' | 'none';
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  sizeType,
  borderType = 'default',
  ...props
}: PropsType) => {
  return (
    <input
      {...props}
      className={classNames(styles.root, {
        [styles.smSize]: sizeType === 'sm',
        [styles.mdSize]: sizeType === 'md',
        [styles.lgSize]: sizeType === 'lg',
        [styles.borderBottom]: borderType === 'bottom',
        [styles.borderNone]: borderType === 'none',
      })}
    />
  );
};
