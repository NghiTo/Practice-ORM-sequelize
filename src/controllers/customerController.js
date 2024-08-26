import customerService from "../services/customerService.js";
import catchAsync from "../utils/catchAsync.js";

const createCustomer = catchAsync(async (req, res, next) => {
  const result = await customerService.createCustomer(req.body);
  res.status(200).json(result);
});

const getCustomers = catchAsync(async (req, res, next) => {
  const customers = await customerService.getCustomers();
  res.json(customers);
});

const deleteCustomer = catchAsync(async (req, res, next) => {
  const result = await customerService.deleteCustomer(req.params.id);
  if (result) {
    res.status(200).json(result);
  }
});

const getCustomerById = catchAsync(async (req, res, next) => {
  const customer = await customerService.getCustomerById(req.params.id);
  if (customer) {
    res.json(customer);
  }
});

const updateCustomer = catchAsync(async (req, res, next) => {
  const result = await customerService.updateCustomer(req.params.id, req.body);
  if (result) {
    res.status(200).json(result);
  }
});

export {
  createCustomer,
  getCustomers,
  deleteCustomer,
  getCustomerById,
  updateCustomer,
};
