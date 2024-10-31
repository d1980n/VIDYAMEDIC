const express = require('express');
const { addDoc, getAllDoctors } = require('../controllers/doctor.controller.js');

const router = express.Router();

router.post("/addDoc", addDoc);
router.get('/', getAllDoctors);
// router.post("/signin", signin);
// router.get('/signout', signOut)


module.exports = router;