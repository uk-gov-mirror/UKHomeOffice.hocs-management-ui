import Item from '../../../models/item';
import ErrorMessage from '../../../models/errorMessage';

export type SetTeamName = {
    type: 'SetTeamName';
    payload?: string;
};

export type PopulateTeamMembers = {
    payload: Item[];
    type: 'PopulateTeamMembers';
};

export type SetGeneralError = {
    type: 'SetGeneralError';
    payload: ErrorMessage;
};

export type Action =
    SetTeamName |
    PopulateTeamMembers |
    SetGeneralError;
