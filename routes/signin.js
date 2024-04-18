const express = require('express');
const router = express.Router();
const path = require('path'); // Import the path module

router.get('/', (req, res) => {
    // Use path.join to get the correct path to the signin.html file in the public folder
    const signInFilePath = path.join(__dirname, '../public', 'signin.html');
    res.sendFile(signInFilePath);
});

module.exports = router;
