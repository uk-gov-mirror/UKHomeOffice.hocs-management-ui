import axios from 'axios';

export const addStandardLine = (standardLine: FormData) => new Promise((resolve, reject) => axios
    .post('/api/standard-lines', standardLine)
    .then(() => resolve())
    .catch(reason => reject(reason))
);
