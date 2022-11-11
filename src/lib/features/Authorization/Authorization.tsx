import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../components/Button/Button';
import { FormElement } from '../../components/FormElement/FormElement';
import { Spinner } from '../../components/Spinner/Spinner';

interface AuthorizationProps {
  onSuccess(user: string): void;
}

const ErrorMsg = styled.p`
  color: red;
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  margin: 20px 0 0 0;
`;

export const Authorization: React.FC<AuthorizationProps> = props => {
  const { onSuccess } = props;
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailAddressValidity, setEmailAddressValidity] = useState<boolean>(true);
  const [passwordValidity, setPasswordValidity] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formWasSubmitted, setFormWasSubmitted] = useState<boolean>(false);

  const validateForm = useCallback(() => {
    setPasswordValidity(!!password.length && password.length > 5);
    setEmailAddressValidity(!!emailAddress.length
      && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailAddress));
  }, [emailAddress, password]);

  useEffect(() => validateForm(), [emailAddress, password, validateForm]);

  const onSubmit = useCallback(() => {
    setFormWasSubmitted(true);
    if (emailAddressValidity && passwordValidity) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onSuccess(emailAddress);
      }, 1000);
    }
  }, [emailAddressValidity, passwordValidity, emailAddress, onSuccess]);

  const errorMsg = useMemo(() =>
    error && <ErrorMsg>{error}</ErrorMsg>,
  [error]);

  return (
    <>
      <FormElement
        inputType='email'
        label='Email address'
        id='email'
        value={emailAddress}
        invalid={!emailAddressValidity && formWasSubmitted}
        onChange={setEmailAddress}
        validityMsg='Email address invalid'
      />
      <FormElement
        inputType='password'
        label='Password'
        id='password'
        value={password}
        invalid={!passwordValidity && formWasSubmitted}
        onChange={setPassword}
        validityMsg='Password invalid'
      />
      <Button
        label='Log in'
        margin='40px auto 0'
        position='static'
        disabled={(formWasSubmitted && (!emailAddressValidity || !passwordValidity)) || isLoading}
        onClick={onSubmit}
      >
        {isLoading && <Spinner />}
      </Button>
      {errorMsg}
    </>
  )
}