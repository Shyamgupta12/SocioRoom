const Conversation = require("../models/Conversations.js");
const Message = require("../models/Messages.js");
const { getReceiverSocketId, io } = require("../socket/socket.io");

exports.sendMessage = async (req, res) => {
    try {
      const { message } = req.body;
      const { id:receiverId } = req.params;
      
      // Check if req.user is defined before accessing _id
      const senderId = req.user && req.user._id;

      console.log("req.user:", req.user);
  
      if (!senderId) {
        // Handle the case where senderId is undefined (e.g., user not authenticated)
        return res.status(401).json({ error: "Unauthorized" });
      }

      // give all conversation between senderId and receiverId
      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      }); 
  
      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }
  
      const newMessage = new Message({
        senderId,
        receiverId,
        message,
      });
  
      if (newMessage) {
        conversation.messages.push(newMessage._id);
      }
  
      // Save both conversation and newMessage in parallel
      await Promise.all([conversation.save(), newMessage.save()]);
  
      // // SOCKET IO FUNCTIONALITY WILL GO HERE
      // const receiverSocketId = getReceiverSocketId(receiverId);
      // if (receiverSocketId) {
      //   // io.to(<socket_id>).emit() used to send events to a specific client
      //   io.to(receiverSocketId).emit("newMessage", newMessage);
      // }
  
      res.status(201).json(newMessage);
    } catch (error) {
      console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }

  };
  

exports.getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user.id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

    console.log(conversation);

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};