let express = require('express');
let app = express();
let mongoose = require('mongoose');
let Post = require('./models/posts.js').Post;
let id = 1; // for keeping track of posts with something other than DB-generated id

app.use(express.static('public'));
app.use(express.json());

//Connections to server and DB
app.listen(3000, () => console.log('Listening to 3000...'));

mongoose.connect('mongodb://localhost/travels')
    .then(() => console.log('Connected to mongoDB/travels...'))
    .catch(() => console.log('Error connecting to mongoDB/travels'));

//DB requests
app.get('/posts', async (req, res) => {
    let posts = await Post.find();
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    let reqBody = req.body;
    let newPost = new Post({
        id: id,
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageURL: reqBody.imageURL
    })
    id++;
    await newPost.save();
    res.send('Created');
});