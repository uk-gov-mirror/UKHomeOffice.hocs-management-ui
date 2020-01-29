jest.mock('../../clients/index');
jest.mock('../../libs/logger');
jest.mock('../../models/user');
const { infoService } = require('../../clients/index');
const { addToTeam, getAllUsers, getUser, removeFromTeam, returnUsersJson, returnUserJson } = require('../user');
const getLogger = require('../../libs/logger');
const User = require('../../models/user');

describe('User middleware addToTeam', () => {

    const userId = '__userId__';
    const teamId = '__teamId__';
    const headers = '__headers__';
    const req = { params: { userId: userId, teamId: teamId }, user: '__user__'} ;
    let res = {};
    const next = jest.fn();

    beforeEach(() => {
        next.mockReset();
        res = { locals: {} };
    });

    it('should call the post method on the info service', async () => {
        User.createHeaders.mockImplementation(() => headers)
        await addToTeam(req, res, next);
        expect(infoService.post).toHaveBeenCalledWith(`/users/${userId}/team/${teamId}`, {}, { headers: headers });
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

    it('should log when the request fails', async () => {
        infoService.post.mockImplementation(() => Promise.reject('__error__'));
        const logError = jest.fn();
        getLogger.mockImplementation(() => ({ error: logError}) );
        await addToTeam(req, res, next);
        expect(logError).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith('__error__');
    });
});

describe('User middleware remove from team', () => {

    const userId = '__userId__';
    const teamId = '__teamId__';
    const headers = '__headers__';
    const req = { params: { userId: userId, teamId: teamId }, user: '__user__'} ;
    let res = {};
    const next = jest.fn();

    beforeEach(() => {
        next.mockReset();
        res = { locals: {} };
    });

    it('should call the delete method on the info service', async () => {
        User.createHeaders.mockImplementation(() => headers)
        await removeFromTeam(req, res, next);
        expect(infoService.delete).toHaveBeenCalledWith(`/users/${userId}/team/${teamId}`, { headers: headers });
    });

    it('should call the user create headers method', async () => {
        await removeFromTeam(req, res, next);
        expect(User.createHeaders).toHaveBeenCalled();
    });

    it('should call the next handler', async () => {
        await removeFromTeam(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    it('should get the logger instance', async () => {
        await removeFromTeam(req, res, next);
        expect(getLogger).toHaveBeenCalled();
    });

    it('should log when the request fails', async () => {
        infoService.delete.mockImplementation(() => Promise.reject('__error__'));
        const logError = jest.fn();
        getLogger.mockImplementation(() => ({ error: logError}) );
        await removeFromTeam(req, res, next);
        expect(logError).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith('__error__');
    });
});

describe('getAllUsers', () => {

    let req = {};
    let res = {};
    const next = jest.fn();
    const users = ['user1', 'user2', 'user3'];
    const fetch = jest.fn(() => users);

    beforeEach(() => {
        next.mockReset();
        req = { listService: { fetch: fetch } };
        res = { locals: {} };
    });

    it('should put the users object in response locals', async () => {
        await getAllUsers(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(res.locals.users).toBeDefined();
        expect(res.locals.users).toEqual(users);
    });
});

describe('getUser', () => {

    let req = { params: 'userId' };
    let res = {};
    const next = jest.fn();
    const user = {
        label: 'user',
        value: 'user'
    };
    const fetch = jest.fn(() => user);

    beforeEach(() => {
        next.mockReset();
        req = { listService: { fetch: fetch } };
        res = { locals: {} };
    });

    it('should put the users object in response locals', async () => {
        await getUser(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(res.locals.user).toBeDefined();
        expect(res.locals.user).toEqual(user);
    });
});

describe('returnUsersJson', () => {
    const req = {};
    let res = {};
    const next = jest.fn();
    const json = jest.fn();
    const users = ['user1', 'user2', 'user3'];

    beforeEach(() => {
        next.mockReset();
        res = { json, locals: { users } };
    });

    it('should return the users as json', async () => {
        await returnUsersJson(req, res, next);
        expect(json).toHaveBeenCalledWith(users);
    });

    it('should be the last handler', async () => {
        await returnUsersJson(req, res, next);
        expect(next).not.toHaveBeenCalled();
    });
});

describe('returnUserJson', () => {
    const req = {};
    let res = {};
    const next = jest.fn();
    const json = jest.fn();
    const user = {
        label: 'user',
        value: 'user'
    };

    beforeEach(() => {
        next.mockReset();
        res = { json, locals: { user } };
    });

    it('should return the user as json', async () => {
        await returnUserJson(req, res, next);
        expect(json).toHaveBeenCalledWith(user);
    });

    it('should be the last handler', async () => {
        await returnUserJson(req, res, next);
        expect(next).not.toHaveBeenCalled();
    });
});
