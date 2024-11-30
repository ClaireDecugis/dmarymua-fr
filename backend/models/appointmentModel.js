import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize.js";
import Availability from "./availabilityModel.js";
// import UserAppointment from "./userAppointmentModel";

const Appointment = sequelize.define(
  "Appointment",
  {
    id_appointment: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    id_availability: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Availability,
        key: "id_availability",
      },
    },
    validated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "appointment",
    timestamps: false,
  }
);
//Appointment.hasMany(UserAppointment, { foreignKey: "id_appointment" });

export default Appointment;

// Appointment.belongsToMany(User, {
//   through: UserAppointment,
//   foreignKey: "id_appointment",
// });
