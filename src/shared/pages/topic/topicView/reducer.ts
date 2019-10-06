import { State } from './state';
import { Action } from './actions';

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SetTopic':
            return { ...state, topic: action.payload, topicsLoaded: true };
        case 'SetGeneralError':
            return { ...state, errorDescription: action.payload.description, errorTitle: action.payload.title };
        case 'SetTeams':
            return { ...state, teams: action.payload, teamsLoaded: true };
        case 'SetTopicName':
            return { ...state, topicName: action.payload };
        case 'SetPrivateMinisterTeam':
            return { ...state, privateMinisterTeam: action.payload };
        case 'SetDraftQATeam':
            return { ...state, draftQATeam: action.payload };
    }
    return state;
};
