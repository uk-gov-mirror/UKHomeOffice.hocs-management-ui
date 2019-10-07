export type SetTopicName = {
    payload: string;
    type: 'SetTopicName';
};

export type SetPrivateMinisterTeam = {
    payload: string;
    type: 'SetPrivateMinisterTeam';
};

export type SetDraftQATeam = {
    payload: string;
    type: 'SetDraftQATeam';
};

export type Action =
    SetTopicName |
    SetPrivateMinisterTeam |
    SetDraftQATeam;
