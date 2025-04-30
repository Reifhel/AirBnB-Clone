import bcrypt from "bcryptjs";
import "dotenv/config";
import { Router } from "express";
import { connectDb } from "../../config/db.js";
import { JWTSign, JWTVerify } from "../../utils/jwt.js";
import User from "./model.js";

const router = Router();
const bcryptSalt = bcrypt.genSaltSync();

router.get("/", async (req, res) => {
  connectDb();

  try {
    const userDoc = await User.find();
    res.json(userDoc);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/profile", async (req, res) => {
  const userInfo = await JWTVerify(req);

  res.json(userInfo);
});

router.post("/", async (req, res) => {
  connectDb();

  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

  try {
    const newUserDoc = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const { _id } = newUserDoc;
    const newUserObj = { name, _id, email };
    try {
      const token = await JWTSign(newUserObj);
      res.cookie("token", token).json(newUserObj);
    } catch (error) {
      res.status(500).json("Erro ao assinar com o JWT", Error);
    }
  } catch (error) {
    res.status(500).json(error);
    throw error;
  }
});

router.post("/login", async (req, res) => {
  connectDb();

  const { email, password } = req.body;

  try {
    const userDoc = await User.findOne({ email });

    if (userDoc) {
      const passwordCorrect = bcrypt.compareSync(password, userDoc.password);
      const { name, _id } = userDoc;

      if (passwordCorrect) {
        const newUserObj = { name, _id, email };
        try {
          const token = await JWTSign(newUserObj);
          res.cookie("token", token).json(newUserObj);
        } catch (error) {
          res.status(500).json("Erro ao assinar com o JWT", Error);
        }
      } else {
        res.status(400).json("Senha inválida!");
      }
    } else {
      res.status(404).json("Usuário não encontrado");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/logout", async (req, res) => {
  res.clearCookie("token").json("Deslogado com sucesso!");
});

export default router;
