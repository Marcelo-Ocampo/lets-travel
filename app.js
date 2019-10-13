//------------ Packages --------------
let express = require('express');
let app = express();
let mongoose = require('mongoose');
let Post = require('./models/posts.js').Post;
let multer = require('multer');
//------------ Global Variables --------------
let id = 1; // for keeping track of posts with something other than DB-generated id
let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)
});

//------------ App uses --------------
app.use(express.static('public'));
app.use(express.json());
//Multer for saving image as file
app.use(multer({
    storage: imageStorage
}).single('imageFile'));

//------------ Connections --------------
app.listen(3000, () => console.log('Listening to 3000...'));

mongoose.connect('mongodb://localhost/travels')
    .then(() => console.log('Connected to mongoDB/travels...'))
    .catch(() => console.log('Error connecting to mongoDB/travels'));

//------------ DB requests --------------
app.get('/posts', async (req, res) => {
    let posts = await Post.find();
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    let reqBody = req.body;
    let imgPath;
    if (req.file) {
        imgPath = req.file.path.substring(req.file.path.indexOf('/'), req.file.path.length);
    } else {
        imgPath = reqBody.imageURL;
    }

    let newPost = new Post({
        id: id,
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageURL: imgPath
    })
    id++;
    await newPost.save();
    res.send('Created');
});