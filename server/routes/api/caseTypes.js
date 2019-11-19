const router = require('express').Router();
const { getCaseTypes, returnCaseTypesJson } = require('../../middleware/caseType');
const { getTemplatesForCaseType } = require('../../middleware/template');

router.get('', getCaseTypes, returnCaseTypesJson);

router.get('/:caseTypeType')

router.get('/:caseTypeType/templates', getTemplatesForCaseType);

module.exports = router;
