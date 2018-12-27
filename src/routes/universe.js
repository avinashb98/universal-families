const router = require('express').Router();
const universeController = require('../controllers/universe');
const validate = require('./validators/universeValidate');

router.post('/', universeController.create);
router.get('/families', validate.getFamilies, universeController.getFamilies);

module.exports = router;
