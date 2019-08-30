jest.mock('../../clients/index');
jest.mock('../../libs/logger');
jest.mock('../../models/user');
const { infoService } = require('../../clients/index');
const { addToTeam } = require('../user');
const getLogger = require('../../libs/logger');
const User = require('../../models/user');

describe('User middleware', () => {

    const userId = '__userId__';
    const teamId = '__teamId__';
    const displayName = '__displayName__';
    const headers = '__headers__';
    const req = { body: { displayName: displayName }, params: { userId: userId, teamId: teamId }, user: '__user__'} ;
    let res = {};
    const next = jest.fn();

    beforeEach(() => {
        next.mockReset();
        res = { locals: {} };
    });

    it('should call the post method on the info service', async () => {
        User.createHeaders.mockImplementation(() => headers)
        await addToTeam(req, res, next);
        expect(infoService.post).toHaveBeenCalledWith(`/users/${userId}/team/${teamId}`, {
            displayName: displayName,
            permissions: [{
                caseTypeCode: 'MIN',
                accessLevel: 'OWNER'
            },
            {
                caseTypeCode: 'TRO',
                accessLevel: 'READ'
            },
            {
                caseTypeCode: 'TRO',
                accessLevel: 'WRITE'
            }]
        }, { headers: headers });
    });

    it('should call the user create headers method', async () => {
        await addToTeam(req, res, next);
        expect(User.createHeaders).toHaveBeenCalled();
    });

    it('should call the next handler', async () => {
        await addToTeam(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    it('should get the logger instance', async () => {
        await addToTeam(req, res, next);
        expect(getLogger).toHaveBeenCalled();
    });

    it('should call the post method on the info service', async () => {
        infoService.post.mockImplementation(() => Promise.reject());
        const logError = jest.fn();
        getLogger.mockImplementation(() => ({ error: logError}) );
        await addToTeam(req, res, next);
        expect(logError).toHaveBeenCalled();
    });
});
