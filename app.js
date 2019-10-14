//------------ Packages --------------
let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer');
let postsRouter = require('./routes/posts');

//------------ Connections --------------
app.listen(3000, () => console.log('Listening to 3000...'));

mongoose.connect('mongodb://localhost/travels')
    .then(() => console.log('Connected to mongoDB/travels...'))
    .catch(() => console.log('Error connecting to mongoDB/travels'));

//------------ App uses --------------
app.use(express.static('public'));
app.use(express.json());

//Multer for saving image as file
let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)
});
app.use(multer({
    storage: imageStorage
}).single('imageFile'));

//------------ Routers --------------
app.use('/posts', postsRouter);