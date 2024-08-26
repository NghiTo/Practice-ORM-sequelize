import employeeService from "../services/employeeService.js";
import catchAsync from "../utils/catchAsync.js";

const createEmployee = catchAsync(async (req, res, next) => {
  const result = await employeeService.createEmployee(req.body);
  res.status(200).json(result);
});

const getEmployees = catchAsync(async (req, res, next) => {
  const employees = await employeeService.getEmployees();
  res.json(employees);
});

const deleteEmployee = catchAsync(async (req, res, next) => {
  const result = await employeeService.deleteEmployee(req.params.id);
  res.json(result);
});

const getEmployeeById = catchAsync(async (req, res, next) => {
  const employee = await employeeService.getEmployeeById(req.params.id);
  res.json(employee);
});

const updateEmployee = catchAsync(async (req, res, next) => {
  const result = await employeeService.updateEmployee(req.params.id, req.body);
  res.status(200).json(result);
});

export {
  createEmployee,
  getEmployees,
  deleteEmployee,
  getEmployeeById,
  updateEmployee,
};
