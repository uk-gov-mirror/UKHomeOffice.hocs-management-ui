export type SetTeams = {
    type: 'SetTeams';
    payload?: [];
};

export type AddTeamUUID = {
    type: 'AddTeamUUID'
    payload: any;
};

export type Action =
    SetTeams |
    AddTeamUUID;

