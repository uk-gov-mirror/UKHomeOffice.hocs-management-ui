import Item from '../../../models/item';

export type AddToSelection = {
    payload: Item;
    type: 'AddToSelection';
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
export type SetTeamName = {
    type: 'SetTeamName';
    payload?: string;
};

export type Action =
    AddToSelection |
    ClearSelectedUser |
    PopulateUsers |
    RemoveFromSelection |
    SetTeamName;
