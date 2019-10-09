import { State } from './state';
import { Action } from './actions';

export const reducer = (state: State, action: Action): State => {
    if (action.type === 'SetTopicValue') {
        return { ...state, topicValue: action.payload };
    }
    return state;
};
