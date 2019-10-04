import axios from 'axios';
import Topic from '../models/topic';

export const getTopics = () => new Promise<Topic[]>((resolve, reject) =>
    axios.get('/api/topics')
        .then(response => resolve(response.data))
        .catch(error => reject(error))
);

export const getTopic = (topicId: string) => new Promise<Topic[]>((resolve, reject) =>
    axios.get(`/api/topics/${topicId}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error))
);
