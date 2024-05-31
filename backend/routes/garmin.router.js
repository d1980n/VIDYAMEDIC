const express = require('express');
const router = express.Router();
const GarminController = require('../controllers/garmin.connect');

router.get('/getConnect', GarminController.getConnect);
router.post('/acquireUnauthorizeToken', GarminController.acquireUnauthorizeToken);
router.post('/verifyToken', GarminController.verifyToken);
router.get('/Signingrequests', GarminController.Signingrequests);
router.post('/simulatePing', GarminController.simulatePing);
module.exports = router;