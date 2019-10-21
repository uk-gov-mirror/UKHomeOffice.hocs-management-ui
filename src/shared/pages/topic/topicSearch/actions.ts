import ErrorMessage from '../../../models/errorMessage';
import Item from "../../../models/item";

export type SetTopics = {
    type: 'SetTopics';
    payload: Item[];
};

export type SetSelectedTopic = {
    type: 'SetSelectedTopic';
    payload: Item;
};

export type SetGeneralError = {
    type: 'SetGeneralError';
    payload: ErrorMessage;
};

export type Action =
    SetTopics |
    SetSelectedTopic |
    SetGeneralError;
