const express = require("express");
const {userController} = require("./controllers/user");

// connect DB
const dbConnect = require("./database/connection");

const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const dotenv = require("dotenv");

 const Conversations = require("./models/Conversations");

const router = require('./routes/userroute');
const cookieParser = require("cookie-parser");
// const Conversation = require("./models/Conversations");
const Messages  = require('./models/Messages');

dotenv.config();

app.use(cors({
    origin:"http://localhost:3001",
    credentials:true,
}));

app.use(express.urlencoded({extended:false}));

// to parse the data
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/v1", router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// connecting database
dbConnect();

// default route
app.use("/", (req, res) => { // app.get krna agar kaam nhi kiya app.use to
    res.send('<h1> This is homepage baby ahira</h1>');
});

// conversation between sender and receiver start or not

app.post('/api/conversation',async(req,res)=>{
    try{
        const {senderId,receiverId} = req.body;
        const newConversation = new Conversation({members: [senderId,receiverId]});
        await newConversation.save();
        res.status(200).send('Conversation created successfully');
    }
    catch(error){
        console.log(error,'Error')
    }
})

// conversations users that our user chats with
app.get('/api/conversation/:userId',async(req,res)=>{
    try{
        const userId = req.params.userId;
        const Conversations = await Conversations.find({members:{$in: [userId]}});
        const conversationUserData = Promise.all(conversations.map(async(conversion) =>{
            const  receiverId = conversation.members.find((member) => member != userId);
           const user  =  await Users.findById(receiverId);
           return {user:{email:user.email, fullName: user.fullName},conversationId: conversation.
        _id }
        }))
        res.status(200).json(await conversationUserData);
    }
    catch(error){
        console.log(error,'Error')
    }
})

// messaging  
app.post('/api/message',async(req,res)=>{
    try{
        const {conversationId,senderId,message,receiverId = ''} = req.body;
        if(!senderId || !message) return res.status(200).send('Please fill all required fields');
        if(!conversationId && receiverId){
            const newConversation = new Conversations({members: [senderId,receiverId]});
            await newConversation.save();
            const newMessage = new Messages({conversationId: newConversation._id,senderId,message});
            await newMessage.save();
            return res.status(200).send('Message sent successfully');
        }
        else{
            return res.status(400).send('Please fill all required fields')
        }
        const newMessage = new Messages({conversationId, senderId,message});
        await newMessage.save();
        res.status(200).send('Message sent successfully');
    }
    catch(error){
        console.log(error,'Error')
    }
})

app.get('/api/message/:conversationId',async(req,res)=>{
    try{
        const conversationId = req.params.conversationId;
        if(!conversationId === 'new') return res.status(200).json([]);
        const messages = await Messages.find({conversationId});
        const messageUserData  = Promise.all(messages.map(async(message)=>{
            const user = await Users.findById(message.senderId);
            return {user: {email: user.email, fullName:user.firstName},message: message.message }

        }))
        res.status(200).json(await messageUserData)
    }
    catch(error){
        console.log("Error",error)
    }
})

app.get('/api/users',async(req,res)=>{
    try{
        const users = await Users.find();
        const userData = Promise.all(users.map(async (user)=>{
            return {user : {email: user.email,fullName:user.firstname},userId : user._id}
        }))
        res.status(200).json(await usersData);
    }
    catch(error){
        console.log('Error',error)
    }
})
