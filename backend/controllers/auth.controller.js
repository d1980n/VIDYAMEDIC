const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Person = require('../models/person.model');

const signin = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const user = await Person.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            role: user.role,
        });
    } catch (error) {
        console.error('Error during signin:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const signup = async(req, res) => {
    try {
        const { nama, nik, no_hp, role, email, password, tl, jenisKelamin, alamat } = req.body;

        // Validasi hanya untuk field yang wajib
        if (!nama || !nik || !no_hp || !role || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const existingUser = await Person.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        // Menyusun data baru dengan pengecekan opsional untuk `tl`
        const newUser = new Person({
            nama,
            jenisKelamin,
            alamat,
            nik,
            no_hp,
            role,
            email,
            password: hashedPassword,
            tl: tl || null, // Jika `tl` tidak ada, atur ke `null`
        });

        await newUser.save();

        res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};



const signOut = (req, res) => {
    // Implement sign out logic here if required
    res.status(200).json({ success: true, message: 'Signed out successfully' });
};

module.exports = { signOut, signin, signup };