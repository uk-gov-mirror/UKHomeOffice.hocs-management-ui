import Item from '../../../models/item';
export interface State {
    inputValue: string;
    selectedUser?: Item | string;
    selectedUsers: Item[];
    teamName?: string;
    users: Item[];
}
