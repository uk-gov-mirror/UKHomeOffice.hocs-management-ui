const { infoService } = require('../clients/index');
const getLogger = require('../libs/logger');
const User = require('../models/user');

async function getCaseTypes(req, res, next) {

    const logger = getLogger(req.request);

    try {
        const response = await infoService.get(`/caseType`, { headers: User.createHeaders(req.user) });
        res.locals.caseTypes = response.data;
        next();
    } catch (error) {
        logger.error(error);
        next(error);
    }
}

async function returnCaseTypesJson(_, res) {
    const { locals: { caseTypes } } = res;
    await res.json(caseTypes);
}

module.exports = {
    getCaseTypes,
    returnCaseTypesJson,
};
