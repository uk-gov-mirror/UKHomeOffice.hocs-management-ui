import axios from 'axios';
import Unit from '../models/unit';

export const createUnit = (unit: Unit) => new Promise((resolve, reject) => axios
    .post('/api/units', unit)
    .then(() => resolve())
    .catch(reason => reject(reason))
);
