import { State } from './state';
import { Action } from './actions';

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SetTopics':
            return { ...state, topics: action.payload, topicsLoaded: true };
        case 'SetTopicValue':
            return { ...state, topicValue: action.payload };
        case 'SetGeneralError':
            return { ...state, errorDescription: action.payload.description, errorTitle: action.payload.title };
    }
    return state;
};
