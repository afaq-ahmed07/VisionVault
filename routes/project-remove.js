const express = require('express');
const router = express.Router();
const { removeProject } = require('../controllers/project-remove');
const authenticateToken = require('../middlewares/auth');
const cookieParser = require('cookie-parser');

router.use(cookieParser()); // Use cookie-parser middleware
router.use(authenticateToken);

// Define the route for removing a project
router.delete('/:id', removeProject);

module.exports = router;
