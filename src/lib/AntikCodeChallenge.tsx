import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { Provider } from 'react-redux'
import { Button, ButtonProps } from './components/Button/Button'
import { AntikCodeChallengeEnum } from './core/enums/AntikCodeChallengeEnum'
import { store } from './core/store'
import { Main } from './features/Main/Main'

interface AntikCodeChallengeProps {
  productId: string
  price: number
  currency: string
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  defaultButtonProps?: ButtonProps
  customButton?: ReactNode
}

export const AntikCodeChallenge: React.FC<AntikCodeChallengeProps> = (props) => {
  const { customButton, defaultButtonProps, ...restProps } = props
  const [showModal, setShowModal] = useState<boolean>(false)

  const toggleShowModalState = useCallback(() => {
    setShowModal((prevState: boolean) => !prevState)
  }, [setShowModal])

  useEffect(() => {
    const searchParam = new URLSearchParams(window.location.search)
    if (props.productId === searchParam?.get(AntikCodeChallengeEnum.Value)) {
      setShowModal(true)
    }
  }, [])

  const button = useMemo(
    () =>
      customButton ? (
        <span onClick={toggleShowModalState}>{customButton}</span>
      ) : (
        <Button {...defaultButtonProps} label={defaultButtonProps?.label || 'Buy'} onClick={toggleShowModalState} />
      ),
    [customButton, defaultButtonProps, toggleShowModalState],
  )

  return (
    <>
      {button}
      {showModal && (
        <Provider store={store}>
          <Main {...restProps} onModalClose={toggleShowModalState} />
        </Provider>
      )}
    </>
  )
}
