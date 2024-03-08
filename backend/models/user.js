const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            maxLenth: 50,
        },
        lastname: {
            type: String,
            required: true,
            maxLenth: 50,
        },
        username: {
            type: String,
            required: true,
            maxLenth: 50,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            maxLenth: 50,
            unique: true,
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
                required: true,
            }
        ],
        hobbies: [
            {
                type: String,
                required: true,
            }
        ],
        createdAt: {
            type: Date,
            required: true,
            default: Date.now(),
        },
    }
)

module.exports = mongoose.model("User", userSchema);