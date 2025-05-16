import { Router } from "express";
import { connectDb } from "../../config/db.js";
import { JWTVerify } from "../../utils/jwt.js";
import { downloadImage, sendToS3, uploadImage } from "./controller.js";
import Place from "./model.js";

const router = Router();

router.get("/", async (req, res) => {
  connectDb();

  try {
    const placeDocs = await Place.find();

    res.json(placeDocs);
  } catch (error) {
    console.error(error);
    res.status(500).json("Deu erro encontrar as Acomodações");
  }
});

router.get("/owner", async (req, res) => {
  connectDb();

  try {
    const { _id } = await JWTVerify(req);

    try {
      const placesDocs = await Place.find({ owner: _id });

      res.json(placesDocs);
    } catch (error) {
      res
        .status(500)
        .json(
          "Deu erro tentar encontrar acomodações vinculadas ao usuário",
          error
        );
    }
  } catch (error) {
    res.status(500).json("Deu erro ao verificar o usuário", error);
  }
});

router.get("/:id", async (req, res) => {
  connectDb();

  const { id } = req.params;
  try {
    const placeDoc = await Place.findOne({ _id: id });

    res.json(placeDoc);
  } catch (error) {
    res
      .status(500)
      .json(
        "Deu erro tentar encontrar acomodações vinculadas ao usuário",
        error
      );
  }
});

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

router.put("/:id", async (req, res) => {
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
    const { id: _id } = req.params;

    const newPlaceDoc = await Place.findOneAndUpdate(
      { _id },
      {
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
      }
    );

    res.json(newPlaceDoc);
  } catch (error) {
    console.log(error);
    res.status(500).json("Deu erro ao atualizar a acomodação", error);
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
