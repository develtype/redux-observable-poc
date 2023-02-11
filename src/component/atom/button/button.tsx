import classNames from 'classnames';
import React from 'react';
import styles from './button.scss';

export type PropsType = {
  sizeType?: 'sm' | 'md' | 'lg';
  buttonColor?: 'primary' | 'secondary';
  outlined?: boolean;
  disabled?: boolean;
  isRounded?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  sizeType,
  buttonColor,
  outlined = false,
  disabled = false,
  isRounded,
  onClick,
  children,
  ...props
}: PropsType) => (
  <button
    {...props}
    type='button'
    className={classNames(styles.root, {
      [styles.smSize]: sizeType === 'sm',
      [styles.mdSize]: sizeType === 'md',
      [styles.lgSize]: sizeType === 'lg',
      [styles.primary]: buttonColor === 'primary',
      [styles.secondary]: buttonColor === 'secondary',
      [styles.rounded]: isRounded,
      [styles.outlined]: outlined,
    })}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
