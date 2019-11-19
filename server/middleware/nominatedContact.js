const { infoService } = require('../clients/index');
const getLogger = require('../libs/logger');
const User = require('../models/user');

async function addNominatedContact(req, res, next) {
    const logger = getLogger(req.request);

    const data = {
        'email_address': req.body.emailAddress
    };

    try {
        await infoService.post(`/team/${req.body.teamUUID}/contact`, data, { headers: User.createHeaders(req.user) });
        res.sendStatus(200);
    } catch (error) {
        logger.error(error);
        next(error);
    }
}

module.exports = {
    addNominatedContact
};
