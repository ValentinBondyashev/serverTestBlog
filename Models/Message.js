const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
    nickName: String,
    message: String,
});

module.exports = mongoose.model('Message', MessageSchema);
