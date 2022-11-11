import { __assign, __makeTemplateObject } from "tslib";
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { CloseIcon } from '../../statics/CloseIcon/CloseIcon';
import { Button } from '../Button/Button';
var StyledModal = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: ", ";\n  display: ", ";\n  width: ", ";\n  height: ", ";\n  top: ", ";\n  right: ", ";\n  bottom: ", ";\n  left: ", ";\n  border-radius: 12px;\n  background: ", ";\n  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;\n  animation: ", ";\n  padding: ", ";\n  overflow: hidden;\n\n  @-webkit-keyframes scale-in-top {\n  0% {\n    transform: scale(0);\n    transform-origin: 50% 0%;\n    opacity: 1;\n  }\n  100% {\n    transform: scale(1);\n    transform-origin: 50% 0%;\n    opacity: 1;\n  }\n  }\n  @keyframes scale-in-top {\n  0% {\n    transform: scale(0);\n    transform-origin: 50% 0%;\n    opacity: 1;\n  }\n  100% {\n    transform: scale(1);\n    transform-origin: 50% 0%;\n    opacity: 1;\n  }\n}\n"], ["\n  position: ", ";\n  display: ", ";\n  width: ", ";\n  height: ", ";\n  top: ", ";\n  right: ", ";\n  bottom: ", ";\n  left: ", ";\n  border-radius: 12px;\n  background: ", ";\n  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;\n  animation: ", ";\n  padding: ", ";\n  overflow: hidden;\n\n  @-webkit-keyframes scale-in-top {\n  0% {\n    transform: scale(0);\n    transform-origin: 50% 0%;\n    opacity: 1;\n  }\n  100% {\n    transform: scale(1);\n    transform-origin: 50% 0%;\n    opacity: 1;\n  }\n  }\n  @keyframes scale-in-top {\n  0% {\n    transform: scale(0);\n    transform-origin: 50% 0%;\n    opacity: 1;\n  }\n  100% {\n    transform: scale(1);\n    transform-origin: 50% 0%;\n    opacity: 1;\n  }\n}\n"])), function (_a) {
    var position = _a.position;
    return position || 'absolute';
}, function (_a) {
    var display = _a.display;
    return display || 'block';
}, function (_a) {
    var width = _a.width;
    return width || '200px';
}, function (_a) {
    var height = _a.height;
    return height || '400px';
}, function (_a) {
    var top = _a.top;
    return top || 'unset';
}, function (_a) {
    var right = _a.right;
    return right || 'unset';
}, function (_a) {
    var bottom = _a.bottom;
    return bottom || 'unset';
}, function (_a) {
    var left = _a.left;
    return left || 'unset';
}, function (_a) {
    var backgroundColor = _a.backgroundColor;
    return backgroundColor || 'rgb(243, 246, 255)';
}, function (_a) {
    var animation = _a.animation;
    return typeof animation === 'boolean' ?
        (animation && 'scale-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both') : animation;
}, function (_a) {
    var padding = _a.padding;
    return padding || '30px 20px 20px';
});
export var Modal = function (props) {
    var children = props.children, modalRef = props.modalRef, onClose = props.onClose, withCloseIcon = props.withCloseIcon;
    var closeBtn = useMemo(function () {
        return withCloseIcon && React.createElement(Button, { label: '', backgroundColor: 'transparent', backgroundOnHover: '#e3e3e3', borderRadius: '50%', padding: '6px', display: 'flex', position: 'absolute', top: '0', right: '0', onClick: onClose }, withCloseIcon && CloseIcon);
    }, [withCloseIcon, onClose]);
    return (React.createElement(StyledModal, __assign({ ref: modalRef }, props),
        closeBtn,
        children));
};
var templateObject_1;
//# sourceMappingURL=Modal.js.map