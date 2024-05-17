const express = require('express');
const router = express.Router();
const Project = require('../models/projects');
const User = require('../models/user'); // Ensure this is the correct path
const SaveProject = require('../models/collections');
const authenticateToken = require('../middlewares/auth');
const cookieParser = require('cookie-parser');

router.use(cookieParser()); // Use cookie-parser middleware
router.use(authenticateToken);

router.get('/hireauthor/:projectId', async (req, res) => {
    const { projectId } = req.params;
    try {
        const project = await Project.findById(projectId);
        const saveProject = await SaveProject.findById(projectId);
        if (!project && !saveProject) {
            console.log('Project not found');
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        let user;
        if (project) {
            user = await User.findOne({ username: project.author });
            if (!user) {
                return res.status(404).json({ success: false, message: 'Author not found' });
            }
        }

        if (saveProject) {
            user = await User.findOne({ username: saveProject.project.author });
            if (!user) {
                return res.status(404).json({ success: false, message: 'Author not found' });
            }
        }

        res.status(200).json({ success: true, email: user.email });
    } catch (error) {
        console.error('Error fetching author details:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
