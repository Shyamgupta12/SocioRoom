const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            maxLenth: 50,
            trim:true
        },
        lastname: {
            type: String,
            required: true,
            maxLenth: 50,
            trim:true
        },
        username: {
            type: String,
            required: true,
            maxLenth: 50,
            unique: true,
            trim:true
        },
        email: {
            type: String,
            required: true,
            maxLenth: 50,
            unique: true,
            trim:true
        },
        password: {
            type: String,
            required: true,
            minLenth: 8,
        },
        gender: {
            type: String,
            required: true,
        },
        profession: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        verified: {
            type:Boolean,
            default:false
        },
        friends: [
            {
                type: String,
            }
        ],
        hobbies: [
            {
                type: String,
            }
        ],
        image : {
            type:String,
        },
        token : {
            type:String,
        },
        resetPasswordExpires: {
            type : Date,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    }
)

module.exports = mongoose.model("User", userSchema);