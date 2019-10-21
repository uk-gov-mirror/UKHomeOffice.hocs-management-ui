const { infoService } = require('../clients/index');
const getLogger = require('../libs/logger');
const User = require('../models/user');


async function addTemplate(req, res, next) {

    const logger = getLogger(req.request);

    //req.body should include strings
    //@JsonProperty("displayName")
    //@JsonProperty("caseType")
    //@JsonProperty("s3UntrustedUrl")

    try {
        await infoService.post(`/template`, req.body, { headers: User.createHeaders(req.user) });
        res.sendStatus(200);
    } catch (error) {
        logger.error(error);
        next(error);
    }
}

module.exports = {
    addTemplate
};

