import React, { ReactNode, RefObject } from 'react';
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
export declare const Modal: React.FC<ModalProps>;
export {};
