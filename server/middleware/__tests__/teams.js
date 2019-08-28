import { getTeams } from '../teams';

describe('Teams middleware', () => {

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
