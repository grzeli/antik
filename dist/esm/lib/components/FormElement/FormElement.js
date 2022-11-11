import { __makeTemplateObject } from "tslib";
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
var Label = styled.label(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  color: ", ";\n  font-size: 16px;\n  line-height: 16px;\n  letter-spacing: -0.5px;\n"], ["\n  color: ", ";\n  font-size: 16px;\n  line-height: 16px;\n  letter-spacing: -0.5px;\n"])), function (_a) {
    var invalid = _a.invalid;
    return invalid ? 'red' : '#666666';
});
var Input = styled.input(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  max-width: 100%;\n  padding: 7px 6px;\n  color: ", ";\n  font-weight: 400;\n  font-size: 14px;\n  line-height: 14px;\n  background: #FFF;\n  border: 1px solid #A7ACB1;\n  border-color: ", ";\n  border-radius: 8px;\n  font-family: 'arial';\n  margin: 1px 0 15px 0;\n\n  &:focus-visible {\n    outline: none;\n  }\n\n  &:disabled {\n    opacity: 0.5;\n    pointer-events: none;\n  }\n"], ["\n  max-width: 100%;\n  padding: 7px 6px;\n  color: ", ";\n  font-weight: 400;\n  font-size: 14px;\n  line-height: 14px;\n  background: #FFF;\n  border: 1px solid #A7ACB1;\n  border-color: ", ";\n  border-radius: 8px;\n  font-family: 'arial';\n  margin: 1px 0 15px 0;\n\n  &:focus-visible {\n    outline: none;\n  }\n\n  &:disabled {\n    opacity: 0.5;\n    pointer-events: none;\n  }\n"])), function (_a) {
    var invalid = _a.invalid;
    return invalid ? 'red' : '#202223';
}, function (_a) {
    var invalid = _a.invalid;
    return invalid && 'red';
});
var InvalidMsg = styled.p(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin: -14px 0 2px 0;\n  color: red;\n  bottom: 0;\n  font-size: 11px;\n  font-family: 'arial';\n"], ["\n  margin: -14px 0 2px 0;\n  color: red;\n  bottom: 0;\n  font-size: 11px;\n  font-family: 'arial';\n"])));
export var FormElement = function (props) {
    var id = props.id, label = props.label, inputType = props.inputType, onChange = props.onChange, value = props.value, onBlur = props.onBlur, invalid = props.invalid, validityMsg = props.validityMsg;
    var onChangeHandler = useCallback(function (e) {
        onChange(e.target.value);
    }, [onChange]);
    var validityText = useMemo(function () {
        return invalid && React.createElement(InvalidMsg, null, validityMsg);
    }, [invalid, validityMsg]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Label, { htmlFor: id, invalid: invalid }, label),
        React.createElement(Input, { id: id, type: inputType, onChange: onChangeHandler, value: value, onBlur: onBlur, invalid: invalid }),
        validityText));
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=FormElement.js.map