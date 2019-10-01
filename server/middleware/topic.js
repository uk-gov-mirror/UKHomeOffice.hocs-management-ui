const { infoService } = require('../clients/index');
const getLogger = require('../libs/logger');
const User = require('../models/user');

async function getTopic(req, res, next) {

    const logger = getLogger(req.request);
    const { topicId } = req.params;

    try {
        const response = await infoService.get(`/topic/${topicId}`, {}, { headers: User.createHeaders(req.user) });
        res.locals.topic = response.data;
        next();
    } catch (error) {
        logger.error(error);
        next(error);
    }
}

async function getTopics(req, res, next) {
    try {
        const response = await req.listService.fetch('TEAMS', req.params);
        res.locals.topics = response;
        next();
    } catch (error) {
        next(error);
    }
}

async function returnTopicJson(_, res) {
    const { locals: { topic } } = res;
    await res.json(topic);
}
async function returnTopicsJson(_, res) {
    const { locals: { topics } } = res;
    await res.json(topics);
}

module.exports = {
    getTopic,
    getTopics,
    returnTopicJson,
    returnTopicsJson,
}
