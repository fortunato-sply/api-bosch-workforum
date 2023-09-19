const express = require('express');
const PostController = require('../controllers/PostController');
const router = express.Router();

router
  .post('/post/create', PostController.create)
  .get('/post', PostController.getAll)
  .post('/post/check', PostController.checkIsLiked)
  .post('/post/like', PostController.like)

module.exports = router;