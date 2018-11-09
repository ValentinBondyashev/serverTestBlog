const mongoose = require('mongoose');

const { Schema } = mongoose;

const FileSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    path: {
        type: String,
        required: true
    }
}, {timestamp: true});

FileSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('File', FileSchema);
