const router = require('express').Router();
const { getParentTopics, returnParentTopicsJson } = require('../../middleware/topic');

router.get('/parents', getParentTopics, returnParentTopicsJson);

module.exports = router;