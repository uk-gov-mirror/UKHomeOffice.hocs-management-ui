import { State } from './state';
import { Action } from './actions';

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SetTeamName':
            // @ts-ignore
            return { ...state, teamName: action.payload };
        case 'PopulateTeamMembers':
            return { ...state, teamMembers: action.payload, teamMembersLoaded: true };
    }
    return state;
};
