const user = require("../models/user");
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');

require("dotenv").config();

const app = express();

exports.usersignup = async(req, res) => {
    try {
        const {firstname, lastname, username, email, password, confirmpassword, gender, profession, age, verified, hobbies, friends} = req.body;
        console.log(req.body); 
        
        if(!firstname || !lastname || !username || !email || !password || !confirmpassword /*|| !gender || !profession || !age || !verified || !hobbies || !friends*/) {
            return res.status(403).json({
                success:false,
                message:"All fields are required.",
            })
        }

        if (password !== confirmpassword) {
            return res.status(403).json({
                success:false,
                message:"Password don't match.",
            })
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // finding that user is already registered or not 
        const existingUsername = await user.findOne({username:username});
        const existingEmail = await user.findOne({email:email});
        
        if (existingUsername) {
            return res.status(400).json({
                success:false,
                message:"Username not available, Be More Unique."
            })
        }
        if (existingEmail) {
            return res.status(400).json({
                success:false,
                message:"User Already Exist."
            })
        }

        // Saved User info in Database
        const User = new user({
            firstname, 
            lastname, 
            username, 
            email, 
            password:hashedPassword,
            // gender,
            // profession,
            // age,
            // verified,
            // hobbies,
            // friends,
        });

        await User.save();

        // send a json response and success flag
        res.status(201).json({
            success:true,
            data:User,
            message: "An Email sent to your Email Please Verify."
        });
    }

    catch(err) {
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                success: false,
                message: "User cannot be registered, Please try again later",
            }
        )
    }
}

const createtoken = async() => {
    const token = await jwt.sign({_id:"65eb43fc119f892c84de2235"},"mynameisanmolsahuandiamfromjhansi");
    expiresIn:"2 minutes",
    console.log(token);

    const userVer = await jwt.verify(token, "mynameisanmolsahuandiamfromjhansi");
    console.log(userVer);
}

createtoken();

// user login route
exports.userlogin = async(req, res) => {
    try {
        const {email, password} = req.body;
        
        if (!email) {
            return res.status(400).json({
                success:false,
                message:"Please fill out your Email."
            })
        }
        if (!password) {
            return res.status(400).json({
                success:false,
                message:"Please fill out your Password."
            })
        }

        let loginUser = await user.findOne({email:email}).populate().exec();
        console.log(loginUser);
        
        // if not a registered User
        if (!loginUser) {
            return res.status(400).json({
                success:false,  
                message:"User is not registered. Please Sign Up first."
            })
        } 
        else {
            const passwordMatch = await bcrypt.compare(password, loginUser.password);

            if (passwordMatch) {
                return res.status(200).json({
                    success:true,
                    message:"User Logged In Successfully."
                })
            }
            else {
                return res.status(400).json({
                    success:false,
                    message:"Wrong Password."
                }) 
            }
        }
    }
    catch(err) {
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                success: false,
                message: "User cannot be logged in, Please try again later",
            }
        )
    }
}