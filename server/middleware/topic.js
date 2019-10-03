const { infoService } = require('../clients/index');
const getLogger = require('../libs/logger');
const User = require('../models/user');

async function addTopic(req, res, next) {

    const logger = getLogger(req.request);
    const { parentTopicId } = req.params;
    try {
        await infoService.post(`/topic/parent/${parentTopicId}`, req.body, { headers: User.createHeaders(req.user) });
        res.sendStatus(200);
    } catch (error) {
        logger.error(error);
        next(error);
    }
}

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
    addTopic,
    getParentTopics,
    returnParentTopicsJson
}
