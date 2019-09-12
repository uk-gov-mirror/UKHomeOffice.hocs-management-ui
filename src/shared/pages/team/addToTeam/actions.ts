import { FormError } from '../../../models/formError';
import Item from '../../../models/item';

export type AddError = {
    payload: FormError;
    type: 'AddError';
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
export type SetEmptySubmitError = {
    type: 'SetEmptySubmitError';
};
export type SetTeamName = {
    type: 'SetTeamName';
    payload?: string;
};

export type Action =
    AddError |
    AddToSelection |
    BeginSubmit |
    ClearSelectedUser |
    PopulateUsers |
    RemoveFromSelection |
    SetEmptySubmitError |
    SetTeamName;
