const express = require('express');
const router = express.Router();
const path = require('path'); // Import the path module
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path as necessary


router.post("/", async (req, res) => {
    const { username, email , password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const newUser = new User({ username, email, password: hashedPassword });

        // Save the user to the database
        await newUser.save();

        res.status(201).send('User created successfully');
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/', (req, res) => {
    res.render('signup');
});

module.exports = router;
