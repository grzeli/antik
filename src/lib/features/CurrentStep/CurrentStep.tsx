import React, { useCallback, useMemo } from 'react'
import { Modal } from '../../components/Modal/Modal'
import { Spinner } from '../../components/Spinner/Spinner'
import { AntikCodeChallengeEnum } from '../../core/enums/AntikCodeChallengeEnum'
import { PaymentTypeEnum } from '../../core/enums/PaymentTypeEnum'
import { useAppDispatch, useAppSelector } from '../../core/hooks/useRedux'
import { setPaymentProductData, setPaymentType } from '../../core/store/payment'
import { updateCurrentUserData } from '../../core/store/user'
import { Authorization } from '../Authorization/Authorization'
import { PastPayment } from '../PastPayment/PastPayment'
import { Payment } from '../Payment/Payment'
import { ProductPage } from '../ProductPage/ProductPage'

export interface CurrentStepProps {
  onModalClose(): void
}

export const CurrentStep: React.FC<CurrentStepProps> = (props) => {
  const { onModalClose } = props
  const { currentUser } = useAppSelector((store) => store.user)
  const { paymentType, product } = useAppSelector((store) => store.payment)
  const dispatch = useAppDispatch()

  const onClose = useCallback(() => {
    if (onModalClose) {
      onModalClose()
    }
    dispatch(updateCurrentUserData(''))
    dispatch(setPaymentProductData(null))
    dispatch(setPaymentType(null))
    const params = new URLSearchParams(window.location.search)
    if (new URLSearchParams(window.location.search).get(AntikCodeChallengeEnum.Value)) {
      params.delete(AntikCodeChallengeEnum.Value)
      location.replace(location.pathname + params)
    }
  }, [onModalClose, dispatch])

  const modal = useMemo(
    () =>
      product && Object.keys(product)?.length ? (
        <Modal withCloseIcon onClose={onClose}>
          {!currentUser && <Authorization />}
          {!!currentUser && !paymentType && (!product.sharesTaken || product.sharesTaken < 100) && (
            <ProductPage {...product} />
          )}
          {!!currentUser && paymentType && !![PaymentTypeEnum.Draft, PaymentTypeEnum.New].includes(paymentType) && (
            <Payment />
          )}
          {((paymentType && !![PaymentTypeEnum.Paid, PaymentTypeEnum.PaidPartially].includes(paymentType)) ||
            (!!currentUser && product.sharesTaken === 100 && paymentType !== PaymentTypeEnum.New)) && <PastPayment />}
        </Modal>
      ) : (
        <Modal
          withCloseIcon
          display='flex'
          justifyContent='center'
          onClose={onClose}
          alignItems='center'
          flexDirection='column'
        >
          <Spinner color='#000' fontSize='50px' />
        </Modal>
      ),
    [onClose, currentUser, paymentType, product],
  )

  return <>{modal}</>
}
