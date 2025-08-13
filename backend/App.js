const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const studentRoute = require("./route/Student.route.js");
const teacherRoute = require("./route/Teachear.route.js");
const news = require("./route/new.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // This is essential for parsing JSON

// Routes
app.use( teacherRoute);
app.use(studentRoute);
app.use(news);

// Connect to MongoDB
mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log the error stack
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});