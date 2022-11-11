import { __assign, __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
var ButtonStyled = styled.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: ", ";\n  background: ", ";\n  color: ", ";\n  font-size: ", ";\n  line-height: ", ";\n  border-radius: ", ";\n  padding: ", ";\n  transition-duration: 200ms;\n  transition-property: box-shadow,transform;\n  font-weight: ", ";\n  cursor: pointer;\n  margin: ", ";\n  text-decoration: none;\n  text-align: center;\n  font-family: ", ";\n  width: auto;\n  border: ", ";\n  top: ", ";\n  right: ", ";\n  bottom: ", ";\n  left: ", ";\n  position: ", ";\n  pointer-events: ", ";\n  opacity: ", ";\n\n  &:hover {\n    transform: scale(1.05);\n    box-shadow: ", ";\n    background: ", ";\n  }\n"], ["\n  display: ", ";\n  background: ", ";\n  color: ", ";\n  font-size: ", ";\n  line-height: ", ";\n  border-radius: ", ";\n  padding: ", ";\n  transition-duration: 200ms;\n  transition-property: box-shadow,transform;\n  font-weight: ", ";\n  cursor: pointer;\n  margin: ", ";\n  text-decoration: none;\n  text-align: center;\n  font-family: ", ";\n  width: auto;\n  border: ", ";\n  top: ", ";\n  right: ", ";\n  bottom: ", ";\n  left: ", ";\n  position: ", ";\n  pointer-events: ", ";\n  opacity: ", ";\n\n  &:hover {\n    transform: scale(1.05);\n    box-shadow: ", ";\n    background: ", ";\n  }\n"])), function (_a) {
    var display = _a.display;
    return display || 'flex';
}, function (_a) {
    var backgroundColor = _a.backgroundColor;
    return backgroundColor || '#332525';
}, function (_a) {
    var textColor = _a.textColor;
    return textColor || '#fff';
}, function (_a) {
    var fontSize = _a.fontSize;
    return fontSize || '16px';
}, function (_a) {
    var lineHeight = _a.lineHeight;
    return lineHeight || '20px';
}, function (_a) {
    var borderRadius = _a.borderRadius;
    return borderRadius || '16px';
}, function (_a) {
    var padding = _a.padding;
    return padding || '4px 12px';
}, function (_a) {
    var fontWeight = _a.fontWeight;
    return fontWeight || '600';
}, function (_a) {
    var margin = _a.margin;
    return margin || ' 0 0 16px 0';
}, function (_a) {
    var fontFamily = _a.fontFamily;
    return fontFamily || 'inherit';
}, function (_a) {
    var border = _a.border;
    return border || 'none';
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
    var position = _a.position;
    return position || 'inherit';
}, function (_a) {
    var disabled = _a.disabled;
    return disabled ? 'none' : 'auto';
}, function (_a) {
    var disabled = _a.disabled;
    return disabled && 0.5;
}, function (_a) {
    var boxShadow = _a.boxShadow;
    return boxShadow || '0 20px 25px -5px rgba(0, 0, 0, 0.1),0 10px 10px -5px rgba(0, 0, 0, 0.04)';
}, function (_a) {
    var backgroundOnHover = _a.backgroundOnHover, backgroundColor = _a.backgroundColor;
    return backgroundOnHover || (backgroundColor || '#332525');
});
export var Button = function (props) {
    return (React.createElement(ButtonStyled, __assign({}, props, { onClick: props === null || props === void 0 ? void 0 : props.onClick }),
        props.label,
        props.children));
};
var templateObject_1;
//# sourceMappingURL=Button.js.map