import { FormError } from '../../../models/formError';
import Item from '../../../models/item';
export interface State {
    errors?: FormError[];
    errorDescription: string;
    errorTitle: string;
    inputValue: string;
    selectedUser?: Item | string;
    selectedUsers: Item[];
    teamName?: string;
    users: Item[];
}
