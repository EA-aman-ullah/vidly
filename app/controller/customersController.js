import Customer, { validateCustomer } from "../models/customer.js";

export async function getCustomers() {
  return await Customer.find().sort("name");
}

export async function createCustomer(req) {
  const { error } = validateCustomer(req.body);
  if (error) return { status: 400, body: error.details[0].message };

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();

  return { status: 201, body: customer };
}

export async function updateCustomer(req) {
  const { error } = validateCustomer(req.body);
  if (error) return { status: 400, body: error };

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
    { new: true }
  );

  if (!customer)
    return { status: 404, body: "The Customer with given ID was not found" };

  return { status: 201, body: customer };
}

export async function deleteCustomer(id) {
  const customer = await Customer.findByIdAndDelete(id);

  if (!customer)
    return { status: 404, body: "The Customer with given ID was not found" };

  return { status: 201, body: customer };
}

export async function getCustomerById(id) {
  const customer = await Customer.findById(id);

  if (!customer)
    return { status: 404, body: "The Customer with given ID was not found" };

  return { body: customer };
}
