const mongoose = require('mongoose');
const User = require('./user')
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    posted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    comment: {
        type: [String]
    }
})
const Post = mongoose.model('post', postSchema)
module.exports = Post;