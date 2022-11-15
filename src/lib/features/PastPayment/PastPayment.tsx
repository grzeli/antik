import React, { useMemo } from 'react'
import { PaymentTypeEnum } from '../../core/enums/PaymentTypeEnum'
import { useAppSelector } from '../../core/hooks/useRedux'
import { FullyPaid } from './FullyPaid/FullyPaid'
import { PaidPartially } from './PaidPartially/PaidPartially'

export const PastPayment: React.FC = () => {
  const { paymentType, product } = useAppSelector((store) => store.payment)

  const postPaymentOutput = useMemo(
    () => (paymentType === PaymentTypeEnum.Paid || product?.sharesTaken === 100 ? <FullyPaid /> : <PaidPartially />),
    [paymentType, product?.sharesTaken],
  )

  return <>{postPaymentOutput}</>
}
