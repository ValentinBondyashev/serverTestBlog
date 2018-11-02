const mongoose = require('mongoose');

const { Schema } = mongoose;

const TasksSchema = new Schema({
    userId: String,
    task: String,
    dateCreated: {
      type: Date,
      default: new Date
    },
    edit: {
        type: Boolean,
        default: false
    }
});

mongoose.model('Tasks', TasksSchema);
