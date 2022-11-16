import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { Provider } from 'react-redux'
import { Button, ButtonProps } from './components/Button/Button'
import { ModalProps } from './components/Modal/Modal'
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
  modalProps?: ModalProps
  customButton?: ReactNode
}

export const ModalContext = createContext<ModalProps | null | undefined>(null)

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
          <ModalContext.Provider value={props.modalProps}>
            <Main {...restProps} onModalClose={toggleShowModalState} />
          </ModalContext.Provider>
        </Provider>
      )}
    </>
  )
}
