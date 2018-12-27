const router = require('express').Router();
const universeController = require('../controllers/universe');

router.post('/', universeController.create);

module.exports = router;
