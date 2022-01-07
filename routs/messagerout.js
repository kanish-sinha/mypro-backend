const express = require('express');
const Message = require('../models/message');
const router = express.Router();
router.get('/allmsg', async(req, res) => {
    let msg = await Message.find()
    res.json(msg);
})
router.get('/msg/:sender/:receiver', async(req, res) => {
    let msg = await Message.find({ $or: [{ sender: req.params.sender }, { receiver: req.params.receiver }] });
    let receivermsg = await Message.find({ $or: [{ sender: req.params.receiver }, { receiver: req.params.sender }] })
    msg = msg.push(receivermsg);
    res.json(msg);
})
module.exports = router;