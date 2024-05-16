const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const cookieParser = require('cookie-parser');

router.use(cookieParser()); // Use cookie-parser middleware
router.use(authenticateToken);

router.get('/', (req, res) => {
    res.render('about', {
        isLoggedIn: req.user ? true : false,
        username: req.user ? req.user.username : null
    });
});

module.exports = router;
