const express = require('express');
const router = express.Router();
const path= require('path');
const multer = require('multer');
const Project = require('../models/projects');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG and PNG are allowed.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // 5MB file size limit
});

// Route handler for adding a new project
router.post('/', upload.array('projectImages',3), async (req, res) => {
  try {
    const { title, desc } = req.body;
    const imagePaths = [];
    for (let i = 0; i < req.files.length; i++) {
      imagePaths.push('/uploads/'+ req.files[i].originalname);
    }
    // Create a new project instance
    const newProject = new Project({
      title,
      desc,
      images: imagePaths,
      author: "Hello",
      likes: 60,
    });

    // Save the project to the database
    await newProject.save();
    res.sendStatus(201); // Send a simple success status
  } catch (error) {
    res.status(500).json({ message: 'Failed to add project' });
  }
});

module.exports = router;
