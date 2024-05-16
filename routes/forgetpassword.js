const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User'); // Adjust the path as necessary

// Generate a random password with at least one alphabet and one digit
function generateRandomPassword() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const allChars = alphabet + digits;

    let password = '';
    // Ensure at least one alphabet and one digit
    password += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    password += digits.charAt(Math.floor(Math.random() * digits.length));

    // Fill the rest of the password length with random characters
    for (let i = 2; i < 5; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    return password;
}

router.get('/', (req, res) => {
    res.render('forgetpassword');
});

router.post('/', async (req, res) => {
    const { username, email } = req.body;
    console.log("username and email are : ",{username,email})
    try {
        // Check if the user exists
        const user = await User.findOne({ username, email });
        if (!user) {
            return res.status(400).send('User with this username and email does not exist.');
        }

        // Generate a new random password
        const newPassword = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        user.password = hashedPassword;
        await user.save();

        // Send the new password to the user's email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'f219143@cfd.nu.edu.pk',
                pass: 'universalbc786'
            },
            tls: { rejectUnauthorized: false }
        });

        const mailOptions = {
            from: 'f219143@cfd.nu.edu.pk',
            to: email,
            subject: 'Password Reset',
            text: `Your new password is: ${newPassword}`
        };

        await transporter.sendMail(mailOptions);

        // Redirect to sign in page with success message
        res.status(200).send('<script>alert("Password reset successful. Please check your email for the new password."); window.location.href="/signin";</script>');
    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
 