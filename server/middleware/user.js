const { infoService } = require('../clients/index');
const getLogger = require('../libs/logger');
const User = require('../models/user');

async function addToTeam(req, res, next) {
    
    const logger = getLogger(req.request);
    const { userId, teamId } = req.params;
    const { displayName } = req.body;

    try {
        await infoService.post(`/users/${userId}/team/${teamId}`, {
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
        }, { headers: User.createHeaders(req.user) });
    } catch (error) {
        logger.error(error);
    } finally {
        next();
    }
}

module.exports = {
    addToTeam
}