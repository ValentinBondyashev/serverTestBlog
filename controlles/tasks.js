const mongoose = require('mongoose');
const Tasks = mongoose.model('Tasks');

function getAllTasks () {
    return async (req, res) => {
        const { payload: { id } } = req;
        const tasks = await Tasks.find({userId: id});
        return res.json({ tasks: tasks })
    }
}

function createTasks () {
    return async (req, res) => {
        const { body: { task } } = req;
        const finalTask = await Tasks(task).save();
        return  res.json({ task: finalTask });
    }
}

function deleteTask () {
    return async (req, res) => {
        const { params: { id } } = req;
        const task = await Tasks.findByIdAndRemove(id);
        return res.json({ task: task });
    }
}

function editTask () {
    return async (req, res) => {
        const { body } = req;
        const task = await Tasks.update({_id: body.id}, {task: body.task, dateCreated: new Date});
        return res.json({ task: task });
    }
}

module.exports = {
    getAllTasks,
    createTasks,
    deleteTask,
    editTask
};
