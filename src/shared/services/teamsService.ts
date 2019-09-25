import axios from 'axios';
import Team from '../models/team';
import Item from '../models/item';

export const getTeam = (teamId: string) => new Promise<Team>((resolve, reject) =>
    axios.get(`/api/teams/${teamId}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error))
);

export const getTeams = () => new Promise<[Item]>((resolve, reject) =>
    axios.get('/api/teams')
        .then(response => resolve(response.data))
        .catch(error => reject(error))
);
