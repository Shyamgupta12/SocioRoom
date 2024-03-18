const mongoose = require("mongoose");

  // changes  start----
  const {ObjectId} = mongoose.Schema.Types
  // changes endd------

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

module.exports = mongoose.model("Post", PostSchema);