import cors from "cors";
import "dotenv/config";
import express from "express";
import UserRoutes from "./domains/users/routes.js";

const app = express();
const { PORT } = process.env;

// Only getting the json request
app.use(express.json());
app.use(cors());
app.use("/users", UserRoutes);

app.listen(PORT, () => {
  console.log(`Servidor on na porta ${PORT}`);
});
