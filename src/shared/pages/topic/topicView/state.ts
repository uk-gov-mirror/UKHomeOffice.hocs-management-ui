import Topic from '../../../models/topic';

export interface State {
    errorDescription: string;
    errorTitle: string;
    topic: Topic[];
    topicValue: string;
    topicsLoaded: boolean;
}
