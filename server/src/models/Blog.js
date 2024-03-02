const mongoose = require("mongoose"); //mongoose lai import gareko, database connect ni garxa schema banauna ni help garxa

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //User ko reference deko. User chai foreign key
    },
  },
  //Post create gareko time database ma add gareko
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;