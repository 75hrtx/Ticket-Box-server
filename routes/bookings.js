import express from "express";
import { createBooking, getBookings, deleteBooking } from "../controllers/bookingController.js";

const router = express.Router();

//  Create a new booking
// POST /api/bookings
router.post("/", createBooking);

//  Get all bookings OR bookings by user (if ?userId=123 passed)
// GET /api/bookings
router.get("/", getBookings);

//  Delete a booking by ID
// DELETE /api/bookings/:id
router.delete("/:id", deleteBooking);

export default router;
