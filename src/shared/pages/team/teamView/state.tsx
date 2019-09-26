import Item from '../../../models/item';

export interface State {
    errorDescription: string;
    errorTitle: string;
    teamMembers: Item[];
    teamMembersLoaded: boolean;
    teamName?: string;
}
