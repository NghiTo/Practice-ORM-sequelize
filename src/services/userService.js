import { User, Employee } from "../repositories/index.js";
import { hash, compare } from "bcrypt";
import pkg from "jsonwebtoken";
import { AppError } from "../utils/errorHandle.js";

const { sign } = pkg;

const createUser = async ({ username, password, employeeNumber }) => {
  const hashedPassword = await hash(password, 12);
  const employee = await Employee.findByPk(employeeNumber);
  if (!employee) {
    throw new AppError({
      message: "Employee number is invalid",
      statusCode: 400,
      errorCode: "BAD_REQUEST",
    });
  }

  await User.create({
    username,
    password: hashedPassword,
    employeeNumber,
  });
  return { message: "User is created successfully" };
};

const loginUser = async ({ username, password }) => {
  const user = await User.findOne({ where: { username } });

  if (!user) {
    throw new AppError({
      message: "Wrong username or password",
      errorCode: "BAD_REQUEST",
      statusCode: 400,
    });
  }

  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    throw new AppError({
      message: "Wrong username or password",
      errorCode: "BAD_REQUEST",
      statusCode: 400,
    });
  }

  const token = sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

export default {
  createUser,
  loginUser,
};
