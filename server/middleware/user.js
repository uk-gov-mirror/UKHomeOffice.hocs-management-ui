const { infoService } = require('../clients/index');
const getLogger = require('../libs/logger');
const User = require('../models/user');

async function addToTeam(req, _, next) {

    const logger = getLogger(req.request);
    const { userId, teamId } = req.params;

    try {
        await infoService.post(`/users/${userId}/team/${teamId}`, {}, { headers: User.createHeaders(req.user) });
        next();
    } catch (error) {
        logger.error(error);
        next(error);
    }
}

async function getAllUsers(req, res, next) {
    try {
        const response = await req.listService.fetch('USERS', req.params);
        res.locals.users = response;
        next();
    } catch (error) {
        next(error);
    }
}

async function getUser(req, res, next) {
    try {
        const response = await req.listService.fetch('USER', req.params);
        res.locals.user = response;
        next();
    } catch (error) {
        next(error);
    }
}

async function removeFromTeam(req, _, next) {
    const logger = getLogger(req.request);
    try {
        const { userId, teamId } = req.params;

        await infoService.delete(`/users/${userId}/team/${teamId}`, { headers: User.createHeaders(req.user) });
        next();
    } catch (error) {
        logger.error(error);
        next(error);
    }
}

async function returnUsersJson(_, res) {
    const { locals: { users } } = res;
    await res.json(users);
}

async function returnUserJson(_, res) {
    const { locals: { user } } = res;
    await res.json(user);
}

module.exports = {
    addToTeam,
    getAllUsers,
    getUser,
    removeFromTeam,
    returnUsersJson,
    returnUserJson
};
