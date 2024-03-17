const express = require("express");
const {userController} = require("./controllers/user");
const { app, server } = require("./socket/socket");
const auth = require('./middlewares/Auth');

// connect DB
const dbConnect = require("./database/connection");
// const auth = require("./middlewares/Auth");

const bodyParser = require('body-parser');
// const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const dotenv = require("dotenv");


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

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


// changes start------ 
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const UserModel = require('./models/posts')
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination:(req,file,cb)=> {
        cb(null,'public/Images')
    },
    filename : (req , file ,cb) => {
        cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage
})

app.post('/upload', auth, upload.single('file'),(req,res)=>{
    // console.log("post send");
    console.log(req)
    UserModel.create({ userId: req.user._id, caption: req.body.content, image: req.file.filename })
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
})

app.get('/getImage', (req, res) => {
    UserModel.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: err.message }));
});
 
// changes over---------



// connecting database
dbConnect();

// default route
app.use("/", (req, res) => { // app.get krna agar kaam nhi kiya app.use to
    res.send('<h1> This is homepage baby ahira</h1>');
});
