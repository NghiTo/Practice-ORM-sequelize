import express from "express";
import setupMiddlewares from "./utils/setupMiddleware.js";
import dotenv from "dotenv";
import { connectMySQL } from "./config/database.js";
import path from "path";

dotenv.config({ path: path.resolve("environments/config.env") });

const PORT = process.env.PORT;
const app = express();

setupMiddlewares(app);
connectMySQL();

app.listen(PORT);
