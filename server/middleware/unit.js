const { infoService } = require('../clients/index');
const getLogger = require('../libs/logger');
const User = require('../models/user');

async function addUnit(req, res, next) {

    const logger = getLogger(req.request);

    try {
        await infoService.post(`/unit`, req.body, { headers: User.createHeaders(req.user) });
        res.sendStatus(200);
    } catch (error) {
        logger.error(error);
        next(error);
    }
}

module.exports = {
    addUnit
}