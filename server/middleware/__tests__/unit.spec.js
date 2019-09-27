jest.mock('../../clients/index');
jest.mock('../../libs/logger');
jest.mock('../../models/user');
const { infoService } = require('../../clients/index');
const { addUnit } = require('../unit');
const getLogger = require('../../libs/logger');
const User = require('../../models/user');

describe('User middleware addToTeam', () => {

    const headers = '__headers__';
    const unitToCreate = { displayName: '__displayName__', shortCode: '__shortCode__' }
    const req = { body: unitToCreate, user: '__user__' };
    const sendStatus = jest.fn();
    const res = { sendStatus };
    const next = jest.fn();

    beforeEach(() => {
        next.mockReset();
        sendStatus.mockReset();
    });

    it('should call the post method on the info service', async () => {
        User.createHeaders.mockImplementation(() => headers)
        await addUnit(req, res, next);
        expect(infoService.post).toHaveBeenCalledWith('/unit', unitToCreate, { headers: headers });
    });

    it('should call the user create headers method', async () => {
        await addUnit(req, res, next);
        expect(User.createHeaders).toHaveBeenCalled();
    });

    it('should call the sendstatus method with a success code', async () => {
        await addUnit(req, res, next);
        expect(sendStatus).toHaveBeenCalledWith(200);
    });

    it('should get the logger instance', async () => {
        await addUnit(req, res, next);
        expect(getLogger).toHaveBeenCalled();
    });

    it('should log when the request fails', async () => {
        infoService.post.mockImplementation(() => Promise.reject('__error__'));
        const logError = jest.fn();
        getLogger.mockImplementation(() => ({ error: logError }));
        await addUnit(req, res, next);
        expect(logError).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith('__error__');
    });
});
