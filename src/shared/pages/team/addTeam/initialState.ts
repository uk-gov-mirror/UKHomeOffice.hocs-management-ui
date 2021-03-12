import { State } from './state';

export const initialState: State = {
    team: {
        displayName: '',
        permissions: [
            {
                accessLevel: 'OWNER',
                caseTypeCode: ''
            }
        ],
        letterName: '',
        type: '',
        active: true,
        unitUUID: ''
    }
};
