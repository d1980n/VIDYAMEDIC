const mongoose  = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
    Anamnesis: String,
    Diagnosa: String,
    Xray: String,
    StatusLokalis: String,
    PemeriksaanPenunjang: String,
    RencanaTerapi: String,
    DiagnosaICD11: String,
    Rujukan: String
});
const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
module.exports = MedicalRecord;

