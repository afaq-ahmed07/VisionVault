const express = require('express');
const router = express.Router();
const path = require('path'); // Import the path module
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Adjust the path as necessary

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).send('Invalid username or password');
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send('Invalid username or password');
        }

        // Generate a JWT
        const token = jwt.sign({ username: user.username,email:user.email }, 'Nevergiveup', { expiresIn: '1h' });

        // Send the JWT in an HTTP-only cookie
        res.cookie('authToken', token, { httpOnly: true, secure: true, maxAge: 3600000 }); // 1 hour
        res.status(200).send('Sign-in successful');

    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/', (req, res) => {
    res.render('signin');
});

module.exports = router;
