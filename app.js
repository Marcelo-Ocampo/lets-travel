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

//Working space for new posts
let post1 = new Post({
    id: 2,
    title: 'Tower of Liberty',
    date: new Date(),
    description: 'Description goes here',
    text: 'Text goes here',
    country: 'US',
    imageURL: '/images/2.jpg'
});