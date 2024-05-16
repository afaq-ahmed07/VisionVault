// routes/logout.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
        // Clear the authToken cookie
    res.cookie('authToken', '', { httpOnly: true, secure: true, expires: new Date(0) }); // Expire the cookie immediately
    res.redirect('/signin')
});

module.exports = router;


