import React, { ReactNode } from 'react';
import styled from 'styled-components';

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

const ButtonStyled = styled.button<Omit<ButtonProps, 'onClick'>>`
  display: ${({ display }) => display || 'flex'};
  background: ${({ backgroundColor }) => backgroundColor || '#332525'};
  color: ${({ textColor }) => textColor || '#fff'};
  font-size: ${({ fontSize }) => fontSize || '16px'};
  line-height: ${({ lineHeight }) => lineHeight || '20px'};
  border-radius: ${({ borderRadius }) => borderRadius || '16px'};
  padding: ${({ padding }) => padding || '4px 12px'};
  transition-duration: 200ms;
  transition-property: box-shadow,transform;
  font-weight: ${({ fontWeight }) => fontWeight || '600'};
  cursor: pointer;
  margin: ${({ margin }) => margin || ' 0 0 16px 0'};
  text-decoration: none;
  text-align: center;
  font-family: ${({ fontFamily }) => fontFamily || 'inherit'};
  width: auto;
  border: ${({ border }) => border || 'none'};
  top: ${({ top }) => top || 'unset'};
  right: ${({ right }) => right || 'unset'};
  bottom: ${({ bottom }) => bottom || 'unset'};
  left: ${({ left }) => left || 'unset'};
  position: ${({ position }) => position || 'inherit'};
  pointer-events: ${({ disabled }) => disabled ? 'none' : 'auto'};
  opacity: ${({ disabled }) => disabled && 0.5};

  &:hover {
    transform: scale(1.05);
    box-shadow: ${({ boxShadow }) => boxShadow || '0 20px 25px -5px rgba(0, 0, 0, 0.1),0 10px 10px -5px rgba(0, 0, 0, 0.04)'};
    background: ${({ backgroundOnHover, backgroundColor }) => backgroundOnHover || (backgroundColor || '#332525')};
  }
`;

export const Button: React.FC<ButtonProps> = props => {

  return (
    <ButtonStyled {...props} onClick={props?.onClick}>{props.label}{props.children}</ButtonStyled>
  )
}