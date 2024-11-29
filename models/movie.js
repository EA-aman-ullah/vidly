const Joi = require("joi");
const { genreSchema } = require("./genre");
const mongoose = require("mongoose");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 5,
    },
    numberInStock: {
      type: Number,
      required: true,
      minlength: 0,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      minlength: 0,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
  })
);

function validateMovie(movie) {
  const Schema = {
    title: Joi.string().min(3).max(50).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  };

  return Joi.object(Schema).validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;
