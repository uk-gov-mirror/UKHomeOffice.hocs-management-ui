import apiClient from './apiClient';
import Team from '../models/team';

const teamsApi = apiClient.createClient();

export const getTeam = (teamId: string) => new Promise<Team>((resolve, reject) =>
    teamsApi.get(`/api/teams/${teamId}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error))
);
