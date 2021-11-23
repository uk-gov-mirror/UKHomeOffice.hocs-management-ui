import { State } from './state';
import { Action } from './actions';



export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SetTeamName':
            return { ...state,
                team: {
                    displayName: action.payload,
                    permissions: state.team.permissions,
                    letterName: action.payload,
                    type: state.team.type,
                    active: state.team.active,
                    unitUUID: state.team.unitUUID
                }
            };
        case 'SetUnit':
            return { ...state,
                team: {
                    displayName: state.team.displayName,
                    permissions: state.team.permissions,
                    letterName: state.team.letterName,
                    type: state.team.type,
                    active: state.team.active,
                    unitUUID: action.payload
                }
            };
        case 'SetCaseType':
            return { ...state,
                team: {
                    displayName: state.team.displayName,
                    permissions: [
                        {
                            accessLevel: state.team.permissions[0].accessLevel,
                            caseTypeCode: action.payload
                        }
                    ],
                    letterName: state.team.letterName,
                    type: state.team.type,
                    active: state.team.active,
                    unitUUID: state.team.unitUUID
                }
            };
    }
    return state;
};
