import React, { useCallback } from 'react'
import { Provider } from 'react-redux'
import { store } from '../../core/store'
import { CurrentStep } from '../CurrentStep/CurrentStep'

export interface MainProps {
  productId: string
  price: number
  currency: string
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  onModalClose?(): void
}

export const Main: React.FC<MainProps> = (props) => {
  const { onModalClose } = props

  const onClose = useCallback(() => {
    if (onModalClose) {
      onModalClose()
    }
  }, [onModalClose])

  return (
    <Provider store={store}>
      <CurrentStep {...props} onModalClose={onClose} />
    </Provider>
  )
}
