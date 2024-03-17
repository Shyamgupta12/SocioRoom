const Post = require("../models/posts");

exports.Post = async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        return res.status(200).json({
            success: true,
            savedPost,
            message: "Post Uploaded"
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed to Create Post. Please try again after some time."
        });
    }
}

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await Post.updateOne({ _id: req.params.id }, { $set: req.body });
            res.status(200).json("the post has been updated");
        } else {
            res.status(403).json("you can update only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
        } else {
            res.status(403).json("you can delete only your post");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post has been liked");
        } 
        else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.getuserpost = async (req,res) => {
    try {
        const currentUser = req.user._id;
        const userPosts = await Post.find({ userId: currentUser._id });

        res.status(200).json(userPosts);
  } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
exports.feed = async (req, res) => {
    try {
        const userid = req.user.id;
        const posts = await Post.find().populate("username", "username image");
        // const post = await (posts, userid);
        
        console.log(posts);

        res.status(201).json(posts);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

