let Post = require('../models/posts.js').Post;
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');

router.get('/', async (req, res) => {
    let posts = await Post.find();
    res.send(posts);
});

router.get('/:id', async (req, res) => {
    let post = await Post.findOne({
        id: req.params.id
    });
    res.send(post);
})

router.post('/', authMiddleware, async (req, res) => {
    let reqBody = req.body;
    let imgPath;
    if (req.file) {
        imgPath = req.file.path.substring(req.file.path.indexOf('/'), req.file.path.length);
    } else {
        imgPath = reqBody.imageURL;
    }

    let newPost = new Post({
        id: uniqid(),
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageURL: imgPath
    })
    await newPost.save();
    res.send('Created');
});

router.delete('/:id', authMiddleware, async (req, res) => {
    let id = req.params.id;
    await Post.deleteOne({
        id: id
    });
    res.send('Deleted!');
})

router.put('/:id', authMiddleware, async (req, res) => {
    let id = req.params.id;
    await Post.updateOne({
        id: id
    }, {
        title: req.body.title,
        text: req.body.text,
        description: req.body.description
    });
    res.send('Updated!');
})

module.exports = router;