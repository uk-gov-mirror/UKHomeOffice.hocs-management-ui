import Item from '../../../models/item';
import Team from '../../../models/team';

export type AddToSelection = {
    payload: string;
    type: 'AddToSelection';
};
export type ClearInputField = {
    type: 'ClearInputField';
};
export type RemoveFromSelection = {
    payload: Item;
    type: 'RemoveFromSelection';
};
export type SetTeam = {
    type: 'SetTeam';
    payload: Team;
};
export type UpdateInputValue = {
    type: 'UpdateInputValue';
    payload: string;
};

export type Action =
    AddToSelection |
    ClearInputField |
    RemoveFromSelection |
    SetTeam |
    UpdateInputValue;
