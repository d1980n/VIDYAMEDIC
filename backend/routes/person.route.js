// import pachkage
const express = require('express');
// import necesities
const verifyToken  = require('../utils/verifyUser.js');
// import Controller
const PersonController = require('../controllers/person.controller');

const router = express.Router();

router.get('/:id', verifyToken, PersonController.getPerson)

module.exports = router;