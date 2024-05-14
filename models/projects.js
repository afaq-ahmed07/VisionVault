const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  images: {
    type: [String], // Array of strings (image URLs)
    required: true
  },
  author: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0 // Default value for likes (optional)
  }
});
const Project = mongoose.model('Project', projectSchema);
module.exports = Project;