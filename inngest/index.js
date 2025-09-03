import User from "../models/User.js";  // adjust path if needed
import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "ticket-box" });

//Inngest function to save user data to database
const SyncUserCreation = inngest.createFunction(
    {id: 'sync-user-from-clerk'},
    {event: 'clerk/user.created'},
    async ({event})=> {
        const {id, first_name, last_name, email_address, image_url} = event.data
        const userData = {
            _id: id,
            email: email_address[0].email_address,
            name: first_name + ' ' + last_name,
            image: image_url
        }
        await User.create(userData)
    }
)

//Inngest function to delete user data from database
const SyncUserDeletion = inngest.createFunction(
    {id: 'delete-user-with-clerk'},
    {event: 'clerk/user.deleted'},
    async ({event})=> {
        const {id}= event.data
        await User.create(userData)
    }
)

//Inngest function to update user data from database
const SyncUserUpdation = inngest.createFunction(
    {id: 'updste-user-from-clerk'},
    {event: 'clerk/user.updated'},
    async ({event})=> {
        const {id, first_name, last_name, email_address, image_url} = event.data
         const userData = {
            _id: id,
            email: email_address[0].email_address,
            name: first_name + ' ' + last_name,
            image: image_url
        }
        await User.findByIdAndUpdate(id,userData)
    }
)



// Create an empty array where we'll export future Inngest functions
export const functions = [
    SyncUserCreation,
    SyncUserDeletion,
    SyncUserUpdation
];