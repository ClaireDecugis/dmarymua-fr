import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize";
import Pages from "./pagesModel";

const Sections = sequelize.define(
  "Sections",
  {
    id_sections: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_pages: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "sections",
    timestamps: false,
  }
);
Sections.belongsTo(Pages, { foreignKey: "id_pages" });
export default Sections;
