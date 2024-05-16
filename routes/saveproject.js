const express = require('express');
const router = express.Router();
const SaveProject = require('../models/collections');
const cookieParser = require('cookie-parser');
const authenticateToken = require('../middlewares/auth');
const Project = require('../models/projects');

router.use(cookieParser());
router.use(authenticateToken);

router.post('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'You must be logged in to save projects.' });
  }
  try {
    const { projectId } = req.body;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    // Check if the project is already saved by this user
    const temp_project = await SaveProject.findOne({
      username: req.user.username, 
      'project.title': project.title,
      'project.desc': project.desc,
      'project.author': project.author
    });
    if (temp_project) {
      return res.status(400).json({ message: 'Project already saved' });
    }
    // If not, create a new SaveProject entry
    const saveProject = new SaveProject({
      username: req.user.username,
      project: {
        _id: project._id,
        title: project.title,
        desc: project.desc,
        images: project.images,
        author: project.author,
        likes: project.likes,
        likedBy: project.likedBy
      }
    });

    await saveProject.save();
    res.status(201).json({ success: true, message: 'Project saved successfully.' });
  } catch (error) {
    console.error('Error saving project:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
