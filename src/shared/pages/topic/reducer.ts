import { Action } from './actions';
import { State } from './state';

export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'SetTopicValues':
            return { ...state, unit: { ...state.topic, [action.payload.name]: action.payload.value } };
        case 'SetParentTopics':
            return { ...state, parentTopics: action.payload };
        default:
            return state;
    }
};
