const router = require('express').Router();
const { getCaseType, getCaseTypes, returnCaseTypesJson } = require('../../middleware/caseType');
const { getTemplatesForCaseType } = require('../../middleware/template');

router.get('', getCaseTypes, returnCaseTypesJson);

router.get('/:type', getCaseType)

router.get('/:type/templates', getTemplatesForCaseType);

module.exports = router;
