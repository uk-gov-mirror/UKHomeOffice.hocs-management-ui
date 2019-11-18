const router = require('express').Router();
const { getCaseTypes, returnCaseTypesJson } = require('../../middleware/caseType');
const { getTemplatesForCaseType } = require('../../middleware/template');

router.get('', getCaseTypes, returnCaseTypesJson);

router.get('/:caseTypeId/templates', getTemplatesForCaseType);

module.exports = router;
