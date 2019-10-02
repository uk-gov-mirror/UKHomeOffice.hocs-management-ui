import axios from 'axios';
import Topic from '../models/topic';

export const getTopics = () => new Promise<Topic[]>((resolve, reject) =>
    axios.get('/api/topics')
        .then(response => resolve(response.data))
        .catch(error => reject(error))
);
