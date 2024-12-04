import express from "express";
import { getToken } from "../controller/authController.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { status, body } = await getToken(req);
  res.status(status).send(body);
});

export default router;
