import Item from '../../models/item';

export interface State {
    parentTopics: Item[];
    topic: Item;
}
