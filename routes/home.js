const express = require('express');
const router = express.Router();
const Project = require('../models/projects');
const projectController = require('../controllers/project-add');
const searchRouter = require('../routes/search');
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
router.use('/search', searchRouter);



// Route handler for the home page
router.get('/', async (req, res) => {
    try {
        const query = req.query.query; // Get the search query from the request
        let projects = await Project.find();
        
        if (query) {
            // Filter projects based on the search query
            projects = projects.filter(project =>
                project.title.toLowerCase().includes(query.toLowerCase()) ||
                project.desc.toLowerCase().includes(query.toLowerCase())
            );
        }
        // Sort the projects by likes in descending order
        projects.sort((a, b) => b.likes - a.likes);
        const topProject = projects[0];
        // Select the second and third projects
        const sec_third_project = projects.slice(1, 3);
        res.render('index', { pageTitle: 'Home', cards: projects,carousel:topProject,carousel_sib:sec_third_project });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;