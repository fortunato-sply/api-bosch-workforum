const mongoose = require('mongoose');
const User = require('./User');

const Post = mongoose.model('Post', {
  title: String,
  text: String,
  author: {
    id: String,
    name: String
  },
  likes: Number,
  userLikes: [String]
})

module.exports = Post;