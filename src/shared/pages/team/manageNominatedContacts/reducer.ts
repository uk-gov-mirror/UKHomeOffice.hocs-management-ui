import { State } from './state';
import { Action } from './actions';

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'AddContact':
            return { ...state, contacts: [...[], ...state.contacts, action.payload] };
        case 'SetContacts':
            return { ...state, contacts: action.payload };
        case 'RemoveContact':
            return { ...state, contacts: [...state.contacts.filter(contact => contact.value !== action.payload.value)] };
    }
    return state;
};
