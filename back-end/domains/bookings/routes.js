import { Router } from "express";
import { connectDb } from "../../config/db.js";
import Booking from "./model.js";

const router = Router();

router.post("/", async (req, res) => {
  const { place, user, price, total, checkIn, checkOut, guests, nights } =
    req.body;

  connectDb();

  try {
    const newBookingDoc = await Booking.create({
      place,
      user,
      price,
      total,
      checkIn,
      checkOut,
      guests,
      nights,
    });

    res.json(newBookingDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json("Deu erro ao criar a reserva");
  }
});

export default router;
