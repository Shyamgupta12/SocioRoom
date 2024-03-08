const express = require("express");
const dbConnect = require("./database/connection");
const {userController} = require("./controllers/user");
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const router = require('./routes/userroute');

// to parse the data
app.use(express.json());

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