// Create a booking
export const createBooking = async (req, res) => {
  try {
    const { userId, movieId, title, duration, image, date, time, seats, totalSeats, totalPrice } = req.body;

    // ✅ remove duration from required fields
    if (!userId || !movieId || !title || !image || !date || !time || !seats?.length) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if seats are already booked
    const existingBooking = await Booking.findOne({
      movieId,
      date,
      time,
      seats: { $in: seats },
    });
    if (existingBooking) return res.status(400).json({ message: "Some seats are already booked" });

    const booking = await Booking.create({
      userId,
      movieId,
      title,
      duration: duration || "N/A",   // ✅ fallback value
      image,
      date,
      time,
      seats,
      totalSeats,
      totalPrice,
    });

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
