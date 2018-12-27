const router = require('express').Router();
const personController = require('../controllers/person');

router.post('/', personController.create);

module.exports = router;
