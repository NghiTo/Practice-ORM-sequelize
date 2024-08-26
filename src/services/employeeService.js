import { Employee } from "../repositories/index.js";
import { AppError } from "../utils/errorHandle.js";

const createEmployee = async (data) => {
  await Employee.create(data);
  return { message: "Employee is created successfully." };
};

const getEmployees = async () => {
  return await Employee.findAll();
};

const deleteEmployee = async (id) => {
  const employee = await Employee.findByPk(id);
  if (employee) {
    await employee.destroy();
    return { message: "Employee is deleted successfully." };
  } else {
    throw new AppError({
      message: "Employee is not found",
      statusCode: 404,
      errorCode: "NOT_FOUND",
    });
  }
};

const getEmployeeById = async (id) => {
  const employee = await Employee.findByPk(id);
  if (!employee) {
    throw new AppError({
      message: "Employee is not found",
      statusCode: 404,
      errorCode: "NOT_FOUND",
    });
  }
  return employee;
};

const updateEmployee = async (id, data) => {
  const employee = await Employee.findByPk(id);
  if (employee) {
    await employee.update(data);
    return { message: "Employee is updated successfully." };
  } else {
    throw new AppError({
      message: "Employee is not found",
      statusCode: 404,
      errorCode: "NOT_FOUND",
    });
  }
};

export default {
  createEmployee,
  getEmployees,
  deleteEmployee,
  getEmployeeById,
  updateEmployee,
};
