import axios from 'axios';

export const addTemplate = (template: FormData) => new Promise((resolve, reject) => axios
    .post('/api/templates', template)
    .then(() => resolve())
    .catch(reason => reject(reason))
);

export const deleteTemplate = (uuid: string) => new Promise((resolve, reject) => axios
    .delete(`/api/templates/${uuid}`)
    .then(() => resolve())
    .catch(reason => reject(reason))
);
