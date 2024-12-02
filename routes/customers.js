const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Customer, validate } = require("../models/customer");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find().sort("name");
    res.send(customers);
  } catch (ex) {
    res.status(500).send("Something Failed.");
  }
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();

  res.send(customer);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
    { new: true }
  );

  if (!customer)
    return res.status(404).send("The Genre with given ID was not found");

  res.send(customer);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer)
    return res.status(404).send("The Genre with given ID was not found");

  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res.status(404).send("The Genre with given ID was not found");

  res.send(customer);
});

module.exports = router;
