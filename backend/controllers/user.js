const User = require("../models/user");
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const OTP = require("../models/otp");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");

require("dotenv").config();

const app = express();

exports.sendOTP = async (req, res) => {
    try {
        const {email} = req.body;

        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User Already Registered."
            });
        }

        var otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
        console.log("OTP Generated:", otp);

        let isOTPPresent = await OTP.findOne({ otp });

        while (isOTPPresent) {
            otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
            isOTPPresent = await OTP.findOne({ otp });
        }

        const otpPayload = { email, otp };

        const checkOtpPresent = await OTP.findOne({ email });

        if (!checkOtpPresent) {
            const otpBody = await OTP.create(otpPayload);
            console.log(otpBody);
        }
        else {
            const result = await OTP.updateOne({ email }, { $set: otpPayload }, { upsert: true });
            console.log(result);
        }

        res.status(200).json({
            success: true,
            message: "OTP sent successfully.",
            otp
        });
    } catch (e) {
        console.log("Error while Generating OTP:", e);
        return res.status(500).json({
            success: false,
            message: e.message
        });
    }
};

exports.usersignup = async(req, res) => {
    try {
        const {firstname, lastname, username, email, password, confirmpassword, gender, profession, age, verified, hobbies, otp} = req.body;
        console.log(req.body); 
        
        if(!firstname || !lastname || !username || !email || !password || !confirmpassword || !gender || !profession || !age || !verified || !hobbies) {
            return res.status(403).json({
                success:false,
                message:"All fields are required.",
            })
        }

        // password match or not
        if (password !== confirmpassword) {
            return res.status(403).json({
                success:false,
                message:"Password don't match.",
            })
        }
        
        // finding that user is already registered or not 
        const existingUsername = await User.findOne({username:username});
        const existingEmail = await User.findOne({email:email});
        
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

        // otp jani chahiye
        

        // finding the most recent otp
        const recentOtp = await OTP.find({email}).populate();
        console.log(recentOtp);

        // validate otp
        // if (recentOtp.length == 0) {
        //     return res.status(400).json({
        //         success:false,
        //         message:"OTP Not found."
        //     })
        // } 
        // else
         if (otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success:false,
                message:"Invalid OTP."
            })
        }

        //Hashing of password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Saved User info in Database
        const newUser = new User({
            firstname, 
            lastname, 
            username, 
            email, 
            password: hashedPassword,
            gender,
            profession,
            age,
            verified,
            hobbies,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`,
        });
        
        await newUser.save();
        
        console.log(User);

        // send a json response and success flag
        res.status(201).json({
            success:true,
            data:User,
            message: "User Registered Successfully."
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

// user login route
exports.userlogin = async(req, res) => {
    try {
        const {email, password} = req.body;
        console.log(req.body);
        
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

        const loginUser = await User.findOne({email:email}).populate().exec();
        console.log(loginUser);
        
        // if not a registered User
        if (!loginUser) {
            return res.status(400).json({
                success: false,
                message: "Invalid email. Please check your credentials.",
            });
        }
        else {
            const passwordMatch = await bcrypt.compare(password, loginUser.password);

            if (passwordMatch) {
                //generate JWT, after password matching
                const payload = {
                    email: loginUser.email,
                    id: loginUser._id,
                }
                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn:"2h",
                });
                loginUser.token = token;
                loginUser.password = undefined;
                
                const options = {
                    expires: new Date(Date.now() + 3*24*60*60*1000),
                    httpOnly:true,
                }

                res.cookie("token", token, options).status(200).json({
                    success:true,
                    token,
                    // User,
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

exports.changePassword = async (req, res) => {
    try{
        const {username, oldpassword, newpassword, confirmpassword} = req.body;
        const loginuser = await user.findOne({username:username}).populate().exec();
        
        let oldhashedPswd;
        oldhashedPswd = await bcrypt.hash(oldpassword, 10);

        if(loginuser.password !== oldhashedPswd) {
            return res.status(401).json({
                success:false,
                message:"Old Password is wrong. Please try again.",
            })
        }

        if(newpassword !== confirmpassword){
            return res.status(401).json({
                success:false,
                message:"New password and confirm password are not same."
            })
        }

        // Hashing of Password
        let hashedPswd;

        try {
            hashedPswd = await bcrypt.hash(newpassword, 10);
        }
        catch(err) {
            return res.status(500).json(
                {
                    success: false,
                    message: "Error in Hashing Password",
                }
            )
        }
    
        await user.updateOne({username:username},{password:hashedPswd});
        changePasswordemail(loginuser.email);

        } catch(err){
            console.error(err);
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Password cannot be changed.",
            })
        }
}
