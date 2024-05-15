const mongoose = require('mongoose');
const Project=require('../models/projects')
const saveProjectSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  project:{
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
    }
  }
});

const collection = mongoose.model('SaveProject', saveProjectSchema);

module.exports = collection;
