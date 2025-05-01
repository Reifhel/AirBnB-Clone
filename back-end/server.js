import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { dirname } from "node:path";
import { fileURLToPath } from "url";
import routes from "./routes/index.js";

export const app = express();
const { PORT } = process.env;

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

// Only getting the json request
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(routes);
