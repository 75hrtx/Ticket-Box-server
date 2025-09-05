import Booking from "../models/Booking.js";

// Create a booking
export const createBooking = async (req, res) => {
  try {
    console.log("📩 Incoming booking:", req.body);

    const { userId, movieId, title, duration, image, date, time, seats, totalSeats, totalPrice } = req.body;

    if (!userId || !movieId || !title || !image || !date || !time || !seats?.length) {
      console.log("❌ Missing fields:", { userId, movieId, title, image, date, time, seats });
      return res.status(400).json({ message: "Missing required fields" });
    }

    // check overlapping seats
    const existingBooking = await Booking.findOne({
      movieId,
      date,
      time,
      seats: { $in: seats },
    });
    if (existingBooking) {
      console.log("❌ Seats already booked:", existingBooking.seats);
      return res.status(400).json({ message: "Some seats are already booked" });
    }

    const booking = await Booking.create({
      userId,
      movieId,
      title,
      duration: duration || "N/A",
      image,
      date,
      time,
      seats,
      totalSeats,
      totalPrice,
    });

    console.log("✅ Booking saved:", booking._id);
    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    console.error("💥 Booking error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete booking by id
export const deleteBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Booking.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Booking not found" });
    console.log("🗑️ Booking deleted:", id);
    res.json({ message: "Booking cancelled", booking: deleted });
  } catch (err) {
    console.error("💥 Delete booking error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
