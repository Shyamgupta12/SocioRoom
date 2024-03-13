const express = require("express");
const {userController} = require("./controllers/user");

// connect DB
const dbConnect = require("./database/connection");

const bodyParser = require('body-parser');
const app = express();
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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// connecting database
dbConnect();

// default route
app.use("/", (req, res) => { // app.get krna agar kaam nhi kiya app.use to
    res.send('<h1> This is homepage baby ahira</h1>');
});
