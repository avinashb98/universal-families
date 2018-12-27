const router = require('express').Router();
const universeController = require('../controllers/universe');

router.post('/', universeController.create);
router.get('/families', universeController.getFamilies);

module.exports = router;
