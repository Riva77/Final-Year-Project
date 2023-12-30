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
  quantity: {
    type: Number,
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
  pages: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    price: Joi.number().required().label("Price"),
    description: Joi.string().required().label("Description"),
    quantity: Joi.string().required().label("Quantity"),
    image: Joi.string().required().label("Image"),
    author: Joi.string().required().label("Author"),
    synopsis: Joi.string().required().label("Synopsis"),
    genre: Joi.string().required().label("Genre"),
    pages: Joi.number().required().label("Pages"),
  });
  return schema.validate(data);
};

module.exports = { Product, validate };
