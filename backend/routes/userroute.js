const express = require('express');
const router = express.Router();
const auth = require("../middlewares/Auth");

const {usersignup, userlogin, sendOTP, logout} = require('../controllers/user');
const {resetPasswordToken, resetPassword} = require("../controllers/ResetPassword");
const {updateProfile, deleteProfile, follow, unfollow} = require("../controllers/updateProfile");
const {Post, updatePost, deletePost, likePost} = require("../controllers/posts");
const {Conversation , getConversation, message, messageId, getusers} = require("../controllers/Conversation");
const {sendMessage, getMessages} = require("../controllers/chat");
const {chatusers} = require("../controllers/chatusers");
const {getusernames} = require("../controllers/user");

router.post("/usersignup", usersignup);
router.post("/sendotp", sendOTP);
router.post("/userlogin", userlogin);
router.post("/logout", logout);
router.post("/reset-password-token", resetPasswordToken);
router.post("/resetPassword", resetPassword);
router.put("/:id", updateProfile);
router.delete("/:id", deleteProfile);
router.put("/:id/follow", auth , follow);
router.put("/:id/unfollow", auth, unfollow);
router.post("/posts", Post);
router.put("/:id/posts", updatePost);
router.delete("/:id/posts", deletePost);
router.put("/:id/like", likePost);
// router.post("/conversation", Conversation);
// router.get("/conversation/:userId", getConversation);
// router.post("/message", message);
// router.get("/message/:conversationId", messageId);    // receive all msg of that conversation id

// Assuming auth middleware is correctly implemented and sets req.user
router.post('/send/:id' , auth, sendMessage);
router.get('/getmessages/:id', auth, getMessages);
router.get('/chatusers', auth , chatusers);
router.get('/getusernames', auth, getusernames);

module.exports = router;