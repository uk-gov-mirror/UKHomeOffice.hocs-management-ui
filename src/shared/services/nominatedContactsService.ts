import axios from 'axios';
import NominatedContact from "../models/nominatedContact";

export const addNominatedContact = (nominatedContact: NominatedContact) => new Promise((resolve, reject) => axios
    .post('/api/nominated-contact', nominatedContact)
    .then(() => resolve())
    .catch(reason => reject(reason))
);
