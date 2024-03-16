const User = require("../models/user");

const chatusers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const user = await User.findOne({ _id: loggedInUserId });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user.followings);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { chatusers };

