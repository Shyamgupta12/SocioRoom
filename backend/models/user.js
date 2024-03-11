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
        dob: {
            type: String,
        },
        about: {
            type: String,
            maxLength: 50
        },
        city: {
            type : String,
            maxLength: 20
        },
        verified: {
            type:Boolean,
            default:false
        },
        followers: {
            type: Array,
            default: [],
          },
          followings: {
            type: Array,
            default: [],
          },
          hobbies: {
            type: Array,
            default: [],
          },
        image : {
            type:String,
        },
        token : {
            type:String,
        },
        resetPasswordExpires: {
            type : Date,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);