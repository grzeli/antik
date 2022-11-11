import React, { useCallback, useMemo, useState } from 'react';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { Authorization } from '../Authorization/Authorization';
export var Main = function (props) {
    var _a = useState(false), showModal = _a[0], setShowModal = _a[1];
    var _b = useState(''), user = _b[0], setUser = _b[1];
    var buttonOnClickHandler = useCallback(function () {
        setShowModal(true);
    }, [setShowModal]);
    var onClose = useCallback(function () {
        setShowModal(false);
        setUser('');
    }, [setShowModal]);
    var onAuthorizationSuccess = useCallback(function (userEmailAddress) {
        setUser(userEmailAddress);
    }, [setUser]);
    var modal = useMemo(function () {
        return showModal && React.createElement(Modal, { withCloseIcon: true, onClose: onClose }, !user && React.createElement(Authorization, { onSuccess: onAuthorizationSuccess }));
    }, [showModal, onClose, user, onAuthorizationSuccess]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { label: 'Buy me!', onClick: buttonOnClickHandler }),
        modal));
};
//# sourceMappingURL=Main.js.map