import { getTeams, getTeamMembers } from '../team';

describe('getTeams', () => {

    let req = {};
    let res = {};
    const next = jest.fn();
    const teams = ['team1', 'team2', 'team3'];
    const fetch = jest.fn(() => teams);

    beforeEach(() => {
        next.mockReset();
        req = { listService: { fetch: fetch } };
        res = { locals: {} };
    });

    it('should put the teams object in response locals', async () => {
        await getTeams(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(res.locals.teams).toBeDefined();
        expect(res.locals.teams).toEqual(teams);
    });
});

describe('getTeamMembers', () => {

    let req = {};
    let res = {};
    const next = jest.fn();
    const teamMembers = ['teamMember1', 'teamMember2', 'teamMember3'];
    const fetch = jest.fn(() => teamMembers);

    beforeEach(() => {
        next.mockReset();
        req = { listService: { fetch: fetch } };
        res = { locals: {} };
    });

    it('should put the teams object in response locals', async () => {
        await getTeamMembers(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(res.locals.teamMembers).toBeDefined();
        expect(res.locals.teamMembers).toEqual(teamMembers);
    });
});
