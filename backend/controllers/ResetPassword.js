const User = require("../models/user");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

//resetpassword token
exports.resetPasswordToken = async (req, res) => {
    try {
        const email = req.body.email;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.json({
                success: false,
                message: "Your Email is Not Registered."
            });
        }

        const token = crypto.randomUUID();

        const UpdatedDetails = await User.findOneAndUpdate({ email: email }, {
            token: token,
            resetPasswordExpires: Date.now() + 5 * 60 * 1000
        }, { new: true });

        const url = `http://localhost:3000/update-password/${token}`;

        await mailSender(email, "Password Reset Link", `Password Reset Link: ${url}`);

        return res.json({
            success: true,
            message: "Email sent Successfully, please check email and change your password."
        })
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Some went wrong while sending reset password email."
        })
    }
}

exports.resetPassword = async (req, res) => {
    // token cames in body because of frontend.
    try {
        const { password, confirmPassword, token } = req.body;

        if (password !== confirmPassword) {
            res.status(400).json({
                success: false,
                message: "Password Not Matching."
            });
        }

        const userDetails = await User.findOne({ token: token });

        if (!userDetails) {
            return res.json({
                success: false,
                message: "Token is Invalid."
            });
        }

        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success: false,
                message: "Token Expires, Please regenerate it."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate({ token: token }, { password: hashedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Password reset Successfullly."
        })
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Some went wrong while sending resetting the password."
        })
    }
}