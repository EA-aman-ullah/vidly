import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import express from "express";
import {
  createMovie,
  deleteMovie,
  getMovieById,
  getMovies,
  updateMovie,
} from "../controller/moviesController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await getMovies();
  res.send(movies);
});

router.post("/", auth, async (req, res) => {
  const { status, body } = await createMovie(req);
  res.status(status).send(body);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { status, body } = await updateMovie(req);
  res.status(status).send(body);
});

router.delete("/:id", auth, async (req, res) => {
  const { status, body } = await deleteMovie(req.params.id);
  res.status(status).send(body);
});

router.get("/:id", async (req, res) => {
  const { status, body } = await getMovieById(req.params.id);
  res.status(status).send(body);
});

export default router;
