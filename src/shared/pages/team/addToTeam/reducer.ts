import { State } from './state';
import { Action } from './actions';

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'AddToSelection':
            return { ...state, selectedUsers: [...[], ...state.selectedUsers, action.payload] };
        case 'ClearSelectedUser':
            return { ...state };
        case 'RemoveFromSelection':
            return { ...state, selectedUsers: [...state.selectedUsers.filter(user => user.value !== action.payload.value)] };
        case 'SetTeamName':
            return { ...state, teamName: action.payload };
    }
    return state;
};
