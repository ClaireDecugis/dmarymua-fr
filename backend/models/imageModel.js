import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize";

const Image = sequelize.define(
  "Image",
  {
    id_image: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "image",
    timestamps: false,
  }
);

export default Image;
