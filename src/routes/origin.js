const router = require('express').Router();
const originController = require('../controllers/origin');

router.get('/powerBalanced', originController.powerBalanced);

module.exports = router;
