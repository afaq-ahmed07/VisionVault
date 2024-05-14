const express = require('express');
const router = express.Router();
const Project = require('../models/projects');
const projectController = require('../controllers/project-add');
const carousel = [
    {
        src: "/img/interior.jpg",
    },
    {
        src: "/img/boy.png",
    },
    {
        src: "/img/boy.png",
    },
    {
        src: "/img/boy.png",
    },
];
const carousel_sib = [
    {
        src: "/img/watchtower.jpg",
    },
    {
        src: "/img/watchtower.jpg",
    },
];
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use('/projects', projectController);

function formatLikes(likes) {
    if (likes >= 1000 && likes < 1000000) {
        return (likes / 1000).toFixed(1) + 'K'; // Convert to K format
    } else if (likes >= 1000000) {
        return (likes / 1000000).toFixed(1) + 'M'; // Convert to M format
    } else {
        return likes; // Return as-is for values below 1000
    }
}

// Route handler for the home page
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        // Sort the projects by likes in descending order
        projects.sort((a, b) => b.likes - a.likes);
        const topProject = projects[0];
        // Select the second and third projects
        const sec_third_project = projects.slice(1, 3);
        res.render('index', { pageTitle: 'Home', cards: projects,carousel:topProject,carousel_sib:sec_third_project, formatLikes });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;