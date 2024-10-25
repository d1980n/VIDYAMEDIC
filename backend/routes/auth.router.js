const express = require('express');
const { signOut, signin, signup, google } = require('../controllers/auth.controller.js');

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get('/signout', signOut)
router.post('/google', google)


module.exports = router;