const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('changepassword');
});

router.post('/', async (req, res) => {
    const { oldpass, newpass } = req.body;
    const username = req.user.username; // Assuming you have user information stored in req.user after authentication
    console.log({oldpass,newpass})
    try {
        // Find the user by their username
        const user = await User.findOne({ username: username });

        // Check if the old password matches the one stored in the database
        const isPasswordValid = await bcrypt.compare(oldpass, user.password);
        if (!isPasswordValid) {
            return res.status(400).send('Incorrect old password');
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newpass, 10);

        // Update the user's password in the database
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).send('Password changed successfully');
    } catch (error) {
        console.error('Error during password change:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports=router;