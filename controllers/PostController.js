const Post = require('../models/Post');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

class PostController {
  static async create(req, res) {
    const { token, title, text } = req.body;

    const { id } = jwt.decode(token);
    const user = await User.findOne({ _id: id });
    
    try {
      const newPost = {
        title: title,
        text: text,
        author: user,
        likes: 0,
        userLikes: []
      }

      var response = await Post.create(newPost);
      return res.status(200).send({ body: response });
    } catch (err) {
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  static async delete(req, res) {
    const { token, postId} = req.body;

    const { id } = jwt.decode(token);
    const user = await User.findOne({ _id: id });
    const post = await Post.findById(postId); 

    try {
      if(user._id == post.author._id) {
        await Post.deleteOne(post);
        return res.status(200).send({ message: "deleted successfully" });
      }
    } catch (err) {
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }

  static async like(req, res) {
    const { token, postId} = req.body;

    const { id } = jwt.decode(token);
    const user = await User.findOne({ _id: id });
    const post = await Post.findById(postId); 

    try {
      if(post.userLikes.includes(id)) {
        console.log('inc')
      }
    } catch (err) {
      return res.status(400).send({ message: "" });
    }
  }
}

module.exports = PostController;