
 const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(() => {
        console.log(`Connection with the database is successful`);
    }).catch((e) => {
        console.log(`No connection`);
        console.error(e);
    });
}

module.exports = dbConnect;