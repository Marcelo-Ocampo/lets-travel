let Post = require('../models/posts.js').Post;
let express = require('express');
let router = express.Router();

router.get('/', async (req, res) => {
    let postID = req.query.id;
    let posts = await Post.findOne({
        id: postID
    });
    res.render('sight', {
        title: posts.title,
        date: posts.date,
        text: posts.text,
        imageURL: posts.imageURL
    })
});

module.exports = router;