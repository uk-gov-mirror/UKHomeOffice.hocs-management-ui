import apiClient from './apiClient';
import Item from '../models/item';

const usersApi = apiClient.createClient();

export class AddUserError extends Error {
    userToAdd: Item;
    constructor(message: string, userToAdd: Item) {
        super(message);
        this.userToAdd = userToAdd;
    }
}

export const getUsers = () => {
    return new Promise((resolve, reject) => usersApi
        .get('/api/users')
        .then(value => resolve(value))
        .catch(reason => reject(reason))
    );
};

export const getTeamMembers = (teamId: string) => usersApi.get(`/api/teams/${teamId}/members`);

export const addUserToTeam = (user: Item, teamId: string) => {
    return new Promise((resolve, reject) => usersApi
        .post(`/api/users/${user.value}/team/${teamId}`)
        .then(value => resolve(value.data))
        .catch(reason => reject(new AddUserError(reason, user))));
};

export const deleteUserFromTeam = (userId: string, teamId: string) => usersApi.delete(`/api/users/${userId}/team/${teamId}`);
