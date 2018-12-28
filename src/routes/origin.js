const router = require('express').Router();
const originController = require('../controllers/origin');

router.get('/powerBalanced', originController.powerBalanced);
router.get('/unbalancedFamilies', originController.getUnbalancedFamilies);

module.exports = router;
