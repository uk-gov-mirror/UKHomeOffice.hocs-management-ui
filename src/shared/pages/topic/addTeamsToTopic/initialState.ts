import { State } from './state';

export const initialState: State = {
    topic: {
        label: '',
        value: ''
    },
    privateMinisterTeam:   {
        displayName: '',
        permissions: [],
        letterName: '',
        type: '',
        active: true
    },
    draftQaTeam: {
        displayName: '',
        permissions: [],
        letterName: '',
        type: '',
        active: true
    }
};
