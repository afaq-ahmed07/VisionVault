// /routes/email.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as necessary

// In-memory store for unverified users
let tempUserStore = {};

// This function allows access to the tempUserStore in other files if needed
function getTempUserStore() {
  return tempUserStore;
}

// Endpoint to render the email page
router.get('/', (req, res) => {
    res.render('emailpage');
});

// Endpoint to handle email verification
router.get('/verify-email', async (req, res) => {
    try {
        const { token } = req.query;
        const tempUser = tempUserStore[token];

        if (!tempUser || tempUser.verificationTokenExpiry < Date.now()) {
            return res.status(400).send('Invalid or expired token');
        }

        // Create new user in the database
        const newUser = new User({
            username: tempUser.username,
            email: tempUser.email,
            password: tempUser.password
        });

        await newUser.save();

        // Remove user from temporary storage
        delete tempUserStore[token];

         // Redirect to the sign-in page
        res.redirect('/signin?closed=true');

    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = { router, getTempUserStore };
