// Import Package
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

// Import your models
const Medical = require('./models/medicalrecord.model');

require('dotenv').config({ path: __dirname + '/../.env' })

// Routes
const GarminRoute = require('./routes/garmin.router');
const AuthRoute = require('./routes/auth.router');
const PersonRoute = require('./routes/person.route');
const DashboardRoute = require('./routes/dashboard.route');
const MedicalRoute = require('./routes/medical.router');
const patientRoutes = require('./routes/patients.routes');
// const MRroutes = require('./routes/medical.router');
// Connect to mongo
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));
// Using Express, cookies
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routing
app.use('/garminConnect', GarminRoute);
app.use('/auth', AuthRoute);
app.use('/person', PersonRoute);
app.use('/dashboard', DashboardRoute);
app.use('/medical', MedicalRoute);
app.use('/patients', patientRoutes);

// running app
app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});

app.get('/patients', async(req, res) => {
    try {
        const patients = await patients.find();
        res.json({ success: true, patients });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
app.get('/medical', async(req, res) => {
    try {
        const medicalRecords = await Medical.find();
        res.json({ success: true, medicalRecords });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});