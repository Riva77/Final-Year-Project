const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  favoriteBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  try {
    const token = jwt.sign(
      { _id: this._id, role: this.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    return token;
  } catch (error) {
    throw new Error("Token Generation Error: " + error.message);
  }
};

const User = mongoose.model("User", userSchema);

const validate = (data) => {
  const schema = joi.object({
    firstName: joi.string().required().label("First Name"),
    lastName: joi.string().required().label("Last Name"),
    email: joi.string().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    role: joi.string().label("Role"),
  });

  return schema.validate(data);
};

module.exports = { User, validate };
