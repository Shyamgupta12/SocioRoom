const express = require("express");
const dbConnect = require("./database/connection");
const {userController} = require("./controllers/user");
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const dotenv = require("dotenv");

const router = require('./routes/userroute');
const cookieParser = require("cookie-parser");

dotenv.config();

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}));

app.use(express.urlencoded({extended:true}));

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
app.use("/", (req, res) => {
    res.send('<h1> This is homepage baby</h1>');
});