import cors from "cors";
import { json } from "express";
import cookieParser from "cookie-parser";
import { serve, setup } from "swagger-ui-express";

import routes from "../routes/index.js";
import { AppError, globalErrorHandler } from "./errorHandle.js";
import requestLogger from "../logger/requestLogger.js";
import swaggerDocument from "./swagger.js";

function setupMiddlewares(app) {
  app.use(cors());
  app.use("/api-docs", serve, setup(swaggerDocument));
  app.use(requestLogger);
  app.use(cookieParser());
  app.use(json());
  app.use("/api", routes);
  app.all("*", (req, res, next) => {
    next(
      new AppError({
        message: `Can't find ${req.originalUrl} on this server`,
        statusCode: 404,
        errorCode: "ROUTE_NOT_FOUND",
      })
    );
  });
  app.use(globalErrorHandler);
}

export default setupMiddlewares;
