import { State } from './state';
import { Action } from './actions';

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SetTopic':
            return { ...state, topic: action.payload };
        case 'SetPrivateMinisterTeam':
            return { ...state, privateMinisterTeam: action.payload };
        case 'SetDraftQATeam':
            return { ...state, draftQATeam: action.payload };
    }
    return state;
};
