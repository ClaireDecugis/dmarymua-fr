import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize.js";

const Availability = sequelize.define(
  "availability",
  {
    id_availability: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    period: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    checked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    id_appointment: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "availability",
    timestamps: false,
  }
);
export default Availability;
