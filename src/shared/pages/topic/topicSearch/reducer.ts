import { State } from './state';
import { Action } from './actions';

export const reducer = (state: State, action: Action): State => {
    if (action.type === 'SetSelectedTopic') {
        return { ...state, selectedTopic: action.payload };
    }
    return state;
};
