import { DataTypes, NOW } from "sequelize";
import sequelize from "../../config/sequelize.js";
// import UserAppointment from "./userAppointmentModel";
import Appointment from "./appointmentModel.js";

const User = sequelize.define(
  "User",
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    id_user_appointment: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Appointment,
        key: "id_appointment",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: NOW,
    },
  },
  {
    timestamps: false,
    tableName: "user",
  }
);
//User.hasMany(UserAppointment, { foreignKey: "id_user" });

export default User;
// const UserAppointment = require("./userAppointmentModel");

// User.belongsToMany(Appointment, {
//   through: UserAppointment,
//   foreignKey: "id_user_appointment",
// });
