import { State } from './state';
import { Action } from './actions';
import { ADD_USER_ERROR_DESCRIPTION, ADD_USER_ERROR_TITLE, EMPTY_SUBMIT_ERROR_DESCRIPTION, EMPTY_SUBMIT_ERROR_TITLE } from '../../../models/constants';

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'AddError':
            return {
                ...state,
                errorDescription: ADD_USER_ERROR_DESCRIPTION,
                errorTitle: ADD_USER_ERROR_TITLE,
                errors: [...state.errors || [], action.payload]
            };
        case 'AddToSelection':
            return { ...state, errors: undefined, selectedUsers: [...[], ...state.selectedUsers, action.payload] };
        case 'BeginSubmit':
            return { ...state, errors: undefined };
        case 'ClearSelectedUser':
            return { ...state, selectedUser: '' };
        case 'PopulateUsers':
            return { ...state, users: action.payload };
        case 'RemoveFromSelection':
            return { ...state, selectedUsers: [...state.selectedUsers.filter(user => user.value !== action.payload.value)] };
        case 'SetEmptySubmitError':
            return { ...state, errorDescription: EMPTY_SUBMIT_ERROR_DESCRIPTION, errorTitle: EMPTY_SUBMIT_ERROR_TITLE, errors: [] };
        case 'SetTeamName':
            return { ...state, teamName: action.payload };
    }
    return state;
};
