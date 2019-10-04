let express = require('express');
let app = express();

app.use(express.static('public'));
app.use(express.json());

app.listen(3000, () => console.log('Listening to 3000...'));