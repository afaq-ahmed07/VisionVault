const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const cookieParser = require('cookie-parser');
const SaveProject = require('../models/collections');

router.use(cookieParser()); // Use cookie-parser middleware
router.use(authenticateToken);


router.get('/',async (req, res) => {
    if (!req.user) {
        return res.redirect('/error');
      }
    try {
        const query = req.query.query; // Get the search query from the request
        const username = req.user.username; // Get the username from the authenticated user

        // Find projects that belong to the logged-in user
        let projects = await SaveProject.find({ username: username });
        
        if (query) {
            projects = projects.filter(project =>
                project.project.title.toLowerCase().includes(query.toLowerCase()) ||
                project.project.desc.toLowerCase().includes(query.toLowerCase())
            );
        }
        // Sort the projects by likes in descending order
        projects.sort((a, b) => b.likes - a.likes);
        res.render('saved-projects', {
            pageTitle: 'Saved Projects',
            cards: projects,
            isLoggedIn: true,
            username: username,
            ismy:true
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
