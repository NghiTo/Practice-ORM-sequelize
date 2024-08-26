import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Employee from "./employee.js";

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employeeNumber: {
      type: DataTypes.INTEGER,
      references: {
        model: Employee,
        key: "employeeNumber",
      },
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

export default User;
