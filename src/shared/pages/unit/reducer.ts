import { Action } from './actions';
import { State } from './state';
import { VALIDATION_ERROR_MESSAGE } from '../../models/constants';

export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'AddValidationError':
            return {
                ...state,
                errorDescription: '',
                errorTitle: VALIDATION_ERROR_MESSAGE,
                errors: [...state.errors || [], action.payload]
            };
        case 'BeginSubmit':
            return { ...state, errors: undefined };
        case 'SetGeneralError':
            return { ...state, errorDescription: action.payload.description, errorTitle: action.payload.title, errors: [] };
        case 'SetUnitValues':
            const newState = { ...state, unit: { ...state.unit, [action.payload.name]: action.payload.value } };
            return newState;
        default:
            return state;
    }
};
