const Mitra = require('../models/mitra.model');

const addMitra = async(req, res) => {
    try {
        const { namaKlinik, no_hp, alamat, email, logo, link } = req.body;
        // console.log(req.file, req.body)
        // Validasi input
        if (!namaKlinik || !no_hp || !alamat || !email) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Cek apakah mitra sudah ada berdasarkan email
        const existingMitra = await Mitra.findOne({ email });
        if (existingMitra) {
            return res.status(409).json({ success: false, message: "Mitra already exists" });
        }

        // const logoPath = req.file ? req.file.filename : null; // Nama file yang diunggah

        // Membuat data mitra baru
        const newMitra = new Mitra({
            namaKlinik,
            no_hp,
            alamat,
            email,
            logo,
            link,
        });

        await newMitra.save();

        res.status(201).json({ success: true, message: "Mitra added successfully" });
    } catch (error) {
        console.error("Error during addMitra:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const editMitra = async(req, res) => {
    try {
        const { id } = req.params; // ID mitra yang akan diedit
        const { namaKlinik, no_hp, alamat, email, logo } = req.body;

        // Validasi input
        if (!namaKlinik || !no_hp || !alamat || !email) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Update data mitra
        const updatedMitra = await Mitra.findByIdAndUpdate(
            id, { namaKlinik, no_hp, alamat, email, logo, link }, { new: true } // Mengembalikan data yang sudah diperbarui
        );

        if (!updatedMitra) {
            return res.status(404).json({ success: false, message: "Mitra not found" });
        }

        res.status(200).json({ success: true, message: "Mitra updated successfully", data: updatedMitra });
    } catch (error) {
        console.error("Error during editMitra:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const deleteMitra = async(req, res) => {
    try {
        const { id } = req.params; // ID mitra yang akan dihapus

        // Menghapus mitra berdasarkan ID
        const deletedMitra = await Mitra.findByIdAndDelete(id);

        if (!deletedMitra) {
            return res.status(404).json({ success: false, message: "Mitra not found" });
        }

        res.status(200).json({ success: true, message: "Mitra deleted successfully" });
    } catch (error) {
        console.error("Error during deleteMitra:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


module.exports = { addMitra, deleteMitra, editMitra, };