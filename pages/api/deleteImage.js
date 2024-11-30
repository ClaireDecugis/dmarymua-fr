import fs from "fs";
import path from "path";
import Image from "../../backend/models/imageModel";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const { id_image } = req.query;
      console.log("req.query id:", req.query);

      // Rechercher l'image par son ID
      const imageToDelete = await Image.findByPk(id_image);

      if (!imageToDelete) {
        return res.status(404).json({ error: "Image not found" });
      }

      await imageToDelete.destroy();

      const imagePath = path.join(
        process.cwd(),
        "public",
        "images",
        "shooting",
        imageToDelete.name
      );
      fs.unlinkSync(imagePath);

      res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
      console.error("Error deleting image:", error);
      res.status(500).json({ error: "Error deleting image" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
