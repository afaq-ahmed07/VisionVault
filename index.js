// server.js
const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

// Import your route modules
const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');
const { router: emailRouter } = require('./routes/email'); // Destructure to get the router
const forgetpasswordRouter = require('./routes/forgetpassword'); // Destructure to get the router
const homeRouter = require('./routes/home');
const aboutRouter = require('./routes/about');


// Initialize express app
const app = express();

// Connect to MongoDB
require("./config/connect");

// Set up view engine and static files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route management
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/email-page', emailRouter);
app.use('/', homeRouter);
app.use('/forgetpassword',forgetpasswordRouter)
app.use('/about',aboutRouter)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
