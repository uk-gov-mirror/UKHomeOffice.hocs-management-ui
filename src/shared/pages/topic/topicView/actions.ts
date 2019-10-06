import ErrorMessage from '../../../models/errorMessage';
import Topic from '../../../models/topic';
import Item from "../../../models/item";

export type SetTopic = {
    type: 'SetTopic';
    payload: Topic[];
};

export type SetGeneralError = {
    type: 'SetGeneralError';
    payload: ErrorMessage;
};

export type SetTeams = {
    type: 'SetTeams';
    payload: Item[];
};

export type SetTopicName = {
    type: 'SetTopicName';
    payload: string;
};

export type SetPrivateMinisterTeam = {
    type: 'SetPrivateMinisterTeam';
    payload: string
}

export type SetDraftQATeam = {
    type: 'SetDraftQATeam';
    payload: string
}

export type Action =
    SetTopic |
    SetGeneralError |
    SetTopicName |
    SetTeams |
    SetDraftQATeam |
    SetPrivateMinisterTeam;
