import axios from 'axios';
import Topic from '../models/topic';
import Item from '../models/item';


export const getTopics = () => new Promise<Topic[]>((resolve, reject) =>
    axios.get('/api/topics')
        .then(response => {
            resolve(response.data)
        })
        .catch(error => reject(error))
);

export const getTopic = (topicId: string) => new Promise<Topic>((resolve, reject) =>
    axios.get(`/api/topic/${topicId}`)
        .then(response => {
            resolve(response.data)
        })
        .catch(error => reject(error))
);

export const addChildTopic = (parentTopicId: string, displayName: string) => new Promise((resolve, reject) => axios
    .post(`/api/topics/parents/${parentTopicId}`, { displayName })
    .then(() => resolve())
    .catch(reason => reject(reason))
);

export const getParentTopics = () => new Promise((resolve, reject) => axios
    .get<Item[]>('/api/topics/parents')
    .then(response => resolve(response.data.sort((a, b) => {
        const labelA = a.label.toLocaleLowerCase();
        const labelB = b.label.toLocaleLowerCase();
        let comparison = 0;
        if (labelA > labelB) {
            comparison = 1;
        } else if (labelA < labelB) {
            comparison = -1;
        }
        return comparison;
    })))
    .catch(reason => reject(reason))
);

export const addTeamsToUnit = (topicValue: string, privateMinisterTeam: string, draftQaTeam: string) => new Promise((resolve, reject) => axios
    .post('/api/topics/dcu', {topicValue, privateMinisterTeam, draftQaTeam})
    .then(() => resolve())
    .catch(reason => reject(reason))
);
