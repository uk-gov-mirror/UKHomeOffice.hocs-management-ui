import { Action } from './actions';
import { State } from './state';

export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'SetDisplayName':
            return { ...state, displayName: action.payload };
        case 'SetSelectedParentTopic':
            return { ...state, selectedParentTopic: action.payload };
        default:
            return state;
    }
};
