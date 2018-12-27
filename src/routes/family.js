const router = require('express').Router();
const familyController = require('../controllers/family');
const validate = require('./validators/familyValidate');

router.post('/', validate.create, familyController.create);

module.exports = router;
