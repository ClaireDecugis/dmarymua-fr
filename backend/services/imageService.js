import fs from "fs";
import path from "path";
import Image from "../models/imageModel";

const getAllImages = async () => {
  try {
    const imagesDirectory = path.join(
      process.cwd(),
      "public",
      "images",
      "shooting"
    );
    const imageNames = await fs.promises.readdir(imagesDirectory);

    const images = imageNames.map((imageName) => {
      return {
        name: imageName,
        imageUrl: `/images/shooting/${imageName}`,
      };
    });

    return images;
  } catch (error) {
    throw new Error("Error fetching images from the directory");
  }
};

const getImageIdByName = async (imageName) => {
  try {
    const image = await Image.findOne({ where: { name: imageName } });
    if (!image) {
      throw new Error("Image not found");
    }
    return image.id;
  } catch (error) {
    throw new Error("Error fetching image ID by name");
  }
};

const getImageById = async (id_image) => {
  try {
    const image = await Image.findOne(id_image);
    if (!image) {
      throw new Error("Image not found");
    }
    return image.id;
  } catch (error) {
    throw new Error("Error fetching image by ID");
  }
};

const createImage = async (data) => {
  try {
    console.log("Data received for creating image: ", data);
    const newImage = await Image.create({
      name: data.name,
      weight: data.weight,
      type: data.type,
      description: data.description,
      imageUrl: data.imageUrl, // Utilisez l'URL de l'image
    });
    console.log("New image created: ", newImage);
    return newImage;
  } catch (error) {
    console.error("Error creating image in the database: ", error);
    throw new Error("Error creating image in the database");
  }
};

const getImage = async (id) => {
  try {
    const image = await Image.findByPk(id);
    if (!image) {
      throw new Error("Image not found");
    }
    return image;
  } catch (error) {
    console.error("Error fetching image from the database: ", error);
    throw new Error("Error fetching image from the database");
  }
};

const updateImage = async (id, data) => {
  try {
    console.log("ID received for updating image: ", id);
    console.log("Data received for updating image: ", data);
    await Image.update(data, {
      where: { id_image: id },
    });
    const updatedImage = await Image.findByPk(id);
    console.log("Image updated successfully: ", updatedImage);
    return updatedImage;
  } catch (error) {
    console.error("Error updating image in the database: ", error);
    throw new Error("Error updating image in the database");
  }
};
const deleteImage = async (id) => {
  try {
    // Supprimer l'image de la base de données
    const deletedImageCount = await Image.destroy({
      where: { id_Image: id },
    });

    if (deletedImageCount === 0) {
      throw new Error("Image not found in the database");
    }

    return deletedImageCount;
  } catch (error) {
    throw new Error("Error deleting Image from the database");
  }
};

export {
  getAllImages,
  getImageIdByName,
  getImageById,
  createImage,
  getImage,
  updateImage,
  deleteImage,
};
