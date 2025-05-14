import { Router } from "express";
import { connectDb } from "../../config/db.js";
import { JWTVerify } from "../../utils/jwt.js";
import { downloadImage, sendToS3, uploadImage } from "./controller.js";
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
    const { filename, fullPath, mimeType } = await downloadImage(link);

    const fileURL = await sendToS3(filename, fullPath, mimeType);

    res.json(fileURL);
  } catch (error) {
    res.status(500).json("Erro ao baixar a imagem");
    console.error(error);
  }
});

router.post("/upload", uploadImage().array("files", 10), async (req, res) => {
  const { files } = req;

  const filesPromise = new Promise((resolve, reject) => {
    const fileURLArray = [];

    files.forEach(async (file, index) => {
      const { filename, path, mimetype } = file;

      try {
        const fileURL = await sendToS3(filename, path, mimetype);

        fileURLArray.push(fileURL);
      } catch (error) {
        console.error("Deu algum erro ao subir para o S3", error);
        reject(error);
      }
    });

    const idInterval = setInterval(() => {
      if (files.length === fileURLArray.length) {
        clearInterval(idInterval);
        resolve(fileURLArray);
      }
    }, 100);
  });

  const fileURLArrayResolved = await filesPromise;

  res.json(fileURLArrayResolved);
});

export default router;
