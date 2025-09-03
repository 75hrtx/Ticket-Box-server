import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: String,
  releaseDate: String,
  price: Number,
}, { timestamps: true });

export default mongoose.model("Movie", MovieSchema);
