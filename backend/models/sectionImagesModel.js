import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize";
import Sections from "./sectionModel";
import Image from "./imageModel";

const SectionImage = sequelize.define(
  "SectionImage",
  {
    id_section: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: Sections,
        key: "id_sections",
      },
    },
    id_image: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Image,
        key: "id_image",
      },
    },
  },
  {
    tableName: "section_images",
    timestamps: false,
  }
);
Sections.belongsToMany(Image, {
  through: SectionImage,
  foreignKey: "id_section",
});
Image.belongsToMany(Sections, {
  through: SectionImage,
  foreignKey: "id_image",
});
export default SectionImage;
