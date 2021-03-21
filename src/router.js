const router = require('express').Router();
const Post = require('./postModel');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/create', async (req, res) => {
  const { title, message } = req.body;
  const newPost = new Post({ title, message });

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
