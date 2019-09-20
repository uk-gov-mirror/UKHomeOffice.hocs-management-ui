import axios from 'axios';
import Unit from '../models/unit';

export const createUnit = (unit: Unit) => new Promise((resolve, reject) => axios
    .post('/api/units', unit)
    .then(response => resolve(response.data))
    .catch(reason => reject(reason))
);
