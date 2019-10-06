import Topic from '../../../models/topic';
import Item from "../../../models/item";

export interface State {
    errorDescription: string;
    errorTitle: string;
    topic: Topic[];
    topicName: string;
    topicsLoaded: boolean;
    teamsLoaded: boolean;
    teams: Item[];
    privateMinisterTeam: string,
    draftQATeam: string
}
