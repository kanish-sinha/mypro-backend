const mongoose = require('mongoose');
const User = require('./user')
const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    posted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    content: {
        type: String
    },
    author: {
        type: String
    },
    image: {
        type: String
    }
})
const Post = mongoose.model('post', postSchema)
module.exports = Post;