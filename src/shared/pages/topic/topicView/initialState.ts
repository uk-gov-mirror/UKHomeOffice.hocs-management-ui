import { State } from './state';

export const initialState: State = {
    errorDescription: '',
    errorTitle: '',
    topic: [{
        label: '',
        value: ''
    }],
    topicValue: '',
    topicsLoaded: false
};
