import bcrypt from "bcrypt";
import _ from "lodash";
import Joi from "joi";
import User from "../models/user.js";

export async function getToken(req) {
  const { error } = validate(req.body);
  if (error) return { status: 400, body: error.details[0].message };

  const user = await User.findOne({ email: req.body.email });
  if (!user) return { status: 400, body: "Invalid Email or Password" };

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return { status: 400, body: "Invalid Email or Password" };

  const token = user.generateAuthToken();

  return { status: 200, body: token };
}

const validate = (req) => {
  const schema = {
    email: Joi.string().max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.object(schema).validate(req);
};
