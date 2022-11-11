import React, { ReactNode } from 'react';
interface ButtonProps {
    label: string;
    id?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    fontSize?: string;
    margin?: string;
    padding?: string;
    backgroundColor?: string;
    borderRadius?: string;
    lineHeight?: string;
    textColor?: string;
    fontFamily?: string;
    fontWeight?: string;
    boxShadow?: string;
    border?: string;
    backgroundOnHover?: string;
    children?: ReactNode | string;
    display?: string;
    position?: string;
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
}
export declare const Button: React.FC<ButtonProps>;
export {};
