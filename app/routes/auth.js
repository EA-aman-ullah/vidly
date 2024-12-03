import bcrypt from "bcrypt";
import _ from "lodash";
import Joi from "joi";
import User from "../models/user.js";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invailed Email or Password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invailed Email or Password");

  const token = user.generateAuthToken();
  res.send(token);
});

const validate = (req) => {
  const schema = {
    email: Joi.string().max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.object(schema).validate(req);
};

export default router;
