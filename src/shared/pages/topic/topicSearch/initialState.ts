import { State } from './state';

export const initialState: State = {
    errorDescription: '',
    errorTitle: '',
    topics: [{
        label: '',
        value: ''
    }],
    topicValue: '',
    topicsLoaded: false
};
