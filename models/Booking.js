// server/models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  movieId: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  seats: { type: [String], required: true },
  userId: { type: String, required: true }
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
