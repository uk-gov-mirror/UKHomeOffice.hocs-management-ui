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

module.exports = {
    addToTeam,
    removeFromTeam
}