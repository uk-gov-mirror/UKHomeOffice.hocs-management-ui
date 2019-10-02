import Item from '../../models/item';

export interface State {
    displayName: string;
    parentTopics: Item[];
    selectedParentTopic?: Item;
}
