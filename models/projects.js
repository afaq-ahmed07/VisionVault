const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    author: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: {
        type: [String], // Array of user IDs who liked the project
        default: []
    }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
