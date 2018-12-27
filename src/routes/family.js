const router = require('express').Router();
const familyController = require('../controllers/family');

router.post('/', familyController.create);

module.exports = router;
