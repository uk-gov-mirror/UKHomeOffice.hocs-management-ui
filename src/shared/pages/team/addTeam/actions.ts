import Team from '../../../models/team';

export type SetTeamName = {
    payload: Team['displayName'] & Team['letterName']
    type: 'SetTeamName';
};

export type SetUnit = {
    payload: Team['unitUUID']
    type: 'SetUnit';
};

export type SetCaseType = {
    payload: Team['permissions'][0]['accessLevel'];
    type: 'SetCaseType';
};

export type Action =
    SetTeamName |
    SetUnit |
    SetCaseType;
