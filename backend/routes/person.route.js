// import pachkage
const express = require('express');
// import Controller
const { getPerson, deletePerson, updatePerson } = require('../controllers/person.controller.js');

const router = express.Router();

router.get('/:id', getPerson)
router.post('/update/:id', updatePerson)
router.delete('/delete/:id', deletePerson)

module.exports = router;