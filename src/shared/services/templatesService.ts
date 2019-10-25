import axios from 'axios';

export const addTemplate = (template: FormData) => new Promise((resolve, reject) => axios
    .post('/api/templates', template)
    .then(() => resolve())
    .catch(reason => reject(reason))
);
