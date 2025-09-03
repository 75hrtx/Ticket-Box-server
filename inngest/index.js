import { Inngest } from "inngest";
import connectDB from "../configs/db.js";
import User from "../models/User.js";
import Booking from "../models/Booking.js"; // 👈 add this

export const inngest = new Inngest({ id: "ticket-box" });

/* ----------------- USER SYNC ----------------- */

// Create user
const SyncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: (first_name && last_name) 
        ? `${first_name} ${last_name}` 
        : email_addresses[0].email_address.split("@")[0],
      image: image_url,
    };

    await User.create(userData);
  }
);

// Delete user
const SyncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;
    await User.findByIdAndDelete(id);
  }
);

// Update user
const SyncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    await connectDB();
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    };

    await User.findByIdAndUpdate(id, userData, { new: true });
  }
);

/* ----------------- BOOKING SYNC ----------------- */

const SyncBookingCreation = inngest.createFunction(
  { id: "sync-booking-created" },
  { event: "booking/created" },
  async ({ event }) => {
    await connectDB();

    const { movieId, date, time, seats, userId } = event.data;

    const booking = new Booking({
      movieId,
      date,
      time,
      seats,
      userId,
    });

    await booking.save();
  }
);

export const functions = [
  SyncUserCreation,
  SyncUserDeletion,
  SyncUserUpdation,
  SyncBookingCreation, // 👈 include it here
];
