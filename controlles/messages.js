const mongoose = require('mongoose');
const Message = mongoose.model('Message');

function getAll () {
    return async (req, res) => {
        const messages = await Message.find({});
        return res.json({ messages });
    }
}

function sendMessage () {
    return async (req, res) => {
        const { body: { message } } = req;
        const finalMessage = await new Message(message).save();
        return res.json({ message: finalMessage });
    }
}

module.exports = {
    getAll,
    sendMessage
};
