const express = require('express');
const router = express.Router();
const path = require('path'); // Import the path module

router.get('/', (req, res) => {
    res.render('emailpage');
});

module.exports = router;
