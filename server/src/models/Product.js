const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    price: Joi.number().required().label("Price"),
    description: Joi.string().required().label("Description"),
    image: Joi.string().required().label("Image"),
    author: Joi.string().required().label("Author"),
    synopsis: Joi.string().required().label("Synopsis"),
    genre: Joi.string().required().label("Genre"),
    publisher: Joi.string().required().label("Publisher"),
    pages: Joi.number().required().label("Pages"),
    date: Joi.date().required().label("Date"),
  });
  return schema.validate(data);
};

module.exports = { Product, validate };
