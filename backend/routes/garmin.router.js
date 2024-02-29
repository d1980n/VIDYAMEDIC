const express = require('express');
const router = express.Router();
const GarminController = require('../controllers/garmin.connect');

router.get('/getConnect', GarminController.getConnect);
router.post('/acquireToken', GarminController.acquireRequestToken);
module.exports = router;