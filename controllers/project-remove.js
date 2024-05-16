const Project = require('../models/projects');
const SaveProject = require('../models/collections'); // Adjust the path as needed

const removeProject = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await SaveProject.findOneAndDelete({ '_id': id });
        const result_1=await Project.findOneAndDelete({ '_id': id });
        if (result || result_1) {
            res.status(200).json({ success: true, message: 'Project removed successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Project not found' });
        }
    } catch (error) {
        console.error('Error removing project:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { removeProject };
