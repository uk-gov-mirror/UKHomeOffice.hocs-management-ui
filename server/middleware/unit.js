// const { infoService } = require('../clients/index');
// const getLogger = require('../libs/logger');
// const User = require('../models/user');

// async function addUnit(req, _, next) {

//     const logger = getLogger(req.request);
//     const { userId, teamId } = req.params;

//     try {
//         await infoService.post(`/users/${userId}/team/${teamId}`, {}, { headers: User.createHeaders(req.user) });
//         next();
//     } catch (error) {
//         logger.error(error);
//         next(error);
//     } 
// }