const mongoose = require('mongoose');
const { UserSchema } = require('./User');

const Post = mongoose.model('Post', {
  title: String,
  text: String,
  author: UserSchema,
  likes: Number,
  userLikes: [String]
})

module.exports = Post;