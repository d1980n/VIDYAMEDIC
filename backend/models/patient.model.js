const mongoose = require('mongoose');

const antrianStatusSchema = new mongoose.Schema({
    status: {
        type: Boolean,
        required: true,
        default: false,
    },
    waktuAntrian: {
        type: Date,
        required: true,
        default: Date.now,
    },
    keterangan: {
        type: String,
        default: '',
    }
});

const patientSchema = new mongoose.Schema({
    namaLengkap: {
        type: String,
        required: true,
    },
    nomorMR: {
        type: String,
        required: true,
        unique: true,
    },
    jenisKelamin: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: false,
    },
    alamatLengkap: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    antrianStatus: {
        type: antrianStatusSchema,
        required: true,
        default: () => ({}), // Default to an empty object to ensure `antrianStatus` is always present
    },

});

const Patients = mongoose.model('Patients', patientSchema);

module.exports = Patients;