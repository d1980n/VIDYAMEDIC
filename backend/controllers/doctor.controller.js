const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor.model');

const addDoc = async(req, res) => {
    try {
        const { nama, no_hp, role, email, password, poli } = req.body;

        if (!nama || !no_hp || !role || !email || !password || !poli) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const existingUser = await Doctor.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'Doctor already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new Doctor({
            nama,
            no_hp,
            role,
            email,
            poli,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getAllDoctors = async(req, res, next) => {
    try {
        const doctors = await Doctor.find();

        res.status(200).json({ success: true, doctors });
    } catch (error) {
        console.error('Error saat mengambil data dokter:', error);
        res.status(500).json({ success: false, message: 'Error saat mengambil data dokter.' });
        next(error);
    }
};

const generateKodeDok = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

module.exports = { addDoc, getAllDoctors, generateKodeDok };