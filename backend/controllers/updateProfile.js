const User = require("../models/user");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/mailSender");

exports.updateProfile = async (req, res) => {
    try {
        if (req.body.userId !== req.params.id) {
            return res.status(403).json({
                success: false,
                message: "You can update only your account."
            });
        }

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });

        return res.status(200).json({
            success: true,
            message: "Your Account has been updated.",
            userDetails: user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Unable to update details now. Please try again later.",
        });
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const userDetails = await User.findById(id);

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User Not Found.",
            });
        }

        await User.findByIdAndDelete({ _id: id });

        return res.status(200).json({
            success: true,
            message: "User Deleted Successfully.",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be deleted.",
        });
    }
};

exports.follow = async (req, res) => {
    try {
        if (req.body.userId === req.params.id) {
            return res.status(403).json("You can't follow yourself");
        }

        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);

        if (!user || !currentUser) {
            return res.status(404).json("User not found");
        }

        if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({ $push: { followers: req.body.userId } });
            await currentUser.updateOne({ $push: { followings: req.params.id } });
            const email = user.email;
            await mailSender(email, "From SocioRoom : Followers Increased", `Hurray! ${user.username}, ${currentUser.username} started following you.`);

            return res.status(200).json("User has been followed");
        } else {
            return res.status(403).json("You already follow this user");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json("Internal Server Error");
    }
};


exports.unfollow = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                return res.status(200).json("user has been unfollowed");
            } else {
                res.status(403).json("you dont follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("you cant unfollow yourself");
    }
};