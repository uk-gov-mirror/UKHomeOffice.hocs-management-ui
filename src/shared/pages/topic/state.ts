import Item from '../../models/item';

export interface State {
    displayName: string;
    selectedParentTopic?: Item;
}
