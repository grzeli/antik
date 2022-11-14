import React, { useCallback, useMemo } from 'react'
import { Modal } from '../../components/Modal/Modal'
import { useAppSelector } from '../../core/hooks/useRedux'
import { Authorization } from '../Authorization/Authorization'
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

  const onClose = useCallback(() => {
    if (onModalClose) {
      onModalClose()
    }
  }, [onModalClose])

  const modal = useMemo(
    () => (
      <Modal withCloseIcon onClose={onClose}>
        {!currentUser && <Authorization />}
        {!!currentUser && <ProductPage {...props} />}
      </Modal>
    ),
    [onClose, currentUser, props],
  )

  return <>{modal}</>
}
