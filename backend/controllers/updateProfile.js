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
        const userToFollow = await User.findById(req.params.id);
        
        if (!userToFollow) {
            return res.status(404).json("User to follow not found");
        }
        
        if (req.user.id === req.params.id) {
            return res.status(403).json("You can't follow yourself");
        }

        const currentUser = await User.findById(req.user.id);

        if (!currentUser) {
            return res.status(404).json("Current user not found");
        }

        if (!userToFollow.followers.some(u => u._id.equals(req.user.id))) {
            await userToFollow.updateOne({ $push: { followers: currentUser } });
            await currentUser.updateOne({ $push: { followings: userToFollow } });

            const email = userToFollow.email;
            await mailSender(email, "From SocioRoom: Followers Increased", `Hurray! ${userToFollow.username}, ${currentUser.username} started following you.`);

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
    if (req.user.id !== req.params.id) {
        try {
            const userToUnfollow = await User.findById(req.params.id);
            const currentUser = await User.findById(req.user.id);
            
            if (!userToUnfollow || !currentUser) {
                return res.status(404).json("User to unfollow or current user not found");
            }

            if (currentUser.followings.some(u => u._id.equals(req.params.id))) {
                // Remove userToUnfollow from currentUser's followings
                currentUser.followings = currentUser.followings.filter(u => !u._id.equals(req.params.id));
                // Remove currentUser from userToUnfollow's followers
                userToUnfollow.followers = userToUnfollow.followers.filter(u => !u._id.equals(req.user.id));

                const email = userToUnfollow.email;
                await mailSender(email, "From SocioRoom: Followers Decreased", `Sorry to say! ${userToUnfollow.username}, ${currentUser.username} started unfollowing you.`);

                // Save updated currentUser and userToUnfollow
                await currentUser.save();
                await userToUnfollow.save();

                return res.status(200).json("User has been unfollowed");
            } else {
                res.status(403).json("You don't follow this user");
            }
        } catch (err) {
            console.error(err);
            res.status(500).json("Internal Server Error");
        }
    } else {
        res.status(403).json("You can't unfollow yourself");
    }
};
