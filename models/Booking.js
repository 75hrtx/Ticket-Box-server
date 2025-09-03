import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  movieId: { type: String, required: true },
  title: { type: String, required: true },       // new
  duration: { type: String, required: true },    // new
  image: { type: String, required: true },       // new
  date: { type: String, required: true },
  time: { type: String, required: true },
  seats: [{ type: String, required: true }],
  totalSeats: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("Booking", BookingSchema);
