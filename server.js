import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import bookingRoutes from "./routes/bookings.js"; // ⬅️ Bookings route

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
await connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// API Routes
app.get("/", (req, res) => res.send("✅ Server is Live!"));

/**
 * Inngest route
 * Handles async events (user created, deleted, booking created, etc.)
 */
app.use("/api/inngest", serve({ client: inngest, functions }));

/**
 * Booking routes
 * Handles CRUD for bookings directly via REST
 */
app.use("/api/bookings", bookingRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
