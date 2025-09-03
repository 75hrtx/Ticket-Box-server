import express from "express";
import { createBooking, getBookings } from "../controllers/bookingController.js";

const router = express.Router();

// POST /api/bookings → create booking
router.post("/", createBooking);

// GET /api/bookings?userId=... → fetch user bookings
router.get("/", getBookings);

export default router;
