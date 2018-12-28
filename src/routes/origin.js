const router = require('express').Router();
const originController = require('../controllers/origin');

router.post('/powerBalanced', originController.powerBalanced);

module.exports = router;
