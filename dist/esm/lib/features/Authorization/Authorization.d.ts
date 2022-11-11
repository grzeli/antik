import React from 'react';
interface AuthorizationProps {
    onSuccess(user: string): void;
}
export declare const Authorization: React.FC<AuthorizationProps>;
export {};
