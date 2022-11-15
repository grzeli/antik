import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'

interface FormElementProps {
  id: string
  label: string
  inputType: 'text' | 'email' | 'password'
  onChange(data: string): void
  onBlur?(): void
  value?: string
  invalid?: boolean
  validityMsg?: string
}

const Label = styled.label<Pick<FormElementProps, 'invalid'>>`
  color: ${({ invalid }) => (invalid ? 'red' : '#666666')};
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.5px;
  font-family: Helvetica, sans-serif;
  text-align: left;
`

const Input = styled.input<Pick<FormElementProps, 'invalid'>>`
  width: 100%;
  padding: 7px 6px;
  color: ${({ invalid }) => (invalid ? 'red' : '#202223')};
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  background: #fff;
  border: 1px solid #a7acb1;
  border-color: ${({ invalid }) => invalid && 'red'};
  border-radius: 8px;
  font-family: 'arial';
  margin: 1px 0 15px 0;

  &:focus-visible {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`

const InvalidMsg = styled.p`
  margin: -14px 0 2px 0;
  color: red;
  bottom: 0;
  font-size: 11px;
  font-family: 'arial';
`

export const FormElement: React.FC<FormElementProps> = (props) => {
  const { id, label, inputType, onChange, value, onBlur, invalid, validityMsg } = props

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    },
    [onChange],
  )

  const validityText = useMemo(() => invalid && <InvalidMsg>{validityMsg}</InvalidMsg>, [invalid, validityMsg])

  return (
    <>
      <Label htmlFor={id} invalid={invalid}>
        {label}
      </Label>
      <Input id={id} type={inputType} onChange={onChangeHandler} value={value} onBlur={onBlur} invalid={invalid} />
      {validityText}
    </>
  )
}
