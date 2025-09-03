import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import bookingRoutes from "./routes/bookings.js";

const app = express();
const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log("MongoDB connected");

    // Middleware
    app.use(express.json());
    app.use(cors());
    app.use(clerkMiddleware());

    // Booking routes
    app.use("/api/bookings", bookingRoutes);

    // Base route
    app.get("/", (req, res) => res.send("Server is Live!"));

    // Inngest route
    app.use("/api/inngest", serve({ client: inngest, functions }));

    // Start server
    app.listen(port, () => {
      console.log(`🚀 Server listening at http://localhost:${port}`);
    });

  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

// Start everything
startServer();
