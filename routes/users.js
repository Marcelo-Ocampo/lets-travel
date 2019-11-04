let User = require('../models/users.js');
let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let auth = require('../controllers/auth');

router.post('/signin', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let signInUser = await User.find().where({
        email: email
    });
    if (signInUser.length > 0) {
        let comparedPass = await bcrypt.compare(password, signInUser[0].password);
        if (comparedPass) {
            let token = auth.generateToken(signInUser[0]);
            res.cookie('auth_token', token);
            res.send({
                redirectURL: '/admin'
            });
        } else {
            res.status(400);
            res.send('Wrong password');
        }
    } else {
        res.status(400);
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