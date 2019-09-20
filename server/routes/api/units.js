const router = require('express').Router();

router.post('', (req, res) => {
    res.json({ done: 'done' });
});

module.exports = router;
