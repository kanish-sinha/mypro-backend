const express = require('express');
const Post = require('../models/post');
const router = express.Router();
router.get('/', async(req, res) => {
    let post = await Post.find()
    res.json(post);
})
router.get('/one/:id', async(req, res) => {
    let post = await Post.find({ _id: req.params.id })
    res.json(post);
})
router.get('/user/:id', async(req, res) => {
    let post = await Post.find({ post_by: req.params.id });
    res.json(post);
})
router.post('/', async(req, res) => {
    let post = req.body;
    post = new Post(req.body)
    await post.save();
})
router.delete('/:id', async(req, res) => {
    let post = await Post.findByIdAndRemove(req.params.id);
})
router.patch('/update/:id', async(req, res) => {
    let like = req.body;
    let post = await Post.findByIdAndUpdate(req.params.id, req.body.likes)
    console.log(post);
    //await post.save();
    res.json(post);
})
module.exports = router