const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
router.get('/alluser', async(req, res) => {
    let users = await User.find()
    res.json(users);
})
router.get('/one/:id', async(req, res) => {
    let user = await User.findOne({ _id: req.params.id });
    res.json(user);
})
router.post('/signup', async(req, res) => {
    let user = req.body;
    user = new User(req.body);
    await user.save();
})
router.post('/login', async(req, res) => {
    let user = req.body;
    let users = await User.findOne({ email: user.email })
    if (!users)
        return res.json(users)
    if (users.password == user.password) {
        let token = jwt.sign({ _id: users._id }, users.password)
        res.json(token);
    }
})
module.exports = router;