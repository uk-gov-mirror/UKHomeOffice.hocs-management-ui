import { FormError } from '../../../models/formError';
import Item from '../../../models/item';
export type Action = {
    payload: FormError;
    type: 'AddError';
} | {
    type: 'BeginSubmit';
} | {
    payload: Item;
    type: 'AddToSelection';
} | {
    payload: Item;
    type: 'RemoveFromSelection';
} | {
    payload: Item[];
    type: 'PopulateUsers';
} | {
    payload: Item | undefined;
    type: 'ClearSelectedUser';
} | {
    type: 'SetEmptySumbitError';
} | {
    type: 'SetTeamName';
    payload: string;
};
