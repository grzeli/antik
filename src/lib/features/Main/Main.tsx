import React, { useCallback, useMemo, useState } from 'react'
import { Button } from '../../components/Button/Button'
import { Modal } from '../../components/Modal/Modal'
import { Authorization } from '../Authorization/Authorization'
import { ProductPage } from '../ProductPage/ProductPage'

export interface MainComponentProps {
  productId: string
  price: number
  currency: string
  title?: string
  description?: string
  image?: string
  imageAlt?: string
}

export const Main: React.FC<MainComponentProps> = (props) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [user, setUser] = useState<string>('')

  const buttonOnClickHandler = useCallback(() => {
    setShowModal(true)
  }, [setShowModal])

  const onClose = useCallback(() => {
    setShowModal(false)
    setUser('')
  }, [setShowModal])

  const onAuthorizationSuccess = useCallback(
    (userEmailAddress: string) => {
      setUser(userEmailAddress)
    },
    [setUser],
  )

  const modal = useMemo(
    () =>
      showModal && (
        <Modal withCloseIcon onClose={onClose}>
          {!user && <Authorization onSuccess={onAuthorizationSuccess} />}
          {!!user && <ProductPage {...props} />}
        </Modal>
      ),
    [showModal, onClose, user, onAuthorizationSuccess, props],
  )

  return (
    <>
      <Button label='Buy me!' onClick={buttonOnClickHandler} />
      {modal}
    </>
  )
}
