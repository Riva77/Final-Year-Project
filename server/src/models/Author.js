const mongoose = require("mongoose");
const Joi = require("joi");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Author = mongoose.model("Author", authorSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
  });
  return schema.validate(data);
};

module.exports = { Author, validate };
