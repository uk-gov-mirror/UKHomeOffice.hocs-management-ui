import { FormError } from '../../models/formError';
import ErrorMessage from '../../models/errorMessage';
import { InputEventData } from '../../common/components/forms/text';

export type AddValidationError = {
    payload: FormError;
    type: 'AddValidationError';
};
export type BeginSubmit = {
    type: 'BeginSubmit';
};
export type SetGeneralError = {
    payload: ErrorMessage;
    type: 'SetGeneralError';
};
export type SetUnitValues = {
    payload: InputEventData;
    type: 'SetUnitValues';
};

export type Action =
    AddValidationError |
    BeginSubmit |
    SetGeneralError |
    SetUnitValues;
