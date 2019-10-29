import Item from '../../../models/item';

export type SetDisplayName = {
    payload: string;
    type: 'SetDisplayName';
};

export type SetSelectedParentTopic = {
    payload: Item;
    type: 'SetSelectedParentTopic';
};

export type Action =
    SetDisplayName |
    SetSelectedParentTopic;
