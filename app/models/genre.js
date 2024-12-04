import Joi from "joi";
import mongoose from "mongoose";

export const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});
const Genre = mongoose.model("Genre", genreSchema);

export const validateGenre = (genre) => {
  const Schema = {
    name: Joi.string().min(3).max(50).required(),
  };

  return Joi.object(Schema).validate(genre);
};

export default Genre;
