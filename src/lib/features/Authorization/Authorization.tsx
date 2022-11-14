import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../components/Button/Button'
import { FormElement } from '../../components/FormElement/FormElement'
import { Spinner } from '../../components/Spinner/Spinner'
import { useAppDispatch } from '../../core/hooks/useRedux'
import { updateCurrentUserData } from '../../core/store/user'

const ErrorMsg = styled.p`
  color: red;
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  margin: 20px 0 0 0;
`

export const Authorization: React.FC = () => {
  const [emailAddress, setEmailAddress] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [emailAddressValidity, setEmailAddressValidity] = useState<boolean>(true)
  const [passwordValidity, setPasswordValidity] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [formWasSubmitted, setFormWasSubmitted] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const validateForm = useCallback(() => {
    setPasswordValidity(!!password.length && password.length > 5)
    setEmailAddressValidity(!!emailAddress.length && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailAddress))
  }, [emailAddress, password])

  useEffect(() => validateForm(), [emailAddress, password, validateForm])

  const onAuthorizationSuccess = useCallback(
    (userEmailAddress: string) => {
      dispatch(updateCurrentUserData(userEmailAddress))
    },
    [dispatch],
  )

  const onSubmit = useCallback(() => {
    setFormWasSubmitted(true)
    if (emailAddressValidity && passwordValidity) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        onAuthorizationSuccess(emailAddress)
        setError(null)
      }, 1000)
    }
  }, [emailAddressValidity, passwordValidity, emailAddress, onAuthorizationSuccess])

  const errorMsg = useMemo(() => error && <ErrorMsg>{error}</ErrorMsg>, [error])

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
