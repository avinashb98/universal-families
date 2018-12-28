const router = require('express').Router();
const familyController = require('../controllers/family');
const validate = require('./validators/familyValidate');

router.post('/', validate.create, familyController.create);
router.get('/totalPower', validate.totalPower, familyController.totalPower);

module.exports = router;
