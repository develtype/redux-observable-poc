import classNames from 'classnames';
import React from 'react';
import styles from './symmetry-button.scss';

export type PropsType = {
  sizeType?: 'xs' | 'sm' | 'md';
  buttonColor?: 'primary' | 'secondary';
  outlined?: boolean;
  disabled?: boolean;
  isRounded?: boolean;
  noShape?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export const SymmetryButton = ({
  sizeType,
  buttonColor,
  outlined = false,
  disabled = false,
  isRounded,
  noShape = false,
  onClick,
  children,
  ...props
}: PropsType) => (
  <button
    {...props}
    type='button'
    className={classNames(styles.root, {
      [styles.xsSize]: sizeType === 'xs',
      [styles.smSize]: sizeType === 'sm',
      [styles.mdSize]: sizeType === 'md',
      [styles.primary]: buttonColor === 'primary',
      [styles.secondary]: buttonColor === 'secondary',
      [styles.rounded]: isRounded,
      [styles.outlined]: outlined,
      [styles.noShape]: noShape,
    })}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
