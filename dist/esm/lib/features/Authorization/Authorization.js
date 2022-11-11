import { __makeTemplateObject } from "tslib";
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../components/Button/Button';
import { FormElement } from '../../components/FormElement/FormElement';
import { Spinner } from '../../components/Spinner/Spinner';
var ErrorMsg = styled.p(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  color: red;\n  font-size: 16px;\n  line-height: 16px;\n  font-weight: 600;\n  margin: 20px 0 0 0;\n"], ["\n  color: red;\n  font-size: 16px;\n  line-height: 16px;\n  font-weight: 600;\n  margin: 20px 0 0 0;\n"])));
export var Authorization = function (props) {
    var onSuccess = props.onSuccess;
    var _a = useState(''), emailAddress = _a[0], setEmailAddress = _a[1];
    var _b = useState(''), password = _b[0], setPassword = _b[1];
    var _c = useState(true), emailAddressValidity = _c[0], setEmailAddressValidity = _c[1];
    var _d = useState(true), passwordValidity = _d[0], setPasswordValidity = _d[1];
    var _e = useState(false), isLoading = _e[0], setIsLoading = _e[1];
    var _f = useState(null), error = _f[0], setError = _f[1];
    var _g = useState(false), formWasSubmitted = _g[0], setFormWasSubmitted = _g[1];
    var validateForm = useCallback(function () {
        setPasswordValidity(!!password.length && password.length > 5);
        setEmailAddressValidity(!!emailAddress.length
            && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailAddress));
    }, [emailAddress, password]);
    useEffect(function () { return validateForm(); }, [emailAddress, password, validateForm]);
    var onSubmit = useCallback(function () {
        setFormWasSubmitted(true);
        if (emailAddressValidity && passwordValidity) {
            setIsLoading(true);
            setTimeout(function () {
                setIsLoading(false);
                onSuccess(emailAddress);
            }, 1000);
        }
    }, [emailAddressValidity, passwordValidity, emailAddress, onSuccess]);
    var errorMsg = useMemo(function () {
        return error && React.createElement(ErrorMsg, null, error);
    }, [error]);
    return (React.createElement(React.Fragment, null,
        React.createElement(FormElement, { inputType: 'email', label: 'Email address', id: 'email', value: emailAddress, invalid: !emailAddressValidity && formWasSubmitted, onChange: setEmailAddress, validityMsg: 'Email address invalid' }),
        React.createElement(FormElement, { inputType: 'password', label: 'Password', id: 'password', value: password, invalid: !passwordValidity && formWasSubmitted, onChange: setPassword, validityMsg: 'Password invalid' }),
        React.createElement(Button, { label: 'Log in', margin: '40px auto 0', position: 'static', disabled: (formWasSubmitted && (!emailAddressValidity || !passwordValidity)) || isLoading, onClick: onSubmit }, isLoading && React.createElement(Spinner, null)),
        errorMsg));
};
var templateObject_1;
//# sourceMappingURL=Authorization.js.map