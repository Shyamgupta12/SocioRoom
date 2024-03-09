const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail", // or your email service provider
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PSWD,
            },
        });

        const info = await transporter.sendMail({
            from: "SocioRoom",
            to: email,
            subject: title,
            html: body,
        });

        console.log("Email Sent Successfully:", info);
        return info;
    } catch (error) {
        console.error("Error while sending mail:", error);
        throw error;
    }
};

module.exports = mailSender;