const Conversations = require("../models/Conversations");
const User = require("../models/user");
const Messages = require("../models/Messages");

// Kin Dono ke Beech conv start hui
exports.Conversation = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const newConversation = new Conversations({ members: [senderId, receiverId] });
        await newConversation.save();
        res.status(200).send('Conversation created successfully');
    }
    catch (error) {
        console.log(error, 'Error')
    }
}

// conversations with the people that our user chats with
exports.getConversation = async (req, res) => {
    try {
        const userId = req.params.userId;

        const conversations = await Conversations.find({ members: { $in: [userId] } });

        const conversationUserData = await Promise.all(conversations.map(async (conversation) => {
            const receiverId = conversation.members.find((member) => member != userId);

            const user = await User.findById(receiverId);

            return {
                user: { email: user.email, firstname: user.firstname },
                conversationId: conversation._id
            };
        }));

        res.status(200).json(conversationUserData);
    } catch (error) {
        console.log(error, 'Error while getting conversations.');
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// messaging  
exports.message = async (req, res) => {
    try {
        const { conversationId, senderId, message, receiverId = '' } = req.body;
        
        if (!senderId || !message) {
            return res.status(200).send('Please fill all required fields'); 
        }

        if (!conversationId && receiverId) {
            const newConversation = new Conversations({ members: [senderId, receiverId] });
            await newConversation.save();
            const newMessage = new Messages({ conversationId, senderId, message });
            await newMessage.save();
            return res.status(200).send('Message sent successfully');
        } 
        else if (!conversationId && !receiverId) {
            return res.status(400).send('Please fill all required fields');
        }
        const newMessage = new Messages({ conversationId, senderId, message });
        await newMessage.save();
        return res.status(200).send('Message sent successfully'); 
    } catch (error) {
        console.log(error, 'Error');
        return res.status(500).send('Internal Server Error');
    }
}


exports.messageId = async (req, res) => {
    try {
        const conversationId = req.params.conversationId;
        const messages = await Messages.find({ conversationId });
        // const messageUserData = Promise.all(messages.map(async (message) => {
        //     const user = await User.findById(message.senderId);
        //     return { user }

        // }))
        res.status(200).json(await messages)
    }
    catch (error) {
        console.log("Error", error)
    }
}

exports.getusers = async (req, res) => {
    try {
        const users = await User.find();
        const userData = Promise.all(users.map(async (user) => {
            return { user: { email: user.email, fullName: user.firstname }, userId: user._id }
        }))
        res.status(200).json(await userData);
    }
    catch (error) {
        console.log('Error', error)
    }
}
