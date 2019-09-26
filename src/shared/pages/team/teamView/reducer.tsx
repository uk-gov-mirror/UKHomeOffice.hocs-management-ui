import { State } from './state';
import { Action } from './actions';

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SetTeamName':
            return { ...state, teamName: action.payload };
        case 'PopulateTeamMembers':
            return { ...state, teamMembers: action.payload, teamMembersLoaded: true };
        case 'SetGeneralError':
            return { ...state, errorDescription: action.payload.description, errorTitle: action.payload.title };
    }
    return state;
};
