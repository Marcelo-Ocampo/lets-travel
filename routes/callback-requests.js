let CallbackRequest = require('../models/callback-requests.js').CallbackRequest;
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
    res.send(await CallbackRequest.find());
});

router.post('/', async (req, res) => {
    let newCallbackRequest = new CallbackRequest({
        id: uniqid(),
        phoneNumber: req.body.phoneNumber,
        date: new Date()
    });
    await newCallbackRequest.save();
    res.send('Accepted!');
});

router.delete('/:id', authMiddleware, async (req, res) => {
    await CallbackRequest.deleteOne({
        id: req.params.id
    });
    res.send('Deleted!');
});

module.exports = router;