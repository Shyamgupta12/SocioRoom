const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

exports.auth = async (req, res, next) => {

    try {
        const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Your token is missing. Please Try Again."
            });
        }

        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            console.log("Token decoded is ");
            console.log(decode);

            req.body.username = decode.username;
            req.body._id = decode.id;
            console.log(req.body);
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is InValid."
            });
        }
        next();
    }
    catch (e) {
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token."
        })
    }
}
