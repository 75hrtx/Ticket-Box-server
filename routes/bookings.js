import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// Reserve seats
router.post("/", async (req, res) => {
  try {
    const { movieId, movieTitle, movieImage, userId, seats, date, time } = req.body;

    const booking = new Booking({
      movieId,
      movieTitle,
      movieImage,
      userId,
      seats,
      date,
      time,
      price: seats.length * 200,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await booking.save();
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all bookings of a user
router.get("/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Cancel booking
router.put("/cancel/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled", expiresAt: new Date(Date.now() + 5 * 60 * 1000) },
      { new: true }
    );
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
