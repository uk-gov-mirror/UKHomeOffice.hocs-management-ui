import { State } from './state';
import { Action } from './actions';

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SetPrivateMinisterTeam':
            return { ...state, privateMinisterTeam: action.payload };
        case 'SetDraftQATeam':
            return { ...state, draftQaTeam: action.payload };
        case 'SetTopicName':
            return { ...state, topicName: action.payload };
    }
    return state;
};
