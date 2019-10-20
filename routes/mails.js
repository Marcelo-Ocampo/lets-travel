let Mail = require('../models/mails.js').Mail;
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();

router.get('/', async (req, res) => {
    res.send(await Mail.find());
});

router.post('/', async (req, res) => {
    let newMail = new Mail({
        id: uniqid(),
        email: req.body.email,
        date: new Date(),
        name: req.body.name,
        message: req.body.message
    });
    await newMail.save();
    res.send('Accepted!');
});

router.delete('/:id', async (req, res) => {
    await Mail.deleteOne({
        id: req.params.id
    });
    res.send('Deleted!');
});

module.exports = router;