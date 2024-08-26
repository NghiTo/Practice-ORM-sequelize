import { Customer } from "../repositories/index.js";

const createCustomer = async (data) => {
  await Customer.create(data);
  return { message: "Customer is created successfully" };
};

const getCustomers = async () => {
  return await Customer.findAll();
};

const deleteCustomer = async (id) => {
  const customer = await Customer.findByPk(id);
  if (customer) {
    await customer.destroy();
    return { message: "Customer is deleted successfully." };
  }
  return null;
};

const getCustomerById = async (id) => {
  return await Customer.findByPk(id);
};

const updateCustomer = async (id, data) => {
  const customer = await Customer.findByPk(id);
  
  const customers = await Customer.findAll({
    attributes: ['salesRepEmployeeNumber'],
    group: ['salesRepEmployeeNumber'],
  });
  
  const salesRepEmployeeNumbers = customers.map(customer => customer.salesRepEmployeeNumber);
  if(!salesRepEmployeeNumbers.includes(data.salesRepEmployeeNumber)) {
    throw new Error("Invalid sales representative employee number");
  }

  if (customer) {
    await customer.update(data);
    return { message: "Customer is updated successfully." };
  } else {
    throw new Error("Customer is not found");
  }
};

export default {
  createCustomer,
  getCustomers,
  deleteCustomer,
  getCustomerById,
  updateCustomer,
};
