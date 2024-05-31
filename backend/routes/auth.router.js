const express = require('express');
const { signOut, signin, signup } = require ('../controllers/auth.controller.js');

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get('/signout', signOut)


module.exports = router;