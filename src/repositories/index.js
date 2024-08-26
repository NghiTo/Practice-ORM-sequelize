import Customer from "./customer.js";
import Employee from "./employee.js";
import User from "./user.js";

Employee.hasMany(Customer, { foreignKey: "salesRepEmployeeNumber" });
Customer.belongsTo(Employee, { foreignKey: "salesRepEmployeeNumber" });

User.belongsTo(Employee, { foreignKey: "employeeNumber" });

export {
  Customer,
  Employee,
  User,
};
