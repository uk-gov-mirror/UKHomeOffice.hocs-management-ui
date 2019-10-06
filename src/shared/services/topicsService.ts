import axios from 'axios';
import Topic from '../models/topic';

export const getTopics = () => new Promise<Topic[]>((resolve, reject) =>
    axios.get('/api/topics')
        .then(response => {
            resolve(response.data)
        })
        .catch(error => reject(error))
);

export const getTopic = (topicId: string) => new Promise<Topic[]>((resolve, reject) =>
    axios.get(`/api/topics/${topicId}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error))
);


export const addChildTopic = (parentTopicId: string, displayName: string) => new Promise((resolve, reject) => axios
    .post(`/api/topics/parents/${parentTopicId}`, { displayName })
    .then(() => resolve())
    .catch(reason => reject(reason))
);

export const getParentTopics = () => new Promise((resolve, reject) => axios
    .get('/api/topics/parents')
    .then(response => resolve(response.data))
    .catch(reason => reject(reason))
);
