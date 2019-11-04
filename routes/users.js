let User = require('../models/users.js');
let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');

router.post('/signin', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let signInUser = await User.find().where({
        email: email
    });
    if (signInUser.length > 0) {
        let comparedPass = await bcrypt.compare(password, signInUser[0].password);
        if (comparedPass) {
            res.send('Logged in');
        } else {
            res.send('Wrong password');
        }
    } else {
        res.send('User does not exist');
    }
})

router.post('/register', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let registeredUser = await User.find().where({
        email: email
    });
    if (registeredUser.length > 0) {
        res.send('Email already registered');
    } else {
        let cryptedPass = await bcrypt.hash(password, 12)
        let newUser = new User({
            email: email,
            password: cryptedPass
        });
        await newUser.save();
        res.send('User registered');
    }
})

module.exports = router;