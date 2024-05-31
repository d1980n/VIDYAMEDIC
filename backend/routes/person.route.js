// import pachkage
const express = require('express');
// import necesities
const verifyToken  = require('../utils/verifyUser.js');
// import Controller
const { getPerson, deletePerson, updatePerson } = require ('../controllers/person.controller.js');

const router = express.Router();

router.get('/:id', verifyToken, getPerson)
router.post('/update/:id', verifyToken, updatePerson)
router.delete('/delete/:id', verifyToken, deletePerson)

module.exports = router;