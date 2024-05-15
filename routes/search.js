const express = require('express');
const router = express.Router();
const Project = require('../models/projects');

router.get('/', async (req, res) => {
    try {
        const query = req.query.query;
        let projects = await Project.find();
        
        if (query) {
            projects = projects.filter(project =>
                project.title.toLowerCase().includes(query.toLowerCase()) ||
                project.desc.toLowerCase().includes(query.toLowerCase())
            );
        }
        
        projects.sort((a, b) => b.likes - a.likes);
        res.render('partials/project-list', { projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
