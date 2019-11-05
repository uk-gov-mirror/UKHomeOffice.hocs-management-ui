jest.mock('../../clients/index');
jest.mock('../../libs/logger');
jest.mock('../../models/user');
const { infoService } = require('../../clients/index');
const { addNominatedContact } = require('../nominatedContact');
const getLogger = require('../../libs/logger');
const User = require('../../models/user');

describe('NominatedContact middleware addNominatedContact', () => {
    const headers = '__headers__';
    const nominatedContact = { emailAddress: '__emailAddress__', teamUUID: '__teamUUID__' };
    const nominatedContactEmail = { email_address: '__emailAddress__' };
    let req = {};
    const sendStatus = jest.fn();
    let res = {};
    const next = jest.fn();

    beforeEach(() => {
        next.mockReset();
        req = { body: nominatedContact, user: '__user__' };
        res = { sendStatus };
        sendStatus.mockReset();
    });

    it('should call the post method on the info service', async () => {
        User.createHeaders.mockImplementation(() => headers);

        await addNominatedContact(req, res, next);
        expect(infoService.post).toHaveBeenCalledWith(`/team/${req.body.teamUUID}/contact`, nominatedContactEmail, { headers: headers });
    });

    it('should call the user create headers method', async () => {
        await addNominatedContact(req, res, next);

        expect(User.createHeaders).toHaveBeenCalled();
    });

    it('should call the sendstatus method with a success code', async () => {
        await addNominatedContact(req, res, next);

        expect(sendStatus).toHaveBeenCalledWith(200);
    });

    it('should get the logger instance', async () => {
        await addNominatedContact(req, res, next);

        expect(getLogger).toHaveBeenCalled();
    });

    it('should log when the request fails', async () => {
        infoService.post.mockImplementation(() => Promise.reject('__error__'));
        const logError = jest.fn();

        getLogger.mockImplementation(() => ({ error: logError }));
        await addNominatedContact(req, res, next);

        expect(logError).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith('__error__');
    });
});
