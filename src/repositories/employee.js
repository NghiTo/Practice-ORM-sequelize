import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Employee = sequelize.define(
  "Employee",
  {
    employeeNumber: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    extension: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    officeCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reportsTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    jobTitle: {
      type: DataTypes.ENUM("President", "Manager", "Leader", "Staff"),
      allowNull: false,
    },
  },
  {
    tableName: "employees",
    timestamps: false,
  }
);

export default Employee;
