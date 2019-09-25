import Item from '../../../models/item';

export interface State {
    errorDescription: string,
    errorTitle: string,
    teams: Item[];
    teamsLoaded: boolean;
    teamUUID: string;
}
