import React, { useCallback, useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { store } from '../../core/store'
import { CurrentStep } from '../CurrentStep/CurrentStep'

export interface MainProps {
  productId?: string
  price?: number
  currency?: string
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  onModalClose?(): void
}

export const Main: React.FC<MainProps> = (props) => {
  const { onModalClose } = props
  const productDataRef = useRef(null)

  useEffect(() => {
    if (!props.productId && window.location.pathname && !productDataRef.current) {
      const productData = JSON.parse(localStorage.getItem(window.location.pathname.split('/')[1]) as string)
      if (productData) {
        productDataRef.current = productData
      }
    }
  }, [productDataRef.current])

  const onClose = useCallback(() => {
    if (onModalClose) {
      onModalClose()
    }
  }, [onModalClose])

  return (
    <Provider store={store}>
      <CurrentStep
        {...props}
        productId={props.productId || ''}
        price={props.price || 0}
        currency={props.currency || ''}
        onModalClose={onClose}
      />
    </Provider>
  )
}
