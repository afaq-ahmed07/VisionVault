const Project = require('../models/projects');
const SaveProject=require('../models/collections');

async function checkUserLikedStatus(projectId, username) {
    try {
        const project = await Project.findById(projectId);
        const saveproject=await SaveProject.findById(projectId);
        if (!project && !saveproject) {
            console.log("Fail");
            return false; // Project not found
        }
        if(project){
        const likedBy = project.likedBy;
        return likedBy.includes(username);
        }
        if(saveproject){
         const likedBy=saveproject.project.likedBy;
         return likedBy.includes(username);
        }
    } catch (error) {
        console.error('Error checking user liked status:', error);
        return false;
    }
}

module.exports = checkUserLikedStatus;
