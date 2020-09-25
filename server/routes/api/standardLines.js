const router = require('express').Router();
const { fileMiddleware } = require('../../middleware/file');
const { addStandardLine, getAllStandardLines, returnAllStandardLinesJson, expireStandardLine, deleteStandardLine,
    getStandardLine, returnStandardLineJson, updateStandardLine } = require('../../middleware/standardLine');
const { getOriginalDocument } = require('../../middleware/document');

router.post('', fileMiddleware.any(), addStandardLine);
router.post('/update', updateStandardLine);
router.post('/expire/:standardLineUuid', expireStandardLine);
router.delete('/delete/:standardLineUuid', deleteStandardLine);
router.get('/all', getAllStandardLines, returnAllStandardLinesJson);
router.get('/get/:standardLineUuid', getStandardLine, returnStandardLineJson);
router.get('/download/:documentId', getOriginalDocument);


module.exports = router;
