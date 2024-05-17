const express = require('express');
const router = express.Router();
const Project = require('../models/projects'); // Adjust the path as necessary
const authenticateToken = require('../middlewares/auth');
const cookieParser = require('cookie-parser');

// Use cookie-parser and authentication middleware
router.use(cookieParser());
router.use(authenticateToken);


// Route to get a specific project's details
router.get('/editprojects/:id', async (req, res) => {

    if (!req.user) {
        return res.redirect('/error');
      }

    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to update a specific project's details
router.put('/editprojects/:id', async (req, res) => {
    try {
        const { title, desc } = req.body;
        const project = await Project.findById(req.params.id);
        if (project) {
            project.title = title;
            project.desc = desc;
            await project.save();
            res.json({ success: true });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
