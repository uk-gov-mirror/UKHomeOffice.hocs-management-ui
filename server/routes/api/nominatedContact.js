const router = require('express').Router();
const { addNominatedContact } = require('../../middleware/nominatedContact');

router.post('', addNominatedContact);

module.exports = router;
