const router = require('express').Router();
const { addUnit } = require('../../middleware/unit')

router.post('', addUnit);

module.exports = router;
