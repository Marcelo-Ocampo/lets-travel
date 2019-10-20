let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let mailsSchema = new Schema({
    id: String,
    name: String,
    date: Date,
    message: String,
    email: String
});

let Mail = mongoose.model('Mail', mailsSchema, 'mails');

module.exports = {
    Mail
};