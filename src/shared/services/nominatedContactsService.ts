import axios from 'axios';
import NominatedContact from '../models/nominatedContact';
import Contact from '../models/contact';

export const addNominatedContact = (nominatedContact: NominatedContact) => new Promise((resolve, reject) => axios
    .post('/api/nominated-contact', nominatedContact)
    .then(response => resolve(response.data))
    .catch(reason => reject(reason))
);

export const getNominatedContactsForTeam = (teamUUID: string) => new Promise<Array<Contact>>((resolve, reject) => axios
    .get(`/api/nominated-contact/${teamUUID}/`)
    .then(response => resolve(response.data))
    .catch(reason => reject(reason))
);

export const removeNominatedContactFromTeam = (teamUUID: string, nominatedContactUUID: string, ) => new Promise((resolve, reject) => axios
    .delete(`/api/nominated-contact/${teamUUID}/${nominatedContactUUID}`)
    .then(response => resolve(response.data))
    .catch(reason => reject(reason))
);
