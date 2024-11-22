// Package
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const { errorHandler } = require('../utils/error.js');

// Models
const Person = require('../models/person.model');

// function get person
const getPerson = async(req, res, next) => {
    try {
        const user = await Person.findById(req.params.id);
        if (!user) return next(errorHandler(404, 'User not found!'));
        const { password: pass, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

// delete Person
// delete Person tanpa verifikasi token
const deletePerson = async(req, res, next) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
        await Person.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted!');
    } catch (error) {
        next(error);
    }
};





//   Update Person
// Fungsi untuk memperbarui data pengguna
const updatePerson = async(req, res) => {
    try {
        const { id } = req.params; // ID pengguna yang ingin diperbarui
        const { nama, nik, no_hp, role, email, password, tl, jenisKelamin, alamat, poli } = req.body;

        // Debug: Log input data
        console.log('--- Update Request ---');
        console.log('Params ID:', id);
        console.log('Request Body:', req.body);
        console.log('Request Params:', req.params);

        // Pastikan data yang diperlukan ada
        if (!nama || !nik || !no_hp || !role || !email || !password) {
            console.log('Validation Failed: Missing required fields');
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Cek apakah email sudah terdaftar
        console.log('Checking existing user for email:', email);
        const existingUser = await Person.findOne({ email });
        if (existingUser && existingUser._id.toString() !== id) {
            console.log('Validation Failed: Email already in use');
            return res.status(409).json({ success: false, message: "Email already in use by another user" });
        }

        // Jika password baru diberikan, hash password tersebut
        let hashedPassword;
        if (password) {
            console.log('Hashing password:', password);
            hashedPassword = await bcryptjs.hash(password, 12); // Use bcryptjs.hash instead of bcrypt.hash
        }

        // Menyusun data update dengan pengecekan opsional untuk `tl` dan `password`
        const updateData = {
            nama,
            jenisKelamin,
            alamat,
            nik,
            no_hp,
            role,
            poli,
            email,
            password: hashedPassword || undefined,
            tl: tl || null,
        };

        console.log('Update Data:', updateData);

        // Update pengguna berdasarkan ID
        const updatedUser = await Person.findOneAndUpdate({ _id: id },
            updateData, { new: true } // Mengembalikan objek yang diperbarui
        );

        console.log('Updated User:', updatedUser);

        if (!updatedUser) {
            console.log('User not found for ID:', id);
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.error("Error during update:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};







module.exports = {
    getPerson,
    deletePerson,
    updatePerson
}