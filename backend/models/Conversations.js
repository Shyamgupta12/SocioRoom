const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    members: {
        type: Array,
        required: true,
    },
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
