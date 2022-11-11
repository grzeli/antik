import React, { ReactNode, RefObject, useMemo } from 'react';
import styled from 'styled-components';
import { CloseIcon } from '../../statics/CloseIcon/CloseIcon';
import { Button } from '../Button/Button';

interface ModalProps {
  children?: ReactNode | string;
  position?: string;
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  display?: string;
  modalRef?: RefObject<HTMLDivElement>;
  width?: string;
  height?: string;
  backgroundColor?: string;
  animation?: string | boolean;
  padding?: string;
  withCloseIcon?: boolean;
  onClose?: () => void;
}

const StyledModal = styled.div<Omit<ModalProps, 'onClose' | 'modalRef' | 'withCloseIcon' | 'children'>>`
  position: ${({ position }) => position || 'absolute'};
  display: ${({ display }) => display || 'block'};
  width: ${({ width }) => width || '200px'};
  height: ${({ height }) => height || '400px'};
  top: ${({ top }) => top || 'unset'};
  right: ${({ right }) => right || 'unset'};
  bottom: ${({ bottom }) => bottom || 'unset'};
  left: ${({ left }) => left || 'unset'};
  border-radius: 12px;
  background: ${({ backgroundColor }) => backgroundColor || 'rgb(243, 246, 255)'};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  animation: ${({ animation }) =>
    typeof animation === 'boolean' ?
      (animation && 'scale-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both') : animation
  };
  padding: ${({ padding }) => padding || '30px 20px 20px'};
  overflow: hidden;

  @-webkit-keyframes scale-in-top {
  0% {
    transform: scale(0);
    transform-origin: 50% 0%;
    opacity: 1;
  }
  100% {
    transform: scale(1);
    transform-origin: 50% 0%;
    opacity: 1;
  }
  }
  @keyframes scale-in-top {
  0% {
    transform: scale(0);
    transform-origin: 50% 0%;
    opacity: 1;
  }
  100% {
    transform: scale(1);
    transform-origin: 50% 0%;
    opacity: 1;
  }
}
`;

export const Modal: React.FC<ModalProps> = props => {
  const { children, modalRef, onClose, withCloseIcon } = props;

  const closeBtn = useMemo(() =>
    withCloseIcon && <Button
      label=''
      backgroundColor='transparent'
      backgroundOnHover={'#e3e3e3'}
      borderRadius={'50%'}
      padding={'6px'}
      display={'flex'}
      position={'absolute'}
      top={'0'}
      right={'0'}
      onClick={onClose}
    >
      {withCloseIcon && CloseIcon}
    </Button>,
    [withCloseIcon, onClose])

  return (
    <StyledModal ref={modalRef} {...props}>
      {closeBtn}
      {children}
    </StyledModal>
  )
}