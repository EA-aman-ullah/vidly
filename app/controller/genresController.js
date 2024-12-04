import Genre, { validateGenre } from "../models/genre.js";

export async function getGenres() {
  return await Genre.find().sort("name");
}

export async function createGenre(req) {
  const { error } = validateGenre(req.body);
  if (error) return { status: 400, body: error.details[0].message };

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  return { status: 201, body: genre };
}

export async function updateGenre(req) {
  const { error } = validateGenre(req.body);
  if (error) return { status: 400, body: error };

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre)
    return { status: 404, body: "The Genre with given ID was not found" };

  return { status: 201, body: genre };
}

export async function deleteGenre(id) {
  const genre = await Genre.findByIdAndDelete(id);

  if (!genre)
    return { status: 404, body: "The Genre with given ID was not found" };

  return { status: 201, body: genre };
}

export async function getGenreById(id) {
  const genre = await Genre.findById(id);

  if (!genre)
    return { status: 404, body: "The Genre with given ID was not found" };

  return { body: genre };
}
