const express = require('express');
const Message = require('../models/message');
const router = express.Router();
router.get('/allmsg', async(req, res) => {
    let msg = await Message.find()
    res.json(msg);
})
router.get('/msg/:sender/:receiver', async(req, res) => {
    let msg = await Message.find({ $or: [{ sender: req.params.sender }, { receiver: req.params.receiver }] });
    let msg2 = await Message.find({ $or: [{ sender: req.params.receiver }, { receiver: req.params.sender }] })
    for (let i = 0; i < msg2.length(); i++) {
        msg = msg.push(msg2[i])
    }
    res.json(msg);
})
module.exports = router;