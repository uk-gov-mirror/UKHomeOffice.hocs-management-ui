import axios from 'axios';
import Item from '../models/item';

export class AddUserError extends Error {
    userToAdd: Item;
    constructor(message: string, userToAdd: Item) {
        super(message);
        this.userToAdd = userToAdd;
    }
}

export const getUser = (userId: string) => new Promise<Item>((resolve, reject) => axios
    .get(`/api/users/${userId}`)
    .then(response => resolve(response.data))
    .catch(reason => reject(reason))
);

export const getUsers = () => new Promise((resolve, reject) => axios
    .get('/api/users')
    .then((response) => {
        setTimeout(() => {
            return resolve(response.data);
        }, 2000);
    })
    .catch(reason => reject(reason))
);

export const addUserToTeam = (user: Item, teamId: string) => new Promise((resolve, reject) => axios
    .post(`/api/users/${user.value}/team/${teamId}`)
    .then(response => resolve(response.data))
    .catch(reason => reject(new AddUserError(reason.message, user)))
);

export const deleteUserFromTeam = (userId: string, teamId: string) => new Promise((resolve, reject) => axios
    .delete(`/api/users/${userId}/team/${teamId}`)
    .then(response => resolve(response.data))
    .catch(reason => reject(reason))
);
