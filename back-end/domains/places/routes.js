import { Router } from "express";
import { connectDb } from "../../config/db.js";
import { JWTVerify } from "../../utils/jwt.js";
import Place from "./model.js";

const router = Router();

router.post("/", async (req, res) => {
  connectDb();
  const {
    title,
    city,
    photos,
    description,
    extras,
    perks,
    price,
    checkIn,
    checkOut,
    guests,
  } = req.body;

  try {
    const { _id: owner } = await JWTVerify(req);

    const newPlaceDoc = await Place.create({
      owner,
      title,
      city,
      photos,
      description,
      extras,
      perks,
      price,
      checkIn,
      checkOut,
      guests,
    });

    res.json(newPlaceDoc);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
