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

async function returnParentTopicsJson(_, res) {
    const { locals: { parentTopics } } = res;
    await res.json(parentTopics);
}

module.exports = {
    getParentTopics,
    returnParentTopicsJson
}
