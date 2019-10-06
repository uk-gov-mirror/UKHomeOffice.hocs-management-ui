const { infoService } = require('../clients/index');
const getLogger = require('../libs/logger');
const User = require('../models/user');

async function getTopic(req, res, next) {

    const logger = getLogger(req.request);
    const {topicId} = req.params;

    try {
        const response = await infoService.get(`/topic/${topicId}`, {}, {headers: User.createHeaders(req.user)});
        res.locals.topic = response.data;
        next();
    } catch (error) {
        logger.error(error);
        next(error);
    }
}

async function getTopics(req, res, next) {
    const logger = getLogger(req.request);

    try {
        const response = await req.listService.fetch('TOPICS', req.params);
        res.locals.topics = response.data;
        next();
    } catch (error) {
        logger.error(error);
        next(error);
    }
}

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

async function returnTopicJson(_, res) {
    const { locals: { topic } } = res;
    await res.json(topic);
}

async function returnTopicsJson(_, res) {
    const { locals: { topics } } = res;
    await res.json(topics);
}

async function returnParentTopicsJson(_, res) {
    const { locals: { parentTopics } } = res;
    await res.json(parentTopics);
}

module.exports = {
    getTopic,
    getTopics,
    returnTopicJson,
    returnTopicsJson,
    addTopic,
    getParentTopics,
    returnParentTopicsJson
};

