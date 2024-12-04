import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
} from "../controller/customersController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await getCustomers();
  res.send(customers);
});

router.post("/", auth, async (req, res) => {
  const { status, body } = await createCustomer(req);
  res.status(status).send(body);
});

router.put("/:id", auth, async (req, res) => {
  const { status, body } = await updateCustomer(req);
  res.status(status).send(body);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const { status, body } = await deleteCustomer(req.params.id);
  res.status(status).send(body);
});

router.get("/:id", async (req, res) => {
  const { status, body } = await getCustomerById(req.params.id);
  res.status(status).send(body);
});

export default router;
