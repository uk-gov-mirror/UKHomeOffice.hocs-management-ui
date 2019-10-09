import ErrorMessage from '../../../models/errorMessage';
import Item from "../../../models/item";

export type SetTopic = {
    type: 'SetTopic';
    payload: Item;
};

export type SetGeneralError = {
    type: 'SetGeneralError';
    payload: ErrorMessage;
};

export type SetTeams = {
    type: 'SetTeams';
    payload: Item[];
};

export type SetPrivateMinisterTeam = {
    type: 'SetPrivateMinisterTeam';
    payload: Item
}

export type SetDraftQATeam = {
    type: 'SetDraftQATeam';
    payload: Item
}

export type Action =
    SetTopic |
    SetGeneralError |
    SetTeams |
    SetDraftQATeam |
    SetPrivateMinisterTeam;
