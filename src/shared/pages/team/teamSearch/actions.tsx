import Item from '../../../models/item';
import ErrorMessage from '../../../models/errorMessage';

export type SetTeams = {
    type: 'SetTeams';
    payload?: Item[];
};

export type AddTeamUUID = {
    type: 'AddTeamUUID'
    payload: any;
};

export type SetGeneralError = {
    type: 'SetGeneralError';
    payload: ErrorMessage;
};

export type Action =
    SetTeams |
    AddTeamUUID |
    SetGeneralError;
