import bcrypt from "bcrypt";
import _ from "lodash";
import User, { validateUser } from "../models/user.js";

export async function getCurrentUser(req) {
  return await User.findById(req.user._id).select("-password");
}

export async function registerUser(req) {
  const { error } = validateUser(req.body);
  if (error) return { status: 400, body: error.details[0].message };

  let user = await User.findOne({ email: req.body.email });
  if (user) return { status: 400, body: "User Already Registered" };

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();

  let savedUser = _.pick(user, ["_id", "name", "email"]);

  const token = user.generateAuthToken();

  return { status: 201, header: token, body: savedUser };
}
