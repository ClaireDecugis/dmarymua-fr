import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize.js";
import Appointment from "./appointmentModel.js";
import User from "./userModel.js";

const UserAppointment = sequelize.define(
  "UserAppointment",
  {
    id_user_appointment: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: User,
        key: "id_user",
      },
    },
    id_appointment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Appointment,
        key: "id_appointment",
      },
    },
  },
  {
    tableName: "user_appointment",
    timestamps: false,
  }
);
User.belongsToMany(Appointment, {
  through: UserAppointment,
  foreignKey: "id_user_appointment",
});
Appointment.belongsToMany(User, {
  through: UserAppointment,
  foreignKey: "id_appointment",
});
export default UserAppointment;
