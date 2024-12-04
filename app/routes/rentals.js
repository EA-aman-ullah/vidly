import {
  createRental,
  getRentalById,
  getRentals,
} from "../controller/rentalsController.js";
import auth from "../middleware/auth.js";

import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  const rental = await getRentals();
  res.send(rental);
});

router.post("/", auth, async (req, res) => {
  const { status, body } = await createRental(req);
  res.status(status).send(body);
});

router.get("/:id", async (req, res) => {
  const { body } = await getRentalById(req.params.id);
  res.send(body);
});

export default router;
