const express = require('express');
const router = express.Router();

// Route handler for /signin
router.get('/', (req, res) => {
    const pageTitle = 'Sign In';
    res.render('signin', { pageTitle });
});

module.exports = router;
