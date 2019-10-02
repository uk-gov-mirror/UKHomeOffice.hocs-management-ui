import ErrorMessage from '../../../models/errorMessage';
import Topic from '../../../models/topic';

export type SetTopics = {
    type: 'SetTopics';
    payload: Topic[];
};

export type SetTopicValue = {
    type: 'SetTopicValue';
    payload: string;
};

export type SetGeneralError = {
    type: 'SetGeneralError';
    payload: ErrorMessage;
};

export type Action =
    SetTopics |
    SetTopicValue |
    SetGeneralError;
