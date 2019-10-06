let express = require('express');
let app = express();
let mongoose = require('mongoose');
let Post = require('./models/posts.js').Post;

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