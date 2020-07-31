import Item from '../../../models/item';
export interface State {
    inputValue: string;
    selectedContacts: Item[];
    teamName?: string;
    teamUUID: string;
}
