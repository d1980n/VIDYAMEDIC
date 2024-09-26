const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    nomorMR: {
        type: String,
        required: true
    },
    TDS: String,
    TDD: String,
    Temp: String,
    Nadi: String,
    LP: String,
    Spot: String,
    TB: String,
    BB: String,
    LILA: String,
    AVPU: String,

});

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
module.exports = MedicalRecord;