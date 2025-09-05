import express from "express";
import { createBooking, getBookings, deleteBooking } from "../controllers/bookingController.js";

const router = express.Router();

// POST /api/bookings → create booking
router.post("/", createBooking);

// GET /api/bookings?userId=... → fetch user bookings
router.get("/", getBookings);

// DELETE /api/bookings/:id → cancel booking
router.delete("/:id", deleteBooking);

export default router;
