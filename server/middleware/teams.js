const { infoService } = require('../clients');
const getLogger = require('../libs/logger');
const User = require('../models/user');

async function getTeams(req, res, next) {
    try {
        const response = await req.listService.fetch('TEAMS', req.params);
        res.locals.teams = response;
        next();
    } catch (error) {
        next(error);
    }
}

async function addUserToTeam(req, res, next) {
    const logger = getLogger(req.request);
    const { userId, teamId } = req.params;
    try {
        await infoService.post(`/user/${userId}/team/${teamId}/user`, {
            todo: 'thePermissions',
        }, { headers: User.createHeaders(req.user) });
    } catch (error) {
        logger.error(error);
    } finally {
        next();
    }
}

module.exports = {
    addUserToTeam,
    getTeams
}