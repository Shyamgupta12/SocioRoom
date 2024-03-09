const User = require("../models/user");

exports.deleteAccount = async (req,res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success:false,
                message:"User Not Found."
            });
        }
        await User.findByIdAndDelete({_id:id});
        return res.status(200).json({
            success:true,
            message:"User Deleted Successfully."
        })
    }
    catch (error) {
        return res.status(500).json({
            success:false,
            message:"User cannot be deleted."
        });
    }
}