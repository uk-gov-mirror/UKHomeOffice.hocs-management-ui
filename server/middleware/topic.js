const { infoService } = require('../clients/index');
const getLogger = require('../libs/logger');
const User = require('../models/user');

async function getParentTopics(req, res, next) {

    const logger = getLogger(req.request);

    try {
        const response = await infoService.get(`/topic/parents`, { headers: User.createHeaders(req.user) });
        res.locals.parentTopics = response.data;
        next();
    } catch (error) {
        logger.error(error);
        next(error);
    }
}

module.exports = {
    getParentTopics
}
