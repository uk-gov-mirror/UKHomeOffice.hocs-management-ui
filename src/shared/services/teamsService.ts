import axios from 'axios';
import Team from '../models/team';

export const getTeam = (teamId: string) => new Promise<Team>((resolve, reject) =>
    axios.get(`/api/teams/${teamId}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error))
);
