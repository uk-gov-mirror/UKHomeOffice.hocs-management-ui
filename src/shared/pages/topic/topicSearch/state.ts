import Topic from '../../../models/topic';

export interface State {
    errorDescription: string;
    errorTitle: string;
    topics: Topic[];
    topicValue: string;
    topicsLoaded: boolean;
}
