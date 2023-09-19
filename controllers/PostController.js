const Post = require('../models/Post');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

class PostController {
  static async create(req, res) {
    const { data } = req.body;

    const { id } = jwt.decode(data.token);
    const user = await User.findOne({ _id: id });
    
    try {
      const newPost = {
        title: data.title,
        text: data.content,
        author: {
          id: user._id,
          name: user.name
        },
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
    const { token, postId } = req.body;

    const { id } = jwt.decode(token);
    const post = await Post.findById(postId); 
    var likes = post.userLikes;
    
    try {
      if(likes.includes(id)) {
        likes = likes.filter(like => like != id);
        await Post.updateOne({ _id: postId }, { userLikes: likes, $inc: { likes: -1 } });
        //atualizar os likes do post
      }
      else {
        likes.push(id);
        await Post.updateOne({ _id: postId }, { userLikes: likes, $inc: { likes: 1 } });
      }

      return res.status(200).send({ message: "updated" });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: err });
    }
  }

  static async checkIsLiked(req, res) {
    const { token, postId } = req.body;
    var isLiked = false;

    const { id } = jwt.decode(token);
    const post = await Post.findById(postId);

    try {
      if(post.userLikes.includes(id))
        isLiked = true;

      return res.status(200).send({ isLiked: isLiked });
    } catch(err) {
      console.log(err);
      return res.status(500).send({ error: err });
    }
  }

  static async getAll(req, res) {
    const posts = await Post.find();

    try {
      return res.status(200).send({ content: posts });
    } catch (err) {
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
}

module.exports = PostController;