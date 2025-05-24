import { Router } from "express";
import { connectDb } from "../../config/db.js";
import { JWTVerify } from "../../utils/jwt.js";
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

router.get("/owner", async (req, res) => {
  connectDb();

  try {
    const { _id } = await JWTVerify(req);

    try {
      const bookingDocs = await Booking.find({ user: _id }).populate("place");

      res.json(bookingDocs);
    } catch (error) {
      console.error(error);
      res.status(500).json("Deu erro ao encontrar as reservas do usuário");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json("Erro ao validar o token do usuario");
  }
});

export default router;
