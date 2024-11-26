const express = require('express');
const { addMitra, editMitra, deleteMitra } = require("../controllers/mitra.controller");

const router = express.Router();

router.post("/addMitra", addMitra);
// Edit mitra
router.put("/editMitra/:id", editMitra);

// Hapus mitra
router.delete("/deleteMitra/:id", deleteMitra);


module.exports = router;