import { State } from './state';
import { Action } from './action';
export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'AddError':
            return {
                ...state,
                errorDescription: 'Something went wrong while adding the following users. Please try again.',
                errorTitle: 'There was an error adding the users',
                errors: [...state.errors || [], action.payload]
            };
        case 'BeginSubmit':
            return { ...state, errors: undefined };
        case 'AddToSelection':
            return { ...state, errors: undefined, selectedUsers: [...[], ...state.selectedUsers, action.payload] };
        case 'RemoveFromSelection':
            return { ...state, selectedUsers: [...state.selectedUsers.filter(user => user.value !== action.payload.value)] };
        case 'ClearSelectedUser':
            return { ...state, selectedUser: '' };
        case 'PopulateUsers':
            return { ...state, users: action.payload };
        case 'SetEmptySumbitError':
            return { ...state, errorDescription: 'Please select some users before submitting.', errorTitle: 'No users selected', errors: [] };
        case 'SetTeamName':
            return { ...state, teamName: action.payload };
    }
    return state;
};
