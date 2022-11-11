import React from 'react';
interface FormElementProps {
    id: string;
    label: string;
    inputType: 'text' | 'email' | 'password';
    onChange(data: string): void;
    onBlur?(): void;
    value?: string;
    invalid?: boolean;
    validityMsg?: string;
}
export declare const FormElement: React.FC<FormElementProps>;
export {};
