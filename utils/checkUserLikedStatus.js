const Project = require('../models/projects');

async function checkUserLikedStatus(projectId, username) {
    try {
        const project = await Project.findById(projectId);

        if (!project) {
            return false; // Project not found
        }

        const likedBy = project.likedBy;

        // Check if userId exists in likedBy array
        return likedBy.includes(username);
    } catch (error) {
        console.error('Error checking user liked status:', error);
        return false;
    }
}

module.exports = checkUserLikedStatus;
