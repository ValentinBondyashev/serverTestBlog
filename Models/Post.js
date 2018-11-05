const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
    userName: String,
    userId: String,
    title: String,
    text: String,
    dateCreated: {
        type: Date,
        default: new Date
    }
});

mongoose.model('Post', PostSchema);
