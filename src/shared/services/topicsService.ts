import axios from 'axios';

export const getParentTopics = () => new Promise((resolve, reject) => axios
    .get('/api/topics/parents')
    .then(response => resolve(response.data))
    .catch(reason => reject(reason))
);
