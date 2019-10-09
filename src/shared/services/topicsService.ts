import axios from 'axios';
import Item from '../models/item';

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
