import pkg from "jsonwebtoken";
import { AppError } from "../utils/errorHandle.js";

const { verify } = pkg;

const authentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  if (!token) {
    return next(
      new AppError({
        message: "No token provided",
        statusCode: 401,
        errorCode: "UNAUTHORIZED",
      })
    );
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(
      new AppError({
        message: "Invalid or expired token",
        statusCode: 401,
        errorCode: "UNAUTHORIZED",
      })
    );
  }
};

export default authentication;
