const express = require('express');
const router = express.Router();
const Project = require('../models/projects');
const SaveProject = require('../models/collections');
const checkUserLikedStatus = require('../utils/checkUserLikedStatus');
const cookieParser = require('cookie-parser');
const authenticateToken = require('../middlewares/auth');

router.use(cookieParser());
router.use(authenticateToken);

router.post('/:projectId', async (req, res) => {
    const { projectId } = req.params;
    const { currentLikes } = req.body;
    const username = req.user.username; // Assuming user name is available in the request
    try {
        const alreadyLiked = await checkUserLikedStatus(projectId, username);
        const project = await Project.findById(projectId);
        const saveproject = await SaveProject.findById(projectId);
        let newLikes = currentLikes;
        if (project) {

            if (!alreadyLiked) {
                // Increment likes if user has not liked before
                newLikes++;
                await Project.findByIdAndUpdate(projectId, { $inc: { likes: 1 }, $push: { likedBy: username } });
            } else {
                // Decrement likes if user has already liked before
                newLikes--;
                await Project.findByIdAndUpdate(projectId, { $inc: { likes: -1 }, $pull: { likedBy: username } });
            }
        }
        if (saveproject) {
            if (!alreadyLiked) {
                // Increment likes if user has not liked before
                newLikes++;
                await SaveProject.findOneAndUpdate(
                    { '_id': projectId },
                    {
                        $inc: { 'project.likes': 1 },
                        $push: { 'project.likedBy': username }
                    }
                );
            } else {
                // Decrement likes if user has already liked before
                newLikes--;
                await SaveProject.findOneAndUpdate(
                    { '_id': projectId },
                    {
                        $inc: { 'project.likes': -1 },
                        $pull: { 'project.likedBy': username }
                    }
                );
            }
        }

        res.status(200).json({ likes: newLikes });
    } catch (error) {
        console.error('Error toggling like:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
