const Medical = require('../models/medicalrecord.model');

const MedicalRoute = async(req, res, next) => {
    try {
        const data = req.body;
        const medicalRecord = new Medical(data);

        // Save the document to the database
        const savedRecord = await medicalRecord.save();

        res.json({ message: 'Data saved successfully', recordId: savedRecord._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save data' });
    }
};

// GET: Retrieve all medical records
const getAllMedicalRecords = async(req, res) => {
    try {
        const medicalRecords = await Medical.find(); // Use your Medical model here
        res.json({ success: true, medicalRecords });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


module.exports = {
    MedicalRoute,
    getAllMedicalRecords
};