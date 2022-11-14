import React, { useCallback, useEffect, useMemo } from 'react'
import { Modal } from '../../components/Modal/Modal'
import { useAppDispatch, useAppSelector } from '../../core/hooks/useRedux'
import { Product } from '../../core/interfaces/Product/Product'
import { updateProductData } from '../../core/store/productSlice'
import { updateCurrentUserData } from '../../core/store/user'
import { Authorization } from '../Authorization/Authorization'
import { Payment } from '../Payment/Payment'
import { ProductPage } from '../ProductPage/ProductPage'

export interface CurrentStepProps {
  productId: string
  price: number
  currency: string
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  onModalClose?(): void
}

export const CurrentStep: React.FC<CurrentStepProps> = (props) => {
  const { onModalClose } = props
  const { currentUser } = useAppSelector((store) => store.user)
  const { paymentType } = useAppSelector((store) => store.payment)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const data: Product = {
      productId: props.productId,
      price: props.price,
      currency: props.currency,
      title: props.title,
      description: props.description,
      image: props.image,
      imageAlt: props.imageAlt,
    }
    dispatch(updateProductData(data))
  }, [])

  const onClose = useCallback(() => {
    if (onModalClose) {
      onModalClose()
    }
    dispatch(updateCurrentUserData(''))
  }, [onModalClose, dispatch])

  const modal = useMemo(
    () => (
      <Modal withCloseIcon onClose={onClose}>
        {!currentUser && !paymentType && <Authorization />}
        {!!currentUser && !paymentType && <ProductPage {...props} />}
        {paymentType && <Payment />}
      </Modal>
    ),
    [onClose, currentUser, props, paymentType],
  )

  return <>{modal}</>
}
