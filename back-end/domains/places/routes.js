import { Router } from "express";
import { connectDb } from "../../config/db.js";
import { __dirname } from "../../server.js";
import { downloadImage } from "../../utils/imageDownloader.js";
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

router.post("/upload/link", async (req, res) => {
  const { link } = req.body;

  try {
    const filename = await downloadImage(link, `${__dirname}/tmp/`);

    res.json(filename);
  } catch (error) {
    res.status(500).json("Erro ao baixar a imagem");
    console.error(error);
  }
});

export default router;
