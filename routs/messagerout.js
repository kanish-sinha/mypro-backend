const express = require('express');
const Message = require('../models/message');
const router = express.Router();
router.get('/allmsg', async(req, res) => {
    let msg = await Message.find()
    res.json(msg);
})
router.get('/msg/:sender/:receiver', async(req, res) => {
    let msgarr = [];
    let count = 0;
    let message = await Message.find({ $or: [{ sender: req.params.sender }, { receiver: req.params.sender }] })
    for (let i = 0; i < message.length; i++) {
        if ((message[i].receiver == req.params.receiver) && (message[i].sender == req.params.sender) || (message[i].receiver == req.params.sender) && (message[i].sender == req.params.receiver)) {
            msgarr[count] = message[i];
            count++;
        }
    }
    res.json(msgarr)
})
module.exports = router;