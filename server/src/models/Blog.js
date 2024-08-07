const mongoose = require("mongoose"); //mongoose lai import gareko, database connect ni garxa schema banauna ni help garxa
const Joi = require("joi");

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
    approval: {
      type: String,
      default: "pending",
    },
  },
  //Post create gareko time database ma add gareko
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

const validate = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().label("Title"),
    summary: Joi.string().required().label("Summary"),
    content: Joi.string().required().label("Content"),
    image: Joi.string().required().label("Image"),
    user: Joi.string().required().label("User"),
  });
  return schema.validate(data);
};

module.exports = { Blog, validate };
