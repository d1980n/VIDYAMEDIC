// Import Package
const express  = require('express');
const mongoose  = require('mongoose');
const cookieParser  = require('cookie-parser');
const path  = require('path');   
require('dotenv').config({path: __dirname + '/../.env'})

// Routes
const GarminRoute = require('./routes/garmin.router'); 

// Connect to mongo
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));
// Using Express, cookies
const app = express();

app.use(express.json());
app.use(cookieParser());

// Routing
app.use('/garminConnect', GarminRoute);

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
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