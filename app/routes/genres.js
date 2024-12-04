import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import express from "express";
import {
  createGenre,
  deleteGenre,
  getGenreById,
  getGenres,
  updateGenre,
} from "../controller/genresController.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await getGenres();
  res.send(genres);
});

router.post("/", auth, async (req, res) => {
  const { status, body } = await createGenre(req);
  res.status(status).send(body);
});

router.put("/:id", auth, async (req, res) => {
  const { status, body } = await updateGenre(req);
  res.status(status).send(body);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const { status, body } = await deleteGenre(req.params.id);
  res.status(status).send(body);
});

router.get("/:id", async (req, res) => {
  const { body } = await getGenreById(req.params.id);
  res.send(body);
});

export default router;
