const mongoose = require('mongoose');
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            maxLenth: 50,
            unique: true,
            trim: true
        },
        otp: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            // expires: 5 * 60 * 60,
        }, 
    }
);

// function to send Emails
async function sendVerificationEmail(email,otp) {
    try {
        const mailResponse = await mailSender(email,"Verification Email from SocioRoom:",`Please Fill the Otp on SocioRoom to start connecting with others. ${otp}`);
        console.log("Email Sent Successfully:", mailResponse);
    }
    catch (error) {
        console.log("Error while sending mail:", error);
        throw error;
    }
}

OTPSchema.pre("save", async function(next) {
    try {
        await sendVerificationEmail(this.email, this.otp);
        next();
    } catch (error) {
        console.error("Error sending verification email:", error);
        next(error); // Pass the error to the next middleware to handle
    }
});

module.exports = mongoose.model("OTP", OTPSchema);