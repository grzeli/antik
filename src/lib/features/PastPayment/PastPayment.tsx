import React, { useMemo } from 'react'
import { PaymentTypeEnum } from '../../core/enums/PaymentTypeEnum'
import { useAppSelector } from '../../core/hooks/useRedux'
import { FullyPaid } from './FullyPaid/FullyPaid'
import { PaidPartially } from './PaidPartially/PaidPartially'

export const PastPayment: React.FC = () => {
  const { paymentType } = useAppSelector((store) => store.payment)

  const postPaymentOutput = useMemo(
    () => (paymentType === PaymentTypeEnum.Paid ? <FullyPaid /> : <PaidPartially />),
    [paymentType],
  )

  return <>{postPaymentOutput}</>
}
