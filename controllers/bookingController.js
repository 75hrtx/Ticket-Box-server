import Booking from "../models/Booking.js";

// Create a booking
export const createBooking = async (req, res) => {
  try {
    console.log("📩 Incoming booking:", req.body);

    let { userId, movieId, title, duration, image, date, time, seats, totalSeats, totalPrice } = req.body;

    if (!userId || !movieId || !title || !image || !date || !time || !seats?.length) {
      console.log("❌ Missing fields:", { userId, movieId, title, image, date, time, seats });
      return res.status(400).json({ message: "Missing required fields" });
    }

    // normalize seats to strings
    seats = seats.map(String);

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
    return res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    console.error("💥 Booking error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all bookings for a user (or all if no userId passed)
export const getBookings = async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    const bookings = await Booking.find(filter).sort({ createdAt: -1 });

    return res.json({ bookings });
  } catch (err) {
    console.error("💥 Get bookings error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete booking by id
export const deleteBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Booking.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Booking not found" });

    console.log("🗑️ Booking deleted:", id);
    return res.json({ message: "Booking cancelled", booking: deleted });
  } catch (err) {
    console.error("💥 Delete booking error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
