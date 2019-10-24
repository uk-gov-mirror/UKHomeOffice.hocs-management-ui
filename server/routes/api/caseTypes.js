const router = require('express').Router();
const { getCaseTypes, returnCaseTypesJson } = require('../../middleware/caseType');

router.get('', getCaseTypes, returnCaseTypesJson);

module.exports = router;
