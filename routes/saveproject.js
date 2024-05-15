const express = require('express');
const router = express.Router();
const SaveProject = require('../models/collections');
const cookieParser = require('cookie-parser');
const authenticateToken = require('../middlewares/auth');
const Project=require('../models/projects');

router.use(cookieParser());
router.use(authenticateToken);

router.post('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'You must be logged in to save projects.' });
  }
  const { projectId } = req.body;
  const project = await Project.findById(projectId);
  try {
    const saveProject = new SaveProject({
      username: req.user.username,
      project:project
    });
    
    await saveProject.save();
    res.status(201).json({ success: true, message: 'Project saved successfully.' });
  } catch (error) {
    console.error('Error saving project:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
