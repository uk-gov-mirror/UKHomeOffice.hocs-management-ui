import { InputEventData } from '../../common/components/forms/text';
import Item from '../../models/item';

export type SetTopicValues = {
    payload: InputEventData;
    type: 'SetTopicValues';
};

export type SetParentTopics = {
    payload: Item[];
    type: 'SetParentTopics';
};

export type Action =
    SetTopicValues |
    SetParentTopics;
