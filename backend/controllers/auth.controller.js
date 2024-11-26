

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Person = require("../models/person.model");

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await Person.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (error) {
    console.error("Error during signin:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const signup = async(req, res) => {
    try {
        const { nama, nik, no_hp, role, email, password, tl, jenisKelamin, alamat, poli, klinik } = req.body;

    if (!nama || !nik || !no_hp || !role || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await Person.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
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
            poli,
            klinik,
            password: hashedPassword,
            tl: tl || null, // Jika `tl` tidak ada, atur ke `null`
        });

    await newUser.save();

    res.status(201).json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

 const google = async (req, res, next) => {
  try {
    console.log("udh hit api");
    const user = await Person.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, "asnjkKkjsnklnly1xcx?23r");
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new Person({
        nama: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
        role:'Antrian',
        no_hp:'08882323',
        nik:'02332442',

      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, "asnjkKkjsnklnly1xcx?23r");
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour

      console.log("photo ", req.body.photo);
      res.status(200).json({ message: "ok" });
    }
  } catch (error) {
    console.log({error})
    next(error);
  }
};


const signOut = (req, res) => {
  // Implement sign out logic here if required
  res.status(200).json({ success: true, message: "Signed out successfully" });
};

module.exports = { signOut, signin, signup, google };
