const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

const validateGenre = (genre) => {
  const Schema = {
    name: Joi.string().min(3).max(50).required(),
  };

  return Joi.object(Schema).validate(genre);
};

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validate = validateGenre;
