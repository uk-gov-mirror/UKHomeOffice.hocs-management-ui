import { State } from './state';
import { Action } from './actions';

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SetTeams':
            // @ts-ignore
            return { ...state, teams: action.payload, teamsLoaded: true };
        case 'AddTeamUUID':
            return { ...state, teamUUID: action.payload };
        case 'SetGeneralError':
            return { ...state, errorDescription: action.payload.description, errorTitle: action.payload.title };
    }
    return state;
};
