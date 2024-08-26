import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";
import errorLogger from "../logger/errorLogger";

dotenv.config({ path: path.resolve("environments/config.env") });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

async function connectMySQL() {
  try {
    await sequelize.sync();
  } catch (err) {
    errorLogger.error(err.stack);
  }
}

export { connectMySQL, sequelize };
