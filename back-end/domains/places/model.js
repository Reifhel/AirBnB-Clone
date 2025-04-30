import { model, Schema, SchemaType } from "mongoose";

const placeSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  title: String,
  city: String,
  photos: [String],
  description: String,
  extras: String,
  perks: [String],
  price: Number,
  checkIn: String,
  checkOut: String,
  guests: Number,
});

export default model("Place", placeSchema);
