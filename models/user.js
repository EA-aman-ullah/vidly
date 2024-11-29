const Joi = require("joi");
const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 50,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
  })
);

const validateUser = (user) => {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.object(schema).validate(user);
};

exports.User = User;
exports.validate = validateUser;
