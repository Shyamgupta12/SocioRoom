const express = require('express');
const router = express.Router();

const {usersignup, userlogin, sendOTP} = require('../controllers/user');
const {resetPasswordToken, resetPassword} = require("../controllers/ResetPassword");
const {updateProfile, deleteProfile, follow, unfollow} = require("../controllers/updateProfile");
const {Post, updatePost, deletePost, likePost} = require("../controllers/posts");

router.post("/usersignup", usersignup);
router.post("/sendotp", sendOTP);
router.post("/userlogin", userlogin);
router.post("/reset-password-token", resetPasswordToken);
router.post("/resetPassword", resetPassword);
router.put("/:id", updateProfile);
router.delete("/:id", deleteProfile);
router.put("/:id/follow", follow);
router.put("/:id/unfollow", unfollow);
router.post("/posts", Post);
router.put("/:id/posts", updatePost);
router.delete("/:id/posts", deletePost);
router.put("/:id/like", likePost);

module.exports = router;