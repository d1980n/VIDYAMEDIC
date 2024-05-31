import MedicalModel from '../models/medicalrecord.model';

const saveMR = async (req, res, next) => {
    try {
        const data = req.body;
        const medicalRecord = new MedicalModel(data);

        // Save the document to the database
        const savedRecord = await medicalRecord.save();

        res.json({ message: 'Data saved successfully', recordId: savedRecord._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save data' });
    }
  };


  module.exports = {
    saveMR
};