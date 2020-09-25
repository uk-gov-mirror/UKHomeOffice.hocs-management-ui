const User = require('../models/user');
const getLogger = require('../libs/logger');
const { DocumentError } = require('../models/error');
const { documentService } = require('../clients/index');

async function getOriginalDocument(req, res, next) {
    const logger = getLogger(req.requestId);
    const { documentId } = req.params;
    let options = {
        headers: User.createHeaders(req.user),
        responseType: 'stream'
    };
    logger.info('REQUEST_DOCUMENT_ORIGINAL', { ...req.params });
    try {
        const response = await documentService.get(`/document/${documentId}/file`, options);
        res.setHeader('Cache-Control', 'max-age=86400');
        res.setHeader('Content-Disposition', response.headers['content-disposition']);
        response.data.on('finish', () => logger.debug('REQUEST_DOCUMENT_ORIGINAL_SUCCESS', { ...req.params }));
        response.data.pipe(res);
    } catch (error) {
        logger.error('REQUEST_DOCUMENT_ORIGINAL_FAILURE', { ...req.params });
        return next(new DocumentError('Unable to retrieve original document'));
    }
}


module.exports = {
    getOriginalDocument
};
