const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
    nickName: String,
    message: String,
});

mongoose.model('Message', MessageSchema);
