import ErrorMessage from '../../../models/errorMessage';
import Topic from '../../../models/topic';

export type SetTopic = {
    type: 'SetTopic';
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
    SetTopic |
    SetTopicValue |
    SetGeneralError;
