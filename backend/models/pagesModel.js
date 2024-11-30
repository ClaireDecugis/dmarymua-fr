import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize";

const Pages = sequelize.define(
  "Pages",
  {
    id_pages: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "pages",
    timestamps: false,
  }
);
export default Pages;
