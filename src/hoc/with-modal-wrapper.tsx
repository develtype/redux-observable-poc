import React, { memo } from 'react';
import { Modal } from 'src/component/organism/modal/modal';

type ModalWrapperPropsType = {
  onClose(): void;
  modalVisible: boolean;
  modalOptions?: {
    alignV?: 'top' | 'bottom' | 'center';
    alignH?: 'left' | 'right' | 'center';
  };
};

export const withModalWrapper = <T,>(
  title: string,
  Component: React.ComponentType<T>,
) => {
  const WrappedComp = (props: T & ModalWrapperPropsType) => (
    <>
      {props.modalVisible && (
        <Modal
          title={title}
          alignV={props.modalOptions?.alignV}
          alignH={props.modalOptions?.alignH}
          onClose={props.onClose}
        >
          <Component {...props} />
        </Modal>
      )}
    </>
  );

  return memo(
    WrappedComp,
    (prevProps, nextProps) => prevProps.modalVisible === nextProps.modalVisible,
  );
};
