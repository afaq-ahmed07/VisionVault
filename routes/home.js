const express = require('express');
const router = express.Router();
const Project = require('../models/projects');
const projectController = require('../controllers/project-add');
const authenticateToken = require('../middlewares/auth'); // Ensure correct path to auth middleware
const cookieParser = require('cookie-parser'); // Import cookie-parser

const carousel = [
    { src: "/img/interior.jpg" },
    { src: "/img/boy.png" },
    { src: "/img/boy.png" },
    { src: "/img/boy.png" },
];

const carousel_sib = [
    { src: "/img/watchtower.jpg" },
    { src: "/img/watchtower.jpg" },
];

function formatLikes(likes) {
    if (likes >= 1000 && likes < 1000000) {
        return (likes / 1000).toFixed(1) + 'K'; // Convert to K format
    } else if (likes >= 1000000) {
        return (likes / 1000000).toFixed(1) + 'M'; // Convert to M format
    } else {
        return likes; // Return as-is for values below 1000
    }
}

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser()); // Use cookie-parser middleware
router.use(authenticateToken); // Use authenticateToken middleware

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        // Sort the projects by likes in descending order
        projects.sort((a, b) => b.likes - a.likes);
        const topProject = projects[0];
        const sec_third_project = projects.slice(1, 3);

        if (req.user) {
            // If logged in, render a different file
            res.send({ username: req.user.username, email: req.user.email });
        } else {
            // If not logged in, render the default file
            res.render('index', { pageTitle: 'Home', cards: projects, carousel: topProject, carousel_sib: sec_third_project, formatLikes });
        }
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
