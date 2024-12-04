import { getCurrentUser, registerUser } from "../controller/userController.js";
import auth from "../middleware/auth.js";
import express from "express";

const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await getCurrentUser(req);
  res.send(user);
});

router.post("/", async (req, res) => {
  const { status, header, body } = await registerUser(req);
  res.status(status).header("x-auth-token", header).send(body);
});

export default router;
