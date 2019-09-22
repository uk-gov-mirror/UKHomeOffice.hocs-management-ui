import { FormError } from '../../../models/formError';
import Item from '../../../models/item';
import ErrorMessage from '../../../models/errorMessage';

export type AddSubmitError = {
    payload: FormError;
    type: 'AddSubmitError';
};
export type AddToSelection = {
    payload: Item;
    type: 'AddToSelection';
};
export type BeginSubmit = {
    type: 'BeginSubmit';
};
export type ClearSelectedUser = {
    type: 'ClearSelectedUser';
};
export type PopulateUsers = {
    payload: Item[];
    type: 'PopulateUsers';
};
export type RemoveFromSelection = {
    payload: Item;
    type: 'RemoveFromSelection';
};
export type SetGeneralError = {
    type: 'SetGeneralError';
    payload: ErrorMessage;
};
export type SetTeamName = {
    type: 'SetTeamName';
    payload?: string;
};

export type Action =
    AddSubmitError |
    AddToSelection |
    BeginSubmit |
    ClearSelectedUser |
    PopulateUsers |
    RemoveFromSelection |
    SetGeneralError |
    SetTeamName;
