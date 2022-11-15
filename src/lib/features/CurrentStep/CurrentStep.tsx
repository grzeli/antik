import React, { useCallback, useEffect, useMemo } from 'react'
import { Modal } from '../../components/Modal/Modal'
import { PaymentTypeEnum } from '../../core/enums/PaymentTypeEnum'
import { useAppDispatch, useAppSelector } from '../../core/hooks/useRedux'
import { Product } from '../../core/interfaces/Product/Product'
import { setPaymentProductData, setPaymentType } from '../../core/store/payment'
import { updateCurrentUserData } from '../../core/store/user'
import { Authorization } from '../Authorization/Authorization'
import { PastPayment } from '../PastPayment/PastPayment'
import { Payment } from '../Payment/Payment'
import { ProductPage } from '../ProductPage/ProductPage'

export interface CurrentStepProps extends Product {
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
      sharesTaken: props.sharesTaken,
      owners: props.owners,
    }
    dispatch(setPaymentProductData(data))
  }, [props, dispatch])

  const onClose = useCallback(() => {
    if (onModalClose) {
      onModalClose()
    }
    dispatch(updateCurrentUserData(''))
    dispatch(setPaymentProductData({}))
    dispatch(setPaymentType(null))
  }, [onModalClose, dispatch])

  const modal = useMemo(
    () => (
      <Modal withCloseIcon onClose={onClose}>
        {!currentUser && !paymentType && <Authorization />}
        {!!currentUser && !paymentType && (!props.sharesTaken || props.sharesTaken < 100) && <ProductPage {...props} />}
        {paymentType && !![PaymentTypeEnum.Draft, PaymentTypeEnum.New].includes(paymentType) && <Payment />}
        {((paymentType && !![PaymentTypeEnum.Paid, PaymentTypeEnum.PaidPartially].includes(paymentType)) ||
          (!!currentUser && props.sharesTaken === 100)) && <PastPayment />}
      </Modal>
    ),
    [onClose, currentUser, props, paymentType],
  )

  return <>{modal}</>
}