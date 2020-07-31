import { State } from './state';
import { Action } from './actions';

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'AddToSelection':
            return { ...state, selectedContacts: [...[], ...state.selectedContacts, { label: action.payload, value: action.payload }] };
        case 'ClearInputField':
            return { ...state, inputValue: '' };
        case 'RemoveFromSelection':
            return { ...state, selectedContacts: [...state.selectedContacts.filter(contact => contact.value !== action.payload.value)] };
        case 'SetTeam':
            return { ...state, teamName: action.payload.displayName, teamUUID: action.payload.type };
        case 'UpdateInputValue':
            return { ...state, inputValue: action.payload };
    }
    return state;
};
