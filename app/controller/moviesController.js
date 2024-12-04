import Movie, { validateMovie } from "../models/movie.js";
import Genre from "../models/genre.js";

export async function getMovies() {
  return await Movie.find().sort("name");
}

export async function createMovie(req) {
  const { error } = validateMovie(req.body);
  if (error) return { status: 400, body: error.details[0].message };

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return { status: 400, body: "Invalid Genre" };

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();

  return { status: 201, body: movie };
}

export async function updateMovie(req) {
  const { error } = validateMovie(req.body);
  if (error) return { status: 400, body: error.details[0].message };

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return { status: 400, body: "Invalid Genre" };

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie)
    return { status: 404, body: "The Movie with given ID was not found" };

  return { status: 201, body: movie };
}

export async function deleteMovie(id) {
  const movie = await Movie.findByIdAndDelete(id);

  if (!movie)
    return { status: 404, body: "The Movie with given ID was not found" };

  return { status: 201, body: movie };
}

export async function getMovieById(id) {
  const movie = await Movie.findById(id);

  if (!movie)
    return { status: 404, body: "The Movie with given ID was not found" };

  return { status: 200,  body: movie };
}
