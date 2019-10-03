import axios from 'axios';

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
