const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      maxlength: 500, // Corrected 'max' to 'maxlength'
    },
    image: {
      type: String,
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      default: [],
    },
  },
  { timestamps: true }
);

 const UserModel = mongoose.model("Post", PostSchema);

// module.exports = mongoose.model("Post", PostSchema);
 module.exports = UserModel