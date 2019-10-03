import Item from '../../../models/item';

export interface State {
    teams: Item[];
    teamsLoaded: boolean;
    teamUUID: string;
}
