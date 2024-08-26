import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Employee from "./employee.js";

const Customer = sequelize.define(
  "Customer",
  {
    customerNumber: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressLine1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressLine2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salesRepEmployeeNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Employee,
        key: "employeeNumber",
      },
    },
    creditLimit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    tableName: "customers",
    timestamps: false,
  }
);

export default Customer;
