const User = require('../models/user');
const getLogger = require('../libs/logger');
const { infoService } = require('../clients/index');

async function addTemplate(req, res, next) {
    const logger = getLogger(req.request);
    try {
        const document = req.files[0];
        const request = {
            s3UntrustedUrl: document.key,
            displayName: document.originalname,
            caseType: req.body.caseType,
        };

        const options = {
            headers: User.createHeaders(req.user)
        };
        await infoService.post('/template', request, options);
        res.sendStatus(200);
    }
    catch (error) {
        logger.error(error.message);
        next(error);
    }
}


async function getTemplatesForCaseType(req, res, next) {
    const logger = getLogger(req.request);
    try {
        const { caseType } = req.params;
        const response = await infoService.get(`/caseType/${caseType}/templates`, { headers: User.createHeaders(req.user) });
        res.json(response.data);
    } catch (error) {
        logger.error(error.message);
        next(error);
    }
}


module.exports = {
    addTemplate,
    getTemplatesForCaseType
};
