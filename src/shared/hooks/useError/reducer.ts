import { Action } from './actions';
import PageError from '../../models/pageError';

export const reducer = (state: PageError, action: Action): PageError => {
    switch (action.type) {
        case 'AddFormError':
            return {
                error: { ...state.error, formErrors: [...state.error ? state.error.formErrors || [] : [], action.payload] }
            };
        case 'ClearError':
            return { error: undefined };
        case 'SetDescription':
            return { error: { ...state.error, description: action.payload } };
        case 'SetTitle':
            return { error: { ...state.error, title: action.payload } };
    }
    return state;
};
