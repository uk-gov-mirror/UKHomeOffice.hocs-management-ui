import Item from '../../../models/item';

// state
export const initialState: State = {
    user: undefined,
    selectedTeam: undefined,
    selectedTeams: []
};
export interface State {
    user?: Item;
    selectedTeam?: Item | '';
    selectedTeams: Item[];
}

// actions
type AddToSelectedTeams = {
    payload: Item;
    type: 'AddToSelectedTeams';
};
type SetUser = {
    payload?: Item;
    type: 'SetUser';
};
type ClearSelectedTeam = {
    type: 'ClearSelectedTeam';
};
type RemoveFromSelectedTeams = {
    payload: Item;
    type: 'RemoveFromSelectedTeams';
};

export type Action =
    AddToSelectedTeams |
    SetUser |
    ClearSelectedTeam |
    RemoveFromSelectedTeams;

// reducer
export const reducer = (state: State, action: Action) => {
    switch (action.type){
        case 'AddToSelectedTeams':
            return { ...state, selectedTeams: [...state.selectedTeams, action.payload] };
        case 'SetUser':
            return { ...state, user: action.payload  };
        case 'ClearSelectedTeam':
            return { ...state, selectedTeam: '' };
        case 'RemoveFromSelectedTeams':
            return { ...state, selectedTeams: [...state.selectedTeams.filter(team => team.value !== action.payload.value)] };
    }
    return state;
};
