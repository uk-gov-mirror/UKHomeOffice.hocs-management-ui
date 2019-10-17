const User = require('../models/user');
const getLogger = require('../libs/logger');
const { infoService } = require('../clients/index');

async function addStandardLine(req, res, next) {
    let logger;
    try {
        logger = getLogger(req.request);
        const document = req.files[0];
        const request = {
            s3UntrustedUrl: document.key,
            displayName: document.originalname,
            topicUUID: req.body.topic,
            expires: req.body.expiry_date
        };

        const options = {
            headers: User.createHeaders(req.user)
        };
        await infoService.post('/standardLine', request, options);
    }
    catch (error) {
        logger.error(error);

        next(error);
    }
    res.sendStatus(200);
}

module.exports = addStandardLine;
