import axios from 'axios';
import StandardLine from '../models/standardLine';

export const addStandardLine = (standardLine: StandardLine) => new Promise((resolve, reject) => axios
    .post('/api/standard-lines', standardLine)
    .then(() => resolve())
    .catch(reason => reject(reason))
);
