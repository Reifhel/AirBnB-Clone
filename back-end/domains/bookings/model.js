import { model, Schema, SchemaType } from "mongoose";

const bookingSchema = new Schema({
  place: { type: Schema.Types.ObjectId, ref: "Place" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  price: Number,
  total: Number,
  checkIn: String,
  checkOut: String,
  guests: Number,
  nights: Number,
});

export default model("Booking", bookingSchema);
