import Movie from "../models/movie.js";
import Customer from "../models/customer.js";
import Rental, { validateRental } from "../models/rantel.js";
import mongoose from "mongoose";

export async function getRentals() {
  return await Rental.find().sort("-dateOut");
}

export async function createRental(req) {
  const { error } = validateRental(req.body);
  if (error) return { status: 400, body: error.details[0].message };

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return { status: 400, body: "Invalid Customer" };

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return { status: 400, body: "Invalid Movie" };

  if (movie.numberInStock === 0)
    return { status: 400, body: "Movie Not in stock" };

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      name: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    rental = await rental.save({ session });

    movie.numberInStock--;
    await movie.save({ session });

    await session.commitTransaction();
    session.endSession();

    return { status: 201, body: rental };
  } catch (ex) {
    await session.abortTransaction();
    session.endSession();
    return { status: 500, body: "Internal Issue.." + ex };
  }
}

export async function getRentalById(id) {
  const rental = await Rental.findById(id);

  if (!rental)
    return { status: 404, body: "The Rental with given ID was not found" };

  return { status: 200, body: rental };
}
