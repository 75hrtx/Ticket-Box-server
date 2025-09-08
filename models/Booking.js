import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  movieId: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  seats: [{ type: String, required: true }],
  totalSeats: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
}, { timestamps: true });


export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
