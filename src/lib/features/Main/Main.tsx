import React, { useCallback, useMemo, useState } from 'react';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { Authorization } from '../Authorization/Authorization';

export const Main: React.FC = (props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [user, setUser] = useState<string>('');

  const buttonOnClickHandler = useCallback(() => {
    setShowModal(true);
  }, [setShowModal]);

  const onClose = useCallback(() => {
    setShowModal(false);
    setUser('');
  }, [setShowModal]);

  const onAuthorizationSuccess = useCallback((userEmailAddress: string) => {
    setUser(userEmailAddress);
  }, [setUser]);

  const modal = useMemo(() =>
    showModal && <Modal withCloseIcon onClose={onClose}>
      {!user && <Authorization onSuccess={onAuthorizationSuccess}/>}
    </Modal>
  , [showModal, onClose, user, onAuthorizationSuccess]);

  return (
    <>
      <Button label='Buy me!' onClick={buttonOnClickHandler}/>
      {modal}
    </>
  )
}