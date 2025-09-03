import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  movieId: { type: String, required: true },
  movieTitle: { type: String, required: true },
  movieImage: { type: String },
  userId: { type: String, required: true },
  seats: { type: [String], required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: "reserved" },
  expiresAt: { type: Date },
});

export default mongoose.model("Booking", bookingSchema);
