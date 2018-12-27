const router = require('express').Router();
const personController = require('../controllers/person');
const validate = require('./validators/personValidate');

router.post('/', validate.create, personController.create);

module.exports = router;
